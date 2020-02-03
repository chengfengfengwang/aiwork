import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

import * as actions from "../actions/index";
import * as selectors from "../reducers/selectors";
import "./App.css";
import Counter from "./Counter";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Login from "./Login";
import Waiting from "./Waiting";
import Error from "./Error";
import MaterialsIndex from "./MaterialsIndex";
import MaterialInfo from "./MaterialInfo";
import MaterialEdit from "./MaterialEdit";
import Confirmation from "./Confirmation";
import CoursesIndex from "./CoursesIndex";
import CourseInfo from "./CourseInfo";
import CourseEdit from "./CourseEdit";
import CourseShare from "./CourseShare";
import MaterialsChooser from "./MaterialsChooser";
import ChordsChooser from "./ChordsChooser";
import ChoicesChooser from "./ChoicesChooser";
import Index from "./Index";
import LessonsIndex from "./LessonsIndex";
import LogsIndex from "./LogsIndex";
import RichText from "./RichText";
import CourseActive from "./CourseActive";
import CourseActiveSingle from "./CourseActiveSingle";
import QuestionActive from "./QuestionActive";
import Configs from "./Configs";
import Studies from "./Studies";
import ScorePlays from "./ScorePlays";
import LessonPass from "./LessonPass";
import PromoInfoSum from "./PromoInfoSum";
import PromoAssign from "./PromoAssign";
import PromoInfo from "./PromoInfo";
import ActiveSummary from "./ActiveSummary";
import PurchaseSummary from "./PurchaseSummary";
import DownStatistics from "./DownStatistics";
import Complaint from "./Complaint";
import UploadPicScore from "./UploadPicScore";
import PicScore from "./PicScore";
import Coupon from "./Coupon";
import ShareAccount from "./ShareAccount"
import MessagePush from "./MessagePush";
import MessagePushGuitar from "./MessagePushGuitar";
import WechatIndex from "./WechatIndex";
import WechatEdit from "./WechatEdit";
import AimusicItv from "./AimusicItv";
import WechatClassIndex from "./WechatClassIndex";
import WechatClassEdit from "./WechatClassEdit";
import WechatClassInfo from "./WechatClassInfo";
import ChallengeIndex from "./ChallengeIndex";
import ChallengeEdit from "./ChallengeEdit";
import RecommendIndex from "./RecommendIndex";
import ItvIndex from "./ItvIndex";
import ItvEdit from "./ItvEdit";
import RedPointIndex from "./RedPointIndex";
import PaymentStatisticsPurchase from "./PaymentStatisticsPurchase";
import PaymentStatistics from "./PaymentStatistics";
import PaymentStatisticsPromo from "./PaymentStatisticsPromo";
import PaymentStatisticsDetail from "./PaymentStatisticsDetail";
import ActiveOriIndex from "./ActiveOriIndex";
import WechatClassData from "./WechatClassData";
import ChannelActive from "./ChannelActive";
import WechatClassPaymentData from "./WechatClassPaymentData";
import CouponStas from "./CouponStas"
import GoodsIndex from "./GoodsIndex"
import CourseTestActive from "./CourseTestActive";

const One = () => <h3>One</h3>;
const Two = () => <h3>Two</h3>;
const Three = () => <h3>Three</h3>;

