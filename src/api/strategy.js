/**
 * Created by zuce wei on 2017/7/18.
 */
import {fetch} from "../utils/fetch";



/*****
 * 获取所有的用户策略
 * ***/
export function allUserStragetyList() {
    return fetch({
        url: '/api/admin/user_rules/get_all_user_rules',
        method: 'get'
    })
}