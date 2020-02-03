/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午9:42
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button, FormControl, Modal, FormGroup, InputGroup, Glyphicon,
    Col, Row
} from 'react-bootstrap'
import * as selectors from "../reducers/selectors";
import {connect} from "react-redux";
import * as actions from "../actions/index";
import {UsersTable} from "./UsersTable";
import * as UsersHelper from "../helpers/UsersHelper";
import UserDetail from "./UserDetail";
import ThePagination from "./Pagination";

@connect((state, props) => {
        const {isVisible, selectedIndex, users, page, size, keyword, isTeacher, total} = selectors.usersChooserSelector(state);
        const briefFields = UsersHelper.getViewableFields().filter(([key]) => ['id', 'nickname'].includes(key));
        const detailFields = UsersHelper.getViewableFields();
        return {isVisible, selectedIndex, users, page, size, keyword, isTeacher, total, briefFields, detailFields};
    },
    {
        onCancel: () => actions.hideUsersChooser(),
        onQueryUsers: ({page, size, keyword, isTeacher}) => actions.requestUsersChooserUsers(
            {page, size, keyword, isTeacher}),
        onSelect: (index) => actions.updateUsersChooserSelectedIndex(index)
    }
)
export default class UsersChooser extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        keyword: PropTypes.string,
        onOk: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        selectedIndex: PropTypes.number,
        users: PropTypes.arrayOf(PropTypes.object).isRequired,
        onQueryUsers: PropTypes.func.isRequired,
        briefFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        detailFields: PropTypes.arrayOf(PropTypes.array).isRequired
    };


    componentDidMount() {
        const {onQueryUsers, keyword, page, size, isTeacher} = this.props;
        onQueryUsers({page, size, keyword, isTeacher});
    }


    render() {
        const {page, size, total, keyword, isTeacher, onOk, onCancel, onSelect, selectedIndex, isVisible, onQueryUsers, users, briefFields, detailFields} = this.props;
        const user = users[selectedIndex];
        return (
            <Modal.Dialog className="large-dialog" style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>请选择用户</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="form-inline">
                        <FormGroup controlId="keyword" bsSize="small">
                            <InputGroup>
                                <FormControl
                                    type="text" placeholder="请输入关键字"
                                    value={keyword}
                                    onChange={(e) => onQueryUsers({
                                        page: 0,
                                        size,
                                        keyword: e.target.value.trim(),
                                        isTeacher
                                    })}/>
                                <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        &nbsp;
                        &nbsp;
                        <FormGroup controlId="isTeacher" bsSize="small">
                            <InputGroup>
                                <InputGroup.Addon>教师</InputGroup.Addon>
                                <FormControl
                                    componentClass="select"
                                    onChange={(e) => onQueryUsers({
                                        page: 0,
                                        size,
                                        keyword,
                                        isTeacher: e.target.value
                                    })}
                                >
                                    <option value={'all'}>全部</option>
                                    <option value={true}>是</option>
                                    <option value={false}>否</option>
                                </FormControl>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    {
                        users ?
                            <div>
                                <Row style={{paddingTop: 5}}>
                                    <Col sm={4}>
                                        <UsersTable
                                            users={users} fields={briefFields} activeIndex={selectedIndex}
                                            onSelect={(index) => onSelect(index)}
                                        />
                                    </Col>
                                    <Col sm={8}>
                                        {
                                            user ?
                                                <UserDetail user={user} fields={detailFields}/>
                                                :
                                                '未选中用户。'
                                        }
                                    </Col>
                                </Row>
                                <ThePagination
                                    page={page} size={size} total={total}
                                    onSelect={page => onQueryUsers({page, size, keyword, isTeacher})}
                                    style={{margin: 0}}
                                />
                            </div>
                            :
                            'loading...'
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={() => onOk(user)}
                        bsStyle="primary"
                        disabled={!user}
                    >确定</Button>
                    <Button onClick={() => {
                        onCancel()
                    }}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
