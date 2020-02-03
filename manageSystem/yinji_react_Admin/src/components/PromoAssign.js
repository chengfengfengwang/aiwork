/**
 * Created by mac on 2017/10/19.
 */

import React from 'react';
import {Form, Col, FormGroup, ControlLabel} from 'react-bootstrap';
import ElementEdit from "./ElementEdit";

export default React.createClass( {

    getInitialState() {
        return {
            loading: true,
            error: null,
            start: '',
            end: '',
            channel: '',
            phone: '',
            action: 'edit',
        }
    },

    fields: {
        start: {
            title: '开始卡号',
            defaultValue: '',
        },
        end : {
            title: '结束卡号',
            defaultValue: '',
        },
        channel: {
            title: '渠道名称',
            defaultValue: '',
        },
        phone: {
            title: '渠道电话',
            defaultValue: '',
        }
    },

    onSubmit() {

    },

    render() {
        const fields = this.fields;
        return (
            <div style={{position: 'relative'}}>
            <Form horizontal>
                {fields.map(([key, field], index) => {
                    const {title, value} = field;
                    return (
                        <FormGroup key={index}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {title}
                            </Col>
                            <Col sm={10}>
                                <ElementEdit
                                    value={value}
                                    onValueChange={(value) => this.onTextChange({
                                        key,
                                        value
                                    })}
                                />
                            </Col>
                        </FormGroup>
                    )
                })}
            </Form>
            </div>
        )
    }

})