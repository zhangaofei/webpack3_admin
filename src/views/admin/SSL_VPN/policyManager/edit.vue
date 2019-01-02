<template>
    <div class="update-policy-dialog public policy">
        <el-dialog title="编辑策略设置"
                   custom-class="dialog"
                   :visible.sync="editVisible"
                   top="2%"
                   @close="handleClose" @open="doInit(currentData)">
            <el-tabs type="border-card">
                <el-tab-pane label="基础策略">
                    <el-form label-width="150px" :model="info" ref="info" :rules="rules">
                        <el-form-item label="策略名称" prop="name">
                            <el-input v-model="info.name" :disabled="available()" class="el_put "></el-input>
                        </el-form-item>
                        <el-form-item label="策略描述">
                            <el-input v-model="info.remark" class="el_put "></el-input>
                        </el-form-item>
                        <el-form-item label="计费模式">
                            <input v-model="info.isBilling" type="checkbox" style=" margin-right: 5px; height: 15px;width: 15px" > 启用
                        </el-form-item>
                        <el-form-item label="双网隔离">
                            <input v-model="info.networkIsolation" type="checkbox" style=" margin-right: 5px; height: 15px;width: 15px"> 启用
                        </el-form-item>
                        <el-form-item label="基本选项" style="display: none;">
                            <el-card class="box-card">
                                <div class="text item1">
                                    <!--<input type="checkbox" v-model="info.l2tp">-->
                                    <el-checkbox v-model="info.l2tp" >{{'是否允许l2tp'}}</el-checkbox>
                                    <!--{{'是否允许l2tp'}}-->
                                </div>
                                <div class="text item1">
                                    <el-checkbox v-model="info.updateInfo" >{{'是否允许修改个人信息'}}</el-checkbox>
                                    <!--<input type="checkbox" v-model="info.updateInfo">-->
                                    <!--{{'是否允许修改个人信息'}}-->
                                </div>
                                <div class="text item1">
                                    <el-checkbox v-model="info.virtualDesk" >{{'是否允许使用虚拟桌面'}}</el-checkbox>
                                    <!--<input type="checkbox" v-model="info.virtualDesk">-->
                                    <!--{{'是否允许使用虚拟桌面'}}-->
                                </div>
                                <div class="text item1">
                                    <el-checkbox v-model="info.saveCookies" > {{'保存COOKIES'}}</el-checkbox>
                                    <!--<input type="checkbox" v-model="info.saveCookies">-->
                                    <!--{{'保存COOKIES'}}-->
                                </div>
                                <div class="text item1">
                                    <el-checkbox v-model="info.networkIsolation" >{{'是否启用双网隔离'}}</el-checkbox>
                                    <!--<input type="checkbox" v-model="info.networkIsolation">-->
                                    <!--{{'是否启用双网隔离'}}-->
                                </div>
                            </el-card>
                        </el-form-item>
                        <el-form-item label="最大登录数" class="item_mark">
                            <div class="el-input" style="width: 64px;">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.maxLogonNum"
                                       @blur="checkMaxlogin" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                <div class="el-form-item__error" id="maxLogonNumErrMsg" style="display: none; width: 250px">请输入0-9999之间的整数</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="账号锁定" class="item_mark">
                            <span style="">账号连续</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.notLogonDay"
                                       @blur="passwordLocked" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                <div class="el-form-item__error" id="passwordNumErrMsg" style="display: none;width: 250px">请输入0-9999之间的整数</div>
                            </div>
                            天未登录,账号自动锁定
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="登录策略">
                    <el-form label-width="105px" style="margin: auto;width:50%;position: relative;">
                        <!--<span style="position: absolute;left: -14px;top: 7px;font-size: 15px;">登录二次校验</span>-->

                        <el-form-item label="登录二次校验" style="">
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.sms_type" >启用短信验证</el-checkbox>
                            </el-col>
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.mail_type" >启用邮件验证</el-checkbox>
                            </el-col>
                            <el-col class="" v-if="false">
                                <el-checkbox v-model="info.secAuth.device_type" v-if="false">启用硬件特征码验证</el-checkbox>
                            </el-col>
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.dynamic_token_type" >启用动态令牌验证</el-checkbox>
                            </el-col>
                            <el-col class="">
                                <el-checkbox v-model="info.secAuth.dynamic_type" >启用随机验证码验证</el-checkbox>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="" v-if="false">
                            <div>
                                <input v-model="info.secAuth.sms_type" type="checkbox" style=" margin-right: 5px; height: 15px;width: 15px"> 启用短信验证
                            </div>
                            <div>
                                <input v-model="info.secAuth.mail_type" type="checkbox" style=" margin-right: 5px; height: 15px;width: 15px"> 启用邮件验证
                            </div>
                            <div v-if="false">
                                <input v-model="info.secAuth.device_type" type="checkbox" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px" > 启用硬件特征码验证
                            </div>
                            <div>
                                <input v-model="info.secAuth.dynamic_token_type" type="checkbox" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px"> 启用动态令牌验证
                            </div>
                            <div>
                                <input v-model="info.secAuth.dynamic_type" type="checkbox" style="margin-left: 20px; margin-right: 5px; height: 15px;width: 15px"> 启用随机验证码验证
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="密码策略">
                    <el-form label-width="150px" class="el_form">
                        <el-form-item label="基本选项">
                            <div class="text item1 ">
                                <el-checkbox v-model="info.updatePw" class="set_margin_left10" @change="valueChange">允许修改密码</el-checkbox>
                            </div>
                            <el-card class="box-card " v-if="info.updatePw">
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.usernameEqualPw">
                                    {{'允许用户名密码一致'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.newpwEqualOldpw">
                                    {{'允许新旧密码一致'}}
                                </div>
                                <div class="text item1">
                                    <input type="checkbox" v-model="info.initUpdatePw">
                                    {{'首次登陆修改密码'}}
                                </div>
                                <div>
                                    <span class="ele_before">密码长度范围</span>
                                    <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                        <input class="el-input__inner" style="height: 32px" v-model.number="info.minPwLength"
                                               @blur="minPasswordLength" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                        <div class="el-form-item__error" id="minLengthErrMsg" style="display: none;width: 200px;margin-left: -85px;margin-top: -3px">请输入6到最大值之间的正整数</div>
                                    </div>
                                    至
                                    <div class="el-input" style="width: 64px; margin-left: 10px">
                                        <input class="el-input__inner" style="height: 32px" v-model.number="info.maxPwLength"
                                               @blur="maxPasswordLength" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                        <div class="el-form-item__error" id="maxLengthErrMsg" style="display: none;width: 200px;margin-top: -3px">请输入最小值到99之间的正整数</div>
                                    </div>
                                </div>
                                <div style="margin-top: 15px">
                                    密码组成部分包括
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="info.number"> 数字
                                    <input type="checkbox" style="margin-left: 30px; margin-right: 5px" v-model="info.letter"> 英文字母
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="info.specialSymbol"> 特殊符号
                                </div>
                            </el-card>
                            <el-card class="box-card " v-else>
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
                                        <input class="el-input__inner" style="height: 32px" v-model.number="info.minPwLength"
                                               @blur="minPasswordLength" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')" :disabled="true">
                                        <div class="el-form-item__error"  style="display: none;width: 200px;margin-left: -85px;margin-top: -3px">请输入6到最大值之间的正整数</div>
                                    </div>
                                    至
                                    <div class="el-input" style="width: 64px; margin-left: 10px">
                                        <input class="el-input__inner" style="height: 32px" v-model.number="info.maxPwLength"
                                               @blur="maxPasswordLength" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')" :disabled="true">
                                        <div class="el-form-item__error"  style="display: none;width: 200px;margin-top: -3px">请输入最小值到99之间的正整数</div>
                                    </div>
                                </div>
                                <div style="margin-top: 15px">
                                    密码组成部分包括
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="info.number" :disabled="true"> 数字
                                    <input type="checkbox" style="margin-left: 30px; margin-right: 5px" v-model="info.letter" :disabled="true"> 英文字母
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="info.specialSymbol" :disabled="true"> 特殊符号
                                </div>
                            </el-card>
                        </el-form-item>
                        <el-form-item label="密码有效期设置" class="item_mark">
                            <span class="">密码有效期</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.pwValid"
                                       @blur="pwValidBefEvent" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                <div class="el-form-item__error" id="pwValidErrMsg" style="display: none; width: 250px">请输入0-9999之间的整数</div>
                            </div>
                            天
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <span class="">密码失效前</span>
                                <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                    <input class="el-input__inner" style="height: 32px" v-model.number="info.pwValidFront"
                                           @blur="pwValidEvent" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                    <div class="el-form-item__error" id="pwValidFrontErrMsg" style="display: none; width: 250px">请输入0至密码有效期之间的整数</div>
                                </div>
                                天,发送提醒消息
                            </div>
                        </el-form-item>
                        <el-form-item label="密码容错设置" class="item_mark">
                            <span class="">密码连续匹配错误</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.pwErrorNum"
                                       @blur="ErrorCount" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                <div class="el-form-item__error" id="passErrMsg" style="display: none;width: 250px">请输入0-9999之间的整数</div>
                            </div>
                            次,账号锁定
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.lockedDay"
                                       @blur="lockedTime" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                <div class="el-form-item__error" id="lockedTimeErrMsg" style="display: none;width: 250px">请输入0-9999之间的整数</div>
                            </div>
                            分钟
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="时间策略">
                    <div class="block">
                        <!--{{info.startTime}}-->
                        <label style="margin-left: 35px; margin-right: 20px">开始时间</label>
                        <el-date-picker
                                v-model="startT"
                                @change="changeStartTime"
                                type="datetime"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1"
                                >

                        </el-date-picker>
                        <label style="margin-left: 59px; margin-right: 20px">结束时间</label>

                        <el-date-picker
                                v-model="endT"
                                @change="changeEndTime"
                                type="datetime"
                                placeholder="选择日期"
                                :picker-options="pickerOptions2"
                                >
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
                            <div class="el-input" style=" margin-right: 20px">
                                <input class="el-input__inner el_put" style="" v-model.number="info.dayFlow"
                                       onkeyup="this.value=this.value.replace(/\D|^0/g,'')" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"><span class="set_margin_left20">MB</span>
                            </div>
                            <!--MB-->
                        </el-form-item>
                        <el-form-item label="月流量限制">
                            <div class="el-input " style="margin-right: 20px">
                                <input class="el-input__inner el_put" style="" v-model="info.monFlow"
                                       onkeyup="this.value=this.value.replace(/\D|^0/g,'')" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"><span class="set_margin_left20" >GB</span>
                            </div>
                            <!--GB-->
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="硬件特征码策略" v-if="false">
                    <el-form label-width="150px" style="margin: auto;width:70%;">
                        <el-form-item label="" style="margin-left: -78px">
                            <!--<el-col class="">-->
                            <el-checkbox v-model="info.secAuth.device_type">启用硬件特征码策略</el-checkbox>
                            <!--</el-col>-->
                            <el-col class="">
                                <el-radio v-model="info.signatureType" label='0' :disabled="!info.secAuth.device_type">启用登陆收集模式</el-radio>
                            </el-col>
                            <el-col class="">
                                <el-radio  v-model="info.signatureType" label='1' :disabled="!info.secAuth.device_type">启用登陆认证模式</el-radio>
                            </el-col>

                            <el-col class="">
                                <el-select v-model="info.accessType" :disabled="!info.secAuth.device_type||info.secAuth.device_type&&
                                !Boolean(Number(info.signatureType))"  placeholder="请选择" style="margin-left:30px;width: 100%;">
                                    <el-option v-for="item in options" :value="item.value" :key="item.value" :label="item.label"></el-option>
                                </el-select>
                            </el-col>

                            <template v-if="info.accessType==0">

                            <el-col class="" style="margin: 10px;margin-left: 50px">
                                <span>每个用户可用硬件特征码个数：</span>
                                <el-input v-model="info.signatureNum" class="" style="width: 20%;margin: 0;" :disabled="!info.secAuth.device_type||!Boolean(Number(info.signatureType))||(!info.secAuth.device_type&&!Boolean(Number(info.signatureType)))"></el-input>
                                <span>(超过部分不计入校验)</span>
                            </el-col>
                            <el-col class="">
                                <el-checkbox v-model="info.isUserModify" style="margin-left:30px" :disabled="!info.secAuth.device_type||(info.secAuth.device_type&&
                                !Boolean(Number(info.signatureType)))">允许用户绑定与修改特征码</el-checkbox>
                            </el-col>
                            <p style="margin-left:50px">设置特征码审核方式</p>
                            <el-col class="">
                                <el-radio v-model="info.auditType" label='0' style="margin-left:50px" :disabled="!info.secAuth.device_type||!Boolean(Number(info.signatureType))||!Boolean(info.isUserModify)||(!info.secAuth.device_type&&
                                !Boolean(Number(info.signatureType))&&!Boolean(info.isUserModify))">自动审核</el-radio>
                                <br>
                                <el-radio-group v-model="info.autoAuditType" style="margin-left:75px" :disabled="(!info.secAuth.device_type||!Boolean(Number(info.signatureType))
                                ||!Boolean(info.isUserModify)||Boolean(Number(info.auditType)))||
                                !(info.secAuth.device_type&&Boolean(Number(info.signatureType))&& Boolean(info.isUserModify)&& !Boolean(Number(info.auditType)))">
                                    <p><el-radio :label="0">短信确认审核</el-radio></p>
                                    <br>
                                    <p> <el-radio :label="1">邮件确认审核</el-radio></p>
                                    <br>
                                    <el-radio :label="2">申请即审核</el-radio>
                                </el-radio-group>

                            </el-col>

                            <el-col class="">
                                <el-radio v-model="info.auditType" label='1' style="margin-left:50px" :disabled="!info.secAuth.device_type||!Boolean(Number(info.signatureType))||!Boolean(info.isUserModify)||(info.secAuth.device_type&&
                                !Boolean(Number(info.signatureType))&&!Boolean(info.isUserModify))">手动审核</el-radio>
                            </el-col>
                            </template>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <!--<el-button-->
                            <!--@click="designAdd('info')" style="margin-right: 40px;background-color: #fff">-->
                        <!--取消-->
                    <!--</el-button>-->
                    <span class="cancle btn_middle" @click="designAdd('info')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="updatePolicy('info')">
                        确定
                    </el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>


