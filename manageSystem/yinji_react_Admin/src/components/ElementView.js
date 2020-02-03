/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午8:31
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import ChordGraph from "./ChordGraph";
import {materialTypes, choiceTypes} from "../helpers/MaterialsHelper";
import * as moment from "moment";
import {courseLevels, courseTypes} from "../helpers/CoursesHelper";

export default class ElementView extends Component {
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.any
    };

    render() {
        const {type, value, ...props} = this.props;
        switch (type) {
            case 'boolean':
                return <span {...props}>{value ? '是' : '否'}</span>;
            case 'user':
                return <span {...props}>{ value ? value.nickname : 'NULL' }</span>;

            case 'instrumentType':
                return <span {...props}>{ {music_basis: '音阶', guitar: '吉他', ukulele: '尤克里里', kalimba: '拇指琴', djembe: '非洲鼓'}[value] || 'Unknown instrument'}</span>;

            case 'timestamp':
                return <span {...props}> {moment.unix(value).locale('zh_CN').format('LLLL')} </span>;

            case 'video':
                return <video {...props} controls src={value}>Video</video>;

            case 'audio':
                return <audio {...props} controls src={value}>Audio</audio>;

            case 'image':
                return <img {...props} src={value} alt=""/>;

            case 'materialType':
                return <span {...props}>{materialTypes[value]}</span>;
            case 'choiceType':
                return <span {...props}>{materialTypes[value]}</span>;
            case 'courseLevel':
                return <span {...props}>{courseLevels[value]}</span>;

            case 'courseType':
                return <span {...props}>{courseTypes[value]}</span>;

            case 'score':
                return <span {...props}>{value ? value.name : '无'}</span>;

            case 'tuningMethod':
                return <span {...props}> {value ? value.name : '无'} </span>;

            case 'chordGraph':
                const {baseFret, fingers, frets} = value;
                return value ?
                    <ChordGraph {...props} baseFret={baseFret} frets={frets} fingers={fingers} scale={0.5}/> : null;

            case 'sex':
                return <span {...props}>{value === 'female' ? '女' : '男'}</span>;

            case 'chords':
                return <span>{value ? value.length : 'EMPTY'}</span>;

            case 'richText':
                return <span dangerouslySetInnerHTML={{__html: value}}/>;

            default:
                return <span {...props}>{value || _.toString(value)}</span>
        }
    }
}
