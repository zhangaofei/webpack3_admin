import {fetch} from 'utils/fetch';

export function hardwareCommon(params) {
    return fetch({
        url: '/api/admin/signatureMag',
        method: 'get',
        // params: {
            // 'pageSize':pageSize,
            // "searchContent": searchContent,
            // 'currentPage': currentPage,
            // 'flag':flag
        // },
        params:params
    });
}