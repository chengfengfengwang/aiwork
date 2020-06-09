import Vue from 'vue'
import Router from 'vue-router'

// import ukulelePac from './src/ukulelePac.vue'
// import ukuleleES from './src/ukuleleES.vue'
// import djembePac_ad from './src/djembePac_ad.vue' 
// import ukuleleGsc from './src/ukuleleGsc.vue' 
// import djembePac from './src/djembePac.vue'
// import qimeng from './src/qimeng_new.vue'

const ukulelePac = () => import('./src/ukulelePac.vue')
const ukuleleES = () => import('./src/ukuleleES.vue')
const djembePac_ad = () => import('./src/djembePac_ad.vue')
const ukuleleGsc = () => import('./src/ukuleleGsc.vue')
const djembePac = () => import('./src/djembePac.vue')
const qimeng = () => import('./src/qimeng_new.vue')
const qimengM = () => import('./src/qimeng_m.vue')
const dash = () => import('./src/dash.vue') 
const christmasUklele = () => import('./src/christmasUklele.vue')
const christmasDjembe = () => import('./src/christmasDjembe.vue')
const hitMusic = () => import('./src/hitMusic.vue') 
const travelUkulele = () => import('./src/travelUkulele.vue')
const travelUkuleleMid = () => import('./src/travelUkuleleMid.vue')
const worldTravel = () => import('./src/worldTravel.vue')
const instrumentsKing = () => import('./src/instrumentsKing.vue')
const doctorXieBody = () => import('./src/doctorXieBody.vue')
const doctorXieBody1 = () => import('./src/doctorXieBody1.vue')
const musicCastle = () => import('./src/musicCastle.vue')
const shanshanPacQimeng = () => import('./src/shanshanPacQimeng.vue')
const folkMusicKingdom = () => import('./src/folkMusicKingdom.vue')
const youyouPac = () => import('./src/youyouPac.vue')
const aefAnzhong = () => import('./src/aefAnzhong.vue')
const djmbe61 = () => import('./src/djmbe61.vue')
const piano_jzk = () => import('./src/piano_jzk.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ukulelePac',
      name: 'ukulelePac',
      component: ukulelePac
    },
    {
      path: '/ukuleleES',
      name: 'ukuleleES',
      component: ukuleleES
    },
    {
      path: '/djembePac_ad',
      name: 'djembePac_ad',
      component: djembePac_ad
    },
    {
      path: '/ukuleleGsc',
      name: 'ukuleleGsc',
      component: ukuleleGsc
    },
    {
      path: '/djembePac',
      name: 'djembePac',
      component: djembePac
    },
    {
      path: '/qimeng',
      name: 'qimeng',
      component: qimeng 
    },
    {
      path: '/qimeng_m',
      name: 'qimengM',
      component: qimengM 
    },
    {
      path: '/dash',
      name: 'dash',
      component: dash
    },   
    {
      path: '/christmasUklele',
      name: 'christmasUklele',
      component: christmasUklele
    },  
    {
      path: '/christmasDjembe',
      name: 'christmasDjembe',
      component: christmasDjembe
    },
    {
      path: '/hitMusic',
      name: 'hitMusic',
      component: hitMusic
    },  
    {
      path: '/travelUkulele',
      name: 'travelUkulele',
      component: travelUkulele
    }, 
    {
      path: '/travelUkuleleMid',
      name: 'travelUkuleleMid',
      component: travelUkuleleMid
    },
    {
      path: '/worldTravel',
      name: 'worldTravel',
      component: worldTravel
    }, 
    {
      path: '/instrumentsKing',
      name: 'instrumentsKing',
      component: instrumentsKing
    },
    {
      path: '/doctorXieBody',
      name: 'doctorXieBody',
      component: doctorXieBody
    },
    {
      path: '/doctorXieBody1',
      name: 'doctorXieBody1',
      component: doctorXieBody1
    },
    {
      path: '/musicCastle',
      name: 'musicCastle',
      component: musicCastle
    },
    {
      path: '/shanshanPacQimeng',
      name: 'shanshanPacQimeng',
      component: shanshanPacQimeng
    },
    {
      path: '/folkMusicKingdom',
      name: 'folkMusicKingdom',
      component: folkMusicKingdom
    },
    {
      path: '/youyouPac',
      name: 'youyouPac',
      component: youyouPac
    },
    {
      path: '/aefAnzhong',
      name: 'aefAnzhong',
      component: aefAnzhong
    }, 
    {
      path: '/djmbe61',
      name: 'djmbe61',
      component: djmbe61
    }, 
    {
      path: '/piano_jzk',
      name: 'piano_jzk',
      component: piano_jzk
    },
  ]
})
