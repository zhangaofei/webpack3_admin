
import {fetch} from 'utils/fetch';
export function getHeathList(parms) {
    return fetch(
        {
            url: '/api/admin/health',
            method: 'get',
            body: parms,
        }
    )

}