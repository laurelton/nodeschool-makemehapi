/* eslint-disable semi */
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const path = require('path')

const host = '0.0.0.0'
const port = Number.parseInt(process.argv[2], 10) || 8080;

(async () => {
    const server = Hapi.Server({ host, port })
    await server.register(Inert)

    server.route({
        path: '/',
        method: 'GET',
        handler: {
            file: path.join(__dirname, 'index.html')
        }
    })

    await server.start()
})()
