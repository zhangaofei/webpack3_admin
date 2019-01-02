/**
 * Created by Administrator on 2017/9/20.
 */
import {fetch} from 'utils/fetch';

export function getSmartLinkList(param)
{
    return fetch(
        {
            url:'/api/enwas/smartLink/list',
            method:'post',
            body: param
        })

}
export function smartLinkAdd(param)
{
    return fetch(
        {
            url:'/api/enwas/smartLink/add',
            method:'post',
            body: param
        })

}
export function smartLinkEdit(param)
{
    return fetch(
        {
            url:'/api/enwas/smartLink/modify',
            method:'post',
            body: param
        })

}
export function smartLinkDel(param)
{
    return fetch(
        {
            url:'/api/enwas/smartLink/del',
            method:'post',
            // params: param,
            body: param
        })

}

export function setSmartLink(param)
{
    return fetch(
        {
            url:'/api/admin/smartLink/setSmartLink',
            method:'PUT',
            body: param
        })

}