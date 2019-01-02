/**
 * Created by Administrator on 2017/9/19.
 */
import {fetch} from 'utils/fetch';
export function getPracticalTool(config) {
    return fetch(
        {
            url: '/api/admin/sysTool/command/exe',
            method: 'post',
            body: config,
            // params: config
        }
    )

}