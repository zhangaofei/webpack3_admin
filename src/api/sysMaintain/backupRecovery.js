/**
 * Created by Administrator on 2017/9/19.
 */
import {fetch} from 'utils/fetch';

// 备份到服务器 数据获取
export function backupToServerData (options) {
    return fetch(
        {
            url: '/api/admin/restoreandbackup/backup',
            method: 'put',
            body: options,
        }
    )

};


// 获取备份列表
export function getBackupListData (options) {
    return fetch(
        {
            url: '/api/admin/restoreandbackup/backups',
            method: 'get',
            body: options,
        }
    )

};


// 删除备份列表
export function deleteRecovery (options) {
    return fetch(
        {
            url: '/api/admin/restoreandbackup/backup',
            method: 'DELETE',
            body: options,
        }
    )

};


// 下载备份列表
export function downloadBackupFile (options) {
    return fetch(
        {
            url: '/api/enwas/admin/checkBackupFile',
            method: 'POST',
            body: options,
        }
    )
};

// 恢复备份列表
export function restoreBackupFile (options) {
    return fetch(
        {
            url: '/api/admin/restoreandbackup/restore',
            method: 'PUT',
            body: options,
        }
    )

};