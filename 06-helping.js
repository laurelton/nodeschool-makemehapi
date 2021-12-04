/* eslint-disable semi */
const Hapi = require('@hapi/hapi')
const Vision = require('@hapi/vision')
const Handlebars = require('handlebars')

const init = async () => {
    const host = '0.0.0.0'
    const port = Number.parseInt(process.argv[2], 10) || 8080

    const server = Hapi.Server({ host, port, })
    await server.register(Vision)

    server.views({
        engines: {
            html: Handlebars,
        },
        relativeTo: __dirname,
        path: 'helping',
        helpersPath: 'helping',
    })

    server.route({
        path: '/',
        method: 'GET',
        handler: {
            view: 'index.html'
        },
    })

    await server.start()
    console.log(`Listening on ${server.info.uri}...`)
}

init()
