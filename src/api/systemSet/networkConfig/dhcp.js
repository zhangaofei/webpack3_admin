// noinspection JSAnnotator
import {fetch} from 'utils/fetch';

// 获取DHCP状态列表
// noinspection JSAnnotator
export function getDHCPListData (options) {
    return fetch(
        {
            url: '/api/admin/dhcp/dhcpleases',
            method: 'GET',
            params: options,
        }
    )

};

// 获取DHCP设置数据
export function getDHCPSetData (options) {
    return fetch(
        {
            url: '/api/admin/dhcp/dhcp',
            method: 'GET',
            params: options,
        }
    )

};

// 获取所有网卡

export function getDHCPAllDevice( options ){
    return fetch(
        {
            url: '/api/admin/netInterface/allNetInterface',
            method: 'GET',
            params: options
        }
    )
};

// 提交页面数据
// noinspection JSAnnotator
export function putDHCPSetData( options ){
    return fetch(
        {
            url: '/api/admin/dhcp/dhcp',
            method: 'PUT',
            body: options
        }
    )
};
