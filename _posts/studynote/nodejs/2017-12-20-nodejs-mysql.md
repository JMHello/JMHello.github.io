---
layout: post
title: "nodejs - mysql（一）"
date: 2017-12-20 15:00:00 +0800 
categories: 学习笔记
tag: node.js
---
* content
{:toc}

> * 参考资料：
>   * 《Node.js权威指南》

<!-- more -->

## 一、建立连接与关闭连接

### 1.1 代码展示

> * test1.js

```js
/**
 * 1. 主要查看connection对象，看看其有什么属性
 * 2. 建立数据库连接
 * 3. 关闭数据库连接
 */
const mysql = require('mysql')

const options = {
  host: 'localhost',
  port: 3306,
  database: 'goods',
  user: 'root',
  password: 'sz1997'
}

let connection = mysql.createConnection(options);

// 输出 connection 对象
console.log(connection);

// 连接数据库
connection.connect(function (err) {
  if (err) {
    console.log('连接数据库失败！')
  } else {
    console.log('连接数据库成功！')
  }
})

// 关闭数据库
connection.end(function (err) {
  if (err) {
    console.log('关闭数据库失败！')
  } else {
    console.log('关闭数据库成功！')
  }
})
```

> * `connetion` 对象的输出

```
Connection {
  domain: null,
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  config:
   ConnectionConfig {
     host: 'localhost',
     port: 3306,
     localAddress: undefined,
     socketPath: undefined,
     user: 'root',
     password: 'sz1997',
     database: 'goods',
     connectTimeout: 10000,
     insecureAuth: false,
     supportBigNumbers: false,
     bigNumberStrings: false,
     dateStrings: false,
     debug: undefined,
     trace: true,
     stringifyObjects: false,
     timezone: 'local',
     flags: '',
     queryFormat: undefined,
     pool: undefined,
     ssl: false,
     multipleStatements: false,
     typeCast: true,
     maxPacketSize: 0,
     charsetNumber: 33,
     clientFlags: 455631 },
  _socket: undefined,
  _protocol:
   Protocol {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     readable: true,
     writable: true,
     _config:
      ConnectionConfig {
        host: 'localhost',
        port: 3306,
        localAddress: undefined,
        socketPath: undefined,
        user: 'root',
        password: 'sz1997',
        database: 'goods',
        connectTimeout: 10000,
        insecureAuth: false,
        supportBigNumbers: false,
        bigNumberStrings: false,
        dateStrings: false,
        debug: undefined,
        trace: true,
        stringifyObjects: false,
        timezone: 'local',
        flags: '',
        queryFormat: undefined,
        pool: undefined,
        ssl: false,
        multipleStatements: false,
        typeCast: true,
        maxPacketSize: 0,
        charsetNumber: 33,
        clientFlags: 455631 },
     _connection: [Circular],
     _callback: null,
     _fatalError: null,
     _quitSequence: null,
     _handshake: false,
     _handshaked: false,
     _ended: false,
     _destroyed: false,
     _queue: [],
     _handshakeInitializationPacket: null,
     _parser:
      Parser {
        _supportBigNumbers: false,
        _buffer: <Buffer >,
        _nextBuffers: [BufferList],
        _longPacketBuffers: [BufferList],
        _offset: 0,
        _packetEnd: null,
        _packetHeader: null,
        _packetOffset: null,
        _onError: [Function: bound handleParserError],
        _onPacket: [Function: bound ],
        _nextPacketNumber: 0,
        _encoding: 'utf-8',
        _paused: false } },
  _connectCalled: false,
  state: 'disconnected',
  threadId: null }
```

### 1.2 options的配置

> * 忘记了，就查一查，多用就会熟练了！

![mysql](/styles/images/nodejs/mysql/mysql-01.png)

### 1.3 具体说明

> * 以下是建立连接与关闭连接的步骤

```js
// 1. 创建数据库连接对象
let connection = mysql.createConnection(options);

// 2. 连接数据库方法
connection.connect(function(err) {
  // ...
})

// 3. 关闭数据库的方法
connection.end(function(err) {
  // ...
})
```

---

