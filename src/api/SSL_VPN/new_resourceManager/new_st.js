import {fetch} from 'utils/fetch';

//请求CS数据列表
export function getSTList(currentPage,pageSize,keyword){
    return fetch({
        url: '/api/admin/apps/ST',
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
export function createST(CSInfo){
    return fetch({
        url: '/api/admin/apps/ST',
        method: 'POST',
        body:CSInfo
    });
}

//编辑CS应用
export function editST(id,CSInfo){
    return fetch({
        url: '/api/admin/apps/ST',
        method: 'PUT',
        params:{
            'id':id
        },
        body:CSInfo
    });
}


//删除CS应用
export function delST(id){
    return fetch({
        url: '/api/admin/apps/ST',
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