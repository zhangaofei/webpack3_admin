<template>
    <div class="snat public">
        <el-dialog
                title="查看源地址转换设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="snat-form">
                <el-form :model="lookInfo" :rules="rules" ref="lookInfo" label-width="116px" class="snat-form">

                    <el-form-item label="名称 " prop="name" required >
                        <el-input v-model="lookInfo.name"  :disabled="true" placeholder="请输入源地址转换名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="源地址类型"  required >
                        <el-select v-model="lookInfo.sourceIpType"  :disabled="true" placeholder="请选择" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <el-option label="预定义ip组" value="2" ></el-option>
                            <!--<el-option label="adsl" value="adsl" ></el-option>-->
                        </el-select>
                    </el-form-item>

                    <span v-if="lookInfo.sourceIpType=='1'">
                        <el-form-item label="源地址" prop="fillSip" required >
                            <el-input v-model="lookInfo.fillSip"   :disabled="true" placeholder="请输入ipv4地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>

                    <span v-else-if="lookInfo.sourceIpType=='0'">
                       <el-form-item label="源地址" required >
                            <el-select v-model="lookInfo.chooseSip" :disabled="true"  placeholder="请选择" class="el_sel">
                                <el-option label="任何" value="0" ></el-option>
                                    <el-option
                                            v-for="ip in ipList"
                                            :key="ip.id"
                                            :label="ip.name"
                                            :value="ip.id">
                                    </el-option>
                                </el-select>
                       </el-form-item>
                    </span>

                    <span v-else>
                             <el-form-item label="源地址" required >
                            <el-select v-model="lookInfo.chooseSipGroup"  :disabled="true" placeholder="请选择" class="el_put">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                             </el-form-item>
                        </span>



                    <el-form-item label="目的地址类型"  required >
                        <el-select v-model="lookInfo.desIpType"  :disabled="true" placeholder="请选择" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <el-option label="预定义ip组" value="2" ></el-option>
                            <!--<el-option label="adsl" value="adsl" ></el-option>-->
                        </el-select>
                    </el-form-item>

                    <span v-if="lookInfo.desIpType=='1'">
                             <el-form-item label="目的地址" prop="fillDip" required >
                           <el-input v-model="lookInfo.fillDip"   :disabled="true" prop="dip" placeholder="请输入ip地址" class="el_put"></el-input>
                             </el-form-item>
                        </span>
                    <span v-else-if="lookInfo.desIpType=='0'">
                            <el-form-item label="目的地址" required >
                            <el-select v-model="lookInfo.chooseDip"  :disabled="true" placeholder="请选择" class="el_sel">
                                <el-option label="任何" value="0" ></el-option>
                                    <el-option
                                            v-for="ip in ipList"
                                            :key="ip.id"
                                            :label="ip.name"
                                            :value="ip.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </span>

                    <span v-else>
                             <el-form-item label="目的地址" required >
                            <el-select v-model="lookInfo.chooseDipGroup"  :disabled="true"  placeholder="请选择" class="el_sel">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                             </el-form-item>
                        </span>


                    <el-form-item label="流出接口" prop="ethout" required >
                        <el-select v-model="lookInfo.oEth"  :disabled="true"  placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="源服务" prop="service" required >
                        <el-select v-model="lookInfo.src_service"   :disabled="true" placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                                <span style = "float:left">{{s.name}}</span>
                                <span style = "float:right">{{s.protocal}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="目的服务" prop="service" required >
                        <el-select v-model="lookInfo.des_service"  :disabled="true"  placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                                <span style = "float:left">{{s.name}}</span>
                                <span style = "float:right">{{s.protocal}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="动作" prop="" >
                        <el-radio-group v-model="lookInfo.action"  :disabled="true"  class="el_put">
                            <el-radio label="t">源地址转换</el-radio>
                            <el-radio label="m">地址伪装</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <span v-if="lookInfo.action=='t'">
                        <el-form-item label="地址转换为" prop="tran_ip" required >
                         <el-input v-model="lookInfo.tran_ip"   :disabled="true" placeholder="请输入ip地址，端口号用 : 分隔" class="el_put"></el-input>
                        </el-form-item>
                    </span>


                    <el-form-item label="状态" prop=""  >
                        <el-radio-group v-model="lookInfo.state"   :disabled="true" class="el_put">
                            <el-radio label="on">启用</el-radio>
                            <el-radio label="off">停止</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class='foot' >
                    <!--<el-button style="border-color: #D1D1D1;"-->
                               <!--class="reset_sure"-->
                               <!--@click="resetForm()">-->
                        <!--关闭-->
                    <!--</el-button>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {updateSnat, isNameExist} from "api/firewall/snat";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    //    import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
    export default{
//        components: {ElFormItem},
        data(){

            return {
                rules: {
                },
                lookInfo: {
                    name: '',
                    sourceIpType:'',
                    fillSip:'',
                    chooseSip:'',
                    chooseSipGroup:'',
                    desIpType:'',
                    fillDip:'',
                    chooseDip:'',
                    chooseDipGroup:'',
                    oEth:'',
                    src_service:'',
                    des_service:'',
                    tran_ip:'',
                    action:'t',
                    state:'on',
                },
                editVisible: true,

                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[],

                id:'',
                preName:'',
                sort:''
            }
        },
        created(){
            this.setListForSelect();
            this.doInit(this.currentData)
        },

        props: {
            currentData: Object
        },
        methods: {

            setListForSelect(){

                getIpGroupListSelect().then((resp)=>{
                    this.ipgList = resp.data;
                }).catch(e => {});

                getIpListSelect().then((resp)=>{
                    this.ipList = resp.data;
                }).catch(e => {});

                getServiceListSelect().then((resp)=>{
                    this.serviceList = resp.data;
                }).catch(e => {});

                //        获取接口名称
                getAllNetNameList().then((resp)=>{
                    this.ethNames=resp.data;
                }).catch(err=>{});
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doTest() {
                this.editVisible = true;
                console.log('doTest-admin', this.editVisible)
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },


            doInit(currentData){

                //console.log(currentData);
                let row = this.currentData;
                this.lookInfo.name = row.name;
                this.preName = row.name;

                this.id = row.id;
                this.sort = row.sort;
                this.lookInfo.sourceIpType = row.srcIpType;
                this.lookInfo.fillSip = row.srcIp;
                this.lookInfo.chooseSipGroup=row.srcIdg;
                this.lookInfo.desIpType=row.desIpType;
                this.lookInfo.fillDip=row.desIp;
                this.lookInfo.chooseDipGroup=row.desIdg;
                this.lookInfo.oEth = row.ethOut;
                this.lookInfo.tran_ip = row.tranIp;
                this.lookInfo.action = row.action;
                this.lookInfo.state=row.state;


                if (row.srcId==0){
                    this.lookInfo.chooseSip='0';
                }else {
                    this.lookInfo.chooseSip=row.srcId;
                }

                if (row.desId==0){
                    this.lookInfo.chooseDip='0';
                }else {
                    this.lookInfo.chooseDip=row.desId;
                }

                if (row.desServiceId==0){
                    this.lookInfo.des_service='0';
                }else {
                    this.lookInfo.des_service=row.desServiceId;
                }
                if (row.srcServiceId==0){
                    this.lookInfo.src_service='0';
                }else {
                    this.lookInfo.src_service=row.srcServiceId;
                }

                console.log(this.lookInfo);
            },

            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
<style>


</style>