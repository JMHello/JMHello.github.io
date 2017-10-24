---
layout: post
title: "jQuery - 代码分析之init (101-194)"
date: 2017-10-21 19:00:00 +0800 
categories: 原创
tag: jQuery
---
* content
{:toc}

其他链接：




<!-- more -->

## 一、inti 函数的基本构架 (101-194)

```js
jQuery.fn = jQuery.prototype = {
  init: function(selector, context, rootQuery) {
    if ( !selector ) {} // 1
    if ( typeof selector === "string" ) {} // 2
    else if ( selector.nodeType ) {} // 3
    else if ( jQuery.isFunction( selector ) ) {} // 4
    if ( selector.selector !== undefined ) {} // 5
  }
}
```

> 1. 应对的是这些情况： ` $("")` 、 `$(null)` 、 `$(undefined)` 、 `$(false)`。
> 2. 对传入的字符串进行处理：
>   * 例如：`$('div')` , `$('#div1')`, `$('.box')`, `$('#div div.box')`, `$('<div>')`, `$('<div>aa</div><div>ll</div>')`。
> 3. 处理 `DOM` 元素，如 `$(this)`、`$(document)`。
> 4. 处理函数：如：`$(function(){})`。
> 5. 处理其他情况的，如：`$([])`、`$({})`。

## 二、 情况1 （104 - 107）

> * 源码 （104 - 107）

```js
 // HANDLE: $(""), $(null), $(undefined), $(false)
if ( !selector ) {
    return this;
}
```

> * 当遇到 `$("")`, `$(null)`, `$(undefined)`, `$(false)`这四种情况证明无需处理，直接返回 `jQuery` 对象。

## 三、 情况2 （109 - 177）

### 3.1 源码（109 - 177）

```js
if ( typeof selector === "string" ) {
    if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [ null, selector, null ];
    } else {
        match = rquickExpr.exec( selector );
    }

// Match html or make sure no context is specified for #id
    if ( match && (match[1] || !context) ) {
    
        // HANDLE: $(html) -> $(array)
        if ( match[1] ) {
            context = context instanceof jQuery ? context[0] : context;
        
            // scripts is true for back-compat
            jQuery.merge( this, jQuery.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document,
                true
            ) );
        
            // HANDLE: $(html, props)
            if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                for ( match in context ) {
                    // Properties of context are called as methods if possible
                    if ( jQuery.isFunction( this[ match ] ) ) {
                        this[ match ]( context[ match ] );
        
                        // ...and otherwise set as attributes
                    } else {
                        this.attr( match, context[ match ] );
                    }
                }
            }
        
            return this;
        
            // HANDLE: $(#id)
        } else {
            elem = document.getElementById( match[2] );
        
            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            if ( elem && elem.parentNode ) {
                // Inject the element directly into the jQuery object
                this.length = 1;
                this[0] = elem;
            }
        
            this.context = document;
            this.selector = selector;
            return this;
        }
    
        // HANDLE: $(expr, $(...))
    } else if ( !context || context.jquery ) {
        return ( context || rootjQuery ).find( selector );
    
        // HANDLE: $(expr, context)
        // (which is just equivalent to: $(context).find(expr)
    } else {
        return this.constructor( context ).find( selector );
    }
}
```

### 3.2  109-110

```js
  if ( typeof selector === "string" ) {}
```

> * 如果 `selector` 是字符串则执行。

### 3.3 111-117

```js
if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
    // Assume that strings that start and end with <> are HTML and skip the regex check
    match = [ null, selector, null ];
} else {
    match = rquickExpr.exec( selector );
}
```

> * **`if` 语句中**：
>   * 参数 `selector` 的第一个位置是 `<` 以及最后一个位置是 `>`，并且其字符串长度大于或等于3 ======》 其实这里说的就是像 `$('<div></div>')` 、`$('<li>')` ，即：`html`标签。 
>   * `match` 最后结果为 `match = [null, '<li>', null]` 或 `match = [null, '<div>aaa</div>', null]`。

> * **`else` 语句中**：【即：非单纯 `<xxx>`的`html`标签的形式】
>   * `rquickExpr` ====》 `/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/`，而 `exec` 方法的返回形式则为
>       * [与整个模式匹配的字符串, 与第一个捕获组匹配的字符串， 第二个...]
>   * 因此，`else`语句的 `match` 就会有以下对应的形式：【**点击打开快速匹配的[demo](/effects/demo/demo-jquery/init/eg1.html)**】
>       * `$('<li>Hello)`： `match` ===》 `['<li>Hello', '<li>', undefined]`。【从这里可以看出为什么 `$('<li>hello')` 最后得到的还是 `<li></li>` 】
>       * `$('#div1')`： `match` ====》 `['#div', undefined, 'div']`。
>       * `$('div')` 、`$('.div')` 、`$('#div div.box')`： `match` ====》 `null`。

### 3.4 119-120

```js
 // Match html or make sure no context is specified for #id
if ( match && (match[1] || !context) ) { }
```

> *  表明能进入此 `if` 分支的只有：
>   * **标签** ：`$('<li>')`, `$('<li>1</li><li>2</li>')`。
>   * **`id`** ：`$('#div')`。 
> * `match`： 不接受 `match = null`的情况，即：`$('div')` 、`$('.div')` 、`$('#div div.box')`。
> * `!context`：说明是 `id`。

### 3.5 122-123 && 149-150

```js
// HANDLE: $(html) -> $(array)
if ( match[1] ) {}

// HANDLE: $(#id)
else{}
```

> * **`if`语句**：处理标签，如 `$('<li>')`, `$('<li>1</li><li>2</li>')`。
> * **`else`语句**：处理 `id` ，如 `$('#div1')`。

### 3.5 124

```js
context = context instanceof jQuery ? context[0] : context;
```

### 3.6 126-131

```js
// scripts is true for back-compat
jQuery.merge( this, jQuery.parseHTML(
    match[1],
    context && context.nodeType ? context.ownerDocument || context : document,
    true
) );
```

> * **`jQuery.paresHTML(data [, context ] [, keepScripts ] )`**： 使用原生方法将字符串转换为一个DOM节点的集合，然后可以插入到文档。
>   * `data`：用来解析的 `HTML` 字符串。
>       * `match[1]`：就是需要转换的`html`字符串。
>   * `context`：`DOM` 元素的上下文，在这个上下文中将创建的 `HTML` 片段。
>        * `context && context.nodeType ? context.ownerDocument || context : document`：这里指的就是根节点。
>   * `keepScripts`：一个布尔值，表明是否在传递的 `HTML` 字符串中包含脚本。
>       * `true`：表明在传递的`HTML`字符串中包含脚本

> * 这里要提一个小问题：为什么还需要 `context && context.nodeType` 进行判断呢？
> * 

---

> * **`jQuery.merge(first, second)`**：合并两个数组内容到第一个数组。【返回值：数组】
> * `first`：第一个用于合并的数组，其中将会包含合并后的第二个数组的内容。
>   * `this`：
> * `second`：第二个用于合并的数组，该数组不会被修改，其中的内容将会被合并到第一个数组中。
>   * 


