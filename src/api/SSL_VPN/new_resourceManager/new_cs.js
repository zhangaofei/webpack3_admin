/**
 * Created by stone on 2017/9/4.
 */
import {fetch} from 'utils/fetch';

//请求CS数据列表
export function getCSList(currentPage,pageSize,keyword){
    return fetch({
        url: '/api/admin/apps/Client',
        method: 'GET',
        params:
            {
            'currentPage':currentPage,
                'pageSize':pageSize,
                'keyword':keyword
        }
    });
}

//新建CS应用
export function createCS(CSInfo){
    return fetch({
        url: '/api/admin/apps/Client',
        method: 'POST',
        body:CSInfo
    });
}

//编辑CS应用
export function editCS(id,CSInfo){
    return fetch({
        url: '/api/admin/apps/Client',
        method: 'PUT',
        params:{
            'id':id
        },
        body:CSInfo
    });
}


//删除CS应用
export function delCS(id){
    return fetch({
        url: '/api/admin/apps/Client',
        method: 'DELETE',
        params: {
            'ids':id
        }
    });
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

