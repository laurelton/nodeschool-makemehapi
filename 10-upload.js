/* eslint-disable semi */
const Hapi = require('@hapi/hapi')
const Joi = require('joi')
const { argv } = process

const init = async () => {
    const host = '0.0.0.0'
    const port = Number.parseInt(argv[2], 10) || 8080

    const server = Hapi.Server({ host, port })
    const path = '/upload'
    const method = 'POST'
    const handler = async (req, h) => {
        const fileObj = new Promise((resolve, reject) => {
            const { description, file } = req.payload
            const { filename, headers } = file.hapi
            let data = ''

            file.on('data', (chunk) => {
                data += chunk
            })

            file.on('end', () => {
                const response = {
                    description,
                    file: {
                        data,
                        filename,
                        headers,
                    },
                }
                resolve(response)
            })

            file.on('error', (err) => reject(err))
        })

        return h.response(await fileObj)
    }
    const failAction = (req, _, err) => {
        console.log('FAILED REQUEST')
        console.log(req.payload)
        throw err
    }
    const payload = {
        multipart: true,
        output: 'stream',
        parse: true,
    }
    const config = {
        validate: {
            failAction,
            payload: Joi.object({
                description: Joi.string().required(),
                file: Joi.any().required(),
            }),
        },
        handler,
        payload,
    }

    server.route({
        path,
        method,
        config,
    })

    await server.start()
}

init()
