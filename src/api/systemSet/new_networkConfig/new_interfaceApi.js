/**
 * Created by stone on 2017/8/31.
 */
import {fetch} from 'utils/fetch';

//获取物理接口，虚拟接口(分页)
export function getNetList(currentPage,pageSize,isVirtual) {
    return fetch ({
        url: '/api/admin/netInterface',
        method: 'GET',
        params: {
            'currentPage':currentPage,
            'pageSize':pageSize,
            'isVirtual':isVirtual
        }
    })
}

//编辑物理接口
export function editNetInfo(editInfo) {
    return fetch ({
        url: '/api/admin/netInterface',
        method: 'PUT',
        body: editInfo
    })
}

//新建虚拟接口
export function addVirtaulNet(virInfo) {
    return fetch ({
        url: '/api/admin/netInterface',
        method: 'POST',
        body: virInfo
    })
}

//修改虚拟接口
export function editVirtaulNet(virInfo) {
    return fetch ({
        url: '/api/admin/netInterface',
        method: 'PUT',
        body: virInfo
    })
}

//删除虚拟接口
export function delVirNet(id) {
    return fetch ({
        url: '/api/admin/netInterface',
        method: 'DELETE',
        params:  {
            'ids':id
        }

    })
}

//链路聚合获取所有物理接口名
export function getPhyNetNameList() {
    return fetch ({
        url: '/api/admin/netInterface/name',
        method: 'get'
    })
}
//获取桥接list
export function getBridgeList(param) {
    return fetch ({
        url: '/api/admin/netInterface/bridge',
        method: 'get',
        params:param
    })
}
//桥接add
export function getBridgeAdd(param) {
    return fetch ({
        url: '/api/admin/netInterface/bridge',
        method: 'post',
        body:param
    })
}
//桥接add
export function getBridgeEdit(param) {
    return fetch ({
        url: '/api/admin/netInterface/bridge',
        method: 'put',
        body:param
    })
}
//桥接del
export function bridgeDel(param) {
    // alert(param)
    return fetch ({
        url: '/api/admin/netInterface/bridge',
        method: 'delete',
        params:  param
        // params:
    })
}

/* 4g网络接口 start */
// 启动4g网络
export function start4gNet(param) {
	return fetch ({
		url: '/api/admin/netInterface/4g/start',
		method: 'get',
		params:param
	})
};

// 停止4g网络
export function stop4gNet() {
	return fetch ({
		url: '/api/admin/netInterface/4g/stop',
		method: 'get'
	})
};

// 停止4g网络
export function info4gNet() {
	return fetch ({
		url: '/api/admin/netInterface/4g/info',
		method: 'get'
	})
};

// 停止4g网络
export function bindDns(param) {
	return fetch ({
		url: '/api/admin/netInterface/4g/ddns',
		method: 'post',
		body:param
	})
};

/* 4g网络接口 end */

