const {count} = require('./counter')
setTimeout(() => {
    console.log('read count after 1000ms in commonjs is', count)
}, 1000);
console.log(count)