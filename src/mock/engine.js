import tool from '../utils/stringTools';
const ruleMap = {
    count: 4,
    items: [
        {id: '1', name: '规则1', partId:'1', describe:'测试1'},
        {id: '2', name: '规则2', partId:'1', describe:'测试2'},
        {id: '3', name: '规则3', partId:'2', describe:'测试3'},
        {id: '4', name: '规则4', partId:'2', describe:'测试4'}
    ]
};
export default {
    getRuleList: (rule) => {
        const d = ruleMap
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                d.items = ruleMap.items.filter(function (item) {
                    if (rule.params.hasOwnProperty('name') && !tool.isNull(rule.params.name) &&  -1 == item.name.indexOf(rule.params.name)) {
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
    addRule: (rule) => {
        rule.params.id = Math.random();
        ruleMap.items.push(rule.params);
        ruleMap.count += 1
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: ruleMap
                }])
            }, 50)
        })
    },
    updateRule: (rule) => {
        for (var i = 0; i < ruleMap.items.length; i++) {
            if (rule.params.id == ruleMap.items[i].id) {
                ruleMap.items[i].name = rule.params.name
                if (!rule.params.hasOwnProperty('parentId') || tool.isNull(rule.params.parentId)) {
                    ruleMap.items[i].isParent = '1'
                }
                else {
                    ruleMap.items[i].isParent = '0'
                    ruleMap.items[i].parentId = rule.params.parentId
                }
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: ruleMap
                }])
            }, 50)
        })
    },
    deleteRule: (rule) => {
        for (var i = 0; i < ruleMap.items.length; i++) {
            if (rule.params.id == ruleMap.items[i].id) {
                ruleMap.items.splice(i, 1);
                break
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: ruleMap
                }])
            }, 50)
        })
    }
};
