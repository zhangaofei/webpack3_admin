/**
 * Created by stone on 2017/11/14.
 */

import { fetch } from 'utils/fetch';

//获取列表
export function aclList(currentPage, pageSize,searchContent,type) {
    return fetch({
        url: '/api/enwas/pg/acl/list',
        method: 'get',
        params:
            {
                "page":currentPage,
                "page_size":pageSize,
                "search_content":searchContent,
                "type":type
            }
    });
}

//增加
export function aclAdd(addInfo) {
    return fetch({
        url: '/api/enwas/pg/acl/add',
        method: 'get',
        params: addInfo
    });
}

//编辑
export function aclUpdate(updateInfo) {
    return fetch({
        url: '/api/enwas/pg/acl/modify',
        method: 'get',
        params: updateInfo
    });
}

//删除
export function aclDel(id) {
    return fetch({
        url: '/api/enwas/pg/acl/del',
        method: 'post',
        body:id
    });
}

