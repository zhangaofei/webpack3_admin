import {fetch} from 'utils/fetch';

export function featureCollectListBind(ids,ifPass) {
    return fetch({
        url: '/api/admin/signatureMag/binding',
        method: 'post',
        params: {
            ids:ids,
            ifPass:ifPass
        }
    });
}