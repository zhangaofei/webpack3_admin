import {fetch} from 'utils/fetch';

export function getWebendList(param) {
    return fetch({
        url: '/api/admin/webTerminal',
        method: 'get',
        params: param
    });
}
export function getAddWebend(param) {
    return fetch({
        url: '/api/admin/webTerminal',
        method: 'post',
        body: param
    });
}
export function getEditWebend(param) {
    return fetch({
        url: '/api/admin/webTerminal',
        method: 'put',
        body: param
    });
}
export function getDelWebend(ids) {
    console.log('ids:',ids)
    return fetch({
        url: '/api/admin/webTerminal/delete',
        method: 'get',
        // params: {
        //     ids:ids
        // },
        params: ids
    });
}
//用户组授权

// getTerminalByGroupNoPage
export function getTerminalByGroupNoPage(param) {
    return fetch({
        url: '/api/admin/webTerminal/getTerminalByGroupNoPage',
        method: 'get',
        params: param
    });
}

export function getTerminalByGroup(param) {
    return fetch({
        url: '/api/admin/webTerminal/getTerminalByGroup',
        method: 'get',
        params: param
    });
}

export function updateTerminals(id, appsList) {
    return fetch({
        url: '/api/admin/webTerminal/updateTerminals',
        method: 'put',
        // body: param,
        params:{groupId:id},
        body:appsList
    });
}
/*=====*/
// /api/admin/webTerminal/terminalBySort
export function getTerminalBySort(param) {
    return fetch({
        url: '/api/admin/webTerminal/terminalBySort',
        method: 'get',
        params: param
    });
}
