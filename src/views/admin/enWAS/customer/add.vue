<template>
    <div class="admin">
        <el-dialog title="新建客户" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog" top="10%">
            <div class="admin-form">
                <el-form :model="info" label-width="80px" :rules="rules" ref="info">
                    <el-form-item label="用户名称" prop="name">
                        <el-input v-model="info.name" aria-required="true" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input class="inline-input el_put" v-model="info.ip"
                                  style="width: 50%!important;margin-left:212px;vertical-align:middle;"
                                  placeholder="IP"></el-input>
                        <el-button type="primary" @click="onAddIP">添加</el-button>

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
                                               @click="onDeleteItem(scope.$index)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
            </div>

            <div class='form-footer ' slot="footer" style="height:50px;">
                <div style="margin-top: 20px;margin-right: 151px;">
                    <el-button
                            @click="resetForm('info')" style="margin-right: 40px;background-color: #fff">
                        取消
                    </el-button>
                    <el-button
                            type="primary"
                            @click="submitInfo('info')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {addCustomer} from  'api/enWAS/customer';
    export default {
        components: {},
        props: {
            parents: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {
                labelPosition: 'left',
                addVisible: true,
                ip: '',
                info: {name: '',ip: '',},
                IPs: [],
                parentTypes: this.parents,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    value: [{required: true, message: '请输入值', trigger: 'blur'}]
                }
            }
        },
        created() {
//            this.addVisible = true

        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
//            hiden: function () {
//                this.addVisible = false
//            },
//            show(parentTypes) {
//                if (this.info) {
//                    this.$refs.info.resetFields()
//                }
//                this.parentTypes = parentTypes
//                this.addVisible = true
//            },
            onAddIP: function () {
                this.IPs.push({ip: this.info.ip})
            },
            onDeleteItem: function (index) {
                console.log('...' + index)
                this.IPs.splice(index, 1)
            },
            submitInfo(formName){
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        this.info.ips = JSON.stringify(this.IPs)
                        addCustomer(this.info).then(resp=> {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:'新建失败！'
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
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
        /*left: 165px;*/
        left: 212px !important;
    }


</style>
