<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a >日志管理</a></li>
                <li class="active">日志设置</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">

            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="padding-left: 0px">
                        <div class="box-header">
                            <h3 class="box-title"
                                style="float:left;font-size:18px;color: #4A4D4F;">
                                日志设置
                            </h3>
                        </div>
                        <!--<div class="box-header">-->
                        <!--&lt;!&ndash;<div class='title' style="">日志设置规则</div>&ndash;&gt;-->
                        <!--</div>-->
                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                                         label-width="150px" class="demo-ruleForm mail_form" style="margin-left:65px;">
                                    <div v-if="isEdit">
                                        <!--<el-form-item label="日志情况" prop="" style="" class="box_sub">-->
                                            <!--<el-checkbox v-model="ruleForm.logEnable" :disabled="true"-->
                                                         <!--@change="chang(ruleForm.logEnable)"><span-->
                                                    <!--v-if="!ruleForm.logEnable">关闭日志</span>-->
                                                <!--<span v-else>开启日志</span></el-checkbox>-->
                                        <!--</el-form-item>-->
                                        <el-form-item label="日志类别" prop="" style="" class="box_sub" style="margin: 10px 0 6px;">
                                            <el-checkbox v-model="ruleForm.logType.userLog" :disabled="true">用户日志
                                            </el-checkbox>
                                            <el-checkbox v-model="ruleForm.logType.resLog" :disabled="true">资源日志
                                            </el-checkbox>
                                            <el-checkbox v-model="ruleForm.logType.adminLog" :disabled="true">管理员日志
                                            </el-checkbox>
                                            <el-checkbox v-model="ruleForm.logType.systemLog" :disabled="true">系统日志
                                            </el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="日志级别" prop="" style="" class="box_sub" style="margin-bottom: 20px;">
                                            <el-checkbox v-model="ruleForm.logLevel.info" :disabled="true">info
                                            </el-checkbox>
                                            <el-checkbox v-model="ruleForm.logLevel.warning" :disabled="true">warning
                                            </el-checkbox>
                                            <el-checkbox v-model="ruleForm.logLevel.error" :disabled="true">error
                                            </el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="日志储存服务器" prop="logServerType">
                                            <el-select v-model="ruleForm.logServerType" placeholder="" class="el_put"
                                                       :disabled="true">
                                                <el-option
                                                        v-for="item in list"
                                                        :key="item"
                                                        :label="item"
                                                        :value="item">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="日志储存起始时间" prop="logSaveStartTime" class="form_item">
                                            <el-date-picker
                                                    :disabled="true"
                                                    style="width: 264px;"
                                                    class="el_put"
                                                    v-model="ruleForm.logSaveStartTime"
                                                    type="date"
                                                    format="yyyy-MM-dd"
                                                    @change="startTime(ruleForm.logSaveStartTime)"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="日志储存周期" prop="logSaveRate" class="form_item">
                                            <el-input v-model="ruleForm.logSaveRate" class="el_put"
                                                      :disabled="true"></el-input>
                                            <span style="margin-left: 10px;">天</span>
                                        </el-form-item>
                                        <el-form-item label="" prop="" class="form_item" style="padding: 10px 0;">
                                            <el-button type="primary edit" @click="available()" class="primary confirm">编辑
                                            </el-button>
                                        </el-form-item>
                                    </div>
                                    <div v-if="!isEdit">
                                        <!--<el-form-item label="日志情况" prop="" style="" class="box_sub">-->
                                            <!--<el-checkbox v-model="ruleForm.logEnable"-->
                                                         <!--@change="chang(ruleForm.logEnable)"><span-->
                                                    <!--v-if="!ruleForm.logEnable">关闭日志</span><span v-else>开启日志</span>-->
                                            <!--</el-checkbox>-->
                                        <!--</el-form-item>-->
                                        <el-form-item label="日志类别" prop="" style="" class="box_sub" style="margin: 10px 0 6px;">
                                            <el-checkbox v-model="ruleForm.logType.userLog">用户日志</el-checkbox>
                                            <el-checkbox v-model="ruleForm.logType.resLog">资源日志</el-checkbox>
                                            <el-checkbox v-model="ruleForm.logType.adminLog">管理员日志</el-checkbox>
                                            <el-checkbox v-model="ruleForm.logType.systemLog">系统日志</el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="日志级别" prop="" style="" class="box_sub" style="margin-bottom: 20px;">
                                            <el-checkbox v-model="ruleForm.logLevel.info">info</el-checkbox>
                                            <el-checkbox v-model="ruleForm.logLevel.warning">warning</el-checkbox>
                                            <el-checkbox v-model="ruleForm.logLevel.error">error</el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="日志储存服务器" prop="logServerType">
                                            <el-select v-model="ruleForm.logServerType" placeholder="" class="el_put">
                                                <el-option
                                                        v-for="item in list"
                                                        :key="item"
                                                        :label="item"
                                                        :value="item">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="日志储存起始时间" prop="logSaveStartTime" class="form_item">
                                            <el-date-picker
                                                    style="width: 264px;"
                                                    class="el_put"
                                                    v-model="ruleForm.logServerType != '写入本地数据库' ? '' : ruleForm.logSaveStartTime"
                                                    type="date"
                                                    format="yyyy-MM-dd"
                                                    @change="startTime()"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="日志储存周期" prop="logSaveRate" class="form_item">
                                            <el-input
                                                    v-model="ruleForm.logServerType != '写入本地数据库' ? '' : ruleForm.logSaveRate"
                                                    placeholder="输入日志储存周期" class="el_put"></el-input>
                                            <span style="margin-left: 10px;">天</span>
                                        </el-form-item>
                                        <el-form-item label="" prop="" class="form_item" style="padding: 10px 0;">
                                            <el-button @click="resetForm('ruleForm')" class="plain cancle">取
                                                消
                                            </el-button>
                                            <el-button type="primary" @click="submitForm('ruleForm')" class="primary confirm" style="margin-left: 30px;">确
                                                定
                                            </el-button>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {fetch} from 'utils/fetch';
    import {isReadonly} from "../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../store/index";
    import {mapGetters} from 'vuex';
    import {codeMessage} from "../../../utils/codes";
    import {deepCopy} from "../../../utils/ObjectCopy";
    import {notifyFault} from "../../../utils/notify";
    import lineChart from 'components/Charts/lineChart';
    import pieChart from 'components/Charts/pieChart';
    import {formatDateTime, totalDays, forTime} from "../../../utils/dateUtil";
    import {getLogList, saveLogList, getLogServerList} from "../../../api/log/logApi";
    import moment from 'moment'

    export default {
        components: {},
        data() {
            var cycle = (rule, value, callback) => {
                if (/^([1-9]\d*|[1]{1,1})$/.test(value) == false) {
                    callback(new Error("请输入正整数"));
                } else {
                    callback();
                }
            };
            return {
                readOnly: false,
                pageId: 36,
                rules: {
                    logSaveRate: [
                        {validator: cycle, trigger: 'blur'}
                    ]
                },
                isEdit: true,
                ruleForm: {
                    logEnable: false,
                    logSaveRate: null,
                    logSaveStartTime: null,
                    logServerType: null,
                    logLevel: {
                        error: null,
                        info: null,
                        warning: null,
                    },
                    logType: {
                        adminLog: null,
                        resLog: null,
                        systemLog: null,
                        userLog: null,
                    },
                },
                list: null
            }
        },
        computed: {},
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            available() {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isEdit = !this.isEdit
                }
            },
            startTime(val) {
                // console.log(val,'val_val')
            },
            chang (val) {
                // console.log(this.ruleForm.logEnable, 'box==');
                // console.log(val, 'box', this.ruleForm.logEnable)
            },
            resetForm(formName) {
                this.isEdit = !this.isEdit;
                this.getList();
                this.$refs[formName].resetFields();
            },
            getList() {
                getLogList().then((resp) => {
                    this.ruleForm = resp.data;
                    this.ruleForm.logEnable = this.ruleForm.logEnable == 'true' ? true : false;
                }).catch(err => {

                });
                getLogServerList().then((resp) => {
                    this.list = resp.data
                }).catch(err => {
                });
            },
            submitForm(formName) {
                let logLevels = [];
                let logTypes = [];
                for (let levels in this.ruleForm.logLevel) {
                    if(this.ruleForm.logLevel[levels]){
                        let lev = levels.toUpperCase();
                        logLevels.push(lev);
                    }
                };
                for (let types in this.ruleForm.logType) {
                    if(this.ruleForm.logType[types]){
                        // 将types转成大写，去掉LOG后缀，得到想要的字符串
                        let typ = types.toUpperCase().replace(/(LOG)$/gi, '');
                        logTypes.push(typ);
                    }
                };
                let addJson = {
                    "use_third_db": this.ruleForm.logServerType == '写入本地数据库' ? false : true,
                    "start_save_date": moment(this.ruleForm.logSaveStartTime).format("YYYY-MM-DD"),
                    "day_rate": this.ruleForm.logSaveRate,
                    "log_levels": logLevels,
                    "log_types": logTypes
                };
                this.logSettingAdd(addJson);

                this.ruleForm.logEnable = this.ruleForm.logEnable.toString();
                this.ruleForm.logSaveStartTime = moment(this.ruleForm.logSaveStartTime).format("YYYY-MM-DD HH:mm:ss");

                let hi = false;
                if (hi) {
                    this.$message({
                        type: 'warning',
                        message: '管理端端口和客户端端口不能相同！'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            saveLogList(this.ruleForm).then((resp) => {
                                if (resp.status = 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功!'
                                    });
                                    this.isEdit = !this.isEdit;
                                    this.getList();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '保存失败!'
                                    });
                                }
                            }).catch(e => {
                                console.log("保存出错", e);
                            })
                        } else {
                            return false;
                        }
                    });
                }
            },
            logSettingAdd(json) {
                fetch({
                    url: '/es-management/api/logsetting/add',
                    method: 'post',
                    body: json
                }).then(res => {}).catch(err => {})
            }
        },
    }
</script>
<style>
    .el_put {
        width: 264px;
    }

    .title {
        margin: 0 auto;
        width: 200px;
        vertical-align: middle;
        /*height:62px;*/
        font-size: 20px;
        color: #606366;
        line-height: 40px;
        height: 40px;
    }

    .logForm .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 50px;
    }

    .user-log-info .el-input {
        position: relative;
        display: inline-block;
        width: 200px;
        margin-left: 96px;
    }

    .log-config {
        width: 200px;
        margin-left: 60px;
    }

    strong {
        color: red;
    }

    .config-item {
        margin-bottom: 10px;
    }

    .foot .footer-btn .el-button:last-child span {
        color: #fff !important;
    }
</style>

<style scoped lang="scss">
    /deep/.el-form{
        .el-form-item__label{
            padding: 0 20px 0 0;
        }
    }
    div.el-form-item{
        margin-bottom: 30px;
    }
</style>

