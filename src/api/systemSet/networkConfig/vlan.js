/**
 * Created by chenxl on 2017/12/23.
 */

import {fetch} from 'utils/fetch';

export function getNetInterface (options) {
    return fetch ({
        url: '/api/admin/netInterface/allNetInterface',
        method: 'get',
        params: options
    })
};
export function getVlanList (options) {
    return fetch ({
        url: '/api/admin/vlanandtrunk/vlanandtrunks',
        method: 'get',
        params: options
    })
};


export function addNewVlan (options) {
    return fetch ({
        url: '/api/admin/vlanandtrunk/newvlanandtrunk',
        method: 'PUT',
        body: options
    })
};

export function deleteVlan (options) {
    return fetch ({
        url: '/api/admin/vlanandtrunk/delvlanandtrunk',
        method: 'DELETE',
        body: options
    })
};

export function delAllVlan (options) {
    return fetch ({
        url: '/api/admin/vlanandtrunk/delvlanandtrunks',
        method: 'DELETE',
        body: options
    })
};

export function editVlan (options) {
    return fetch ({
        url: '/api/admin/vlanandtrunk/updatevlanandtrunk',
        method: 'PUT',
        body: options
    })
};

export function reRepeat (options) {
    return fetch ({
        url: '/api/admin/vlanandtrunk/repeatvlanid',
        method: 'get',
        params: options
    })
};