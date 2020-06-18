'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./yinji.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //UPLOAD_URL:'"http://192.168.1.62:55555/v1/upload_material/"', 
  UPLOAD_URL:'"http://58.87.125.111:55555/v1/upload_material/"',
  XIANSHANG:'"http://58.87.125.111:55555"',
  XIAOPO:'"http://192.168.2.129:22223"',
  YINGCHUN:'"http://192.168.1.62:55556"',
  LIDONG_AI:'"http://192.168.1.91:22222/v3"',
  LIDONG_YINJI:'"http://192.168.1.91:55555/v1"',
  JINKANG:'"http://192.168.2.75:55555"',
  PEILUN:'"http://192.168.2.73:33333/v2"',
  VERSION:'"v1"' 
})
