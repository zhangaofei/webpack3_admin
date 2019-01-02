import tool from '../utils/stringTools';
const userMap = {
    // count: 2,
    // items: [
    //     {id: '123456789', name: 'wjc1', phone: '13851670592', isAdmin: "1", password: '123456', display_name: 'wjc1'},
    //     {id: '987654321', name: 'wjc2', phone: '13851670592', isAdmin: "2", password: '123456', display_name: 'wjc2'}
    // ],
    status:"SUCCESS",
    code:null,
    data:[{"id":1,"ruleId":-1,"groupId":-1,"authId":-1,"authType":"00","userName":"张三","password":"","fullName":"","tel":"","email":"","isSyncGroupRule":0,"type":1,"status":"Disabled","createTime":null,"createAdministrator":-1,"lastUpdateTime":1497600992000,"lastUpdateUser":-1,"operatorType":1,"deleteflag":0},{"id":2,"ruleId":-1,"groupId":-1,"authId":-1,"authType":"00","userName":"李四","password":"","fullName":"","tel":"","email":"","isSyncGroupRule":0,"type":1,"status":"Disabled","createTime":null,"createAdministrator":-1,"lastUpdateTime":1497600999000,"lastUpdateUser":-1,"operatorType":1,"deleteflag":0}],
    extend:{"search_content":"","page":{"pageSize":10,"currentPage":1,"totalPages":1,"totalRows":2,"pageStartRow":0,"pageEndRow":2,"pagination":false,"hasNextPage":false,"hasPreviousPage":false,"pagedView":null,"pagedDiv":null,"goodsPageDiv":null,"grouponPath":null}}
};
export default {

    getUserList: (user) => {
        const d = userMap
        console.log("user js------",user)
        console.log(d)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: d
                }])
            }, 50)
        })
    },
    addUser: (user) => {
        console.log(user)
        user.params.id = Math.random()
        userMap.items.push(user.params);
        userMap.count += 1
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: userMap
                }])
            }, 50)
        })
    },
    updateUser: (user) => {
        console.log(user)
        for (var i = 0; i < userMap.items.length; i++) {
            if (user.params.id == userMap.items[i].id) {
                userMap.items[i].name = user.params.name
                userMap.items[i].phone = user.params.phone
                userMap.items[i].isAdmin = user.params.isAdmin
                userMap.items[i].display_name = user.params.display_name
                if (!(user.params == "" || user.params == undefined || user.params == null || !user.params.hasOwnProperty('password'))) {
                    userMap.items[i].password = user.params.password
                }
                console.log(userMap.items[i])
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: userMap
                }])
            }, 50)
        })
    },
    deleteUser: (user) => {

        for (var i = 0; i < userMap.items.length; i++) {
            if (user.params.id == userMap.items[i].id) {
                userMap.items.splice(i, 1);
                break
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    data: userMap
                }])
            }, 50)
        })
    }
};
