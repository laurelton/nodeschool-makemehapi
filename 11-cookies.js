/* eslint-disable semi */
const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const { argv } = process

const init = async () => {
    const host = '0.0.0.0'
    const port = Number.parseInt(argv[2], 10) || 8080
    const server = Hapi.Server({ host, port, })

    const config = {
        state: {
            parse: true,
            failAction: 'log',
        }
    }

    const stateOptions = {
                        encoding: 'base64json',
                        ttl: 10,
                        domain: 'localhost',
                        path: '/',
                        isSecure: null,
                        isHttpOnly: null,
                        isSameSite: false,
                    }

    server.route([
        {
            path: '/set-cookie',
            method: 'GET',
            config,
            handler: (_, h) => {
                return h.response('Set cookie')
                    .state('session', { key: 'makemehapi' }, stateOptions )
            },
        },
        {
            path: '/check-cookie',
            method: 'GET',
            config,
            handler: (request, h) => {
                const response = request.state.session
                    ? { user: 'hapi' }
                    : Boom.unauthorized('Missing authentication')

                return h.response(response)
            },
        },
    ])

    await server.start()
}

init()
