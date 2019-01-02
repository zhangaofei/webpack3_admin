<template>
    <div>
        <div style="width: 100%;margin-top: 10px">

            <el-row :gutter="30">
                <el-col :span="10" style="width: 65.5%;">
                    <div class="multiple-condition">

                        <!--<el-tag @close="handleClose(0)"-->
                        <!--key="inp"-->
                        <!--v-show="conditionOptions[0].checked"-->
                        <!--:closable="true"-->
                        <!--:close-transition="false" >-->
                        <!--日期：-->
                        <!--1111{{conditionOptions[0].value}}-->
                        <!--<el-date-picker-->
                                <!--v-model="conditionOptions[0].value"-->
                                <!--type="daterange"-->
                                <!--size="small"-->
                                <!--range-separator="  至  "-->
                                <!--format="yyyy-MM-dd"-->
                                <!--style="margin-left: 6px;height: 35px;vertical-align: middle"-->
                                <!--placeholder="选择日期范围"-->
                                <!--@change="changDate(conditionOptions[0].value)"-->
                                <!--@blur="changes(conditionOptions[0].value)"-->
                                <!--&gt;-->
                        <!--</el-date-picker>-->
                        <!--==========-->
                        <label style="margin-left: 0px; margin-right: 0px">开始时间</label>
                        <el-date-picker
                                v-model="conditionOptions[0].value.valStar"
                                @change="changeStartTime"
                                type="date"
                                format="yyyy-MM-dd "
                                placeholder="选择日期"
                                >
                        </el-date-picker>
                        <label style="margin-left: 10px; margin-right: 0px">结束时间</label>
                        <el-date-picker
                                v-model="conditionOptions[0].value.valEnd"
                                @change="changeEndTime"
                                type="date"

                                placeholder="选择日期"
                                >
                        </el-date-picker>
                        <!--</el-tag>-->

                        <el-tag @close="handleClose(1)"
                                key="1"
                                v-show="conditionOptions[1].checked"
                                :closable="true"
                                placeholder="请选择级别"
                                :close-transition="false">
                            级别：
                            <!--<el-select size="mini"-->
                            <!--v-model="selectLevel"-->
                            <!--popper-class="log-select">-->

                            <!--<el-checkbox-group v-model="conditionOptions[1].value">-->
                            <!--<el-option value ="INFO" label="提示">-->
                            <!--<el-checkbox  label="INFO">提示</el-checkbox>-->
                            <!--</el-option>-->
                            <!--<el-option value ="WARNING" label="警告">-->
                            <!--<el-checkbox label="WARNING">警告</el-checkbox>-->
                            <!--</el-option>-->

                            <!--<el-option value="ERROR" label="错误">-->
                            <!--<el-checkbox label="ERROR">错误</el-checkbox>-->
                            <!--</el-option>-->
                            <!--</el-checkbox-group>-->
                            <!--</el-select>-->

                            <el-select
                                    v-model="conditionOptions[1].value"
                                    size="mini"
                                    multiple
                                    collapse-tags
                                    style="border: none;"
                                    popper-class="log-select">
                                <!--<el-option v-for="item in userAuth"-->
                                <!--:value ="item.id"-->
                                <!--:key="item.id"-->
                                <!--:label="item.name">-->
                                <!--</el-option>-->
                                <el-option value="INFO" label="提示">
                                </el-option>
                                <el-option value="WARNING" label="警告">
                                </el-option>
                                <el-option value="ERROR" label="错误">
                                </el-option>
                            </el-select>

                        </el-tag>

                        <el-tag @close="handleClose(2)"
                                v-show="conditionOptions[2].checked"
                                key="2"
                                :closable="true"
                                :close-transition="false">
                            用户名：<input v-model="conditionOptions[2].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(3)"
                                key="3"
                                v-show="conditionOptions[3].checked"
                                :closable="true"
                                :close-transition="false">
                            用户组：
                            <!--<el-select size="mini"-->
                            <!--v-model="selectGroup"-->
                            <!--placeholder="请选择用户组"-->
                            <!--popper-class="log-select"-->
                            <!--style="border: none;"-->
                            <!--@change="userGroupSelectionChange">-->

                            <!--<el-checkbox-group v-model="conditionOptions[3].value">-->
                            <!--<el-option v-for="item in userGroup" :value ="item.id" :key="item.id" :label="item.name">-->
                            <!--<el-checkbox :label="item.id">{{item.name}}</el-checkbox>-->
                            <!--</el-option>-->
                            <!--</el-checkbox-group>-->

                            <!--</el-select>-->

                            <el-select
                                    v-model="conditionOptions[3].value"
                                    size="mini"
                                    multiple
                                    collapse-tags
                                    style="margin-left: 5px;border: none;"
                                    popper-class="log-select"
                                    placeholder="请选择用户组">
                                <el-option v-for="item in userGroup"
                                           :value="item.id"
                                           :key="item.id"
                                           :label="item.name">
                                </el-option>
                            </el-select>
                        </el-tag>


                        <el-tag @close="handleClose(4)"
                                v-show="conditionOptions[4].checked"
                                key="4"
                                :closable="true"
                                :close-transition="false">
                            认证服务器：
                            <el-select
                                    v-model="conditionOptions[4].value"
                                    size="mini"
                                    multiple
                                    collapse-tags
                                    style="border: none;"
                                    popper-class="log-select"
                                    placeholder="请选择认证服务器">
                                <el-option v-for="item in certificateServer"
                                           :value="item.id"
                                           :key="item.id"
                                           :label="item.name">
                                </el-option>
                            </el-select>
                        </el-tag>

                        <el-tag @close="handleClose(5)"
                                v-show="conditionOptions[5].checked"
                                key="5"
                                :closable="true"
                                :close-transition="false">
                            应用连接隧道：
                            <input v-model="conditionOptions[5].value" class="tag-input" style="width: 139px;"/>
                        </el-tag>

                        <el-tag @close="handleClose(6)"
                                v-show="conditionOptions[6].checked"
                                key="6"
                                :closable="true"
                                :close-transition="false">
                            IP地址：<input v-model="conditionOptions[6].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(7)"
                                v-show="conditionOptions[7].checked"
                                key="7"
                                :closable="true"
                                :close-transition="false">
                            日志信息：<input v-model="conditionOptions[7].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(8)"
                                key="8"
                                v-show="conditionOptions[8].checked"
                                :closable="true"
                                :close-transition="false">
                            用户权限：
                            <!--<el-select size="mini"-->
                            <!--v-model="selectAuth"-->
                            <!--placeholder="请选择用户权限"-->
                            <!--popper-class="log-select"-->
                            <!--style="border: none;">-->

                            <!--<el-checkbox-group v-model="conditionOptions[8].value">-->
                            <!--<el-option v-for="item in userAuth" :key="item.id" :value ="item.id" :label="item.id">-->
                            <!--<el-checkbox  :label="item.id">{{item.name}}</el-checkbox>-->
                            <!--</el-option>-->
                            <!--</el-checkbox-group>-->
                            <!--</el-select>-->

                            <el-select
                                    v-model="conditionOptions[8].value"
                                    size="mini"
                                    multiple
                                    collapse-tags
                                    style="border: none;"
                                    popper-class="log-select"
                                    placeholder="请选择用户权限">
                                <el-option v-for="item in userAuth"
                                           :value="item.id"
                                           :key="item.id"
                                           :label="item.name">
                                </el-option>
                            </el-select>
                        </el-tag>


                        <el-tag @close="handleClose(9)"
                                v-show="conditionOptions[9].checked"
                                key="9"
                                :closable="true"
                                :close-transition="false">
                            资源名：<input v-model="conditionOptions[9].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(10)"
                                v-show="conditionOptions[10].checked"
                                key="10"
                                :closable="true"
                                :close-transition="false">
                            URL地址：<input v-model="conditionOptions[10].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(11)"
                                v-show="conditionOptions[11].checked"
                                key="11"
                                :closable="true"
                                :close-transition="false">
                            证件类型：<input v-model="conditionOptions[11].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(12)"
                                v-show="conditionOptions[12].checked"
                                key="12"
                                :closable="true"
                                :close-transition="false">
                            证件号：<input v-model="conditionOptions[12].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(13)"
                                v-show="conditionOptions[13].checked"
                                key="13"
                                :closable="true"
                                :close-transition="false">
                            申请日期：<input v-model="conditionOptions[13].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(14)"
                                v-show="conditionOptions[14].checked"
                                key="14"
                                :closable="true"
                                :close-transition="false">
                            用户全名：<input v-model="conditionOptions[14].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(15)"
                                v-show="conditionOptions[15].checked"
                                key="15"
                                :closable="true"
                                :close-transition="false">
                            审核管理员：<input v-model="conditionOptions[15].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(16)"
                                v-show="conditionOptions[16].checked"
                                key="16"
                                :closable="true"
                                :close-transition="false">
                            审核状态：<input v-model="conditionOptions[16].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(17)"
                                v-show="conditionOptions[17].checked"
                                key="17"
                                :closable="true"
                                :close-transition="false">
                            审核日期：<input v-model="conditionOptions[17].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(18)"
                                v-show="conditionOptions[18].checked"
                                key="18"
                                :closable="true"
                                :close-transition="false">
                            动作：<input v-model="conditionOptions[18].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(19)"
                                v-show="conditionOptions[19].checked"
                                key="19"
                                :closable="true"
                                :close-transition="false">
                            操作员：<input v-model="conditionOptions[19].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(20)"
                                v-show="conditionOptions[20].checked"
                                key="20"
                                :closable="true"
                                :close-transition="false">
                            操作日期：<input v-model="conditionOptions[20].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(21)"
                                v-show="conditionOptions[21].checked"
                                key="21"
                                :closable="true"
                                :close-transition="false">
                            操作类型：<input v-model="conditionOptions[21].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(22)"
                                v-show="conditionOptions[22].checked"
                                key="22"
                                :closable="true"
                                :close-transition="false">
                            操作管理员：<input v-model="conditionOptions[22].value" class="tag-input"/>
                        </el-tag>

                        <el-tag @close="handleClose(23)"
                                v-show="conditionOptions[23].checked"
                                key="23"
                                :closable="true"
                                :close-transition="false">
                            交易方式：<input v-model="conditionOptions[23].value" class="tag-input"/>
                        </el-tag>
                    </div>
                </el-col>
                <!--<el-col :span="9">-->
                    <!------------------------------------------------------------------>
                    <div class="block user-log-info "
                         style="margin-top: 5px;">
                        <div style="width: 240px;float:left;margin-left: -15px" class="key-log-select">
                            <!--<el-select v-model="optionValue"-->
                            <!--placeholder="关键字查询"-->
                            <!--style="margin-left: 0px"-->
                            <!--popper-class="log-select logval_select">-->
                            <!--<el-option-->
                            <!--v-for="item in conditionOptions"-->
                            <!--v-show="item.show"-->
                            <!--:key="item.id"-->
                            <!--:value="item.label"-->
                            <!--&gt;-->
                            <!--<el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>-->
                            <!--</el-option>-->
                            <!--</el-select>-->


                            <el-select
                                    v-model="checkedOptions"
                                    size="small"
                                    multiple
                                    collapse-tags
                                    style="margin-left:0px; height: 35px;"
                                    @change="conditionOptionsChange"
                                    placeholder="关键字查询">
                                <el-option v-for="item in conditionOptions"
                                           v-show="item.show"
                                           style="height: 35px;"
                                           :value="item.id"
                                           :key="item.id"
                                           :label="item.label">
                                </el-option>
                            </el-select>

                        </div>
                        <div style="margin-left: 30px ;float:left;">

                            <span style="margin-left: 15px">
                                <el-button size="small"
                                           style="width: 80px;height:32px; padding: 0;"
                                           type="primary"
                                           @click="search()">
                                    查询
                                </el-button>
                            </span>

                        </div>
                    </div>
                <!--</el-col>-->
            </el-row>

        </div>

    </div>
