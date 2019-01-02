<template>
    <div class="admin public">
        <el-dialog title="查看OAuth认证"  :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-tabs type="border-card">
                <el-tab-pane label="基础参数">
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
                </el-tab-pane>
                <el-tab-pane label="扩展组参数">
                    <el-form :model="info"  label-width="182px" ref="info">
                        <el-form-item label="扩展组关键字">
                            <el-input v-model="info.keyword" placeholder="扩展组关键字" class="el_put" :disabled="true"></el-input>
                        </el-form-item>
                        <el-table
                                ref="multipleTable"
                                :data="info.external_param"
                                :header-cell-style="headerCellStyle"
                                border
                                tooltip-effect="dark"
                                style="width: 65%;max-height: 206px;margin-left:202px;overflow-y: scroll"
                                >
                            <el-table-column
                                    label="扩展组名称" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.external_name" placeholder="请输入扩展组名称" :disabled="true" class="route_put metrics"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="扩展组属性" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.external_value" placeholder="请输入扩展组属性" :disabled="true" class="route_put metrics"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
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
