'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  XIAOPO:'"http://192.168.1.193:22222"',  
  //XIAOPO:'"http://hot.test.immusician.com:2525"',
  XIAOPO_SEARCH:'"http://192.168.1.193:22222"',  
  //JINKANG:'"http://iguitar.immusician.com:50000"'
  JINKANG:'"http://192.168.1.120:50000"'
  
})
