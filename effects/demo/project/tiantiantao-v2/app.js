const koa = require('./server/express/application')
const app = new koa()



app.listen(3000, () => console.log('开始监听3000端口'))