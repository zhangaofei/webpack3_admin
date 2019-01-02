/**
 * Created by Administrator on 2017/9/19.
 */
import { fetch } from 'utils/fetch';
export function getAdminList()
{
    return fetch(
        {
            url: '/api/enwas/config/list',
            method: 'post',
            body: '',
        }
    )

}
export function ModAdminList(parmas)
{
    console.log(parmas,'parmas')
    return fetch(
        {
            url: '/api/enwas/config/modify',
            method: 'post',
            body: parmas,
        }
    )

}