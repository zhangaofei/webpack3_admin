/**
 * Created by Administrator on 2017/8/18.
 */
/**
 * Created by ENLINK on 2017/6/28.
 */
/**
 * Created by zuce wei on 2017/6/26.
 */
import {fetch,post} from 'utils/fetch';

export function groupList(query) {
    return fetch({
        url: '/api/admin/groupManager/getGroups',
        method: 'get',
        params: {
            'page_size': query.pageSize,
            "search_content": query.searchContent,
            'cur_page': query.currentPage
        }
    });
}
export function groupAppList(currentPage,pageSize,list) {
    return fetch({
        url: '/api/admin/groupManager/getGroupsApps',
        method: 'post',
        body: {
            'page_size': pageSize,
            'cur_page': currentPage,
            'gAppsTypeList': list,
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
        url: '/api/admin/groupManager/addGroup',
        method: 'post',
        body: group
    });
}

export function delGroup(list) {
    return fetch({
        url: '/api/admin/groupManager/delGroups',
        method: 'delete',
        body:list
    });
}


