/**
 * Created by ENLINK on 2017/6/28.
 */
/**
 * Created by zuce wei on 2017/6/26.
 */
import {fetch,post} from 'utils/fetch';
import axios from 'axios';
var qs = require('qs');
//获取用户组
export function groupList(query) {
    return fetch({
        url: '/api/admin/group',
        method: 'GET',
        params: {
            'pageSize': query.pageSize,
            "searchContent": query.searchContent,
            'currentPage': query.currentPage
        }
    });
}
//获取所有应用资源
export function groupAppList(currentPage,pageSize) {
    return fetch({
        url: '/api/admin/group/apps/all',
        method: 'GET',
        params: {
            'pageSize': pageSize,
            'currentPage': currentPage
        }
    });
}

//获取当前在该用户组下的资源(不分页)
export function groupIncludeAppList(groupId) {
    return fetch({
        url: '/api/admin/group/allApps',
        method: 'GET',
        params: {
            'groupId': groupId
        }
    });
}
//获取当前在该用户组下的资源(分页)
export function groupIncludePageAppList(resourceQuery) {
    return fetch({
        url: '/api/admin/group/apps',
        method: 'GET',
        params: {
            'currentPage': resourceQuery.currentPage,
            'pageSize':resourceQuery.pageSize,
            'groupId':resourceQuery.groupId
        }
    });
}
//获取不在该用户组下的资源
export function groupNotIncludeAppList(groupId) {
    return fetch({
        url: '/api/admin/group/apps/other',
        method: 'GET',
        params: {
            'groupId': groupId
        }
    });
}
export function groupAllList() {
    return fetch({
        url: '/api/admin/groupManager/getAllGroup',
        method: 'get'
    });
}


export function addGroup(group) {
    return fetch({
        url: '/api/admin/group',
        method: 'post',
        body: group
    });
}

export function editGroup(group) {
    return fetch({
        url: '/api/admin/group',
        method: 'PUT',
        body: group
    });
}
//删除用户组
export function delGroup(list) {
    return fetch({
        url: '/api/admin/group',
        method: 'DELETE',
        params:list
    });
}
//获取所有用户数据
export function groupClientUserList(currentPage, pageSize,searchContent) {
    return fetch({
        url: '/api/admin/user',
        method: 'GET',
        params:{
            currentPage:currentPage,
            pageSize:pageSize,
            searchContent:searchContent
        }
    });
}
//获取不属于某个用户组的用户
export function groupClientNotIncludeUserList(groupId) {
    return fetch({
        url: '/api/admin/group/user/notInclude',
        method: 'GET',
        params:{
            groupId:groupId
        }
    });
}
//获取已经属于某个用户组的用户(不分页)
export function groupClientIncludeUserList(groupId) {
    return fetch({
        url: '/api/admin/group/allUser',
        method: 'GET',
        params:{
            groupId:groupId
        }
    });
}
//获取已经属于某个用户组的用户(分页)
export function groupClientIncludePageUserList(userQuery) {
    return fetch({
        url: '/api/admin/group/user',
        method: 'GET',
        params:{
            'currentPage': userQuery.currentPage,
            'pageSize': userQuery.pageSize,
            'groupId':userQuery.groupId
        }
    });
}
/*****
 * 获取所有的用户策略
 * ***/
export function allUserStragetyList() {
    return fetch({
        url: '/api/admin/rule/all',
        method: 'GET'
    })
}
/*******
 * 获取认证方式
 * ******/
export function mainAuthTypeList() {
    return fetch({
        url: '/api/admin/auth/main',
        method: 'GET',
    });
}
//获取某个用户组的认证
export function groupMainAuthTypeList(groupId) {
    return fetch({
        url: '/api/admin/auth/main/group',
        method: 'GET',
        params:{
            groupId:groupId
        }
    });
}
//获取指定oauth认证下的所有扩展组信息
export function getEnvasOauthList(listQuery) {
    return fetch({
        url: '/api/admin/auth/oauth/external/list',
        method: 'GET',
        params: listQuery
    });
}
//获取查看页面的扩展组
export function getEnvasOauthListByGroup(listQuery) {
    return fetch({
        url: '/api/admin/auth/group/oauth/list',
        method: 'GET',
        params: listQuery
    });
}
//查看api接口
export function getApiScanList(listQuery) {
    return fetch({
        url: '/api/admin/group/api/scan',
        method: 'GET',
        params: listQuery
    });
}
//获取api列表
export function getApiList(listQuery) {
    return fetch({
        url: '/api/admin/group/api/edit',
        method: 'GET',
        params: listQuery
    });
}