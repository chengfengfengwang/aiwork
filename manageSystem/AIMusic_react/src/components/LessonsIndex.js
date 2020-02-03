/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/8 上午11:40
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    Button,
    ControlLabel,
    Form,
    FormControl,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    Table
} from "react-bootstrap";
import * as api from "../api";
import ThePagination from "./Pagination";
import * as LessonsHelper from "../helpers/LessonsHelper";
import * as actions from "../actions/index";
import LessonDetail from "./LessonDetail";

const LessonViewDialog = props => <Modal.Dialog style={{display: props.isVisible ? 'block' : 'none'}}>
    <ModalHeader closeButton onHide={() => props.onClose()}>
        <ModalTitle>课件查看</ModalTitle>
        <ModalBody>
            { props.lesson ? <LessonDetail lesson={props.lesson}/> : 'No lesson' }
        </ModalBody>
    </ModalHeader>
</Modal.Dialog>;

export default class LessonsIndex extends Component {
    static contextTypes = {
        store: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            reviewStatus: 'reviewing',
            lessons: [],
            page: 0,
            total: 0,
            activeIndex: -1,
            inView: false
        };
        console.log('construct...')
    }

    loadLessons() {
        const {page, reviewStatus} = this.state;
        const {store: {dispatch}} = this.context;

        dispatch(actions.showWaiting());
        api.getLessons({page, reviewStatus, accepted: 'all'})
            .then(json => {
                dispatch(actions.hideWaiting());
                this.setState({
                    lessons: json.data,
                    total: json.paging.total,
                })
            })
            .catch(error => {
                dispatch(actions.hideWaiting());
                dispatch(actions.showError(error))
            })
    }

    reviewLesson({lessonId, accepted}) {
        const {store: {dispatch}} = this.context;

        dispatch(actions.showWaiting());
        api.reviewLesson({id: lessonId, accepted})
            .then(json => {
                dispatch(actions.hideWaiting());
                this.loadLessons();
            })
            .catch(error => {
                dispatch(actions.hideWaiting());
                dispatch(actions.showError(error))
            });
    }

    submitReview(lessonId) {
        const {store: {dispatch}} = this.context;

        dispatch(actions.showWaiting());
        api.submitLessonReview(lessonId)
            .then(() => {
                dispatch(actions.hideWaiting());
                this.loadLessons();
            })
            .catch(error => {
                dispatch(actions.hideWaiting());
                dispatch(actions.showError(error));
            })
    }

    componentDidMount() {
        this.loadLessons();
        console.log('didMount...')
    }

    render() {
        const {lessons, page, total, reviewStatus, activeIndex, inView} = this.state;
        const activeLesson = activeIndex >= 0 ? lessons[activeIndex] : null;
        return (
            <div className="LessonsIndex">
                <Form inline style={{padding: 3}}>
                    <ControlLabel>审核状态:</ControlLabel>
                    <FormControl
                        bsSize="sm"
                        componentClass="select"
                        value={reviewStatus}
                        onChange={e => this.setState({reviewStatus: e.target.value, page: 0}, () => this.loadLessons())}
                    >
                        <option value="none">无</option>
                        <option value="reviewing">审核中</option>
                        <option value="accepted">已通过</option>
                        <option value="rejected">未通过</option>
                    </FormControl>
                </Form>
                <LessonViewDialog
                    isVisible={inView}
                    lesson={activeLesson}
                    onClose={() => this.setState({inView: false})}
                />
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>名称</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        lessons.map((lesson, index) => {
                            return (
                                <tr key={index}>
                                    <td>{lesson.id}</td>
                                    <td>{lesson.name}</td>
                                    <td>{LessonsHelper.reviewStatus[lesson.reviewStatus]}</td>
                                    <td>
                                        <Button
                                            bsSize="xs"
                                            bsStyle="warning"
                                            onClick={() => this.setState({activeIndex: index, inView: true})}
                                        >查看</Button>
                                        <Button
                                            bsSize="xs"
                                            bsStyle="primary"
                                            onClick={() => this.submitReview(lesson.id)}
                                            className={lesson.reviewStatus === 'none' ? '' : 'hidden'}
                                        >提交审核</Button>
                                        <Button
                                            bsSize="xs"
                                            bsStyle="success"
                                            className={lesson.reviewStatus === 'reviewing' ? '' : 'hidden'}
                                            onClick={() => this.reviewLesson({
                                                lessonId: lesson.id,
                                                accepted: true
                                            })}
                                        >通过</Button>
                                        <Button
                                            bsSize="xs"
                                            bsStyle="danger"
                                            className={lesson.reviewStatus === 'reviewing' ? '' : 'hidden'}
                                            onClick={() => this.reviewLesson({
                                                lessonId: lesson.id,
                                                accepted: false
                                            })}
                                        >拒绝</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination
                    page={page} size={10} total={total}
                    onSelect={page => this.setState({page}, () => this.loadLessons())}/>
            </div>
        )
    }
}
