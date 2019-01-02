<template>
    <div class="admin public">
        <el-dialog title="选择可信域关联用户组" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-table
                    ref="multipleTable"
                    :data="list"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="80"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        label="名称"
                        align="center"
                >
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column
                        label="类型"
                        align="center"
                >
                    <template slot-scope="scope">可信域</template>
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
                            :current-page="listQuery.black_page"
                            :page-sizes="[10]"
                            :page-size="listQuery.page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="listQuery.total">
                    </el-pagination>
                </div>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('addInfo')">
                        保存
                    </el-button>

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {grouplistForAdd} from "api/enWAS/group";
    export default {

        components: {},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                labelPosition: 'left',
                addVisible: true,
                list:[],
                listQuery: {
                    resource_page:1,
                    black_page:1,
                    page_size:10,
                    total:10
                },
                allSelectedBlack:[],
                cancelSelected:[]
            }
        },
        props:['cancelDomain'],
        created() {
            this.getList();
            this.allSelectedBlack = [];
        },
        methods: {
            handleClose() {
                this.$emit("onDomainStatus", this.cancelSelected);
            },
            doTest() {
                this.addVisible = true;
            },
            getList(){
                grouplistForAdd(this.listQuery).then(response => {
                    if (response.data.items1.page_count > 0){
                        this.list = response.data.items1.res;
                        this.listQuery.total = response.data.items1.page_count;
                        let selectedIndexes = [];
                        this.allSelectedBlack = this.cancelDomain;
                        for (let i = 0; i < this.list.length; i++){
                            for (let j = 0; j < this.allSelectedBlack.length; j++){
                                if (this.list[i].id == this.allSelectedBlack[j].id){
                                    selectedIndexes.push(i);
                                    break;
                                }
                            }
                        }
                        var $this = this;
                        this.$nextTick(function () {
                            selectedIndexes.forEach(index => {
                                $this.$refs.multipleTable.toggleRowSelection($this.list[index], true);
                            });
                        })
                    }
                }).catch((e) => {
                    console.log(e);
                })
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.black_page = val;
                this.getList();
            },
            handleSelectionChange(val){
                for (let i = 0; i < this.list.length; i++){
                    for (let j = 0; j < this.allSelectedBlack.length; j++){
                        if (this.list[i].id == this.allSelectedBlack[j].id){
                            this.allSelectedBlack.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.allSelectedBlack.push(val[i]);
                }
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$emit("onDomainStatus", this.cancelSelected);
            },
            submitInfo(formName) {
                this.addVisible = false;
                this.$emit("onDomainStatus",this.allSelectedBlack);
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
