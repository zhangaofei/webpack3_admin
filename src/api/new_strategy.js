/**
 * Created by stone on 2017/8/29.
 */
import {fetch} from "../utils/fetch";

/*****
 * 获取所有的用户策略
 * ***/
export function allUserStragetyList() {
    return fetch({
        url: '/api/admin/rule/all',
        method: 'get'
    })
}