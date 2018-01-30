const koa = require('./server/koa/application')
const app = new koa()

app.listen(3000, () => console.log('开始监听3000端口'))