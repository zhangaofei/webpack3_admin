<template>
    <div class="admin public">
        <el-dialog title="查看OAuth认证2"  :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
                    <el-form :model="info" label-width="182px" ref="info">
                        <el-form-item label="OAUTH认证名称" prop="name">
                            <el-input v-model="info.name" class="el_put" placeholder="请输入关键字" :disabled="true"></el-input>
                        </el-form-item>

                        <el-form-item label="OAUTH_URL_AUTH">
                            <el-input  class="el_put" v-model="info.value.OAUTH_URL_AUTH"  placeholder="请输入关键字" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="OAUTH_URL_TOKEN">
                            <el-input  class="el_put" v-model="info.value.OAUTH_URL_TOKEN" placeholder="请输入关键字" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="OAUTH_URL_PROFILE">
                            <el-input  class="el_put" v-model="info.value.OAUTH_URL_PROFILE" placeholder="请输入关键字" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="APP_KEY">
                            <el-input  class="el_put" v-model="info.value.APP_KEY" placeholder="请输入关键字" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="APP_SECRET">
                            <el-input  class="el_put" v-model="info.value.APP_SECRET" placeholder="请输入关键字" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
            <div class='form-footer foot' slot="footer">
                <!--<span @click="handleClose" class="canle">返回</span>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {updateConfig, checkConfig} from 'api/enWAS/config';

    export default {
        components: {},
        props: {
            currentData: Object,
        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                deleteId:[],
                multipleSelection: [],
                Url:{url:''},
                labelPosition: 'left',
                addVisible: true,
                info: {name: '', id: '', value: {OAUTH_URL_AUTH:'', OAUTH_URL_TOKEN:'', OAUTH_URL_PROFILE:'', APP_KEY:'', APP_SECRET:''},
                    keyword:'', external_param:[], OauthExtParaIds:[]}
            }
        },
        created() {
            this.info.name = this.currentData.name;
            this.info.id = this.currentData.id;
            this.info.value = JSON.parse(this.currentData.value);
            this.info.external_param = JSON.parse(this.currentData.external_param);
            this.deleteId = JSON.parse(this.currentData.external_param);
            this.info.keyword = this.currentData.keyword;
            this.info.OauthExtParaIds = [];
            console.log('deleteId:', this.deleteId);
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
            },
            submitInfo(formName){
                this.addVisible = false;
            }
        }
    }
</script>
<style>

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

</style>
