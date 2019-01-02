<template>
    <div class="ruled public">
        <el-dialog title="查看规则库" :visible.sync="lookVisible" @close="handleClose" @open="doInit(currentData)" size="small"
                   custom-class="dialog public" top="10%">
            <div class="ruled-form">
                <el-form :model="info" label-width="80px" :rules="rules" ref="info" style="margin-left:-75px;">
                    <el-form-item label="名称" prop="name">
                        <el-input class="inline-input el_put" v-model="info.name" style="width:300px;"
                                  placeholder="名称" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="处理阶段" prop="parts">
                        <el-select v-model="info.partId" class="filter-item el_sel" filterable placeholder="类型"
                                   style="width:300px;display: inline-table" :disabled="true">
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
                                placeholder="变量" :disabled="true"
                        ></el-autocomplete>
                        <el-select v-model="info.compare" class="filter-item el_sel" filterable placeholder="运算"
                                   style="width:150px;display: inline-table" :disabled="true">
                            <el-option
                                    v-for="item in compares"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input class="inline-input el_put" v-model="info.value" style="width:150px;"
                                  placeholder="值" :disabled="true"></el-input>
                        <el-button type="primary" @click="onAddCondition" :disabled="true" class="primary confirm">添加</el-button>


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
                                               @click="onDeleteItem(scope.$index)" :disabled="true"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="动作">
                        <el-input class="inline-input el_put" v-model="info.source" style="width:150px;"
                                  placeholder="待操作量" :disabled="true"></el-input>

                        <el-select v-model="info.action" class="filter-item el_sel" filterable placeholder="运算"
                                   style="width:150px;display: inline-table" :disabled="true">
                            <el-option
                                    v-for="item in actions"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input class="inline-input el_put" v-if="info.action == '1'" v-model="info.likeContent"
                                  style="width:150px;" placeholder="被替换内容" :disabled="true"></el-input>
                        <el-input class="inline-input el_put" v-model="info.content" style="width:150px;" v-if="info.action == '2'"
                                  placeholder="值" :disabled="true">
                            <!--<template v-if="info.action == '2'" slot="prepend">sys_</template>-->
                        </el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="ruleStatus">
                        <el-select v-model="info.ruleStatus" placeholder="状态" class="el_sel" style="width: 300px" :disabled="true">
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
                        <el-select v-model="info.customerId " placeholder="归属" class="el_sel" style="width: 300px" :disabled="true">
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

                    <el-form-item label="说明" prop="describe">
                        <el-input class="inline-input el_put" v-model="info.describ" style="width:300px;"
                                  placeholder="说明" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <!--<div style="margin-top: 20px;margin-right: 11%">-->
                    <!--<el-button-->
                            <!--@click="resetForm('info')" type="primary">-->
                        <!--关闭-->
                    <!--</el-button>-->
                <!--</div>-->
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
        props: {
            currentData: Object
        },
        components: {},
        data() {
            return {
                labelPosition: 'left',
                lookVisible: false,
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
                    customerId: '',
                    id:''
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
//            if (this.$refs.hasOwnProperty('info') && this.$refs.info != null) {
//                this.$refs['info'].resetFields()
//            }
            this.initData(this.currentData)
            getCustomer(this.listQuery).then(response => {
//                if (response.data.items.res.length > 0) {
//                    response.data.items.res.push({id:0, name:'通用'})
                    this.customers = response.data.items.res;
                    console.log(this.customers,'-------');
               // }
//                else {
////                    this.customers.push({id:0, name:'通用'})
//                }
            }).catch(error => {
                console.log(error)
            });

            this.lookVisible = true;
            this.doInit(this.currentData)
        },
        methods: {
            doInit(currentData){
                this.lookVisible = true;
                this.info = currentData;
                console.log("查看：",this.info)
            },
            initData: function (val) {
                console.log("加载：",val)
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
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doTest() {
                this.lookVisible = true;
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
            resetForm(formName) {
                this.lookVisible = false;
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
