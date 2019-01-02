
/*
 * @Author: 陈兴林 blackbear
 * @Email: 15996352480@163.com
 * @Date:   2017-11-27  02:36:11
 * @Last Modified time: 2018-01-07 03:07:13
 *
 * 数组归类重组方法
 * classFiction([arg1,agr2,agr3]);
 * 参数三个都是可选，不传参数，保持原数组不变
 *
 *
 **/

if(!Array.prototype.classFiction){
    Array.prototype.classFiction = function (){
        var moth = [],
            flag = 0,
            list = this;
        var wdy = {};

        for (var i = 0; i < list.length; i++) {
            var az = '';
            for (var j = 0; j < moth.length; j++) {
                if (moth[j][arguments[0]] == list[i][arguments[0]]) {
                    if(arguments[1]){
                        if(arguments[2]){
                            if (moth[j][arguments[2]] == list[i][arguments[2]]) {
                                flag = 1;
                                az = j;
                                break;
                            }
                        }else{
                            if (moth[j][arguments[1]] == list[i][arguments[1]]) {
                                flag = 1;
                                az = j;
                                break;
                            }
                        }
                    }else{
                        flag = 1;
                        az = j;
                        break;
                    }
                }
            };
            if (flag == 1) {
                var ab = moth[az];
                ab.datas.push(list[i]);
                flag = 0;

            } else if (flag == 0) {
                wdy = {};
                for(var m = 0; m < arguments.length; m++){
                    wdy[arguments[m]] = list[i][arguments[m]]
                }
                wdy.datas = new Array();
                wdy.datas.push(list[i]);
                moth.push(wdy);
            }
        };
        return moth;
    };
};
import {
    getDHCPListData,
    getDHCPSetData,
    getDHCPAllDevice,
    putDHCPSetData
} from "../../api/systemSet/networkConfig/dhcp";

