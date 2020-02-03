/**
 * Created by mac on 2017/10/23.
 */

import React from 'react';
import ElementEdit from './ElementEdit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormGroup, Form, Col, ControlLabel, Button} from 'react-bootstrap';
import * as LessonHelper from '../helpers/LessonsHelper';
import * as selectors from '../reducers/selectors';
import * as api from '../api';

@connect((state, props) => {
    // const {course_info} = state;
    // console.log('===================', course_info);
    const {currentCourse: course, activeType, activeLessonIndex, activeMaterialIndex, activeChordIndex}
        = selectors.coursesManagementSelector(state);
    const {match: {params: {id}}} = props;
    const lessonShareFields = LessonHelper.getEditableShareFields();
    return {id, lessonShareFields};
})
export default class CourseShare extends React.Component {
    static propTypes = {
        lessonShareFields: PropTypes.arrayOf(PropTypes.array).isRequired
    }

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            course_name: '',
            top_picture: '',
            text1: '',
            video: '',
            bottom_picture: '',
            text2: '',
            thumbnail: ''
        }
    }

    onLoad() {
        const {course_name, top_picture, text1, video, bottom_picture, text2, thumbnail} = this.state;
        const {id} = this.props;
        this.setState({loading: true, error: null});
        api.onShowCourseShare(id)
            .then(json => this.setState({
                loading: false,
                course_name: json.data.name,
                top_picture: json.data.top_picture,
                text1: json.data.text1,
                video: json.data.video,
                bottom_picture: json.data.bottom_picture,
                text2: json.data.text2,
                thumbnail: json.data.thumbnail
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    onSaveCourseShare(id, course_info) {
        this.setState({loading: true});
        api.onSaveCourseShare(id, course_info);
    }

    componentDidMount() {
        this.onLoad();
    }

    onChange(data) {
        const {key, value, index} = data
        this.setState({[key]: value})
    }

    render() {
        const {id, lessonShareFields} = this.props;
        const {course_name, top_picture, text1, video, bottom_picture, text2, thumbnail} = this.state;
        const tar_value = new Array(top_picture, text1, video, bottom_picture, text2, thumbnail);
        return (
            <div style={{marginTop: 10}}>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                           课程ID
                        </Col>
                        <Col sm={10}>
                            <ElementEdit value={id} disabled={true}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                           课程名称
                        </Col>
                        <Col sm={10}>
                            <ElementEdit value={course_name} disabled={true}
                            />
                        </Col>
                    </FormGroup>
                    {
                        lessonShareFields.map(([key, field], index) => {
                            const {title, type, disabled} = field;
                            return (
                                <FormGroup key={index}>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        {title}
                                    </Col>
                                    <Col sm={10}>
                                        <ElementEdit
                                            type={type} value={tar_value[index]}
                                            onValueChange={(value) => this.onChange({key, value, index})}/>
                                    </Col>
                                </FormGroup>
                            )
                        })
                    }
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" bsStyle="success" onClick={(e) => {
                                e.preventDefault();
                                this.onSaveCourseShare(id, {'top_picture': top_picture, 'text1': text1, 'video': video, 'text2': text2, 'bottom_picture':bottom_picture, 'thumbnail': thumbnail});
                            }}>
                                保存课程
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
