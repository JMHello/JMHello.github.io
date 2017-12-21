---
layout: post
title: "nodejs - mysql（二）"
date: 2017-12-21 15:00:00 +0800 
categories: 学习笔记
tag: node.js
---
* content
{:toc}

> * 参考资料：
>   * 《Node.js权威指南》

<!-- more -->

## 一、创建连接池

### 1.1 为什么要创建连接池

> * 原因：建立一个数据库连接所消耗的性能成本比较高
>   * 在服务器应用程序中，如果为每一个接收到的客户端请求都建立一个或多个数据库连接，将严重降低应用程序的性能。
>   * 因此，在服务器应用程序中，通常需要为多个数据库连接创建并维护一个连接池，当连接不再需要使用的时候，这些
>       连接可以缓存在连接池中，当接收到下一个客户端请求时，可以从连接池中取出连接并重新利用，而不需要再重新建立数据库连接。

### 1.2 步骤

> * 1.创建连接池：`let pool = mysql.createPool(options)`， `options` 如下

![mysql](/styles/images/nodejs/mysql/mysql-07.png)


> * 2.从连接池中获取连接：`pool.getConnection(callback)`，`callback` 如下：
>   * `function (err, connection) {}`：`err`为获取连接操作失败时触发的错误对象；`connection`是获取到的连接对象，当获取连接操作失败时，其值为 `undefined`。

> * 3.释放连接：`connection.release()` 或者 移除连接：`connection.destroy()`
>   * 释放连接指：当一个连接不需要使用时，可以将其归还到连接池中
>   * 移除连接：当一个连接不需要使用且需要从连接池中移除【当一个连接被一处后，连接池中的连接数会相应减1】

> * 3.关闭连接池：`pool.end()`
>   * 当一个连接池不需要使用时，就可以关闭它。

### 1.3 demo

> * test4.js

```js
let pool = mysql.createPool(options);

/**
 * 建立连接池
 * @returns {Promise}
 */
let getConnection = function () {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}

/**
 *
 * @param connection 连接对象
 * @param sql
 * @param parameters
 * @returns {Promise}
 */
let query = function (connection, sql, parameters) {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    }).on('end', () => {
      console.log('本次数据库操作完毕！')
      // 记得释放连接，不然后果很严重！！
      try { connection.release() } catch (e) {};
    })
  })
}

// 这里用了 es7 的语法糖：async/await
getConnection()
  .then(async (connection) => {
    const result1 = await query(connection, `SELECT * FROM list WHERE id=2`)
    const result2 = await query(connection, `SELECT * FROM list WHERE id=3`)
    console.log(result1, result2)
  })
```

---

> * 连接池中的 `connection` 对象：

```json
PoolConnection {
  domain: null,
  _events: { end: [Function: _removeFromPool], error: [Function] },
  _eventsCount: 2,
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
     pool:
      Pool {
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        config: [PoolConfig],
        _acquiringConnections: [],
        _allConnections: [Array],
        _freeConnections: [],
        _connectionQueue: [],
        _closed: false },
     ssl: false,
     multipleStatements: false,
     typeCast: true,
     maxPacketSize: 0,
     charsetNumber: 33,
     clientFlags: 455631,
     protocol41: true },
  _socket:
   Socket {
     connecting: false,
     _hadError: false,
     _handle:
      TCP {
        reading: true,
        owner: [Circular],
        onread: [Function: onread],
        onconnection: null,
        writeQueueSize: 0 },
     _parent: null,
     _host: 'localhost',
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: [BufferList],
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     domain: null,
     _events:
      { end: [Array],
        finish: [Function: onSocketFinish],
        _socketEnd: [Function: onSocketEnd],
        data: [Function],
        error: [Function: bound ],
        connect: [Function: bound ] },
     _eventsCount: 6,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     allowHalfOpen: false,
     _bytesDispatched: 68,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server: null,
     _server: null,
     _idleTimeout: -1,
     _idleNext: null,
     _idlePrev: null,
     _idleStart: 254,
     _destroyed: false,
     read: [Function],
     _consuming: true,
     [Symbol(asyncId)]: 6,
     [Symbol(bytesRead)]: 0,
     [Symbol(asyncId)]: 10,
     [Symbol(triggerAsyncId)]: 1 },
  _protocol:
   Protocol {
     domain: null,
     _events:
      { data: [Function],
        end: [Array],
        handshake: [Function: bound _handleProtocolHandshake],
        unhandledError: [Function: bound ],
        drain: [Function: bound ],
        enqueue: [Function: bound _handleProtocolEnqueue] },
     _eventsCount: 6,
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
        pool: [Pool],
        ssl: false,
        multipleStatements: false,
        typeCast: true,
        maxPacketSize: 0,
        charsetNumber: 33,
        clientFlags: 455631,
        protocol41: true },
     _connection: [Circular],
     _callback: null,
     _fatalError: null,
     _quitSequence: null,
     _handshake: true,
     _handshaked: true,
     _ended: false,
     _destroyed: false,
     _queue: [],
     _handshakeInitializationPacket:
      HandshakeInitializationPacket {
        protocolVersion: 10,
        serverVersion: '6.0.11-alpha-community',
        threadId: 41,
        scrambleBuff1: <Buffer 3d 79 6a 28 26 27 31 60>,
        filler1: <Buffer 00>,
        serverCapabilities1: 63487,
        serverLanguage: 45,
        serverStatus: 2,
        serverCapabilities2: 0,
        scrambleLength: 0,
        filler2: <Buffer 00 00 00 00 00 00 00 00 00 00>,
        scrambleBuff2: <Buffer 71 37 5d 4e 4f 21 53 5f 65 5e 28 48>,
        filler3: <Buffer 00>,
        pluginData: undefined,
        protocol41: true },
     _parser:
      Parser {
        _supportBigNumbers: false,
        _buffer: <Buffer 07 00 00 02 00 00 00 02 00 00 00>,
        _nextBuffers: [BufferList],
        _longPacketBuffers: [BufferList],
        _offset: 11,
        _packetEnd: null,
        _packetHeader: null,
        _packetOffset: null,
        _onError: [Function: bound handleParserError],
        _onPacket: [Function: bound ],
        _nextPacketNumber: 3,
        _encoding: 'utf-8',
        _paused: false } },
  _connectCalled: true,
  state: 'authenticated',
  threadId: 41,
  _pool:
   Pool {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     config:
      PoolConfig {
        acquireTimeout: 10000,
        connectionConfig: [ConnectionConfig],
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0 },
     _acquiringConnections: [],
     _allConnections: [ [Circular] ],
     _freeConnections: [],
     _connectionQueue: [],
     _closed: false } }
```

### 1.4 demo下载

> * [demo](/effects/demo/nodejs/mysqlModel/mysqlModel.zip)