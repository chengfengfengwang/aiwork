import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import ActiveTemplate from "./ActiveTemplate";
import ActiveCode from "./ActiveCode";
import ActiveCodeStats from "./ActiveCodeStats";


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
        <Tab eventKey={1} title="体验课激活码统计">
          <ActiveCodeStats/>
        </Tab>
        <Tab eventKey={2} title="激活码模板配置">
          <ActiveTemplate/>
        </Tab>
        <Tab eventKey={3} title="激活码列表">
          <ActiveCode/>
        </Tab>
      </Tabs>
    );
  }
}