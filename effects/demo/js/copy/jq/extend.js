/**
 * 继承函数
 * @return {*|{}}
 */
function extend () {
  var options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[ 0 ] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // 如果deep为true，那么开启深拷贝（deep 默认为false）
  if ( typeof target === "boolean" ) {
    deep = target;
    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !isFunction( target ) ) {
    target = {};
  }

  // 当只有1个对象参数，那么就将target设置为this（在这个例子中，this指代window；而在jquery中，this指代jQuery自己）
  // 实际上就是将这个对象参数合并到 this 中（即：window中）
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // 只处理非 undefined 以及 null 的值
    if ( ( options = arguments[ i ] ) != null ) {

      // Extend the base object
      for ( name in options ) {
        // src 指代的是目标对象的值
        src = target[ name ];
        // copy 是指要合并到目标对象的对象的值
        copy = options[ name ];

        // 阻止无限循环
        // 如果 目标对象 与 要合并到目标对象的对象相等，就要跳出循环
        if ( target === copy ) {
          continue;
        }

        // deep 为 true
        // copy 存在
        // 我们合并的是对象或者是数组
        // 那么就开启深拷贝
        if ( deep && copy && ( isPlainObject( copy ) ||
            ( copyIsArray = Array.isArray( copy ) ) ) ) {

          // 拷贝的是数组
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && Array.isArray( src ) ? src : [];

          }
          // 拷贝的的对象
          else {
            clone = src && isPlainObject( src ) ? src : {};
          }

          // 如果要copy的对象中有与目标对象中的属性一样，那么后者居上
          target[ name ] = extend( deep, clone, copy );

          // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
}

/**
 * 判断是否为函数
 * @param obj
 * @return {boolean}
 */
function isFunction (obj) {
  return typeof obj === 'function'
}


/**
 * 判断是否对象，排除null（null的prototype为null）
 * @param obj
 * @return {boolean}
 */
function isPlainObject (obj) {
  return /Object/.test(Object.prototype.toString.call(obj)) && Object.getPrototypeOf(obj)
}