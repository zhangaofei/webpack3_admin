<template>
    <div class="router public">
        <el-dialog
                title="新建策略路由"
                :visible.sync="addPolVisible"
                size="small"
                custom-class="rou_dialog"
                top="10%"
                @close="handleClose">
            <div  class="router-form" style="">
                <el-form :model="Radios" :rules="rules" ref="Radios" label-width="" class="demo-ruleForm" MultipartFile>
                    <el-form-item label="IP类型" prop="radio"  class="el_lab" v-show='false'>
                        <el-radio-group v-model="Radios.radio" class="el_put" >
                            <el-radio label="ipv4" value="ipv4">IPv4</el-radio>
                            <el-radio label="ipv6" value="ipv6" style="display: none">IPv6</el-radio>
                        </el-radio-group >
                    </el-form-item>

                    <el-table
                            ref="multipleTable"
                            :data="addPolRouter"
                            :header-cell-style="headerCellStyle"
                            border
                            tooltip-effect="dark"
                            style="width: 100%;max-height: 206px;overflow-y: scroll"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                label="源地址"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.targetAddress" placeholder="源地址" @blur="ips(scope.row.targetAddress)" class="route_put ips"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="子网掩码"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.netMask" placeholder="子网掩码" class="route_put netMasks" @blur="netMasks(scope.row.netMask)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="网关"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.gateway" placeholder="网关" class="route_put gateways" @blur="gateways(scope.row.gateway)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="接口"
                                align="center"
                                width="140"
                        >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.device" placeholder="类型"  style="width:104px" class="route_put">
                                    <el-option :label="polName"
                                               :value="polName"
                                               :key="polName"
                                               v-for="polName in polNames">

                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作" align="center" style="text-align: center" width="160">
                            <template slot-scope="scope">
                                <el-button
                                        size="small"
                                        class="btn_none_bg"
                                        @click="PolRouterAdd()"> <img src="../../../../../assets/addIcon/add.png">
                                </el-button>
                                <span v-if="addPolRouter.length != 1">
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="PolRouterDel(scope.$index,scope.row)"><img src="../../../../../assets/addIcon/del.png">
                                            </el-button>
                                            </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addPolRouter')">
                        取消
                    </span>
                    <el-button
                            class="primary btn_middle confirm"
                            type="primary"
                            @click="submitPolRoute('addPolRouter')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {notifyFault} from "utils/notify"
    import {addPolRoutes, getAllNetNameList} from "../../../../../api/systemSet/new_networkConfig/new_routerApi";

    export default{
        data(){
            var ip = (rule, value, callback) => {
                if (!value){
                    callback();
                }  else {
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                        callback(new Error("请输入正确的IP地址"));
                    } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                        console.log('1111111111111');
                        callback(new Error("请输入正确的IP地址"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules:{

                },
                isShow:false,
                hide:true,
                box:[],
                Radios:{radio:'ipv4'},
                addPolRouter:[],
                addPolVisible:true,
                activeName:'first',
                activeName2:'one',
                activeName3:'three',
                polNames:[],//储存device名
                currentData: null,
                multipleSelection: [],
            }
        },
        created(){
            this.addPolRouter.push({
                ipType:this.Radios.radio,
                targetAddress: '',
                netMask: '',
                gateway: '',
                device: '',
            })
//        获取接口名称
            getAllNetNameList().then((resp)=>{
                this.polNames=resp.data
            }).catch(err=>{

            });
        },
        methods: {
            ips(val){
                console.log($('.ips input').val(),'---==777')
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法IP！'
                    })
                    return false;
                }else{
                    return true;
                }
            },
            netMasks(val){
                if (/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法子网掩码！'
                    });
                    return false;
                } else{
                    return true;
                }
            },
            gateways(val){
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法网关！'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.addPolVisible= true
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addPolVisible = false
            },
//            ---------------静态路由本地 删除-增加 --------
            PolRouterAdd(){
                this.addPolRouter.push({
                    ipType:this.Radios.radio,
                    targetAddress: '',
                    netMask: '',
                    gateway: '',
                    device: '',
                })
            },
            PolRouterDel(index,row){
                this.addPolRouter.splice(index,1)
            },

            resetForm(formName) {
                this.addPolVisible=false;
            },
            submitPolRoute(formName) {
                if(this.addPolRouter.length==0)
                {
                    this.$message({
                        type:'warning',
                        message:'请先新增一条静态路由!'
                    });
                }else {
                    if ((this.ips($('.ips input').val()) && this.netMasks($('.netMasks input').val()) && this.gateways($('.gateways input').val())) == false) {
                        this.$message({
                            type: 'warning',
                            message: '格式有错误!'
                        });
                    } else {
                        addPolRoutes(this.addPolRouter).then((resp) => {
                            if (resp.extend.failCount <= 0) {
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
                                });
                                this.addPolVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                                this.getList();
                            } else {
                                if(resp.extend.tips&&resp.extend.tips.length>0){
                                    this.$message({
                                        type:'warning',
                                        message:resp.extend.tips[0]
                                    });
                                }else {
                                    this.$message({
                                        type:'warning',
                                        message:'新建失败!'
                                    });
                                }
                            }
                        }).catch(e => {
                            console.log("新建出错", e);
                        });
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>
<style  scoped>
    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/

    /* 设置弹出框大小*/
    /*.router .el-dialog--small {*/
        /*width: 1000px!important;*/
        /*height:780px!important;*/
    /*}*/
    /*.router  .el-dialog__title {*/
        /*margin-left: 52px;*/
    /*}*/
    /*.el-dialog__footer {*/
        /*background-color: #E7E7E7;*/
        /*border-top: 1px solid #E7E7E7;*/
        /*height: 100px;*/
        /*border-bottom-right-radius: 4px;*/
        /*border-bottom-left-radius: 4px;*/
    /*}*/
    /*.router-form{*/
        /*margin-left:90px;*/
    /*}*/
    /*.router-form .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 490px!important;*/
        /*margin-left: 96px;*/
    /*}*/
    /*.router-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width:135px ;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/


    /*.router-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.router-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 4px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 306px;*/
    /*}*/
    /*.router-form .el-select{*/
        /*width:488px;*/
    /*}*/
    /*.route_put{*/
        /*padding-top:5px ;*/
        /*padding-bottom: 5px;*/
    /*}*/

</style>
