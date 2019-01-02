import tool from '../utils/stringTools';
const rdpMap = {
    count: 31,
    items: [
        {id: '1', name: 'wjc1', phone: '13851670234', isAdmin: "1", password: '123456', display_name: 'wjc1'},
        {id: '2', name: 'wjc2', phone: '13851670523', isAdmin: "1", password: '123456', display_name: 'wjc2'},
        {id: '3', name: 'wjc3', phone: '13851265477', isAdmin: "0", password: '123456', display_name: 'wjc3'},
        {id: '4', name: 'wjc4', phone: '13851616528', isAdmin: "0", password: '123456', display_name: 'wjc4'},
        {id: '5', name: 'wjc5', phone: '13826570592', isAdmin: "0", password: '123456', display_name: 'wjc5'},
        {id: '6', name: 'wjc6', phone: '18344670592', isAdmin: "0", password: '123456', display_name: 'wjc6'},
        {id: '7', name: 'wjc7', phone: '13876350592', isAdmin: "0", password: '123456', display_name: 'wjc7'},
        {id: '8', name: 'wjc8', phone: '13885370592', isAdmin: "0", password: '123456', display_name: 'wjc8'},
        {id: '9', name: 'wjc9', phone: '13851638902', isAdmin: "1", password: '123456', display_name: 'wjc9'},
        {id: '10', name: 'wjc10', phone: '13289150592', isAdmin: "1", password: '123456', display_name: 'wjc10'},
        {id: '11', name: 'wjc11', phone: '13245189945', isAdmin: "1", password: '123456', display_name: 'wjc11'},
        {id: '12', name: 'wjc12', phone: '13852560592', isAdmin: "0", password: '123456', display_name: 'wjc12'},
        {id: '13', name: 'wjc13', phone: '13851670992', isAdmin: "1", password: '123456', display_name: 'wjc13'},
        {id: '14', name: 'wjc14', phone: '13853330592', isAdmin: "0", password: '123456', display_name: 'wjc14'},
        {id: '15', name: 'wjc15', phone: '13866666592', isAdmin: "1", password: '123456', display_name: 'wjc15'},
        {id: '16', name: 'wjc16', phone: '13866666592', isAdmin: "1", password: '123456', display_name: 'wjc16'},
        {id: '17', name: 'wjc17', phone: '13866666592', isAdmin: "1", password: '123456', display_name: 'wjc17'},
        {id: '18', name: 'wjc18', phone: '13866666592', isAdmin: "1", password: '123456', display_name: 'wjc18'},
        {id: '19', name: 'wjc19', phone: '13866666592', isAdmin: "1", password: '123456', display_name: 'wjc19'},
        {id: '20', name: 'wjc20', phone: '13866666592', isAdmin: "1", password: '123456', display_name: 'wjc20'},
        {id: '21', name: 'wjc21', phone: '13851670234', isAdmin: "1", password: '123456', display_name: 'wjc21'},
        {id: '22', name: 'wjc22', phone: '13851670523', isAdmin: "1", password: '123456', display_name: 'wjc22'},
        {id: '23', name: 'wjc23', phone: '13851265477', isAdmin: "0", password: '123456', display_name: 'wjc23'},
        {id: '24', name: 'wjc24', phone: '13851616528', isAdmin: "0", password: '123456', display_name: 'wjc24'},
        {id: '25', name: 'wjc25', phone: '13826570592', isAdmin: "0", password: '123456', display_name: 'wjc25'},
        {id: '26', name: 'wjc26', phone: '18344670592', isAdmin: "0", password: '123456', display_name: 'wjc26'},
        {id: '27', name: 'wjc27', phone: '13876350592', isAdmin: "0", password: '123456', display_name: 'wjc27'},
        {id: '28', name: 'wjc28', phone: '13885370592', isAdmin: "0", password: '123456', display_name: 'wjc28'},
        {id: '29', name: 'wjc29', phone: '13851638902', isAdmin: "1", password: '123456', display_name: 'wjc29'},
        {id: '30', name: 'wjc30', phone: '13851638902', isAdmin: "1", password: '123456', display_name: 'wjc30'},
        {id: '31', name: 'wjc31', phone: '13851638902', isAdmin: "1", password: '123456', display_name: 'wjc31'},
    ]
};
export default {
    getRdpList: (rdp) => {
        console.log(rdp.params);
        let result = {
            count: 0,
            total: 0,
            items: []
        };
        // 首先传过来的参数都放在rdp.params里面,我分别用page和size代表传递过来的page和size,(page-1)*size意思是把页码转换成对应的第几条
        // 比如第一页就是从(1-1)*10, 第0条开始,第二页是(2 - 1) * 10, 第10条开始,如果请求的长度没有超过rdpMap的items长度,
        // 从rdpMap.items里截取(page-1)*size到page*size, 刚好一页的数据,赋值给result.items,
        // array.slice(start, end)返回数组的从start到end的元素,
        let page = parseInt(rdp.params.page), size = parseInt(rdp.params.size);
        if (rdpMap.items.length > (page - 1) * size) {
            result.items = rdpMap.items.slice((page - 1) * size, page * size);
            result.count = result.items.length;
        }
        result.total = rdpMap.items.length;
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve([200, {
                    status:1,
                    data: result
                }])
            }, 50)
        })
    },
    addRdp: (rdp) => {
        console.log(rdp)
        rdp.params.id = Math.random()
        rdpMap.items.push(rdp.params);
        rdpMap.count += 1
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    status: 1,
                    data: rdpMap
                }])
            }, 50)
        })
    },
    updateRdp: (rdp) => {
        console.log(rdp)
        for (var i = 0; i < rdpMap.items.length; i++) {
            if (rdp.params.id == rdpMap.items[i].id) {
                rdpMap.items[i].name = rdp.params.name
                rdpMap.items[i].phone = rdp.params.phone
                rdpMap.items[i].isAdmin = rdp.params.isAdmin
                rdpMap.items[i].display_name = rdp.params.display_name
                if (!(rdp.params == "" || rdp.params == undefined || rdp.params == null || !rdp.params.hasOwnProperty('password'))) {
                    rdpMap.items[i].password = rdp.params.password
                }
                console.log(rdpMap.items[i])
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    status: 1,
                    data: rdpMap
                }])
            }, 50)
        })
    },
    deleteRdp: (rdp) => {
        //删除单个rdp
        console.log('deleteRdp rdp:' + JSON.stringify(rdp.params));
        for (let i = 0; i < rdpMap.items.length; i++) {
            if (rdp.params.id == rdpMap.items[i].id) {//找到rdpMap.items中的对应项
                rdpMap.items.splice(i, 1);//删除
                break;
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    status: 1,
                    data: rdpMap
                }])
            }, 50)
        })
    },
    multiDelete: (rdps) => {//批量删除R
        for (let i = 0; i < rdpMap.items.length; i++) {
            for (let j = 0; j < rdps.params.length; j++) {
                if (rdps.params[j] == rdpMap.items[i].id) {// 找到rdpMap.items中对应项
                    rdpMap.items.splice(i, 1);//从rdpmap中删除
                    rdps.params.splice(j, 1); // 已删除的对应参数也删掉
                    i--;// 由于数组当前项被删除, 所以后面项的位置都向前移动了1
                    break;
                }

            }

        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    status: 1,
                    data: rdpMap
                }])
            }, 50)
        })
    }
};
