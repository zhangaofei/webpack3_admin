<template>
    <div class="black public">
        <el-dialog title="新建可信域" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <div class="black-form">
                <el-form :model="addInfo"  label-width="142px" ref="addInfo" :rules="rules">
                    <el-form-item label="可信域名称" prop="name">
                        <el-input v-model="addInfo.name" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input v-model="addInfo.describ" placeholder="说明" class="el_put"></el-input>
                    </el-form-item>
                            <el-form-item label="">
                            <el-table
                                    ref="multipleTable"
                                    :data="addInfo.domain"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 65%;max-height: 206px;margin-left:100px;overflow-y: auto"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        label="域名"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.variable" placeholder="请输入域名"  class="domain" @blur="domainFun(scope.row.variable)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="递归"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.referer" placeholder="否递归" class="referer">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label='否' value="0" ></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作" align="center" style="text-align: center" width="160">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="small"
                                                class="btn_none_bg"
                                                @click="domainAdd()"> <img src="../../../../assets/addIcon/add.png">
                                        </el-button>
                                        <span v-if="addInfo.domain.length != 1">
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="domainDel(scope.$index,scope.row)"><img src="../../../../assets/addIcon/del.png">
                                            </el-button>
                                            </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitInfo('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addBlackName} from 'api/enWAS/whiteList';

    export default {
        components: {},
        data() {
            let name = (rule, value , callback) => {
                if (/^[\da-zA-Z\u4e00-\u9fa5_]{1,67}$/.test(value) == false) {
                    callback(new Error("请输入至少1位字母、中文、数字及下划线"));
                } else {
                    callback();
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules:{
                    name: [
                        {required: true, validator: name, trigger: 'blur'}
                    ]
                },
                addVisible: true,
                multipleSelection: [],
                addInfo: {name: '', domain: [], describ:''},
                nameArr:[]
            }
        },
        created() {
            this.addInfo.domain.push({
                variable: '',
                referer: ''
            })
        },
        methods: {
            domainFun(value){
                let res = true;
                let fes = true;
                if(value == '*'){
                    res = true;
                } else {
                    let arr = value.split('.');
                    if(arr.length <= 1 || arr.length == null){
                        res = false;
                    } else {
                        for (let i = 0; i < arr.length; i++){
                            if(arr[i].length == 0 || arr[i].length == null || fes == false){
                                res = false;
                                break;
                            } else {
                                for (let j = 0; j < arr[i].length; j++){
                                    if(arr[i][j] == '*' && arr[i].length == 1){
                                        res = true
                                    } else if(arr[i][j] == '*' && arr[i].length != 1 ){
                                        res = false;
                                        fes = false;
                                        break;
                                    } else {
                                        res = true;
                                    }
                                }
                            }
                        }
                    }
                }
                if(res == false){
                    return false;
                } else {
                    return true;
                }
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },

            domainAdd() {
                this.addInfo.domain.push({
                    variable: '',
                    referer: ''
                })
            },
            domainDel(index,row){
                this.addInfo.domain.splice(index,1)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            arrRepeat(arr){
                var obj = {};
                for (var i in arr){
                    if(obj[arr[i]])
                        return true;
                    obj[arr[i]] = true;
                }
                return false;
            },
            submitInfo(formName) {
                this.nameArr = [];
                for (let i = 0; i < this.addInfo.domain.length; i++){
                    this.nameArr.push(this.addInfo.domain[i].variable);
                }
                let nameCheck = this.arrRepeat(this.nameArr);

                if (this.domainFun($('.domain input').val()) == false) {
                    this.$message({
                        type: 'warning',
                        message: '请输入域名或*号通配符!'
                    });
                } else
                    if (nameCheck){
                    this.$message({
                        type:'warning',
                        message:'有相同的域名存在!'
                    });
                } else {
                    this.$refs.addInfo.validate((valid) => {
                        if (valid) {
                            addBlackName(this.addInfo).then(resp => {
                                if (resp.status == 1) {
                                    this.$message({
                                        type: 'success',
                                        message: '新建成功！'
                                    });
                                    this.addInfo.domain = [];
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.msg
                                    });
                                }
                            }).catch(error => {
                                console.log(error)
                            });
                        } else {
                        }
                    });
                }
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },
        }
    }
</script>
