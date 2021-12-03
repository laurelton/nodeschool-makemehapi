/* eslint-disable semi */
const Hapi = require('@hapi/hapi')

const host = '0.0.0.0'
const port = Number.parseInt(process.argv[2], 10) || 8080
const serverOptions = { host, port }

const init = async () => {
    const server = Hapi.Server(serverOptions)

    const path = '/'
    const method = 'GET'
    const handler = function() {
        return 'Hello hapi'
    }

    server.route({ path, method, handler })
    await server.start()
}

init()
