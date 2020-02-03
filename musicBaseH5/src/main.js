// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/axios_config'

import './utils/rem';
import './assets/css/common.less';

import { Loading } from 'vant';
Vue.use(Loading);
import { Area } from 'vant';
Vue.use(Area);
import { Popup } from 'vant';
Vue.use(Popup);
import { Field } from 'vant';
Vue.use(Field);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
import { Dialog } from 'vant';

Vue.use(Dialog);
// Dialog.alert({
//   message: '弹窗内容'
// })
Vue.config.productionTip = false
Vue.prototype.axios = axios;

var urlParams = localStorage.getItem("urlParams") ? JSON.parse(localStorage.getItem("urlParams")) : '';
if (urlParams) {
  axios.defaults.headers.common["token"] = urlParams.token;
  axios.defaults.headers.common["uid"] = urlParams.uid;
}


(function ($) {

  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    a256 = '',
    r64 = [256],
    r256 = [256],
    i = 0;

  var UTF8 = {

    /**
     * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
     * (BMP / basic multilingual plane only)
     *
     * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
     *
     * @param {String} strUni Unicode string to be encoded as UTF-8
     * @returns {String} encoded string
     */
    encode: function (strUni) {
      // use regular expressions & String.replace callback function for better efficiency
      // than procedural approaches
      var strUtf = strUni.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function (c) {
          var cc = c.charCodeAt(0);
          return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        })
        .replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
          function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
          });
      return strUtf;
    },

    /**
     * Decode utf-8 encoded string back into multi-byte Unicode characters
     *
     * @param {String} strUtf UTF-8 string to be decoded back to Unicode
     * @returns {String} decoded string
     */
    decode: function (strUtf) {
      // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
      var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
        function (c) { // (note parentheses for precence)
          var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
          return String.fromCharCode(cc);
        })
        .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
          function (c) { // (note parentheses for precence)
            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
            return String.fromCharCode(cc);
          });
      return strUni;
    }
  };

  while (i < 256) {
    var c = String.fromCharCode(i);
    a256 += c;
    r256[i] = i;
    r64[i] = b64.indexOf(c);
    ++i;
  }

  function code(s, discard, alpha, beta, w1, w2) {
    s = String(s);
    var buffer = 0,
      i = 0,
      length = s.length,
      result = '',
      bitsInBuffer = 0;

    while (i < length) {
      var c = s.charCodeAt(i);
      c = c < 256 ? alpha[c] : -1;

      buffer = (buffer << w1) + c;
      bitsInBuffer += w1;

      while (bitsInBuffer >= w2) {
        bitsInBuffer -= w2;
        var tmp = buffer >> bitsInBuffer;
        result += beta.charAt(tmp);
        buffer ^= tmp << bitsInBuffer;
      }
      ++i;
    }
    if (!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer));
    return result;
  }

  var Plugin = $.toBase64 = function (dir, input, encode) {
    return input ? Plugin[dir](input, encode) : dir ? null : this;
  };

  Plugin.btoa = Plugin.encode = function (plain, utf8encode) {
    plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
    plain = code(plain, false, r256, b64, 8, 6);
    return plain + '===='.slice((plain.length % 4) || 4);
  };

  Plugin.atob = Plugin.decode = function (coded, utf8decode) {
    coded = coded.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    coded = String(coded).split('=');
    var i = coded.length;
    do {
      --i;
      coded[i] = code(coded[i], true, r64, a256, 6, 8);
    } while (i > 0);
    coded = coded.join('');
    return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
  };
}(window));


Vue.filter('numToNum', function (value) {
  var arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "二十一", "二十二", "二十三", "二十四"];
  return arr[value]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
