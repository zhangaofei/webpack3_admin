/**
 * Created by ENLINK on 2017/6/23.
 */
import {fetch} from 'utils/fetch';

export function allUserRules() {

    return fetch({
        url: '/api/admin/user_rules/get_all_user_rules',
        method: 'get'
    });
}