</template>


<script>
    import {selectConditionList} from "../../api/log/logApi";
    import {formatDateTime} from "../../utils/dateUtil";

    export default {
        name: 'multipleConditionChoose',
        components: {},

        props: {

            options: {//下拉条件列表
                type: Array,
            },
            conditionType: {
                type: String,
                default: 'userLog'
            }
        },
        data() {
            return {
                checkedOptions: [],

                value11: [],
                beginTime: '2016-12-03',
                endTime: '2017-07-03',
                dateRange: [],
                optionValue: '',
                selectGroup: '',
                selectServer: '',
                selectLevel: '',
                selectAuth: '',
                groupValue: [],
                levelValue: [],
                serverValue: [],
                test: 1,
                conditionOptions: [{
                    id: '0',
                    label: '日期',
                    checked: true,
                    show: false,
                    // value: ['','']
                    value: {
                        valStar:'',
                        valEnd:''
                    }
                }, {
                    id: '1',
                    label: '级别',
                    checked: false,
                    show: false,
                    value: []
                }, {
                    id: '2',
                    label: '用户名',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '3',
                    label: '用户组',
                    checked: false,
                    show: false,
                    value: []
                }, {
                    id: '4',
                    label: '认证服务器',
                    checked: false,
                    show: false,
                    value: []
                }, {
                    id: '5',
                    label: '应用连接隧道',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '6',
                    label: 'IP地址',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '7',
                    label: '日志信息',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '8',
                    label: '用户权限',
                    checked: false,
                    show: false,
                    value: []
                }, {
                    id: '9',
                    label: '资源名',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '10',
                    label: 'URL地址',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '11',
                    label: '证件类型',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '12',
                    label: '证件号',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '13',
                    label: '申请日期',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '14',
                    label: '用户全名',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '15',
                    label: '审核管理员',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '16',
                    label: '审核状态',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '17',
                    label: '审核日期',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '18',
                    label: '动作',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '19',
                    label: '操作员',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '20',
                    label: '操作日期',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '21',
                    label: '操作类型',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '22',
                    label: '操作管理员',
                    checked: false,
                    show: false,
                    value: ''
                }, {
                    id: '23',
                    label: '交易方式',
                    checked: false,
                    show: false,
                    value: ''
                }],


                authServer: [
                    {
                        serverId: 1,
                        serverName: '认证服务器1'
                    }, {
                        serverId: 2,
                        serverName: '认证服务器2'
                    }
                ],

                //用户组
                group: [{
                    groupId: 1,
                    groupName: '测试用户组1'
                }, {
                    groupId: 2,
                    groupName: '测试用户组2'
                }],

                //用户权限
                userAuth: [{
                    authId: 1,
                    authName: '普通用户'
                }, {
                    authId: 2,
                    authName: '管理员权限'
                }],

                checked: true,
                checkedId: [],


                logLevel: [{
                    id: 'INFO',
                    name: '提示'
                }, {
                    id: 'WARNING',
                    name: '警告'
                }, {
                    id: 'ERROR',
                    name: '错误'
                }],
                userName: [],
                userGroup: [],
                certificateServer: [],
                userAuth: [],

                logTypes: {
                    systemLog: [],//系统日志就只有一条级别已经被写死
                    userLog: [{
                        name: 'userGroup',
                        key: 'userGroup.keyword'
                    }, {
                        name: 'certificateServer',
                        key: 'certificateServer.keyword'
                    }],
                    adminLog: [{
                        name: 'userAuth',
                        key: 'userAuth.keyword'
                    }],
                    loginLog: [{
                        name: 'userGroup',
                        key: 'userGroup.keyword'
                    }],
                    checkLog: [{
                        name: 'userGroup',
                        key: 'userGroup.keyword'
                    }],
                    userCheck: [{
                        name: 'userGroup',
                        key: 'userGroup.keyword'
                    }],
                    sonsumeDetail: [{
                        name: 'userGroup',
                        key: 'userGroup.keyword'
                    }],
                    packageDetail: [{
                        name: 'userGroup',
                        key: 'userGroup.keyword'
                    }],
                    resourceStatisticLog: [],
                    appFlowStatisticLog: [],
                    userFlowStatisticLog: []
                },
                determineType: {
                    adminLog: [0, 1, 2, 8, 6, 7],
                    systemLog: [0, 1, 7],
                    userLog: [0, 2, 3, 6],
//                    userLog:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                    loginLog: [0, 2, 3],
                    resourceStatisticLog: [0, 9, 10],
                    appFlowStatisticLog: [0, 9, 10],       //此处虽然是一样的，还是写为两个，防止以后需要再各自的地方添加扩展
                    userFlowStatisticLog: [0, 2, 3],
                    checkLog: [2, 14, 3, 11, 12, 15, 16, 17],
                    userCheck: [2, 3, 11, 12, 13],
                    consumeDetail: [2, 14, 3, 21, 22, 20, 23],
                    packageDetail: [2, 14, 3, 18, 19, 20]
                }

            }
        },
        computed: {
            todo(){
                // return this.conditionOptions[0].value[0].getTime()>this.conditionOptions[0].value[1].getTime()
            }
        },
        created() {
            let date = new Date();
            date.setDate(date.getDate() - 90);
            // this.conditionOptions[0].value.push(date);
            // this.conditionOptions[0].value.push(new Date());
            this.conditionOptions[0].value.valStar=date;
            this.conditionOptions[0].value.valEnd=new Date();
            // console.log(date,'==',date.setDate(date.getDate() - 90),'date==',date.getTime(),(new Date()).getTime(),(new Date()).getDate(),this.conditionOptions[0].value);
            this.determineCondition();
            this.setSelectCondition();
        },
        watch: {//深度 watcher
        },
        methods: {
            changeStartTime(e){
                // this.conditionOptions[0].value[1] = '';
                console.log('endtime_start:',e,'==',this.conditionOptions[0].value.valStar,e>this.conditionOptions[0].value.valEnd)
                if (e > this.conditionOptions[0].value.valEnd && this.conditionOptions[0].value.valEnd != ''){
                    this.conditionOptions[0].value.valStar = '';
                    // console.log(this.conditionOptions[0].value[1])
                    // alert(this.conditionOptions[0].value[0])
                } else {
                    // alert("gg")
                    this.conditionOptions[0].value.valStar = e
                }
            },
            changeEndTime(e){
                console.log('endtime:',e)
                if (e < this.conditionOptions[0].value.valStar){
                    this.conditionOptions[0].value.valEnd = '';
                } else {
                    this.conditionOptions[0].value.valEnd = e
                }
            },
            // changDate(val){
            //    console.log('val',val)
            // },
            // changes(val){
            //     console.log('val_blur',val)
            // },
            /*******************
             * 当勾选条件发生改变时，
             * 重新显示已经勾选的查询条件的输入框和选择框
             * **************/
            conditionOptionsChange(value) {
                console.log(value, 'choose_val')
                if (value.length > 0) {
                    for (let i = 0; i < value.length; i++) {
                        if (value[i] == 6) {
                            this.$parent.ipSearch(true);
                            // console.log()
                            break;
                        } else {
                            this.$parent.ipSearch(false);
                        }
                    }
                } else {
                    this.$parent.ipSearch(false);
                }
                this.$nextTick(function () {
                    for (let item of this.conditionOptions) {
                        item.checked = false;
                    }
                    for (let item of this.conditionOptions) {
                        for (let i = 0; i < value.length; i++) {
                            if (item.id == value[i]) {
                                item.checked = true;
                                break;
                            }
                        }
                    }
                })
            },

            /*******************
             * 决定可以被选择的条件，在页面初始化的时候执行
             * **************/
            determineCondition() {
                for (let index of this.determineType[this.conditionType]) {
                    this.conditionOptions[index].show = true;
//                    console.log(index,'index')
                }
            },

            findIndex(list, value) {
                let index = -1;
                if (list != null) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i] == value) {
                            index = i;
                            break;
                        }
                    }
                }
                return index;
            },

            userGroupSelectionChange(value) {
                console.log(" this.selectGroup: " + this.selectGroup);
                console.log("change value:" + value);
                let index = this.findIndex(this.conditionOptions[3].value, value);
                if (index == -1) {
                    //this.conditionOptions[3].value.splice(index,-1);
                    this.conditionOptions[3].value.push(value);
                }
                else {
//                  this.conditionOptions[3].value.push(value);
                    this.conditionOptions[3].value.splice(index, -1);
                }

//              if(this.conditionOptions[3].value.length==0){
//                  this.selectGroup=''
//              }else{
//                  this.selectGroup=this.conditionOptions[3].value[this.conditionOptions[3].value.length];
//              }
            },

            /******
             *
             * 获取下拉框的条件，按照不同的日志类型获取下拉框的筛选列表
             * ****/
            setSelectCondition() {
                let selectType = this.logTypes[this.conditionType];
                for (let item of selectType) {
                    selectConditionList(this.conditionType, item.key).then(resp => {
                        let data = resp.data;
                        console.log(resp, 'data+++++++')
                        for (let value of data) {
                            this[item.name].push({
                                id: value,
                                name: value
                            });
                        }
                    }).catch(err => {
                        console.log("获取数据出错：", err);
                    })
                }

            },

            isConditionActive(index) {
                if (this.conditionOptions[index].show
                    && this.conditionOptions[index].checked
                    && this.conditionOptions[index].value != null
                    && this.conditionOptions[index].value != '') {
                    return true;
                }
                return false;
            },
            search() {
                console.log("获取的日期：",this.conditionOptions[0].value,this.conditionOptions[0].value.valStar&&this.conditionOptions[0].value.valEnd
                );
                let precise = {};
                let rangeList = [];
                if (this.isConditionActive(0)) {
                    // this.conditionOptions[0].value != '' && this.conditionOptions[0].value != null&&
                    if (this.conditionOptions[0].value.valStar&&this.conditionOptions[0].value.valEnd) {
                        let dateRange = this.conditionOptions[0].value;
                        console.log('dateRange==',dateRange,this.todo)
                        // let d1 = formatDateTime(dateRange[0]);
                        // let d2 = formatDateTime(dateRange[1]);
                        let d1 = formatDateTime(dateRange.valStar);
                        let d2 = formatDateTime(dateRange.valEnd);
//                        console.log("转化后的日期：",d1,d2,);
                        rangeList.push({
                            "type": "DATE",
                            "conditionName": "date",            // 查询字段先改为date字段查询
                            "gteValue": d1,
                            "lteValue": d2
                        });
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '请选择起始和结束日期！'
                        });
                    }
                }

                if (this.isConditionActive(1)) {//级别skt
                    precise['logLevel.keyword'] = this.conditionOptions[1].value;
                    //console.log(this.conditionOptions[1].value,'级别',precise['logLevel.keyword'],precise)
                }
                if (this.isConditionActive(3)) {//用户组
                    precise['userGroup.keyword'] = this.conditionOptions[3].value;
                }

                if (this.isConditionActive(4)) {//认证服务器
                    precise['certificateServer.keyword'] = this.conditionOptions[4].value;
                }

                if (this.isConditionActive(8)) {//用户权限
                    precise['userAuth.keyword'] = this.conditionOptions[8].value;
                }

                /******************上面部分为精确条件*****************/

                let ambiguous = {};
                if (this.isConditionActive(2)) {//用户名
                    ambiguous['userName'] = this.conditionOptions[2].value;
                }

                if (this.isConditionActive(5)) {//应用连接隧道
                    ambiguous['linkInterface'] = this.conditionOptions[5].value;
                }

                if (this.isConditionActive(6)) {//ip地址
                    ambiguous['ipAddress'] = this.conditionOptions[6].value;
                }

                if (this.isConditionActive(7)) {//日志信息
                    ambiguous['message'] = this.conditionOptions[7].value;
                }

                if (this.isConditionActive(9)) {//资源名
                    ambiguous['resourceName'] = this.conditionOptions[9].value;
                }

                if (this.isConditionActive(10)) {//URL
                    ambiguous['uri'] = this.conditionOptions[10].value;
                }

                let condition = {
                    "preciseConditions": precise,
                    "ambiguousConditions": ambiguous,
                    "rangeConditionList": rangeList,
                    "sortConditions": {},
                    "currentPage": 1,
                    "pageSize": 40
                }

