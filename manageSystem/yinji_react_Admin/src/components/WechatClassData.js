import React from "react";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import * as api from "../api";
import {Table} from "react-bootstrap";

export default class WechatClassData extends React.Component {
    constructor(props){
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            page: 0,
            size: 10,
            total: 0,
            classData:{}
        }
    }

    onLoad() {
       const {location: {search}} = this.props;
       const {page, size} = this.state;
       const params = new URLSearchParams(search.replace('?', ''));
       this.setState({loading: true, error: null});
       api.getWechatClassData({page,size,class_id:params.get('class_id')})
           .then(json => this.setState({
               loading:false,
               classData: json,
               data:json,
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
        const {loading, error, classData, class_id} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={()=> this.setState({error:null})}/>
                <Table bordered hover striped condensed responsive>
                    <thead>
                        <tr>
                            <th>班级id</th>
                            {/*<th>班级名称</th>*/}
                            <th>班级每天加班人数</th>
                            <th>班级初级毕业人数</th>
                            <th>中级毕业人数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{class_id}</td>
                            <td>{classData.class_name}</td>
                            <td>{classData.day_jcount}</td>
                            <td>{classData.day_graduate_count}</td>
                        </tr>
                    </tbody>
                </Table>

            </div>
        )
    }
}