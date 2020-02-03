

const isIphonex = () => {
    if (typeof window !== 'undefined' && window) {
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
    }
    return false;
};
function isWebview() {
    var u = navigator.userAgent;
    var isWebViewBundle = u.indexOf('immusician') != -1 || u.indexOf('buluobang') != -1 || u.indexOf('bangtabs') != -1 || u.indexOf('musiclass') != -1;
    return isWebViewBundle
}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return '';
}
export { isIphonex, isWebview, getQueryVariable }