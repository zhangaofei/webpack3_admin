/**
 * Created by Administrator on 2017/9/18.
 */
import { fetch } from 'utils/fetch';
export function getMailList(config)
{
    return fetch(
        {
            url: '/api/admin/mail',
            method: 'get',
            // body: config,
            params:config
        }
    )

}
export function putMailList(config)
{
    return fetch(
        {
            url: '/api/admin/mail',
            method: 'put',
            body: config,
        }
    )

}
export function postMailList(config)
{
    return fetch(
        {
            url: '/api/admin/mail',
            method: 'post',
            body: config,
        }
    )

}