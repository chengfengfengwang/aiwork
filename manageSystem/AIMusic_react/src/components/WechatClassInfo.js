/**
 * Created by mac on 2017/10/9.
 */
import React from "react";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import {Form, Table} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Link} from "react-router-dom";
import moment from "moment";
import DatePicker from "react-bootstrap-date-picker";
import index from "../config";
export default class PromoInfo extends React.Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            page: 0,
            size: 10,
            total: 0,
            beginTime: '',
            endTime: '',
            start_time: '',
            classInfo:'',
            classPurchase:[],
            start_time_value: new Date().toISOString(),
            // class_id:0,
        }
    }

    onLoad() {
        const {location: {search}} = this.props;
        const {page, size, beginTime, endTime,  start_time} = this.state;
        const params = new URLSearchParams(search.replace('?', ''));
        this.setState({loading: true, error: null});
        api.getWechatClassPurchase({page, size, class_id: params.get('class_id'), beginTime, endTime, start_time})
            .then(json => this.setState({
                loading: false,
                classPurchase: json.data,
                data: json,
                classInfo: json.classInfo,
                class_id: params.get('class_id')
            })
            )
            .catch(error => this.setState({
                loading: false,
                error: error
            }));
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {loading, error, classPurchase, beginTime, endTime, data, classInfo, class_id} = this.state;
        console.log(classPurchase)
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

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

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>班级id</th>
                        <th>班级名称</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{class_id}</td>
                        <td>{classInfo}</td>
                    </tr>
                    </tbody>
                </Table>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>课程名称</th>
                        <th>课程购买数量</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        classPurchase.map((purchase, index) =>{
                            return(
                            <tr>
                            <td>{purchase.name}</td>
                                <td>{purchase.count}</td>
                        </tr>
                        )
                    })
                    }
                    </tbody>
                </Table>


            </div>
        );
    }
}