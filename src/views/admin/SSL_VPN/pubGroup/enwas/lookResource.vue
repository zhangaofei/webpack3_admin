<template>
    <div class="admin public">
        <el-dialog title="查看应用关联组" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <!--enwasAppList resourceList-->
            <el-table
                    ref="multipleTable"
                    :data="enwasAppList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @select="handleSelect"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="80"
                        align="center"
                        :disabled="true"
                        :selectable="isAvailable"
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
                            :current-page="pageList.page"
                            :page-sizes="[10]"
                            :page-size="pageList.page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pageList.total">
                    </el-pagination>
                </div>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <!--<span class="canle"  @click="sourceReset">取消</span>-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--class="btn_save"-->
                            <!--@click="sourceSet">-->
                        <!--保存-->
                    <!--</el-button>-->

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    // import {grouplistForAdd, listForEdit} from "api/enWAS/group";
    import {getEnwasAll, grouplistForAdd, listForEdit, modifyAssociation, updateAppsForGroup} from "api/enWAS/group";
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
                Click:false,
                info: {
                    group_id: '',
                    resource_id: [],
                    black_id: [],
                    remark:''
                },
                /*新分页  参数*/
                pageList: {
                    page:1,
                    page_size:10,
                    total:10,
                    group_id:''
                },
                enwasAppList:[],
                selectArr:[]
            }
        },
        props:['id','cancelResource', 'subClick','objData'],
        created() {
            this.getSelectedList();
            this.getList();
            this.selectedList = [];
        },

        methods: {
            isAvailable(row){
                return false;
            },
            getList(){
                this.pageList.group_id = this.objData.id;
                this.info.group_id = this.objData.id;
                this.info.remark = this.objData.remark;
                getEnwasAll(this.pageList).then(response => {
                    // this.resourceList = response.data.items2.res;
                    // this.listQuery.total = response.data.items2.page_count;
                    this.enwasAppList=response.data.items.res;
                    this.pageList.total = response.data.items.page_count;
                    let selectedIndexes = [];
                    this.enwasAppList.forEach((row,index,arr) => {
                        if(row.status==1){
                            this.$nextTick(()=>{
                                this.$refs.multipleTable.toggleRowSelection(row);
                            })
                        }
                    });

                }).catch((e) => {
                    console.log(e);
                })
            },

            getSelectedList(){
                listForEdit({group_id:this.id}).then(response => {
                    let resource_id = response.data.items[0].resource_id;
                    if(this.subClick == true){
                        this.selectedList = this.cancelResource;
                        this.cancelArr = this.cancelResource;
                    } else {
                        this.selectedList = JSON.parse(decodeURIComponent(resource_id))
                        this.cancelArr = JSON.parse(decodeURIComponent(resource_id));

                        console.log("selectedList_res:",this.selectedList);
                    }
                }).catch((e) => {
                    console.log(e);
                })
            },
            handleClose() {
                this.$emit("onResourceStatus", this.cancelArr, this.Click);
            },
            doTest() {
                this.addVisible = true;
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.pageList.page = val;
                this.getList();
            },
            handleSelect(val,row){
                this.curRow=row;
                let flag=val.some((item)=>{
                    if(this.curRow){
                        return item.id==this.curRow.id
                    }
                });
                if(!flag){
                    this.selectedList=this.selectedList.filter((item)=>{
                        if(this.curRow){
                            return item.id!=this.curRow.id
                        }
                    });
                }
            },
            handleSelectionChange(val){
                let len = Math.ceil(this.pageList.total/this.pageList.page_size);
                this.selectArr.length = len;
                this.selectArr[this.pageList.page] = val.map(item => item);
                let arr = [];
                this.selectArr.forEach(item => {
                    if (item instanceof Array) {
                        item.forEach(child => {
                            arr.push(child);
                        })
                    }
                });
                this.selectedList = [...this.selectedList, ...arr];
                let obj = {};
                this.selectedList = this.selectedList.reduce((cur,next) => {
                    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
                    return cur;
                },[]);
                if(val.length==0){
                    for(let i=0;i<this.enwasAppList.length;i++){
                        for(let j=0;j<this.selectedList.length;j++){
                            if (this.selectedList[j].id == this.enwasAppList[i].id){
                                this.selectedList.splice(j, 1);
                                j--;
                            }
                        }
                    }
                }
                /*for (let i = 0; i < this.enwasAppList.length; i++){
                    for (let j = 0; j < this.selectedList.length; j++){
                        if (this.enwasAppList[i].id == this.selectedList[j].id){
                            this.selectedList.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.selectedList.push(val[i]);
                }*/
            },
            sourceReset(formName) {
                this.addVisible = false;
                this.$emit("onResourceStatus", this.cancelArr, this.Click);
            },
            sourceSet(formName) {

                if (this.selectedList.length > 0){
                    for (let item of this.selectedList) {
                        this.info.resource_id.push({name: item.name, id: item.id});
                    }
                }
                this.info.resource_id = encodeURI(JSON.stringify(this.info.resource_id));
                this.info.black_id = encodeURI(JSON.stringify(this.info.black_id));
                modifyAssociation(this.info).then((resp) => {
                    if(resp.status==1){
                        this.$message({
                            type:'success',
                            message:'关联成功！'
                        });
                        this.addVisible = false;
                        this.$emit("onResourceStatus", this.selectedList);
                    }else if(resp.status==-1){
                        this.$message({
                            type:'warning',
                            message:resp.msg
                        });
                    }else {
                        this.$message({
                            type:'warning',
                            message:'关联失败！'
                        });
                    }
                }).catch(e => {
                    console.log("关联出错", e);
                });
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
        width: 65% !important;
        margin-left: 20px;
    }

    .admin .el_sel {
        width: 65% !important;
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
        margin-bottom: 17px;
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
