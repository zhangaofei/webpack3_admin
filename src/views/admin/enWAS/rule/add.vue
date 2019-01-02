<template>
    <div class="ruled public">
        <el-dialog title="新建规则库" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <div class="ruled-form">
                <el-form :model="info" label-width="80px" :rules="rules" ref="info" style="margin-left:-75px;">
                    <el-form-item label="名称" prop="name">
                        <el-input class="inline-input el_put" v-model="info.name" style="width:300px;"
                                  placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item label="处理阶段" prop="parts">
                        <el-select v-model="info.partId" class="filter-item el_sel" filterable placeholder="类型"
                                   style="width:300px;display: inline-table">
                            <el-option
                                    v-for="item in parts"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条件">
                        <el-autocomplete
                                style="width:150px;"
                                class="inline-input el_put"
                                v-model="info.variable"
                                :fetch-suggestions="querySearch"
                                placeholder="变量"
                        ></el-autocomplete>
                        <el-select v-model="info.compare" class="filter-item el_sel" filterable placeholder="运算"
                                   style="width:150px;display: inline-table" @change="chang">
                            <el-option
                                    v-for="item in compares"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input class="inline-input el_put" v-model="info.value" style="width:150px;"
                                  placeholder="值"></el-input>
                        <el-button type="primary" @click="onAddCondition" class="primary confirm">添加</el-button>


                    </el-form-item>
                    <el-form-item>
                        <el-table :data="conditions" height="250" border fit highlight-current-row
                                  v-if="conditions.length > 0" style="width:57%;margin-left: 124px;min-width: 515px">
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
                                    <el-button class="fa fa-trash" size="small" type="primary"
                                               @click="onDeleteItem(scope.$index)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="动作">
                        <el-input class="inline-input el_put" v-model="info.source" style="width:150px;"
                                  placeholder="待操作量"></el-input>

                        <el-select v-model="info.action" class="filter-item el_sel" filterable placeholder="运算"
                                   style="width:150px;display: inline-table">
                            <el-option
                                    v-for="item in actions"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <!--v-if="info.action == '1'"-->
                        <el-input class="inline-input el_put" v-model="info.likeContent"
                                  style="width:150px;" placeholder="被替换内容"></el-input>
                        <!--v-if="info.action == '2'"-->
                        <el-input class="inline-input el_put" v-model="info.content" style="width:150px;"
                                  placeholder="值">
                            <!--<template  slot="prepend">sys_</template>-->
                        </el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="ruleStatus">
                        <el-select v-model="info.ruleStatus" placeholder="状态" class="el_sel" style="width: 300px">
                            <el-option
                                    v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="归属" prop="customerId">
                        <!--<span v-if="info.customerId !='' && info.customerId!=null">-->
                            <el-select v-model="info.customerId" placeholder="归属" class="el_sel" style="width: 300px" @change="changAl(info.customerId)">
                                <el-option
                                        v-for="item in customers"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        <!--</span>-->
                        <!--<span v-else>-->
                           <!--<el-select v-model="info.customerId " placeholder="归属" class="el_sel" style="width: 300px">-->
                                <!--<el-option label="通用" value="0"></el-option>-->
                           <!--</el-select>-->
                        <!--</span>-->

                    </el-form-item>

                    <el-form-item label="说明">
                        <el-input class="inline-input el_put" v-model="info.describ" style="width:300px;"
                                  placeholder="说明"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
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
    import {addRule, getTypeList} from  'api/enWAS/rule';
    import {getCustomer} from  'api/enWAS/customer';

    export default {

        computed: {
            ...mapGetters([
                'parts', 'actions', 'compares', 'method', 'variables'
            ])
        },
        components: {},
        data() {
            return {
                labelPosition: 'left',
                addVisible: false,
                conditions: [],
                info: {
                    name: '',
                    partId: '',
                    compare: '',
                    variable: '',
                    value: '',
                    conditi: '',
                    action: '',
                    content: '',
                    source: '',
                    likeContent: '',
                    describ: '',
                    time: '',
                    ruleStatus: '',
                    customerId: ''
                },
                listQuery: {
                    page: 1,
                    page_size: 10,
                    name: '',
                    total: 0,
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
                }]
            }
        },
        created() {
            if (this.$refs.hasOwnProperty('info') && this.$refs.info != null) {
                this.$refs['info'].resetFields()
            }
            console.log('getCustomer')
            getCustomer(this.listQuery).then(response => {
                console.log(response,'response--add')
            console.log(response.data.items.res.length,'add--res')
                if (response.data.items.res.length > 0) {
//                    response.data.items.res.push({id:0, name:'通用'})
                    this.customers = response.data.items.res;
                    // this.customers =[{id:1,name:'ali'}]
                    console.log(this.customers,'-------');
                }
                else {
//                    this.customers.push({id:0, name:'通用'})
                }
            }).catch(error => {
                console.log(error)
            });

            this.addVisible = true
        },
        methods: {
            changAl(val){
              console.log('ali:',val)
            },
            chang(){
               console.log(this.info.compare,'ichag',this.compares)
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
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
                this.conditions.push({value: this.info.value, variable: this.info.variable, compare: this.info.compare})
                console.log(this.conditions)
            },
            querySearch: function (queryString, cb) {
                cb(this.variables)
            },
//            hiden: function () {
//                this.addVisible = false
//            },
//            show() {
//                if (this.$refs.hasOwnProperty('info') && this.$refs.info != null) {
//                    this.$refs['info'].resetFields()
//                }
//                this.info = {
//                    name: '',
//                    partId: '',
//                    compare: '',
//                    variable: '',
//                    value: '',
//                    conditi: '',
//                    action: '',
//                    content: '',
//                    source: '',
//                    likeContent: '',
//                    describ: '',
//                    time: '',
//                    ruleStatus: '',
//                    customerId: ''
//                }
//                this.addVisible = true
//            },
            onSelect(item, citem){
                item.selectId = citem.id
            },
            submitInfo(formName){
//                console.log(this.info,"rule")
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        this.info.conditi = encodeURI(JSON.stringify(this.conditions))
                        console.log(this.info)
                        addRule(this.info).then(resp => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
                                });
                                this.conditions = [];
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '新建失败！'
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
