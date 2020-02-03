import React from "react";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import * as api from "../api";
import {Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import moment from "moment";



export default class WechatClassPaymentData extends React.Component {
    constructor(props){
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            page: 0,
            size: 10,
            total: 0,
            classData:[],
            beginTime: '',
            endTime: '',
            oneGraduate:0,
            twoGraduate:0,
            jcount:0

    }}

    onLoad() {
        const {location: {search}} = this.props;
        const {page, size, beginTime, endTime} = this.state;
        const params = new URLSearchParams(search.replace('?', ''));
        this.setState({loading: true, error: null});
        api.getWechatClassPaymentData({page,size,class_id:params.get('class_id'), beginTime, endTime})
            .then(json => this.setState({
                loading:false,
                classData: json.data,
                className: json.class_name,
                jcount: json.day_jcount,
                oneGraduated: json.one_graduated,
                twoGraduated: json.two_graduated,
                class_id: params.get('class_id')
            }))
            .catch(error => this.setState({
                loading:false,
                error:error
            }))
    }

    componentDidMount() {
        this.onLoad();
    }

    render(){
        const {loading, error, classData, class_id, beginTime, endTime,twoGraduated,oneGraduated, className,jcount} = this.state;
        return (


            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={()=> this.setState({error:null})}/>

                <Form inline style={{marginBottom: 5}}>
                    开始时间:<input type="text" value={beginTime} className="form-control input-sm"
                                placeholder="2017-10-1" onChange={e => this.setState({beginTime: e.target.value.trim()})}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    结束时间:<input type="text" value={endTime} className="form-control input-sm"
                                placeholder="2017-11-1" onChange={e => this.setState({endTime: e.target.value.trim()})}/>
                    &nbsp;
                    <button className="btn btn-success btn-sm" onClick={e => {
                        e.preventDefault();
                        this.onLoad();
                    }}>搜索
                    </button>
                </Form>
s
                <Table>
                    <thead>
                    <tr>
                        <td>
                            班级id
                        </td>
                        <td>班级名称</td>
                        <td>加班人数</td>
                        <td>初级毕业</td>
                        <td>中级毕业</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{class_id}</td>
                        <td>{className}</td>
                        <td>{jcount}</td>
                        <td>{oneGraduated}</td>
                        <td>{twoGraduated}</td>
                    </tr>
                    </tbody>
                </Table>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <td>用户信息</td>
                        <td>激活课程</td>
                        <td>激活课程数</td>
                        <td>购买课程  --- 课程金额 ---  购买时间</td>
                        <td>购买数量</td>
                        <td>金额</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        classData.map((oneUserData, index) => {
                            return(
                                    <tr key={index}>
                                        <td>
                                            {/*<Link to={`cccc/class_user_payment_data?${oneUserData}`}>*/}
                                                {/*{`${oneUserData.user.user_name} ----- ${oneUserData.user.phone}`}*/}
                                            {/*</Link>*/}
                                            {`${oneUserData.user.user_name} ----- ${oneUserData.user.phone}`}
                                        </td>
                                        <td>
                                            {  oneUserData.purchases?
                                                oneUserData.purchases.map((purchase, index) =>{
                                                    if (index < 2){
                                                    return (<p>{purchase.course_name}</p>)
                                                    }
                                                }): ''
                                            }
                                        </td>
                                        <td>
                                            {oneUserData.purchases? oneUserData.purchases.length: ''}
                                        </td>
                                        <td>
                                            {   oneUserData.payments?
                                                oneUserData.payments.map((payment, index) =>{
                                                    return(<p>{`${payment.goods}  ${payment.price/100} ${moment.unix(payment.time).locale('zh_CN').format('LLLL')}`}</p>)
                                                }): ''
                                            }
                                        </td>
                                        <td>
                                            {
                                                oneUserData.payments? oneUserData.payments.length: ''
                                            }
                                        </td>
                                        <td>{oneUserData.total_amount/100}</td>

                                    </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

            </div>
        )
    }
}