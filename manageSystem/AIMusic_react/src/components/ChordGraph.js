/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/4/11 下午7:06
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class ChordGraph extends Component {
    static propTypes = {
        baseFret: PropTypes.number.isRequired,
        frets: PropTypes.arrayOf(PropTypes.number).isRequired,
        fingers: PropTypes.arrayOf(PropTypes.number).isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool,
        scale: PropTypes.number,
    };

    static defaultProps = {
        onChange: () => (null),
        editable: false,
        scale: 1
    };

    state = {
        empty: false
    };

    onClick(i, j) {
        let {baseFret, frets, fingers, onChange} = {...this.props};
        frets = [...frets];
        fingers = [...fingers];
        // 品： -1不按不拨, 0按而不拨, 1, 2, 3 ....
        // 指法： -1不按, 0大拇指, 1, 2, 3, 4
        // console.log('Before fingers', fingers, 'frets', frets);
        if (fingers[i] === -1 && frets[i] === -1) {
            frets[i] = 0;
        } else if (frets[i] === j + 1) {
            if (fingers[i] === 4) {
                fingers[i] = -1;
                frets[i] = -1;
            } else {
                fingers[i] = [-1, 0, 1, 2, 3, 4][([-1, 0, 1, 2, 3, 4].indexOf(fingers[i]) + 1) % 6];
            }
        } else {
            frets[i] = j + 1;
            if (fingers[i] === -1) {
                fingers[i] = 0;
            }
        }
        // console.log('After fingers', fingers, 'frets', frets);
        onChange(baseFret, frets, fingers);
    }

    onBaseFretChange(baseFret) {
        const {fingers, frets, onChange} = this.props;
        onChange(baseFret, frets, fingers);
    }

    render() {
        const {baseFret, frets, fingers, editable, scale} = this.props;
        const stringCount = fingers.length;
        const fretCount = stringCount === 6 ? 5 : 4;
        //noinspection JSPotentiallyInvalidConstructorUsage
        return (
            <div style={{display: 'block'}}>
                <div style={{float: 'left'}}>
                    <div style={{display: editable ? 'block' : 'none'}}
                         onClick={() => this.onBaseFretChange(baseFret + 1)}>+
                    </div>
                    <div >{baseFret}</div>
                    <div style={{display: editable ? 'block' : 'none'}}
                         onClick={() => this.onBaseFretChange(baseFret - 1)}>-
                    </div>
                </div>
                <div className="unselectable"
                     style={{
                         marginLeft: 30 * scale,
                         position: 'relative',
                         height: 6 * 48 * scale,
                         border: '0px solid #DDDDDD',
                         fontSize: 24 * scale + 'px',
                         minWidth: 270 * scale + 'px'
                     }}>
                    <div style={{position: 'absolute', top: 48 * scale, left: 24 * scale}}>
                        {
                            Array(fretCount).fill().map((_, i) => {
                                //noinspection JSPotentiallyInvalidConstructorUsage
                                return (
                                    <div key={`row${i}`}>
                                        {
                                            Array(stringCount - 1).fill().map((_, j) => {
                                                const borderStyle = '1px solid #333333';
                                                return (
                                                    <div key={`row${i}col${j}`} style={{
                                                        display: 'inline-block',
                                                        borderRight: borderStyle,
                                                        borderBottom: borderStyle,
                                                        borderTop: i === 0 ? borderStyle : '0',
                                                        borderLeft: j === 0 ? borderStyle : '0',
                                                        width: 48 * scale,
                                                        height: 48 * scale
                                                    }}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{position: 'absolute'}}>
                        {
                            Array(fretCount + 1).fill().map((_, j) => {
                                j -= 1;
                                //noinspection JSPotentiallyInvalidConstructorUsage
                                return (
                                    <div key={`row${j}`}>
                                        {
                                            Array(stringCount).fill().map((_, i) => {
                                                i = stringCount - 1 - i;
                                                return (
                                                    <div key={`row${j}col${i}`} style={{
                                                        display: 'inline-block',
                                                        border: '0px solid #DDDDDD',
                                                        textAlign: 'center',
                                                        fontSize: 30 * scale + 'px',
                                                        width: 48 * scale,
                                                        height: 48 * scale
                                                    }}
                                                         onClick={() => {
                                                             if (j !== -1 && editable) {
                                                                 this.onClick(i, j);
                                                             }
                                                         }}
                                                    >
                                                        {
                                                            (() => {
                                                                if (j === -1) {
                                                                    if (fingers[i] === -1) {
                                                                        if (frets[i] === 0) {

                                                                            return <span>&#9711;</span>
                                                                        } else {

                                                                            return <span>&#10005;</span>
                                                                        }
                                                                    } else {
                                                                        return <span>&nbsp;</span>
                                                                    }
                                                                } else if (frets[i] === j + 1 && fingers[i] >= 0) {
                                                                    return (
                                                                        <span
                                                                            style={{
                                                                                fontSize: (fingers[i] ? 1 : 0.8) + 'em'
                                                                            }}
                                                                        >{String.fromCharCode(fingers[i] ? 10101 + fingers[i] : 9471)}
                                                                    </span>
                                                                    )
                                                                } else {
                                                                    return <span>&nbsp;</span>
                                                                }
                                                            })()
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
