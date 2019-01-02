<template>
    <div class="">
        <div style="border-bottom: 1px solid #d1dbe5;">
            <p style="margin-bottom: 20px;">DHCP服务设置</p>
        </div>
        <el-row style="padding: 20px 0 0;">
            <el-col :span="3" class="flex_right_h set_margin_right20 set_margin_bottom20">
                <span>DHCP服务:</span>
            </el-col>
            <el-col :span="19">
                <el-radio-group :disabled="!getEditStatus" @change="changeRadios()" :load="serverStatus" v-model="radios">
                    <el-radio :label="'Y'">启用</el-radio>
                    <el-radio :label="'N'">停用</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row class="flex_center_v">
            <el-col :span="3" class="flex_right_h set_margin_right20">
                <span>地址出租时间</span>
            </el-col>
            <el-col :span="6">
                <el-input :disabled="!getEditStatus || !start" v-model="serverLeaseTime" :load="getLeaseTime" @blur="changeUploadTime" placeholder="刷新时间"></el-input>
            </el-col>
            <el-col :span="2" class="set_margin_left20">分钟</el-col>
        </el-row>

        <DisRange :isStart="start"></DisRange>
        <ReservedIPaddress :isStart="start"></ReservedIPaddress>

    </div>
</template>

<script>
    import DisRange from './disRange.vue';
    import ReservedIPaddress from './reservedIPaddress.vue';

    export default {
        name: '',
        components: {
            DisRange,   // 分配范围组建注册
            ReservedIPaddress   // 预留ip 组建注册
        },
        data () {
            return {
                datas: null,
                start: false,
                radios: '',
                listData:[
                    {
                        ipAdr: '192.168.50.1',
                        macAdr: '255.255.255.0',
                        net: 'ETH1',
                        time: '800'
                    }
                ],
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    total: 1
                },
                serverLeaseTime: 0  // 服务租期时间
            }
        },
        created(){
            this.getDhcpSetData();
        },
        computed: {
            serverStatus () {   // 获取服务状态
                return this.radios = this.$store.getters.getServerStatus;
            },
            getLeaseTime () {   // 获取租期时间
                return this.serverLeaseTime = this.$store.getters.getServerLeaseTime;
            },
            getEditStatus () {  // 获取编辑状态
                return this.$store.getters.getEditStatus;
            }
        },
        watch: {
            radios () { // 监听服务状态
                this.start = this.radios == 'Y' ? true : false;
            }
        },
        methods: {
            changeRadios () {   // 改变服务状态
                this.$nextTick( () => {
                    this.start = this.radios == 'Y' ? true : false;
                    this.$store.state.dhcp.serverStatus = this.radios;
                })
            },
            changeUploadTime (ev) { // 改变租期时间
                let txt = '';
                let flag = true;
                if(ev.target.value == ''){
                    txt = '租期时间不能为空!';
                    flag = false;
                    this.$emit('changeSubmitState', txt);
                }
                if(!/^\d*$/g.test(this.serverLeaseTime)){
                    txt = '请输入 1-1000 的整数!';
                    flag = false;
                    this.$emit('changeSubmitState', txt);
                }
                if (parseInt(this.serverLeaseTime) > 1000) {
                    txt = '输入的值大于1000，请输入 1-1000 的整数!';
                    flag = false;
                    this.$emit('changeSubmitState', txt);
                };
                if (parseInt(this.serverLeaseTime) < 1) {
                    txt = '输入的值小于1，请输入 1-1000 的整数!';
                    flag = false;
                    this.$emit('changeSubmitState', txt);
                };

                if (flag) txt = 'true';

                this.$emit('changeSubmitState', txt);
                this.validation(ev.target, txt)

                this.$store.state.dhcp.serverLeaseTime = this.serverLeaseTime;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.pageSize = val;
                    that.getDhcpSetData();
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.currentPage = val;
                    that.getDhcpSetData();
                });
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            getDhcpSetData () { // 获取设置页面所有数据
                this.$store.dispatch("getDHCPSet",{
                    option: '',
                    ele: this
                });
            }
        }
    }
</script>

<style scoped lang="scss">
</style>