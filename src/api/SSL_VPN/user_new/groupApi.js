/**
 * Created by stone on 2017/8/29.
 */
import {fetch,post} from 'utils/fetch';

export function groupAllList() {
    return fetch({
        url: '/api/admin/group/all',
        method: 'get'
    });
}

export function groupList(query) {
    return fetch({
        url: '/api/admin/group',
        method: 'get',
        params: {
            'pageSize': query.pageSize,
            "searchContent": query.searchContent,
            'currentPage': query.currentPage
        }
    });
}
