Page({
    onLoad: function(){
        this.setData({
            slideButtons: [{
              type: 'warn',
              text: '警示',
              extClass: 'test',
                src: '/page/weui/cell/icon_del.svg', // icon的路径
            }],
        });
    },
    slideButtonTap(e) {
        console.log('slide button tap', e.detail)
    }
});