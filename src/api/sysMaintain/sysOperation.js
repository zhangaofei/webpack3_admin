/**
 * Created by Administrator on 2017/9/19
 */
import {fetch} from 'utils/fetch';
export function getShutDown() {
    return fetch(
        {
            url: '/api/admin/sysTool/shutDown',
            method: 'put',
            body: '',
        }
    )

}
export function getRestart() {
    return fetch(
        {
            url: '/api/admin/sysTool/restart',
            method: 'put',
            body: '',
        }
    )

}
export function getRestartServer() {
    return fetch(
        {
            url: '/api/admin/sysTool/restartServer',
            method: 'put',
            body: '',
        }
    )

}

// �ָ���������
export function resetFactoryData() {
    return fetch(
        {
            url: '/api/admin/restoreandbackup/restoreFactorySettings',
            method: 'put',
            body: '',
        }
    )

}