<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a>日志管理</a></li>
                <li class="active">日志下载</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">

            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=";padding-left: 0px">
                        <div class="box-header" style="height:82px">
                            <h3 class="box-title" id="user_set_box_title"
                                style="margin-left:20px;float:left;font-size:18px;color: #4A4D4F;line-height:60px; height:60px;">
                                日志下载
                            </h3>
                        </div>
                        <!--<div class="box-header"-->
                        <!--style="background-color:#eeeeee;height:62px;box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);">-->
                        <!--<div class='title' style="">日志下载规则</div>-->
                        <!--</div>-->
                        <!-- /.box-header -->
                        <div class="box-body">

                            <div class="row" style="margin-bottom:8px;">

                                <div class="logForm">
                                    <div style="float:left;margin-left: 40px;width: 100%">
                                        <div style="" class="queryCondition">
                                            <div style="width: 80px;float: left">
                                                    <span class="log-tag" style="padding-top: 8px">
                                                        <label>查询时间</label>
                                                    </span>
                                            </div>
                                            <div class="down-tag-date" style="float: left;width: 90%;margin-left: 5px">
                                                    <span class="log-download-checkbox down-tag"
                                                          style="margin-left: 23px"
                                                          v-for="(date, index)  in conditionDate">
                                                         <!--<el-tag @close="removeDate(index)"-->
                                                        <!--key="inp"-->
                                                        <!--:closable="true"-->
                                                        <!--:close-transition="false">-->
                                                            日期：
                                                            <el-date-picker
                                                                    v-model="date.dateRange"
                                                                    type="daterange"
                                                                    size="small"
                                                                    style="margin-left: 0px;height: 35px;border: none;display: inline-block;vertical-align: middle"
                                                                    placeholder="选择日期范围">
                                                            </el-date-picker>
                                                        <!--</el-tag>-->
                                                    </span>

                                                <!--<span style="float: left;margin-left: -15px; margin-top: -5px">-->
                                                <!--<span v-if="conditionDate.length > 1">-->
                                                <!--&lt;!&ndash;<i class="fa fa-minus"&ndash;&gt;-->
                                                <!--&lt;!&ndash;style="padding-top: 18px" @click="deleteConditionDate()">&ndash;&gt;-->
                                                <!--&lt;!&ndash;</i>&ndash;&gt;-->
                                                <!--<span><img src="../../../assets/addIcon/del.png" alt="" @click="deleteConditionDate()" style="padding-top: 18px;padding-left: 20px"></span>-->
                                                <!--</span>-->
                                                <!--<span>-->
                                                <!--&lt;!&ndash;<i class="fa fa-plus"&ndash;&gt;-->
                                                <!--&lt;!&ndash;style="padding-top: 18px; margin-left: 20px" @click="addConditionDate()">&ndash;&gt;-->
                                                <!--&lt;!&ndash;</i>&ndash;&gt;-->
                                                <!--<span><img src="../../../assets/addIcon/add.png" alt="" @click="addConditionDate()" style="padding-top: 18px; margin-left: 20px"></span>-->
                                                <!--</span>-->
                                                <!--</span>-->

                                            </div>
                                        </div>

                                        <div>
                                            <label>
                                                <span class="log-tag">
                                                    日志类别
                                                </span>
                                                <span class="log-download-checkbox">
                                                    <el-checkbox-group v-model="checkedCategory" :min="1">
                                                        <el-checkbox
                                                                v-for="item in category"
                                                                :label="item.key"
                                                                :key="item.key">
                                                            {{item.name}}
                                                        </el-checkbox>
                                                      </el-checkbox-group>
                                                </span>
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <span class="log-tag">
                                                    日志级别
                                                </span>
                                                <span class="log-download-checkbox" style="">
                                                    <el-checkbox-group v-model="checkedLevel" :min="1">
                                                        <el-checkbox label="INFO" key="INFO">
                                                            提示
                                                        </el-checkbox>
                                                        <el-checkbox label="WARNING" key="WARNING"
                                                                     style="margin-left: 57px">
                                                            警告
                                                        </el-checkbox>
                                                        <el-checkbox label="ERROR" key="ERROR"
                                                                     style="margin-left: 73px">
                                                            错误
                                                        </el-checkbox>
                                                      </el-checkbox-group>
                                                </span>
                                            </label>
                                        </div>
                                        <div>
                                            <div class="queryCondition" v-show="options[2].checked&&options[2].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>用户名</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px" class="down-tag">
                                                <span>
                                                     <el-tag key="inp"
                                                             :closable="true"
                                                             :close-transition="false"
                                                             v-for="(user,index) in conditionUserName"
                                                             @close="removeValue('conditionUserName',index)">
                                                        用户名：<input v-model="user.value" class="tag-input"/>
                                                    </el-tag>
                                                </span>
                                                    <span>
                                                        <span style="margin-left: 10px;">
                                                            <!--<i class="fa fa-minus"-->
                                                            <!--style="padding-top: 10px"-->
                                                            <!--@click="removeInputItem('conditionUserName',2)">-->
                                                            <!--</i>-->
                                                            <span><img :src="deling" alt=""
                                                                       @click="removeInputItem('conditionUserName',2)"
                                                                       style=""></span>
                                                        </span>
                                                    <span style="margin-left: 10px;">
                                                        <!--<i class="fa fa-plus"-->
                                                        <!--style="padding-top: 10px"-->
                                                        <!--@click="addInputItem('conditionUserName',2)">-->
                                                        <!--</i>-->
                                                        <span><img :src="adding" alt=""
                                                                   @click="addInputItem('conditionUserName',2)"
                                                                   style=""></span>
                                                    </span>
                                                </span>
                                                </div>
                                            </div>
                                            <div class="queryCondition"
                                                 v-show="options[6].checked && options[6].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>IP地址</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px"
                                                     class="down-tag">
                                                <span>

                                                     <el-tag key="inp"
                                                             :closable="true"
                                                             :close-transition="false"
                                                             v-for="(ip,index) in conditionIpAddress"
                                                             @close="removeValue('conditionIpAddress',index)">
                                                         IP地址：
                                                        <input v-model="ip.value" class="tag-input"/>
                                                    </el-tag>
                                                </span>
                                                    <span>
                                                         <span style="margin-left: 10px;">
                                                            <!--<i class="fa fa-minus"-->
                                                             <!--style="padding-top: 10px"-->
                                                             <!--@click="removeInputItem('conditionIpAddress',6)">-->
                                                             <!--</i>-->
                                                             <span><img :src="deling" alt=""
                                                                        @click="removeInputItem('conditionIpAddress',6)"
                                                                        style=""></span>
                                                        </span>
                                                    <span style="margin-left: 10px;">
                                                        <!--<i class="fa fa-plus"-->
                                                        <!--style="padding-top: 10px"-->
                                                        <!--@click="addInputItem('conditionIpAddress',6)">-->
                                                        <!--</i>-->
                                                         <span><img :src="adding" alt=""
                                                                    @click="addInputItem('conditionIpAddress',6)"
                                                                    style=""></span>
                                                    </span>
                                                </span>
                                                </div>
                                            </div>
                                            <div class="queryCondition"
                                                 v-show="options[5].checked && options[5].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>应用连接隧道</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px"
                                                     class="down-tag">
                                                <span>
                                                     <el-tag key="inp"
                                                             :closable="true"
                                                             :close-transition="false"
                                                             v-for="(item,index) in conditionLinkInterface"
                                                             @close="removeValue('conditionLinkInterface',index)">
                                                         连接隧道：
                                                        <input v-model="item.value" class="tag-input"/>
                                                    </el-tag>
                                                </span>
                                                    <span>
                                                        <span style="margin-left: 10px;">
                                                            <!--<i class="fa fa-minus"-->
                                                            <!--style="padding-top: 10px"-->
                                                            <!--@click="removeInputItem('conditionLinkInterface',5)">-->
                                                            <!--</i>-->
                                                           <span><img :src="deling" alt=""
                                                                      @click="removeInputItem('conditionLinkInterface',5)"
                                                                      style=""></span>
                                                        </span>
                                                    <span style="margin-left: 10px;">
                                                        <!--<i class="fa fa-plus"-->
                                                        <!--style="padding-top: 10px"-->
                                                        <!--@click="addInputItem('conditionLinkInterface',5)">-->
                                                        <!--</i>-->
                                                        <span><img :src="adding" alt=""
                                                                   @click="addInputItem('conditionLinkInterface',5)"
                                                                   style=""></span>
                                                    </span>
                                                </span>
                                                </div>
                                            </div>
                                            <div class="queryCondition"
                                                 v-show="options[7].checked && options[7].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>日志信息</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px" class="down-tag">
                                                <span>
                                                     <el-tag key="inp"
                                                             :closable="true"
                                                             :close-transition="false"
                                                             v-for="(item,index) in conditionLogInfo"
                                                             @close="removeValue('conditionLogInfo',index)">
                                                         日志信息：
                                                        <input v-model="item.value" class="tag-input"/>
                                                    </el-tag>
                                                </span>
                                                    <span>
                                                        <span style="margin-left: 10px;">
                                                            <!--<i class="fa fa-minus"-->
                                                            <!--style="padding-top: 10px"-->
                                                            <!--@click="removeInputItem('conditionLogInfo',7)">-->
                                                            <!--</i>-->
                                                            <span><img :src="deling" alt=""
                                                                       @click="removeInputItem('conditionLogInfo',7)"
                                                                       style=""></span>
                                                        </span>
                                                    <span style="margin-left: 10px;">
                                                        <!--<i class="fa fa-plus"-->
                                                        <!--style="padding-top: 10px"-->
                                                        <!--@click="addInputItem('conditionLogInfo',7)">-->
                                                        <!--</i>-->
                                                        <span><img :src="adding" alt=""
                                                                   @click="addInputItem('conditionLogInfo',7)" style=""></span>
                                                    </span>
                                                </span>
                                                </div>
                                            </div>
                                            <!-------------------------------------------------------------------------------------->
                                            <div class="queryCondition"
                                                 v-show="options[11].checked && options[11].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>URI</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px" class="down-tag">
                                                <span>
                                                     <el-tag key="inp"
                                                             :closable="true"
                                                             :close-transition="false"
                                                             v-for="(item,index) in conditionURI"
                                                             @close="removeValue('conditionURI',index)">
                                                         URI：
                                                        <input v-model="item.value" class="tag-input"/>
                                                    </el-tag>
                                                </span>
                                                    <span>
                                                        <span style="margin-left: 10px;">
                                                            <!--<i class="fa fa-minus"-->
                                                            <!--style="padding-top: 10px"-->
                                                            <!--@click="removeInputItem('conditionURI',11)">-->
                                                            <!--</i>-->
                                                            <span><img :src="deling" alt=""
                                                                       @click="removeInputItem('conditionURI',11)"
                                                                       style=""></span>
                                                        </span>
                                                    <span style="margin-left: 10px;">
                                                        <!--<i class="fa fa-plus"-->
                                                        <!--style="padding-top: 10px"-->
                                                        <!--@click="addInputItem('conditionURI',11)">-->
                                                        <!--</i>-->
                                                        <span><img :src="adding" alt=""
                                                                   @click="addInputItem('conditionURI',11)"
                                                                   style=""></span>
                                                    </span>
                                                </span>
                                                </div>
                                            </div>
                                            <!-------------------------------------------------------------------------------------->

                                            <!-------------------------------------------------------------------------------------->
                                            <div class="queryCondition"
                                                 v-show="options[12].checked && options[12].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>文件格式</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px"
                                                     class="down-tag">
                                                <span>
                                                     <el-tag key="inp"
                                                             :closable="true"
                                                             :close-transition="false"
                                                             v-for="(item,index) in conditionFileFormat"
                                                             @close="removeValue('conditionFileFormat',index)">
                                                         格式：
                                                        <input v-model="item.value" class="tag-input"/>
                                                    </el-tag>
                                                </span>
                                                    <span>
                                                        <span style="margin-left: 10px;">
                                                            <!--<i class="fa fa-minus"-->
                                                            <!--style="padding-top: 10px"-->
                                                            <!--@click="removeInputItem('conditionFileFormat',12)">-->
                                                            <!--</i>-->
                                                            <span><img :src="deling" alt=""
                                                                       @click="removeInputItem('conditionFileFormat',12)"
                                                                       style=""></span>
                                                        </span>
                                                    <span style="margin-left: 10px;">
                                                        <!--<i class="fa fa-plus"-->
                                                        <!--style="padding-top: 10px"-->
                                                        <!--@click="addInputItem('conditionFileFormat',12)">-->
                                                        <!--</i>-->
                                                        <span><img :src="adding" alt=""
                                                                   @click="addInputItem('conditionFileFormat',12)"
                                                                   style=""></span>
                                                    </span>
                                                </span>
                                                </div>
                                            </div>
                                            <div class="queryCondition"
                                                 v-show="options[14].checked && options[14].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>资源名</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px"
                                                     class="down-tag">
                                                <span>
                                                     <el-tag key="inp"
                                                             :closable="true"
                                                             :close-transition="false"
                                                             v-for="(item,index) in conditionResourceName"
                                                             @close="removeValue('conditionResourceName',index)">
                                                         资源名：
                                                        <input v-model="item.value" class="tag-input"/>
                                                    </el-tag>
                                                </span>
                                                    <span>
                                                         <span style="margin-left: 10px;">
                                                            <!--<i class="fa fa-minus"-->
                                                             <!--style="padding-top: 10px"-->
                                                             <!--@click="removeInputItem('conditionResourceName',14)">-->
                                                             <!--</i>-->
                                                             <span><img :src="deling" alt=""
                                                                        @click="removeInputItem('conditionResourceName',14)"
                                                                        style=""></span>
                                                        </span>
                                                    <span style="margin-left: 10px;">
                                                        <!--<i class="fa fa-plus"-->
                                                        <!--style="padding-top: 10px"-->
                                                        <!--@click="addInputItem('conditionResourceName',14)">-->
                                                        <!--</i>-->
                                                        <span><img :src="adding" alt=""
                                                                   @click="addInputItem('conditionResourceName',14)"
                                                                   style=""></span>
                                                    </span>
                                                </span>
                                                </div>
                                            </div>
                                            <!-------------------------------------------------------------------------------------->
                                            <div style="" class="queryCondition"
                                                 v-show="options[8].checked && options[8].show">
                                                <div style="width: 80px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>用户权限</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;margin-left: 20px" class="down-tag">
                                                    <el-select v-model="selectAuth"
                                                               placeholder="请选择用户权限"
                                                               popper-class="download-select">
                                                        <el-checkbox-group v-model="options[8].value">
                                                            <el-option v-for="item in userAuth" :key="item.id"
                                                                       :value="item.id" :label="item.id">
                                                                <el-checkbox :label="item.id">{{item.name}}
                                                                </el-checkbox>
                                                            </el-option>
                                                        </el-checkbox-group>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="queryCondition" v-show="options[4].checked && options[4].show">
                                                <div style="width: 100px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>认证服务器</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;" class="down-tag">
                                                    <el-select v-model="selectServer"
                                                               placeholder="请选择认证服务器"
                                                               popper-class="download-select">
                                                        <el-checkbox-group v-model="options[4].value">
                                                            <el-option v-for="item in certificateServer" :key="item.id"
                                                                       :value="item.id" :label="item.name">
                                                                <el-checkbox :label="item.id">{{item.name}}
                                                                </el-checkbox>
                                                            </el-option>
                                                        </el-checkbox-group>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div style="" class="queryCondition"
                                                 v-show="options[3].checked && options[3].show">
                                                <div style="width: 100px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>用户组</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;" class="down-tag">
                                                    <el-select v-model="selectGroup"
                                                               placeholder="请选择用户组"
                                                               popper-class="log-select">
                                                        <el-checkbox-group v-model="options[3].value">
                                                            <el-option v-for="item in userGroup" :key="item.id"
                                                                       :value="item.id" :label="item.name">
                                                                <el-checkbox :label="item.id">{{item.name}}
                                                                </el-checkbox>
                                                            </el-option>
                                                        </el-checkbox-group>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <!------------------------------------------>
                                            <div style="" class="queryCondition"
                                                 v-show="options[10].checked && options[10].show">
                                                <div style="width: 100px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>登录状态</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;" class="down-tag">
                                                    <el-select v-model="selectStatus"
                                                               placeholder="请选择登录状态"
                                                               popper-class="log-select">
                                                        <el-checkbox-group v-model="options[10].value">
                                                            <el-option value="LOGIN" label="登入">
                                                                <el-checkbox label="LOGIN">登入</el-checkbox>
                                                            </el-option>

                                                            <el-option value="LOGOUT" label="登出">
                                                                <el-checkbox label="LOGOUT">登出</el-checkbox>
                                                            </el-option>

                                                        </el-checkbox-group>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <!------------------------------------------>
                                            <!------------------------------------------>
                                            <div style="" class="queryCondition"
                                                 v-show="options[9].checked && options[9].show">
                                                <div style="width: 100px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>登录操作</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;" class="down-tag">
                                                    <el-select v-model="selectOperation"
                                                               placeholder="请选择登录操作"
                                                               popper-class="log-select">
                                                        <el-checkbox-group v-model="options[9].value">
                                                            <el-option value="SUCCESS" label="成功">
                                                                <el-checkbox label="SUCCESS">成功</el-checkbox>
                                                            </el-option>

                                                            <el-option value="FAIL" label="失败">
                                                                <el-checkbox label="FAIL">失败</el-checkbox>
                                                            </el-option>

                                                        </el-checkbox-group>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <!------------------------------------------>
                                            <!------------------------------------------>
                                            <div style="" class="queryCondition"
                                                 v-show="options[13].checked && options[13].show">
                                                <div style="width: 100px;float: left">
                                                    <span class="log-tag log-tag-label">
                                                        <label>访问类型</label>
                                                    </span>
                                                </div>
                                                <div style="float: left;width: 90%;" class="down-tag">
                                                    <el-select v-model="selectVisitType"
                                                               placeholder="请选择访问类型"
                                                               popper-class="log-select">
                                                        <el-checkbox-group v-model="options[13].value">
                                                            <el-option value="UPLOAD" label="上传">
                                                                <el-checkbox label="UPLOAD">上传</el-checkbox>
                                                            </el-option>

                                                            <el-option value="DOWNLOAD" label="下载">
                                                                <el-checkbox label="DOWNLOAD">下载</el-checkbox>
                                                            </el-option>

                                                            <el-option value="VISIT" label="访问">
                                                                <el-checkbox label="VISIT">访问</el-checkbox>
                                                            </el-option>

                                                        </el-checkbox-group>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <!------------------------------------------>
                                        </div>
                                    </div>
                                </div>
                                <!------------------------------------------------------------------------------------------------->
                            </div>
                            <hr/>
                            <!------------------------------------------------------------------>
                            <div class="block user-log-info"
                                 style="float:left;margin-left: 0px;width: 100%;">
                                <div style="width: 220px;float:left;margin-left: -15px;" v-if="false">
                                    <el-select v-model="optionValue"
                                               placeholder="添加条件"
                                               style="margin-left: 0px"
                                               popper-class="log-select log_to">
                                        <el-option v-for="(item,index) in options"
                                                   v-show="item.show"
                                                   :key="item.index"
                                                   :label="item.label"
                                                   :value="item.value">
                                            <el-checkbox v-model="item.checked"
                                                         @change="availableConditionChange(item)">
                                                {{item.label}}
                                            </el-checkbox>
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="margin-left: 30px ;float:left;width: 400px">
                                    <span style="margin-left: 15px">
                                        <el-button size="small"
                                                   style="margin-top: 2px"
                                                   type="primary"
                                                   class="primary confirm"
                                                   @click="download()">
                                            下载
                                        </el-button>
                                    </span>
                                </div>
                            </div>
                            <!--------------------------------------------------------------------->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import {isReadonly} from "../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../store/index";
    import {codeMessage} from "../../../utils/codes";
    import {notifyFault} from "../../../utils/notify";
    import lineChart from 'components/Charts/lineChart';
    import pieChart from 'components/Charts/pieChart';
    import {formatDateTime, totalDays} from "../../../utils/dateUtil";
    import {selectConditionList} from "../../../api/log/logApi";

    export default {
        components: {lineChart, pieChart},
        data() {
            return {
                adding: require('../../../assets/addIcon/add.png'),
                deling: require('../../../assets/addIcon/del.png'),
                readOnly: false,
                pageId: 37,
                beginTime: '2016-12-03',
                endTime: '2017-07-03',
                dateRange: '',
                selectGroup: '',
                selectServer: '',
                selectLevel: '',
                selectAuth: '',
                selectOperation: '',
                selectVisitType: '',
                selectStatus: '',
                conditionDate: [{
                    id: 1,
                    dateRange: [],
                }],
                conditionUserName: [{
                    id: 1,
                    value: ''
                }],
                conditionIpAddress: [{
                    id: 1,
                    value: ''
                }],
                conditionLinkInterface: [{
                    id: 1,
                    value: ''
                }],
                conditionLogInfo: [{
                    id: 1,
                    value: ''
                }],
                conditionFileFormat: [{
                    id: 1,
                    value: ''
                }],
                conditionVisitType: [{
                    id: 1,
                    value: ''
                }],
                conditionResourceName: [{
                    id: 1,
                    value: ''
                }],
                conditionURI: [{
                    id: 1,
                    value: ''
                }],
                optionValue: '',
                checkedCategory: ["userLog", "adminLog", "systemLog", "resLog"],
                category: [{
                    key: 'userLog',
                    name: '用户日志'
                }, {
                    key: 'adminLog',
                    name: '管理员日志'
                }, {
                    key: 'systemLog',
                    name: '系统日志'
                }, {
                    key: 'resLog',
                    name: '资源访问日志'
                }],
                checkedLevel: ["INFO", "WARNING", "ERROR"],
                level: ["info", "warning", "error"],
                logForm: {
                    thirdPartyServer: 1,
                    type: 'date',
                    day: 10,
                    num: 10
                },
                checked: false,
                checkedId: [],
                conditionOptions: {
                    date: {}
                },
                options: [{
                    id: '0',
                    label: '日期',
                    checked: true,
                    show: false,
                    key: '',
                    valueType: 'dateRange',
                    value: '',
                }, {
                    id: '1',
                    label: '级别',
                    checked: true,
                    show: false,
                    key: 'logLevel.keyword',
                    valueType: 'precious',
                    value: []
                }, {
                    id: '2',
                    label: '用户名',
                    checked: false,
                    show: true,
                    key: 'userName',
                    valueType: 'ambiguous',
                    propertyName: 'conditionUserName',
                    value: ''
                }, {
                    id: '3',
                    label: '用户组',
                    checked: false,
                    show: true,
                    key: 'userGroup.keyword',
                    valueType: 'precious',
                    value: []
                }, {
                    id: '4',
                    label: '认证服务器',
                    checked: false,
                    show: true,
                    key: 'certificateServer.keyword',
                    valueType: 'precious',
                    value: []
                }, {
                    id: '5',
                    label: '应用连接隧道',
                    checked: false,
                    show: true,
                    valueType: 'ambiguous',
                    key: 'linkInterface',
                    propertyName: 'conditionLinkInterface',
                    value: ''
                }, {
                    id: '6',
                    label: 'IP地址',
                    checked: false,
                    show: true,
                    valueType: 'ambiguous',
                    key: 'ipAddress',
                    propertyName: 'conditionIpAddress',
                    value: ''
                }, {
                    id: '7',
                    label: '日志信息',
                    checked: false,
                    show: true,
                    valueType: 'ambiguous',
                    key: 'message',
                    propertyName: 'conditionLogInfo',
                    value: ''
                }, {
                    id: '8',
                    label: '用户权限',
                    checked: false,
                    show: true,
                    valueType: 'precious',
                    key: 'userAuth.keyword',
                    value: []
                }, {
                    id: '9',
                    label: '登录操作',
                    checked: false,
                    show: true,
                    valueType: 'precious',
                    key: 'operation.keyword',
                    value: []
                }, {
                    id: '10',
                    label: '登录状态',
                    checked: false,
                    show: true,
                    valueType: 'precious',
                    key: 'status.keyword',
                    value: []
                }, {
                    id: '11',
                    label: 'URI',
                    checked: false,
                    show: true,
                    valueType: 'ambiguous',
                    propertyName: 'conditionURI',
                    key: 'uri',
                    value: []
                }, {
                    id: '12',
                    label: '文件格式',
                    checked: false,
                    show: true,
                    valueType: 'ambiguous',
                    propertyName: 'conditionFileFormat',
                    key: 'fileFormat',
                    value: []
                }, {
                    id: '13',
                    label: '访问类型',
                    checked: false,
                    show: true,
                    valueType: 'precious',
                    key: 'visitType',
                    value: []
                }, {
                    id: '14',
                    label: '资源名',
                    checked: false,
                    show: true,
                    valueType: 'ambiguous',
                    propertyName: 'conditionResourceName',
                    key: 'resourceName',
                    value: []
                }],
                userGroup: [],
                certificateServer: [],
                userAuth: [{id: '超级管理员', name: '超级管理员'}, {id: '普通管理员', name: '普通管理员'}, {id: '普通用户', name: '普通用户'}],
                //需要获取的下拉框的数据
                selectTypes: [
                    {
                        logType: 'userLog',
                        name: 'userGroup',
                        key: 'userGroup.keyword'
                    }, {
                        logType: 'userLog',
                        name: 'certificateServer',
                        key: 'certificateServer.keyword'
                    },
                    {
                        logType: 'adminLog',
                        name: 'userAuth',
                        key: 'userAuth.keyword'
                    }
                ],
            }
        },
        computed: {},
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('userAuth:', this.userAuth);
            let date = new Date();
            date.setDate(date.getDate() - 30);
            this.conditionDate[0].dateRange.push(date);
            this.conditionDate[0].dateRange.push(new Date());
            this.setSelectCondition();
        },
        watch: {//深度 watcher
            "checkedCategory": 'typeChange'     //用于监听所选日志类型的变化
        },
        methods: {
            typeChange() {
                for (let index = 0; index < this.options.length; index++) {
                    this.options[index].show = false;
                }
                for (let item of this.checkedCategory) {
                    if (item == 'userLog') {
                        this.showConditionChooser([2, 3, 4, 5, 6, 7]);
                    }
                    if (item == 'adminLog') {
                        this.showConditionChooser([2, 6, 7, 8]);
                    }
                    if (item == 'systemLog') {
                        this.showConditionChooser([7]);
                    }
                    if (item == 'resLog') {
                        this.showConditionChooser([2, 3, 11, 12, 13, 14]);
                    }
                }
            },
            showConditionChooser(indexArray) {
                for (let index of indexArray) {
                    this.options[index].show = true;
                }
            },
            availableConditionChange(item) {
            },
            handleClose(tagIndex) {
                console.log("要关闭的tag:", tagIndex);
            },
//            addConditionDate() {
//                let date = new Date();
//                date.setDate(date.getDate() - 30);
//                this.conditionDate.push({
//                    id: this.conditionDate.length + 1,
//                    dateRange: [date, new Date()]
//                })
//            },
//            deleteConditionDate(){
//                if (this.conditionDate.length > 1){
//                    var i = this.conditionDate.length - 1;
//                    this.conditionDate.splice(i, 1);
//                }
//            },
            removeDate(index) {
                if (this.conditionDate.length == 1) {
                    this.$message({
                        type: 'warning',
                        message: '至少保留一条日期筛选条件！'
                    });
                    return;
                }
                this.conditionDate.splice(index, 1);
            },
            addUserName() {
                this.conditionUserName.push({
                    id: this.conditionUserName.length + 1,
                    value: ''
                })
            },
            download() {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    console.log("进入下载方法中。");
                    let dto = [];
                    for (let logType of this.checkedCategory) {
                        if (logType == 'userLog') {
                            dto.push(this.logCondition(logType, [2, 3, 4, 5, 6, 7]));
                        } else if (logType == 'adminLog') {
                            dto.push(this.logCondition(logType, [2, 6, 7, 8]));
                        } else if (logType == 'systemLog') {
                            dto.push(this.logCondition(logType, [7]));
                        } else if (logType == 'resLog') {
                            dto.push(this.logCondition(logType, [2, 3, 11, 12, 13, 14]));
                        } else {
                            dto.push(this.logCondition(logType, [2, 3, 9, 10]));
                        }
                    }
                    console.log(dto, 'dto')
                    let str = JSON.stringify(dto);
                    console.log(str, 'str')
                    console.log("下载得到的条件：", dto);
                    let url = "logs/api/log/zip";
                    url = this.addURLParam(url, "match", str);
                    console.log(url, 'url--')
                    window.location.href = url;
                }
            },
            logCondition(logType, arrs) {
                let preciseConditions = {};
                let ambiguousConditions = {};
                for (let index of arrs) {
                    let condition = this.options[index];
                    if (condition.show && condition.checked) {
                        if (condition.valueType == 'ambiguous') {//若是模糊条件,则会可能出现多个
                            let values = [];
                            //console.log("属性名：",condition.propertyName)
                            for (let v of this[condition.propertyName]) {
                                if (v.value != null && v.value != '') {
                                    values.push(v.value);
                                }
                            }
                            ambiguousConditions[condition.key] = values;
                        } else {//则是精确条件
                            preciseConditions[condition.key] = condition.value;
                        }
                    }
                }
                preciseConditions['logLevel.keyword'] = this.checkedLevel;//添加级别，为精确条件
                //时间条件单独添加
                let rangeConditionList = [];
                for (let i = 0; i < this.conditionDate.length; i++) {
                    let d1 = formatDateTime(this.conditionDate[i].dateRange[0]);
                    let d2 = formatDateTime(this.conditionDate[i].dateRange[1]);
                    rangeConditionList.push({
                        "type": "DATE",
                        "conditionName": "date",            //查询字段先改为date字段查询
                        "gteValue": d1,
                        "lteValue": d2
                    })
                }
                let condition = {
                    preciseConditions: preciseConditions,
                    ambiguousConditions: ambiguousConditions,
                    rangeConditionList: rangeConditionList,
                    logType: logType
                };
                return condition;
            },
            addInputItem(itemName) {
                this[itemName].push({
                    id: this[itemName].length + 1,
                    value: ''
                });
            },
            removeInputItem(itemName, conditionIndex) {
                if (this[itemName].length > 0) {
                    var i = this[itemName].length - 1
                    this[itemName].splice(i, 1);
                }
                if (this[itemName].length == 0) {
                    this.options[conditionIndex].checked = false;
                    this.addInputItem(itemName);
                }
            },
            removeValue(itemName, itemIndex) {
                this[itemName][itemIndex].value = '';
            },
            /******
             * 获取下拉框的条件，按照不同的日志类型获取下拉框的筛选列表
             * ****/
            setSelectCondition() {
                let selectType = this.selectTypes;
                console.log('selectType---', selectType)
                for (let item of selectType) {
                    selectConditionList(item.logType, item.key).then(resp => {
                        let data = resp.data;
                        console.log(data, 'data=====++++zaf')
                        for (let value of data) {
                            console.log(value, 'value')
                            console.log("name", item.name)
//                           var zaf=[item.name].push({
//                                id: value,
//                                name: value
//                            });
                            if (item.name == 'userGroup') {
                                this.userGroup.push({
                                    id: value,
                                    name: value
                                });
                            }
                            if (item.name == 'certificateServer') {
                                this.certificateServer.push({
                                    id: value,
                                    name: value
                                });
                            }
//                            if(item.name == 'userAuth')
//                            {
//                                this.userAuth.push({
//                                    id: value,
//                                    name: value
//                                });
//                            }
                        }
                        console.log('userAuth:', this.userAuth);
                    }).catch(err => {
                        console.log("获取数据出错：", err);
                    })
                }
            },
            addURLParam(url, name, value) {
                url += (url.indexOf("?") == -1 ? "?" : "&");
                url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
                return url;
            }
        }
    }
</script>
<style>
    .down-tag-date .el-icon-date:before {
        display: none;
    }

    .down-tag-date .el-icon-date:after {
        display: none;
    }
</style>

<style scoped>
    .queryCondition {
        margin-top: 10px;
        float: left;
        width: 100%;

    }

    .download-select {
        height: 35px;
    }

    .tag-input {
        color: black;
        background-color: #fff;
        border: none;
        zoom: 1;
        outline: medium;
        /*//以上三条样式去边框，使得输入框与父元素看起来融为一体*/
    }

    .down-tag {
        margin-top: 5px;
    }

    .down-tag .el-tag {
        height: 32px;
        line-height: 30px;
        margin-left: 6px;
        margin-top: 5px;
        color: #3C8DBC;
        background-color: #fff;
        border: 1px solid #3C8DBC;
    }

    .down-tag .el-tag * {
        color: #3C8DBC;
    }

    .log-tag {
        float: left;
        width: 90px;
    }

    .log-tag-label {
        padding-top: 15px;
    }

    .log-download-checkbox {
        float: left;
        min-width: 300px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    /*.log-select*/
    .el-select-dropdown__item.selected {
        background-color: #ffffff;
    }
</style>