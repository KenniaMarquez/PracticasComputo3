"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telegraf = void 0;
const crypto = require("crypto");
const http = require("http");
const https = require("https");
const util = require("util");
const composer_1 = require("./composer");
const compact_1 = require("./core/helpers/compact");
const context_1 = require("./context");
const debug_1 = require("debug");
const webhook_1 = require("./core/network/webhook");
const polling_1 = require("./core/network/polling");
const p_timeout_1 = require("p-timeout");
const telegram_1 = require("./telegram");
const url_1 = require("url");
const debug = (0, debug_1.default)('telegraf:main');
const DEFAULT_OPTIONS = {
    telegram: {},
    handlerTimeout: 90000,
    contextType: context_1.default,
};
function always(x) {
    return () => x;
}
const anoop = always(Promise.resolve());
class Telegraf extends composer_1.Composer {
    constructor(token, options) {
        super();
        this.context = {};
        this.handleError = (err, ctx) => {
            // set exit code to emulate `warn-with-error-code` behavior of
            // https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode
            // to prevent a clean exit despite an error being thrown
            process.exitCode = 1;
            console.error('Unhandled error while processing', ctx.update);
            throw err;
        };
        // @ts-expect-error Trust me, TS
        this.options = {
            ...DEFAULT_OPTIONS,
            ...(0, compact_1.compactOptions)(options),
        };
        this.telegram = new telegram_1.default(token, this.options.telegram);
        debug('Created a `Telegraf` instance');
    }
    get token() {
        return this.telegram.token;
    }
    /** @deprecated use `ctx.telegram.webhookReply` */
    set webhookReply(webhookReply) {
        this.telegram.webhookReply = webhookReply;
    }
    get webhookReply() {
        return this.telegram.webhookReply;
    }
    /**
     * _Override_ error handling
     */
    catch(handler) {
        this.handleError = handler;
        return this;
    }
    webhookCallback(path = '/') {
        return (0, webhook_1.default)(path, (update, res) => this.handleUpdate(update, res));
    }
    startPolling(allowedUpdates = []) {
        this.polling = new polling_1.Polling(this.telegram, allowedUpdates);
        this.polling.loop(async (updates) => {
            await this.handleUpdates(updates);
        });
    }
    startWebhook(hookPath, tlsOptions, port, host, cb) {
        const webhookCb = this.webhookCallback(hookPath);
        const callback = typeof cb === 'function'
            ? (req, res) => webhookCb(req, res, () => cb(req, res))
            : webhookCb;
        this.webhookServer =
            tlsOptions != null
                ? https.createServer(tlsOptions, callback)
                : http.createServer(callback);
        this.webhookServer.listen(port, host, () => {
            debug('Webhook listening on port: %s', port);
        });
        return this;
    }
    secretPathComponent() {
        return crypto
            .createHash('sha3-256')
            .update(this.token)
            .update(process.version) // salt
            .digest('hex');
    }
    /**
     * @see https://github.com/telegraf/telegraf/discussions/1344#discussioncomment-335700
     */
    async launch(config = {}) {
        var _a, _b, _c;
        debug('Connecting to Telegram');
        (_a = this.botInfo) !== null && _a !== void 0 ? _a : (this.botInfo = await this.telegram.getMe());
        debug(`Launching @${this.botInfo.username}`);
        if (config.webhook === undefined) {
            await this.telegram.deleteWebhook({
                drop_pending_updates: config.dropPendingUpdates,
            });
            this.startPolling(config.allowedUpdates);
            debug('Bot started with long polling');
            return;
        }
        if (typeof config.webhook.domain !== 'string' &&
            typeof config.webhook.hookPath !== 'string') {
            throw new Error('Webhook domain or webhook path is required');
        }
        let domain = (_b = config.webhook.domain) !== null && _b !== void 0 ? _b : '';
        if (domain.startsWith('https://') || domain.startsWith('http://')) {
            domain = new url_1.URL(domain).host;
        }
        const hookPath = (_c = config.webhook.hookPath) !== null && _c !== void 0 ? _c : `/telegraf/${this.secretPathComponent()}`;
        const { port, host, tlsOptions, cb } = config.webhook;
        this.startWebhook(hookPath, tlsOptions, port, host, cb);
        if (!domain) {
            debug('Bot started with webhook');
            return;
        }
        await this.telegram.setWebhook(`https://${domain}${hookPath}`, {
            drop_pending_updates: config.dropPendingUpdates,
            allowed_updates: config.allowedUpdates,
            ip_address: config.webhook.ipAddress,
            max_connections: config.webhook.maxConnections,
        });
        debug(`Bot started with webhook @ https://${domain}`);
    }
    stop(reason = 'unspecified') {
        var _a, _b;
        debug('Stopping bot... Reason:', reason);
        // https://github.com/telegraf/telegraf/pull/1224#issuecomment-742693770
        if (this.polling === undefined && this.webhookServer === undefined) {
            throw new Error('Bot is not running!');
        }
        (_a = this.webhookServer) === null || _a === void 0 ? void 0 : _a.close();
        (_b = this.polling) === null || _b === void 0 ? void 0 : _b.stop();
    }
    handleUpdates(updates) {
        if (!Array.isArray(updates)) {
            throw new TypeError(util.format('Updates must be an array, got', updates));
        }
        return Promise.all(updates.map((update) => this.handleUpdate(update)));
    }
    async handleUpdate(update, webhookResponse) {
        var _a, _b;
        (_a = this.botInfo) !== null && _a !== void 0 ? _a : (this.botInfo = (debug('Update %d is waiting for `botInfo` to be initialized', update.update_id),
            await ((_b = this.botInfoCall) !== null && _b !== void 0 ? _b : (this.botInfoCall = this.telegram.getMe()))));
        debug('Processing update', update.update_id);
        const tg = new telegram_1.default(this.token, this.telegram.options, webhookResponse);
        const TelegrafContext = this.options.contextType;
        const ctx = new TelegrafContext(update, tg, this.botInfo);
        Object.assign(ctx, this.context);
        try {
            await (0, p_timeout_1.default)(Promise.resolve(this.middleware()(ctx, anoop)), this.options.handlerTimeout);
        }
        catch (err) {
            return await this.handleError(err, ctx);
        }
        finally {
            if ((webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.writableEnded) === false) {
                webhookResponse.end();
            }
            debug('Finished processing update', update.update_id);
        }
    }
}
exports.Telegraf = Telegraf;
