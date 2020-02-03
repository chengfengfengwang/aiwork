'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',  
  JINKANG:'"http://58.87.125.111:55555"',
  XIAOPO:'"http://192.168.1.193:55555"',
  YINJISCHOOL:'"http://api.school.immusician.com"'
  //JINKANG:'"http://192.168.1.120:55555"'
  //JINKANG:'"http://192.168.1.171:55555"'
})
