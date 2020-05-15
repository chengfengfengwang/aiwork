'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //JINKANG:'"http://iguitar.immusician.com:50000"',
  JINKANG:'"http://192.168.1.77:50000"',
  UPLOAD_URL:'"http://58.87.125.111:55555/v1/upload_material/"'
})
