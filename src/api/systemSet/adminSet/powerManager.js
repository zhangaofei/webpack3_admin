/**
 * Created by Administrator on 2017/8/18.
 */
import { fetch } from 'utils/fetch';

export function powerList(currentPage, pageSize,searchContent) {
    return fetch({
        url: '/api/admin/power/getPowers',
        method: 'get',
        params: {
            'page_size':pageSize,
            "search_content": searchContent,
            'cur_page': currentPage}
    });
}


export function addPower(power) {
    return fetch({
        url: '/api/admin/power/addPower',
        method: 'post',
        params: power
    });
}


export function updatePower(power) {
    return fetch({
        url: '/api/admin/power/editPower',
        method: 'post',
        params: power
    });
}

export function delPower(id_name) {
    return fetch({
        url: '/api/admin/power/delPower',
        method: 'delete',
        params: {
            'pid_pname':id_name
        }
    });
}