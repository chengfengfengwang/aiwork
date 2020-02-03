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

export default class ConfigsImport extends React.Component {
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
            '版本更新': ['androidVersion', 'androidReviewVersion','iosVersion', 'iosReviewVersion', 'androidNewVersion', 'iosNewVersion','isAndroidUpdate', 'isIosUpdate','androidUpdateDescription', 'iosUpdateDescription','androidHotUpdateVersion','androidVersionOpenUpdate','iosHotUpdateVersion','iosVersionOpenUpdate', 'iosForceUpdate', 'androidForceUpdate'],
            'bangtabs版本更新': ['androidVersionBangtabs', 'androidReviewVersionBangtabs','iosVersionBangtabs', 'iosReviewVersionBangtabs', 'androidNewVersionBangtabs', 'iosNewVersionBangtabs','isAndroidUpdateBangtabs', 'isIosUpdateBangtabs','androidUpdateDescriptionBangtabs', 'iosUpdateDescriptionBangtabs','androidHotUpdateVersionBangtabs','androidVersionOpenUpdateBangtabs','iosHotUpdateVersionBangtabs','iosVersionOpenUpdateBangtabs', 'iosForceUpdateBangtabs', 'androidForceUpdateBangtabs'],
            '购买信息': ['guitarPurchaseInfo', 'ukulelePurchaseInfo', 'kalimbaPurchaseInfo','djembePurchaseInfo', 'pianoPurchaseInfo', 'harmonicaPurchaseInfo', 'guitarSumPurchaseInfo', 'ukuleleSumPurchaseInfo', 'kalimbaSumPurchaseInfo', 'djembeSumPurchaseInfo', 'pianoSumPurchaseInfo', 'harmonicaSumPurchaseInfo'],
            '渠道信息': ['channelRedirectList'],
            '音符币配置': ['yfbProportionalAllocation'],
            '运营活动配置': ['activityConfig', 'popups'],
            'VIP优惠券配置': ['vipCouponConfig'],
            '虚拟商品配置': ['virtualGoodsConfig', 'goodsMapConfig'],
            'vip品类配置': ['vipCategoryConfig'],
            '活动品类配置': ['exhibitionCategoryConfig'],
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