const dhcp = {
    state: {
        id: 10001,
        regIp: /^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$/,
        regMask: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)|(\d|\w)(\w|\d)\:(\d|\w)(\w|\d)\:(\d|\w)(\w|\d)\:(\d|\w)(\w|\d)$/,
        reservedSelectValue: '',// 预留ip的select值
        isEditPage: false,      // 页面是否可编辑状态
        listData: [],           // 状态页面表格数据
        total: 0,               // 设置页面 分配范围 表格数据条数
        dhcpSetDatas: {},       // 设置页面 预留IP 表格数据
        dhcpRangeData: null,    // 设置页面 分配范围 表格数据
        reservedIpTotal: 0,     // 设置页面 预留IP 表格数据条数
        serverStatus: '',       // 服务状态
        serverLeaseTime: '',    // 服务状态 租期时间
        initRangeDialog: {      // 初始化 分配范围 弹框数据
            value: '',
            subnet: '',
            dns1: '',
            dns2: '',
            ranges: '',
            netmask: '',
            routers: '',
            dhcpIpList: [],
            device: ''
        },
        initReservedDialog: [   // 初始化 预置IP 弹框数据
            {
                device: '',
                id: '',
                mac: '',
                ip: '',
                value: ''
            }
        ],
        allDevice: null,
        allDeviceBackup: null,
        status: '',
        cancleEditDisRangeData: '',
        cancleEditReservedIp: ''
    },
    mutations: {
        // 获取DHCP状态 数据
        getDHCPstate (state, options) {
            getDHCPListData(options.option).then( res => {
                if(res.status == "SUCCESS"){

                    const list = res.data.leases;
                    for (var i = 0; i < list.length; i++) {
                        if(list[i].leasetime < 0){
                            list[i].leasetime = 0;
                        }
                    };
                    state.listData = list;
                    state.total = res.data.size;
                    state.status = res.data.status;
                    if(options.type && options.type == "uplate"){
                        options.ele.$message({
                            type: 'success',
                            message: '刷新成功'
                        });
                    };
                    if(options.type && options.type == "search" && list.length == 0){
                        options.ele.$message({
                            type: 'warning',
                            message: '该条件下暂无数据'
                        });
                    };

                }
            }).catch( res => {
                options.ele.$message({
                    type: 'error',
                    message: res.status
                });
            });
        },
        // 获取DHCP设置数据
        getDHCPSets (state, options) {
            getDHCPSetData(options.option).then(res => {
                if(res.status == "SUCCESS"){
                    state.dhcpSetDatas = res.data;
                    state.reservedIpTotal = res.data.dhcpIpList.length;
                    state.dhcpRangeData = res.data.dhcp.dhcpList;
                    state.total = res.data.dhcp.dhcpList.length;
                    state.serverStatus = res.data.dhcp.dhcpstatus;
                    state.serverLeaseTime = res.data.dhcp.leaseTime;
                }
            }).catch(res => {
                options.ele.$message({
                    type: 'error',
                    message: res.status
                });
            })
        },
        // 删除 分配范围单条数据
        DelDisRangeItem (state, id) {
            for (var i = 0; i < state.dhcpRangeData.length; i++){
                if(state.dhcpRangeData[i].id == id) {
                    state.dhcpRangeData.splice(i, 1);
                }
            }
            /*
            * 删除数据后，重置接口下拉列表展示数据
            * 不显示分配范围列表已展示的接口
            * */
            var arr = state.dhcpRangeData;
            getDHCPAllDevice().then( res => {
                if(res.status == "SUCCESS") {
                    state.allDevice = res.data.map( item => {
                        return {
                            lable: item.device,
                            value: item.device,
                            device: item.device,
                            staticIpv4Addr: item.staticIpv4Addr,
                            staticIpv4Netmask: item.staticIpv4Netmask,
                            staticIpv4Gateway: item.staticIpv4Gateway
                        }
                    });
                    state.allDeviceBackup = state.allDevice;

                    for(var i = 0; i < state.allDevice.length; i++) {
                        for(var j = 0; j < arr.length; j++){
                            if(state.allDevice[i].device == arr[j].device) {
                                state.allDevice.splice(i, 1);
                            }
                        }
                    }
                };
            }).then( res => {
                //
            });
        },
        // 编辑 分配范围 单条数据
        EditDisRangeItem (state, row) {
            state.dhcpRangeData = row;
        },
        // 删除 分配范围 多条数据
        DelRangeItems (state, options) {
            for(var i = 0; i < state.dhcpRangeData.length; i++) {
                for (var j = 0; j < options.items.length; j++) {
                    if(state.dhcpRangeData[i].id == options.items[j].id){
                        state.dhcpRangeData.splice(i, 1);
                    }
                }
            };
            /*
             * 删除数据后，重置接口下拉列表展示数据
             * 不显示分配范围列表已展示的接口
             * */
            var arr = state.dhcpRangeData;
            getDHCPAllDevice().then( res => {
                if(res.status == "SUCCESS") {
                    state.allDevice = res.data.map( item => {
                        return {
                            lable: item.device,
                            value: item.device,
                            device: item.device,
                            staticIpv4Addr: item.staticIpv4Addr,
                            staticIpv4Netmask: item.staticIpv4Netmask,
                            staticIpv4Gateway: item.staticIpv4Gateway
                        }
                    });
                    for(var i = 0; i < state.allDevice.length; i++) {
                        for(var j = 0; j < arr.length; j++){
                            if(state.allDevice[i].device == arr[j].device) {
                                state.allDevice.splice(i, 1);
                            }
                        }
                    }
                };
            }).then( res => {
                //
            });
            options.ele.$message({
                type: 'success',
                message: '删除成功!'
            });
        },
        // 删除 预置ip 单条数据
        DelReserved (state, id) {
            /*
            * 根据所传id删除数据
            * */
            for (var i = 0; i < state.dhcpSetDatas.dhcpIpList.length; i++){
                if(state.dhcpSetDatas.dhcpIpList[i].id == id) {
                    state.dhcpSetDatas.dhcpIpList.splice(i, 1);
                }
            };

            for (var j = 0; j < state.initReservedDialog.length; j++){
                if(state.initReservedDialog[j].id == id) {
                    state.initReservedDialog.splice(j, 1);
                }
            }
        },
        // 改变 设置页面 可编辑状态
        ChangeEditStatus (state, status) {
            state.isEditPage = !status;
        },
        // 获取所有网卡
        GetAllDevice (state) {
            getDHCPAllDevice().then( res => {
                if(res.status == "SUCCESS") {
                    state.allDevice = res.data.map( item => {
                        return {
                            label: item.device,
                            value: item.device,
                            device: item.device,
                            staticIpv4Addr: item.staticIpv4Addr,
                            staticIpv4Netmask: item.staticIpv4Netmask,
                            staticIpv4Gateway: item.staticIpv4Gateway
                        }
                    });
                };
            }).then( res => {
                /*obj.$message({
                    type: 'error',
                    message: res.status // 报错时未返回此字段
                });*/
            })
        },
        // 递增id 用于新增数据 标识数据
        IncreasingId (state, id) {
            state.id = parseInt(id) + 1;
        },
        // 设置 可用的 网卡
        SetAllDevice (state, device) {
            // 分配范围弹框下拉列表数据
            for(var i = 0; i < state.allDevice.length; i++) {
                if(state.allDevice[i].value === device) {
                    state.allDevice.splice(i, 1);
                }
            };
        },
        // 清空分配范围新增时的表单
        ClearRangeInitData (state, json) {
            // 编辑时传入所选行的数据，对表单数据初始化
            console.log(json)
            if(json){
                state.initRangeDialog = json;
                state.cancleEditDisRangeData = JSON.stringify(json);
                return;
            }
            state.initRangeDialog = {value: 'eth0', subnet: '', dns1: '', dns2: '', ranges: '', netmask: '', routers: '', dhcpIpList: [], device: ''};
        },
        /*
        *
        * 预留ip 弹框操作
        *
        */

        // 添加新输入框
        addNewReservedItem (state, index) {
            // 点击预置弹框的 加号添加新增条数
            var obj = {device: '', id: '', mac: '', ip: '', value: ''};
            state.initReservedDialog.splice(index+1, 0, obj);
        },
        delReservedItem (state, index) {
            // 点击预置弹框的 减号添加新增条数
            state.initReservedDialog.splice(index, 1);
        },
        changeResSelctValue (state, val) {
            // 预置ip 弹框下拉选择框选中的值
            state.reservedSelectValue = val;
        },
        // 新增预置ip 初始化弹框表单
        NewArrReservedItem (state) {
            var arr = [
                { device: '', id: '', mac: '', ip: '', value: '' }
            ];
            state.initReservedDialog = arr;
            state.reservedSelectValue = '';
        },
        // 确认新增 预留ip
        corfirmNewRes (state, data) {
            data.map(item => {
                state.dhcpSetDatas.dhcpIpList.push(item);
            });
        },
        // 编辑 预置ip 单条数据
        EditReservedIpItem (state, data) {
            const arr = state.dhcpSetDatas.dhcpIpList;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (arr[i].id == data[j].id) {
                        state.dhcpSetDatas.dhcpIpList.splice(i, 1, data[j]);
                    }
                };
            }
        },
        // 删除预置多项内容
        DelReservedItems (state, options) {
            for(var i = 0; i < state.dhcpSetDatas.dhcpIpList.length; i++) {
                for(var j = 0; j < options.items.length; j++) {
                    if (state.dhcpSetDatas.dhcpIpList[i].id == options.items[j].id) {
                        state.dhcpSetDatas.dhcpIpList.splice(i, 1);
                    }
                }
            };
            options.ele.$message({
                type: 'success',
                message: '删除成功!'
            });
        },
        // 提交页面内容
        PutPageData (state, obj) {

            var dhcpRangeData = state.dhcpRangeData.map(item => {
                return {
                    subnet: item.subnet,
                    dns1: item.dns1,
                    dns2: item.dns2,
                    ranges: item.ranges,
                    netmask: item.netmask,
                    routers: item.routers,
                    dhcpIpList: item.dhcpIpList,
                    device: item.device,
                    id: item.id
                }
            });

            var data = {
                dhcp: {
                    dhcpstatus: state.serverStatus,
                    leaseTime: state.serverLeaseTime
                },
                dhcpList: dhcpRangeData,
                dhcpIpList: state.dhcpSetDatas.dhcpIpList
            };
            //data = JSON.stringify(data);
            putDHCPSetData(data).then( res => {
                if(res.status == "SUCCESS"){
                    obj.$message({
                        type: 'success',
                        message: '保存成功！'
                    });
                }
            }).catch( res => {
                obj.$message({
                    type: 'error',
                    message: res.status
                });
            })
        },
        isCancleEdit (state, options) {
            let device = state.reservedSelectValue;
            if ( (typeof options.json) == 'string' && options.json ) {
                options.json = JSON.parse(options.json);
                if (options.type != 'cancleDisRange') {
                    device = options.json[0].device;
                }
            }
            if(options.type == 'cancleDisRange'){
                state.dhcpRangeData = state.dhcpRangeData.map(item => {
                    if (item.id == options.json.id) {
                        item = options.json
                        item.device = options.json.value;
                    }
                    return item;
                })
            } else {
                state.dhcpSetDatas.dhcpIpList = state.dhcpSetDatas.dhcpIpList.map(item => {
                    for (let i = 0; i < options.json.length; i++) {
                        if (item.id == options.json[i].id) {
                            item = options.json[i];
                            item.device = device;
                        }
                    }
                    return item;
                })
            }
        }
    },
    actions: {
        getDHCPData ({ commit }, options) {
            commit('getDHCPstate', options);
        },
        getDHCPSet({commit}, options) {
            commit('getDHCPSets', options);
        },
        editDisRangeItem ({commit}, row) {
            commit('EditDisRangeItem', row);
        },
        delDisRangeItem ({commit}, id) {
            commit('DelDisRangeItem', id);
        },
        delRangeItems ({commit}, options) {
            commit('DelRangeItems', options);
        },
        delReserved ({commit}, id) {
            commit('DelReserved', id);
        },
        changeEditStatus ({commit}, status) {
            commit('ChangeEditStatus', status)
        },
        getAllDevice ({commit}) {
            commit('GetAllDevice');
        },
        increasingId ({commit}, id) {
            commit('IncreasingId', id);
        },
        setAllDeive ({commit}, device) {
            commit('SetAllDevice', device);
        },
        clearRangeInitData ({commit}, json) {
            commit('ClearRangeInitData', json);
        },
        addNewReservedIpItem ({commit}, index) {
            commit('addNewReservedItem', index);
        },
        delReservedItem ({commit}, index) {
            commit('delReservedItem', index);
        },
        changeResSelectValue ({commit}, val) {
            commit('changeResSelctValue', val);
        },
        confirmNewAddReserved ({commit}, data) {
            commit('corfirmNewRes', data);
        },
        newArrReservedItem ({commit}) {
            commit('NewArrReservedItem');
        },
        editReservedIpItem ({commit}, data) {
            commit('EditReservedIpItem', data);
        },
        delReservedItems ({commit}, options) {
            commit('DelReservedItems', options);
        },
        putPageData ({commit}, obj) {
            commit('PutPageData', obj);
        },
        isCancleEdit ({commit}, options) {
            commit('isCancleEdit', options);
        }
    },
    getters: {
        getDhcpSetDatas (state) {
            return state.dhcpSetDatas;
        },
        getStateStatus (state) {
            return state.status;
        },
        dhcpData (state) {
            return state.listData;
        },
        dhcpRangeTotal (state) {
            return state.total;
        },
        dhcpRangeDatas (state) {
            return state.dhcpRangeData;
        },
        dhcpServeredIpTotal (state) {
            return state.reservedIpTotal;
        },
        getServerStatus (state) {
            return state.serverStatus;
        },
        getServerLeaseTime (state) {
            return state.serverLeaseTime;
        },
        getEditStatus (state) {
            return state.isEditPage;
        },
        getInitRangeDialog (state) {
            return state.initRangeDialog;
        },
        getAllDevice (state) {
            return state.allDevice;
        },
        getId (state) {
            return state.id;
        },
        /* 获取预留ip 弹框初始化数据 */
        getReservedIpInitData (state) {
            return state.initReservedDialog;
        },
        reservedSelectValue (state) {
            return state.reservedSelectValue;
        }
    }
}
export default dhcp;