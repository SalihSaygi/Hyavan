import fs from 'fs'
import https from 'https'

const createWebServer = async (config, expressApp) => {
    const { sslCrt, sslKey } = config

    if(!fs.existsSync(sslKey) || !fs.existsSync(sslCrt)) {
        console.error(`SSL files are not found in the specified path: \n "${sslKey}  \n and \n ${sslCrt}" `)
        process.exit(1)
    }
    const tls = {
        cert: fs.readFileSync(sslCrt),
        key: fs.readFileSync(sslKey)
    }
    const webServer = https.createServer(tls, expressApp)
    return webServer
}

export default createWebServer