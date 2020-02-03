'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // XIAOPO:'"http://192.168.1.62:8001"',
  XIAOPO:'"http://api.agency.immusician.com"',
  //YINGCHUN:'"http://api.agency.immusician.com"',
  //TEACHER_VIDEO:'"http://api.agency.immusician.com:8009/v1"'
  TEACHER_VIDEO:'"http://192.168.1.62:8009/v1"',
  AGENTSV1:'"http://192.168.1.62:8100/v1"',
  AGENTSV9:'"http://192.168.1.62:8001/v9"',
  COURSE_LIST:'"http://192.168.1.62:55556/v9"'
})
