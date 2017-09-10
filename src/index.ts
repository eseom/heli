import * as Nes from 'nes'
import * as Redis from 'redis'

const client = new Nes.Client('ws://localhost:3000', {})
const subscriber = Redis.createClient('redis://:dev@localhost:6379/5')
const publisher = Redis.createClient('redis://:dev@localhost:6379/5')

client.connect((err) => {
  if (err) {
    console.error(err)
    return
  }

  subscriber.on("message", function (channel, message) {
    client.request({
      path: 'log',
      method: 'post',
      payload: {
        message,
      },
    }, (err) => {
      if (err) { console.error('request error', err) }
    })
  })

  subscriber.subscribe("test")

  setInterval(() => {
    publisher.publish("test", "haaaaai")
    publisher.publish("test", "kthxbai")
  }, 3000)

})

// console.log(client)
// client.connect((err) => {
//   if (err) {
//     console.error(err)
//     return
//   }

//   const redis = Redis.createClient('redis://:dev@localhost:6379/5')
//   redis.subscribe('')

//   client.request('hello', (err, payload) => {
//     console.log(payload)
//   })
// })