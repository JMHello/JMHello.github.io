---
layout: post
title: "javasript - 设计模式 - 适配器模式"
data: 2017-09-13 14:27:00 +0800
categories: 原创
tag: js-设计模式
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    
* 以下内容部分都摘自书本：《JavaScript设计模式与开发实践》 第十七章 适配器模式

<!-- more -->

## 一、什么是适配器模式

* 适配器模式（`adapter pattern`）的作用：解决两个软件实体间的接口不兼容的问题。
    * 简单理解：适配器模式就是不影响原有的实现方式，兼容调用旧接口的代码。

* 下面举个小例子，解释一下适配器，看下图。

![relationship-map]({{ '/styles/images/javascript/designPattern/designPattern-01.png' | prepend: site.baseurl }})

## 二、适配器的应用

### 2.1 数组转换为对象的适配器

```js
// 现在的数据是以数组存储
var person = [
    'jm', // name
    22, // age
    'student', // job
    'girl' // sex
];

// 此时我们有了一个新功能接口
function showPersonDetail(user) {
    console.log('当前用户：' + user.name);
    console.log('性别' + user.sex);
    console.log('职业' + user.job);
    console.log('年龄' + user.age);
}

// 所以我们现在就要新的存储数据的结构----使用对象
var person = {
    name: 'jm',
    age: 22,
    job: 'student',
    sex: 'girl'
}

// 然而，我们要求不得直接修改原来存储的数据结构，即：我们要手动将数据的存储结构由数组转化为对象。所以，这里就需要使用适配器模式了。
/**
 * @param arr [Array]
 * @return [Object]
 */
function arrayToObjAdapter(arr) {
  return {
      name: arr[0],
      age: arr[1],
      job: arr[2],
      sex: arr[3]
  }
}


```

### 2.2 地图适配器

```js
var googleMap = {
 show: function(){
    console.log( '开始渲染谷歌地图' );
 }
};
var baiduMap = {
 show: function(){
    console.log( '开始渲染百度地图' );
 }
};
var renderMap = function( map ){
    if ( map.show instanceof Function ){
    map.show();
 }
};
renderMap( googleMap ); // 输出：开始渲染谷歌地图
renderMap( baiduMap ); // 输出：开始渲染百度地图 
```

* 假设`baiduMap`展示地图的方法不叫`show`而是`display`，并且`baiduMap`源于第三方，所以我们不能擅自把别人的东西给改了。因此，我们就要自己做出改变。

```js
// 展示google地图的方法是show
var googleMap = {
    show: function(){
        console.log( '开始渲染谷歌地图' );
    }
};

// 展示百度地图的方法是display
var baiduMap = {
    display: function(){
        console.log( '开始渲染百度地图' );
    }
};

// 建立一个百度地图展示的适配器，那么renderMap又可以正常使用了
var baiduMapAdapter = {
    show: function(){
        return baiduMap.display(); 
    }
};

var renderMap = function( map ){
    if ( map.show instanceof Function ){
        map.show();
    }
}; 

renderMap( googleMap ); // 输出：开始渲染谷歌地图
renderMap( baiduMapAdapter ); // 输出：开始渲染百度地图

```

## 三、总结

个人觉得适配器模式都是在不修改别人的代码的基础上，自己手动将别人的代码兼容到自己的代码上，从而使功能能正常运作。