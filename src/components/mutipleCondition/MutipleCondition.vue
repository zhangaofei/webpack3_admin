<template>
    <div>
        <div style="width: 100%;margin-top: 10px">

            <div class="multiple-condition">

                <!--<el-tag @close="handleClose(0)"-->
                <!--key="inp"-->
                <!--v-show="conditionOptions[0].checked"-->
                <!--:closable="true"-->
                <!--:close-transition="false" >-->
                <!--日期：-->
                <el-date-picker
                        v-model="conditionOptions[0].value"
                        type="daterange"
                        size="small"
                        range-separator="  至  "
                        format="yyyy-MM-dd"
                        style="margin-left: 6px;height: 35px;border: none;vertical-align: middle"
                        placeholder="选择日期范围">
                </el-date-picker>
                <!--</el-tag>-->

                <el-tag @close="handleClose(1)"
                        key="inp"
                        v-show="conditionOptions[1].checked"
                        :closable="true"
                        placeholder="请选择级别"
                        :close-transition="false">
                    级别：
                    <el-select size="mini"
                               v-model="selectLevel"
                               popper-class="log-select">

                        <el-checkbox-group v-model="conditionOptions[1].value">
                            <el-option value ="INFO" label="提示">
                                <el-checkbox  label="INFO">提示</el-checkbox>
                            </el-option>
                            <el-option value ="WARNING" label="警告">
                                <el-checkbox label="WARNING">警告</el-checkbox>
                            </el-option>

                            <el-option value="ERROR" label="错误">
                                <el-checkbox label="ERROR">错误</el-checkbox>
                            </el-option>
                        </el-checkbox-group>
                        <!--<el-radio-group v-model="conditionOptions[1].value">-->
                        <!--<el-option value ="INFO" label="提示">-->
                        <!--<el-radio label="INFO">提示</el-radio>-->
                        <!--</el-option>-->
                        <!--<el-option value ="WARNING" label="警告">-->
                        <!--<el-radio label="WARNING">警告</el-radio>-->
                        <!--</el-option>-->

                        <!--<el-option value="ERROR" label="错误">-->
                        <!--<el-radio label="ERROR">错误</el-radio>-->
                        <!--</el-option>-->
                        <!--</el-radio-group>-->

                    </el-select>
                </el-tag>

                <el-tag @close="handleClose(2)"
                        v-show="conditionOptions[2].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    用户名：<input v-model="conditionOptions[2].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(3)"
                        key="inp"
                        v-show="conditionOptions[3].checked"
                        :closable="true"
                        :close-transition="false">
                    用户组：
                    <el-select size="mini"
                               v-model="selectGroup"
                               placeholder="请选择用户组"
                               popper-class="log-select"
                               style="border: none;">

                        <el-checkbox-group v-model="conditionOptions[3].value">
                            <el-option v-for="item in userGroup" :value ="item.id" :key="item.id" :label="item.name">
                                <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                            </el-option>
                        </el-checkbox-group>
                    </el-select>
                </el-tag>



                <el-tag @close="handleClose(4)"
                        v-show="conditionOptions[4].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    认证服务器：
                    <el-select v-model="selectServer"
                               size="mini"
                               placeholder="请选择认证服务器"
                               popper-class="log-select"
                               style="border: none;">

                        <el-checkbox-group v-model="conditionOptions[4].value">
                            <el-option v-for="item in certificateServer" :key= "item.id" :value ="item.id" :label="item.name">
                                <el-checkbox  :label="item.id">{{item.name}}</el-checkbox>
                            </el-option>
                        </el-checkbox-group>
                    </el-select>
                </el-tag>

                <el-tag @close="handleClose(5)"
                        v-show="conditionOptions[5].checked"
                        key="6"
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
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    日志信息：<input v-model="conditionOptions[7].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(8)"
                        key="inp"
                        v-show="conditionOptions[8].checked"
                        :closable="true"
                        :close-transition="false">
                    用户权限：
                    <el-select size="mini"
                               v-model="selectAuth"
                               placeholder="请选择用户权限"
                               popper-class="log-select"
                               style="border: none;">

                        <el-checkbox-group v-model="conditionOptions[8].value">
                            <el-option v-for="item in userAuth" :key="item.id" :value ="item.id" :label="item.id">
                                <el-checkbox  :label="item.id">{{item.name}}</el-checkbox>
                            </el-option>
                        </el-checkbox-group>
                    </el-select>
                </el-tag>


                <el-tag @close="handleClose(9)"
                        v-show="conditionOptions[9].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    资源名：<input v-model="conditionOptions[9].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(10)"
                        v-show="conditionOptions[10].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    URL地址：<input v-model="conditionOptions[10].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(11)"
                        v-show="conditionOptions[11].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    证件类型：<input v-model="conditionOptions[11].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(12)"
                        v-show="conditionOptions[12].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    证件号：<input v-model="conditionOptions[12].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(13)"
                        v-show="conditionOptions[13].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    申请日期：<input v-model="conditionOptions[13].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(14)"
                        v-show="conditionOptions[14].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    用户全名：<input v-model="conditionOptions[14].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(15)"
                        v-show="conditionOptions[15].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    审核管理员：<input v-model="conditionOptions[15].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(16)"
                        v-show="conditionOptions[16].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    审核状态：<input v-model="conditionOptions[16].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(17)"
                        v-show="conditionOptions[17].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    审核日期：<input v-model="conditionOptions[17].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(18)"
                        v-show="conditionOptions[18].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    操作日期：<input v-model="conditionOptions[18].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(19)"
                        v-show="conditionOptions[19].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    套餐报表：<input v-model="conditionOptions[19].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(20)"
                        v-show="conditionOptions[20].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    操作管理员：<input v-model="conditionOptions[20].value" class="tag-input"/>
                </el-tag>

                <el-tag @close="handleClose(21)"
                        v-show="conditionOptions[21].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    交易方式：<input v-model="conditionOptions[21].value" class="tag-input"/>
                </el-tag>
            </div>


            <!------------------------------------------------------------------>
            <div class="block user-log-info"
                 style="float:left;margin-left: -5px;width: 100%;margin-top: 5px">
                <div style="width: 240px;float:left;margin-left: -15px">
                    <el-select v-model="optionValue"
                               placeholder="关键字查询"
                               style="margin-left: 0px"
                               popper-class="log-select">
                        <el-option
                                v-for="item in conditionOptions"
                                v-show="item.show"
                                :key="item.id"
                                :value="item.value"
                        >
                            <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left: 30px ;float:left;width: 500px">

                    <span style="margin-left: 15px">
                        <el-button size="small"
                                               style="width: 80px;height:35px;"
                                               type="primary"
                                               @click="search()">
                            查询
                        </el-button>
                        <el-button size="small"
                                   style="width: 150px;height:35px;"
                                   type="primary"
                                   @click="search()">
                            查询并导出报表
                        </el-button>
                        <el-button size="small"
                                   style="width: 150px;height:35px;"
                                   type="primary"
                                   @click="search()">
                            导出所有报表
                        </el-button>
                    </span>

                </div>
            </div>

        </div>

    </div>
