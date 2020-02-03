import React, { Component } from "react";
import ReactDOM from 'react-dom';
import * as api from "../api";
import {
  Modal,
  Button,
  Table,
  ControlLabel,
  FormGroup,
  FormControl
} from "react-bootstrap";
import ThePagination from "./Pagination";
export default class MenuActivity extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    var date = new Date();
    this.state = {
      modalShow: false,
      date: new Date(),
      startDate: new Date(),
      curItem: 'banner',
      curStatus: '',
      allInstrument: 0,

      bannerList: [],
      bannerLink: '',
      bannerType: 0,
      //bannerLinkParam:'',
      bannerDescribe: '',
      bannerBeginDate: '',
      bannerEndDate: '',
      bannerInstrument: 0,

      broadcastList: [],
      broadcastTitle: '',
      broadcastContent: '',
      broadcastBeginDate: '',
      broadcastEndDate: '',
      broadcastInstrument: 0,

      wWList: [],
      wWpage: 0,
      wWsize: 10,
      wWtotal: 0,
      linkTypeList:[
        {
          name: 'h5',
          value: 0
        },
        {
          name: '课内页面',
          value: 1
        },
        {
          name: 'app站内页面',
          value: 2
        },
      ],
      instrumentList: [
        {
          name: '吉他',
          value: 0
        },
        {
          name: '尤克里里',
          value: 1
        },
        {
          name: '卡林巴',
          value: 2
        },
        {
          name: '非洲鼓',
          value: 3
        },
        {
          name: '钢琴',
          value: 4
        },
        {
          name: '音基',
          value: 5
        },
        {
          name: '口琴',
          value: 6
        }
      ],
      baseUrl:'http://iguitar.immusician.com:2525'
    };
  }
  componentDidMount() {
    this.getTableList();
    this.getWishWallList()
  }
  getWishWallList() {
    api.request('get', `${this.state.baseUrl}/v3/exhibition/?instrument=${this.state.allInstrument}&page=${this.state.wWpage}&size=10`)
      .then(res => {
        this.setState({
          wWList: res.data,
          wWtotal: res.paging.total
        })
      })
  }
  getTableList() {
    // this.setState({
    //   bannerList: [
    //     {
    //       add_time: 1564371181,
    //       img_url: 'http://qwe'
    //     },
    //   ]
    // })
    // return
    api.request('get', `${this.state.baseUrl}/v3/exhibition/show_banner_radio/?app=2&state=2&instrument=${this.state.allInstrument}`)
      .then(res => {
        if (res.data.banner_list && res.data.banner_list.length > 0) {
          var bannerList = res.data.banner_list
        } else {
          var bannerList = []
        }
        if (res.data.radio_list && res.data.radio_list.length > 0) {
          var broadcastList = res.data.radio_list
        } else {
          var broadcastList = []
        }
        this.setState({
          bannerList: bannerList,
          broadcastList: broadcastList
        })
      })
  }
  //提交表单
  submit() {
    const curItem = this.state.curItem;
    if (curItem === 'banner') {
      var paramObj = {
        phone_img_file: ReactDOM.findDOMNode(this.refs.bannerMImgRef).files[0],
        tablet_img_file: ReactDOM.findDOMNode(this.refs.bannerPImgRef).files[0],
        introduced: this.state.bannerDescribe,
        type: Number(this.state.bannerType),
        start_time: new Date(this.state.bannerBeginDate).valueOf() / 1000,
        end_time: new Date(this.state.bannerEndDate).valueOf() / 1000,
        banner_jump_url: this.state.bannerLink,
        //banner_jump_url_param: this.state.bannerLinkParam.split(','),
        instrument: Number(this.state.bannerInstrument)
      }
      var formdata = new FormData();
      for (var key in paramObj) {
        formdata.append(key, paramObj[key]);
      }
      console.log(paramObj)
      console.log(formdata)
      //return
      if (this.state.curStatus === 'update') {
        var url = `${this.state.baseUrl}/v3/exhibition/update_banner/`
      } else {
        var url = `${this.state.baseUrl}/v3/exhibition/add_banner/`
      }
      api.request('post', url, {}, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          this.setState({ modalShow: false});
          this.getTableList()
        })
    } else if (curItem === 'broadcast') {
      var paramObj = {
        title: this.state.broadcastTitle,
        content: this.state.broadcastContent,
        start_time: new Date(this.state.broadcastBeginDate).valueOf() / 1000,
        end_time: new Date(this.state.broadcastEndDate).valueOf() / 1000,
        instrument: Number(this.state.broadcastInstrument)
      }
      console.log(paramObj)
      //return
      if (this.state.curStatus === 'update') {
        var url = `${this.state.baseUrl}/v3/exhibition/update_radio/`
      } else {
        var url = `${this.state.baseUrl}/v3/exhibition/add_radio/`
      }
      api.request('post', url, {}, paramObj)
        .then(res => {
          this.setState({ modalShow: false});
          this.getTableList()
        })
    }
  }
  handleModalClose() {
    this.setState({ modalShow: false });
  }
  changeStatus(item, row) {
    if (item === 'banner') {
      var url = `${this.state.baseUrl}/v3/exhibition/update_banner/?banner_id=${row._id.$oid}&state=${row.state === 1 ? -1 : 1}`
    } else if (item === 'broadcast') {
      var url = `${this.state.baseUrl}/v3/exhibition/update_radio/?radio_id=${row._id.$oid}&state=${row.state === 1 ? -1 : 1}`
    }
    api.request('get', url)
      .then(res => {
        this.getTableList()
      })
  }
  handleAdd(item) {
    this.setState({ modalShow: true, curItem: item });
    if (item === 'banner') {
      this.setState({
        bannerLink: '',
        //bannerLinkParam:'',
        bannerDescribe: '',
        bannerType:0,
        bannerBeginDate: '',
        bannerEndDate: '',
        bannerInstrument: 0,
      })
    } else if (item === 'broadcast') {
      this.setState({
        broadcastTitle: '',
        broadcastContent: '',
        broadcastBeginDate: '',
        broadcastEndDate: '',
        broadcastInstrument: 0
      })
    }
  }
  //更新操作
  onUpdateItem(item, row) {
    console.log(item, row)
    this.setState({ modalShow: true, curItem: item, curStatus: 'update' });
    if (item === 'banner') {
      this.setState({
        bannerLink: row.banner_jump_url,
        //bannerLinkParam: row.banner_jump_url_param,
        bannerDescribe: row.describe,
        bannerType: row.type,
        bannerBeginDate: this.formatTime(row.start_time),
        bannerEndDate: this.formatTime(row.end_time),
        bannerInstrument: row.instrument,
      })
    } else if (item === 'broadcast') {
      this.setState({
        broadcastTitle: row.title,
        broadcastContent: row.content,
        broadcastBeginDate: this.formatTime(row.start_time),
        broadcastEndDate: this.formatTime(row.end_time),
        broadcastInstrument: row.instrument
      })
    }
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  //删除操作
  onDelItem(item, row) {
    if (confirm("你确定删除吗？")) {
      if (item === 'banner') {
        api.request('get', `${this.state.baseUrl}/v3/exhibition/del_banner/?banner_id=${row._id.$oid}`)
          .then(res => {
            this.getTableList()
          })
      } else if (item === 'broadcast') {
        api.request('get', `${this.state.baseUrl}/v3/exhibition/del_radio/?radio_id=${row._id.$oid}`)
          .then(res => {
            this.getTableList()
          })
      } else if (item === 'wishWall') {
        api.request('get', `${this.state.baseUrl}/v3/exhibition/del_wish_wall/?wish_id=${row._id.$oid}`)
          .then(res => {
            this.getWishWallList()
          })
      }
      //
    }
  }

  allInstrumentChange() {
    this.getTableList()
    this.getWishWallList()
  }
  formatTime(date) {
    function formatNumber(n) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }
    var date = date * 1000; //项目返回的是秒级的时间戳
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-');
    //return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
  }
  onUpdateWish(row) {
    api.request('get', `${this.state.baseUrl}/v3/exhibition/complete_wish/?wish_id=${row._id.$oid}`)
      .then(res => {
        alert('更新成功');
        this.getWishWallList()
      })
  }
  findInstrumentName(value) {
    var name = '';
    var instrumentList = this.state.instrumentList;
    for(var i=0;i<instrumentList.length;i++){
      if(value==instrumentList[i].value){
        name = instrumentList[i].name
      }
    }
    return name
    // this.state.instrumentList.forEach((e)=>{
    //   return e.value==value ? e.name : ''
    // })
  }
  onChange = date => this.setState({ date })
  render() {
    const curItem = this.state.curItem;
    let formItems;
    if (curItem === 'banner') {
      formItems =
        <form>
          <FormGroup
            controlId="item1"
          >
            <ControlLabel>跳转链接</ControlLabel>
            <FormControl
              type="text"
              value={this.state.bannerLink}
              placeholder="输入跳转链接"
              onChange={e => this.setState({ bannerLink: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup>
          {/* <FormGroup
            controlId="item2"
          >
            <ControlLabel>额外参数</ControlLabel>
            <FormControl
              type="text"
              value={this.state.bannerLinkParam}
              placeholder="输入跳转链接额外参数"
              onChange={e => this.setState({ bannerLinkParam: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup> */}
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>跳转类型</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.bannerType} onChange={e => this.setState({ bannerType: e.target.value })}>
            {this.state.linkTypeList.map((e,index) => {
              return (
                <option key={index} value={e.value}>{e.name}</option>
              )
            })}
            </FormControl>
          </FormGroup>
          <FormGroup
            controlId="item3"
          >
            <ControlLabel>备注</ControlLabel>
            <FormControl
              type="text"
              value={this.state.bannerDescribe}
              placeholder="输入备注"
              onChange={e => this.setState({ bannerDescribe: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>乐器类型</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.bannerInstrument} onChange={e => this.setState({ bannerInstrument: e.target.value })}>
            {this.state.instrumentList.map((e,index) => {
              return (
                <option key={index} value={e.value}>{e.name}</option>
              )
            })}
            </FormControl>
          </FormGroup>
          <div>
            <p>上传手机图片</p>
            <input type="file" ref='bannerMImgRef'></input>
          </div>
          <div>
            <p>上传pad图片</p>
            <input type="file" ref='bannerPImgRef'></input>
          </div>
          <div>
            <p>开始时间</p>
            <input type="date" value={this.state.bannerBeginDate} onChange={e => this.setState({ bannerBeginDate: e.target.value })} ref='bannerBeginDate'></input>
          </div>
          <div>
            <p>结束时间</p>
            <input type="date" value={this.state.bannerEndDate} onChange={e => this.setState({ bannerEndDate: e.target.value })} ref='bannerBeginDate'></input>
          </div>
        </form>
    } else if (curItem === 'broadcast') {
      formItems =
        <form>
          <FormGroup
            controlId="item1"
          >
            <ControlLabel>标题</ControlLabel>
            <FormControl
              type="text"
              value={this.state.broadcastTitle}
              placeholder="输入标题"
              onChange={e => this.setState({ broadcastTitle: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="item2"
          >
            <ControlLabel>内容</ControlLabel>
            <FormControl
              type="text"
              value={this.state.broadcastContent}
              placeholder="输入内容"
              onChange={e => this.setState({ broadcastContent: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup>
          <div>
            <p>开始时间</p>
            <input type="date" value={this.state.broadcastBeginDate} onChange={e => this.setState({ broadcastBeginDate: e.target.value })} ref='bannerBeginDate'></input>
          </div>
          <div>
            <p>结束时间</p>
            <input type="date" value={this.state.broadcastEndDate} onChange={e => this.setState({ broadcastEndDate: e.target.value })} ref='bannerBeginDate'></input>
          </div>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.broadcastInstrument} onChange={e => this.setState({ broadcastInstrument: e.target.value })}>
            {this.state.instrumentList.map((e,index) => {
              return (
                <option key={index} value={e.value}>{e.name}</option>
              )
            })}
            </FormControl>
          </FormGroup>
        </form>
    } else if (curItem === 'wishWall') {

    }
    return (
      <div>
        <div style={{ 'marginTop': '20px' }}>
          <span>数据筛选类型：</span>
          <FormControl style={{ display: 'inline-block', width: '200px' }} componentClass="select" placeholder="select" value={this.state.allInstrument} onChange={e => { this.setState({ allInstrument: e.target.value }, this.allInstrumentChange) }}>
            {this.state.instrumentList.map((e,index) => {
              return (
                <option key={index} value={e.value}>{e.name}</option>
              )
            })}
          </FormControl>
        </div>

        {/* banner */}
        <section>
          <div>
            <Button style={{ float: 'left' }} bsStyle="primary" onClick={this.handleAdd.bind(this, 'banner')}>新增banner</Button>
            <h2 style={{ textAlign: 'center', marginRight: '3em' }}>banner列表</h2>
          </div>
          <Table bordered hover striped condensed responsive>
            <thead>
              <tr>
                <th>添加时间</th>
                <th>结束时间</th>
                <th>手机图片</th>
                <th>pad图片</th>
                <th>链接</th>
                {/* <th>时间设置</th> */}
                <th>备注</th>
                <th>乐器类型</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bannerList.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{this.formatTime(info.start_time)}</td>
                    <td>{this.formatTime(info.end_time)}</td>
                    <td><img src={info.phone_img_url} width='100px' /></td>
                    <td><img src={info.tablet_img_url} width='100px' /></td>
                    <td>{info.banner_jump_url}</td>
                    <td>{info.describe}</td>
                    <td>{this.findInstrumentName(info.instrument)}</td>
                    <td>
                      {/* <Button bsSize="sm" onClick={() => this.onUpdateItem('banner', info)}>编辑</Button> */}
                      <Button bsSize="sm" onClick={() => this.changeStatus('banner', info)}>{info.state === -1 ? '上线' : '下线'}</Button>
                      <Button bsSize="sm" onClick={() => this.onDelItem('banner', info)}>删除</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </section>
        {/* 广播 */}
        <section>
          <div>
            <Button style={{ float: 'left' }} bsStyle="primary" onClick={this.handleAdd.bind(this, 'broadcast')}>新增广播</Button>
            <h2 style={{ textAlign: 'center', marginRight: '3em' }}>广播列表</h2>
          </div>
          <Table bordered hover striped condensed responsive>
            <thead>
              <tr>
                <th>标题</th>
                <th>内容</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>乐器类型</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.state.broadcastList.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{info.title}</td>
                    <td>{info.content}</td>
                    <td>{this.formatTime(info.start_time)}</td>
                    <td>{this.formatTime(info.end_time)}</td>
                    <td>{this.findInstrumentName(info.instrument)}</td>
                    <td>
                      {/* <Button bsSize="sm" onClick={() => this.onUpdateItem('broadcast', info)}>编辑</Button> */}
                      <Button bsSize="sm" onClick={() => this.changeStatus('broadcast', info)}>{info.state === -1 ? '上线' : '下线'}</Button>
                      <Button bsSize="sm" onClick={() => this.onDelItem('broadcast', info)}>删除</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </section>
        {/* 心愿墙 */}
        <section>
          <h2 style={{ textAlign: 'center' }}>心愿墙列表</h2>
          <Table bordered hover striped condensed responsive>
            <thead>
              <tr>
                <th>乐器分类</th>
                <th>类型</th>
                <th>名称</th>
                <th>歌手/乐队</th>
                <th>用户账户</th>
                <th>用户昵称</th>
                <th>发布时间</th>
                <th>排名</th>
                <th>点赞数量</th>
                <th>是否已更新</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.state.wWList.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{this.findInstrumentName(info.instrument)}</td>
                    <td>{info.wish_type==1?'曲谱':'课程'}</td>
                    <td>{info.wish_name}</td>
                    <td>{info.wish_singer}</td>
                    <td>{info.user_id}</td>
                    <td>{info.user_name}</td>
                    <td>{this.formatTime(info.add_time)}</td>
                    <td>{info.rank}</td>
                    <td>{info.support_number}</td>
                    <td>{info.is_publish=='-1'?'否':'是'}</td>
                    <td>
                      <Button bsSize="sm" onClick={() => this.onDelItem('wishWall', info)}>删除</Button>
                      <Button bsSize="sm" onClick={() => this.onUpdateWish(info)}>更新</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <ThePagination page={this.state.wWpage} size={this.state.wWsize} total={this.state.wWtotal}
            onSelect={page => this.setState({ wWpage: page }, this.getWishWallList)} />
        </section>
        <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formItems}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>Close</Button>
            <Button onClick={this.submit}>提交</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

//export default App; MenuActivity
