## 1、块级元素和行级元素的区别是什么？常见的块级元素和行内元素分别有？

1）块级元素和行级元素的区别
块级元素：
A、在没有设置宽度的情况下，块级元素的宽度满屏，即：块级元素占满整行，起到了换行的效果；
B、块级元素支持高度，即：在块级元素上设置height、上下padding都起作用
C、块级元素可包含块级元素或者行级元素

行级元素：
A、行级元素的宽度为其内容宽；
B、行级元素不支持高度，即：在行级元素上设置height、上下padding没有用处，除非设置line-height。
C、行级元素一般只包含行级元素

补充：可以通过css属性display实现块级元素以及行级元素的相互转换。

2）
常见的块级元素有：
<div>、<p>、<hn>系列标签、<hr>、<ul>、<ol>、<li>、<nav>、<article>、<header>、<footer>、<section>、<form>、<button>、<aside>

常见的行内元素有：
<i>、<span>、<img>、<b>、<strong>、<em>

## 2、Doctype的作用是什么？标准模式和兼容模式有什么区别？

1）Doctype是一个文档声明，用来告诉浏览器应该以怎么样的标准去解析文档，如果Doctype不存在或者格式不正确会导致文档以兼容模式呈现。

2）在讲标准模式和兼容模式的区别之前，先讲一下css的一个属性box-sizing，它用来规定一个元素应该以怎么样的标准去形成其盒子模型。

box-sizing有两个值：

第一个值是：content-box，是W3C标准盒子模型。当box-sizing = content-box时：
元素内盒子宽度 = 元素的内容宽（width） + 左右padding + 左右border
元素内盒子高度 = 元素的内容高（height）+ 上下padding + 上下border

第二个值是：border-box，是IE标准的盒子模型。当box-sizing = border-box时：
元素内盒子宽度 = width （width = 元素内容宽度 + 左右padding + 左右border）
元素内盒子高度 = height （height = 元素内容高度 + 上下padding + 上下border）

由上述可知，其实标准模式和兼容模式的最主要区别就在于元素是以什么标准去形成自己的盒子模型。

补充：在js中，可以通过document.compatMode判定浏览器采用的模式。
当document.compatMode = BackCompat时，浏览器采用兼容模式（即：怪异模式）
当document.compatMode = CSS1Compat时，浏览器采用标准模式

## 3、说说你对HTML语义的理解

先说一说什么HTML语义化：
就是根据实际的内容选择合适的标签。H5也出了许多语义化的标签，如：`<article>` 、`<nav>` 等等。

现今的网页开发都是十分看重语义化，这是为什么呢？原因如下：
1）在没有看你所展现的网页前，只看你的html代码，就能知道你整个网页究竟写的是什么内容，即：代码可读性强。
2）HTML语义化能与搜索引擎建立良好的沟通关系，利于SEO
3）便于将页面更好地在屏幕阅读器、盲人阅读器等设备中展现
4）HTML语义化便于团队的维护和重构

## 4、如何水平居中一个div？如果想水平垂直居中呢？


水平居中：
1、width + margin: 0 auto;
2、子元素为行内元素 + 父元素 设置text-align:center
3、父元素和子元素都必须知道具体宽度 + 父元素设置padding
4、flex布局
5、position:absolute + left: 50% + transform: translate(-50%)

水平垂直居中：
1、flex 布局
2、position:absolute + top:50% + left: 50% + transform: translate(-50%)
3、text-align: center + line-height + vertical-align: middle

## 5、能否用纯css实现一个三角形

```html
<!-- 方法1：使用border -->
<div>
    <p>方法1：使用border</p>
    <div class="m1-triangle"></div>
</div>

<!-- 方法2：使用transform:rotate 以及一个起遮盖作用的空标签 -->
<div>
    <p>方法2：使用transform:rotate 以及一个起遮盖作用的空标签</p>
    <div class="m2-container">
        <span class="m2-triangle"></span>
        <span class="hide"></span>
    </div>
</div>
```

```css
/*
    方法1：使用border
*/
.m1-triangle {
    width: 0;
    border: 40px solid transparent;
    border-bottom-color: blue;
}

/*
   方法2：使用transform:rotate 以及一个起遮盖作用的空标签
*/
.m2-container {
    position: relative;
}
.m2-container .m2-triangle {
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    display: block;
    background: blue;
}
.m2-container .hide {
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    left: -4px;
    top: 10px;
    background: white;
}
```

## 6、为什么要清除浮动？清除浮动有哪些方法？

浮动元素会脱离正常文档流
方法：
1、浮动元素的父元素上添加类 .clearfix

```css
.clearfix:after {
    content: '';
    display: block;
    clear: both;
}
```

2、在浮动元素的后面添加空标签(空标签必须是块级元素，inline-block不可行)，空标签设置clear:both。
3、直接在浮动元素的父元素上添加overflow:hidden

## 7、和原生css相比，SASS等预处理的优势是什么？

没有使用过SASS，但了解过一点点：SASS的语法可以将一些多次被复用的css属性抽取出来，存在在一些变量里，等我们需要用到这些属性的时候，直接引用这些变量即可；除此之外，还存在样式嵌套。因此，SASS相比原生css，有这些优势：代码量少，样式结构清晰，
复用性强，从而提高了网页开发的效率。

## 8、请写一个函数randomSort(arr)，返回一个新的数组，该数组是传入数据的随机排序后的结果。

```js
/**
 * 
 * @param arr 需重排序数组
 * @return arr 返回排序后数组
 */
function randomSort (arr) {
  var temp;

  for (var i = arr.length-1; i--;) {

    for(var j = 1; j < i; j++) {

      var flag = Math.random() < Math.random() ? -1 : 1;

      if ( flag === 1) {
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }

  return arr;
}
```

## 9、写一个函数，将浮点数的整数部分每隔3位添加一个逗号，比如222222.22转为222,222.22

```js
function floatTransform (floatNum) {
  var str = floatNum + '',
      initNum = str.split('.')[0],
      floatNum = str.split('.')[1],
      pattern = /(?=((?!\b)\d{3})+$)/g;

  str = initNum.replace(pattern, ',') + '.' + floatNum;

  return str;
}

```

## 10、用ES5的语法写一个类Person，要求如下
      有一个私有属性：age  有一个公有属性：name  有一个公有方法 setAge 
      有一个私有方法：checkAge  初始化时，需要设置name和age
      
```js
(function (window) {
  // 私有变量 age
  var age;

  function Person (name, age) {

    age = age;

    // 公有变量 name
    this.name = name;

    // 私有方法 checkAge
    var checkAge = function () {
        return age;
    };
  }

  // 公有方法 setAge
  Person.prototype.setAge = function (age) {
    age = age;
  };

  window.Person = Person;
})(window)

```