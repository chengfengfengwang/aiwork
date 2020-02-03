/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/24 下午12:13
 */

import React from "react";
import Waiting from "./Waiting";
import Error from "./Error";
import {Button, Col, ControlLabel, Form, FormGroup, Tab, Tabs} from "react-bootstrap";
import ElementEdit from "./ElementEdit";
import * as api from "../api";
import {configFields} from "../helpers/ConfigsHelper";

export default class Configs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configs: null,
            loading: true,
            error: null,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        api.getConfigs()
            .then(json => this.setState({
                loading: false,
                error: null,
                configs: json.data
            }))
            .catch(error => this.setState({
                loading: false,
                error
            }));

    }

    onChange(key, value) {
        const {configs} = this.state;
        configs[key] = value;
        this.forceUpdate();
    }

    onSubmit(e) {
        e.preventDefault();
        const {configs} = this.state;
        this.setState({loading: true});
        api.updateConfigs(configs)
            .then(json => {
                this.setState({
                    loading: false,
                    configs: json.data
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error
                })
            })
    }

    render() {
        const {configs, loading, error} = this.state;
        const tabs = {
            '全局语音包': ['voiceHighUrl', 'voiceLowUrl', 'voiceOkUrl', 'voicePrompt'],
            '背景图': ['homePicUrlUkulele0', 'homePicUrlUkulele1', 'homePicUrlGuitar0', 'homePicUrlGuitar1', 'homePicUrlKalimba0', 'homePicUrlKalimba1','homePicUrlDjembe0','homePicUrlDjembe1', 'homePicUrlPiano0','homePicUrlPiano1', 'homePicUrlHarmonica0', 'homePicUrlHarmonica1', 'homePicUrlParent0', 'homePicUrlParent1'],
            '尤克里里文案': ['tutorialInfo', 'advanceInfo', 'parentingInfo', 'welcomeTitle', 'welcomeSubtitle', 'welcomeButton',
                'welcomeButtonType', 'welcomeButtonValue', 'welcomeBottomText', 'totalGraduatedCount', 'avgPracticeTime'],
            '吉他文案': ['tutorialInfoGuitar', 'advanceInfoGuitar', 'parentingInfoGuitar', 'welcomeTitleGuitar', 'welcomeSubtitleGuitar', 'welcomeButtonGuitar',
                'welcomeButtonTypeGuitar', 'welcomeButtonValueGuitar', 'welcomeBottomTextGuitar', 'totalGraduatedCountGuitar', 'avgPracticeTimeGuitar'],
            '卡林巴文案': ['tutorialInfoKalimba', 'advanceInfoKalimba', 'parentingInfoKalimba', 'welcomeTitleKalimba', 'welcomeSubtitleKalimba', 'welcomeButtonKalimba',
                'welcomeButtonTypeKalimba', 'welcomeButtonValueKalimba', 'welcomeBottomTextKalimba', 'totalGraduatedCountKalimba', 'avgPracticeTimeKalimba'],

            '非洲鼓文案': ['tutorialInfoDjembe', 'advanceInfoDjembe', 'parentingInfoDjembe', 'welcomeTitleDjembe', 'welcomeSubtitleDjembe', 'welcomeButtonDjembe',
                'welcomeButtonTypeDjembe', 'welcomeButtonValueDjembe', 'welcomeBottomTextDjembe', 'totalGraduatedCountDjembe', 'avgPracticeTimeDjembe'],

            '钢琴文案': ['tutorialInfoPiano', 'advanceInfoPiano', 'parentingInfoPiano', 'welcomeTitlePiano', 'welcomeSubtitlePiano', 'welcomeButtonPiano',
                'welcomeButtonTypePiano', 'welcomeButtonValuePiano', 'welcomeBottomTextPiano', 'totalGraduatedCountPiano', 'avgPracticeTimePiano'],
            '口琴文案': ['tutorialInfoHarmonica', 'advanceInfoHarmonica', 'parentingInfoHarmonica', 'welcomeTitleHarmonica', 'welcomeSubtitleHarmonica', 'welcomeButtonHarmonica',
                'welcomeButtonTypeHarmonica', 'welcomeButtonValueHarmonica', 'welcomeBottomTextHarmonica', 'totalGraduatedCountHarmonica', 'avgPracticeTimeHarmonica'],
            '亲子文案': ['tutorialInfoParent', 'advanceInfoParent', 'parentingInfoParent', 'welcomeTitleParent', 'welcomeSubtitleParent', 'welcomeButtonParent',
                'welcomeButtonTypeParent', 'welcomeButtonValueParent', 'welcomeBottomTextParent', 'totalGraduatedCountParent', 'avgPracticeTimeParent'],
            '背景视频': ['backgroundVideo', 'backgroundPadVideo'],
            '新手入门图片': ['daxiangBackgroundPic', 'liushuqiBackgroundPic'],
            '练琴推送内容': ['oneDayPush', 'threeDayPush', 'fiveDayPush', "sevenDayPush", "fifteenDayPush", "thirtyDayPush"],
            '曲谱库引导页': ['scoreSchema'],
            '优惠劵banner': ['disBannerTitleBuy', 'disBannerTitleGain','disImageUrlBuyUkulele0', 'disImageUrlGainUkulele0', 'disImageUrlBuyGuitar0', 'disImageUrlGainGuitar0'],
            'banner提示': ['guitar', 'ukulele', 'parent'],
            '集合详情': ['oneLesson', 'twoLesson', 'threeLesson', 'fourLesson', 'fiveLesson', 'sixLesson', 'sevenLesson','eightLesson', 'nineLesson', 'tenLesson', 'elevenLesson', 'twelveLesson', 'thirteenLesson', 'fourteenLesson', 'fifteenLesson',
                'sixteenLesson', 'seventeenLesson', 'eighteenLesson', 'nineteenLesson', 'twentyLesson', 'twentyOneLesson', 'twentyTwoLesson', 'twentyThreeLesson', 'twentyFourLesson', 'twentyFiveLesson', 'twentySixLesson','twentySevenLesson',
                'twentyEightLesson', 'twentyNineLesson', 'thirtyLesson', 'thirtyOneLesson', 'thirtyTwoLesson', 'thirtyThreeLesson', 'thirtyFourLesson', 'thirtyFiveLesson', 'thirtySixLesson', 'thirtySevenLesson', 'thirtyEightLesson', 'thirtyNineLesson',
                'fortyLesson', 'fortyOneLesson', 'fortyTwoLesson', 'fortyThreeLesson', 'fortyFourLesson', 'fortyFiveLesson',
                'oneLessonGuitar', 'twoLessonGuitar', 'threeLessonGuitar', 'fourLessonGuitar', 'fiveLessonGuitar', 'sixLessonGuitar', 'sevenLessonGuitar','eightLessonGuitar', 'nineLessonGuitar', 'tenLessonGuitar', 'elevenLessonGuitar', 'twelveLessonGuitar', 'thirteenLessonGuitar', 'fourteenLessonGuitar', 'fifteenLessonGuitar',
                'sixteenLessonGuitar', 'seventeenLessonGuitar', 'eighteenLessonGuitar', 'nineteenLessonGuitar', 'twentyLessonGuitar',
                'twentyOneLessonGuitar', 'twentyTwoLessonGuitar', 'twentyThreeLessonGuitar', 'twentyFourLessonGuitar', 'twentyFiveLessonGuitar',
                'twentySixLessonGuitar', 'twentySevenLessonGuitar', 'twentyEightLessonGuitar', 'twentyNineLessonGuitar', 'thirtyLessonGuitar',
                'thirtyOneLessonGuitar', 'thirtyTwoLessonGuitar', 'thirtyThreeLessonGuitar', 'thirtyFourLessonGuitar', 'thirtyFiveLessonGuitar',
                'thirtySixLessonGuitar', 'thirtySevenLessonGuitar', 'thirtyEightLessonGuitar', 'thirtyNineLessonGuitar', 'fortyLessonGuitar',
                'fortyOneLessonGuitar', 'fortyTwoLessonGuitar', 'fortyThreeLessonGuitar', 'fortyFourLessonGuitar', 'fortyFiveLessonGuitar',
                'oneLessonGuitarDAdvance', 'twoLessonGuitarDAdvance', 'threeLessonGuitarDAdvance', 'fourLessonGuitarDAdvance', 'fiveLessonGuitarDAdvance', 'sixLessonGuitarDAdvance',
                'sevenLessonGuitarDAdvance','eightLessonGuitarDAdvance', 'nineLessonGuitarDAdvance', 'tenLessonGuitarDAdvance', 'elevenLessonGuitarDAdvance', 'twelveLessonGuitarDAdvance',
                'thirteenLessonGuitarDAdvance', 'fourteenLessonGuitarDAdvance', 'fifteenLessonGuitarDAdvance', 'sixteenLessonGuitarDAdvance', 'seventeenLessonGuitarDAdvance',
                'eighteenLessonGuitarDAdvance', 'nineteenLessonGuitarDAdvance', 'twentyLessonGuitarDAdvance',],
            '免注册课程配置': ['freeExperienceIds','lessonContrastSix'],
            '登录弹窗设置':['hasLoginBannerAdvertUrlNew','loginTipBannerUrlNew','loginTipStringNew'],
            '智能路径配置':['userInitialPath','fixedKnowledgePath196','fixedKnowledgePath199', 'fixedKnowledgePath213'],
            '新老课AB测试':['openTestTime','endTestTime','openAndCloseTest'],
            '本周推荐':['guitarThisWeekRecom','ukuleleThisWeekRecom','kalimbaThisWeekRecom', 'djembeThisWeekRecom', 'pianoThisWeekRecom'],
            '防共享管理员':['whiteListPhone','whiteListEquipment'],
            '过课专用': ['forUkTestCourse', 'forGtTestCourse', 'testCourseUsers'],
            '渠道信息': ['channelRedirectList'],
            '微信配置': ['wechatTeacherConfig', 'wechatTeacherImageUrl'],
            '资源链路配置': ['resourceLinkConfig'],
            '课程目录配置': ['courseCatalogConfig'],
            '开课渠道配置': ['manuals'],

        };
        return (
            <div style={{marginTop: 10}}>
                <Waiting isVisible={loading}/>
                <Error error={error} onOk={() => this.setState({error: null})}/>
                <Form horizontal>
                    <Tabs defaultActiveKey={1} id="tabs">
                        {
                            Object.entries(tabs).map(([tab, keys], index) => {
                                return (
                                    <Tab key={index} eventKey={index + 1} title={tab} style={{paddingTop: 15}}>
                                        {
                                            configs ?
                                                Object.entries(configFields).filter(([key, _]) => keys.includes(key)).map(([key, field], index) => {
                                                    const value = configs[key];
                                                    return <FormGroup key={index}>
                                                        <Col componentClass={ControlLabel} sm={2}>
                                                            {field.title}
                                                        </Col>
                                                        <Col sm={10}>
                                                            <ElementEdit
                                                                type={field.type}
                                                                value={value}
                                                                onValueChange={value => this.onChange(key, value)}/>
                                                        </Col>
                                                    </FormGroup>
                                                }) : null
                                        }
                                    </Tab>
                                )
                            })
                        }
                    </Tabs>
                    <FormGroup>
                        <Col sm={10} smOffset={2}>
                            <Button bsStyle="success" onClick={this.onSubmit}>提交</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}