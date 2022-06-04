const axios = require('axios');
const fs = require('fs').promises;
 
axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((response) => {
        
        var date = response.data.bpi
        var moneda = ["EUR", "USD", "GBP"] 
        var Informacion = []

        
        moneda.forEach(divisas => {
            var i = "" + divisas + ": " + date[divisas].rate.toString() 
                Informacion.push(i)
        })
            
        var ver = [" CONSULTAR EL VALOR DEL BITCOIN \n"]
        console.log(ver[0])

        Informacion.forEach(v => {
            console.log(v)
            ver.push(v.toString() + "\n")
        })

        fs.writeFile('Bitcoins.csv', Informacion)

    })