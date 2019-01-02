/**
 * Created by stone on 2017/8/29.
 */
import {fetch,post} from 'utils/fetch';
//获取用户数据
export function userList(currentPage, pageSize,searchContent) {
    return fetch({
        url: '/api/admin/user',
        method: 'get',
        params: {
            'pageSize':pageSize,
            "searchContent": searchContent,
            'currentPage': currentPage}
    });
}
export function downOption(parm) {
    console.log(parm,'parm')
    return fetch({
        url: '/api/admin/user/download',
        method: 'get',
        params: parm


    });
}
//新建用户
export function addClientUser(userDTO) {
    return fetch({
        url: '/api/admin/user',
        method: 'post',
        body: userDTO
    });
}

//更新用户数据
export function updateClientUser(user) {
    return fetch({
        url: '/api/admin/user',
        method: 'put',
        body: user
    });
}

//删除用户数据
export function delClientUser(deleteDTO) {
    return fetch({
        url: '/api/admin/user',
        method: 'delete',
        params: deleteDTO
    });
}

//获取在线用户
export function getOnlineUser(currentPage,pageSize,keyWord) {
    return fetch({
        url: '/api/admin/auth/onlineUsers',
        method: 'GET',
        params: {
          'currentPage':currentPage,
            'pageSize':pageSize,
            'condition':keyWord
        }
    });
}

//删除在线用户
export function removeOnlineUser(sessionIds) {
    return fetch({
        url: '/api/admin/auth/onlineUsers',
        method:'DELETE',
        params:{
            'sessionIds':sessionIds
        }
    });
}

//修改客户端密码
export function updatePwd(pwd) {
    return fetch(
        {
            url:'/api/admin/user/changePassword',
            method:'POST',
            body:pwd

        }
    )

}
//模板下载
export function downloadModel() {
    return fetch(
        {
            url:'/api/admin/user/templet',
            method:'GET'
        }
    )

}
//拓展Background
export function getBackgroundList() {
    return fetch(
        {
            url:'/api/enwas/upload/listForBackImagOrLogo',
            method:'post'
        }
    )

}
/*获取baseInfo*/
export function getBaseInfo(param) {
    return fetch(
        {
            url:'/api/enwas/system/listForClient',
            method:'post',
            body:param
        }
    )

}
//修改背景
export function changeBackground(param) {
    return fetch(
        {
            url:'/api/enwas/upload/changeBackImagOrLogoStatus',
            method:'post',
            body:param
        }
    )

}
// /api/enwas/system/modifyClinetShow
//管理端修改客户端信息
export function changeClientInfo(param) {
    return fetch(
        {
            url:'/api/enwas/system/modifyClientShow',
            method:'post',
            body:param
        }
    )

}
/*版本管理*/
export function getVersionList(param) {
    return fetch({
        url: '/api/enwas/version/list',
        method: 'post',
        body:param
    });
}
export function delVersion(param) {
    return fetch({
        url: '/api/enwas/version/del',
        method: 'post',
        body:param
    });
}

