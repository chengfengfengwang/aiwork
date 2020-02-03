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
            icon: 'th-list',
            needAdmin: false,
            needChannel: false,
            needmanager: true,
            alias: 'courses'
        },
        {
            link: '/materials',
            title: '素材管理',
            icon: 'file',
            needAdmin: false,
            needChannel: false,
            needmanager: true,
            alias: 'materials'
        },
        // {
        //     link: '/lessons',
        //     title: '课件审核',
        //     icon: 'plus',
        //     needAdmin: true,
        //     needChannel: false,
        //     alias: 'lessons'
        // },
        {
            link: '/courseActive',
            title: '课程激活',
            icon: 'minus',
            needAdmin: false,
            needChannel: false,
            needBeautiful: true,
            alias: 'courseActive'
        },
        {
            link: '/courseActiveSingle',
            title: '课程激活查询',
            icon: 'minus',
            needAdmin: false,
            needChannel: false,
            needBeautiful: true,
            needYunyin: true,
            alias: 'courseActiveSingle'
        },
        {
            link: '/questionActive',
            title: '题库激活',
            icon: 'minus',
            needAdmin: false,
            needChannel: false,
            needBeautiful: true,
            alias: 'questionActive'
        },
        {
            link: '/courseTestActive',
            title: '课程体验激活',
            icon: 'minus',
            needAdmin: false,
            needChannel: false,
            needBeautiful: true,
            alias: 'courseTestActive'
        },
        // {
        //     link: '/channelActive',
        //     title: '有赞课程激活',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false,
        //     needBeautiful: true,
        //     alias: 'channelActive'
        // },
        // {
        //     link: '/studies',
        //     title: '课程学习',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false,
        //     needBeautiful: true,
        //     alias: 'studies'
        // },
        // {
        //     link: '/passinfo',
        //     title: '课程通过率',
        //     icon: 'minus',
        //     needAdmin: true,
        //     needChannel: false,
        //     alias: 'passinfo'
        // },
        // {
        //     link: '/promoinfo',
        //     title: '激活信息',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: true,
        //     alias: 'promoinfo'
        // },
        // {
        //     link: '/active_ori',
        //     title: '厂商激活码管理',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false,
        //     needCoach: true,
        //     alias: 'active_ori'
        // },
        // {
        //     link: '/promoassign',
        //     title: '分配激活码',
        //     icon: 'minus',
        //     needAdmin: true,
        //     needChannel: false
        // },
        // {
        //     link: '/channel_promo',
        //     title: '激活',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false
        // },
        // {
        //   link: '/activesummary',
        //   title: '付费统计',
        //    icon: 'minus',
        //    needAdmin: true,
        //    needChannel: false,
        //    alias: 'activesummary'
        // },

        // {
        //     link: '/downstatistics',
        //     title: '下载统计',
        //     icon: 'minus',
        //     needAdmin: true,
        //     needChannel: false,
        //     alias: 'downstatistics'
        // },
        //  {
        //      link: '/paymentstatistics',
        //      title: '付费统计',
        //      icon: 'minus',
        //      needAdmin: true,
        //      needChannel: false,
        //      alias: 'paymentstatistics'
        //  },
        // {
        //     link: '/purchasesummary',
        //     title: '付费详细',
        //     icon: 'minus',
        //     needAdmin: true,
        //     needChannel: false,
        //     alias: 'purchasesummary'
        // },
        {
            link: '/complaint',
            title: '投诉建议',
            icon: 'minus',
            needAdmin: false,
            needChannel: false,
            needBeautiful: true,
            alias: 'complaint'
        },
        // {
        //     link: '/iguitarmessagepush',
        //     title: '推送消息（爱玩吉他）',
        //     icon: 'minus',
        //     needAdmin: true,
        //     needChannel: false
        // },
        {
            link: '/goods',
            title: '商品管理',
            icon: 'minus',
            needAdmin: true,
            needChannel: false,
            eedCoach: true
        },
        {
            link: '/coupon',
            title: '优惠券',
            icon: 'minus',
            needAdmin: false,
            needChannel: false,
            needCoach: true,
            alias: 'coupon'
        },
        {
            link: '/shareaccount',
            title: '防共享账号',
            icon: 'minus',
            needAdmin: false,
            needChannel: false,
            needCoach: true,
            alias: 'shareaccount'
        },
        // {
        //     link: '/aimusicitv',
        //     title: 'ITV',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false,
        //     needCoach: true,
        //     alias: 'aimusicitv'
        // },
        {
            link: '/messagepush',
            title: '推送消息',
            icon: 'minus',
            needAdmin: true,
            needChannel: false,
            alias: 'messagepush'
        },
        // {
        //     link: '/wechat',
        //     title: '图片曲谱',
        //     icon: 'minus',
        //     needAdmin: true,
        //     needChannel: false,
        //     alias: 'wechat'
        // },
        //  {
        //      link: '/class',
        //      title: '创建班级',
        //      icon: 'minus',
        //      needAdmin: false,
        //      needChannel: false,
        //      needCoach: true,
        //     alias: 'class'
        //  },
        // {
        //     link: '/challenge',
        //     title: '擂台赛',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false,
        //     needCoach: true,
        //     alias: 'challenge'
        // },
        // {
        //     link: '/recommend',
        //     title: '本周推荐管理',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false,
        //     needCoach: true,
        //     alias: 'recommend'
        // },
        // {
        //     link: '/red_point',
        //     title: '红点配置',
        //     icon: 'minus',
        //     needAdmin: false,
        //     needChannel: false,
        //     needCoach: true,
        //     alias: 'red_point'
        // },
        {
            link: '/configs',
            title: '配置',
            icon: 'minus',
            needAdmin: true,
            needChannel: false,
            alias: 'configs'
        },
        {
            link: '/logs',
            title: '日志',
            icon: 'minus',
            needAdmin: true,
            needChannel: false,
            alias: 'logs'
        }
    ];

    render() {
        const menus = this.menus;
        const {user} = this.props;
        return (
            <nav>
                <ul className="nav nav-pills nav-stacked">
                    {

                        menus.map((menu, index) => {
                            return(<li key={index} style={{display: user.isAdmin
                                && (user.id !== 36687 || menu.needYunyin) ? 'block' : 'none'}}>

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
