import {fetch} from 'utils/fetch';

export function featureReview(ids,ifPass) {
    return fetch({
        url: '/api/admin/signatureMag/audit',
        method: 'post',
        params: {
            ids:ids,
            ifPass:ifPass
        }
    });
}