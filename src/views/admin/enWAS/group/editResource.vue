<template>
    <div class="admin public">
        <el-dialog title="选择应用关联用户组" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-table
                    ref="multipleTable"
                    :data="resourceList"
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
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle"  @click="sourceReset">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="sourceSet">
                        保存
                    </el-button>

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {grouplistForAdd, listForEdit} from "api/enWAS/group";
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
                resourceList:[],
                listQuery: {
                    resource_page:1,
                    black_page:1,
                    page_size:10,
                    total:10
                },
                group_id: '',
                selectedList:[],
                cancelArr:[],
                Click:false
            }
        },
        props:['id','cancelResource', 'subClick'],
        created() {
            this.getSelectedList();
            this.getList();
            this.selectedList = [];
        },
        methods: {
            getList(){
                grouplistForAdd(this.listQuery).then(response => {
                    if (response.data.items2.page_count > 0){
                        this.resourceList = response.data.items2.res;
                        this.listQuery.total = response.data.items2.page_count;

                        let selectedIndexes = [];
                        for (let i = 0; i < this.resourceList.length; i++){
                            for (let j = 0; j < this.selectedList.length; j++){
                                if (this.resourceList[i].id == this.selectedList[j].id){
                                    selectedIndexes.push(i);
                                    break;
                                }
                            }
                        }
                        var $this = this;
                        this.$nextTick(function () {
                            selectedIndexes.forEach(index => {
                                $this.$refs.multipleTable.toggleRowSelection($this.resourceList[index], true);
                            });
                        })
                    }
                }).catch((e) => {
                    console.log(e);
                })
            },
            getSelectedList(){
                this.group_id = this.id;
                listForEdit({group_id:this.group_id}).then(response => {
                    let resource_id = response.data.items[0].resource_id;
                    if(this.subClick == true){
                        this.selectedList = this.cancelResource;
                        this.cancelArr = this.cancelResource;
                    } else {
                        this.selectedList = JSON.parse(decodeURIComponent(resource_id))
                        this.cancelArr = JSON.parse(decodeURIComponent(resource_id));

                        console.log("selectedList:",this.selectedList);
                    }
                }).catch((e) => {
                    console.log(e);
                })
            },
            handleClose() {
                this.$emit("onResourceStatus", this.cancelArr, this.Click);
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.resource_page = val;
                this.getList();
            },
            handleSelectionChange(val){
                for (let i = 0; i < this.resourceList.length; i++){
                    for (let j = 0; j < this.selectedList.length; j++){
                        if (this.resourceList[i].id == this.selectedList[j].id){
                            this.selectedList.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.selectedList.push(val[i]);
                }
            },
            sourceReset(formName) {
                this.addVisible = false;
                this.$emit("onResourceStatus", this.cancelArr, this.Click);
            },
            sourceSet(formName) {
                this.addVisible = false;
                this.Click = true;
                this.$emit("onResourceStatus",this.selectedList, this.Click);
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
        margin-left: 20px;
    }

    .admin .el_sel {
        margin-left: 20px;
    }

    .admin .el_text {
        margin-left: 158px;
    }

    .admin-form .el-form-item__label {
        /*float: left;*/
        /*min-width: 135px;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
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
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 165px;*/
    }


</style>
