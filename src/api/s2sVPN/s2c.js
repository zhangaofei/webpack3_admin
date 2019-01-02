import {fetch} from 'utils/fetch';

//获取s2c状态列表 列表(分页)
export function gets2cStateList(param) {
    return fetch ({
        url: '/api/admin/s2c',
        method: 'GET',
        params: param
    })
}


//保存s2c
export function edits2c(s2c) {
    return fetch ({
        url: '/api/admin/s2c',
        method: 'POST',
        body: s2c
    })
}


//获取s2c配置
export function gets2cConfig(s2c) {
    return fetch ({
        url: '/api/admin/s2c/getS2c',
        method: 'GET',
        body: s2c
    })
}
//重置接口
export function resetInterface() {
    return fetch ({
        url: '/api/admin/s2c/reSetS2c',
        method: 'POST'
    })
}

//关闭接口
export function closeInterface() {
    return fetch ({
        url: '/api/admin/s2c/closeS2c',
        method: 'POST'
    })
}



