/**
 * Created by stone on 2017/9/4.
 */
import {fetch} from 'utils/fetch';

//获取L3Net 列表
export function getL3NetList(currentPage,pageSize,keyword) {
    return fetch ({
        url: '/api/admin/apps/L3Net',
        method: 'GET',
        params:
            {
                'currentPage':currentPage,
                'pageSize':pageSize,
                'keyword':keyword
            }
    })
}

//新建L3应用
export function createL3(L3Info){
    return fetch({
        url: '/api/admin/apps/L3Net',
        method: 'POST',
        body:L3Info
    });
}

//编辑L3应用
export function editL3(id,L3Info){
    return fetch({
        url: '/api/admin/apps/L3Net',
        method: 'PUT',
        params:{
            'id':id
        },
        body:L3Info
    });
}

//删除L3Net应用
export function delL3Net(id) {
    return fetch ({
        url: '/api/admin/apps/L3Net',
        method: 'DELETE',
        params:
            {
                'ids':id
            }
    })
}

//获取应用策略列表
export function getPolicies(id){
    return fetch({
        url: '/api/admin/apps/policies',
        method: 'get',
        params: {
            'appId':id
        }
    });
}
//获取虚拟网络
export function getSystemConfig(){
    return fetch({
        url: '/api/admin/systemConfig',
        method: 'GET'
    });
}
//编辑虚拟网络
export function editSystemConfig(param){
    return fetch({
        url: '/api/admin/systemConfig',
        method: 'POST',
        body:param
    });
}