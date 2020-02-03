/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/8 下午6:12
 */

import React, {Component} from "react";
import Waiting from "./Waiting";
import Error from "./Error2";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Button, ControlLabel, Form, FormControl, Modal, Table} from "react-bootstrap";
import * as moment from "moment";

export default class LogsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            page: 0,
            total: 0,
            activeIndex: -1,
            inView: false,
            keyword: '',
            level: 'all',
            clear_level: 'DEBUG',
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {
        this.loadLogs();
    }

    loadLogs() {
        const {page, level, keyword} = this.state;
        this.setState({isLoading: true, error: null});
        api.getLogs({page, level, keyword})
            .then(json => this.setState({isLoading: false, logs: json.data, total: json.paging.total}))
            .catch(error => this.setState({isLoading: false, error}));
    }

    clearLogs() {
        const {clear_level} = this.state;
        this.setState({isLoading: true, error: null});
        api.clearLogs(clear_level)
            .then(json => this.setState({isLoading: false}))
            .catch(error => this.setState({isLoading: false, error}));
    }

    render() {
        const {logs, page, total, activeIndex, inView, keyword, level, clear_level, isLoading, error} = this.state;
        const activeLog = activeIndex >= 0 ? logs[activeIndex] : null;
        return (
            <div>
                <Waiting isVisible={isLoading}/>
                <Error error={error} onOk={() => this.setState({error: null})}/>
                <Form inline style={{padding: 3}}>
                    <ControlLabel>级别:</ControlLabel>
                    &nbsp;
                    <FormControl
                        bsSize="sm" componentClass="select" value={level}
                        onChange={e => this.setState({level: e.target.value, page: 0}, () => this.loadLogs())}
                    >
                        <option value="all">全部</option>
                        <option value="ERROR">error</option>
                        <option value="WARNING">warning</option>
                        <option value="INFO">info</option>
                        <option value="DEBUG">debug</option>
                    </FormControl>
                    &nbsp; &nbsp;
                    <ControlLabel>关键字:</ControlLabel>
                    &nbsp;
                    <FormControl bsSize="sm" value={keyword} onChange={e => this.setState({
                        page: 0,
                        keyword: e.target.value.trim()
                    }, () => this.loadLogs())}/>
        &nbsp; &nbsp;
        <FormControl
        bsSize="sm" componentClass="select" value={clear_level}
        onChange={e => this.setState({clear_level: e.target.value})}
    >
            <option value="INFO">info</option>
            <option value="DEBUG">debug</option>
            </FormControl>
            &nbsp; &nbsp;
            <Button type="submit" bsStyle="success" onClick={(e) => {
                            e.preventDefault();
                            this.clearLogs();
                            this.loadLogs();
                        }}>
                            清除
                        </Button>
                            </Form>

                <Modal.Dialog
                    style={{display: inView ? 'block' : 'none'}}
                >
                    <Modal.Header
                        closeButton
                        onHide={() => this.setState({inView: false})}>
                        <Modal.Title>日志详情</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            activeLog ?
                                <Table bordered hover striped condensed responsive>
                                    <tbody>
                                    <tr>
                                        <td>级别</td>
                                        <td>{activeLog.level}</td>
                                    </tr>
                                    <tr>
                                        <td>名称</td>
                                        <td>{activeLog.loggerName}</td>
                                    </tr>
                                    <tr>
                                        <td>内容</td>
                                        <td>
                                            {activeLog.message}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>时间</td>
                                        <td>{moment.unix(activeLog.timestamp).locale('zh_CN').format('LLLLss秒')}</td>
                                    </tr>
                                    <tr>
                                        <td>文件名</td>
                                        <td>
                                            {activeLog.fileName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>行号</td>
                                        <td>
                                            {activeLog.lineNumber}
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table> : null
                        }
                    </Modal.Body>
                </Modal.Dialog>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>级别</th>
                        <th>名称</th>
                        <th>内容</th>
                        <th>时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        logs.map((log, index) => {
                            return (
                                <tr key={index}>
                                    <td>{log.level}</td>
                                    <td>{log.loggerName}</td>
                                    <td>{log.message.substring(0, 100)}</td>
                                    <td>{moment.unix(log.timestamp).locale('zh_CN').format('LLLLss秒')}</td>
                                    <td>
                                        <Button
                                            bsSize="xs"
                                            bsStyle="primary"
                                            onClick={() => this.setState({
                                                inView: true,
                                                activeIndex: index
                                            })}>查看</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                <ThePagination
                    page={page} size={10} total={total}
                    onSelect={page => this.setState({page}, () => this.loadLogs())}
                    onPageChange={page => this.setState({page}, () => this.loadLogs())}
                />
            </div>
        )
    }
}
