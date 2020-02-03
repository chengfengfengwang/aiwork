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
            '音基版本更新': ['androidVersion', 'androidReviewVersion', 'iosVersion', 'iosReviewVersion', 'androidNewVersion', 'iosNewVersion', 'isAndroidUpdate', 'isIosUpdate', 'androidUpdateDescription', 'iosUpdateDescription', 'androidHotUpdateVersion', 'androidVersionOpenUpdate', 'iosHotUpdateVersion', 'iosVersionOpenUpdate', 'iosForceUpdate', 'androidForceUpdate', 'customerInfo'],
            '音基首页': ['bannerMusicBasis', 'recommendCourseMusicBasis', 'studentCountMusicBasis0', 'studentCountMusicBasis1', 'adMusicBasis'],
            '尤克里里首页': ['bannerUkulele', 'recommendCourseUkulele', 'studentCountUkulele0', 'studentCountUkulele1', 'adUkulele'],
            '非洲鼓首页': ['bannerDjembe', 'recommendCourseDjembe', 'studentCountDjembe0', 'studentCountDjembe1', 'adDjembe'],
            '测试组': ['testCourseIds', 'testTels'],
            '弹框': ['adventData'],
            '渠道链接': ['channelRedirectLists'],
            '小小音乐荚版本更新': ['androidVersionChildren', 'androidReviewVersionChildren', 'iosVersionChildren', 'iosReviewVersionChildren', 'androidNewVersionChildren', 'iosNewVersionChildren', 'isAndroidUpdateChildren', 'isIosUpdateChildren', 'androidUpdateDescriptionChildren', 'iosUpdateDescriptionChildren', 'androidHotUpdateVersionChildren', 'androidVersionOpenUpdateChildren', 'iosHotUpdateVersionChildren', 'iosVersionOpenUpdateChildren', 'iosForceUpdateChildren', 'androidForceUpdateChildren'],
            '校园版版本更新': ['androidVersionCampus', 'androidReviewVersionCampus', 'iosVersionCampus', 'iosReviewVersionCampus', 'androidNewVersionCampus', 'iosNewVersionCampus', 'isAndroidUpdateCampus', 'isIosUpdateCampus', 'androidUpdateDescriptionCampus', 'iosUpdateDescriptionCampus', 'androidHotUpdateVersionCampus', 'androidVersionOpenUpdateCampus', 'iosHotUpdateVersionCampus', 'iosVersionOpenUpdateCampus', 'iosForceUpdateCampus', 'androidForceUpdateCampus'],
            '小小音乐荚弹框': ['adventDataChildren'],
            '激活渠道配置': ['purchaseManualConfig', 'purchaseManualActivityConfig'],
            '激活码配置': ['goodsIds', 'goodsIdsName'],
            '游戏类型配置': ['gameTypes'],
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
