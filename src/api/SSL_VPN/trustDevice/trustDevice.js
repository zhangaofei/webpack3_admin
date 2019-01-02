import {fetch} from 'utils/fetch';

//获取用户策略列表(分页)
export function getDeviceList(param) {
    return fetch ({
        url: '/api/admin/overallSignature',
        method: 'GET',
        params: param
    })
}
// api/admin/overallSignature
export function getDeviceAdd(param) {
    return fetch ({
        url: '/api/admin/overallSignature',
        method: 'post',
        body: param
    })
}
export function getDeviceEdit(param) {
    return fetch ({
        url: '/api/admin/overallSignature',
        method: 'put',
        body: param
    })
}
export function getDeviceDelete(param) {
    return fetch ({
        url: '/api/admin/overallSignature',
        method: 'DELETE',
        params: param
    })
}
//模板下载
export function downloadModel() {
    return fetch(
        {
            url:'/api/admin/overallSignature/templet ',
            method:'GET'
        }
    )

}
//导出
export function downOption(parm) {
    console.log(parm,'parm')
    return fetch({
        url: '/api/admin/overallSignature/download',
        method: 'get',
        params: parm


    });
}