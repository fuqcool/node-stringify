var _ = require('underscore')

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

var defaultOptions = {
  parenthesis: true
}

function stringify(obj, options) {
  options = typeof options === 'object' ? options : {}
  options = {
    parenthesis: isUndefined(options.parenthesis) ? defaultOptions.parenthesis : options.parenthesis
  }
  
  if (_.isNull(obj)) return 'null'
  if (_.isUndefined(obj)) return 'undefined'
  if (_.isRegExp(obj) || _.isNumber(obj) || _.isBoolean(obj))
    return obj.toString()

  if (_.isFunction(obj))
    return options.parenthesis ? '(' + obj.toString() + ')' : obj.toString()

  if (_.isString(obj))
    return "'" + escapeString(obj) + "'"

  if (_.isDate(obj)) return 'new Date(' + obj.getTime() + ')'

  if (_.isArguments(obj))
    obj = _.toArray(obj)

  if (_.isArray(obj))
    return '[' + _.map(obj, stringify).join(',') + ']'

  if (_.isObject(obj))
    return options.parenthesis ? ('({' + _.map(obj, function (v, k) {
      return stringify(k) + ':' + stringify(v)
    }).join(',') + '})') : ('{' + _.map(obj, function (v, k) {
      return stringify(k) + ':' + stringify(v)
    }).join(',') + '}')
}

module.exports = stringify

function isUndefined(t) {
  return typeof t === 'undefined'
}
