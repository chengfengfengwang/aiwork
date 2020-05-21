'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  JINKANG: '"http://58.87.125.111:2525"',
  LIDONG:'"http://58.87.125.111:2525"',
  YINGCHUN:'"http://58.87.125.111:2525"',
  CHENGLONG:'"http://58.87.125.111:2525"',
  XIAOPO:'"http://58.87.125.111:55555"',
  PEILUN:'"http://api.yinji.immusician.com:55555"',
  //WULIU:'"http://58.87.125.111:6363/v1"',
  WULIU:'"http://192.168.2.73:33333/v1"',
  COURSE_LIST:'"http://58.87.125.111:55555"',
  SMS:'"http://58.87.125.111:6363/v1"'
})

