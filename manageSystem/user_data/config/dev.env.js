'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  YINGCHUN:'"http://192.168.1.66:22222"', 
  JINKANG:'"http://192.168.1.77:22222"', 
  CHENGLONG:'"/chenglong"',
  LIDONG:'"http://192.168.1.91:22222"',
  XIAOPO:'"http://192.168.1.114:55555"',
  PEILUN:'"http://192.168.1.83:55555"',
  WULIU:'"http://192.168.2.35:33333/v1"',
  COURSE_LIST:'"http://58.87.125.111:55555"'
})
