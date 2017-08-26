---
layout: post
title: "ES6 - String扩展 - 模板编译实例"
data: 2017-08-26 21:27:00 +0800
categories: 学习笔记
tag: ES6
---
* content
{:toc}

其他链接：

+ [ES6 - String扩展]({{ '/2017/08/26/ES6-String' | prepend: site.baseurl }})

> 以下内容全部源于： [http://es6.ruanyifeng.com/#docs/string](http://es6.ruanyifeng.com/#docs/string)

<!-- more -->

* 下面，我们来看一个通过模板字符串，生成正式模板的实例。

```es6
var template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
```

上面代码在模板字符串之中，放置了一个常规模板。该模板使用<%...%>放置JavaScript代码，使用<%= ... %>输出JavaScript表达式。

怎么编译这个模板字符串呢？

* 一种思路是将其转换为JavaScript表达式字符串。

```es6
echo('<ul>');
for(var i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');
```

* 这个转换使用正则表达式就行了。

```es6
var evalExpr = /<%=(.+?)%>/g;
var expr = /<%([\s\S]+?)%>/g;

template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';
```

* 然后，将template封装在一个函数里面返回，就可以了。

```es6
var script =
`(function parse(data){
  var output = "";

  function echo(html){
    output += html;
  }

  ${ template }

  return output;
})`;

return script;
```

* 将上面的内容拼装成一个模板编译函数compile。

```es6
function compile(template){
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
  `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}
```
compile函数的用法如下。

```js
var parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```