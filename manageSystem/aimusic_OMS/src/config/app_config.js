const config = {
    debug: false,
    // main_host:'http://iguitar.immusician.com:2525',
    main_host:'http://hot.test.immusician.com:22225',
    test_host:'http://192.168.1.235:22222',
    li_dong:'http://hot.test.immusician.com:2525',
    //li_dong:'http://192.168.1.254:22222'


    formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }
};
export default config;