> * 补充：
>   1. `err` 是 连接失败 或者 关闭失败 时触发的错误对象。
>       * 特别要主要的一个 `error` 值：`PROTOCOL_CONNECTION_LOST`, 表示与数据库服务器之间的连接丢失(可能是因为断网／断电等原因)
>   2. `end` 方法： 向 `MYSQL` 数据库服务器发送一个用于关闭连接的 `COM_QUIT` 数据包前将所有被挂起的查询操作执行完毕，若期间遇到致命错误则放在 `err` 对象中，但仍然会关闭连接。
>       * `destroy()`: （不适用任何参数）关闭连接的同时，会销毁与数据库对象之间建立连接用的端口对象，但不执行被挂起的操作。

### 1.4 解决回调繁琐问题

> * 利用 `Promise` 就可以解决 `mysql` 回调繁琐问题

> * test2.js

```js
let connection = mysql.createConnection(options);

// 建立连接
let connect = function () {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 关闭连接
let end = function () {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 测试
connect().
  then(() => {
  console.log('连接数据库成功！')
  // 关键
  return end()
})
  .then(() => {
  console.log('关闭数据库成功！')
})
```

## 二、执行数据的基本处理

### 2.1 语法介绍

> * `connection.query(sql, [parameters], [callback])`
>   * `sql`：字符串，指定需要用来执行的 `SQL` 表达式
>   * `[parameters]`：数组或对象，用来存放 `SQL` 参数值字符串中需用到的所有参数值
>   * `[callback]`：回调函数，用于指定执行数据增删查改结束时需执行的回调函数。
>      * 即：`function (err, results) {}`；`err` 为执行数据的增删查改操作失败时触发的错误对象，`results` 为一个对象，表示操作的执行结果。

### 2.2 demo

> * test3.js

```js
/**
 * 1. 主要解决mysql建立连接和关闭连接的回调繁琐问题
 */
const mysql = require('mysql')

const options = {
  host: 'localhost',
  port: 3306,
  database: 'goods',
  user: 'root',
  password: 'sz1997'
}

let connection = mysql.createConnection(options);

// 建立连接
let connect = function () {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 关闭连接
let end = function () {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 数据处理
let query = function (sql, parameters) {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

// 测试
connect().
  then(() => {
  console.log('连接数据库成功！')
  return query(`SELECT * FROM list WHERE id = 1`)
})
  .then((results) => {
  console.log(results)
  return end()
  })
  .then(() => {
  console.log('关闭数据库成功！')
})
```

### 2.3 增删查改的results展示

> * 查找(`SELECT`)数据 - 结果为数组

![mysql](/styles/images/nodejs/mysql/mysql-02.png)

> * 添加数据(`INSERT`) - 结果为对象

![mysql](/styles/images/nodejs/mysql/mysql-03.png)

> * 修改数据(`UPDATE`) - 结果为对象

![mysql](/styles/images/nodejs/mysql/mysql-04.png)

> * 删除数据(`DELETE`) - 结果为对象

![mysql](/styles/images/nodejs/mysql/mysql-05.png)

### 2.4 connection.escape()

> * `connection.escape()`：对用户输入的数据进行 `escape` 编码处理，规则如下：

![mysql](/styles/images/nodejs/mysql/mysql-06.png)

---

> * 除此之外还可以通过在 `Connection` 对象的 `query` 方法所使用的查询语句中使用参数，在 `parameters`参数值对象或数组
>   中指定参数值的方法来执行 `escape`编码处理。

> * 方法1：`parameters` 参数值为对象
>   * 这个方法的局限在于：只能用于有类似于名值对这种形式的数据，例如：`name=xxx`
>   * 除此之外，它只能用于只有一个问号的地方，如果有多个问号的话，建议使用`parameters` 参数值为数组的方法。

```js
// 适用于增加、更新数据的操作

// 增加操作
query(`INSERT INTO list SET ?`, {id: 16,name: '芒果'})

// 更新数据的操作
query(`UPDATE list SET ? WHERE id=2`, {name: '橘子'})
query(`UPDATE list SET name="橘子" WHERE ?`, {id: 2})
```

> * 方法2：`parameters` 参数值为数组
>   * 这个比较大众化，对数据的增删查改操作都可以使用，唯一的不足就是必须按问好的顺序去填写对应的值

```js
// 增加操作
query(`INSERT INTO list SET id=?, name=?`, [16, '芒果'])
// 如果是表名的话，就要用两个??
query(`INSERT INTO ?? SET id=?, name=?`, ['list', 16, '芒果'])
```

### 2.5 demo下载

> * [demo](/effects/demo/nodejs/mysqlModel/mysqlModel.zip)