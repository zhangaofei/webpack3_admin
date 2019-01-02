<template>
    <div class="admin public">
        <el-dialog title="选择应用关联用户组" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-table
                    ref="multipleTable"
                    :data="selectedList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                <el-table-column
                        label="应用名"
                        align="center"
                >
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column
                        label="应用类型"
                        align="center"
                >
                    <template slot-scope="scope">web应用</template>
                </el-table-column>
                <el-table-column
                        label="协议类型"
                        align="center"
                >
                    <template slot-scope="scope">{{scope.row.protocol}}</template>
                </el-table-column>
                <el-table-column
                        label="说明"
                        align="center"
                >
                    <template slot-scope="scope">{{scope.row.describ}}</template>
                </el-table-column>
            </el-table>
            <div class="row" style="margin-top:8px;" id="pages_list">
                <div class="block" style="margin-right: 2%;float: right" >
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="listQuery.resource_page"
                            :page-sizes="[10]"
                            :page-size="listQuery.page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="listQuery.total">
                    </el-pagination>
                </div>
            </div>
            <div class='form-footer ' slot="footer" ></div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {listForEdit, getselectedPageList} from "api/enWAS/group";
    export default {

        components: {},
        computed: {
            ...mapGetters([
                'appRoles'
            ])
        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                labelPosition: 'left',
                addVisible: true,
                listQuery: {
                    group_id: '',
                    resource_page:1,
                    black_page:1,
                    page_size:10,
                    total:10
                },
                selectedList:[]
            }
        },
        props:['id'],
        created() {
            this.getSelectedList();
            this.selectedList = [];
        },
        methods: {
            getSelectedList(){
                this.listQuery.group_id = this.id;
                getselectedPageList(this.listQuery).then(response => {
                    this.listQuery.total = response.data.resource.page_count;
                    this.selectedList = response.data.resource.res;
//                    for (let i = 0; i < response.data.resource.res.length; i++){
//                        this.selectedList.push(response.data.resource.res[i]);
//                    }
                }).catch((e) => {
                    console.log(e);
                })
            },
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.addVisible = true;
            },
            changeStatus(){
                this.$emit("onResourceStatus")
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getSelectedList();
            },
            handleCurrentChange(val) {
                this.listQuery.resource_page = val;
                this.getSelectedList();
            },
            sourceReset(formName) {
                this.addVisible = false;
                this.changeStatus()
                this.$emit('onResourceStatus');
//                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .admin .dialog {
        min-width: 830px;
    }

    .admin .el-dialog__header {
        padding-left: 5px;
    }

    .admin .el_put {
        position: relative;
        display: inline-block;
        /*width: 65% !important;*/
        margin-left: 20px;
    }

    .admin .el_sel {
        /*width: 65% !important;*/
        margin-left: 20px;
    }

    .admin .el_text {
        margin-left: 158px;
    }

    .admin-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .admin-form .el-form-item {
        margin-bottom: 20px;
    }

    .admin .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .admin-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>
