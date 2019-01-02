/**
 * Created by Administrator on 2017/8/18.
 */
import {fetch} from 'utils/fetch';

//获取域名
export function getDNSs()
{
    return fetch(
        {
            url:'/api/admin/getDNSs',
            method:'POST'
        })

}
//编辑域名
export function editDNSs(config)
{
    return fetch(
        {
            url:'/api/admin/editDNSs',
            method:'POST',
            params:config
        }
    )
}
//获取Host
export  function getHosts(listQuery)
{
    return fetch(
        {
            url:'/api/admin/getHosts',
            method:'POST',
            params:listQuery
        }
    )
}
//新增Host
export function createHosts(config)
{
    return fetch(
        {
            url:'/api/admin/createHosts',
            method:'POST',
            params:config
        }
    )
}
//编辑Host
export  function editHosts(config) {
    return fetch(
        {
            url:'/api/admin/editHosts',
            method:'POST',
            params:config
        }
    )

}

//删除Host
export  function deleteHosts(id) {
    return fetch(
        {
            url:'/api/admin/deleteHosts',
            method:'POST',
            params:{
                hostsIds:id
            }
        }
    )

}
