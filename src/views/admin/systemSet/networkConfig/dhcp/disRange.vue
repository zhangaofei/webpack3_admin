<template>
    <div class="dhcp_state">
        <div class="set_margin_top20" style="border-bottom: 1px solid #d1dbe5;">
            <p style="margin: 30px 0 20px;">分配范围</p>
        </div>
        <el-row style="padding: 30px 0">
            <el-col>
                <a class="function_btn_main" @click="addIp(isStart)" style="display: inline-block;">
                    <i class="fa fa-plus" > 新建IP分配范围</i>
                </a>
                <a class="function_btn_main" @click="deleteAllItem(isStart)" style="display: inline-block;">
                    <i class="fa fa-trash" > 删除</i>
                </a>
            </el-col>
        </el-row>

        <template>
            <el-table
                    ref="multipleTable"
                    :data="dhcpRangeData"
                    :header-cell-style="headerCellStyle"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        align="center"
                        width="50"
                        type="selection">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="网络接口"
                        prop="device">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="ranges"
                        label="地址分配范围"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="routers"
                        label="网关"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        label="DNS">
                    <template slot-scope="scope"><div><p style="margin: 0;">{{ scope.row.dns1 }}</p><p style="margin: 0;">{{ scope.row.dns2 }}</p></div></template>
                </el-table-column>

                <el-table-column
                        align="center"
                        label="操作"
                        width="130"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-col :span="6">
                                <i @click="eidtRangeItem(scope.row, isStart)" class="el-icon-edit cursor_pointer text_color_blue"></i>
                            </el-col>
                            <el-col :span="6">
                                <i @click="delRangeItem(scope.row, isStart)" class="fa fa-trash cursor_pointer text_color_blue"></i>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

            </el-table>

            <AddReserved
                    @closeDialogs="closeDialogs"
                    :addType="addType"
                    ref="rangeDialog"
                    :initRangeDialog="rangeList"
                    :visibleDialog="isVisibleDialog">
            </AddReserved>
        </template>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import AddReserved from './addIp.vue';

    export default {
        props: {
            isStart: Boolean
        },
        name: '',
        components: {
            AddReserved
        },
        data () {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                isVisibleDialog: false,
                addType: 'disRange',
                rangeList: null,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    total: 1
                },
                rangeMulTipSelect: [],
                editSlect: null
            }
        },
        computed: {
            dhcpRangeData () { // 获取分配范围数据
                return this.$store.getters.dhcpRangeDatas;
            },
            dhcpRangeTotals () { // 获取分配范围 数据条数
                return this.$store.getters.dhcpRangeTotal;
            },
            getEditStatus () { // 获取编辑状态
                return this.$store.getters.getEditStatus;
            },
            // 获取分配范围弹框初始化数据
            getInitRangeDialog () {
                return this.$store.getters.getInitRangeDialog;
            }
        },
        methods: {
            handleSizeChange(val) { // 每页数据条数设置
                console.log(`每页 ${val} 条`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.pageSize = val;
                    that.getDhcpSetData();
                });
            },
            handleCurrentChange(val) { // 当前页变化 函数
                console.log(`当前页: ${val}`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.currentPage = val;
                    that.getDhcpSetData();
                });
                //this.getList();
            },
            handleSelectionChange (val) { // 被选条数
                this.rangeMulTipSelect = val;
            },
            addIp (state) { // 新增 分配范围
                if(!this.getEditStatus){
                    this.$message('请点击编辑按钮，编辑内容');
                    return;
                };
                if (!state) {
                    this.$message('请点击启用，编辑内容');
                    return;
                }
                this.$store.dispatch('clearRangeInitData', false);
                this.addType = 'disRange';
                this.$nextTick(() => {
                    this.rangeList = {
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
                    };
                    this.isVisibleDialog = true;
                })
            },
            deleteAllItem (state) { // 删除所选条数
                if(!this.getEditStatus){
                    this.$message('请点击编辑按钮，编辑内容');
                    return;
                };
                if (!state) {
                    this.$message('请点击启用，编辑内容');
                    return;
                }
                if(this.rangeMulTipSelect.length == 0) {
                    this.$message('请选择要删除的IP分配');
                    return;
                }
                this.$confirm('是否确认删除所选项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delRangeItems', {
                        items: this.rangeMulTipSelect,
                        ele: this
                    });
                    // 删除成功后更新所有接口数据
                    this.$store.dispatch('getAllDevice', this);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
                console.log(this.rangeMulTipSelect.length)
            },
            closeDialogs () { // 关闭新增、编辑弹框
                this.isVisibleDialog = false;
            },
            getDhcpSetData () { // 数据获取 执行函数
                this.$store.dispatch("getDHCPSet",{
                    option: '',
                    ele: this
                });
            },
            eidtRangeItem (row, state) { // 编辑分配范围
                let value = row.device;
                this.editSlect = row;
                if(!this.getEditStatus){
                    this.$message('请点击编辑按钮，编辑内容');
                    return;
                };
                if (!state) {
                    this.$message('请点击启用，编辑内容');
                    return;
                }
                this.$set(row, 'value', value);
                row = JSON.stringify(row);
                row = JSON.parse(row);
                this.rangeList = row;
                this.addType = 'editDisRange';
                this.isVisibleDialog = true;
            },
            delRangeItem (row, state) { // 分配范围 单条数据删除
                if(!this.getEditStatus){
                    this.$message('请点击编辑按钮，编辑内容');
                    return;
                };
                if (!state) {
                    this.$message('请点击启用，编辑内容');
                    return;
                }
                this.$confirm('此次删除,刷新页面可恢复数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delDisRangeItem', row.id);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="">

</style>