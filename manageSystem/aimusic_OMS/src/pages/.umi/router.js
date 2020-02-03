import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/single',
    name: '测试',
    component: require('../AppSingle').default,
    routes: [
      {
        path: '/single/course_date_stats',
        component: require('../single/course_date_stats').default,
        name: '课程学习统计',
        exact: true,
      },
      {
        path: '/single/course_user_date_stats',
        component: require('../single/course_user_date_stats').default,
        name: '用户课程学习统计',
        exact: true,
      },
      {
        path: '/single/lesson_table',
        component: require('../single/lesson_table').default,
        name: '课程小节统计',
        exact: true,
      },
      {
        path: '/single/material_table',
        component: require('../single/material_table').default,
        name: '练习统计',
        exact: true,
      },
      {
        path: '/single/course_date_stats_2',
        component: require('../single/course_date_stats_2').default,
        name: '课程学习统计2',
        exact: true,
      },
      {
        path: '/single/lesson_table_2',
        component: require('../single/lesson_table_2').default,
        name: '课程小节统计2',
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    component: require('../login').default,
    routes: [
      {
        path: '/login',
        component: require('../login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: require('../App').default,
    routes: [
      {
        path: '/dashboard',
        routes: [
          {
            path: '/dashboard/total',
            component: require('../dashboard/dashboard').default,
            name: '整体统计',
            exact: true,
          },
          {
            path: '/dashboard',
            component: require('../dashboard/overview_stats').default,
            name: '渠道概览',
            exact: true,
          },
          {
            path: '/dashboard/table',
            component: require('../dashboard/total_table_stats').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/user',
        name: '用户统计',
        routes: [
          {
            path: '/user/user_device_stats',
            component: require('../user/user_device_stats').default,
            name: '设备频次统计',
            exact: true,
          },
          {
            path: '/user/users_table',
            component: require('../user/users_table').default,
            name: '用户列表',
            exact: true,
          },
          {
            path: '/user/payment_table',
            component: require('../user/payment_table').default,
            name: '订单列表',
            exact: true,
          },
          {
            path: '/user/course_instrument_stats',
            component: require('../course/course_instrument_stats').default,
            name: '试看转化率',
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/fee',
        name: '付费统计',
        routes: [
          {
            path: '/fee/total_table_stats',
            component: require('../fee/total_table_stats').default,
            name: '概览',
            exact: true,
          },
          {
            path: '/fee/total_table_stats_wx',
            component: require('../fee/total_table_stats_wx').default,
            name: '概览-小程序',
            exact: true,
          },
          {
            path: '/fee/fee_day_stats',
            component: require('../fee/fee_day_stats').default,
            name: '实时统计-付费金额',
            exact: true,
          },
          {
            path: '/fee/number_day_stats',
            component: require('../fee/number_day_stats').default,
            name: '实时统计-付费人数',
            exact: true,
          },
          {
            path: '/fee/fee_date_stats',
            component: require('../fee/fee_date_stats').default,
            name: '实时统计-付费金额',
            exact: true,
          },
          {
            path: '/fee/number_date_stats',
            component: require('../fee/number_date_stats').default,
            name: '趋势统计-付费人数',
            exact: true,
          },
          {
            path: '/fee/fee_payment_stats',
            component: require('../fee/fee_payment_stats').default,
            exact: true,
          },
          {
            path: '/fee/fee_date_course_stats',
            component: require('../fee/fee_date_course_stats').default,
            name: '课程类别',
            exact: true,
          },
          {
            path: '/fee/fee_date_payment_stats',
            component: require('../fee/fee_date_payment_stats').default,
            name: '付费类别',
            exact: true,
          },
          {
            path: '/fee/re_date_stats',
            component: require('../fee/re_date_stats').default,
            name: '复购统计',
            exact: true,
          },
          {
            path: '/fee/fee_date_type_stats',
            component: require('../fee/fee_date_type_stats').default,
            name: '付费方式',
            exact: true,
          },
          {
            path: '/fee/fee_recharge_stats',
            component: require('../fee/fee_recharge_stats').default,
            name: '内购统计',
            exact: true,
          },
          {
            path: '/fee/coupon_use_table',
            component: require('../fee/coupon_use_table').default,
            name: '优惠券使用统计',
            exact: true,
          },
          {
            path: '/fee/coupon_stats',
            component: require('../fee/coupon_stats').default,
            name: '优惠券统计',
            exact: true,
          },
          {
            path: '/fee/active_code_stats',
            component: require('../fee/active_code_stats').default,
            name: '体验课统计',
            exact: true,
          },
          {
            path: '/fee/stats_course_pay',
            component: require('../fee/stats_course_pay').default,
            name: '课程购买统计',
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/course',
        name: '课程统计',
        routes: [
          {
            path: '/course/course_date_stats',
            component: require('../course/course_date_stats').default,
            name: '课程学习统计',
            exact: true,
          },
          {
            path: '/course/course_user_date_stats',
            component: require('../course/course_user_date_stats').default,
            name: '用户课程学习统计',
            exact: true,
          },
          {
            path: '/course/lesson_table',
            component: require('../course/lesson_table').default,
            name: '课程小节统计',
            exact: true,
          },
          {
            path: '/course/material_table',
            component: require('../course/material_table').default,
            name: '练习统计',
            exact: true,
          },
          {
            path: '/course/course_date_stats_2',
            component: require('../course/course_date_stats_2').default,
            name: '课程学习统计2',
            exact: true,
          },
          {
            path: '/course/lesson_table_2',
            component: require('../course/lesson_table_2').default,
            name: '课程小节统计2',
            exact: true,
          },
          {
            path: '/course/test_guitar_course',
            component: require('../course/test_guitar_course').default,
            name: '吉他测试统计',
            exact: true,
          },
          {
            path: '/course/stats_course',
            component: require('../course/stats_course').default,
            name: '课程学习统计',
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/channel',
        name: '渠道统计',
        routes: [
          {
            path: '/channel/table_stats',
            component: require('../channel/table_stats').default,
            name: '整体统计',
            exact: true,
          },
          {
            path: '/channel/platform_stats',
            component: require('../channel/platform_stats').default,
            name: '设备平台统计',
            exact: true,
          },
          {
            path: '/channel/channel_stats',
            component: require('../channel/channel_stats').default,
            name: '应用平台统计',
            exact: true,
          },
          {
            path: '/channel/channel_j_stats',
            component: require('../channel/channel_j_stats').default,
            name: '奖学金渠道',
            exact: true,
          },
          {
            path: '/channel/share_install_stats',
            component: require('../channel/share_install_stats').default,
            name: '厂商渠道',
            exact: true,
          },
          {
            path: '/channel/other_active_stats',
            component: require('../channel/other_active_stats').default,
            name: '第三方激活',
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/vip',
        name: 'Vip统计',
        routes: [
          {
            path: '/vip/date_type_stats',
            component: require('../vip/date_type_stats').default,
            name: '概览',
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/score',
        name: '曲谱统计',
        routes: [
          {
            path: '/score/date_type_stats',
            component: require('../score/date_type_stats').default,
            name: '概览',
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/ab_test',
        name: 'AB测试统计',
        routes: [
          {
            path: '/ab_test/ex_test_stats',
            component: require('../ab_test/ex_test_stats').default,
            name: '试学课程统计',
            exact: true,
          },
          {
            path: '/ab_test/ex_test_fee_stats',
            component: require('../ab_test/ex_test_fee_stats').default,
            name: '试学课程购买统计',
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/mac/my/aimusic_OMS/node_modules/_umi-build-dev@1.13.13@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
