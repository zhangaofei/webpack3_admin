<template>
    <div class="dhcp_state">
        <p style="margin-bottom: 30px;">DHCP服务状态：<span class="text_color_blue set_margin_right20 set_margin_left30" :style="{'color':getStateStatus=='stop' ? '#F56C6C' : '#20A0FF'}">{{getStateStatus=='stop' ? '停止' : '启动'}}</span>
            <span @click="uplate" class="text_color_blue cursor_pointer set_margin_left10" ><i class="fa fa-repeat set_margin_right5"></i>刷新</span>
        </p>
        <el-row :gutter="20" class="flex_center_v">
            <el-col :span="3" style="text-align: center;">
                <span class="set_margin_right15">关键词查询</span>
            </el-col>
            <el-col :span="4">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in selectIp"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input v-model="leasetimme" placeholder="剩余租期"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" class="primary btn_middle" @click="keywordSearch" icon="search">查询</el-button>
            </el-col>
        </el-row>
        <template>
            <el-table
                    ref="multipleTable"
                    :data="dhcpData"
                    :header-cell-style="headerCellStyle"
                    border
                    style="width: 100%; margin: 30px 0;"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        align="center"
                        label="IP地址"
                        prop="ip">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="hardware"
                        label="MAC地址"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="client_hostname"
                        label="主机名"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="leasetime"
                        label="剩余租期">
                </el-table-column>

            </el-table>
            <div class="row" style="margin-top:8px;" >
                <div class="block" style="margin-right: 2%;float: right" >
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="listQuery.cur_page"
                            :page-sizes="[10, 20, 30, 40,50]"
                            :page-size="listQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="initListData">
                    </el-pagination>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import {mapGetters} from 'vuex';
    export default {
        props: {
            index: Number
        },
        name: '',
        data () {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:1702,
                value: '',
                leasetimme: "",
                status: 'stop',
                selectIp: [
                    {value: 'ip', label: 'IP地址'},
                    {value: 'mac', label: 'MAC地址'},
                    {value: 'hostname', label: '主机名'}
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
                    currentPage: 1,
                    pageSize: 10,
                    total: 1
                }
            }
        },
        mounted () {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getDHCPState();
        },
        computed: {
            dhcpData () {
                return this.$store.getters.dhcpData;
            },
            initListData () {
                return this.$store.state.dhcp.total;
            },
            getStateStatus () {
                return this.$store.getters.getStateStatus;
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.pageSize = val;
                    that.getDHCPState();
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.currentPage = val;
                    that.getDHCPState();
                });
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            getDHCPState (type) {
                const option = {
                    selectType: this.value,
                    selectValue: this.leasetimme,
                    currentPage: this.listQuery.currentPage,
                    pageSize: this.listQuery.pageSize
                };

                this.$store.dispatch('getDHCPData', {
                    option: option,
                    type: type,
                    ele: this
                });

            },
            uplate () {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.getDHCPState("uplate");
                }
            },
            keywordSearch () {
                this.getDHCPState("search");
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-tabs .el-tabs--border-card{
        padding: 30px;
    }
</style>