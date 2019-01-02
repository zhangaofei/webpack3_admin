<template>
    <div class="admin">
        <el-dialog title="查看客户" :visible.sync="lookVisible" @close="handleClose" @open="doInit(currentData)" size="small"
                   custom-class="dialog" top="10%">
            <div class="admin-form">
                <el-form :model="info" label-width="80px" :rules="rules" ref="info">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="info.name" aria-required="true" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input class="inline-input el_put" v-model="info.ip"
                                  style="width:50%!important;margin-left:212px;vertical-align:middle;"
                                  placeholder="IP" :disabled="true"></el-input>
                        <el-button type="primary" @click="onAddIP" :disabled="true">添加</el-button>

                    </el-form-item>
                    <el-form-item>
                        <el-table :data="IPs" height="250" border fit highlight-current-row v-if="IPs.length >= 0"
                                  style="width: 65%;margin-left: 214px;">
                            <el-table-column label="IP">
                                <template slot-scope="scope">
                                    <span>{{scope.row.ip}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="170">
                                <template slot-scope="scope">
                                    <el-button class="fa fa-trash" size="small" type="primary"
                                               @click="onDeleteItem(scope.$index)" :disabled="true"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div style="margin-top: 20px;margin-right: 11%">
                    <el-button
                            type="primary"
                            @click="resetForm()">
                        关闭
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import {updateCustomer, getCustomerIP} from  'api/enWAS/customer';

    export default {
        components: {},
//        props: {
//            currentData: {
//                type: Object,
//                default: function () {
//                    return {id: '', name: ''}
//                }
//            },
//            parents: {
//                type: Array,
//                default: function () {
//                    return []
//                }
//            }
//        },
        props: {
            currentData: Object,
        },
        data() {
            return {
                labelPosition: 'left',
                IPs: [],
                ip: '',
                lookVisible: true,
                parentTypes: this.parents,
//                info: {id: this.currentData.id, name: this.currentData.name},
                info: {id: '', name: '',ip: ''},
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    value: [
                        {required: true, message: '请输入值', trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
            getCustomerIP({id: this.currentData.id}).then(response => {
                const data = response.data;
                this.IPs = data.items;
                this.listLoading = false;
                this.doInit(this.currentData)
            })

        },
        methods: {
//            hiden: function () {
//                this.lookVisible = false
//            },
//            show(val) {
//                if (this.$refs.hasOwnProperty('info') && this.$refs.info != null) {
//                    this.$refs['info'].resetFields()
//                }
//                this.info = {id: val.id, name: val.name}
//
//                getCustomerIP({id: val.id}).then(response => {
//                    const data = response.data;
//                    this.IPs = data.items;
//
//                    this.listLoading = false;
//                })
//
//
//                this.lookVisible = true
//            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doInit(currentData){
                this.lookVisible = true;

                this.info = currentData;
                console.log("doEditinit", currentData)
                console.log(this.editInfo, 'this.editInfo')

            },
            onAddIP: function () {
                this.IPs.push({ip: this.info.ip})
            },
            onDeleteItem: function (index) {
                console.log('...' + index)
                this.IPs.splice(index, 1)
            },
            resetForm() {
                this.lookVisible = false;
            },
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
        margin-left: 80px;
    }

    .admin .el_sel {
        margin-left: 80px;
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
