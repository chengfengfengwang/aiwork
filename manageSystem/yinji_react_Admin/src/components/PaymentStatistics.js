import React, {Component} from 'react';
import Error2 from './Error2';
import Waiting from './Waiting';
import {ControlLabel, Form, FormControl, FormGroup, Table} from "react-bootstrap";
import * as api from "../api";
import {Link} from "react-router-dom";


export default class PaymentStatistics extends Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            day: '',
            instype: '', month: '',
            paymentinfo: [],
            promo_and_coupon_count: 0,
            ios_count: 0,
            android_count: 0,
            promo_count: 0,
            quane_count: 0,
            other_count: 0,
            coupon_count: 0,
            ios_total: 0,
            android_total: 0,
            guitar_count: 0,
            djembe_count: 0,
            ukulele_count: 0,
            kalimba_count: 0,
            quane_money: 0,
            coupon_money: 0,
            promo_money: 0,
            promo_and_coupon_money: 0,
            android_money: 0,
            ios_money: 0,
            other_money: 0,
        }
    };

    componentWillMount() {
        this.onLoad();
    };

    onLoad() {
        const {day, instype, month,} = this.state;
        this.setState({loading: true, error: null})
        api.paymentStatistics(day, instype, month,)
            .then(json => this.setState({
                loading: false,
                promo_count: json.promo_count,
                coupon_count: json.coupon_count,
                quane_count: json.quane_count,
                promo_and_coupon_count: json.promo_and_coupon_count,
                ios_count: json.ios_count,
                android_count: json.android_count,
                other_count: json.other_count,
                guitar_count: json.guitar_count,
                djembe_count: json.djembe_count,
                ukulele_count: json.ukulele_count,
                kalimba_count: json.kalimba_count,
                quane_money: json.quane_money,
                coupon_money: json.coupon_money,
                promo_money: json.promo_money,
                promo_and_coupon_money: json.promo_and_coupon_money,
                android_money: json.android_money,
                ios_money: json.ios_money,
                other_money: json.other_money,
                guitar_money: json.guitar_money,
                ukulele_money: json.ukulele_money,
                kalimba_money: json.kalimba_money,
                djembe_money: json.djembe_money,
                // active_count: json.active_count,
                guitar_active_count: json.guitar_active_count,
                uk_active_count: json.uk_active_count,
                qinzi_active_count: json.qinzi_active_count,
                kalimba_active_count: json.kalimba_active_count,
                guitar_chuji_bixiu_count: json.course_statistics.guitar_chuji_bixiu_count,
                guitar_zhongji_bixiu_count: json.course_statistics.guitar_zhongji_bixiu_count,
                guitar_heji_count: json.course_statistics.guitar_heji_count,
                guitar_xuanxiu_count: json.course_statistics.guitar_xuanxiu_count,
                ukelulu_chuji_bixiu_count: json.course_statistics.ukelulu_chuji_bixiu_count,
                ukulele_zhongji_bixiu_count: json.course_statistics.ukulele_zhongji_bixiu_count,
                ukulele_heji_count: json.course_statistics.ukulele_heji_count,
                ukulele_xuanxiu_count: json.course_statistics.ukulele_xuanxiu_count,
                qinzi_count: json.course_statistics.qinzi_count,
                guitar_chuji_bixiu_money: json.course_money.guitar_chuji_bixiu_money,
                guitar_zhongji_bixiu_money: json.course_money.guitar_zhongji_bixiu_money,
                guitar_heji_money: json.course_money.guitar_heji_money,
                guitar_xuanxiu_money: json.course_money.guitar_xuanxiu_money,
                ukelulu_chuji_bixiu_money: json.course_money.ukelulu_chuji_bixiu_money,
                ukulele_zhongji_bixiu_money: json.course_money.ukulele_zhongji_bixiu_money,
                ukulele_heji_money: json.course_money.ukulele_heji_money,
                ukelulu_xuanxiu_money: json.course_money.ukelulu_xuanxiu_money,
                qinzi_money: json.course_money.qinzi_money,

                guitar_quane_count: json.guitar_list.guitar_quane_count,
                guitar_coupon_count: json.guitar_list.guitar_coupon_count,
                guitar_promo_count: json.guitar_list.guitar_promo_count,
                guitar_promo_and_coupon_count: json.guitar_list.guitar_promo_and_coupon_count,
                guitar_android_count: json.guitar_list.guitar_android_count,
                guitar_ios_count: json.guitar_list.guitar_ios_count,
                guitar_other_count: json.guitar_list.guitar_other_count,
                guitar_quane_money: json.guitar_list.guitar_quane_money,
                guitar_coupon_money: json.guitar_list.guitar_coupon_money,
                guitar_promo_money: json.guitar_list.guitar_promo_money,
                guitar_promo_and_coupon_money: json.guitar_list.guitar_promo_and_coupon_money,
                guitar_android_money: json.guitar_list.guitar_android_money,
                guitar_ios_money: json.guitar_list.guitar_ios_money,
                guitar_other_money: json.guitar_list.guitar_other_money,

                ukelulu_quane_count: json.ukulele_list.ukelulu_quane_count,
                ukelulu_coupon_count: json.ukulele_list.ukelulu_coupon_count,
                ukelulu_promo_count: json.ukulele_list.ukelulu_promo_count,
                ukelulu_promo_and_coupon_count: json.ukulele_list.ukelulu_promo_and_coupon_count,
                ukelulu_android_count: json.ukulele_list.ukelulu_android_count,
                ukelulu_ios_count: json.ukulele_list.ukelulu_ios_count,
                ukelulu_other_count: json.ukulele_list.ukelulu_other_count,
                ukelulu_quane_money: json.ukulele_list.ukelulu_quane_money,
                ukelulu_coupon_money: json.ukulele_list.ukelulu_coupon_money,
                ukelulu_promo_money: json.ukulele_list.ukelulu_promo_money,
                ukelulu_promo_and_coupon_money: json.ukulele_list.ukelulu_promo_and_coupon_money,
                ukelulu_android_money: json.ukulele_list.ukelulu_android_money,
                ukelulu_ios_money: json.ukulele_list.ukelulu_ios_money,
                ukelulu_other_money: json.ukulele_list.ukelulu_other_money,

                kalimba_quane_count: json.kalimba_list.kalimba_quane_count,
                kalimba_coupon_count: json.kalimba_list.kalimba_coupon_count,
                kalimba_promo_count: json.kalimba_list.kalimba_promo_count,
                kalimba_promo_and_coupon_count: json.kalimba_list.kalimba_promo_and_coupon_count,
                kalimba_android_count: json.kalimba_list.kalimba_android_count,
                kalimba_ios_count: json.kalimba_list.kalimba_ios_count,
                kalimba_other_count: json.kalimba_list.kalimba_other_count,
                kalimba_quane_money: json.kalimba_list.kalimba_quane_money,
                kalimba_coupon_money: json.kalimba_list.kalimba_coupon_money,
                kalimba_promo_money: json.kalimba_list.kalimba_promo_money,
                kalimba_promo_and_coupon_money: json.kalimba_list.kalimba_promo_and_coupon_money,
                kalimba_android_money: json.kalimba_list.kalimba_android_money,
                kalimba_ios_money: json.kalimba_list.kalimba_ios_money,
                kalimba_other_money: json.kalimba_list.kalimba_other_money,

                channl_one_name: json.channl_one_name, channl_one_count: json.channl_one_count,
                channl_two_name: json.channl_two_name, channl_two_count: json.channl_two_count,
                channl_three_name: json.channl_three_name, channl_three_count: json.channl_three_count,
                channl_four_name: json.channl_four_name, channl_four_count: json.channl_four_count,
                channl_five_name: json.channl_five_name, channl_five_count: json.channl_five_count,
                channl_six_name: json.channl_six_name, channl_six_count: json.channl_six_count,
                channl_seven_name: json.channl_seven_name, channl_seven_count: json.channl_seven_count,
                channl_eight_name: json.channl_eight_name, channl_eight_count: json.channl_eight_count,
                channl_nine_name: json.channl_nine_name, channl_nine_count: json.channl_nine_count,
                channl_ten_name: json.channl_ten_name, channl_ten_count: json.channl_ten_count,

                g_one_count: json.guitar_or_ukulele_dis_list.g_one_count,
                g_two_count: json.guitar_or_ukulele_dis_list.g_two_count,
                g_three_count: json.guitar_or_ukulele_dis_list.g_three_count,
                g_four_count: json.guitar_or_ukulele_dis_list.g_four_count,
                u_one_count: json.guitar_or_ukulele_dis_list.u_one_count,
                u_two_count: json.guitar_or_ukulele_dis_list.u_two_count,
                u_three_count: json.guitar_or_ukulele_dis_list.u_three_count,
                u_four_count: json.guitar_or_ukulele_dis_list.u_four_count,

                channl_guitar_one_count: json.channl_guitar_one_count,
                channl_guitar_two_count: json.channl_guitar_two_count,
                channl_guitar_three_count: json.channl_guitar_three_count,
                channl_guitar_four_count: json.channl_guitar_four_count,
                channl_guitar_five_count: json.channl_guitar_five_count,
                channl_guitar_six_count: json.channl_guitar_six_count,
                channl_guitar_seven_count: json.channl_guitar_seven_count,
                channl_guitar_eight_count: json.channl_guitar_eight_count,
                channl_guitar_nine_count: json.channl_guitar_nine_count,
                channl_guitar_ten_count: json.channl_guitar_ten_count,
                channl_uk_one_count: json.channl_uk_one_count, channl_uk_two_count: json.channl_uk_two_count,
                channl_uk_three_count: json.channl_uk_three_count,
                channl_uk_four_count: json.channl_uk_four_count, channl_uk_five_count: json.channl_uk_five_count,
                channl_uk_six_count: json.channl_uk_six_count, channl_uk_seven_count: json.channl_uk_seven_count,
                channl_uk_eight_count: json.channl_uk_eight_count,
                channl_uk_nine_count: json.channl_uk_nine_count, channl_uk_ten_count: json.channl_uk_ten_count,
                channl_kalimba_one_count: json.channl_kalimba_one_count,
                channl_kalimba_two_count: json.channl_kalimba_two_count,
                channl_kalimba_three_count: json.channl_kalimba_three_count,
                channl_kalimba_four_count: json.channl_kalimba_four_count,
                channl_kalimba_five_count: json.channl_kalimba_five_count,
                channl_kalimba_six_count: json.channl_kalimba_six_count,
                channl_kalimba_seven_count: json.channl_kalimba_seven_count,
                channl_kalimba_eight_count: json.channl_kalimba_eight_count,
                channl_kalimba_nine_count: json.channl_kalimba_nine_count,
                channl_kalimba_ten_count: json.channl_kalimba_ten_count,

            }))
            .catch(error => this.setState({
                loading: false,
                error: error,
            }, console.log('**************', error)))
    }

    render() {
        const {
            loading, error, day, instype, month,
            quane_count, promo_and_coupon_count, other_count, promo_count, coupon_count, android_count, ios_count,
            guitar_count, djembe_count, ukulele_count, kalimba_count, quane_money,
            coupon_money, promo_money, promo_and_coupon_money, android_money, ios_money, other_money,
            guitar_active_count, uk_active_count, qinzi_active_count, kalimba_active_count,
            guitar_money, ukulele_money, kalimba_money, djembe_money, guitar_chuji_bixiu_count, guitar_zhongji_bixiu_count,
            guitar_heji_count, ukelulu_chuji_bixiu_count, ukulele_zhongji_bixiu_count, ukulele_heji_count, qinzi_count,
            guitar_chuji_bixiu_money, guitar_zhongji_bixiu_money, guitar_heji_money, guitar_xuanxiu_money, guitar_xuanxiu_count, ukulele_xuanxiu_count,
            ukelulu_chuji_bixiu_money, ukulele_zhongji_bixiu_money, ukulele_heji_money, ukelulu_xuanxiu_money, qinzi_money,
            kalimba_quane_count, kalimba_coupon_count, kalimba_promo_count, kalimba_promo_and_coupon_count, kalimba_android_count,
            kalimba_ios_count, kalimba_other_count, kalimba_quane_money, kalimba_coupon_money, kalimba_promo_money, kalimba_promo_and_coupon_money,
            kalimba_android_money, kalimba_ios_money, kalimba_other_money,
            ukelulu_quane_count, ukelulu_coupon_count, ukelulu_promo_count, ukelulu_promo_and_coupon_count, ukelulu_android_count,
            ukelulu_ios_count, ukelulu_other_count, ukelulu_quane_money, ukelulu_coupon_money, ukelulu_promo_money, ukelulu_promo_and_coupon_money,
            ukelulu_android_money, ukelulu_ios_money, ukelulu_other_money,
            guitar_quane_count, guitar_coupon_count, guitar_promo_count, guitar_promo_and_coupon_count, guitar_android_count,
            guitar_ios_count, guitar_other_count, guitar_quane_money, guitar_coupon_money,
            guitar_promo_money, guitar_promo_and_coupon_money, guitar_android_money, guitar_ios_money, guitar_other_money,
            channl_one_name, channl_one_count, channl_two_name, channl_two_count,
            channl_three_name, channl_three_count, channl_four_name, channl_four_count,
            channl_five_name, channl_five_count, channl_six_name, channl_six_count,
            channl_seven_name, channl_seven_count, channl_eight_name, channl_eight_count,
            channl_nine_name, channl_nine_count, channl_ten_name, channl_ten_count,
            channl_guitar_one_count, channl_guitar_two_count, channl_guitar_three_count, channl_guitar_four_count, channl_guitar_five_count,
            channl_guitar_six_count, channl_guitar_seven_count, channl_guitar_eight_count, channl_guitar_nine_count, channl_guitar_ten_count,
            channl_uk_one_count, channl_uk_two_count, channl_uk_three_count, channl_uk_four_count, channl_uk_five_count,
            channl_uk_six_count, channl_uk_seven_count, channl_uk_eight_count, channl_uk_nine_count, channl_uk_ten_count,
            channl_kalimba_one_count, channl_kalimba_two_count, channl_kalimba_three_count, channl_kalimba_four_count, channl_kalimba_five_count,
            channl_kalimba_six_count, channl_kalimba_seven_count, channl_kalimba_eight_count, channl_kalimba_nine_count, channl_kalimba_ten_count,
            g_one_count, g_two_count, g_three_count, g_four_count, u_one_count, u_two_count, u_three_count, u_four_count,
        } = this.state;

        var a = 'inline';
        if (day) {
            a = 'none';
        }
        var b = 'inline';
        if (month) {
            b = 'none';
        }

        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Form inline style={{padding: 3, marginTop: 10}}>
                    <FormGroup bsSize="small" controlId="days" style={{display: b}}>
                        <ControlLabel>天数：</ControlLabel>
                        <FormControl componentClass="select" value={day}
                                     onChange={e => this.setState({day: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="1">昨天</option>
                            <option value="7">7天</option>
                            <option value="15">15天</option>
                            <option value="30">30天</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="small" controlId="days" style={{display: a}}>
                        <ControlLabel>月份：</ControlLabel>
                        <FormControl componentClass="select" value={month}
                                     onChange={e => this.setState({month: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="1">2018-01月</option>
                            <option value="2">2018-02月</option>
                            <option value="3">2018-03月</option>
                            <option value="4">2018-04月</option>
                            <option value="5">2018-05月</option>
                            <option value="6">2018-06月</option>
                            <option value="7">2018-07月</option>
                            <option value="8">2018-08月</option>
                            <option value="9">2018-09月</option>
                            <option value="10">2018-10月</option>
                            <option value="11">2018-11月</option>
                            <option value="12">2018-12月</option>
                        </FormControl>
                    </FormGroup>
                </Form>
                <h4>累计付费总人数:<Link
                    to={{
                        pathname: `paymentstatisticsdetail`,
                        query: {types: 0, day: day, month: month}
                    }}>{guitar_count + ukulele_count + kalimba_count + djembe_count}</Link>,
                    累计付费金额:<Link
                        to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 0, day: day, month: month}
                        }}>{(guitar_money + ukulele_money + kalimba_money + djembe_money)}</Link>,
                    {/*累计手动激活人数:<Link to={`paymentstatisticspurchase`}>{active_count}</Link></h4>*/}
                    激活吉他人数:{guitar_active_count},
                    激活UK人数:{uk_active_count},
                    激活卡林巴人数:{kalimba_active_count},
                    激活亲子人数:{qinzi_active_count}</h4>
                <h4>按设备分</h4>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th></th>
                        <th>吉他人数</th>
                        <th>吉他金额</th>
                        <th>尤克里里人数</th>
                        <th>尤克里里金额</th>
                        <th>卡林巴人数</th>
                        <th>卡林巴金额</th>
                        <th>总人数</th>
                        <th>总金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>Android</b></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 25, day: day, month: month}
                            }}>{guitar_android_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 25, day: day, month: month}
                            }}>{guitar_android_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 32, day: day, month: month}
                            }}>{ukelulu_android_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 32, day: day, month: month}
                            }}>{ukelulu_android_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 39, day: day, month: month}
                            }}>{kalimba_android_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 39, day: day, month: month}
                            }}>{kalimba_android_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 5, day: day, month: month}
                            }}>{android_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 5, day: day, month: month}
                            }}>{android_money}</Link></td>
                    </tr>
                    <tr>
                        <td><b>IOS</b></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 26, day: day, month: month}
                            }}>{guitar_ios_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 26, day: day, month: month}
                            }}>{guitar_ios_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 33, day: day, month: month}
                            }}>{ukelulu_ios_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 33, day: day, month: month}
                            }}>{ukelulu_ios_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 40, day: day, month: month}
                            }}>{kalimba_ios_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 40, day: day, month: month}
                            }}>{kalimba_ios_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 6, day: day, month: month}
                            }}>{ios_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 6, day: day, month: month}
                            }}>{ios_money}</Link></td>
                    </tr>
                    <tr>
                        <td><b>未知设备</b></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 27, day: day, month: month}
                            }}>{guitar_other_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 27, day: day, month: month}
                            }}>{guitar_other_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 34, day: day, month: month}
                            }}>{ukelulu_other_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 34, day: day, month: month}
                            }}>{ukelulu_other_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 41, day: day, month: month}
                            }}>{kalimba_other_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 41, day: day, month: month}
                            }}>{kalimba_other_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 7, day: day, month: month}
                            }}>{other_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 7, day: day, month: month}
                            }}>{other_money}</Link></td>
                    </tr>
                    </tbody>
                </Table>
                <h4>按品类分</h4>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th></th>
                        <th>吉他</th>
                        <th>尤克里里</th>
                        <th>卡林巴</th>
                        <th>非洲鼓</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>人数</b></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 8, day: day, month: month}
                        }}>{guitar_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 9, day: day, month: month}
                        }}>{ukulele_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 10, day: day, month: month}
                        }}>{kalimba_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 11, day: day, month: month}
                        }}>{djembe_count}</Link></td>
                    </tr>
                    <tr>
                        <td><b>金额</b></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 8, day: day, month: month}
                        }}>{guitar_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 9, day: day, month: month}
                        }}>{ukulele_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 10, day: day, month: month}
                        }}>{kalimba_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 11, day: day, month: month}
                        }}>{djembe_money}</Link></td>
                    </tr>
                    </tbody>
                </Table>
                <h4>按渠道分</h4>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th></th>
                        <th>总数</th>
                        <th>{channl_one_name}</th>
                        <th>{channl_two_name}</th>
                        <th>{channl_three_name}</th>
                        <th>{channl_four_name}</th>
                        <th>{channl_five_name}</th>
                        <th>{channl_six_name}</th>
                        <th>{channl_seven_name}</th>
                        <th>{channl_eight_name}</th>
                        <th>{channl_nine_name}</th>
                        <th>{channl_ten_name}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>合计</b></td>
                        <td><Link
                            to={`paymentstatisticspromo`}>{promo_count + promo_and_coupon_count}</Link></td>
                        <td>{channl_one_count}</td>
                        <td>{channl_two_count}</td>
                        <td>{channl_three_count}</td>
                        <td>{channl_four_count}</td>
                        <td>{channl_five_count}</td>
                        <td>{channl_six_count}</td>
                        <td>{channl_seven_count}</td>
                        <td>{channl_eight_count}</td>
                        <td>{channl_nine_count}</td>
                        <td>{channl_ten_count}</td>
                    </tr>
                    <tr>
                        <td><b>吉他</b></td>
                        <td>{guitar_promo_and_coupon_count + guitar_promo_count}</td>
                        <td>{channl_guitar_one_count}</td>
                        <td>{channl_guitar_two_count}</td>
                        <td>{channl_guitar_three_count}</td>
                        <td>{channl_guitar_four_count}</td>
                        <td>{channl_guitar_five_count}</td>
                        <td>{channl_guitar_six_count}</td>
                        <td>{channl_guitar_seven_count}</td>
                        <td>{channl_guitar_eight_count}</td>
                        <td>{channl_guitar_nine_count}</td>
                        <td>{channl_guitar_ten_count}</td>
                    </tr>
                    <tr>
                        <td><b>尤克里里</b></td>
                        <td>{ukelulu_promo_count + ukelulu_promo_and_coupon_count}</td>
                        <td>{channl_uk_one_count}</td>
                        <td>{channl_uk_two_count}</td>
                        <td>{channl_uk_three_count}</td>
                        <td>{channl_uk_four_count}</td>
                        <td>{channl_uk_five_count}</td>
                        <td>{channl_uk_six_count}</td>
                        <td>{channl_uk_seven_count}</td>
                        <td>{channl_uk_eight_count}</td>
                        <td>{channl_uk_nine_count}</td>
                        <td>{channl_uk_ten_count}</td>
                    </tr>
                    <tr>
                        <td><b>卡林巴</b></td>
                        <td>{kalimba_promo_count + kalimba_promo_and_coupon_count}</td>
                        <td>{channl_kalimba_one_count}</td>
                        <td>{channl_kalimba_two_count}</td>
                        <td>{channl_kalimba_three_count}</td>
                        <td>{channl_kalimba_four_count}</td>
                        <td>{channl_kalimba_five_count}</td>
                        <td>{channl_kalimba_six_count}</td>
                        <td>{channl_kalimba_seven_count}</td>
                        <td>{channl_kalimba_eight_count}</td>
                        <td>{channl_kalimba_nine_count}</td>
                        <td>{channl_kalimba_ten_count}</td>
                    </tr>
                    </tbody>
                </Table>
                <h4>按类型分</h4>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th></th>
                        <th>全额人数</th>
                        <th>全额金额</th>
                        <th>使用奖学人数</th>
                        <th>使用奖学金额</th>
                        <th>使用优惠券人数</th>
                        <th>使用优惠券金额</th>
                        <th>优惠券+奖学金人数</th>
                        <th>优惠券+奖学金金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>合计</b></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 1, day: day, month: month}
                            }}>{quane_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 1, day: day, month: month}
                            }}>{quane_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 2, day: day, month: month}
                            }}>{promo_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 2, day: day, month: month}
                            }}>{promo_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 3, day: day, month: month}
                            }}>{coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 3, day: day, month: month}
                            }}>{coupon_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 4, day: day, month: month}
                            }}>{promo_and_coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 4, day: day, month: month}
                            }}>{promo_and_coupon_money}</Link></td>
                    </tr>
                    <tr>
                        <td><b>吉他</b></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 21, day: day, month: month}
                            }}>{guitar_quane_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 21, day: day, month: month}
                            }}>{guitar_quane_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 22, day: day, month: month}
                            }}>{guitar_promo_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 22, day: day, month: month}
                            }}>{guitar_promo_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 23, day: day, month: month}
                            }}>{guitar_coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 23, day: day, month: month}
                            }}>{guitar_coupon_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 24, day: day, month: month}
                            }}>{guitar_promo_and_coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 24, day: day, month: month}
                            }}>{guitar_promo_and_coupon_money}</Link></td>
                    </tr>
                    <tr>
                        <td><b>尤克里里</b></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 28, day: day, month: month}
                            }}>{ukelulu_quane_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 28, day: day, month: month}
                            }}>{ukelulu_quane_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 29, day: day, month: month}
                            }}>{ukelulu_promo_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 29, day: day, month: month}
                            }}>{ukelulu_promo_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 30, day: day, month: month}
                            }}>{ukelulu_coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 30, day: day, month: month}
                            }}>{ukelulu_coupon_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 31, day: day, month: month}
                            }}>{ukelulu_promo_and_coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 31, day: day, month: month}
                            }}>{ukelulu_promo_and_coupon_money}</Link></td>
                    </tr>
                    <tr>
                        <td><b>卡林巴</b></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 35, day: day, month: month}
                            }}>{kalimba_quane_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 35, day: day, month: month}
                            }}>{kalimba_quane_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 36, day: day, month: month}
                            }}>{kalimba_promo_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 36, day: day, month: month}
                            }}>{kalimba_promo_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 37, day: day, month: month}
                            }}>{kalimba_coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 37, day: day, month: month}
                            }}>{kalimba_coupon_money}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 38, day: day, month: month}
                            }}>{kalimba_promo_and_coupon_count}</Link></td>
                        <td><Link
                            to={{
                                pathname: `paymentstatisticsdetail`,
                                query: {types: 38, day: day, month: month}
                            }}>{kalimba_promo_and_coupon_money}</Link></td>
                    </tr>
                    </tbody>
                </Table>
                <h4>按课程分</h4>
                <Table bordered hover striped condensed responsiv style={{height: 66}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>初级人数</th>
                        <th>初级金额</th>
                        <th>中级人数</th>
                        <th>中级金额</th>
                        <th>合集人数</th>
                        <th>合集金额</th>
                        <th>选修人数</th>
                        <th>选修金额</th>
                        <th>亲子人数</th>
                        <th>亲子金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>吉他</b></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 12, day: day, month: month}
                        }}>{guitar_chuji_bixiu_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 12, day: day, month: month}
                        }}>{guitar_chuji_bixiu_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 13, day: day, month: month}
                        }}>{guitar_zhongji_bixiu_count+guitar_heji_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 13, day: day, month: month}
                        }}>{guitar_zhongji_bixiu_money+guitar_heji_money}</Link></td>
                        {/*<td><Link to={{*/}
                            {/*pathname: `paymentstatisticsdetail`,*/}
                            {/*query: {types: 14, day: day, month: month}*/}
                        {/*}}>{guitar_heji_count}</Link></td>*/}
                        {/*<td><Link to={{*/}
                            {/*pathname: `paymentstatisticsdetail`,*/}
                            {/*query: {types: 14, day: day, month: month}*/}
                        {/*}}>{guitar_heji_money}</Link></td>*/}
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 15, day: day, month: month}
                        }}>{guitar_xuanxiu_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 15, day: day, month: month}
                        }}>{guitar_xuanxiu_money}</Link></td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td><b>尤克里里</b></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 16, day: day, month: month}
                        }}>{ukelulu_chuji_bixiu_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 16, day: day, month: month}
                        }}>{ukelulu_chuji_bixiu_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 17, day: day, month: month}
                        }}>{ukulele_zhongji_bixiu_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 17, day: day, month: month}
                        }}>{ukulele_zhongji_bixiu_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 18, day: day, month: month}
                        }}>{ukulele_heji_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 18, day: day, month: month}
                        }}>{ukulele_heji_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 19, day: day, month: month}
                        }}>{ukulele_xuanxiu_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 19, day: day, month: month}
                        }}>{ukelulu_xuanxiu_money}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 20, day: day, month: month}
                        }}>{qinzi_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 20, day: day, month: month}
                        }}>{qinzi_money}</Link></td>
                    </tr>
                    <tr>
                        <td><b>卡林巴</b></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 10, day: day, month: month}
                        }}>{kalimba_count}</Link></td>
                        <td><Link to={{
                            pathname: `paymentstatisticsdetail`,
                            query: {types: 10, day: day, month: month}
                        }}>{kalimba_money}</Link></td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </Table>
                <h4>复购统计</h4>
                <Table bordered hover striped condensed responsiv style={{height: 66}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>一套课程人数</th>
                        <th>二套课程人数</th>
                        <th>三套课程人数</th>
                        <th>四套以上课程人数</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>吉他</b></td>
                        <td>{g_one_count}</td>
                        <td>{g_two_count}</td>
                        <td>{g_three_count}</td>
                        <td>{g_four_count}</td>
                    </tr>
                    <tr>
                        <td><b>尤克里里</b></td>
                        <td>{u_one_count}</td>
                        <td>{u_two_count}</td>
                        <td>{u_three_count}</td>
                        <td>{u_four_count}</td>
                    </tr>
                    <tr>
                        <td><b>卡林巴</b></td>
                        <td>{kalimba_count}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
