<template>
    <div class="update-policy-dialog public policy">
        <el-dialog title="查看策略设置"
                   :visible.sync="lookVisible"
                   custom-class="dialog"
                   top="2%"
                   @close="handleClose" @open="doInit(currentData)">
            <el-tabs type="border-card">
                <el-tab-pane label="基础策略">
                    <el-form label-width="105px" :model="info" ref="info" :rules="rules">
                        <el-form-item label="策略名称" prop="name">
                            <el-input v-model="info.name" class="" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="策略描述">
                            <el-input v-model="info.remark" class="" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="计费模式">
                            <input type="checkbox" v-model="info.isBilling" :disabled="true" style=" margin-right: 5px; height: 15px;width: 15px"> 启用
                        </el-form-item>
                        <el-form-item label="双网隔离">
                            <input type="checkbox" v-model="info.networkIsolation"   :disabled="true" style=" margin-right: 5px; height: 15px;width: 15px"> 启用
                        </el-form-item>
                        <el-form-item label="基本选项" style="display: none;">
                            <el-card class="box-card">
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.l2tp" :disabled="true">
                                    {{'是否允许l2tp'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.updateInfo" :disabled="true">
                                    {{'是否允许修改个人信息'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.virtualDesk" :disabled="true">
                                    {{'是否允许使用虚拟桌面'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.saveCookies" :disabled="true">
                                    {{'保存COOKIES'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.networkIsolation" :disabled="true">
                                    {{'是否启用双网隔离'}}
                                </div>
                            </el-card>
                        </el-form-item>
                        <el-form-item label="最大登录数" class="item_mark">
                            <div class="el-input" style="width: 64px;">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.maxLogonNum" :disabled="true">
                            </div>
                        </el-form-item>
                        <el-form-item label="密码锁定" class="item_mark">
                            <span class="">账号连续</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.notLogonDay" :disabled="true">
                            </div>
                            天未登录,账号自动锁定
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="登录策略">
                    <el-form label-width="150px" style="margin: auto;width:50%;position: relative;">
                        <!--<span style="position: absolute;left: -14px;top: 7px;font-size: 15px">登录二次校验</span>-->
                        <el-form-item label="登录二次校验" style="">
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.sms_type" :disabled="true">启用短信验证</el-checkbox>
                            </el-col>
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.mail_type" :disabled="true">启用邮件验证</el-checkbox>
                            </el-col>
                            <el-col class="" v-if="false">
                                <el-checkbox v-model="info.secAuth.device_type" v-if="false">启用硬件特征码验证</el-checkbox>
                            </el-col>
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.dynamic_token_type" :disabled="true">启用动态令牌验证</el-checkbox>
                            </el-col>
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.dynamic_type" :disabled="true">启用随机验证码验证</el-checkbox>
                            </el-col>
                        </el-form-item>
                            <!---->
                        <el-form-item label="" v-if="false">
                            <div>
                                <input v-model="info.secAuth.sms_type" type="checkbox" :disabled="true" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px"> 启用短信验证
                            </div>
                            <div>
                                <input v-model="info.secAuth.mail_type" type="checkbox" :disabled="true" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px"> 启用邮件验证
                            </div>
                            <div v-if="false">
                                <input v-model="info.secAuth.device_type" type="checkbox" :disabled="true" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px"> 是否启用硬件特征码验证
                            </div>
                            <div>
                                <input v-model="info.secAuth.dynamic_token_type" type="checkbox" :disabled="true" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px"> 启用动态令牌验证
                            </div>
                            <div>
                                <input v-model="info.secAuth.dynamic_type" type="checkbox" :disabled="true" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px"> 启用随机验证码验证
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="密码策略">
                    <el-form label-width="150px" class="el_form">
                        <el-form-item label="基本选项" >
                            <div class="text item1 ">
                                <el-checkbox v-model="info.updatePw" class="" :disabled="true">允许修改密码</el-checkbox>
                            </div>
                            <el-card class="box-card ">
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.usernameEqualPw" :disabled="true">
                                    {{'允许用户名密码一致'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.newpwEqualOldpw" :disabled="true">
                                    {{'允许新旧密码一致'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.initUpdatePw" :disabled="true">
                                    {{'首次登陆修改密码'}}
                                </div>
                                <div>
                                    <span class="ele_before">密码长度范围</span>
                                    <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                        <input class="el-input__inner" style="height: 32px" v-model.number="info.minPwLength" :disabled="true">
                                    </div>
                                    至
                                    <div class="el-input" style="width: 64px; margin-left: 10px">
                                        <input class="el-input__inner" style="height: 32px" v-model.number="info.maxPwLength" :disabled="true">
                                    </div>
                                </div>
                                <div>
                                    密码组成部分包括
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="info.number" :disabled="true"> 数字
                                    <input type="checkbox" style="margin-left: 30px; margin-right: 5px" v-model="info.letter"  :disabled="true"> 英文字母
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="info.specialSymbol" :disabled="true"> 特殊符号
                                </div>
                            </el-card>

                        </el-form-item>
                        <el-form-item label="密码有效期设置" class="item_mark">
                            <span class="">密码有效期</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.pwValid" :disabled="true">
                            </div>
                            天
                        </el-form-item>
                        <el-form-item label="" class="">
                            <div>
                                <span class="">密码失效前</span>
                                <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                    <input class="el-input__inner" style="height: 32px" v-model.number="info.pwValidFront" :disabled="true">
                                </div>
                                天,发送提醒消息
                            </div>
                        </el-form-item>
                        <el-form-item label="" class="item_mark">
                            <span class="">密码连续匹配错误</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.pwErrorNum" :disabled="true">
                            </div>
                            次,账号锁定
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.lockedDay" :disabled="true">
                            </div>
                            分钟
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="时间策略">
                    <div class="block">
                        <label style="margin-left: 35px; margin-right: 20px">开始时间</label>
                        <el-date-picker
                                :disabled="true"
                                v-model="info.startTime"
                                type="datetime"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1">
                        </el-date-picker>
                        <label style="margin-left: 59px; margin-right: 20px">结束时间</label>
                        <el-date-picker
                                :disabled="true"
                                v-model="info.endTime"
                                type="datetime"
                                placeholder="选择日期"
                                :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                    <div class="enlink-add-time-table">
                        <table>
                            <tr>
                                <th style="width:100px;">
                                    <div class="out" style="font-size:13px">
                                        <b>时间/h</b> <em>星期</em>
                                    </div>
                                </th>
                                <th v-for="n in 24">{{ n | formatHour }}</th>
                            </tr>

                            <tr v-for="day in [ {day: '星期一', key: 'Mon'}, {day: '星期二', key: 'Tue'}, {day: '星期三', key: 'Wed'}, {day: '星期四', key: 'Thu'}, {day: '星期五', key: 'Fri'}, {day: '星期六', key: 'Sat'}, {day: '星期日', key: 'Sun'}]" class="assessDetail">
                                <th>{{ day.day }}</th>
                                <td v-for="n in 24" @click="timeClick(day.key, n)">
                                    <div v-if="contains(info.timeJson[day.key], n)" class="item"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style="width:18px;height:18px; margin-left: 75px; background-color:white;float:left;border: 1px solid #dddddd;"></div>
                    <div style="height:18px;line-height:18px;float:left;">未选时段</div>
                    <div style="width:18px;height:18px; margin-left: 20px; background-color:#0099CC;float:left; border: 1px solid #dddddd;"></div>
                    <div style="height:18px;line-height:18px; float:left;">已选时段</div>
                    <div style="clear:both;"></div>
                </el-tab-pane>
                <el-tab-pane label="流量策略">
                    <el-form label-width="150px">
                        <el-form-item label="日流量限制">
                            <div class="el-input " style=" margin-right: 10px">
                                <input class="el-input__inner el_put" style="" v-model.number="info.dayFlow" :disabled="true">
                                <span class="set_margin_left20" >MB</span>
                            </div>
                            <!--MB-->
                        </el-form-item>
                        <el-form-item label="月流量限制">
                            <div class="el-input " style=" margin-right: 10px">
                                <input class="el-input__inner el_put" style="" v-model="info.monFlow" :disabled="true">
                                <span class="set_margin_left20" >GB</span>
                            </div>
                            <!--GB-->
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="应用用户" style="padding-bottom: 20px; padding-top: 0px;">
                    <el-form label-width="150px">
                        <span v-for='userName in userList' style="margin-right: 20px;margin-top: 20px; display: inline-block;">
                            <el-tag type="primary">{{userName.userName}}</el-tag>
                        </span>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="应用用户组" style="padding-bottom: 20px; padding-top: 0px;">
                    <el-form label-width="150px">
                        <span v-for="groupName in groupList" style="margin-right: 20px;margin-top: 20px; display: inline-block;">
                        <el-tag type="primary">{{groupName.groupName}}</el-tag>
                        </span>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="硬件特征码策略" v-if="false">
                    <el-form label-width="150px" style="margin: auto;width:70%;">
                        <el-form-item label="" style="margin-left: -78px">
                            <!--<el-col class="set_margin_left20">-->
                            <el-checkbox v-model="info.secAuth.device_type" :disabled="true">是否启用硬件特征码策略</el-checkbox>
                            <!--</el-col>-->

                            <el-col class="set_margin_left20">
                                <el-radio v-model="info.signatureType" label='0' :disabled="true">硬件特征码登陆收集</el-radio>
                            </el-col>
                            <el-col class="set_margin_left20">
                                <el-radio  v-model="info.signatureType" label='1' :disabled="true">硬件特征码认证</el-radio>
                            </el-col>

                            <el-col class="set_margin_left20">
                                <el-select v-model="info.accessType" :disabled="true"  placeholder="请选择" style="margin-left:30px;width: 100%;">
                                    <el-option v-for="item in options" :value="item.value" :key="item.value" :label="item.label"></el-option>
                                </el-select>
                            </el-col>
                            <template v-if="info.accessType==0">

                            <el-col class="set_margin_left20" style="margin: 10px;margin-left: 50px">
                                <span>每个用户可用硬件特征码个数：</span>
                                <el-input v-model="info.signatureNum" class="" style="width: 20%;margin: 0;" :disabled="true"></el-input>
                                <span>(超过部分不计入校验)</span>
                            </el-col>
                            <el-col class="set_margin_left20">
                                <el-checkbox v-model="info.isUserModify" style="margin-left:30px" :disabled="true">允许用户绑定与修改特征码</el-checkbox>
                            </el-col>
                            <p style="margin-left:50px">设置特征码审核方式</p>
                            <el-col class="set_margin_left20">
                                <el-radio v-model="info.auditType" label='0' style="margin-left:50px" :disabled="true">自动审核</el-radio>
                                <br>
                                <el-radio-group v-model="info.autoAuditType" style="margin-left:75px" :disabled="true">
                                    <p><el-radio :label="0">短信确认审核</el-radio></p>
                                    <br>
                                    <p> <el-radio :label="1">邮件确认审核</el-radio></p>
                                    <br>
                                    <el-radio :label="2">申请即审核</el-radio>
                                </el-radio-group>

                            </el-col>

                            <el-col class="set_margin_left20">
                                <el-radio v-model="info.auditType" label='1' style="margin-left:50px" :disabled="true">手动审核</el-radio>
                            </el-col>
                            </template>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div class='foot' slot="footer">

            </div>
        </el-dialog>
    </div>
</template>


<script>

    import {mapGetters} from 'vuex';
    import {updatePolicy, checkPolicy} from 'api/SSL_VPN/policyManager/policy';
    import {getPolicyGroup, getPolicyUsers} from 'api/SSL_VPN/new-policyManager/new-policy';
    import {timestampFormat} from "../../../../utils/dateUtil";
    export default {
        computed: {},
        data() {
            return {
                groupQuery:{
                    currentPage: 1,
                    pageSize: 10,
                    ruleId:""
                },
                userQuery:{
                    currentPage: 1,
                    pageSize: 10,
                    ruleId:""
                },
                groupList:'',
                userList:'',
                lookVisible: true,
                rules: {
                    name: [
                        { required: true, message: '策略名称不能为空'},
//                        {validator: validateDays, trigger: 'blur'}
                    ]
                },
                info: {
                    id: '',
                    maxLogonNum: 1,
                    notLogonDay: 1,
                    minPwLength: 1,
                    maxPwLength: 20,
                    pwValid: 1,
                    pwValidFront: 1,
                    pwErrorNum: 3,
                    lockedDay: 1,
                    dayFlow: 100,//暂时隐藏
                    monFlow: 1,
                    dayFlowUnit: 'MB',
                    monFlowUnit: 'GB',
                    startTime: '',
                    endTime: '',
                    name: '',
                    remark: '',
                    l2tp: 1,
                    isBilling:0,
                    updateInfo: 0,
                    virtualDesk: 0,
                    saveCookies: 0,
                    networkIsolation: 0,
                    updatePw: 0,
                    usernameEqualPw: 0,
                    newpwEqualOldpw: 0,
                    initUpdatePw: 0,
                    number: 0,
                    letter: 0,
                    specialSymbol: 0,
                    timeJson: {
                        Mon: [],
                        Tue: [],
                        Wed: [],
                        Thu: [],
                        Fri: [],
                        Sat: [],
                        Sun: []
                    },
                    secAuth:{
                        sms_type:0,
                        dynamic_type:0,
                        device_type:0,
                        dynamic_token_type:0,
                        mail_type:0
                    },
                    //硬件特征码
                    //device_type:false,//硬件特征码
                    signatureNum:'',//硬件特征码个数(number型)
                    signatureType:'0',//false表示特征码收集;  true表示特征码认证(====此处传值会修改布尔类型)
                    //accessType;0允许所有已审核的账号与硬件特征码登录,1在所有已审核的终端上允许任意账号登录，
                    // 2所有已审核的账号，硬件特征码与终端类型，全部对应后，允许登陆
                    accessType:0,
                    //是否允许用户绑定与修改特征码，0否，1是
                    isUserModify:0,
                    // auditType;false自动审核，true手动审核
                    auditType:'0',
                    //autoAuditType;0短信确认审核，1邮件确认审核，2申请即审核
                    autoAuditType:0,

                    userNames:'',
                    groupNames:''
                },
                options:[
                    {
                        value:0,
                        label:'个人可信设备模式'
                    },
                    {
                        value:1,
                        label:'全局可信设备模式'
                    },
                ],
                breakUserNames:[],
                breakGroupNames:[],
                ruleId: '',
                pwChecked: 1,
                pwValidChecked: 1,
                pwErrorChecked: 0,
                timeChecked: 1,
                dayChecked: 1,
                monChecked: 1,
                checked: true,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        props: {
            currentData: Object
        },
        created() {
            this.getPolicyGroupList();
            this.getPolicyUserList();
            this.doInit(this.currentData)
        },
        methods: {
            timeClick(){

            },
            getPolicyGroupList() {
                this.groupQuery.ruleId = this.currentData.id;
                getPolicyGroup(this.groupQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.groupList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            getPolicyUserList() {
                this.userQuery.ruleId = this.currentData.id;
                getPolicyUsers(this.userQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.userList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData){
                let row=currentData;
                var startT;
                var endT;
                if (row.startTime == null||row.startTime ==''){
                    startT = '';
                } else {
                    startT = row.startTime;
                }
                if (row.endTime == null||row.endTime==''){
                    endT = '';
                } else {
                    endT = row.endTime;
                }
                let timeJson = JSON.parse(row.timeJson.replace(/\'/g, '"'));
                let sec = new Object();
                if(row.secAuth!=null && row.secAuth!=''){
                    sec = JSON.parse(row.secAuth);
                }
                this.info = {
                    id: row.id,
                    maxLogonNum: row.maxLogonNum,
                    notLogonDay: row.notLogonDay,
                    minPwLength: row.minPwLength,
                    maxPwLength: row.maxPwLength,
                    pwValid: row.pwValid,
                    pwValidFront: row.pwValidFront,
                    pwErrorNum: row.pwErrorNum,
                    lockedDay: row.lockedDay,
                    dayFlow: row.dayFlow,
                    monFlow: row.monFlow,
                    dayFlowUnit: 'MB',
                    monFlowUnit: 'MB',
                    startTime: startT,
                    endTime: endT,
                    name: row.name,
                    remark: row.remark,
                    l2tp: row.l2tp,
                    isBilling:row.isBilling,
                    updateInfo: row.updateInfo,
                    virtualDesk: row.virtualDesk,
                    saveCookies: row.saveCookies,
                    networkIsolation: row.networkIsolation,
                    updatePw: row.updatePw,
                    usernameEqualPw: row.usernameEqualPw,
                    newpwEqualOldpw: row.newpwEqualOldpw,
                    initUpdatePw: row.initUpdatePw,
                    number: row.number,
                    letter: row.letter,
                    specialSymbol: row.specialSymbol,
                    //硬件特征码
                    signatureNum:row.signatureNum,//硬件特征码个数(number型)
                    signatureType:Number(row.signatureType).toString(),//false表示特征码收集;  true表示特征码认证(====此处传值会修改布尔类型)
                    //accessType;0允许所有已审核的账号与硬件特征码登录,1在所有已审核的终端上允许任意账号登录，
                    // 2所有已审核的账号，硬件特征码与终端类型，全部对应后，允许登陆
                    accessType:row.accessType,
                    //是否允许用户绑定与修改特征码，0否，1是
                    isUserModify:row.isUserModify,
                    // auditType;false自动审核，true手动审核
                    auditType:Number(row.auditType).toString(),
                    //autoAuditType;0短信确认审核，1邮件确认审核，2申请即审核
                    autoAuditType:row.autoAuditType,
                    timeJson:{
                        Mon:timeJson.Mon ? timeJson.Mon : [],
                        Tue:timeJson.Tue ? timeJson.Tue : [],
                        Wed:timeJson.Wed ? timeJson.Wed : [],
                        Thu:timeJson.Thu ? timeJson.Thu : [],
                        Fri:timeJson.Fri ? timeJson.Fri : [],
                        Sat:timeJson.Sat ? timeJson.Sat : [],
                        Sun:timeJson.Sun ? timeJson.Sun : []
                    },
                    secAuth:{
                        sms_type:sec.sms_type,
                        dynamic_type:sec.dynamic_type,
                        device_type:sec.device_type,
                        dynamic_token_type:sec.dynamic_token_type,
                        mail_type:sec.mail_type
                    }
                };
                console.log("查看策略",this.info)
                this.ruleId = row.id;
                if(this.info.isBilling == 0){
                    this.info.isBilling = false
                } else if(this.info.isBilling == 1){
                    this.info.isBilling = true
                }
                if (this.info.secAuth.sms_type == 0){
                    this.info.secAuth.sms_type = false
                } else if(this.info.secAuth.sms_type == 1){
                    this.info.secAuth.sms_type = true
                }
                if(this.info.secAuth.mail_type == 0){
                    this.info.secAuth.mail_type = false
                } else if(this.info.secAuth.mail_type == 1){
                    this.info.secAuth.mail_type = true
                }
                if (this.info.secAuth.device_type == 0) {
                    this.info.secAuth.device_type = false
                } else if(this.info.secAuth.device_type == 1){
                    this.info.secAuth.device_type = true
                }
                if(this.info.secAuth.dynamic_token_type == 0){
                    this.info.secAuth.dynamic_token_type = false
                } else if(this.info.secAuth.dynamic_token_type == 1){
                    this.info.secAuth.dynamic_token_type = true
                }
                if(this.info.secAuth.dynamic_type == 0){
                    this.info.secAuth.dynamic_type = false
                } else if(this.info.secAuth.dynamic_type == 1){
                    this.info.secAuth.dynamic_type = true
                }
            },
            contains(array, element){
                for(let i = 0; i < array.length; i++){
                    if (array[i] == element){
                        return true;
                    }
                }
                return false;
            },
            pwCheck(){
                if (this.pwChecked){
                    this.notLogonDay = -1;
                }
            },
            pwValidCheck(){
                if (this.pwValidChecked){
                    this.pwValid = -1;
                    this.pwValidFront = -1;
                }
            },
            pwErrorCheck(){
                if (this.pwErrorChecked){
                    this.pwErrorNum = -1;
                    this.lockedDay = -1;
                }
            },
            timeCheck(){
                if (this.timeChecked){
                    this.startTime = '';
                    this.endTime = '';
                }
            },
            dayCheck(){
                if (this.dayChecked){
                    this.dayFlow = -1;
                }
            },
            monCheck(){
                if (this.monChecked){
                    this.monFlow = -1;
                }
            },
            submitEditForm(){
                this.lookVisible = false;
            }
        },
        filters: {
            formatHour(value) {
                if (value.toString().length == 1) {
                    return '0' + value;
                }
                return value;
            }
        }
    }
</script>


<style>
    .update-policy-dialog  .el-dialog--small {
        /*width: 1000px!important;*/
        /*height:600px!important;*/
    }
    .update-policy-dialog .dialog{
        min-width: 850px;
    }
    .update-policy-dialog .el-dialog__header{
        padding-left:5px ;
    }
    .policy .el-form-item__label{
        /*margin-left: 0!important;*/
    }
</style>


<style scoped>
    th {
        /*background: #199fff;*/
        background: #F1F1F1;
        color: white;
    } /*模拟对角线*/
    .enlink-add-time-table table {
        border-collapse: collapse;
        border: 1px solid #e3e3e3;
        width: 96%;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom:10px;
    }

    .enlink-add-time-table  th, td {
        border: 1px solid #e3e3e3;
        text-align: center;
        font-size: 13px;
        line-height: 35px;
        background: #F1F1F1;
    }

    .enlink-add-time-table th {
        background: #F1F1F1;
        color: black;
    } /*模拟对角线*/
    .out {
        border-top: 50px #dedede solid; /*上边框宽度等于表格第一行行高*/
        border-left: 100px #ededed solid; /*左边框宽度等于表格第一行第一格宽度*/
        position: relative; /*让里面的两个子容器绝对定位*/
        color:black;
    }

    b {
        font-style: normal;
        display: block;
        position: absolute;
        top: -51px;
        left: -78px;
        width: 100px;
    }

    em {
        font-style: normal;
        display: block;
        position: absolute;
        top: -34px;
        left: -120px;
        width: 100px;
    }
    .assessDetail td {
        background-color: #FFF;
    }
    .enlink-add-time-table td{
        width: 33px;
        height: 36px;
        cursor: pointer;
    }
    .enlink-add-time-table .item{
        background-color: #0099CC;
        width: 100%;
        height: 100%;
    }
    /deep/.el-tabs--border-card>.el-tabs__content{
        padding: 20px;
    }
</style>