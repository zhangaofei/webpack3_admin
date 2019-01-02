
import { fetch } from 'utils/fetch';

// 获取图标列表
export function iconListData (param) {
    return fetch ({
        url: '/api/enwas/admin/upload/list',
        method: 'POST',
        body: param
    })
};

// 删除图标
export function delIcon (param) {
    return fetch ({
        url: '/api/enwas//admin/upload/del',
        method: 'POST',
        body: param
    })
};

// 上传图标
export function uploadIcon (param) {
    return fetch ({
        url: '/api/enwas/admin/upload/img',
        method: 'POST',
        body: param
    })
};

