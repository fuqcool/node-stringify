var _ = require('underscore')

var stringify = function (obj) {
  if (_.isNull(obj)) { return 'null' }
  if (_.isUndefined(obj)) { return 'undefined' }
  if (_.isRegExp(obj) || _.isNumber(obj) || _.isBoolean(obj)) {
    return obj.toString()
  }

  if (_.isFunction(obj)) {
    return '(' + obj.toString() + ')'
  }

  if (_.isString(obj)) {
    return "'" + obj.replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'"
  }

  if (_.isDate(obj)) { return 'new Date(' + obj.getTime() + ')' }

  if (_.isArray(obj)) {
    return '[' + _.map(obj, stringify).join(',') + ']'
  }

  if (_.isObject(obj)) {
    return '({' + _.map(obj, function (v, k) { return k + ':' + stringify(v) }).join(',') + '})'
  }
}

module.exports = stringify
