import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Modal, Row, Table} from "react-bootstrap";
import Waiting from "./Waiting";
import * as api from "../api";
import Error2 from "./Error2";
import ThePagination from "./Pagination";

export default class Complaint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            page: 0,
            complaintinfo: [],
            size: 10,
            total: 0,
        }
    };

    componentDidMount() {
        this.onLoad();
    };

    onLoad() {
        const {page} = this.state;
        this.setState({loading: true, error: null})
        api.complaint({page,})
            .then(json => this.setState({
                loading: false,
                error: null,
                complaintinfo: json.data,
                page: json.paging.page,
                total: json.paging.total,
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {loading, error, complaintinfo, page, size, total} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>用户</th>
                        <th>投诉标题</th>
                        <th>投诉内容</th>
                        <th>设备信息</th>
                        <th>时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        complaintinfo.map((complaintinfo, index) =>{
                            return (
                                <tr>
                                    <td>{`${complaintinfo.phone} [${complaintinfo.device.device_model}  ${complaintinfo.device.device_os}]`}</td>
                                    <td>{complaintinfo.title}</td>
                                    <td>{complaintinfo.content}</td>
                                    <td>{complaintinfo.device_info}</td>
                                    <td>{complaintinfo.created_at}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={(page) => this.setState({page}, () => this.onLoad())}/>
            </div>)
    }
}