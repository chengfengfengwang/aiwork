/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/7/3 下午7:05
 */

import React from "react";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import {Form, Table} from "react-bootstrap";
import ElementView from "./ElementView";
import ThePagination from "./Pagination";
import * as api from "../api";

export default class ScorePlays extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            plays: [],
            page: 0,
            size: 10,
            total: 0,
            phone: null
        }
    }

    onLoad() {
        const {location: {search}} = this.props;
        const {page, size, phone} = this.state;
        this.setState({loading: true});

        const params = new URLSearchParams(search.replace('?', ''));
        api.getScorePlays({page, size, phone, userId: params.get('userId'), courseId: params.get('courseId'), lessonId: params.get('lessonId')})
            .then(json => this.setState({loading: false, plays: json.data, total: json.paging.total}))
            .catch(error => this.setState({loading: false, error}));
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {loading, error, page, size, total, plays, phone} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

                <Form inline style={{marginBottom: 5}}>
                    <input ref="phone" type="text" value={phone} className="form-control input-sm"
                           placeholder="请输入手机号" onChange={e => this.setState({phone: e.target.value.trim()})}/>
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
                        <th>用户</th>
                        <th>曲谱</th>
                        <th>课件</th>
                        <th>最高成绩</th>
                        <th>历史成绩</th>
                        <th>弹奏次数</th>
                        <th>初次弹奏</th>
                        <th>上次弹奏</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        plays.map((play, index) => {
                            return (
                                <tr key={index}>
                                    <td>{play.user ? `${play.user.phone} ${play.user.nickname}` : 'NULL'}</td>
                                    <td>{play.musicScore ? play.musicScore.name : 'NULL'}</td>
                                    <td>{play.lesson ? play.lesson.name : 'NULL'}</td>
                                    <td>{`${play.scoreLevel}(${play.score})`}</td>
                                    <td>{play.scoreLevels.join(', ')}</td>
                                    <td>{play.playedCount}</td>
                                    <td><ElementView type='timestamp' value={play.firstPlayedAt}/></td>
                                    <td><ElementView type='timestamp' value={play.lastPlayedAt}/></td>
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
