/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/3/13 下午6:54
 */

import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import "./SideBar.css";

export default class SideBar extends Component {
    menus = [
        {
            link: '/',
            title: '概览',
            icon: 'home',
            needAdmin: true,
            needChannel: false,
            alias: 'home'
        },
        {
            link: '/courses',
            title: '课程管理',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needmanager: true,
            alias: 'courses'
        },
        {
            link: '/materials',
            title: '素材管理',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needmanager: true,
            alias: 'materials'
        },
        // {
        //     link: '/lessons',
        //     title: '课件审核',
        //     icon: 'chevron-right',
        //     needAdmin: true,
        //     needChannel: false,
        //     alias: 'lessons'
        // },
        {
            link: '/courseActive',
            title: '课程激活',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needBeautiful: true,
            alias: 'courseActive'
        },
        // {
        //     link: '/studies',
        //     title: '课程学习',
        //     icon: 'chevron-right',
        //     needAdmin: false,
        //     needChannel: false,
        //     needBeautiful: true,
        //     alias: 'studies'
        // },
        {
            link: '/passinfo',
            title: '课程通过率',
            icon: 'chevron-right',
            needAdmin: true,
            needChannel: false,
            alias: 'passinfo'
        },
        {
            link: '/promoinfo',
            title: '激活信息',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: true,
            alias: 'promoinfo'
        },
        {
            link: '/active_ori',
            title: '厂商激活码管理',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needCoach: true,
            alias: 'active_ori'
        },
        {
            link: '/downstatistics',
            title: '下载统计',
            icon: 'chevron-right',
            needAdmin: true,
            needChannel: false,
            alias: 'downstatistics'
        },
        {
            link: '/coupon',
            title: '优惠券',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needCoach: true,
            alias: 'coupon'
        },
        {
            link: '/shareaccount',
            title: '防共享账号',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needCoach: true,
            alias: 'shareaccount'
        },
        {
            link: '/aimusicitv',
            title: 'ITV',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needCoach: true,
            alias: 'aimusicitv'
        },
        {
            link: '/messagepush',
            title: '推送消息',
            icon: 'chevron-right',
            needAdmin: true,
            needChannel: false,
            alias: 'messagepush'
        },
        {
            link: '/wechat',
            title: '图片曲谱',
            icon: 'chevron-right',
            needAdmin: true,
            needChannel: false,
            alias: 'wechat'
        },
         {
             link: '/class',
             title: '创建班级',
             icon: 'chevron-right',
             needAdmin: false,
             needChannel: false,
             needCoach: true,
            alias: 'class'
         },
        {
            link: '/challenge',
            title: '擂台赛',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needCoach: true,
            alias: 'challenge'
        },
        // {
        //     link: '/recommend',
        //     title: '本周推荐管理',
        //     icon: 'chevron-right',
        //     needAdmin: false,
        //     needChannel: false,
        //     needCoach: true,
        //     alias: 'recommend'
        // },
        // {
        //     link: '/red_point',
        //     title: '红点配置',
        //     icon: 'chevron-right',
        //     needAdmin: false,
        //     needChannel: false,
        //     needCoach: true,
        //     alias: 'red_point'
        // },
        {
            link: '/menuActivity',
            title: '活动专区',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            alias: 'menuActivity'
        },
        {
            link: '/complaint',
            title: '投诉建议',
            icon: 'chevron-right',
            needAdmin: false,
            needChannel: false,
            needBeautiful: true,
            alias: 'complaint'
        },
        {
            link: '/configs',
            title: '配置',
            icon: 'chevron-right',
            needAdmin: true,
            needChannel: false,
            alias: 'configs'
        },
        {
            link: '/configsImport',
            title: '重要配置',
            icon: 'chevron-right',
            needAdmin: true,
            needChannel: false,
            alias: 'import_configs'
        },
        {
            link: '/configsFront',
            title: '前端配置',
            icon: 'chevron-right',
            needAdmin: true,
            needChannel: false,
            alias: 'front_configs'
        },
        // {
        //     link: '/logs',
        //     title: '日志',
        //     icon: 'glyphicon-chevron-right',
        //     needAdmin: true,
        //     needChannel: false,
        //     alias: 'logs'
        // },
    ];

    render() {
        const menus = this.menus;
        const {user} = this.props;
        return (
            <nav>
                <ul className="nav nav-pills nav-stacked">
                    {
                        menus.map((menu, index) => {
                            let user_menu_show = false;
                            if (user.hasOwnProperty("adminMenus")){
                                for (let i = 0; i < user.adminMenus.length; i++){
                                    if (user.adminMenus[i] === menu.alias){
                                        user_menu_show = true;
                                        break;
                                    }
                                }
                            }
                            
                            return(<li key={index} style={{display: user_menu_show ? 'block' : 'none'}}>
                                <NavLink
                                    exact
                                    isActive={(match, location) => {
                                        return menu.link === '/' ? location.pathname === menu.link : location.pathname.includes(menu.link);
                                    }} to={menu.link}
                                    activeClassName='sidebar-item-active'>
                                    <span className={`glyphicon glyphicon-${menu.icon || 'file'}`}/>
                                    <span>&nbsp;&nbsp;</span>
                                    <span> {menu.title} </span>
                                </NavLink>
                            </li>
                        )})
                    }
                </ul>
            </nav>
        )
    }
}
