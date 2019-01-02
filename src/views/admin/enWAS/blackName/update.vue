<template>
    <div class="black public">
        <el-dialog
                title="编辑可信域"
                :visible.sync="editVisible"
                @close="handleClose"
                @open="doInit(currentData)"
                size="small"
                custom-class="dialog public"
                top="10%">
            <div class="black-form">
                <el-form :model="editInfo"  label-width="142px" ref="editInfo" :rules="rules">
                    <el-form-item label="可信域名称" prop="name">
                        <el-input v-model="editInfo.name" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input v-model="editInfo.describ" placeholder="说明" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <el-table
                                ref="multipleTable"
                                :data="editInfo.domain"
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
                                    <el-input v-model="scope.row.variable" placeholder="请输入域名"   class="domain" @blur="domainFun(scope.row.variable)"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="递归"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.referer" placeholder="请选择是否递归" class="referer">
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
                                            @click="domainEdit()"> <img src="../../../../assets/addIcon/add.png">
                                    </el-button>
                                    <span v-if="editInfo.domain.length != 1">
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

            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary"
                            @click="submitInfo('editInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import {updateBlackName, getDomainList} from 'api/enWAS/whiteList';

    export default {
        components: {},
        props: {
            currentData: Object,
        },
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
                multipleSelection:[],
                editVisible: true,
                editInfo: {id: '', name: '',  domain: [], describ:''},
                nameArr:[]
            }
        },
        created() {
            this.getList();
            this.doInit(this.currentData)
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
            doInit(currentData){
                this.editVisible = true;
                this.editInfo.id = currentData.id;
                this.editInfo.name = currentData.name;
                this.editInfo.describ = currentData.describ;
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
                            for (let i = 0; i < this.editInfo.domain.length; i++){
                                this.editInfo.domain[i].referer = this.editInfo.domain[i].referer.toString();
                            }
                        }

                    }
                })
            },
            domainEdit(){
                this.editInfo.domain.push
                ({
                    variable: '',
                    referer: ''
                });
            },
            domainDel(index,row){
                this.editInfo.domain.splice(index,1)
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
            submitInfo(editInfo) {
                this.nameArr = [];
                for (let i = 0; i < this.editInfo.domain.length; i++){
                    this.nameArr.push(this.editInfo.domain[i].variable);
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
                    updateBlackName(this.editInfo).then(response => {
                        if (response.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '编辑成功！'
                            });
                            this.editInfo.domain = [];
                            this.editVisible = false;
                            this.$emit('onChangeStatus');
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.msg
                            });
                        }
                    }).catch(e=> {
                        console.log("编辑出错", e);
                    });
                }
            },
            resetForm(formName) {
                this.editVisible = false;
            }
        }
    }
</script>
<style>

</style>
