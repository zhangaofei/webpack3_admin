/**
 * Created by Administrator on 2017/7/20.
 */
import {fetch} from 'utils/fetch';

//请求CS数据列表
export function getCSList(config){
    return fetch({
        url: '/api/admin/apps/getCSList',
        method: 'get',
        params: config
    });
}


//删除单个应用
export function delCS(params){
    return fetch({
        url: '/api/admin/apps/delApps',
        method: 'delete',
        params: params
    });
}

//新建应用
export function addCS(config){
    return fetch({
        url: '/api/admin/apps/addApps',
        method: 'post',
        params: config
    });
}

//应用编辑
export function editCS(config){
    return fetch({
        url: '/api/admin/apps/editApps',
        method: 'post',
        params: config
    });
}

//获取所有应用资源图标列表
export function getAppsIcon(config){
    return fetch({
        url: '/api/admin/apps/icon/getIconsList',
        method: 'get',
        params: config
    });
}

//检测用户名是否重复
export function checkApps(config)
{
    return fetch(
        {
            url:'/api/admin/apps/isExistApps',
            method:'psot',
            params:config
        }
    )
}
export function isExistUser(param) {
    return fetch({
        url: '/api/admin/apps/isExistApps',
        method: "get",
        params: param
    });
}
