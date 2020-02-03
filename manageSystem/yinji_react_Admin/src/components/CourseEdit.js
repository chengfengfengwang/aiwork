/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/31 下午4:20
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormGroup, Glyphicon, Row, Table} from "react-bootstrap";
import ElementEdit from "./ElementEdit";
import * as CoursesHelper from "../helpers/CoursesHelper";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";
import {arrayMove, SortableContainer, SortableElement} from "react-sortable-hoc";
import * as LessonsHelper from "../helpers/LessonsHelper";
import * as MaterialsHelper from "../helpers/MaterialsHelper";
import ChordGraph from "./ChordGraph";

@connect((state, props) => {
    const {currentCourse: course, activeType, activeLessonIndex, activeMaterialIndex, activeChordIndex, activeChoiceIndex}
        = selectors.coursesManagementSelector(state);
    const {match: {params: {id}}} = props;
    const fields = course ? CoursesHelper.getEditableFields({type: course.type}) : null;
    const lessonFields = LessonsHelper.getEditableFields();
    const lessonShareFields = LessonsHelper.getEditableShareFields();
    const materialFields = activeType === 'material' ? MaterialsHelper.getEditableFields({
        type: course.lessons[activeLessonIndex].materials[activeMaterialIndex].type,
        includeAssignment: true
    }) : [];

    if (activeType === 'material'&& course.lessons[activeLessonIndex].materials[activeMaterialIndex].type ==='choiceGroup'){
        var choiceTypeFields = []
        if (course.lessons[activeLessonIndex].materials[activeMaterialIndex].question.length == 0){
           choiceTypeFields =  MaterialsHelper.getEditableFields({type:4, includeAssignment: true});
        }else{
            choiceTypeFields = MaterialsHelper.getEditableFields({type: parseInt(course.lessons[activeLessonIndex].materials[activeMaterialIndex].question[activeChoiceIndex].answerType) ,includeAssignment: true})
            // if(course.lessons[activeLessonIndex].materials[activeMaterialIndex].question[activeChoiceIndex].choiceType in [2,3,4,5]){
            //     choiceTypeFields.push(MaterialsHelper.getEditableFields({type: 'title_url'}))
            // }
        }
    }

    return {
        id: parseInt(id, 10),
        fields,
        lessonFields,
        lessonShareFields,
        course,
        activeType,
        activeLessonIndex,

        activeMaterialIndex,
        activeChordIndex,
        activeChoiceIndex,
        materialFields,
        // choiceFields,
        choiceTypeFields,
    };
}, {
    onLoad: (id) => actions.requestCourse(id),
    onUpdateCourse: (course) => actions.updateCourse(course),
    onUpdateSelectedLesson: (lesson) => actions.updateSelectedLesson(lesson),
    onUpdateSelectedMaterial: (material) => actions.updateSelectedMaterial(material),
    onUpdateSelectedChord: (chord) => actions.updateSelectedChord(chord),
    onUpdateSelectedChoice: (choice) => actions.updateSelectedChoice(choice),
    onRequestUpdateCourse: (course) => actions.requestUpdateCourse(course),
    onRequestUpdateSelectedLesson: (lesson) => actions.requestUpdateSelectedLesson(lesson),
    onRequestUpdateSelectedMaterial: (material) => actions.requestUpdateSelectedMaterial(material),
    onRequestUpdateSelectedChord: (chord) => actions.requestUpdateSelectedChord(chord),
    onRequestUpdateSelectedChoice: (choice) => actions.requestUpdateSelectedChoice(choice),
    onSelectCourse: () => actions.selectCourse(),
    onSelectLesson: (index) => actions.selectLesson(index),
    onSelectMaterial: (index) => actions.selectMaterial(index),
    onSelectChord: (index) => actions.selectChord(index),
    onSelectChoice: (index) => actions.selectChoice(index),
    onAddLesson: (lesson) => actions.requestAddLesson(lesson),
    onRemoveLesson: (id) => actions.requestRemoveLesson(id),
    onChooseMaterial: () => actions.chooseMaterial(),
    onUnbindMaterial: (assignmentId) => actions.unbindMaterial(assignmentId),
    onChooseChord: () => actions.chooseChord(),
    onChooseChoice: () => actions.chooseChoice(),
    onUnbindChord: (index) => actions.unbindChord(index),
    onUnbindChoice: (index) => actions.unbindChoice(index),
    onSortLessons: (lessons) => actions.requestSortLessons(lessons),
    onSortMaterials: (materials) => actions.requestSortMaterials(materials),
})
export default class CourseEdit extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        lessonFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        lessonShareFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        materialFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        // choiceFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        choiceTypeFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        onLoad: PropTypes.func.isRequired,
        course: PropTypes.object,
        onUpdateCourse: PropTypes.func.isRequired,
        onUpdateSelectedLesson: PropTypes.func.isRequired,
        onUpdateSelectedMaterial: PropTypes.func.isRequired,
        onUpdateSelectedChord: PropTypes.func.isRequired,
        onUpdateSelectedChoice: PropTypes.func.isRequired,
        onRequestUpdateCourse: PropTypes.func.isRequired,
        onRequestUpdateSelectedLesson: PropTypes.func.isRequired,
        onRequestUpdateSelectedMaterial: PropTypes.func.isRequired,
        onRequestUpdateSelectedChord: PropTypes.func.isRequired,
        onRequestUpdateSelectedChoice: PropTypes.func.isRequired,
        activeType: PropTypes.string.isRequired,
        activeLessonIndex: PropTypes.number.isRequired,
        activeMaterialIndex: PropTypes.number.isRequired,
        activeChordIndex: PropTypes.number.isRequired,
        activeChoiceIndex: PropTypes.number.isRequired,
        onSelectCourse: PropTypes.func.isRequired,
        onSelectLesson: PropTypes.func.isRequired,
        onSelectMaterial: PropTypes.func.isRequired,
        onSelectChord: PropTypes.func.isRequired,
        onSelectChoice: PropTypes.func.isRequired,
        onAddLesson: PropTypes.func.isRequired,
        onRemoveLesson: PropTypes.func.isRequired,
        onChooseChord: PropTypes.func.isRequired,
        onChooseChoice: PropTypes.func.isRequired,
        onUnbindChord: PropTypes.func.isRequired,
        onUnbindChoice: PropTypes.func.isRequired,
        onChooseMaterial: PropTypes.func.isRequired,
        onUnbindMaterial: PropTypes.func.isRequired,
        onSortLessons: PropTypes.func.isRequired,
        onSortMaterials: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const {onLoad, id, onUpdateCourse} = this.props;
        if (id) {
            onLoad(id);
        } else {
            onUpdateCourse(CoursesHelper.getDefaultCourse('video'));
        }
    }

    onChange({key, value}) {
        let {course, onUpdateCourse} = this.props;
        course[key] = value;
        onUpdateCourse(course);
    }

    onLessonChange({key, value}) {
        let {course, activeLessonIndex, onUpdateSelectedLesson} = this.props;
        let lesson = course.lessons[activeLessonIndex];
        console.log('----收到子组件值的变化----')
        if(key === 'pieceVUrls'){
            console.log('value----')
            console.log(value)
            console.log('value----')
            let pieceVUrlValue =  JSON.parse(value.split(';')[0]);
            let videoUrlValue =  value.split(';')[1];
            lesson.pieceVUrls = pieceVUrlValue;
            lesson.videoUrl = videoUrlValue;
        }else{
            lesson[key] = value;
        }
        console.log(lesson)
        onUpdateSelectedLesson(lesson);
    }

    onMaterialChange({key, value}) {
        let {course, activeLessonIndex, activeMaterialIndex, onUpdateSelectedMaterial} = this.props;
        let material = course.lessons[activeLessonIndex].materials[activeMaterialIndex];
        material[key] = value;
        onUpdateSelectedMaterial(material);
    }

    onChoiceChange({key, value}){
        let {course, activeLessonIndex, activeMaterialIndex, activeChoiceIndex, onUpdateSelectedChoice} = this.props;
        let material = course.lessons[activeLessonIndex].materials[activeMaterialIndex];
        material.question[activeChoiceIndex][key] = value;
        onUpdateSelectedChoice(material.question[activeChoiceIndex]);
    }

    render() {
        const {
            fields, lessonFields, lessonShareFields, materialFields,choiceTypeFields, course, activeType, activeLessonIndex, activeMaterialIndex, activeChordIndex, activeChoiceIndex,
            onRequestUpdateCourse, onRequestCreateCourse, onUnbindMaterial, onRequestUpdateSelectedLesson, onRequestUpdateSelectedMaterial,
            onAddLesson, onRemoveLesson, onSelectCourse, onSelectLesson, onSelectMaterial, onSelectChord, onSelectChoice, onChooseMaterial,
            onChooseChord, onChooseChoice, onUnbindChord, onUnbindChoice, onUpdateSelectedChord,onUpdateSelectedChoice, onRequestUpdateSelectedChord, onRequestUpdateSelectedChoice, onSortLessons, onSortMaterials
        } = this.props;

        if (!(course && course.lessons)) {
            return null
        }

        const activeLesson = course.lessons[activeLessonIndex];
        const activeMaterial = activeType === 'material' ? activeLesson.materials[activeMaterialIndex] : null;
        const activeChord = (activeMaterial && activeMaterial.type === 'chordGroup') ? activeMaterial.chords[activeChordIndex] : null;
        const activeNewChord = (activeMaterial && activeMaterial.type === 'newChordGroup') ? activeMaterial.chords[activeChordIndex] : null;
        const activeChoice = (activeMaterial && activeMaterial.type === 'choiceGroup') ? activeMaterial.question[activeChoiceIndex] : null;
        return (
            <div>
                <Table bordered condensed style={{margin: 0}}>
                    <tbody>
                    <tr>
                        {
                            Object.entries({
                                id: 'ID',
                                name: '名称',
                                price: '价格',
                                studiedCount: '学习人数',
                                completedCount: '通关人数'
                            }).map(([key, title], index) => {
                                return (
                                    <td key={index}>
                                        <strong>{title}：</strong>
                                        <span>{course[key]}</span>
                                    </td>
                                )
                            })
                        }
                        <td style={{textAlign: 'center'}}>
                            <Button bsSize="sm" bsStyle="warning" onClick={onSelectCourse}>编辑课程信息</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col sm={3}>
                        <div>
                            <h5 className="label-info" style={{padding: 3}}>
                                <span > 课件列表</span>
                                <span>&nbsp;</span>
                                <Button
                                    bsSize="xsmall"
                                    onClick={() => onAddLesson({name: '未命名', courseId: course.id})}
                                    style={{borderRadius: 0}}
                                >
                                    <Glyphicon glyph="plus"/>
                                </Button>
                                <span>&nbsp;</span>
                                <Button
                                    bsSize="xsmall"
                                    style={{borderRadius: 0}}
                                    onClick={() => activeLessonIndex >= 0 ?
                                        onRemoveLesson(course.lessons[activeLessonIndex].id) : null}>
                                    <Glyphicon glyph="minus"/>
                                </Button>
                            </h5>
                            <LessonList
                                lessons={course.lessons}
                                activeIndex={activeLessonIndex}
                                onSortEnd={({oldIndex, newIndex}) => oldIndex === newIndex ?
                                    onSelectLesson(newIndex) :
                                    onSortLessons(arrayMove(course.lessons, oldIndex, newIndex))}
                            />
                            {
                                activeType === 'course' ? null :
                                    <div>
                                        <h5 className="label-info" style={{padding: 3}}>
                                            <span > 素材列表</span>
                                            <span>&nbsp;</span>
                                            <Button
                                                bsSize="xsmall"
                                                onClick={() => onChooseMaterial()}
                                                style={{borderRadius: 0}}
                                            >
                                                <Glyphicon glyph="plus"/>
                                            </Button>
                                            <span>&nbsp;</span>
                                            <Button
                                                bsSize="xsmall"
                                                style={{borderRadius: 0}}
                                                onClick={() => onUnbindMaterial(activeMaterial.assignmentId)}>
                                                <Glyphicon glyph="minus"/>
                                            </Button>
                                        </h5>
                                        <MaterialList
                                            materials={course.lessons[activeLessonIndex].materials || []}
                                            activeIndex={activeMaterialIndex}
                                            onSortEnd={({oldIndex, newIndex}) => oldIndex === newIndex ?
                                                onSelectMaterial(newIndex) :
                                                onSortMaterials(arrayMove(activeLesson.materials, oldIndex, newIndex))
                                            }
                                        />
                                    </div>
                            }
                        </div>
                    </Col>
                    <Col sm={9}>
                        <h5 className="label-info" style={{padding: 6}}>
                            {{course: '课程', lesson: '课件', material: '素材'}[activeType]}编辑</h5>
                        {
                            activeType === 'course' ?
                                <Form horizontal>
                                    {
                                        fields.map(([key, field], index) => {
                                            const {title, type, disabled} = field;
                                            let value = course[key];
                                            if ((key === 'diplomaExtraConfig') && course[key] instanceof Object) {
                                                value = JSON.stringify(course[key]);
                                            } else {
                                                value = course[key];
                                            }

                                            return (
                                                <FormGroup key={index}>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        {title}
                                                    </Col>
                                                    <Col sm={10}>
                                                        <ElementEdit
                                                            type={type} value={value} disabled={disabled}
                                                            onValueChange={(value) => this.onChange({key, value})}/>
                                                    </Col>
                                                </FormGroup>
                                            )
                                        })
                                    }
                                    <FormGroup>
                                        <Col smOffset={2} sm={10}>
                                            <Button type="submit" bsStyle="success" onClick={(e) => {
                                                e.preventDefault();
                                                if (course.id) {
                                                    onRequestUpdateCourse(course);
                                                } else {
                                                    onRequestCreateCourse(course);
                                                }
                                            }}>
                                                提交课程修改
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                                : activeType === 'lesson' ?
                                <Form horizontal>
                                    {
                                        lessonFields.map(([key, field], index) => {
                                            const {title, type, disabled} = field;
                                            var value = activeLesson[key];
                                            if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr' || key === 'reportConfig') && activeLesson[key] instanceof Object) {

                                                value = JSON.stringify(activeLesson[key]);

                                            } else {
                                                value = activeLesson[key];
                                            }
                                            return (
                                                <FormGroup key={index}>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        {title}
                                                    </Col>
                                                    <Col sm={10}>
                                                        <ElementEdit
                                                            type={type} value={value} disabled={disabled}
                                                            onValueChange={(value) => this.onLessonChange({
                                                                key,
                                                                value
                                                            })}/>
                                                    </Col>
                                                </FormGroup>
                                            )
                                        })
                                    }
                                    <FormGroup>
                                        <Col smOffset={2} sm={10}>
                                            <Button type="submit" bsStyle="success" onClick={(e) => {
                                                e.preventDefault();
                                                onRequestUpdateSelectedLesson(activeLesson);
                                            }}>
                                                提交课件修改
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                                : activeType === 'material' ?
                                    <div>
                                        <Form horizontal>
                                            {
                                                materialFields.map(([key, field], index) => {
                                                    const {title, type, disabled} = field;
                                                    var value = activeMaterial[key];
                                                    if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && activeMaterial[key] instanceof Object) {
                                                        value = JSON.stringify(activeMaterial[key])
                                                    } else {
                                                        value = activeMaterial[key]
                                                    }
                                                    return (
                                                        <FormGroup key={index}>
                                                            <Col componentClass={ControlLabel} sm={2}>
                                                                {title}
                                                            </Col>
                                                            <Col sm={10}>
                                                                <ElementEdit
                                                                    type={type} value={value} disabled={disabled}
                                                                    instrumentType={activeMaterial.instrumentType}
                                                                    onValueChange={(value) => this.onMaterialChange({
                                                                        key,
                                                                        value
                                                                    })}/>
                                                            </Col>
                                                        </FormGroup>
                                                    )
                                                })
                                            }
                                            {
                                                activeMaterial.type === 'chordGroup' ?
                                                    <div>
                                                        <hr/>
                                                        <ul className="list-group">
                                                            {
                                                                activeMaterial.chords.map((chord, index) => {
                                                                    return (
                                                                        <li key={index}
                                                                            style={{zIndex: 0, padding: 5}}
                                                                            className={`list-group-item ${index === activeChordIndex ? 'active' : ''}`}
                                                                            onClick={() => onSelectChord(index) }
                                                                        >
                                                                <span>
                                                                    {index + 1 }. {chord.name}
                                                                </span>
                                                                            <button
                                                                                className="btn btn-default btn-xs pull-right"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    onUnbindChord(index);
                                                                                }}
                                                                            >删除
                                                                            </button>
                                                                        </li>
                                                                    );
                                                                })
                                                            }
                                                            <li className="list-group-item" style={{padding: 5}}>
                                                                <span> {activeMaterial.chords.length + 1} . </span>
                                                                <button className="btn btn-success btn-xs"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            onChooseChord();
                                                                        }}>增加和弦
                                                                </button>
                                                            </li>
                                                        </ul>
                                                        {
                                                            activeChord ?
                                                                <div style={{
                                                                    border: '1px solid #CCCCCC',
                                                                    padding: 5 + 'px',
                                                                    marginBottom: 10 + 'px'
                                                                }}>
                                                                    <Row>
                                                                        <Col xs={8}>
                                                                            <ChordGraph
                                                                                editable={true}
                                                                                baseFret={activeChord.baseFret}
                                                                                frets={activeChord.frets}
                                                                                fingers={activeChord.fingers}
                                                                                onChange={(baseFret, frets, fingers) => onUpdateSelectedChord(
                                                                                    {
                                                                                        ...activeChord,
                                                                                        baseFret,
                                                                                        frets,
                                                                                        fingers
                                                                                    })}/>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Button
                                                                                bsSize="sm"
                                                                                bsStyle="warning"
                                                                                style={{marginTop: 100}}
                                                                                onClick={e => {
                                                                                    e.preventDefault();
                                                                                    onRequestUpdateSelectedChord(activeChord)
                                                                                }}>
                                                                                保存 <span style={{
                                                                                color: 'red',
                                                                                fontWeight: 900,
                                                                            }}>【当前】</span> 和弦图
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                : '未选中和弦'
                                                        }
                                                    </div> : null
                                            }
                                            {
                                                activeMaterial.type === 'newChordGroup'?
                                                    <div>
                                                        <hr/>
                                                        <ul className="list-group">
                                                            {
                                                                activeMaterial.chords.map((chord, index) => {
                                                                    return (
                                                                        <li key={index}
                                                                            style={{zIndex: 0, padding: 5}}
                                                                            className={`list-group-item ${index === activeChordIndex ? 'active' : ''}`}
                                                                            onClick={() => onSelectChord(index) }
                                                                        >
                                                                <span>
                                                                    {index + 1 }. {chord.name}
                                                                </span>
                                                                            <button
                                                                                className="btn btn-default btn-xs pull-right"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    onUnbindChord(index);
                                                                                }}
                                                                            >删除
                                                                            </button>
                                                                        </li>
                                                                    );
                                                                })
                                                            }
                                                            <li className="list-group-item" style={{padding: 5}}>
                                                                <span> {activeMaterial.chords.length + 1} . </span>
                                                                <button className="btn btn-success btn-xs"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            onChooseChord();
                                                                        }}>增加和弦
                                                                </button>
                                                            </li>
                                                        </ul>
                                                        {
                                                            activeNewChord ?
                                                                <div style={{
                                                                    border: '1px solid #CCCCCC',
                                                                    padding: 5 + 'px',
                                                                    marginBottom: 10 + 'px'
                                                                }}>
                                                                    <Row>
                                                                        <Col xs={8}>
                                                                            <ChordGraph
                                                                                editable={true}
                                                                                baseFret={activeNewChord.baseFret}
                                                                                frets={activeNewChord.frets}
                                                                                fingers={activeNewChord.fingers}
                                                                                onChange={(baseFret, frets, fingers) => onUpdateSelectedChord(
                                                                                    {
                                                                                        ...activeNewChord,
                                                                                        baseFret,
                                                                                        frets,
                                                                                        fingers
                                                                                    })}/>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Button
                                                                                bsSize="sm"
                                                                                bsStyle="warning"
                                                                                style={{marginTop: 100}}
                                                                                onClick={e => {
                                                                                    e.preventDefault();
                                                                                    onRequestUpdateSelectedChord(activeNewChord)
                                                                                }}>
                                                                                保存 <span style={{
                                                                                color: 'red',
                                                                                fontWeight: 900,
                                                                            }}>【当前】</span> 和弦图
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                : '未选中和弦'
                                                        }
                                                    </div> : null
                                            }
                                            {
                                                activeMaterial.type === 'choiceGroup' ?
                                                    <div>
                                                        <hr/>
                                                        <ul className="list-group">
                                                            {
                                                                activeMaterial.question.map((choice, index) => {
                                                                    return (
                                                                        <li key={index}
                                                                            style={{zIndex: 0, padding: 5}}
                                                                            className={`list-group-item ${index === activeChoiceIndex ? 'active' : ''}`}
                                                                            onClick={() => onSelectChoice(index) }
                                                                        >
                                                                <span>
                                                                    {index + 1 }. {choice.name}
                                                                </span>
                                                                            <button
                                                                                className="btn btn-default btn-xs pull-right"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    onUnbindChoice(index);
                                                                                }}
                                                                            >删除
                                                                            </button>
                                                                        </li>

                                                                    )
                                                                })
                                                            }
                                                            <li className="list-group-item" style={{padding: 5}}>
                                                                <span> {activeMaterial.question.length + 1} . </span>
                                                                <button className="btn btn-success btn-xs"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            onChooseChoice();
                                                                        }}>增加选择题
                                                                </button>
                                                            </li>

                                                        </ul>
                                                        { activeChoice ?
                                                            choiceTypeFields.map(([key, field], index) => {
                                                                const {title, type, disabled} = field;
                                                                var value = activeMaterial.question[activeChoiceIndex][key];
                                                                if (key === 'item' && activeMaterial.question[activeChoiceIndex][key] instanceof Object){
                                                                    value = JSON.stringify(activeMaterial.question[activeChoiceIndex][key]);
                                                                }else{
                                                                    value = activeMaterial.question[activeChoiceIndex][key];
                                                                }
                                                                return (
                                                                    <FormGroup key={index}>
                                                                        <Col componentClass={ControlLabel} sm={2}>
                                                                            {title}
                                                                        </Col>
                                                                        <Col sm={10}>
                                                                            <ElementEdit
                                                                                type={type} value={value} disabled={disabled}
                                                                                instrumentType={activeChoice.instrumentType}
                                                                                onValueChange={(value) => this.onChoiceChange({
                                                                                    key,
                                                                                    value
                                                                                })}/>
                                                                        </Col>
                                                                    </FormGroup>

                                                                )
                                                            }): '未选中选择题'

                                                        }
                                                        { activeChoice ?
                                                            <FormGroup>
                                                                <Col smOffset={2} sm={10}>
                                                                    <Button type="submit" bsStyle="success" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        onRequestUpdateSelectedChoice(activeChoice);
                                                                    }}>修改选择题</Button>
                                                                </Col>
                                                            </FormGroup> : 'null'
                                                        }
                                                    </div> : null
                                            }
                                            <FormGroup>
                                                <Col smOffset={2} sm={10}>
                                                    <Button type="submit" bsStyle="success" onClick={(e) => {
                                                        e.preventDefault();
                                                        onRequestUpdateSelectedMaterial(activeMaterial);
                                                    }}>
                                                        提交素材修改
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>

                                    </div>
                                    : null
                        }</Col>
                </Row>
            </div>
        )
    }
}

const LessonItem = SortableElement(
    ({lesson, active, index_}) =>
        <li className={`list-group-item ${active ? 'active' : ''}`}
            style={{padding: '5px'}}> {`${index_ + 1}. ${lesson.name}`} </li>
);

const LessonList = SortableContainer(
    ({lessons, activeIndex}) =>
        <ul className="list-group">
            {
                lessons.map((lesson, index) => (
                    <LessonItem
                        index={index}
                        index_={index}
                        key={index}
                        lesson={lesson}
                        active={index === activeIndex}
                    />
                ))
            }
        </ul>
);

const MaterialItem = SortableElement(
    ({material, active, index_}) =>
        <li className={`list-group-item ${active ? 'active' : ''}`}
            style={{padding: 5}}
        > {`${index_ + 1}. ${MaterialsHelper.materialTypes[material.type]}. ${material.name}`}</li>
);

const MaterialList = SortableContainer(
    ({materials, activeIndex}) =>
        <ul className="list-group">
            {
                materials.map((material, index) => (
                    <MaterialItem
                        index={index}
                        index_={index}
                        key={index}
                        material={material}
                        active={index === activeIndex}
                    />
                ))
            }
        </ul>
);
