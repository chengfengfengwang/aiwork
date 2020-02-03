import React from "react";
import * as api from "../api";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import {Form, Table} from "react-bootstrap";
import ThePagination from "./Pagination";
import moment from "moment";
import {Link} from "react-router-dom";

export default class PicScore extends React.Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            scores: [],
            page: 0,
            size: 10,
            total: 0
        }
    }

    onLoad() {
        const {page, size} = this.state;
        this.setState({loading: true, error: null}) ;
        api.showUploadScore(page, size)
            .then(json => this.setState({
            loading: false,
            scores: json.data,
            total: json.paging.total
        }))
        .catch(error => this.setState({
            loading: false,
            error: error
        }))
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {page, size, total, loading, error, scores} = this.state;
        return (
            <div style={{marginTop: 5}}>
            <Waiting isVisible={loading}/>
            <Error2 error={error} onOk={() => this.setState({error: null})}/>

            <Table bordered hover striped condensed responsive>
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>封面</th>
                        <th>图一</th>
                        <th>图二</th>
                        <th>图三</th>
                        <th>图四</th>
                        <th>图五</th>
                    </tr>
                </thead>
                <tbody>
                {
                    scores.map((info, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {(() => {
                                        let query = [];
                                        if (info.id) {
                                            query.push(['id', info.id]);
                                        }
                                        return (
                                            <Link to={`score_upload?${query.map(x => x.join('=')).join('&')}`}>{info.title}</Link>
                                        );
                                    })()}
                                </td>
                                <td><img src={info.cover_url} width='200px'/></td>
                                <td><a href={info.score_url[0]}><img src={info.score_url[0]} width='100px'/></a></td>
                                <td><a href={info.score_url[1]}><img src={info.score_url[1]} width='100px'/></a></td>
                                <td><a href={info.score_url[2]}><img src={info.score_url[2]} width='100px'/></a></td>
                                <td><a href={info.score_url[3]}><img src={info.score_url[3]} width='100px'/></a></td>
                                <td><a href={info.score_url[4]}><img src={info.score_url[4]} width='100px'/></a></td>
                            </tr>
                        )
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