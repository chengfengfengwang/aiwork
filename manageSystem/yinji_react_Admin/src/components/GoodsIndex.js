import React, {Component} from "react";
import * as api from "../api";
import {
    Table,
    Thead,
    Tbody,
    Form,
    ControlLabel,
    FormGroup, Button, FormControl,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import ThePagination from "./Pagination";


export default class GoodsIndex extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            loading: false,
            error: null,
            instype: '',
            goods_data: [],
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        const {page, size, total, loading, error, instype} = this.state;

        this.setState({loading: true, error: null})
        api.getGoods(page, size, instype)
            .then(json => this.setState({
                loading: false,
                goods_data: json.data,
                page: json.paging.page,
                size: json.paging.size,
                total: json.paging.total
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {page, size, total, loading, error, goods_data, instype} = this.state;
        return (
            <div>
                <Form inline style={{padding: 3}}>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>乐器类型：</ControlLabel>
                        <FormControl componentClass="select" value={instype}
                                     onChange={e => this.setState({instype: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="0">吉他</option>
                            <option value="1">尤克里里</option>
                            <option value="3">卡林巴</option>
                        </FormControl>
                    </FormGroup>
                </Form>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>商品ID</th>
                        <th>商品名称</th>
                        <th>乐器类型</th>
                        <th>原始价格</th>
                        <th>是否上线</th>
                        <th>是否推荐</th>
                        <th>商品手机封面</th>
                        <th>商品Pad封面</th>
                        <th>开通课程</th>
                        <th>商品详细信息</th>
                        <th>权重</th>
                        <th>操作</th>
                    </tr>
                    </thead>

                    <tbody>
                    {goods_data.map((info, index) => {
                        return (
                            <tr key={index}>
                                <td>{info._id}</td>
                                <td width="150px">{info.name}</td>
                                <td>{(function (info) {
                                    switch (info.instrument_type) {
                                        case 0:
                                            return '音基';
                                            break;

                                        case 1:
                                            return '尤克里里';
                                            break;
                                    }
                                })(info)}</td>
                                <td>{info.old_price / 100}</td>
                                <td>{(function (info) {
                                    switch (info.online) {
                                        case true:
                                            return '已上线';
                                            break;

                                        case false:
                                            return '未上线';
                                            break;
                                    }
                                })(info)}</td>
                                <td>{
                                    (function (info) {
                                        switch (info.recommend) {
                                            case true:
                                                return '是';
                                                break;

                                            case false:
                                                return '否';
                                                break;
                                        }
                                    })(info)
                                }</td>
                                <td>
                                    <img width="180px" height="110px" src={info.cover[0]}></img>
                                </td>
                                <td>
                                    <img width="180px" height="110px" src={info.cover[1]}></img>
                                </td>
                                <td>{info.course_name_list.map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{info}</td>
                                        </tr>
                                    )
                                })}</td>
                                <td>{info.sku_list.map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{info.name}-->价格:{info.price / 100},库存:{info.stock}</td>
                                        </tr>
                                    )
                                })}</td>
                                <td>{info.weight}</td>
                                <td>
                                    <Link to={`/goods/?id=${info._id}`}>
                                        <Button bsSize="xs" bsStyle="info">查看</Button>
                                    </Link>
                                    <br/>
                                    <Link to={`/goods/edit/${info._id}`}>
                                        <Button bsSize="xs" bsStyle="warning" style={{marginTop: 2}}>编辑</Button>
                                    </Link>
                                    <br/>
                                    {/*/!*<Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}*!/*/}
                                    {/*/!*onClick={() => onDeleteCourse(id)}>删除</Button>*!/*/}
                                    {/*/!*<br/>*!/*/}
                                    <Link to={`/goods/delete/${info._id}`}>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}>删除</Button>
                                    </Link>
                                    {/*<Link to={`/goods/delete/${info._id}`}>*/}
                                    {/*<Button bsSize="xs" bsStyle="success" style={{marginTop: 2}}>删除</Button>*/}
                                    {/*</Link>*/}
                                </td>
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        )
    }
}