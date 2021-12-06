const Hapi = require('@hapi/hapi')
const Joi = require('joi')

const init = async () => {
    const port = Number.parseInt(process.argv[2], 10) || 8080
    const host = '0.0.0.0'

    const server = Hapi.Server({ host, port, })

    const path = '/chickens/{breed?}'
    const method = 'GET'
    const handler = (req, h) => {
        return `You asked for the chicken ${req.params.breed}`
    }

    server.route({
        path,
        method,
        handler,
        config: {
            validate: {
                params: Joi.object({
                    breed: Joi.string().required(),
                }),
            },
        },
    })

    await server.start()
}

init()