@connect(state => ({
    isLoggedIn: selectors.onlineSelector(state),
    user: selectors.userSelector(state)
}))
export default class App extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    render() {
        const {isLoggedIn, dispatch, user} = this.props;
        //
        return (
            <div className="App">
                <Waiting/>
                <Error/>
                <Confirmation/>
                <MaterialsChooser/>
                <ChordsChooser/>
                <ChoicesChooser/>

                <div style={{display: 'none', justifyContent: 'space-around', padding: '0.5em'}}>
                    <Link to="/">Index</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/counter">Counter</Link>
                    <Link to="/one">One</Link>
                    <Link to="/two">Two</Link>
                    <Link to="/three">Three</Link>
                    <Link to="/404">404</Link>
                    <Link to="/materials">Materials</Link>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        dispatch(actions.loggedOut());
                        dispatch(push('/'));
                    }}>Logout</a>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        dispatch(actions.clearStore());
                    }}>Clear store</a>
                </div>

                {
                    isLoggedIn
                        ?
                        <div>
                            <TopBar/>
                            <Row style={{marginRight: 0}}>
                                <Col sm={2}>
                                    <SideBar user={user}/>
                                </Col>
                                <Col sm={10}>
                                    <Switch>
                                        <Redirect from="/login" to="/"/>
                                        <Route path="/" exact component={Index}/>
                                        <Route path="/one" component={One}/>
                                        <Route path="/two" component={Two}/>
                                        <Route path="/three" component={Three}/>
                                        <Route path="/counter" component={Counter}/>
                                        <Route path="/materials/new" component={MaterialEdit}/>
                                        <Route path="/materials/:id/edit" component={MaterialEdit}/>
                                        <Route path="/materials/:id" component={MaterialInfo}/>
                                        <Route path="/materials" component={MaterialsIndex}/>
                                        <Route path="/courses/new" component={CourseEdit}/>
                                        <Route path="/courses/:id/edit" component={CourseEdit}/>
                                        <Route path="/courses/:id/share" component={CourseShare}/>
                                        <Route path="/courses/:id" component={CourseInfo}/>
                                        <Route path="/courses" component={CoursesIndex}/>
                                        <Route path="/lessons" component={LessonsIndex}/>
                                        <Route path="/logs" component={LogsIndex}/>
                                        <Route path="/richText" component={RichText}/>
                                        <Route path="/courseActive" component={CourseActive}/>
                                        <Route path="/courseActiveSingle" component={CourseActiveSingle}/>
                                        <Route path="/questionActive" component={QuestionActive}/>
                                        <Route path="/courseTestActive" component={CourseTestActive}/>
                                        <Route path="/channelActive" component={ChannelActive}/>
                                        <Route path="/configs" component={Configs}/>
                                        <Route path="/studies" component={Studies}/>
                                        <Route path="/plays" component={ScorePlays}/>
                                        <Route path="/passinfo" component={LessonPass}/>
                                        <Route path="/promoinfo" component={PromoInfoSum}/>
                                        <Route path="/promoassign" component={PromoAssign}/>
                                        <Route path="/channel_promo" component={PromoInfo}/>
                                        <Route path="/activesummary" component={ActiveSummary}/>
                                        <Route path="/purchasesummary" component={PurchaseSummary}/>
                                        <Route path="/downstatistics" component={DownStatistics}/>
                                        <Route path="/paymentstatistics" component={PaymentStatistics}/>
                                        <Route path="/paymentstatisticspurchase" component={PaymentStatisticsPurchase}/>
                                        <Route path="/paymentstatisticspromo" component={PaymentStatisticsPromo}/>
                                        <Route path="/paymentstatisticsdetail" component={PaymentStatisticsDetail}/>
                                        <Route path="/complaint" component={Complaint}/>
                                        {/*<Route path="/uploadpicscore" component={UploadPicScore}/>*/}
                                        <Route path="/picscore" component={PicScore}/>
                                        <Route path="/coupon" component={Coupon}/>
                                        <Route path="/goods" component={GoodsIndex}/>
                                        <Route path="/statistic" component={CouponStas}/>
                                        <Route path="/shareaccount" component={ShareAccount}/>
                                        <Route path="/aimusicitv" component={ItvIndex}/>
                                        <Route path="/messagepush" component={MessagePush}/>
                                        <Route path="/iguitarmessagepush" component={MessagePushGuitar}/>
                                        <Route path="/wechat" component={WechatIndex}/>
                                        <Route path="/aaa/new" component={WechatEdit}/>
                                        <Route path="/aaa/:id/edit" component={WechatEdit}/>
                                        <Route path="/class" component={WechatClassIndex}/>
                                        <Route path="/cccc/new" component={WechatClassEdit}/>
                                        <Route path="/cccc/:id/edit" component={WechatClassEdit}/>
                                        <Route path="/cccc/class_info" component={WechatClassInfo}/>
                                        <Route path="/cccc/class_data" component={WechatClassData}/>
                                        <Route path="/cccc/class_payment_data" component={WechatClassPaymentData}/>
                                        <Route path="/challenge" component={ChallengeIndex}/>
                                        <Route path="/recommend" component={RecommendIndex}/>
                                        <Route path="/tiaozhan/new" component={ChallengeEdit}/>
                                        <Route path="/tiaozhan/:id/edit" component={ChallengeEdit}/>
                                        <Route path="/itv/:id/edit" component={ItvEdit}/>
                                        <Route path="/itv/new" component={ItvEdit}/>
                                        <Route path="/red_point" component={RedPointIndex}/>
                                        <Route path="/active_ori" component={ActiveOriIndex}/>

                                    </Switch>
                                </Col>
                            </Row>
                        </div>
                        :
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Redirect to="/login"/>
                        </Switch>
                }
            </div>
        );
    }
}
