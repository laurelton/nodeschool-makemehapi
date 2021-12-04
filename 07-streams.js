/* eslint-disable semi */
const { Server } = require('@hapi/hapi')
const rot13 = require('rot13-transform')
const fs = require('fs')
const { argv } = process

const init = async () => {
    const host = '0.0.0.0'
    const port = Number.parseInt(argv[2], 10) || 8080

    const server = new Server({ host, port })

    server.route({
        path: '/',
        method: 'GET',
        handler: () => {
            const reader = fs.createReadStream('./stream/message.txt')
            return reader.pipe(rot13())
        },
    })
    await server.start()
}

init()
