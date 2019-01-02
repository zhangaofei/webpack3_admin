<template>
    <div class="dnat public">
        <el-dialog
                title="查看目的地址转换设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="dnat-form">
                <el-form :model="lookInfo" :rules="rules" ref="lookInfo" label-width="116px" class="dnat-form">

                    <el-form-item label="名称 " prop="name" required >
                        <el-input v-model="lookInfo.name" :disabled="true" placeholder="请输入名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="源地址类型"  required >
                        <el-select v-model="lookInfo.sourceIpType"  :disabled="true" placeholder="请选择源地址类型" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <el-option label="预定义ip组" value="2" ></el-option>
                            <!--<el-option label="adsl" value="adsl" ></el-option>-->
                        </el-select>
                    </el-form-item>

                    <span v-if="lookInfo.sourceIpType=='1'">
                        <el-form-item label="源地址" prop="fillSip" required >
                            <el-input v-model="lookInfo.fillSip"   :disabled="true" placeholder="请输入源地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>

                    <span v-else-if="lookInfo.sourceIpType=='0'">
                       <el-form-item label="源地址" required >
                            <el-select v-model="lookInfo.chooseSip"  :disabled="true" placeholder="请选择源地址" class="el_sel">
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
                            <el-select v-model="lookInfo.chooseSipGroup" :disabled="true" placeholder="请选择源地址" class="el_put">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                             </el-form-item>
                        </span>



                    <el-form-item label="内部地址类型"  required >
                        <el-select v-model="lookInfo.innerIpType"  :disabled="true" placeholder="请选择内部地址类型" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <el-option label="预定义ip组" value="2" ></el-option>
                            <!--<el-option label="adsl" value="adsl" ></el-option>-->
                        </el-select>
                    </el-form-item>

                    <span v-if="lookInfo.innerIpType=='1'">
                             <el-form-item label="内部地址" prop="fillInnerIp" required >
                           <el-input v-model="lookInfo.fillInnerIp"  :disabled="true"  prop="dip" placeholder="请输入ip地址" class="el_put"></el-input>
                             </el-form-item>
                        </span>
                    <span v-else-if="lookInfo.innerIpType=='0'">
                            <el-form-item label="内部地址" required >
                            <el-select v-model="lookInfo.chooseInnerIp" :disabled="true"  placeholder="请选择内部地址" class="el_sel">
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
                             <el-form-item label="内部地址" required >
                            <el-select v-model="lookInfo.chooseInnerIpGroup"  :disabled="true" placeholder="请选择内部地址" class="el_put">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                             </el-form-item>
                        </span>


                    <el-form-item label="公开地址类型"  required >
                        <el-select v-model="lookInfo.pubIpType" :disabled="true"  placeholder="请选择公开地址类型" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <el-option label="预定义ip组" value="2" ></el-option>
                            <!--<el-option label="adsl" value="adsl" ></el-option>-->
                        </el-select>
                    </el-form-item>

                    <span v-if="lookInfo.pubIpType=='1'">
                             <el-form-item label="公开地址" prop="fillPubIp" required >
                           <el-input v-model="lookInfo.fillPubIp"   :disabled="true" prop="dip" placeholder="请输入ip地址" class="el_put"></el-input>
                             </el-form-item>
                        </span>
                    <span v-else-if="lookInfo.pubIpType=='0'">
                            <el-form-item label="公开地址" required >
                            <el-select v-model="lookInfo.choosePubIp"  :disabled="true" placeholder="请选择公开地址" class="el_sel">
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
                             <el-form-item label="公开地址" required >
                            <el-select v-model="lookInfo.choosePubIpGroup"  :disabled="true"  placeholder="请选择公开地址" class="el_sel">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                             </el-form-item>
                        </span>



                    <el-form-item label="流入接口" prop="ethin" required >
                        <el-select v-model="lookInfo.iEth"   :disabled="true" placeholder="请选择流入接口" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="对外服务" prop="service" required >
                        <el-select v-model="lookInfo.out_service"  :disabled="true"  placeholder="请选择对外服务" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="对内服务" prop="service" required >
                        <el-select v-model="lookInfo.in_service"   :disabled="true" placeholder="请选择对内服务" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                            </el-option>
                        </el-select>
                    </el-form-item>


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
                    <!--<el-button style="border-color: #D1D1D1;" class="reset_sure"-->
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
    import {updateDnat, isNameExist} from "api/firewall/dnat";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    export default{
        data(){

            return {
                rules:{},
                lookInfo: {
                    name: '',

                    sourceIpType:'',
                    fillSip:'',
                    chooseSip:'',
                    chooseSipGroup:'',

                    innerIpType:'',
                    fillInnerIp:'',
                    chooseInnerIp:'',
                    chooseInnerIpGroup:'',

                    pubIpType:'',
                    fillPubIp:'',
                    choosePubIp:'',
                    choosePubIpGroup:'',

                    iEth:'',
                    out_service:'',
                    in_service:'',
                    action:'t',
                    state:'on',
                },
                editVisible: true,

                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[],
                ipv4List:[],

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
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            doInit(currentData){

                console.log("currentdata" + currentData);
                let row = this.currentData;
                this.lookInfo.name = row.name;
                this.preName = row.name;
                this.id = row.id;
                this.sort = row.sort;

                this.lookInfo.sourceIpType = row.srcIpType;
                this.lookInfo.fillSip = row.srcIp;
                this.lookInfo.chooseSipGroup = row.srcIdg;

                this.lookInfo.innerIpType = row.innerIpType;
                this.lookInfo.fillInnerIp = row.innerIp;
                this.lookInfo.chooseInnerIpGroup = row.innerIdg;

                this.lookInfo.pubIpType = row.pubIpType;
                this.lookInfo.fillPubIp = row.pubIp;
                this.lookInfo.choosePubIpGroup = row.pubIdg;

                this.lookInfo.iEth = row.ethIn;
                this.lookInfo.state=row.state;

                if (row.srcId==0){
                    this.lookInfo.chooseSip='0';
                }else {
                    this.lookInfo.chooseSip=row.srcId;
                }

                if (row.innerId==0){
                    this.lookInfo.chooseInnerIp='0';
                }else {
                    this.lookInfo.chooseInnerIp=row.innerId;
                }

                if (row.pubId==0){
                    this.lookInfo.choosePubIp='0';
                }else {
                    this.lookInfo.choosePubIp=row.pubId;
                }

                if (row.outServiceId==0){
                    this.lookInfo.out_service='0';
                }else {
                    this.lookInfo.out_service=row.outServiceId;
                }

                if (row.inServiceId==0){
                    this.lookInfo.in_service='0';
                }else {
                    this.lookInfo.in_service=row.inServiceId;
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