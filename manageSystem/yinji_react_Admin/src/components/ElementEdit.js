/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午8:42
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, ControlLabel, FormControl, InputGroup} from "react-bootstrap";
import ChordGraph from "./ChordGraph";
import {choiceTypes, gameTypes, materialTypes} from "../helpers/MaterialsHelper";
import * as moment from "moment";
import {connect} from "react-redux";
import * as actions from "../actions/index";
import UsersChooser from "./UsersChooser";
import ElementView from "./ElementView";
import Upload from "./Upload";
import * as selectors from "../reducers/selectors";
import {courseLevels, courseTypes, diploma_types, courseChooseType} from "../helpers/CoursesHelper";
import ScoresChooser from "./ScoresChooser";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import MyQuill from "./MyQuill";
import VideoGroup from "./VideoGroup";

@connect((state, props) => {
    return {
        tuningMethods: selectors.tuningMethodsSelector(state)
    }
})
export default class ElementEdit extends Component {
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.any,
        disabled: PropTypes.bool,
        instrumentType: PropTypes.string.isRequired,
        onValueChange: PropTypes.func.isRequired,
        onChooseUser: PropTypes.func,
        tuningMethods: PropTypes.object
    };

    static defaultProps = {
        onChooseUser: () => null,
        disabled: false,
        instrumentType: 'guitar'
    };

    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false
        }
    }


    render() {
        const {type, value, instrumentType, disabled, onValueChange, tuningMethods, onChooseUser, dispatch, ...props} = this.props;
        const {isDialogVisible} = this.state;
        const currentTuningMethods = tuningMethods ? tuningMethods[instrumentType] : null;
        if (disabled) {
            return <ControlLabel>
                <ElementView value={value} type={type}/>
            </ControlLabel>
        }
        switch (type) {
            case 'boolean':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                >
                    <option value={true}>是</option>
                    <option value={false}>否</option>
                </FormControl>;

            case 'user':
                return <InputGroup>
                    <FormControl
                        type="text"
                        value={value ? value.nickname : 'NULL'} onChange={() => null}/>
                    <InputGroup.Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            dispatch(actions.showUsersChooser());
                        }}>...</Button>
                    </InputGroup.Button>
                    <UsersChooser onOk={(user) => {
                        dispatch(actions.hideUsersChooser());
                        onValueChange(user);
                    } }/>
                </InputGroup>;

            case 'instrumentType':
                return <FormControl value={value} componentClass="select" onChange={(e) => {
                    onValueChange(e.target.value)
                }}>
                    <option value="music_basis">音基</option>

                    <option value="guitar">吉他</option>
                    <option value="ukulele">尤克里里</option>
                    <option value="kalimba">卡林巴</option>
                    <option value="djembe">非洲鼓</option>
                </FormControl>;

            case 'timestamp':
                return <ControlLabel {...props}> {moment.unix(value).locale('zh_CN').format('LLLL')} </ControlLabel>;

            case 'video':
                return <Upload type="video" url={value} onSuccess={onValueChange}/>;
            case 'pieceVideo':
                return <VideoGroup type="pieceVideo" urls={value} onSuccess={onValueChange}></VideoGroup>;
            case 'audio':
                return <Upload type="audio" url={value} onSuccess={onValueChange}/>;

            case 'image':
                return <Upload type="image" url={value} onSuccess={onValueChange}/>;

            case 'file':
                return <Upload type="file" url={value} onSuccess={onValueChange}/>;

            case 'materialType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();
                        onValueChange(e.target.value);
                    }}>
                    {
                        Object.entries(materialTypes).map(([key, value], index) => {
                            return <option value={key} key={index}>{value}</option>
                        })
                    }
                </FormControl>;
            case 'choiceType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();
                        onValueChange(e.target.value);
                    }}>
                    {
                        Object.entries(choiceTypes).map(([key, value], index) =>{
                            return <option value={key} key={index}>{value}</option>
                        })
                    }
                </FormControl>;

            case 'gameType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();
                        onValueChange(e.target.value);
                    }}>
                    {
                        Object.entries(gameTypes).map(([key, value], index) =>{
                            return <option value={key} key={index}>{value}</option>
                        })
                    }
                </FormControl>;

            case 'courseLevel':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={e => onValueChange(e.target.value)}
                >
                    {
                        Object.entries(courseLevels).map(([key, value], index) =>
                            <option value={key} key={index}>{value}</option>
                        )
                    }

                </FormControl>;

            case 'courseType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={e => onValueChange(e.target.value)}
                >
                    {
                        Object.entries(courseTypes).map(([key, value], index) =>
                            <option value={key} key={index}>{value}</option>
                        )
                    }
                </FormControl>;

            case 'score':
                return <InputGroup>
                    <FormControl
                        type="text"
                        value={value ? `${value.id}:${value.name}` : 'NULL'} onChange={() => null}/>
                    <InputGroup.Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            this.setState({isDialogVisible: true});
                        }}>...</Button>
                    </InputGroup.Button>
                    <ScoresChooser
                        isVisible={isDialogVisible}
                        onOk={score => {
                            this.setState({isDialogVisible: false});
                            onValueChange(score);
                        }}
                        onCancel={() => this.setState({isDialogVisible: false})}/>
                </InputGroup>;

            case 'tuningMethod':
                return <FormControl
                    componentClass="select"
                    value={value.index}
                    onChange={(e) => onValueChange(currentTuningMethods[e.target.value])}>
                    {
                        currentTuningMethods.map((method, index) => {
                            return <option value={index} key={index}>{method.name}</option>
                        })
                    }
                </FormControl>;

            case 'chordGraph':
                if (!value) {
                    return <ControlLabel>无</ControlLabel>;
                }
                const {baseFret, fingers, frets} = value;
                return <ChordGraph
                    editable={true} {...props} baseFret={baseFret} frets={frets} fingers={fingers}
                    onChange={(baseFret, frets, fingers) => {
                        onValueChange({baseFret, frets, fingers})
                    }}/>;

            case 'text':
                return <FormControl
                    componentClass="textarea" value={value}
                    onChange={e => onValueChange(e.target.value)}/>;

            case 'richText':
                return <MyQuill value={value} onChange={(content) => onValueChange(content)}/>;

            case 'knowledgePointType':
                return <FormControl value={value} componentClass="select" onChange={(e) => {
                    onValueChange(e.target.value)
                }}>
                    <option value = "staff">认识五线谱</option>
                    <option value = "clef">认识谱号</option>
                    <option value = "rhythm">单位拍练习</option>
                    <option value = "note">认识音符</option>
                    <option value = "duration">音符时值</option>
                    <option value = "pitch">认识音高</option>
                    <option value = "pitch_contrast">音高对比</option>
                    <option value = "sightsinging">视唱</option>
                    <option value = "time">认识拍号</option>
                    <option value = "listen_time">听辨拍号</option>
                    <option value = "listen_time_one">听辨拍号(1)</option>
                    <option value = "singing">模唱</option>
                    <option value = "rest">认识休止符</option>
                    <option value = "rest_duration">休止符时值</option>
                    <option value = "cal_duration">时值计算</option>
                    <option value = "listen_rhythm">节奏听辨</option>
                    <option value = "scales">认识音阶</option>
                    <option value = "listen_melody">听辨旋律</option>
                    <option value = "recognition_interval">音程识别</option>
                    <option value = "listen_interval">听辨音程</option>
                    <option value = "single_singing">单音模唱</option>
                    <option value = "dotted_note">附点音符</option>
                    <option value = "c_duration">时值对比</option>
                    <option value = "skip">认识跳音</option>
                    <option value = "learning_rhythm">学习节拍</option>
                    <option value = "listen_beat">听辨节拍</option>
                    <option value = "force_speed">力度与速度</option>
                    <option value = "listen_expression">听辩音乐表情</option>
                    <option value = "know_four">认识四四拍</option>
                    <option value = "sound_practice">识音练习</option>
                    <option value = "interval">认识音程</option>
                    <option value = "sing_interval">模唱音程</option>
                    <option value = "know_four_interval">认识四度音程</option>
                    <option value = "points_four_interval">区分四度音程</option>
                    <option value = "know_five_interval">认识五度音程</option>
                    <option value = "points_five_interval">区分五度音程</option>
                    <option value = "rhythm_practice">敲击节奏练习</option>
                    <option value = "soun_high_low">比较音的高低</option>
                    <option value = "divided_into_sections">划分小节</option>
                    <option value = "a_minor_scale">a小调音阶</option>
                    <option value = "sound_level">音级</option>
                    <option value = "sing_scale">模唱音阶</option>
                    <option value = "listen_pitch">音高听辨</option>
                    <option value = "parallel_tone">认识平行大小调</option>
                    <option value = "listen_nature_tone">听辨自然大小调式</option>
                    <option value = "debug_sound_level">调试音级</option>
                    <option value = "listen_large_small">大、小调式听辨</option>
                    <option value = "listen_triad">认识三和弦</option>
                    <option value = "compose_three_chords">构三和弦</option>
                    <option value = "sing_chord">模唱和弦</option>
                    <option value = "points_triad">区分大、小三和弦</option>
                    <option value = "listen_symbol">听辨符号</option>
                    <option value = "identify_symbol">符号识别</option>
                    <option value = "identify_symbol_one">符号识别(1)</option>
                    <option value = "rest_notation">认识音乐记号</option>
                    <option value = "aims_notation">听辨音乐记号</option>
                    <option value = "pitch_identify">音高识别</option>
                    <option value = "die_into">模进</option>
                    <option value = "drag_bar_line">拖拽小节线</option>
                    <option value = "construct_interval">构音程</option>
                </FormControl>;

            case 'diplomaType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={e => onValueChange(e.target.value)}
                >
                    {
                        Object.entries(diploma_types).map(([key, value], index) =>
                            <option value={key} key={index}>{value}</option>
                        )
                    }

                </FormControl>;

            case 'courseTypeInt':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={e => onValueChange(e.target.value)}
                >
                    {
                        Object.entries(courseChooseType).map(([key, value], index) =>
                            <option value={key} key={index}>{value}</option>
                        )
                    }

                </FormControl>;

            default:
                return <FormControl value={value} onChange={(e) => onValueChange(e.target.value)}/>
        }
    }
}
