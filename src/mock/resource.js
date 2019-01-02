import tool from '../utils/stringTools';
const typeMap = {
    count: 4,
    items: [
        {id: '1', name: '知网', url: "cnki.net", protocol:'http', describe:'资源描述'},
        {id: '2', name: '万方', url: "www.wanfangdata.com.cn", protocol:'http', describe:'资源描述'},
        {id: '3', name: '维普', url: "www.cqvip.com", protocol:'http', describe:'资源描述'},
        {id: '4', name: '超星', url: "www.sslibrary.com", protocol:'http', describe:'资源描述'}
    ]
};
export default {
    getResourceList: (resource) => {
        const d = typeMap
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                d.items = typeMap.items.filter(function (item) {
                    if (resource.params.hasOwnProperty('name') && !tool.isNull(resource.params.name) &&  -1 == item.name.indexOf(resource.params.name)) {
                        return false
                    }
                    return true
                })
                resolve([200, {
                    data: d
                }])
            }, 50)
        })
    },
    addResource: (resource) => {
        console.log(resource)
        resource.params.id = Math.random();
        if (!resource.params.hasOwnProperty('parentId') || tool.isNull(resource.params.parentId)) {
            resource.params.isParent = '1'
        }
        else{
            resource.params.isParent = '0'
        }
        typeMap.items.push(resource.params);
        typeMap.count += 1
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: typeMap
                }])
            }, 50)
        })
    },
    updateResource: (resource) => {
        console.log(resource)
        for (var i = 0; i < typeMap.items.length; i++) {
            if (resource.params.id == typeMap.items[i].id) {
                typeMap.items[i].name = resource.params.name
                if (!resource.params.hasOwnProperty('parentId') || tool.isNull(resource.params.parentId)) {
                    typeMap.items[i].isParent = '1'
                }
                else {
                    typeMap.items[i].isParent = '0'
                    typeMap.items[i].parentId = resource.params.parentId
                }
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: typeMap
                }])
            }, 50)
        })
    },
    deleteResource: (resource) => {
        for (var i = 0; i < typeMap.items.length; i++) {
            if (resource.params.id == typeMap.items[i].id) {
                typeMap.items.splice(i, 1);
                break
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: typeMap
                }])
            }, 50)
        })
    }
};
