import { fetch } from 'utils/fetch';
let  method = 'post'


export function getGroupList() {
    return fetch({
        url: '/api/enwas/group/list',
        method: method,
        body: {}
    });
}

export function getAssociationGroup(param) {
    return fetch({
        url: '/api/enwas/userGroupApplication/listUseGroup',
        method: method,
        body: param
    });
}
/*（form qqy）新公共授权api*/
export function getAssociationPubGroup(param) {
    return fetch({
        url: '/api/admin/group/getGroupEmpower',//（form qqy）新公共授权api
        method: 'get',
        params: param,
        // body: param
    });
}
export function deletePubAssociation(param) {
    return fetch({
        url: '/api/admin/group/deleteEmpower',
        method: 'delete',
        params: param
    });
}
/*==================*/

export function addAssociation(association) {
    return fetch({
        url: '/api/enwas/userGroupApplication/add',
        method: method,
        body: association
    });
}

export function modifyAssociation(association) {
    return fetch({
        url: '/api/enwas/userGroupApplication/modify',
        method: method,
        body: association
    });
}

export function deleteAssociation(id) {
    return fetch({
        url: '/api/enwas/userGroupApplication/del',
        method: method,
        body: id
    });
}
//获取未进行授权的用户组
export function grouplistForAdd(page) {
    return fetch({
        url: '/api/enwas/group/listApplicationForAdd',
        method: method,
        body: page
    });
}

/*新方法  获取所用enwas的all*/
export function getEnwasAll(page) {
    return fetch({
        url: '/api/enwas/userGroupApplication/applicationForList',
        method: method,
        body: page
    });
}
//获取该用户组下关联的web应用和信用域
export function listForEdit(id) {
    return fetch({
        url: '/api/enwas/userGroupApplication/list',
        method: method,
        body: id
    });
}
//获取所有的用户组列表
export function getAllGroupList(id) {
    return fetch({
        url: '/api/enwas/userGroupApplication/list',
        method: method,
        body: id
    });
}
//用户组授权查看分页功能
export function getselectedPageList(id) {
    return fetch({
        url: '/api/enwas/userGroupApplication/listForCheck',
        method: method,
        body: id
    });
}