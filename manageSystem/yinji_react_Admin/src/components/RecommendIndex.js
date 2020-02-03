/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/7/3 下午7:05
 */

import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import RecommendMain from "./RecommendMain";
import RecommendDetail from "./RecommendDetail";


export default class ControlledTabs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab"
        style={{marginTop: '10px'}}
      >
        <Tab eventKey={1} title="本周推荐">
          <RecommendMain/>
        </Tab>
        <Tab eventKey={2} title="推荐详细（推荐类型为合集的详情页面配置）">
          <RecommendDetail/>
        </Tab>
      </Tabs>
    );
  }
}