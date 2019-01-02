/**
 * Created by Administrator on 2017/8/18.
 */
import { fetch } from 'utils/fetch';

const method = 'get';
//请求序列号
export function updateLicense(config)
{
    return fetch(
        {
            url: '/api/admin/license/updateLicense',
            method: 'POST',
            body: config
        }
    )

}
//获取License信息
export function getLicInfo(name)
{
    return fetch(
        {
            url: '/api/admin/license/getLicInfo',
            method: method,
            params:{
                'module' :name
            }
        }
    )
}
//获取硬件ID
export function getHardWareID()
{
    return fetch(
        {
            url:'/api/admin/license/getHardWareID',
            method:method
        }
    )
}
//获取license各模块的状态
export function getModuleStatus() {
    return fetch({
        url: '/api/admin/license/getModuleStatus',
        method: method
    })
}
//获取系统运行时间
export function getRunTime() {
    return fetch({
        url: '/api/admin/sysTool/runTime',
        method: 'GET'
    })
}