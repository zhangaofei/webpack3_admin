<template>
    <div class="admin public">
        <el-dialog title="选择应用关联组排序" claass="sort_tab" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-table
                    ref="multipleTable"
                    :data="selectedList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%;max-height: 450px;overflow-y: auto"
                    row-key="id" fit highlight-current-row
                    class="sort_tab"
                    @selection-change="handleSelectionChange">
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
                <el-table-column
                        label="排序"
                        align="center"
                >
                    <template slot-scope="scope">
                        <span @click="shiftTop(scope.row,scope.$index,selectedList)" v-if="scope.$index==0?false:true"><i class="el-icon-sort-up sort_icon"></i></span>&nbsp;&nbsp;
                        <span  @click="shifBottom(scope.row,scope.$index,selectedList)" v-if="scope.$index==selectedList.length-1?false:true"><i class="el-icon-sort-down sort_icon"></i></span>
                    </template>

                </el-table-column>
            </el-table>
            <div class="row" style="margin-top:8px;" id="pages_list" v-if="false">
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
                    <span class="canle"  @click="sourceReset">取消</span>
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
    import {grouplistForAdd, modifyAssociation, listForEdit,getEnwasAll} from "api/enWAS/group";
    import Sortable from 'sortablejs'
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
                topShow:false,
                bottomShow:false,
                info: {
                    group_id: '',
                    resource_id: [],
                    black_id: [],
                    remark:''
                },
                sortable:null,
                /*新分页  参数*/
                pageList: {
                    page:1,
                    page_size:10000,
                    total:10,
                    group_id:''
                },
                enwasAppList:[]
            }
        },
        props:['id','cancelResource', 'subClick','objData'],
        created() {
            console.log('objData',this.objData)
            this.info.group_id = this.objData.id;
            this.info.remark = this.objData.remark;
            this.pageList.group_id = this.objData.id;
            this.getSelectedList();
            this.selectedList = [];
        },
        methods: {
            shiftTop(row,index,list){

                let temp;
                let [...arrList]=list;
                temp=arrList[index-1];
                arrList[index]=temp;
                arrList[index-1]=list[index];
                this.selectedList=arrList;
            },
            shifBottom(row,index,list){
                let temp;
                let [...arrList]=list;
                temp=arrList[index+1];
                arrList[index]=temp;
                arrList[index+1]=list[index];
                this.selectedList=arrList;
            },
            getSelectedList(){
                /*获取关联的用户组的应用 数组*/
               /* listForEdit({group_id:this.objData.id}).then(response => {
                    let resource_id = response.data.items[0].resource_id;

                    this.selectedList = JSON.parse(decodeURIComponent(resource_id))
                    this.cancelArr = JSON.parse(decodeURIComponent(resource_id));
                    console.log("selectedList_rank:",this.selectedList);
                    this.$nextTick(() => {
                        this.setSort()
                    })
                }).catch((e) => {
                    console.log(e); 
                })*/
                /*=================*/
                getEnwasAll(this.pageList).then(response => {
                    this.pageList.total = response.data.items.page_count;
                    this.enwasAppList=response.data.items.res;
                    let selectedIndexes = [];
                    this.selectedList=[];
                    this.enwasAppList.forEach((row,index,arr) => {
                        if(row.status==1){
                            this.$nextTick(()=>{
                                this.setSort()
                            })
                            this.selectedList.push(row)
                        }
                    });
                }).catch((e) => {
                    console.log(e);
                })
            },

            setSort() {
                const el = document.querySelectorAll('.sort_tab  table  tbody')[0];
                this.sortable = Sortable.create(el, {
                    ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                    setData: function(dataTransfer) {
                        // to avoid Firefox bug
                        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                        dataTransfer.setData('Text', '')

                    },
                    onEnd: evt => {
                        const targetRow = this.selectedList.splice(evt.oldIndex, 1)[0]
                        this.selectedList.splice(evt.newIndex, 0, targetRow)
                    }
                })
            },
            handleClose() {
                this.$emit("onEnwasRankStatus", this.cancelArr, this.Click);
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
                this.$emit("onEnwasRankStatus", this.cancelArr, this.Click);
            },
            sourceSet(formName) {
                console.log('info==',this.info,this.selectedList)
                if (this.selectedList.length > 0){
                    for (let item of this.selectedList) {
                        this.info.resource_id.push({name: item.name, id: item.id,protocol: item.protocol,describ: item.describ});
                    }
                }
                this.info.resource_id = encodeURI(JSON.stringify(this.info.resource_id));
                this.info.black_id = encodeURI(JSON.stringify(this.info.black_id));

                modifyAssociation(this.info).then((resp) => {
                    if(resp.status==1){
                        this.$message({
                            type:'success',
                            message:'排序成功！'
                        });
                        this.addVisible = false;
                        this.$emit("onEnwasRankStatus", this.selectedList);
                    }else if(resp.status==-1){
                        this.$message({
                            type:'warning',
                            message:resp.msg
                        });
                    }else {
                        this.$message({
                            type:'warning',
                            message:'排序失败！'
                        });
                    }
                }).catch(e => {
                    console.log("排序出错", e);
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
