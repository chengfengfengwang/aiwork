import React, {} from "react";
import * as api from "../api";
import {
    Table,
    thead,
    tbody,
    Alert, Button, Panel, ControlLabel, InputGroup, FormControl, Glyphicon, FormGroup
} from "react-bootstrap";
import './recommend.css';

export default class ActiveCodeStats extends React.Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {loading: false, error: null, popup: false, batch_list: [], code:''}
    }

    onLoad() {
        this.setState({loading: true});
        api.getActiveCodesStats({})
            .then(json => this.setState({loading: false, batch_list: json.data}))
            .catch(error => this.setState({loading: false, error}));
    }

    onReload(){
        this.onLoad();
    }

    onSearchCode() {
        const {code} = this.state;
        this.setState({loading: true});
        api.getSearchCode(code)
            .then(json => {
                if (json.error !== 0){
                    if (code.length >= 6){
                        alert(json.message)
                    }
                }else{
                    let data = json.data;
                    let user_info = data.user;
                    let course_info = data.sup_courses[0];

                    if (user_info !== {}){
                        let user_show = '使用人信息：【用户名】： ' + user_info.nickname +
                            ' 【电话】：' + user_info.tel + ' 【用户id】：' + user_info.uid;
                        let course_show = '【课程使用id】：' + course_info.course_id;
                        alert(user_show + course_show);
                    }
                }
            })
            .catch(error => this.setState({loading: false, error}));
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {batch_list, code} = this.state;
        return (
            <div>
                <FormGroup bsSize="small" style={{width: '400px', float: 'left'}}>
                    <ControlLabel>激活码查询</ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text" placeholder="请输入激活码"
                            value={code}
                            onChange={e => this.setState({
                                page: 0,
                                code: e.target.value.trim()
                            }, () => this.onSearchCode())}
                        />
                        <InputGroup.Addon><Glyphicon glyph="search" onClick={this.onSearchCode}/></InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                <Button style={{float: "right", marginTop: '10px'}} onClick={this.onLoad}>刷新</Button>
                <Table striped bordered condensed hover style={{float: "right", marginTop: '10px'}}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>名称</th>
                      <th>统计</th>
                    </tr>
                  </thead>
                  <tbody>
                        {
                            batch_list.map((item, index) => {
                                return(
                                    <tr>
                                        <td>{index}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {
                                                item.stats.map((stat, index) => {
                                                    return(
                                                        <div style={{float: 'left', marginLeft: '20px'}}>
                                                            <strong>{stat._id}</strong>
                                                            <Alert bsStyle="warning" style={{marginTop: '10px', marginBottom: 0}}>
                                                                总数目：<strong>{stat.total_batch}</strong><br/>
                                                                已使用数目：<strong>{stat.use_batch}</strong>
                                                            </Alert>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
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
