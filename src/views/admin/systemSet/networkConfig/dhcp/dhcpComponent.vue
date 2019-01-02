<template>
    <div class="dhcp_content">
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a >网络配置</a></li>
                <li class="active">DHCP</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="overflow: hidden;">
                        <div class="box-header clude_tab vlan-header-title">
                            <h3 class="box-title">DHCP</h3>
                        </div>

                        <template>
                            <el-tabs @tab-click="changeTab" type="border-card" style="margin: 15px;">
                                <el-tab-pane label="DHCP状态" style="padding: 15px 30px;">
                                    <DHCPSTATE :index="tabIndex"></DHCPSTATE>
                                </el-tab-pane>
                                <el-tab-pane label="DHCP设置" style="padding: 15px 15px;">
                                    <DHCPSET @changeSubmitState="changeSubmitState"></DHCPSET>
                                    <el-row style="margin-top: 40px; margin-bottom: 30px;">
                                        <el-button class="primary edit" size="small" @click="changeEditStatus(getEditStatus)" type="primary" v-show="!getEditStatus">编辑</el-button>
                                        <el-button class="plain cancle" size="small" @click="cancleEdit(getEditStatus)" v-show="getEditStatus" plain style="margin: 0;">取消</el-button>
                                        <el-button class="primary confirm" size="small" @click="confirmEdit(getEditStatus)" v-show="getEditStatus" type="primary">确定</el-button>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                        </template>

                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import DHCPSTATE from './DHCP_STATE.vue';
    import DHCPSET from './DHCP_SET.vue';

    export default {
        name: 'dhcp',
        components: {
            DHCPSTATE,  // 注册dhcp状态页
            DHCPSET     // 注册dhcp设置页面
        },
        data () {
            return {
                isSubmit: true,     // 是否能提交数据
                readOnly:false,     // 是否是只读权限
                pageId:1702,        // 页面id
                activeName: 'dhcp_state',   // 默认选中的tab页名字
                tabIndex: 0,        // tab序号
                value: '',
                upload_time: '',
                radios: 6,
                selectIp: [
                    {value: 1, label: 2}
                ],
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
                }
            }
        },
        computed: {
            getEditStatus () { // 获取页面可编辑状态
                return this.$store.getters.getEditStatus;
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
        },
        methods: {
            changeSubmitState (blen) { // 改变 提交状态
                this.isSubmit = blen;
            },
            handleClick (tab, event) {
                console.log(tab, event);
            },

            handleSizeChange(val) { // 改变翻页中每页数据的条数
                console.log(`每页 ${val} 条`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.pageSize = val;
                    that.getVlanTableList();
                });
            },
            handleCurrentChange(val) {  // 改变翻页中当前页页码
                console.log(`当前页: ${val}`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.currentPage = val;
                    that.getVlanTableList();
                });
            },
            handleSelectionChange (val) { // 列表中选中的数据
                this.multipleSelection = val;
            },
            changeTab (ele) { // 点击tab标签执行函数
                if (ele.index == 0) {
                    const option = { // 初始化状态页 数据参数
                        selectType: '',
                        selectValue: '',
                        currentPage: 1,
                        pageSize: 10,
                    };

                    this.$store.dispatch('getDHCPData', {   // 获取状态页数据
                        option: option,
                        type: 'change',
                        ele: this
                    });
                };
                if (ele.index == 1) {   // 获取设置页数据
                    this.$store.dispatch("getDHCPSet", {
                        option: '',
                        ele: this
                    });
                };

                this.$store.dispatch('changeEditStatus', true);     // 改变库中的编辑状态
            },
            changeEditStatus (status) { // 改变编辑状态
                this.$nextTick( () => {
                    if(this.readOnly == true){
                        this.$message({
                            type: 'warning',
                            message: '您的权限为只读!'
                        });
                    } else {
                        this.$store.dispatch('changeEditStatus', status);
                    }
                })
            },
            confirmEdit (status) {  // 确认提交叶脉呢内容
                if (this.isSubmit == true || this.isSubmit == 'true') {
                    if (this.$store.state.dhcp.serverLeaseTime == "") {
                        this.$message({
                            type: 'warning',
                            message: '请输入出租时间！'
                        });
                        return false;
                    }
                    this.$store.dispatch('putPageData', this);
                    this.$store.dispatch('changeEditStatus', status);
                } else {
                    this.$message({
                        type: 'warning',
                        message: this.isSubmit
                    });
                }
            },
            getDhcpSetData () {
                this.$store.dispatch("getDHCPSet",{
                    option: '',
                    ele: this
                });
            },
            cancleEdit (status) {
                this.$confirm('取消编辑也许会丢失您编辑的内容, 是否继续?', '提示', {
                    confirmButtonText: ' 是 ',
                    cancelButtonText: ' 否 ',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('changeEditStatus', status);
                    this.getDhcpSetData();
                }).catch(() => {
                    //
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>