<script>

    import {mapGetters} from 'vuex';
    import {updatePolicy, checkPolicy} from 'api/SSL_VPN/new-policyManager/new-policy';
    import {timestampFormat} from "../../../../utils/dateUtil";
    import {forTimeVal} from '@/utils/dateUtil'
    export default {
        computed: {},
        components: {

        },

        data() {
            let name = (rule, value, callback) => {
                if (/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&*()_+{}[]|:;"',.<>?\/]$/.test(value) == false) {
                    callback(new Error('请输入中文、英文、数字、英文符号'));
                } else {
                    callback();
                }
            };
            return {
                editVisible: true,
                rules: {
                    name: [
                        { required: true, validator: name, trigger: 'blur'},
                    ]
                },
                info: {
                    id: '',
                    maxLogonNum: 0,
                    notLogonDay: 0,
                    minPwLength: 6,
                    maxPwLength: 20,
                    pwValid: 0,
                    pwValidFront: 0,
                    pwErrorNum: 3,
                    lockedDay: 5,
                    dayFlow: 0,
                    monFlow: 0,
                    dayFlowUnit: 'MB',
                    monFlowUnit: 'GB',
                    startTime: '',
                    endTime: '',
                    name: '',
                    remark: '',
                    l2tp: 1,
                    isBilling:false,
                    updateInfo: false,
                    virtualDesk: false,
                    saveCookies: false,
                    networkIsolation: false,
                    updatePw: false,
                    usernameEqualPw: false,
                    newpwEqualOldpw: false,
                    initUpdatePw: false,
                    number: false,
                    letter: false,
                    specialSymbol: false,
                    default:'',
                    dayTime:'',
                    dayTimeUnit:'',
                    monTime:'',
                    monTimeUnit:'',
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
                        sms_type:false,
                        dynamic_type:false,
                        device_type:false,
                        dynamic_token_type:false,
                        mail_type:false
                    },
                    //硬件特征码
                    //device_type:false,//硬件特征码
                    signatureNum:0,//硬件特征码个数(number型)
                    signatureType:'0',//false表示特征码收集;  true表示特征码认证(====此处传值会修改布尔类型)
                    //accessType;0(个人)允许所有已审核的账号与硬件特征码登录,1（全局）在所有已审核的终端上允许任意账号登录，
                    // 2所有已审核的账号，硬件特征码与终端类型，全部对应后，允许登陆
                    accessType:0,
                    //是否允许用户绑定与修改特征码，0否，1是
                    isUserModify:0,
                    // auditType;false自动审核，true手动审核
                    auditType:'0',
                    //autoAuditType;0短信确认审核，1邮件确认审核，2申请即审核
                    autoAuditType:0,
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
                wrongminValue:'6',
                wrongmaxValue:'20',
                startT:'',
                endT:'',
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
                maxLoginCheck:false,
                lockCheck:false,
                minLengthCheck:false,
                maxLengthCheck:false,
                validCheck:false,
                validFrontCheck:false,
                matchErrorCheck:false,
                lockTime:false
            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            valueChange(){
                if(!this.info.updatePw){
                    this.info.usernameEqualPw = false;
                    this.info.newpwEqualOldpw = false;
                    this.info.initUpdatePw = false;
                    this.info.minPwLength = 6;
                    this.info.maxPwLength = 20;
                    this.info.number = true;
                    this.info.letter = true;
                    this.info.specialSymbol = true;
                }
            },
            available(){
              if(this.info.name == '默认策略'){
                  return true;
              }  else {
                  return false;
              }
            },
            checkMaxlogin(e){
                let value = e.target.value;
                if (value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#maxLogonNumErrMsg').show();
                    this.maxLoginCheck = true;
                } else {
                    $('#maxLogonNumErrMsg').hide();
                    this.maxLoginCheck = false;
                }

            },
            passwordLocked(e){
                let value = e.target.value;
                if (value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#passwordNumErrMsg').show();
                    this.lockCheck = true;
                } else {
                    $('#passwordNumErrMsg').hide();
                    this.lockCheck = false;
                }


            },
            ErrorCount(e){
                let value = e.target.value;
                if (value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#passErrMsg').show();
                    this.matchErrorCheck = true;
                } else {
                    $('#passErrMsg').hide();
                    this.matchErrorCheck = false;
                }
            },
            lockedTime(e){
                console.log('eeee:', e.target.value);
                let value = e.target.value;
                if (value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#lockedTimeErrMsg').show();
                    this.lockTime = true;
                } else {
                    $('#lockedTimeErrMsg').hide();
                    this.lockTime = false;
                }

            },
            minPasswordLength(e){
                let value = e.target.value;
                if ((value >= this.info.maxPwLength && this.info.maxPwLength >= 6) || value < 6 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#minLengthErrMsg').show();
                    this.minLengthCheck = true;
                }
                else {
                    $('#minLengthErrMsg').hide();
                    this.minLengthCheck = false;
                }

            },
            maxPasswordLength(e){
                let value = e.target.value;
                if (this.info.minPwLength >= value || value > 99||this.info.minPwLength<6 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#maxLengthErrMsg').show();
                    this.maxLengthCheck = true;
                }
                else {
                    $('#maxLengthErrMsg').hide();
                    this.maxLengthCheck = false;
                }
            },
            pwValidBefEvent(e)
            {
                let value =e.target.value;
                if(value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false)
                {
                    $('#pwValidErrMsg').show();
                    this.validCheck = true;
                } else {
                    $('#pwValidErrMsg').hide();
                    this.validCheck = false;
                }
            },
            pwValidEvent(e){
                let value = e.target.value;
                if(value<0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#pwValidFrontErrMsg').show();
                    this.validFrontCheck = true;
                } else if (this.info.pwValid < value )
                {
                    $('#pwValidFrontErrMsg').show();
                    this.validFrontCheck = true;
                } else {
                    $('#pwValidFrontErrMsg').hide();
                    this.validFrontCheck = false;
                }
            },

            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData){
                let row=currentData;
                var startT;
                var endT;
                if (currentData.startTime == null||currentData.startTime ==''){
                    startT = '';
                } else {
                   // startT = timestampFormat('yyyy-MM-dd', currentData.startTime);
                    startT =  new Date(currentData.startTime);
                }
                if (currentData.endTime == null||currentData.endTime == ''){
                    endT = '';
                } else {
                   // endT = timestampFormat('yyyy-MM-dd', currentData.endTime);
                    endT =  new Date(currentData.endTime);
                }
                // console.log('timeJson, sec:', typeof (row.timeJson.replace(/\'/g, '"')), typeof (row.secAuth));
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
                    startTime: startT,
                    endTime: endT,
                    dayFlow: row.dayFlow,
                    monFlow: row.monFlow,
                    dayFlowUnit: 'MB',
                    monFlowUnit: 'GB',
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
                    signatureNum:row.signatureNum==null?0:row.signatureNum,//硬件特征码个数(number型)
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
                }
                console.log(startT,"转化后的data:",this.info)
                this.ruleId = row.id;
                this.startT = startT;
                this.endT = endT;
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
                if (this.info.secAuth.device_type == 0)
                {
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
                if (array == undefined){
                    return false;
                } else {
                    for(let i = 0; i < array.length; i++){
                        if (array[i] == element){
                            return true;
                        }
                    }
                    return false;
                }
            },
            removed(array, elements){
                if (array == undefined){
                    return false;
                } else {
                    for (let i = 0; i < array.length; i++){
                        if (array[i] == elements){
                            array.splice(i, 1);
                            return;
                        }
                    }
                }
            },
            timeClick(mon, n){
                if (this.contains(this.info.timeJson[mon], n)) {
                    this.removed(this.info.timeJson[mon], n);
                } else {
                    this.info.timeJson[mon].push(n);
                }
            },
            changeEndTime(e){
                console.log("起始时间",this.startT)
                    if (e < this.startT){
                        this.endT = "";
                    } else {
                        this.endT = e
                    }
            },
            changeStartTime(e){
                console.log('edit',e)
                if (e > this.endT && this.endT != ''){
                    this.startT = "";
                } else {
                    this.startT = e;
                }
            },
            designAdd() {
                this.editVisible = false;
            },
            validReg(){
                if(/^\d+$/.test(this.info.signatureNum)==false){
                    this.$message({
                        type: 'warning',
                        message: '特征码个数为非负的整数!'
                    });
                    return false;
                }
                return true;
            },
            updatePolicy(formName){
                console.log(this.info.signatureNum,'signatureNum')
                if (this.info.name == '') {
                    this.$message({
                        type: 'warning',
                        message: '策略名称不能为空!'
                    });
                } else {
                    this.info.auditType=Boolean(Number(this.info.auditType));
                    this.info.signatureType=Boolean(Number(this.info.signatureType));
                    this.info.isUserModify=Boolean(this.info.isUserModify);
                    this.$refs[formName].validate((valid) => {
                        if (valid && !this.maxLoginCheck && !this.lockCheck && !this.minLengthCheck && !this.maxLengthCheck
                            && !this.validCheck && !this.validFrontCheck && !this.matchErrorCheck && !this.lockTime&&this.validReg()) {
                            if (this.info.isBilling == false) {
                                this.info.isBilling = 0
                            } else if (this.info.isBilling == true) {
                                this.info.isBilling = 1
                            }
                            if (this.info.secAuth.sms_type == false) {
                                this.info.secAuth.sms_type = 0
                            } else if (this.info.secAuth.sms_type == true) {
                                this.info.secAuth.sms_type = 1
                            }
                            if (this.info.secAuth.mail_type == false) {
                                this.info.secAuth.mail_type = 0
                            } else if (this.info.secAuth.mail_type == true) {
                                this.info.secAuth.mail_type = 1
                            }
                            if (this.info.secAuth.device_type == false) {
                                this.info.secAuth.device_type = 0
                            } else if (this.info.secAuth.device_type == true) {
                                this.info.secAuth.device_type = 1
                            }
                            if (this.info.secAuth.dynamic_token_type == false) {
                                this.info.secAuth.dynamic_token_type = 0
                            } else if (this.info.secAuth.dynamic_token_type == true) {
                                this.info.secAuth.dynamic_token_type = 1
                            }
                            if (this.info.secAuth.dynamic_type == false) {
                                this.info.secAuth.dynamic_type = 0
                            } else if (this.info.secAuth.dynamic_type == true) {
                                this.info.secAuth.dynamic_type = 1
                            }
                            let timeRule = this.info.timeJson;
                            if (this.info.maxLogonNum == '') {
                                this.info.maxLogonNum = 0;
                            }
                            if (this.info.notLogonDay == '') {
                                this.info.notLogonDay = 0
                            }
                            if (this.info.minPwLength == '') {
                                this.info.minPwLength = 6
                            }
                            if (this.info.maxPwLength == '') {
                                this.info.maxPwLength = 20
                            }
                            if (this.info.pwErrorNum == '') {
                                this.info.pwErrorNum = 0
                            }
                            if (this.info.lockedDay == '') {
                                this.info.lockedDay = 0
                            }
                            if (this.info.monFlow == '') {
                                this.info.monFlow = 0
                            }
                                console.log(this.info.startTime,typeof(this.info.startTime) ,'保存前===============stime',this.startT)
                            if (this.startT == undefined||this.startT ==null||this.startT=='') {
                                this.info.startTime = forTimeVal(new Date());
                            } else {
                                this.info.startTime = forTimeVal(this.startT);
                            }
                            if (this.endT == undefined||this.endT==null||this.endT=='') {
                                this.info.endTime = '';
                            } else {
                                this.info.endTime = forTimeVal(this.endT);
                            }
                            this.info.timeJson = JSON.stringify(this.info.timeJson)
                            this.info.secAuth = JSON.stringify(this.info.secAuth)
                            updatePolicy(this.info).then(response => {
                                if (response.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '编辑策略成功!'
                                    });
                                    this.editVisible = false;
                                    this.$emit('onChangeStatus');
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: response.code.info
                                    });
                                }
                            }).catch((e) => {
                                console.log(e)
                            });
                        } else {
                            if(this.maxLoginCheck){
                                this.$message({
                                    type: 'warning',
                                    message: '最大登录数输入有误!'
                                });
                            } else if(this.lockCheck){
                                this.$message({
                                    type: 'warning',
                                    message: '账号锁定参数输入有误!'
                                });
                            } else if(this.minLengthCheck){
                                this.$message({
                                    type: 'warning',
                                    message: '密码长度最小值输入有误!'
                                });
                            } else if(this.maxLengthCheck){
                                this.$message({
                                    type: 'warning',
                                    message: '密码长度最大值输入有误!'
                                });
                            } else if(this.validCheck){
                                this.$message({
                                    type: 'warning',
                                    message: '密码有效期输入有误!'
                                });
                            } else if(this.validFrontCheck){
                                this.$message({
                                    type: 'warning',
                                    message: '提示密码失效日期输入有误!'
                                });
                            } else if(this.matchErrorCheck){
                                this.$message({
                                    type: 'warning',
                                    message: '允许密码输入错误次数输入有误!'
                                });
                            } else if(this.lockTime){
                                this.$message({
                                    type: 'warning',
                                    message: '账号锁定时间输入有误!'
                                });
                            }
                            return false;
                        }
                    })
                }
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
        /*height:800px!important;*/
    }
    .update-policy-dialog .el-dialog__body{
        min-height: 630px;
    }
    .update-policy-dialog .dialog{
        min-width: 850px;
    }
    .update-policy-dialog .el-dialog__header{
        padding-left:5px ;
    }
    .el-dialog__footer {
        background-color: #E7E7E7;
        border-top: 1px solid #E7E7E7;
        height: 100px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .policy .el-form-item__label{
        /*margin-left: 0;*/
    }
</style>


<style scoped>
    /*设置弹出框大小*/

    .el-double-icon {
        font-size: 12px;
        position: absolute;
        width: 24px;
        height: 56%;
        text-align: center;
        color: #5799e6;
        transition: all .3s;
        cursor:pointer;
    }
    .right-top {
        top: 7px;
        right: 0;
    }
    .right-bottom {
        right: 0;
        bottom: -1px;
    }

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
    .public .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        /* left: 131px; */
        left: 0px;
    }
</style>