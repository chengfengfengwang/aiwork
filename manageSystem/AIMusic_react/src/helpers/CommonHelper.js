/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/27 下午4:11
 */

function getDefaultValue(type) {
    switch (type) {
        case 'boolean':
            return false;

        case 'number':
            return 0;

        case 'sex':
            return 'male';

        default:
            return ''
    }
}
