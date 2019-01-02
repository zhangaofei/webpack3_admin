/**
 * Created by zuce wei on 2017/6/26.
 */
import {fetch,post} from 'utils/fetch';

export function userList(currentPage, pageSize,searchContent) {
    return fetch({
        url: '/api/admin/clientUsers/getClientUsers',
        method: 'get',
        params: {
            'pageSize':pageSize,
            "search_content": searchContent,
            'cur_page': currentPage}
    });
}


export function groupClientUserList(currentPage, pageSize,list) {
    return fetch({
        url: '/api/admin/clientUsers/getGroupClientUsers',
        method: 'post',
        body:{
            cur_page:currentPage,
            page_size:pageSize,
            gAuthTypeList:list
        }
    });
}


export function addClientUser(user) {
    return fetch({
        url: '/api/admin/clientUsers/addClientUser',
        method: 'post',
        body: user
    });
}


export function updateClientUser(user) {
    return fetch({
        url: '/api/admin/clientUsers/updateClientUser',
        method: 'post',
        body: user
    });
}

export function delClientUser(id_name) {
    return fetch({
        url: '/api/admin/clientUsers/delClientUsers',
        method: 'delete',
        params: {
            'id_name':id_name
        }
    });
}


export function getOnlineUser(searchContent) {
    return fetch({
        url: '/api/admin/login/getAllOnlineUser',
        method: 'get',
        params: {
            'searchContent':searchContent
        }
    });
}


export function removeOnlineUser(list) {
    return fetch({
        url: '/api/admin/login/delOnlineUsers',
        method: 'delete',
        body:list
    });
}

export function updatePwd(config) {
    return fetch(
        {
            url:'/api/admin/clientUsers/updateClientUserPW',
            method:'POST',
            params:config

        }
    )
}

