/* eslint-disable semi */
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const path = require('path')

const init = async () => {
    const host = '0.0.0.0'
    const port = Number.parseInt(process.argv[2], 10) || 8080
    const server = Hapi.Server({ host, port })

    await server.register(Inert)

    server.route({
        path: '/foo/bar/baz/{public}',
        method: 'GET',
        handler: {
            directory: {
                path: path.join(__dirname, 'public')
            }
        }
    })

    await server.start()
}

init()
