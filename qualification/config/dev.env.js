'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',  
  LIUXIN:'"http://123.206.19.158:5438"'
})
