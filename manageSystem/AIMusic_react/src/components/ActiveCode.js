import React, {} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {
    Table,
    thead,
    tbody,
    Form,
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    Glyphicon,
    InputGroup
} from "react-bootstrap";
import './recommend.css';
import * as moment from "moment";

export default class ActiveCode extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {loading: false, error: null, popup: false, items: [], item_id: 0,
            page: 0, size: 20, total: 0, dlg_set: false, dlg_create_code: false, dlg_img: false,
            state: '', cur_img: '', sort: '', batch_number: ''}
    }

    onLoad() {
        const {page, size, state, sort, batch_number} = this.state;
        this.setState({loading: true});

        api.getActiveCodes({page: page, size: size, state: state, sort: sort, batch_number: batch_number})
            .then(json => this.setState({loading: false, items: json.data, total: json.paging.total}))
            .catch(error => this.setState({loading: false, error}));
    }

    onDelete(id) {
        if (confirm("你确定删除吗？")) {
            api.delRecommends(id)
                .then(() => this.setState({loading: false}, this.onLoad))
                .catch(error => this.setState({loading: false, error}));
        }
    }

    onReload(){
        this.onLoad();
    }

    componentDidMount() {
        this.onLoad();
    }

    formatDateTime(timeStamp) {
        let date = new Date();
        date.setTime(timeStamp * 1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    };

    render() {
        const {loading, error, page, size, total, items, batch_number} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

                <Form inline style={{padding: 3}}>
                    <Button bsSize="sm" bsStyle="primary" style={{float: 'right'}}
                            onClick={() => {this.setState({popup: true})}}>新建</Button>
                    <Button bsSize="sm" style={{float: 'right', marginRight: 10}} onClick={this.onReload}>刷新</Button>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>排序方式：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({sort: e.target.value}, this.onLoad)}>
                            <option value="">默认排序</option>
                            <option value="(('_id', 1), )">ID递增</option>
                            <option value="(('_id', -1), )">ID递减</option>
                            <option value="(('title', 1), )">标题递增</option>
                            <option value="(('title', -1), )">标题递减</option>
                            <option value="(('updated_at', 1), )">更新时间递增</option>
                            <option value="(('updated_at', -1), )">更新时间递减</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="small" controlId="days" style={{marginLeft: '20px'}}>
                        <ControlLabel>状态：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({state: e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value='1'>开启</option>
                            <option value='0'>关闭</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="small" controlId="days" style={{marginLeft: '20px'}}>
                        <ControlLabel>批号查询</ControlLabel>
                        <InputGroup>
                            <FormControl
                                type="text" placeholder="请输入批号"
                                value={batch_number}
                                onChange={e => this.setState({
                                    page: 0,
                                    batch_number: e.target.value.trim()
                                }, () => this.onLoad())}/>
                            <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>对应模板</th>
                        <th>批号</th>
                        <th>激活码</th>
                        <th>使用时间</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => {
                            let id = item.id, create_time = this.formatDateTime(item.createdAt);
                            let export_url = 'http://iguitar.immusician.com:2525/v3/active_template/export_code/' + item.template;
                            let useDt = '';
                            if (item.useDt !== ""){
                                useDt = moment.unix(item.useDt).locale('zh_CN').format('LLLL');
                            }
                            return (
                                <tr id={item.id} key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.template}</td>
                                    <td>{item.batchNumber}</td>
                                    <td>{item.code}</td>
                                    <td>{useDt}</td>
                                    <td>{create_time}</td>
                                    <td>
                                        <form action={export_url} method="get">
                                            <FormControl type="text" name="batch_number" value={item.batchNumber} style={{display:'none'}}/>
                                            <FormControl type="submit" value="导出批号下激活码" />
                                        </form>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination
                    page={page} size={size} total={total}
                    onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        );
    }
}
