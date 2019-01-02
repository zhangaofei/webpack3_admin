<template>
    <div class="ruled public">
        <el-dialog title="编辑规则库" :visible.sync="editVisible"  @close="handleClose" @open="doInit(currentData)" size="small"
                   custom-class="dialog public" top="10%">
            <div class="ruled-form">
                <el-form :model="info"  label-width="80px" :rules="rules" ref="info" style="margin-left:-75px;">
                    <el-form-item label="名称" prop="name">
                        <el-input class="inline-input el_put" v-model="info.name" style="width:300px;" placeholder="名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处理阶段" prop="parts">
                        <el-select v-model="info.partId" class="filter-item el_put" filterable placeholder="类型" style="width:300px;display: inline-table">
                            <el-option
                                    v-for="item in parts"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="条件">
                        <!--<el-autocomplete-->
                                <!--style="width:150px;"-->
                                <!--class="inline-input"-->
                                <!--v-model="variable"-->
                                <!--:fetch-suggestions="querySearch"-->
                                <!--placeholder="变量"-->
                        <!--&gt;</el-autocomplete>-->
                        <el-select v-model="variable" class="filter-item el_sel el_put" filterable placeholder="变量" @change="chang" style="width:150px;display: inline-table">
                            <el-option
                                    v-for="item in variableT"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="compare" class="filter-item el_sel" filterable placeholder="运算" @change="chang" style="width:150px;display: inline-table">
                            <el-option
                                    v-for="item in compareT"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input class="inline-input el_put" v-model="info.value" style="width:150px;" placeholder="值"></el-input>
                        <el-button type="primary" @click="onAddCondition" class="primary confirm">添加</el-button>
                    </el-form-item>
                        <el-form-item>
                        <el-table :data="conditions" height="250" border fit highlight-current-row v-if="conditions.length > 0"
                                  style="width:57%;margin-left: 124px;min-width: 515px">
                            <el-table-column label="变量">
                                <template slot-scope="scope">
                                    <span>{{scope.row.variable}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="比较">
                                <template slot-scope="scope">
                                    <span>{{reversedName(scope.row.compare)}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="值">
                                <template slot-scope="scope">
                                    <span>{{scope.row.value}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="操作" width="170">
                                <template slot-scope="scope">
                                    <el-button class="fa fa-trash" size="small" type="primary" @click="onDeleteItem(scope.$index)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        </el-form-item>


                    <el-form-item label="动作">
                        <el-input class="inline-input el_put" v-model="info.source" style="width:150px;" placeholder="值"></el-input>

                        <el-select v-model="info.action" class="filter-item" filterable placeholder="运算" style="width:150px;display: inline-table">
                            <el-option
                                    v-for="item in actions"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <!--v-if="info.action == '1'"-->
                        <el-input class="inline-input el_put"  v-model="info.likeContent" style="width:150px;" placeholder="被替换内容"></el-input>
                        <!--v-if="info.action == '保存'"-->
                        <el-input class="inline-input el_put" v-model="info.content" style="width:150px;" placeholder="值" >
                            <!--<template  slot="prepend">sys_</template>-->
                        </el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="ruleStatus">
                        <el-select v-model="info.ruleStatus" placeholder="状态" class="filter-item el_put" style="width:300px;">
                            <el-option
                                    v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="归属" prop="typeid">
                        <el-select v-model="info.customerId" placeholder="归属" class="filter-item el_put" style="width:300px;">
                            <el-option
                                    v-for="item in customers"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input class="inline-input el_put" v-model="info.describ" style="width:300px;" placeholder="备注"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <!--<el-button-->
                            <!--@click="resetForm('info')" style="margin-right: 40px;background-color: #fff">-->
                        <!--取消-->
                    <!--</el-button>-->
                    <span class="cancle btn_middle" @click="resetForm('info')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
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
    import {updateRule, getTypeList} from 'api/enWAS/rule';
    import {getCustomer} from  'api/enWAS/customer';
    export default {

        computed: {
            ...mapGetters([
                'parts', 'actions', 'compares', 'method', 'variables'
            ])
        },
//        props: {
//            currentData: {
//                type: Object,
//                default: function () {
//                    return {id: '', name: '', partId: '', variable: '', value: '', conditi: '', action: '', content: '', likeContent:'', source: '', describ: '',time:'',ruleStatus:'',schoolId:''}
//                }
//            }
//        },
        props: {
            currentData: Object
        },
        components: {},
        data() {
            return {
                labelPosition: 'left',
                editVisible: true,
                conditions: [],
//                info: {
//                    customerId:this.currentData.customerId,
//                    compare: '', name: this.currentData.name, id: this.currentData.id, partId: this.currentData.partId,
//                    variable: this.currentData.variable, value: this.currentData.value,
//                    conditi: this.currentData.conditi, action: this.currentData.action,
//                    content: this.currentData.content, likeContent:this.currentData.likeContent,
//                    source: this.currentData.source, describ: this.currentData.describ,time: this.currentData.time,
//                    ruleStatus: this.currentData.ruleStatus,schoolId: this.currentData.schoolId
//                },
                compareT:
                    [{id: '1', name: '等于', value: '等于'},
                        {id: '2', name: '包含', value: '包含'}],
                variableT: [{id: '1', name: 'uri', value: 'uri'},
                    {id: '2', name: 'host', value: 'host'},
                    {id: '3', name: 'method', value: 'method'}],
                variable:{},
                compare:{},
                info: {
                    customerId:'',
                    compare: '',
                    name: '',
                    id:'',
                    partId: '',
                    variable: '',
                    value: '',
                    conditi: '',
                    action:'',
                    content: '',
                    likeContent:'',
                    source: '',
                    describ: '',
                    time: '',
                    ruleStatus:'',
                    schoolId: ''
                },
                listQuery: {
                    page: 1,
                    page_size: 10,
                    name: '',
                    total: 0
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ]
                },
                types: [],
                customers: [],
                status: [{
                    value: '1',
                    label: '禁用'
                }, {
                    value: '0',
                    label: '启用'
                }],
            }
        },
        created() {
            this.initData(this.currentData)
            getCustomer(this.listQuery).then(response => {
//                if(response.data.items.res.length > 0){
//                    response.data.items.res.push({id:'通用', name:'通用'})
                this.customers = response.data.items.res;
                console.log(response,'res---edit2')
//                }
            }).catch(error => {
                console.log(error)
            });
            this.doInit(this.currentData)
        },
        methods: {
            chang(){
              console.log(this.variable,'compares')
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doInit(currentData){
                this.editVisible = true;
                this.info = currentData;
                console.log("doEditinit", currentData)
                console.log(this.info,'this.info')
            },
            reversedName: function (id) {
                for (var i = 0; i < this.compares.length; i++) {
                    if (this.compares[i].id == id) {
                        return this.compares[i].name
                    }
                }
            },
            querySearchActions: function (queryString, cb) {
                cb(this.actions)
            },
            onDeleteItem: function (index) {
                console.log('...' + index)
                this.conditions.splice(index, 1)
            },
            onAddCondition: function () {
                this.conditions.push({value: this.info.value, variable: this.variable, compare: this.compare})
                console.log("数组：",this.conditions)
            },
            querySearch: function (queryString, cb) {
                cb(this.variables)
            },
//            hiden: function () {
//                this.editVisible = false
//            },
            initData: function (val) {
                this.conditions = []
                if (val && val.hasOwnProperty('conditi')) {
                    var a = eval(decodeURI(val.conditi))
                    if (a) {
                        this.conditions = []
                        for (var i = 0; i < a.length; i++) {
                            this.conditions.push(a[i])
                        }
                    }
                }
            },
//            show(val) {
//                if (this.$refs.hasOwnProperty('info') && this.$refs.info != null) {
//                    this.$refs['info'].resetFields()
//                }
//                this.info = {
//                    compare: '',
//                    name: val.name, id: val.id, partId: val.partId, variable: val.variable, value: val.value,customerId:val.customerId,
//                    conditi: val.conditi, action: val.action, content: val.content, likeContent:val.likeContent, source: val.source, describ: val.describ,time: val.time,ruleStatus: val.ruleStatus,schoolId: val.schoolId
//                }
//                this.initData(val)
//                this.editVisible = true
//            },
            onSelect(item, citem){
                item.selectId = citem.id
            },
            submitInfo(formName){
                console.log(this.info.compare,'sub')
                console.log("Submit编辑：",this.info)
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        this.info.conditi = encodeURI(JSON.stringify(this.conditions))
                        updateRule(this.info).then(resp => {
//                            this.editVisible = false;
//                        this.$emit('onChangeStatus');
//                        this.$refs[formName].resetFields();
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                });
                                this.editVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '修改失败！'
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.editVisible = false;
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
    .ruled .dialog {
        min-width: 830px;
    }

    .ruled .el-dialog__header {
        padding-left: 5px;
    }

    .ruled .el_put {
        position: relative;
        display: inline-block;
        /*width: 65% !important;*/
        margin-left: 30px;
    }

    .ruled .el_sel {
        /*width: 65% !important;*/
        margin-left: 30px;
    }

    .ruled-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 40px;
    }

    .ruled-form .el-form-item {
        margin-bottom: 20px;
    }

    .ruled .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .ruled-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>

