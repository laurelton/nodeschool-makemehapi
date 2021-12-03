/* eslint-disable semi */
const Hapi = require('@hapi/hapi')

const host = '0.0.0.0'
const port = Number.parseInt(process.argv[2], 10) || 8080
const serverOptions = { host, port };

(async () => {
    const server = Hapi.Server(serverOptions)
    const handler = (req, _) => `Hello ${req.params.name}`

    server.route({
        path: '/{name}',
        method: 'GET',
        handler,
    })

    await server.start()
})();
