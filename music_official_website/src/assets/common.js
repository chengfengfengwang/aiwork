
function openInmobile() {
    var u = navigator.userAgent;
    var isWebViewBundle = u.indexOf('immusician') != -1 || u.indexOf('buluobang') != -1 || u.indexOf('bangtabs') != -1 || u.indexOf('musiclass') != -1;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(u) || isWebViewBundle) {
        return true
    } else {
        return false
    }
}
function curUrlIsmobile() {
    if (location.pathname.indexOf('mob') != -1) {
        return true
    } else {
        return false
    }
}
function choseUrl() {
    //在移动端浏览器打开，用的pc url
    if (openInmobile() && !curUrlIsmobile()) {
        location.href = '/index_mob.html'
        
    } else if (!openInmobile() && curUrlIsmobile()) {
        location.href = '/index.html'
    }
}
//choseUrl();
