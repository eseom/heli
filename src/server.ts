import * as Joi from 'joi'
import { server, logger } from 'hails'

server
  .init({})
  .then((done) => {
    server.route({
      method: 'POST',
      path: '/log',
      config: {
        id: 'log',
        validate: {
          payload: {
            message: Joi.string().required(),
          },
        },
      },
      handler: function (request, reply) {
        console.log(request.payload)
        return reply('world!')
      }
    })
    server.route({
      method: 'GET',
      path: '/hello',
      config: {
        id: 'hello',
      },
      handler: function (request, reply) {
        return reply('world!')
      }
    })
    done()
    logger.info('start')
  })