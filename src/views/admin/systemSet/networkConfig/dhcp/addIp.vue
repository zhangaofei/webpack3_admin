<template>
    <div class="add_reserved public">
        <el-dialog :title="addType=='reservedIp' ? '新增预留IP地址' : addType=='disRange' ? '新增IP分配范围': addType=='editDisRange' ? '编辑IP分配范围' : '编辑预留IP地址'"
                   :visible.sync="dialogReservedAdd"
                   @close="closeDialog()"
                   :show-close="true"
                   width="80%">
            <ReservedIp
                    :reservedType="addType"
                    :slectValue="resSelectValue"
                    :initReseved="initResevedDialog"
                    v-if="addType == 'reservedIp' || addType == 'editReserved'"
            ></ReservedIp>
            <IpDisRange
                    :rangeType="addType"
                    :initRange="initRangeDialog"
                    ref="addRangeTemp"
                    :chooseDevice="device"
                    v-if="addType == 'disRange' || addType == 'editDisRange'"
            ></IpDisRange>
            <div class="foot" slot="footer">
                <span class="cancle btn_middle" @click="cancle(addType)">取消</span>
                <el-button class="primary confirm btn_middle" @click="sure(addType)" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ReservedIp from './reservedIp.vue';
    import IpDisRange from './ipDisRange.vue';
    import { getDHCPAllDevice } from "../../../../../api/systemSet/networkConfig/dhcp";

    export default {
        props: {
            visibleDialog: Boolean,
            addType: String,
            type: String,
            initRangeDialog: Object,
            resSelectValue: String,
            initResevedDialog: Array
        },
        name: '',
        components: {
            ReservedIp,
            IpDisRange
        },
        data () {
            return {
                dialogReservedAdd: false,
                list: null,
                listData: [],
                backupList: {   // 一条初始化的 分配范围 数据
                    device: '',
                    dhcpIpList: [],
                    dns1: '',
                    dns2: '',
                    id  : 0,
                    netmask: '',
                    ranges : '',
                    routers: '',
                    subnet : '',
                    value: ''
                },
                device: '',
                backupDevice: '',
                backupResevedData: [{
                    "device": "",
                    "ip": "",
                    "mac": "",
                    "id": 0
                }]
            }
        },
        created () {
            this.dhcpRangeData()
            this.backupDevice = JSON.stringify(this.backupDevice)
            this.list = this.initRangeDialog == null ? this.backupList : this.initRangeDialog;
            this.device = this.initRangeDialog == null ? JSON.parse(this.backupDevice) : this.initRangeDialog.device;
        },
        computed: {
            getDialogStatus () {
                return this.dialogReservedAdd = this.visibleDialog;
            }
        },
        watch: {
            visibleDialog (nVal, oVal) {
                if (nVal) {
                    this.dialogReservedAdd = nVal;
                }
            },
            initRangeDialog (nVal, oVal) {
                this.list = this.initRangeDialog == null ? this.backupList : this.initRangeDialog;
                this.device = this.initRangeDialog == null ? this.backupDevice : this.initRangeDialog.device;
            }
        },
        methods: {
            dhcpRangeData () { // 获取分配范围数据
                this.listData = this.$store.getters.dhcpRangeDatas;
            },
            closeDialog (blen) {    // 关闭弹框
                this.dialogReservedAdd = false;
                this.$emit("closeDialogs")
            },
            cancle (type) { // 取消
                this.closeDialog();
            },
            // 确定
            sure (type) {
                getDHCPAllDevice().then( res => {
                    if(res.status == "SUCCESS") {
                        let allDevice = res.data.map( item => {
                            return {
                                lable: item.device,
                                value: item.device,
                                device: item.device,
                                staticIpv4Addr: item.staticIpv4Addr,
                                staticIpv4Netmask: item.staticIpv4Netmask,
                                staticIpv4Gateway: item.staticIpv4Gateway
                            }
                        });
                        this.confirm(type, allDevice)
                    };
                }).then( res => {
                    //
                });
            },
            confirm (type, allDevice) { // 点击弹框确定按钮执行的逻辑
                var regIp   = /^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$/;
                var regMask = /^[A-Fa-f0-9][A-Fa-f0-9]:[A-Fa-f0-9][A-Fa-f0-9]:[A-Fa-f0-9][A-Fa-f0-9]:[A-Fa-f0-9][A-Fa-f0-9]:[A-Fa-f0-9][A-Fa-f0-9]:[A-Fa-f0-9][A-Fa-f0-9]$/;
                var regNet  = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/;

                let ip = '';

                if(type === "disRange" || type === "editDisRange") { // 判断是否是属于分配范围 的弹框
                    // 获取分配范围弹框初始化数据
                    var rangeData = this.list;
                    var device = rangeData.value;
                    rangeData.ranges = rangeData.ranges.replace(/(\r+|\n+)/g,",");
                    let choosedDevice = {};
                    allDevice.forEach( (nowVal, index, arr) => {    // 拿到接口中所有的 子网掩码和ip
                        if( nowVal.value == device ){
                            choosedDevice.subnet = nowVal.staticIpv4Addr;
                            choosedDevice.netmask = nowVal.staticIpv4Netmask;
                        }
                    });
                    if (rangeData.value == '') { //
                        this.$message({
                            type: 'warning',
                            message: '接口不能为空，请选择网络接口！'
                        });
                        return;
                    };

                    // 网关验证
                    if (rangeData.routers == '') {
                        this.$message({
                            type: 'warning',
                            message: '网关不能为空，请填写！'
                        });
                        return;
                    };

                    for(let i = 0; i < allDevice.length; i++){
                        if (allDevice[i].value == rangeData.value) {
                            ip = allDevice[i].staticIpv4Addr;
                            break;
                        }
                    }

                    if (ip == '') {
                        this.$message({
                            type: 'warning',
                            message: '您所选的接口还未配置，请重新选择！'
                        });
                        return;
                    }
                    let ipArr = ip.split('.');
                    let subnetArr = rangeData.routers.split('.');

                    if ( !regIp.test(rangeData.routers) ) {
                        this.$message({
                            type: 'warning',
                            message: '网关格式不正确，请重新填写！'
                        });
                        return;
                    };

                    if ( (ipArr[0] != subnetArr[0] || ipArr[1] != subnetArr[1] || ipArr[2] != subnetArr[2]) ) {
                        this.$message({
                            type: 'warning',
                            message: '接口'+ rangeData.value +'允许的网段为'+ ipArr[0] + '.' + ipArr[1] + '.' + ipArr[2] + '.x' +'网段，请重新填写！'
                        });
                        return;
                    };
                    // dns1验证
                    if ( rangeData.dns1 != '' && !regIp.test(rangeData.dns1) ) {
                        this.$message({
                            type: 'warning',
                            message: 'dns1格式不正确，请重新填写！'
                        });
                        return;
                    };

                    // dns2验证
                    if (rangeData.dns2 != '' && !regIp.test(rangeData.dns2)) {
                        this.$message({
                            type: 'warning',
                            message: 'dns2格式不正确，请重新填写！'
                        });
                        return;
                    };

                    // 分配范围 验证
                    if (rangeData.ranges == '') {
                        this.$message({
                            type: 'warning',
                            message: '分配范围不能为空，请填写！'
                        });
                        return;
                    };

                    // 分配范围验证
                    if( !this.validatorRange(rangeData.ranges, regIp, regNet, rangeData.routers) ) return;

                    this.$set(rangeData, 'device', device); // 向数据中添加接口
                    this.$set(rangeData, 'subnet', choosedDevice.subnet); // 向数据中添加ip
                    this.$set(rangeData, 'netmask', choosedDevice.netmask); // 向数据中添加子网掩码
                    let listData = this.$store.getters.dhcpRangeDatas;  // 获取分配范围最初数据

                    if (type == 'disRange') {
                        // 获取 最初 数据中id最大的一个 如果 数据条数为零，就自增一个为10000的id
                        let aId = listData.length > 0 ? Math.max.apply(null, listData.map(item => {return item.id})) : 10000;
                        // 自增id值并保存在store库中 保证id的唯一性
                        this.$store.dispatch('increasingId', aId);
                        // 拿到库中的id
                        let id = this.$store.getters.getId;
                        // 设置新增数据的id
                        this.$set(rangeData, 'id', id);
                        // 将数据增加到列表中
                        listData.push(rangeData);
                    } else {
                        // 编辑数据时，根据id替换列表中的数据。
                        listData = listData.map(item => {
                            if (item.id == rangeData.id) {
                                item = rangeData
                            }
                            return item;
                        })
                    }
                    // 刷新弹框中的接口下拉选项
                    this.$children[0].$children[1].getAllDeviceData();
                    // 更新数据到库中
                    this.$store.dispatch('editDisRangeItem', listData);
                    this.closeDialog(true)
                };
                if(type === "reservedIp" || type === "editReserved"){
                    // 获取 分配范围的 弹框 显示数据
                    let datas = this.$children[0].$children[1].initReseved;
                    let value = this.$children[0].$children[1].value;
                    if(type == "editReserved"){
                        value = datas[0].device;
                    }

                    var flag = true;
                    let choosedDevice = {};
                    allDevice.forEach( (nowVal, index, arr) => {
                        if( nowVal.value == value ){
                            choosedDevice.subnet = nowVal.staticIpv4Addr;
                        }
                    });
                    let deviceNetArr = choosedDevice.subnet.split('.');

                    if(value == ''){
                        this.$message({
                            type: 'warning',
                            message: '接口不能为空，请选择接口'
                        })
                        return;
                    }
                    for(var i = 0; i < datas.length; i++){
                        let ipArr = datas[i].ip.split('.');
                        if(datas[i].ip == ''){
                            this.$message({
                                type: 'warning',
                                message: '请填写预留ip或者删除未填写项！'
                            })
                            flag = false;
                        }else if( datas[i].mac == '' ){
                            this.$message({
                                type: 'warning',
                                message: '请填写mac地址或者删除未填写项！'
                            })
                            flag = false;
                        }else if( !regIp.test(datas[i].ip) ){
                            this.$message({
                                type: 'warning',
                                message: 'ip格式不合法！'
                            })
                            flag = false;
                        }else if( !regMask.test(datas[i].mac) ) {
                            this.$message({
                                type: 'warning',
                                message: 'mac格式不合法！'
                            })
                            flag = false;
                        }else if(ipArr[0] != deviceNetArr[0] || ipArr[1] != deviceNetArr[1] || ipArr[2] != deviceNetArr[2]) {
                            this.$message({
                                type: 'warning',
                                message: 'ip的网段，必须与接口网段('+choosedDevice.subnet+')处于同一网段！'
                            })
                            flag = false;
                        }
                    };
                    if(!flag) return;

                    if (value != '') {
                        datas = datas.map((item) => {
                            item.device = value;
                            return item;
                        });
                    };

                    if(type == "reservedIp") {
                        let resevedDatas = this.$store.getters.getDhcpSetDatas.dhcpIpList;
                        let maxId = resevedDatas.length > 0 ? Math.max.apply(null, resevedDatas.map(item => { return item.id })) : 10000;
                        datas = datas.map(item => {
                            maxId++;
                            item.id = maxId;
                            return item;
                        });
                        
                        this.$store.dispatch('confirmNewAddReserved', datas);
                    } else {
                        this.$store.dispatch('editReservedIpItem', datas);
                    };

                    this.closeDialog();
                    //this.$store.getters.getReservedIpInitData
//                    const value = this.$store.getters.reservedSelectValue;
//                    if(value == ""){
//                        this.$message({
//                            type: 'warning',
//                            message: '确认新增，请先选择接口!'
//                        });
//                        return;
//                    };
//                    if (type != "editReserved") {
//                        this.$store.dispatch('confirmNewAddReserved', {value:value, ele: this, type: type});
//                    } else {
//                        this.$store.dispatch('confirmNewAddReserved', {value:value, ele: this, type: type});
//                        let json = this.$store.state.dhcp.initReservedDialog;
//                        this.$store.dispatch('isCancleEdit', {json: json, type: 'cancleReservedIp'})
//                    };
                }
            },
            validatorRange (val, regIp, regMask, ip) {
                let flag = true;
                let str = '';

                let valArr = val.split(',');
                for (let i = 0; i < valArr.length; i++) {
                    if (valArr[i].indexOf('/') != -1) {
                        let newArr = valArr[i].split('/');
                        if(newArr.length > 2) {
                            str = '分配范围' + valArr[i] + '的格式有误，请重新填写'
                            flag = false;
                        } else
                        if ( !regIp.test(newArr[0]) ) {
                            str = newArr[0] + '格式有误，请重新填写'
                            flag = false;
                        } else
                        if (newArr[1].split('.').length != 1 && newArr[1].split('.').length != 4) {
                            str = newArr[1] + '格式有误，请重新填写'
                            flag = false;
                        } else

                        if (newArr[1].split('.').length == 1 && (newArr[1] > 255 || newArr[1] < 0) ) {
                            str = newArr[1] + '超出范围，请重新填写'
                            flag = false;
                        } else

                        if (newArr[1].split('.').length == 4 && !regMask.test(newArr[1]) ) {
                            str = newArr[1] + '格式有误，请重新填写'
                            flag = false;
                        };

                    } else if (valArr[i].indexOf('-') != -1) {
                        let newArr = valArr[i].split('-');
                        if(newArr.length > 2) {
                            str = '分配范围' + valArr[i] + '的格式有误，请重新填写'
                            flag = false;
                        } else
                        if ( !regIp.test(newArr[0]) || !regIp.test(newArr[1]) ) {
                            str = valArr[i] + '格式有误，请重新填写'
                            flag = false;
                        } else if ( (newArr[0].split('.')[0] != newArr[1].split('.')[0]
                            || newArr[0].split('.')[1] != newArr[1].split('.')[1]
                            || newArr[0].split('.')[2] != newArr[1].split('.')[2]) ) {
                            str = valArr[i] + '分配范围必须处于同一网段内，请重新填写'
                            flag = false;
                        } else if(newArr[0].split('.')[2] != ip.split('.')[2]){
                            str = valArr[i] + '分配范围必须与网关处于同一网段，请重新填写'
                            flag = false;
                        }else if ( parseInt(newArr[0].split('.')[3]) > parseInt(newArr[1].split('.')[3]) ) {
                            str = valArr[i] + '分配范围前网段必须小于后网段，请重新填写'
                            flag = false;
                        };

                    } else {
                        if( !regIp.test(valArr[i]) ){
                            str = valArr[i] + '分配范围格式不合法，请重新填写'
                            flag = false;
                        }
                    }
                }
                if( !flag ) {
                    this.$message({
                        type: 'warning',
                        message: str
                    });
                }
                return flag;
            }
        }
    }
</script>

<style scoped lang="">

</style>