</template>


<script>
    import {selectConditionList} from "../../api/log/logApi";
    import {formatDateTime} from "../../utils/dateUtil";
    export default{
        name:'multipleConditionChoose',
        components: {

        },

        props: {

            options:{//下拉条件列表
                type:Array,
            },
            conditionType:{
                type:String,
                default:'userLog'
            }
        },
        data(){
            return {

                beginTime:'2016-12-03',
                endTime:'2017-07-03',

                dateRange:[],
                optionValue:'',

                selectGroup:'',
                selectServer:'',
                selectLevel:'',
                selectAuth:'',

                groupValue:[],
                levelValue:[],
                serverValue:[],

                test:1,


                conditionOptions:[{
                    id: '0',
                    label: '日期',
                    checked:true,
                    show:false,
                    value:[]
                }, {
                    id: '1',
                    label: '级别',
                    checked:false,
                    show:false,
                    value:[]
                }, {
                    id: '2',
                    label: '用户名',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '3',
                    label: '用户组',
                    checked:false,
                    show:false,
                    value:[]
                },{
                    id: '4',
                    label: '认证服务器',
                    checked:false,
                    show:false,
                    value:[]
                },{
                    id: '5',
                    label: '应用连接隧道',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '6',
                    label: 'IP地址',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '7',
                    label: '日志信息',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '8',
                    label: '用户权限',
                    checked:false,
                    show:false,
                    value:[]
                }, {
                    id: '9',
                    label: '资源名',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '10',
                    label: 'URL地址',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '11',
                    label: '证件类型',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '12',
                    label: '证件号',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '13',
                    label: '申请日期',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '14',
                    label: '用户全名',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '15',
                    label: '审核管理员',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '16',
                    label: '审核状态',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '17',
                    label: '审核日期',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '18',
                    label: '操作日期',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '19',
                    label: '套餐名称',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '20',
                    label: '操作管理员',
                    checked:false,
                    show:false,
                    value:''
                },{
                    id: '21',
                    label: '交易方式',
                    checked:false,
                    show:false,
                    value:''
                }],


                authServer:[
                    {
                        serverId:1,
                        serverName:'认证服务器1'
                    },{
                        serverId:2,
                        serverName:'认证服务器2'
                    }
                ],

                //用户组
                group:[{
                    groupId:1,
                    groupName:'测试用户组1'
                },{
                    groupId:2,
                    groupName:'测试用户组2'
                }],

                //用户权限
                userAuth:[{
                    authId:1,
                    authName:'普通用户'
                },{
                    authId:2,
                    authName:'管理员权限'
                }],

                checked:true,
                checkedId: [],


                logLevel:[{
                    id:'INFO',
                    name:'提示'
                },{
                    id:'WARNING',
                    name:'警告'
                },{
                    id:'ERROR',
                    name:'错误'
                }],
                userName:[],
                userGroup:[],
                certificateServer:[],
                userAuth:[],

                logTypes:{
                    systemLog:[],//系统日志就只有一条级别已经被写死
                    userLog:[{
                        name:'userGroup',
                        key:'userGroup.keyword'
                    },{
                        name:'certificateServer',
                        key:'certificateServer.keyword'
                    }],
                    adminLog:[{
                        name:'userAuth',
                        key:'userAuth.keyword'
                    }],
                    loginLog:[{
                        name:'userGroup',
                        key:'userGroup.keyword'
                    }],
                    checkLog:[{
                        name:'userGroup',
                        key:'userGroup.keyword'
                    }],
                    userCheck:[{
                        name:'userGroup',
                        key:'userGroup.keyword'
                    }],
                    resourceStatisticLog:[],
                    appFlowStatisticLog:[],
                    userFlowStatisticLog:[]
                },
                determineType:{
                    adminLog:[0,1,2,8,6,7],
                    systemLog:[0,1,7],
                    userLog:[0,1,2,3,4,5,6,7],
                    loginLog:[0,2,3],
                    resourceStatisticLog:[0,9,10],
                    appFlowStatisticLog:[0,9,10],       //此处虽然是一样的，还是写为两个，防止以后需要再各自的地方添加扩展
                    userFlowStatisticLog:[0,2,3],
                    checkLog:[2,14,3,11,12,15,16,17],
                    userCheck:[2,3,11,12,13],
                    allReport:[18],
                    packageReport:[18,19],
                    consumeAll:[18],
                    consumeAdmin:[20,18],
                    consumeType:[18,21]
                }

            }
        },
        computed:{

        },
        created(){
            let date=new Date();
            date.setDate(date.getDate()-90);
            this.conditionOptions[0].value.push(date);
            this.conditionOptions[0].value.push(new Date());

            this.determineCondition();
            this.setSelectCondition();
        },
        watch: {//深度 watcher
        },
        methods: {
            /*******************
             * 决定可以被选择的条件，在页面初始化的时候执行
             * **************/
            determineCondition(){
                for(let index of this.determineType[this.conditionType]){
                    this.conditionOptions[index].show=true;
                    console.log(index,'index')
                }
            },

            /******
             * 获取下拉框的条件，按照不同的日志类型获取下拉框的筛选列表
             * ****/
            setSelectCondition(){
                let selectType=this.logTypes[this.conditionType];
                for(let item of selectType){
                    selectConditionList(this.conditionType,item.key).then(resp=>{
                        let data=resp.data;
                        console.log(resp,'data+++++++')
                        for(let value of data){
                            this[item.name].push({
                                id:value,
                                name:value
                            });
                        }
                    }).catch(err=>{
                        console.log("获取数据出错：",err);
                    })
                }

            },

            isConditionActive(index){
                if(this.conditionOptions[index].show
                    && this.conditionOptions[index].checked
                    &&this.conditionOptions[index].value!=null
                    &&this.conditionOptions[index].value!=''){
                    return true;
                }
                return false;
            },

            search(){

                console.log("获取的日期：",this.conditionOptions[0].value);


                let precise={};
                let rangeList=[];
                if(this.isConditionActive(0)){
                    if(this.conditionOptions[0].value!=''&&this.conditionOptions[0].value!=null){
                        let dateRange=this.conditionOptions[0].value;
                        let d1=formatDateTime(dateRange[0]);
                        let d2=formatDateTime(dateRange[1]);

                        console.log("转化后的日期：",d1,d2,);

                        rangeList.push({
                            "type": "DATE",
                            "conditionName": "date",            //查询字段先改为date字段查询
                            "gteValue": d1,
                            "lteValue": d2
                        });
                    }

                }

                if(this.isConditionActive(1)){//级别skt
                    precise['logLevel.keyword']=this.conditionOptions[1].value;
                    console.log(this.conditionOptions[1].value,'级别',precise['logLevel.keyword'],precise)
                }
                if(this.isConditionActive(3)){//用户组
                    precise['userGroup.keyword']=this.conditionOptions[3].value;
                }

                if(this.isConditionActive(4)){//认证服务器
                    precise['certificateServer.keyword']=this.conditionOptions[4].value;
                }

                if(this.isConditionActive(8)){//用户权限
                    precise['userAuth.keyword']=this.conditionOptions[8].value;
                }

                /******************上面部分为精确条件*****************/

                let ambiguous={};
                if(this.isConditionActive(2)){//用户名
                    ambiguous['userName']=this.conditionOptions[2].value;
                }

                if(this.isConditionActive(5)){//应用连接隧道
                    ambiguous['linkInterface']=this.conditionOptions[5].value;
                }

                if(this.isConditionActive(6)){//ip地址
                    ambiguous['ipAddress']=this.conditionOptions[6].value;
                }

                if(this.isConditionActive(7)){//日志信息
                    ambiguous['message']=this.conditionOptions[7].value;
                }

                if(this.isConditionActive(9)){//资源名
                    ambiguous['resourceName']=this.conditionOptions[9].value;
                }

                if(this.isConditionActive(10)){//URL
                    ambiguous['uri']=this.conditionOptions[10].value;
                }

                let condition={
                    "preciseConditions": precise,
                    "ambiguousConditions": ambiguous,
                    "rangeConditionList": rangeList,
                    "sortConditions": {},
                    "currentPage": 1,
                    "pageSize": 40
                }

                console.log("将要传递给父组件的参数：",condition);

                this.$parent.search(condition);
            },

            handleClose(tagIndex) {
                console.log("要关闭的tag:",tagIndex);
                this.conditionOptions[tagIndex].checked=false;
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

    .log-tag{
        float: left;
        width: 80px;
        /*background-color: yellow;*/
    }
    .log-download-checkbox{
        float: left;
        min-width: 600px;
        background-color: #b1b1b1;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .tag-input{
        color:black;
        background-color: #fff;
        border: none;
        zoom:1;
        outline: medium;
        /*//以上三条样式去边框，使得输入框与父元素看起来融为一体*/
    }

    .multiple-condition{
        margin-left: 15px;
    }

    .multiple-condition .el-tag{
        height: 32px;
        margin-top: 5px;
        line-height: 30px;
        margin-left: 6px;
        color: #3C8DBC;
        background-color: #fff;
        border: 1px solid #3C8DBC ;
    }

    .multiple-condition .el-tag *{
        color: #3C8DBC;
    }



</style>

<style>
    .el-tag .el-input--small > .el-input__inner {
        border: none!important;
    }
    .multiple-condition>.el-tag >.el-select >.el-input>.el-input__inner{
        border: none;
        zoom:1;
        outline: medium;
        min-width: 100px;
    }
    .el-select-dropdown__item.selected {
        background-color: #ffffff;
    }
    .user-log-info .el-input {
        position: relative;
        display: inline-block;
        width: 220px!important;
        margin-left: 96px;
    }
    /*.user-log-info .el-select {*/
    /*min-width: 220px!important;*/
    /*width: 220px!important;*/
    /*}*/
</style>

