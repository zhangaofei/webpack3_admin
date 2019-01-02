/**
 * Created by Administrator on 2017/9/19.
 */
import { fetch } from 'utils/fetch';
export function getServerTime(parmas)
{
    return fetch(
        {
            url: '/api/admin/sysTool/nowTime',
            method: 'post',
            body: parmas,
        }
    )

}
export function updateTime(parmas)
{
    return fetch(
        {
            url: '/api/admin/sysTool/timeAndTimezone',
            method: 'put',
            body: parmas,
        }
    )
}
export function nowSyncTime(parmas)
{
    return fetch(
        {
            url: '/api/admin/sysTool/nowNtpServer',//立即同步
            method: 'put',
            body: parmas,
        }
    )
}
export function syncTime(parmas)
{
    return fetch(
        {
            url: '/api/admin/sysTool/ntpServer',//确定同步
            method: 'put',
            body: parmas,
        }
    )
}
//
export function onlyGetNowtime(parmas)
{
    return fetch(
        {
            url: '/api/admin/sysTool/nowTimeForLocal',//确定同步
            method: 'post',
            body: parmas,
        }
    )
}
