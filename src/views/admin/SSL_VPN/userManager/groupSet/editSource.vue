<template>
    <div class="sourceList-dialog public">
        <el-dialog title="设置资源"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose" @open="doSource(groupId)"
        >
            <div style="padding: 0 20px 0 20px">
                {{resourceList}}
                <el-table
                        ref="multipleTable"
                        :data="resourceList"
                        :header-cell-style="headerCellStyle"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleResourceSelectionChange">
                    <el-table-column
                            align="center"
                            type="selection"
                            slot-scope="scope"
                            :selectable = "isAvailable"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="appName"
                            label="扩展组"
                    >
                        <template slot-scope="scope">{{ scope.row.external_name}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="appType"
                            align="center"
                            label="当前用户组"
                    >
                        <template slot-scope="scope">{{ scope.row.usedGroupName}}</template>
                    </el-table-column>
                </el-table>

                <div class="row" style="margin-top:8px;" >
                    <div class="block" style="margin-right: 2%;float: right" >
                        <el-pagination
                                @size-change="handleAppSizeChange"
                                @current-change="handleAppCurrentChange"
                                :current-page="resourceQuery.currentPage"
                                :page-sizes="[2]"
                                :page-size="resourceQuery.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="resourceQuery.total">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div  style="margin-right: 11%;">
                    <span @click="cancelAction"  class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="sourceSet">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getEnvasOauthList} from 'api/SSL_VPN/userManager/new-groupSet';
    export default {
        computed: {},
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                selectedCheck:true,
                reserveSelection:true,
                InfoVisible: true,
                resourceQuery:{
                    currentPage: 1,
                    pageSize: 2,
                    total:0,
                    groupId:'',
                    authId:''
                },
                resourceList:[],
                allSelectedResource:[],
                selectedAuthList:[],//临时数组
                cancelSelected:[],
                list:[],
                click:false
            }
        },
        created() {
            this.getResourceList();
        },
        props:["groupId","authId", 'cancelSource', 'sourceCk'],
        methods: {
            isAvailable(row, index){
                if (row.usedGroupId == this.groupId || row.usedGroupId == null){
                    return 1;
                } else {
                    return 0;
                }
            },
            handleClose() {
                this.$emit("onSourceStatus",this.cancelSelected, this.click);
            },
            doSource(groupId){
                this.InfoVisible = true;
            },
            getResourceList(){
                this.resourceQuery.authId = this.authId;
                this.resourceQuery.groupId= this.groupId;
                getEnvasOauthList(this.resourceQuery).then(resp=>{
                    this.resourceList=resp.data.oauthList;
                    this.resourceQuery.total=resp.extend.page.totalHits;
                    if (this.selectedCheck){
                        this.selectedCheck= false;
                        for (let i = 0; i < resp.data.nowUsedAuthList.length; i++){
                            if(this.authId == resp.data.nowUsedAuthList[i].oauthId){
                                this.allSelectedResource = resp.data.nowUsedAuthList[i].oauthExtParaIds;
                            }
                        }
                        this.selectedAuthList = this.selectedAuthList.concat(resp.data.nowUsedAuthList);//接收后台返回的所有被关联的选项
                        this.cancelSelected = this.cancelSelected.concat(resp.data.nowUsedAuthList);
                    }
                    let selectedIndexes = [];
                    for (let i = 0; i < this.resourceList.length; i++){
                        for (let j = 0; j < this.allSelectedResource.length; j++){
                            if (this.resourceList[i].external_id == this.allSelectedResource[j].external_id){
                                selectedIndexes.push(i);
                                break;
                            }
                        }
                    }
                    console.log('resourceList',this.resourceList)
                    var $this = this;
                    this.$nextTick(function () {
                        selectedIndexes.forEach(index => {
                            $this.$refs.multipleTable.toggleRowSelection($this.resourceList[index], true);
                        });
                    })
                }).catch(err=>{
                    console.log("获取用户组资源发生错误：",err);
                })
            },
            handleAppSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.resourceQuery.pageSize = val;
                this.getResourceList();
            },
            handleAppCurrentChange(val) {
                this.resourceQuery.currentPage = val;
                this.getResourceList();

            },
            //点击复选框的方法
            handleResourceSelectionChange(val) {
                for (let i = 0; i < this.resourceList.length; i++){
                    for (let j = 0; j < this.allSelectedResource.length; j++){
                        if (this.resourceList[i].external_id == this.allSelectedResource[j].external_id){
                            this.allSelectedResource.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.allSelectedResource.push(val[i]);
                }

                for (let i = 0; i < this.list.length; i++){
                    for(let j = 0; j < this.resourceList.length; j++){
                        if (this.list[i].external_id == this.resourceList[j].external_id){
                            this.list.splice(i, 1);
                            i--;
                            break;
                        }
                    }
                }
                this.list = this.list.concat(val);
            },
            sourceSet(){
                //封装
                if (this.list.length > 0){
                    let ids = [];
                    for (let i = 0; i < this.list.length; i++){
                        ids.push({external_id: this.list[i].external_id})
                    }
                    let existed = false;
                    for(let i = 0; i < this.selectedAuthList.length; i++){
                        if (this.authId == this.selectedAuthList[i].oauthId) {
                            existed = true;
                            for(let j = 0; j < this.selectedAuthList[i].oauthExtParaIds.length; j++){
                                for (let m = 0; m < this.resourceList.length; m++) {
                                    if (this.selectedAuthList[i].oauthExtParaIds[j].external_id == this.resourceList[m].external_id) {
                                        this.selectedAuthList[i].oauthExtParaIds.splice(j, 1);
                                        j--;
                                        break;
                                    }
                                }
                            }
                            this.selectedAuthList[i].oauthExtParaIds = ids;
                        }
                    }
                    if (!existed) {
                        this.selectedAuthList.push({
                            oauthId: this.authId,
                            oauthExtParaIds: ids
                        });
                    }
                }
                this.click = true;
                this.$emit("onSourceStatus",this.selectedAuthList, this.click);
                this.InfoVisible = false;
            },
            cancelAction(){
                this.InfoVisible = false;
                this.$emit("onSourceStatus",this.cancelSelected, this.click);
            }
        }
    }
</script>
<style>
    .sourceList-dialog .el-dialog__body{
        min-height: 630px!important;
    }
    .sourceList-dialog .dialog{
        min-width: 850px;
    }
    .sourceList-dialog .el-dialog__header{
        padding-left:5px ;
    }
    .sourceList-dialog__footer {
        background-color: #E7E7E7;
        border-top: 1px solid #E7E7E7;
        height: 100px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
</style>