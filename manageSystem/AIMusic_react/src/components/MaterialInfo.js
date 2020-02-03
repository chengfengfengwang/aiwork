/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午6:36
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import MaterialDetail from "./MaterialDetail";
import * as selectors from "../reducers/selectors";
import {connect} from "react-redux";
import * as actions from "../actions/index";
import * as MaterialsHelper from "../helpers/MaterialsHelper";

@connect((state, props) => {
    const {currentMaterial: material} = selectors.materialsManagementSelector(state);
    const {match: {params: {id}}} = props;
    return {material, id: parseInt(id, 10)}
}, {
    onLoad: (id) => actions.requestMaterial(id)
})
export default class MaterialInfo extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        onLoad: PropTypes.func.isRequired,
        material: PropTypes.object
    };

    componentDidMount() {
        const {id, onLoad} = this.props;
        onLoad(id);
    }

    render() {
        const {material} = this.props;
        if (!material) {
            return null;
        }
        return (
            <MaterialDetail material={material} fields={MaterialsHelper.getViewableFields({type: material.type})}/>
        )
    }
}
