import tool from '../utils/stringTools';
const typeMap = {
    count: 4,
    items: [
        {id: '1', name: '学科', isParent: "1"},
        {id: '2', name: '语种', isParent: "1"},
        {id: '3', name: '类型', isParent: "1"},
        {id: '4', name: '试用', isParent: "1"},
        {id: '5', name: '自然科学', isParent: "0", parentId: '1'},
        {id: '6', name: '文史哲类', isParent: "0", parentId: '1'},
        {id: '7', name: '社会学类', isParent: "0", parentId: '1'},
        {id: '8', name: '中文', isParent: "0", parentId: '2'},
        {id: '9', name: '英文', isParent: "0", parentId: '2'},
        {id: '10', name: '俄文', isParent: "0", parentId: '2'},
        {id: '11', name: '全文', isParent: "0", parentId: '3'},
        {id: '12', name: '摘要', isParent: "0", parentId: '3'},
        {id: '13', name: '是', isParent: "0", parentId: '4'},
        {id: '14', name: '否', isParent: "0", parentId: '4'}
    ]
};
export default {
    getTypeList: (type) => {
        const d = typeMap
        console.log(d)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                d.items = typeMap.items.filter(function (item) {
                    if (type.params.hasOwnProperty('parentId') && !tool.isNull(type.params.parentId) && type.params.parentId != item.parentId) {
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
    addType: (type) => {
        console.log(type)
        type.params.id = Math.random()

        if (!type.params.hasOwnProperty('parentId') || tool.isNull(type.params.parentId)) {
            type.params.isParent = '1'
        }
        else{
            type.params.isParent = '0'
        }
        typeMap.items.push(type.params);
        typeMap.count += 1
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: typeMap
                }])
            }, 50)
        })
    },
    updateType: (type) => {
        console.log(type)
        for (var i = 0; i < typeMap.items.length; i++) {
            if (type.params.id == typeMap.items[i].id) {
                typeMap.items[i].name = type.params.name
                if (!type.params.hasOwnProperty('parentId') || tool.isNull(type.params.parentId)) {
                    typeMap.items[i].isParent = '1'
                }
                else {
                    typeMap.items[i].isParent = '0'
                    typeMap.items[i].parentId = type.params.parentId
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

    deleteType: (type) => {
        for (var i = 0; i < typeMap.items.length; i++) {
            if (type.params.id == typeMap.items[i].id) {
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
