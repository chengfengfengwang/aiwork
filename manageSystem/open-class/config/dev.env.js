'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   //JINKANG:'"http://iguitar.immusician.com:50000"',
//    JINKANG:'"http://iguitar.immusician.com:50000"',
//   UPLOAD_URL:'"http://58.87.125.111:55555/v1/upload_material/"'
// })
module.exports = {
  NODE_ENV: '"production"',
  XIAOPO:'"http://iguitar.immusician.com:2525"',
  JINKANG:'"http://iguitar.immusician.com:50000"',
  XIAOPO_SEARCH:'"http://hot.test.immusician.com:2525"',  
  UPLOAD_URL:'"http://58.87.125.111:55555/v1/upload_material/"'
}
