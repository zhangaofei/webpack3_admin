<template>
    <div class="black public">
        <el-dialog title="查看可信域" :visible.sync="editVisible" @close="handleClose" @open="doInit(currentData)" size="small"
                   custom-class="dialog public" top="10%">
            <div class="admin-form">
                <el-form :model="editInfo"  label-width="142px" ref="addInfo" :rules="rules">
                    <el-form-item label="可信域名称" prop="name">
                        <el-input v-model="editInfo.name" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input v-model="editInfo.describ" placeholder="说明" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <el-table
                                ref="multipleTable"
                                :data="editInfo.domain"
                                :header-cell-style="headerCellStyle"
                                border
                                tooltip-effect="dark"
                                style="width: 65%;max-height: 206px;margin-left:100px;overflow-y: auto"
                        >
                            <el-table-column
                                    label="域名"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.variable" :disabled="true" placeholder="请输入域名" class="route_put metrics"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="递归"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.referer" :disabled="true" placeholder="请选择是否递归"  class="route_put">
                                        <el-option label="是" value="1"></el-option>
                                        <el-option label='否' value="0" ></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"></div>
        </el-dialog>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import {updateBlackName, getDomainList} from 'api/enWAS/whiteList';

    export default {
        components: {},
        computed: {
            ...mapGetters([
                'appRoles'
            ])
        },
        props: {
            currentData: Object,
        },
        data() {
            return {
                rules:{
                    name: [
                        {required: true, trigger: 'blur'}
                    ]
                },
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                multipleSelection:[],
                editVisible: true,
                editInfo: {id: '', name: '',  domain: [], describ:''},
            }
        },
        created() {
            this.getList();
            this.doInit(this.currentData)

        },
        methods: {
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
            },
            doInit(currentData){
                this.editVisible = true;
                this.editInfo.id = currentData.id;
                this.editInfo.name = currentData.name;
            },
            getList() {
                getDomainList({black_id: this.currentData.id}).then(response => {
                    const items = response.data.items;
                    if (items.length > 0) {
                        let d = items[0]['black_domian']
                        if(d=='' || d== null || d==undefined ||d== 'null'){
                            return
                        }else{
                            this.editInfo.domain = JSON.parse(d);
                        }

                    }
                })
            },
            submitInfo(editInfo) {
                        this.editInfo.domain = [];
                        this.editVisible = false;
                        this.$emit('onChangeStatus');
            }
        }
    }
</script>
<style>

    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/

    /*!* 设置弹出框大小*!*/
    /*.admin .dialog {*/
        /*min-width: 830px;*/
    /*}*/

    /*.admin .el-dialog__header {*/
        /*padding-left: 5px;*/
    /*}*/

    /*.admin .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 65% !important;*/
        /*margin-left: 80px;*/
    /*}*/

    /*.admin .el_sel {*/
        /*width: 65% !important;*/
        /*margin-left: 80px;*/
    /*}*/

    /*.admin .el_text {*/
        /*margin-left: 158px;*/
    /*}*/

    /*.admin-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 135px;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/

    /*.admin-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.admin .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.admin-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 165px;*/
    /*}*/


</style>
