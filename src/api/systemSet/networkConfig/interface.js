import {fetch} from 'utils/fetch';

//获取用户策略列表(分页)
export function getNetList(param) {
    return fetch ({
        url: '/api/admin/getNetList',
        method: 'POST',
        params: param
    })
}
export function getNetInfo(device) {
    return fetch ({
        url: '/api/admin/getNetInfo',
        method: 'POST',
        params: {
            DEVICE:device
        }
    })
}
export function editNetInfo(editInfo) {
    return fetch ({
        url: '/api/admin/editNetInfo',
        method: 'POST',
        body: editInfo
    })
}
//---------------------虚拟接口--------
//链路聚合获取去接口名
export function getNetNameList(param) {
    return fetch ({
        url: '/api/admin/getEntityNetNameList',
        method: 'get',
        params: param
    })
}
// export function getEntityNetName(param) {
//     return fetch ({
//         url: '/api/admin/getNetNameList',
//         method: 'get',
//         params: param
//     })
// }
// export function getVirtaulNet(device) {
//     return fetch ({
//         url: '/api/getNetList',
//         method: 'POST',
//         params: {
//             DEVICE:device
//         }
//     })
// }
export function addVirtaulNet(isCreateMode,slaverDevices,netInterfaceParam) {
    return fetch ({
        url: '/api/admin/editNetInfo',
        method: 'POST',
        params:{
            isCreateMode:isCreateMode,
            slaverDevices:slaverDevices
        },
        body: netInterfaceParam
    })
}
export function delVirNet( params) {
    return fetch ({
        url: '/api/admin/deleteVirtualNet',
        method: 'post',
        params:  params

    })
}