/* eslint-disable semi */
const Hapi = require('@hapi/hapi')
const H2o2 = require('@hapi/h2o2')
const { argv } = process

const init = async () => {
    const host = '0.0.0.0'
    const port = Number.parseInt(argv[2], 10) || 8080

    const server = Hapi.Server({ host, port })
    await server.register(H2o2)

    server.route({
        path: '/proxy',
        method: 'GET',
        handler: {
            proxy: {
                host: '127.0.0.1',
                port: 65535,
            }
        },
    })

    await server.start()
}

init()
