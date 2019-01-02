<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-folder-open"></i>计费管理</a></li>
                <li class="active">充值--退费--查询</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="height: 700px;">
                        <div class="box-header">
                            <h3 class="box-title">充值--退费--查询</h3>
                        </div>
                        <div style="margin-top: 20px" class="box-body">
                            请输入用户账号
                            <el-input v-model="username" placeholder="请输入用户账号" style="width: 200px;margin-left: 10px;margin-right: 25px"></el-input>
                            <el-button @click="onHandle('pay')" type="primary" class="primary">充值</el-button>
                            <el-button @click="onHandle('back')" type="primary" class="primary">退费</el-button>
                            <el-button @click="onHandle('query')" type="primary" class="primary">查询</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <pay  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isPayShow"/>
        <back  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isBackShow"/>
        <subQuery @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isQueryShow"/>
    </div>
</template>


<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import pay from "./pay"
    import back from "./back"
    import subQuery from "./subQuery.vue"
    import {getAccountInfo} from "../../../../../api/SSL_VPN/accountManager/query";
    export default{
        components: {
            pay,
            back,
            subQuery
        },
        data(){
            return {
                readOnly:false,
                pageId:81,
                isPayShow: false,
                isBackShow: false,
                isQueryShow:false,
                currentData:'',
                username:''
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
        },
        methods: {
            onChangeStatus() {
                this.isPayShow = false;
                this.isBackShow = false;
                this.isQueryShow = false;
            },
            onHandle(type) {
                if(!this.username){
                    this.$message({
                        type: 'warning',
                        message: '请输入用户账号名称!'
                    });
                } else {
                    getAccountInfo({userName:this.username}).then(resp => {
                        if (resp.status == 'SUCCESS') {
                            if(this.readOnly == true){
                                this.$message({
                                    type: 'warning',
                                    message: '您的权限为只读!'
                                });
                            } else {
                                if(type == 'pay'){
                                    this.isPayShow = true;
                                } else if(type == 'back'){
                                    this.isBackShow = true;
                                } else {
                                    this.isQueryShow = true;
                                }
                                this.currentData = this.username;
                            }
                        } else {
                            if (resp.code.error == "ERROR_COMMON_NAME_DATA__NOT_EXIST"){
                                this.$message({
                                    type: 'warning',
                                    message: '该用户没有开启计费模式!'
                                });
                            }
                        }
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>
