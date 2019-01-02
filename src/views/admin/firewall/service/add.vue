<template>
    <div class="servic public">
        <el-dialog
                title="新建服务设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div class="service-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="95px" class="service-form" MultipartFile>

                    <el-form-item label="服务名称 " prop="name">
                        <el-input v-model.trim="addInfo.name" placeholder="请输入服务名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="协议"  prop="protocal" class="item_mark">
                        <el-select v-model="addInfo.protocal" placeholder="tcp"  class="el_putnum el_sel">
                            <el-option label="任何" value="all" key="all"></el-option>
                            <el-option label="tcp" value="tcp" key="tcp"></el-option>
                            <el-option label="udp" value="udp" key="udp"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="端口号"  prop="singlePort" v-if="this.addInfo.protocal=='all'">
                        <el-input-number style="" v-model="addInfo.singlePort" :min="1" :max="65535"  type="number" placeholder="请输入1-65535内数字" class="el_putnum2 el_put"></el-input-number>
                    </el-form-item>

                    <span v-else>
                        <el-form-item label=""  prop="">
                            <el-table ref="multipleTable" :header-cell-style="headerCellStyle" :data="addInfo.addPorts"   border tooltip-effect="dark" style="max-height: 206px;overflow-y: scroll"
                                      @selection-change="handleSelectionChange">
                                <el-table-column label="起始端口" prop="begin" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.begin"  placeholder="" class="route_put" ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="结束端口" prop="end" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.end" placeholder="" class="route_put"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作" style="text-align: center" align="center" width="130px">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="small"
                                                class="btn_none_bg"
                                                @click="portAdd()"> <img src="../../../../assets/addIcon/add.png">
                                        </el-button>
                                        <span v-if="addInfo.addPorts.length != 1">
                                            <el-button
                                                    size="small"
                                                    class="btn_none_bg"
                                                    @click="portDel(scope.$index,scope.row)"><img src="../../../../assets/addIcon/del.png">
                                            </el-button>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </span>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">
                        取消
                    </span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {addService, isNameExist} from "api/firewall/service";
    export default{
        components: {},
        data(){
            var validateName = (rule, value, callback) =>
            {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    isNameExist({name:value}).then((resp)=> {
                        if (resp.data.exist == true) {
                            callback(new Error("该名称已存在"));
                        }
                        callback();
                    }).catch(e=> {});

                }
            };

            var validateNumber = (rule, value, callback) =>
            {
                var reg = /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
                if (reg.test(value) == false) {
                    callback(new Error("请输入1-65535范围内数字"));
                } else {
                   callback();
                }
            };

            var singlePort = (rule, value, callback) => {
                if ( !/^[1-9]{1}$|^[1-9]{1,5}$/g.test(value) ) {
                    callback(new Error('端口号必须是1-65535的数字'))
                } else if (parseInt(value) > 65535) {
                    callback(new Error('端口号不能大于65535'))
                } else {
                    callback()
                }
            }
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'

                },
                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],

                    begin: [
                        {required: true, validator: validateNumber, trigger: 'blur'}
                    ],
                    end: [
                        {required: true, validator: validateNumber, trigger: 'blur'}
                    ],
                    singlePort: [
                        {required: true, validator: singlePort, trigger: 'blur'}
                    ]
                },
                addInfo: {
                    name: '',
                    addPorts:[],
                    singlePort:'',
                    protocal:''
                },
                addVisible: true,

                multipleSelection: []
            }
        },
        created(){
            this.addInfo.addPorts.push({
                begin:'',
                end:'',
            })
        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },

            portAdd(){
                this.addInfo.addPorts.push({
                    begin:'',
                    end:'',
                })
                console.log("新增加的一条port:",this.addInfo.addPorts)
            },
            portDel(index,row){
                this.addInfo.addPorts.splice(index,1)
            },
//            portDel(){
//                let arr=[];
//                for(let  i=0;i<this.addInfo.addPorts.length;i++){
//                    if (this.multipleSelection.indexOf(this.addInfo.addPorts[i])>=0){
//                    }else{
//                        arr.push(this.addInfo.addPorts[i]);
//                    }
//                }
//                this.addInfo.addPorts = arr;
//                this.multipleSelection = [];
//            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var newdto={
                            name: this.addInfo.name,
                            defaultService:'define',
                            protocal:this.addInfo.protocal,
                            ports:''
                        };
                        var str1=[];
                        var validate=true;

                        if (["all","tcp","udp"].indexOf(this.addInfo.protocal)<0){
                            this.$message({
                                type: 'warning',
                                message: '协议为必选项！'
                            });
                            validate = false;
                        } else if (this.addInfo.protocal=="all"){
                            newdto.ports = this.addInfo.singlePort;
                        }else {
                            if (this.addInfo.addPorts.length<1){
                                this.$message({
                                    type:'warning',
                                    message:'请至少添加一个端口！'
                                });
                                validate = false;
                            }else if(this.addInfo.addPorts.length>=15){
                                this.$message({
                                    type:'warning',
                                    message:'端口个数不能超过14个！'
                                });
                                validate = false;
                            }else {
                                for (let item of this.addInfo.addPorts) {
                                    if (this.numCheck(item)){
                                        console.log('比较',parseInt(item.begin)>parseInt(item.end))
                                        if(parseInt(item.begin)>parseInt(item.end)){
                                            this.$message({
                                                type: 'warning',
                                                message: '开始端口不可大于结束端口！'
                                            });
                                            validate = false;
                                        }else {
                                            if (item.begin==item.end){
                                                str1.push(item.begin);
                                            }else {
                                                str1.push(item.begin+":"+item.end);
                                            }
                                        }
                                    }else {
                                        this.$message({
                                            type: 'warning',
                                            message: '端口号必须为1-65535数字'
                                        });
                                        validate = false;
                                    }

                                }
                                newdto.ports = str1.toString();
                            }
                        }



                        if (validate) {
                            addService(newdto).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建服务配置成功！'
                                    });
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '新建服务配置失败！'
                                    });
                                }
                            }).catch(e => {
                                console.log("新建出错", e);
                            });
                        }


                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },

            numCheck(item){
                console.log('numCheck',item.begin>0&&item.begin<65536&&item.end>0&&item.end<65536)
                var numReg = /^-?\d+$/;
                if (numReg.test(item.begin)&&numReg.test(item.end)){
                    if (item.begin>0&&item.begin<65536&&item.end>0&&item.end<65536){
                        return true
                    }
                }
                return false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

        },
    }
</script>
<style>

</style>