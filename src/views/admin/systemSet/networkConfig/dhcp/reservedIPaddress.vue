<template>
    <div class="">
        <div style="border-bottom: 1px solid #d1dbe5;">
            <p style="margin: 30px 0 20px;">预留IP地址</p>
        </div>
        <el-row style="padding: 30px 0">
            <el-col>
                <a class="function_btn_main" @click="newAddreserveIp(isStart)" style="display: inline-block;">
                    <i class="fa fa-plus" > 新建预留IP地址</i>
                </a>
                <a class="function_btn_main" @click="deleteAll(isStart)" style="display: inline-block;">
                    <i class="fa fa-trash" > 删除</i>
                </a>
            </el-col>
        </el-row>

        <template>
            <el-table
                    ref="multipleTable"
                    :data="dhcpSetData.dhcpIpList"
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
                        prop="ip"
                        label="预留IP"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="mac"
                        label="预留给此MAC"
                        >
                </el-table-column>

                <el-table-column
                        align="center"
                        label="操作"
                        width="130"
                >
                    <template slot-scope="scope">
                        <el-row type="flex" justify="center">
                            <el-col :span="6">
                                <i @click="editReserved(scope.row, isStart)" class="el-icon-edit cursor_pointer text_color_blue"></i>
                            </el-col>
                            <el-col :span="6">
                                <i @click="delReserved(scope.row, isStart)" class="fa fa-trash cursor_pointer text_color_blue"></i>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

            </el-table>

        </template>
        <AddReserved
                @closeDialogs="closeDialogs"
                :addType="addType"
                :resSelectValue="selectValue"
                :initResevedDialog="resvedData"
                :visibleDialog="isVisibleDialog">
        </AddReserved>
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
                addType: 'reservedIp',
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
                reservedMulTipSelect: [],
                resvedData: [{
                    "device": "",
                    "ip": "",
                    "mac": "",
                    "id": 0
                }]
            }
        },
        computed: {
            selectValue () {
                return this.$store.getters.reservedSelectValue;
            },
            dhcpSetData () {
                return this.$store.getters.getDhcpSetDatas;
            },
            dhcpServeredIpTotal () {
                return this.$store.getters.dhcpServeredIpTotal;
            },
            getEditStatus () {
                return this.$store.getters.getEditStatus;
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.pageSize = val;
                    that.getDhcpSetData();
                });
                //this.getList();
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
                this.reservedMulTipSelect = val;
            },
            newAddreserveIp (state) {
                if(!this.getEditStatus){
                    this.$message('请点击编辑按钮，编辑内容');
                    return;
                };

                if (!state) {
                    this.$message('请点击启用，编辑内容');
                    return;
                };

                this.addType = 'reservedIp';
                this.resvedData = [{
                    "device": "",
                    "ip": "",
                    "mac": "",
                    "id": 0
                }];
                /*this.$store.dispatch('newArrReservedItem');*/
                this.isVisibleDialog = true;
            },
            deleteAll (state) {
                console.log(this.reservedMulTipSelect.length);
                var items = this.reservedMulTipSelect;
                if(!this.getEditStatus){
                    this.$message('请点击编辑按钮，编辑内容');
                    return;
                };

                if (!state) {
                    this.$message('请点击启用，编辑内容');
                    return;
                };

                if(items.length == 0) {
                    this.$message('请选择要删除的预留IP');
                    return
                }
                this.$confirm('是否确认删除所选项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delReservedItems',{items: items, ele: this});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            },
            closeDialogs () {
                this.isVisibleDialog = false;
            },
            getDhcpSetData () {
                this.$store.dispatch("getDHCPSet",{
                    option: '',
                    ele: this
                });
            },
            editReserved (row, state) {
                if(!this.getEditStatus){
                    this.$message('请点击编辑按钮，编辑内容');
                    return;
                };
                if (!state) {
                    this.$message('请点击启用，编辑内容');
                    return;
                };
                this.addType = 'editReserved';

                let resevedData = this.$store.getters.getDhcpSetDatas.dhcpIpList;

                this.resvedData.splice(0);
                for (let i = 0; i< resevedData.length; i++){
                    if (resevedData[i].device == row.device) {
                        let txt = JSON.stringify(resevedData[i]);
                        let arr = JSON.parse(txt);
                        this.resvedData.push(arr);
                    }
                };

                //this.$store.dispatch('editReservedIpItem', row.device);
                this.isVisibleDialog = true;
            },
            delReserved (row, state) {
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
                    this.$store.dispatch('delReserved', row.id);
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