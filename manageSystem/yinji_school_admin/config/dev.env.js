'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  YINGCHUN:'"http://192.168.1.68:22222"', 
  JINKANG:'"http://192.168.1.77:22222"', 
  CHENGLONG:'"/chenglong"',
  LIDONG:'"http://192.168.1.91:22222"',
  PEILUN:'"http://192.168.1.83:55555"'
})
