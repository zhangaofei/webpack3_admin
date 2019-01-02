/**
 * Created by stone on 2017/9/1.
 */
import {fetch} from 'utils/fetch';

//获取RDP列表
export function getRdpList(currentPage,pageSize,keyword) {
    return fetch ({
        url: '/api/admin/apps/RDP',
        method: 'GET',
        params: {
            'currentPage':currentPage,
            'pageSize':pageSize,
            'keyword':keyword
        }
    })
}

//新建RDP
export function createRdp(rdpInfo) {
    return fetch ({
        url: '/api/admin/apps/RDP',
        method: 'POST',
        body:rdpInfo
    })
}
//更新RDP
export function editRdp(id,rdpInfo) {
    return fetch ({
        url: '/api/admin/apps/RDP',
        method: 'PUT',
        params:
            {
                'id':id
            },
        body:rdpInfo
    })
}

//删除RDP应用
export function deleteRdp(id) {
    return fetch ({
        url: '/api/admin/apps/RDP',
        method: 'delete',
        params: {
            'ids':id
        }
    })
}