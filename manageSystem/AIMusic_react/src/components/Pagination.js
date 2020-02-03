/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/3/22 下午3:47
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FormControl, Pagination} from 'react-bootstrap'

export default class ThePagination extends Component {
    static propTypes = {
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        onSelect: PropTypes.func.isRequired,
        onPageChange: PropTypes.func.isRequired,
    };

    render() {
        const {page, size, total, onSelect, onPageChange, ...props} = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Pagination
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={Math.ceil(total / size)}
                    maxButtons={10}
                    activePage={page + 1}
                    onSelect={x => onSelect(x - 1)}
                    {...props}
                />
                &nbsp;
                <span>{` (共${total}个)`}</span>

                <FormControl bsSize="sm" style={{width: '60px', marginLeft: '20px'}}
                             onSelect={e => {
                                 let need_page = e.target.value.trim();
                                 if (!need_page){
                                     need_page = 0;
                                 }else{
                                     need_page = parseInt(need_page) - 1
                                 }
                                 onPageChange(need_page)}}/>
            </div>
        )
    }
}

