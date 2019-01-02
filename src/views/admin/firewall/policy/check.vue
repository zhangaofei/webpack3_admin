<template>
    <div class="policy public">
        <el-dialog
                title="查看策略设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="policy-form">
                <el-form :model="lookInfo"  ref="lookInfo" label-width="116px" class="policy-form">

                    <el-form-item label="策略名称 " prop="name" required>
                        <el-input v-model="lookInfo.name"  :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="源地址类型"  required>
                        <el-select v-model="lookInfo.sourceIpType" disabled placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="item in sourceIpOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <span v-if="lookInfo.sourceIpType=='1'">
                        <el-form-item label="源地址"  >
                            <el-input v-model="lookInfo.fillSip" :disabled="true"  placeholder="请输入ipv4地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="lookInfo.sourceIpType=='0'">
                        <el-form-item label="源地址"  required >
                            <el-select v-model="lookInfo.chooseSip" placeholder="请选择" :disabled="true" class="el_sel">
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
                        <el-form-item label="源地址"  required >
                            <el-select v-model="lookInfo.chooseSipGroup" placeholder="请选择" :disabled="true" class="el_put">
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
                        <el-select v-model="lookInfo.desIpType"  :disabled="true" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <el-option label="预定义ip组" value="2" ></el-option>
                            <!--<el-option label="adsl" value="adsl" ></el-option>-->
                        </el-select>
                    </el-form-item>
                    <span v-if="lookInfo.desIpType=='1'">
                        <el-form-item label="目的地址"  prop="dip" required >
                            <el-input v-model="lookInfo.fillDip"   :disabled="true" placeholder="请输入ip地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="lookInfo.desIpType=='0'">
                        <el-form-item label="目的地址"  prop="dip" required >
                            <el-select v-model="lookInfo.chooseDip" placeholder="请选择" :disabled="true" class="el_sel">
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
                        <el-form-item label="目的地址"  prop="dip" required >
                            <el-select v-model="lookInfo.chooseDipGroup" :disabled="true"  placeholder="请选择" class="el_sel">
                                <el-option
                                        v-for="ipg in ipgList"
                                        :key="ipg.id"
                                        :label="ipg.name"
                                        :value="ipg.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>
                    <!--</el-form-item>-->

                    <el-form-item label="源接口" prop="seth" required >
                        <el-select v-model="lookInfo.sEth"  :disabled="true" placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="目的接口" required>
                        <el-select v-model="lookInfo.dEth" :disabled="true" placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务" prop="service" required >
                        <el-select v-model="lookInfo.service"  :disabled="true" placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="0"></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间策略" prop="time" required >
                        <el-select v-model="lookInfo.time" :disabled="true" placeholder="请选择" class="el_put">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="time in timeList"
                                    :key="time.id"
                                    :label="time.name"
                                    :value="time.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="动作" prop="action" required >
                        <el-radio-group v-model="lookInfo.action" :disabled="true"  class="el_put">
                            <el-radio label="1">放行</el-radio>
                            <el-radio label="0">阻断</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="状态" prop="state"   required >
                        <el-radio-group v-model="lookInfo.state" :disabled="true"  class="el_put">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="0">停止</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class='foot' >
                    <el-button style="border-color: #D1D1D1;"
                               class="reset_sure"
                               @click="resetForm()" v-if="false">
                        关闭
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {updatePolicy, isNameExist} from "api/firewall/policy";
    import {getTimeListSelect} from "api/firewall/fwTime";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    export default{
        components: {},
        data(){

            return {
                sourceIpOption: [{
                    value: '0',
                    label: '预定义ip'
                }, {
                    value: '1',
                    label: '自定义'
                }, {
                    value: '2',
                    label: '预定义ip组'
                }],
                desIpOption: [{
                    value: '0',
                    label: '预定义ip'
                }, {
                    value: '1',
                    label: '自定义'
                }, {
                    value: '2',
                    label: '预定义ip组'
                }],
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
                    sEth:'',
                    dEth:'',
                    service:'',
                    time:'',
                    action:0,
                    state:0,
                },
                editVisible: true,

                timeList:[],
                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[],

                sort:'',

                id:'',
                preName:''
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
                getTimeListSelect().then((resp) => {
                    this.timeList = resp.data;
                }).catch(e => {});

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
                this.lookInfo.sourceIpType = row.sourceIpType;
                this.lookInfo.fillSip = row.sourceIp;

                this.lookInfo.chooseSipGroup=row.sourceIdg;
                this.lookInfo.desIpType=row.desIpType;
                this.lookInfo.fillDip=row.desIp;

                this.lookInfo.chooseDipGroup=row.desIdg;
                this.lookInfo.sEth=row.sourceEth;
                this.lookInfo.dEth=row.desEth;

                if (row.sourceId==0){
                    this.lookInfo.chooseSip='0';
                }else {
                    this.lookInfo.chooseSip=row.sourceId;
                }

                if (row.desId==0){
                    this.lookInfo.chooseDip='0';
                }else {
                    this.lookInfo.chooseDip=row.desId;
                }

                if (row.desServiceId==0){
                    this.lookInfo.service='0';
                }else {
                    this.lookInfo.service=row.desServiceId;
                }
                if (row.time==0){
                    this.lookInfo.time='0';
                }else {
                    this.lookInfo.time=row.time;
                }
                this.lookInfo.action=row.action;
                this.lookInfo.state=row.state;
                this.sort = row.sort;

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