//                console.log("将要传递给父组件的参数：",condition);

                this.$parent.search(condition);

            },

            handleClose(tagIndex) {
                //console.log("要关闭的tag:",tagIndex);
                this.conditionOptions[tagIndex].checked = false;
                if (tagIndex == 6) {
                    this.$parent.ipSearch(false);
                }
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = true;
                this.inputValue = '';
            }
        }
    }

</script>


<style scoped>


    .log-tag {
        float: left;
        width: 80px;
        /*background-color: yellow;*/
    }

    .log-download-checkbox {
        float: left;
        min-width: 600px;
        background-color: #b1b1b1;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .tag-input {
        color: black;
        background-color: #fff;
        border: none;
        zoom: 1;
        outline: medium;
        /*//以上三条样式去边框，使得输入框与父元素看起来融为一体*/
    }

    .multiple-condition {
        margin-left: 15px;
    }

    .multiple-condition .el-tag {
        height: 32px;
        margin-top: 5px;
        line-height: 30px;
        margin-left: 6px;
        color: #3C8DBC;
        background-color: #fff;
        border: 1px solid #3C8DBC;
    }

    .multiple-condition .el-tag * {
        color: #3C8DBC;
    }


</style>

<style>
    .el-tag .el-input--small > .el-input__inner {
        border: none !important;
    }

    .multiple-condition > .el-tag > .el-select > .el-input > .el-input__inner {
        border: none;
        zoom: 1;
        outline: medium;
        min-width: 100px;
    }

    /*.el-select-dropdown__item.selected {*/
    /*background-color: #ffffff;*/
    /*}*/
    .user-log-info .el-input {
        position: relative;
        display: inline-block;
        width: 220px !important;
        margin-left: 96px;
    }

    .logval_select .el-select-dropdown__item.selected.hover {
        background: #e4e8f1;
    }

    .logval_select .el-select-dropdown__item.selected {
        background-color: #fff;
    }

    .key-log-select .el-select__tags {
        margin-left: 42px !important;
    }

    .user-log-info .el-select__tags-text {
        color: #3C8DBC;
    }

    .multiple-condition .el-select__tags-text {
        color: #3C8DBC;
    }

</style>

