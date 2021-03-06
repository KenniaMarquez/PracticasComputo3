/// <reference types="node" />
import { Typegram } from 'typegram';
export * from 'typegram/api';
export * from 'typegram/markup';
export * from 'typegram/menu-button';
export * from 'typegram/inline';
export * from 'typegram/manage';
export * from 'typegram/message';
export * from 'typegram/passport';
export * from 'typegram/payment';
export * from 'typegram/update';
interface InputFileByPath {
    source: string;
}
interface InputFileByReadableStream {
    source: NodeJS.ReadableStream;
}
interface InputFileByBuffer {
    source: Buffer;
}
interface InputFileByURL {
    url: string;
    filename?: string;
}
export declare type InputFile = InputFileByPath | InputFileByReadableStream | InputFileByBuffer | InputFileByURL;
declare type TelegrafTypegram = Typegram<InputFile>;
export declare type Telegram = TelegrafTypegram['Telegram'];
export declare type Opts<M extends keyof Telegram> = TelegrafTypegram['Opts'][M];
export declare type InputMedia = TelegrafTypegram['InputMedia'];
export declare type InputMediaPhoto = TelegrafTypegram['InputMediaPhoto'];
export declare type InputMediaVideo = TelegrafTypegram['InputMediaVideo'];
export declare type InputMediaAnimation = TelegrafTypegram['InputMediaAnimation'];
export declare type InputMediaAudio = TelegrafTypegram['InputMediaAudio'];
export declare type InputMediaDocument = TelegrafTypegram['InputMediaDocument'];
export declare type ChatAction = Opts<'sendChatAction'>['action'];
/**
 * Sending video notes by a URL is currently unsupported
 */
export declare type InputFileVideoNote = Exclude<InputFile, InputFileByURL>;
//# sourceMappingURL=typegram.d.ts.map