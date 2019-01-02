<template>
    <div class="group public">
        <el-dialog title="查看用户组授权" :visible.sync="editVisible" size="small" custom-class="dialog public" top="10%"
                   @close="handleClose" @open="doInit(currentData)">
            <div class="group-form">
                <el-form :model="editInfo" ref="editInfo" label-width="142px" class="demo-ruleForm" :rules="rules">
                    <el-form-item label="用户组" prop="" class="item_mark">
                        <el-input placeholder="请输入用户组" v-model="group_name" :disabled="true" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input placeholder="请输入说明" v-model="editInfo.remark" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label='Enwas应用设置'>
                        <el-button type="text" @click="setSource()" style="">查看选择</el-button>
                        <el-button type="text" @click="setEnwasRank()" style="margin-left: 20px">查看应用排序</el-button>
                    </el-form-item>
                    <el-form-item label='Enssl应用设置'>
                        <el-button type="text" @click="setEnssl()" style="" >查看选择</el-button>
                        <el-button type="text" @click="setEnsslRank()" style="margin-left: 20px">查看应用排序</el-button>
                    </el-form-item>
                    <el-form-item label='web终端应用设置'>
                        <el-button type="text" @click="setWebend('source')" style="">查看选择</el-button>
                        <el-button type="text" @click="setWebend('rank')" style="margin-left: 20px">查看应用排序</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <!--<span class="cancle btn_middle" @click="resetForm('editInfo')">取消</span>-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--class="primary confrim btn_middle"-->
                            <!--@click="submitInfo('editInfo')">-->
                        <!--确定-->
                    <!--</el-button>-->
                </div>
            </div>
        </el-dialog>
        <lookResource  @onResourceStatus="onResourceStatus" v-if="isAddResourceShow" :id="id" :objData="objData"  :cancelResource="cancelResource" :subClick="subClick"/>
        <lookEnwasRank @onEnwasRankStatus="onEnwasRankStatus" v-if="isEnwasRankShow" :id="id" :objData="objData"/>
        <!--enssl-->
        <lookEnssl  @onEnsslStatus="onEnsslStatus" v-if="isEnsslShow" :id="id" :objData="objData" :cancelResource="cancelResource" :selectEnsslClick="selectEnsslClick"/>
        <lookEnsslRank @onEnsslRankStatus="onEnsslRankStatus" v-if="isEnsslRankShow" :id="id" :objData="objData"/>
        <!--webend-->
        <lookWebend @onWebendStatus="onWebendStatus" v-if="isWebendShow" :objData="objData" :id="id" />
        <lookWebendRank @onWebendRankStatus="onWebendRankStatus" v-if="isWebendRankShow" :id="id" :objData="objData"/>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {grouplistForAdd, modifyAssociation, listForEdit} from "api/enWAS/group";
    import lookResource from './enwas/lookResource.vue'
    import lookEnwasRank from './enwas/lookEnwasRank.vue'
    /*updateAppsForGroup*/
    import lookEnssl from './enssl/lookEnssl.vue'
    import lookEnsslRank from './enssl/lookEnsslRank.vue'
    import lookWebend from './webend/lookWebend.vue'
    import lookWebendRank from './webend/lookWebendRank.vue'

    export default {
        components: {
            lookResource,
            lookEnwasRank,
            lookEnssl,
            lookEnsslRank,
            lookWebend,
            lookWebendRank
        },
        data() {
            var name = (rule, value, callback) => {
                callback();
            };
            return{
                rules:{
                    // group_id: [
                    //     {required:true, message: name, trigger: 'blur'}
                    // ]
                },
                isAddResourceShow: false,
                isAddTrustDomainShow: false,
                isEnwasRankShow:false,
                isWebendShow:false,
                isWebendRankShow:false,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    searchContent: null,
                    total:0
                },
                editInfo: {
                    group_id: '',
                    resource_id: [],
                    black_id: [],
                    remark:''
                },
                group_name:'',
                blackSelected:[],
                resourceSelected:[],
                blackSelectedList:[],
                resourceSelectedList:[],
                ensllSelected:[],
                editVisible: true,
                id:'',
                resourceClick:false,
                blackClick:false,
                subClick:false,
                enwasRankClick:false,
                cancelResource:[],
                cancelEnwasRank:[],
                /*enssl*/
                selectEnsslClick:false,
                isEnsslShow:false,
                ensslClick:false,
                isEnsslRankShow:false,
                objData:{
                    id:'',
                    remark:''
                }
            }
        },
        props:['currentData'],
        created() {
            this.getResourceSelectedList();
            this.getBlackSelectedList();
            this.doInit(this.currentData)
        },
        methods: {
            doInit(data){
                console.log('data',data)
                this.editVisible = true;
                this.group_name = data.groupName;
                this.editInfo.group_id = data.id;
                this.editInfo.remark = data.remark;
                this.id = data.id;
                this.objData=data;
            },
            /*enwas*/
            onResourceStatus(data, subClick){
                this. isAddResourceShow = false;
                this.resourceSelected = data;
                this.cancelResource = data;
                this.subClick = subClick;
            },
            onEnwasRankStatus(data, enwasRankClick){
                this.isEnwasRankShow = false;
                this.resourceSelected = data;
                this.cancelEnwasRank = data;
                this.enwasRankClick = enwasRankClick;
            },
            onWebendStatus(data){
                this.isWebendShow = false;
            },
            onWebendRankStatus(data){
                this.isWebendRankShow = false;
            },
            /*enssl*/
            onEnsslStatus(data, subClick){
                this.isEnsslShow = false;
                // this.ensllSelected = data;
            },
            onEnsslRankStatus(){
                this.isEnsslRankShow=false
            },
            /*========*/
            setSource(data){
                this.resourceClick = true;
                this.isAddResourceShow = true;
            },
            setEnwasRank(data){
                this.blackClick = true;
                this.isEnwasRankShow = true;
            },
            setEnssl(){
                this.selectEnsslClick = true;
                this.isEnsslShow = true;
            },
            setEnsslRank(){
                this.ensslClick = true;
                this.isEnsslRankShow = true;
            },
            setWebend(type){
                if(type == 'source'){
                    this.isWebendShow = true;
                } else {
                    this.isWebendRankShow = true;
                }
            },
            handleClose() {
                this.changeStatus();
            },

            changeStatus() {
                this.$emit("onChangeStatus")
            },
            //后台获取所有被关联的资源
            getResourceSelectedList(){
               /* listForEdit({group_id:this.currentData.id}).then(response => {
                    let resource_id = response.data.items[0].resource_id;
                    this.resourceSelectedList = JSON.parse(decodeURI(resource_id));
                }).catch((e) => {
                    console.log(e);
                })*/
            },
            //后台获取所有被关联的信用域
            getBlackSelectedList(){
               /* listForEdit({group_id:this.currentData.id}).then(response => {
                    let black_id = response.data.items2[0].black_id;
                    this.blackSelectedList = JSON.parse(decodeURI(black_id));
                }).catch((e) => {
                    console.log(e);
                })*/
            },
           /* submitInfo(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.resourceSelected.length> 0){
                            for (let item of this.resourceSelected) {
                                this.editInfo.resource_id.push({name: item.name, id: item.id});
                            }
                        }else if (this.resourceSelectedList.length > 0){
                            for (let item of this.resourceSelectedList) {
                                this.editInfo.resource_id.push({name: item.name, id: item.id});
                            }
                        }
                        /!*=========*!/

                        this.editInfo.resource_id = encodeURI(JSON.stringify(this.editInfo.resource_id));
                        this.editInfo.black_id = encodeURI(JSON.stringify(this.editInfo.black_id));
                        modifyAssociation(this.editInfo).then((resp) => {
                            if(resp.status==1){
                                this.$message({
                                    type:'success',
                                    message:'编辑成功！'
                                });
                                this.editVisible = false;
                            }else if(resp.status==-1){
                                this.$message({
                                    type:'warning',
                                    message:resp.msg
                                });
                            }else {
                                this.$message({
                                    type:'warning',
                                    message:'编辑失败！'
                                });
                            }
                        }).catch(e => {
                            console.log("编辑出错", e);
                        });
                        /!*ensll*!/
                        // updateAppsForGroup(this.id, this.ensllSelected).then(response => {
                        //     // this.$emit("onChangeStatus");
                        // }).catch((e) => {
                        //     console.log(e);
                        // })

                    } else {

                        return false;
                    }
                });
            },*/
            /*resetForm(formName) {
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },*/
        },
    }
</script>
<style>
    .sort_icon{
        font-size: 24px;
        color: #438afe ;
        cursor: pointer;
    }


</style>