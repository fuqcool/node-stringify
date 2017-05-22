'use strict'

function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\v/g, '\\v')
    .replace(/[\b]/g, '\\b')
    .replace(/\f/g, '\\f')
}

function isType(obj, type) {
  var t = Object.prototype.toString.call(obj)
  return t === `[object ${type}]`
}

function stringify(obj) {
  if (obj == null)
    return obj + ''

  if (isType(obj, 'RegExp') || isType(obj, 'Number') || isType(obj, 'Boolean')) {
    return obj.toString()
  }

  if (typeof obj === 'function')
    return '(' + obj.toString() + ')'

  if (typeof obj === 'string')
    return "'" + escapeString(obj) + "'"

  if (isType(obj, 'Date'))
    return 'new Date(' + obj.getTime() + ')'

  if (Array.isArray(obj))
    return '[' + obj.map(v => stringify(v)).join(',') + ']'

  if (typeof obj === 'object')
    return '({' + Object.keys(obj).map(k => {
      var v = obj[k]
      return stringify(k) + ':' + stringify(v)
    }).join(',') + '})'

  throw new Error('Unsupported object: ' + obj)
}

module.exports = stringify
