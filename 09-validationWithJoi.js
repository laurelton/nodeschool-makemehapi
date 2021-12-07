const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {
    const host = '0.0.0.0';
    const port = Number.parseInt(process.argv[2], 10) || 8080;

    const server = Hapi.Server({ host, port });

    server.route({
        path: '/login',
        method: 'POST',
        handler: () => {
            return 'login successful';
        },
        config: {
            validate: {
                failAction: (req, _, err) => {
                    console.log(req.payload);
                    throw err;
                },
                payload: Joi.object({
                    isGuest: Joi.boolean().required(),
                    username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
                    password: Joi.string().alphanum(),
                    accessToken: Joi.string().alphanum(),
                })
                    .options({ allowUnknown: true })
                    .without('password', 'accessToken'),
            },
        },
    });

    await server.start();
};

init();
