/**
 * Created by stone on 2017/8/30.
 */
import {fetch} from 'utils/fetch';

//获取Host
export  function getHosts(currentPage,pageSize)
{
    return fetch(
        {
            url:'/api/admin/host',
            method:'get',
            params:{
                'currentPage':currentPage,
                'pageSize':pageSize
            }
        }
    )
}

//新增Host
export function createHosts(host)
{
    return fetch(
        {
            url:'/api/admin/host',
            method:'POST',
            body:host
        }
    )
}

//编辑Host
export  function editHosts(host) {
    return fetch(
        {
            url:'/api/admin/host',
            method:'PUT',
            body:host
        }
    )

}

//删除Host
//删除Host
export  function deleteHosts(id) {
    return fetch(
        {
            url:'/api/admin/host',
            method:'DELETE',
            params:{
                ids:id
            }
        }
    )

}

//获取域名
export function getDNSs()
{
    return fetch(
        {
            url:'/api/admin/dns',
            method:'get'
        })

}

//编辑域名
export function editDNSs(config)
{
    return fetch(
        {
            url:'/api/admin/dns',
            method:'PUT',
            params:config
        }
    )
}
//内网域名解析
export function getInnerDomain(config)
{
    return fetch(
        {
            url:'/api/admin/intranetDomain',
            method:'get',
            params:config
            // body:config
        }
    )
}
export function innerDomainAdd(config)
{
    return fetch(
        {
            url:'/api/admin/intranetDomain',
            method:'post',
            body:config
        }
    )
}

export function innerDomainEdit(config)
{
    return fetch(
        {
            url:'/api/admin/intranetDomain',
            method:'put',
            body:config
        }
    )
}
export function innerDomainDel(id,type)
{
    return fetch(
        {
            url:'/api/admin/intranetDomain',
            method:'delete',
            // body:config
            params:{
                ids:id,
                type:type
            }
        }
    )
}
// *************************