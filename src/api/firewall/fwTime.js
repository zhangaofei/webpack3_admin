import {fetch} from 'utils/fetch';

//获取时间列表(分页)
export function getTimeList(param) {
    return fetch ({
        url: '/api/admin/time',
        method: 'GET',
        params: param
    })
}

//获取时间列表(选择)
export function getTimeListSelect() {
    return fetch ({
        url: '/api/admin/time/select',
        method: 'GET'
    })
}

//批量删除时间
export function deleteTime(time) {
    return fetch ({
        url: '/api/admin/time',
        method: 'DELETE',
        params: time
    })
}
//新建时间
export function addTime(time) {
    return fetch ({
        url: '/api/admin/time',
        method: 'POST',
        body: time
    })
}

//编辑时间
export function updateTime(time) {
    return fetch ({
        url: '/api/admin/time',
        method: 'PUT',
        body: time
    })
}

//验证时间名称是否已存在
export function isNameExist(param) {
    return fetch ({
        url: '/api/admin/time/name/exist',
        method: 'GET',
        params: param
    })
}
