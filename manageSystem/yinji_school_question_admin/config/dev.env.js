'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_URL:'"http://192.168.1.58:8051"', 
  BASE_URL:'"http://58.87.125.111:55555"',
  UPLOAD_URL:'"http://192.168.1.62:8051/v2/upload_material/"',
  XIANSHANG:'"http://58.87.125.111:55555"',
  XIAOPO:'"http://192.168.1.133:8051"',
  //XIAOPO:'"http://58.87.125.111:55555"',
  YINCHUN:'"http://192.168.1.68:8051"',
  LIDONG_AI:'"http://192.168.1.91:22222/v3"',
  LIDONG_YINJI:'"http://192.168.1.91:8051/v2"',
  //JINKANG:'"http://58.87.125.111:55555"'
  JINKANG:'"http://192.168.1.62:8051"' 
})
