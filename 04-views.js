/* eslint-disable semi */
const { Server } = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')
// const path = require('path')
const { argv } = process

const init = async () => {
    const host = '0.0.0.0'
    const port = Number.parseInt(argv[2], 10) || 8080

    const server = new Server({ host, port })
    await server.register(inert)
    await server.register(vision)

    server.route({
        path: '/',
        method: 'GET',
        handler: {
            view: 'index.html',
        },
    })

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        // path: path.join(__dirname, 'templates'),
        path: 'templates',
    })

    await server.start()
    console.log(`Listening on ${server.info.uri}`)
}

init()
