<template>
    <div class="admin public">
        <el-dialog
                title="导入文件"
                :visible.sync="uploadVisible"
                size="small"
                custom-class="dialog public"
                :before-close="handleCloseUpload"
        >
            <div>
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        drag
                        :action="uploadfile"
                        multiple
                        :with-credentials="true"
                        :on-success="uploadSuccess"
                        :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <el-button style="margin-top:10px;margin-left: 10px;" size="small" @click="submitUpload">上传到服务器
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="查看虚拟服务"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">

                <el-tabs type="card" v-model="activeName">
                    <el-tab-pane label="基本" name="first">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px"
                                 class="demo-ruleForm">
                            <el-form-item label="名称" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.name" placeholder="请输入用户名" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="启用" prop="">
                                <el-checkbox v-model="editInfo.enable" class="checbox_20" :disabled="true">启用</el-checkbox>
                            </el-form-item>
                            <el-form-item label="IP地址" prop="">
                                <span style="color: red;position: absolute;left: 12px;">*</span>
                                <!--<el-input v-model="editInfo.ipAddr" class="el_put" :disabled="true"></el-input>-->
                                <el-select v-model="editInfo.ipAddr" class="el_sel" placeholder="">
                                    <el-option
                                            v-for="item in ipAddrOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="端口" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.port" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="模式" prop="">
                                <el-select v-model="editInfo.moshi" class="el_sel" placeholder="模式" :disabled="true">
                                    <el-option label="DR" value="DR"></el-option>
                                    <el-option label="NAT" value="NAT"></el-option>
                                    <el-option label="PROXY" value="PROXY"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="协议" prop="">
                                <el-select v-model="editInfo.mode" class="el_sel" placeholder="协议" :disabled="true"
                                           v-if="editInfo.moshi=='DR'||editInfo.moshi=='NAT'">
                                    <el-option
                                            v-for="item in modeDRorNAT"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="editInfo.mode" class="el_sel" placeholder="协议" v-else :disabled="true">
                                    <el-option
                                            v-for="item in modePROXY"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="插入Forwarded" prop="">
                                <el-checkbox v-model="editInfo.forwardFor" class="checbox_20" :disabled="true">插入</el-checkbox>
                            </el-form-item>
                            <el-form-item label="内容检查设置" prop="roleName">
                                <el-checkbox v-model="editInfo.contentCheck" class="checbox_20" :disabled="true">启用</el-checkbox>
                            </el-form-item>

                            <template v-if="editInfo.contentCheck==true">
                                <el-form-item label="检查类型" prop="">
                                    <span class="dot" style="position: absolute;left: -4px;color: red;">*</span>
                                    <el-select v-model="editInfo.checkType" class="el_sel" placeholder="请选择" :disabled="true">
                                        <el-option label="Delay" value="Delay"></el-option>
                                        <el-option label="Length" value="Length"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="时间后检查" prop="">
                                    <el-input v-model="editInfo.checkTime" placeholder="时间后检查" :disabled="true"
                                              class="el_put"></el-input>
                                </el-form-item>
                            </template>


                            <el-form-item label="默认服务池" prop="">
                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                <el-select v-model="editInfo.defaultBackend" class="el_sel" placeholder="请选择" :disabled="true">
                                    <el-option
                                            v-for="item in serverPoolNames"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服务池路由" v-if="editInfo.moshi=='PROXY'">
                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                <el-table
                                        ref="multipleTable"
                                        :data="editInfo.useBackend"
                                        border
                                        tooltip-effect="dark"
                                        style="width: 65%;max-height: 206px;margin-left:100px;overflow-y: auto">
                                    <el-table-column
                                            label="服务器池"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.serverPoolName" placeholder="服务器池" class="poolname"
                                                       ref="poolname" :disabled="true">
                                                <el-option
                                                        v-for="item in serverPoolNames"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                            label="条件"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.condition" placeholder="条件" :disabled="true">
                                                <el-option label="if" value="if"></el-option>
                                                <el-option label='unless' value="unless"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="ACL"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.aclName" placeholder="ACL" ref="aclname" :disabled="true">
                                                <el-option
                                                        v-for="item in aclNameList"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="操作" align="center" style="text-align: center" width="160">
                                        <template slot-scope="scope">
                                            <el-button
                                                    size="small"
                                                    style="border: none;background: transparent;"
                                                    :disabled="true"
                                                    @click="useBackendAdd()">
                                                <img :src="addImg">
                                            </el-button>
                                            <span>
                                                <el-button
                                                        size="small"
                                                        :disabled="true"
                                                        style="border: none;background: transparent;"
                                                        @click="useBackendDel(scope.$index,scope.row)">
                                                    <img :src="delImg">
                                            </el-button>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <template v-if="editInfo.moshi=='PROXY'">

                        <el-tab-pane label="SSL终结" name="second" v-if="editInfo.mode=='HTTPS'">
                            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px"
                                     class="demo-ruleForm">
                                <el-form-item label="SSL版本" prop="">
                                    <!--<el-input v-model="editInfo.ssl.version" placeholder="SSL版本"  class="el_put domain"></el-input>-->
                                    <el-select v-model="editInfo.ssl.version" class="el_sel" placeholder="SSL版本" :disabled="true">
                                        <el-option
                                                v-for="item in versions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="证书设置" prop="">
                                    <span style="color: red;position: absolute;left: -4px;">*</span>
                                    <el-input v-model="editInfo.ssl.certificate" placeholder="证书设置" v-if="false" :disabled="true"
                                              class="domain el_put"></el-input>
                                    <el-button style="margin-left: 20px" class="primary confirm" type="primary" :disabled="true"
                                               @click="trigUpload('cert')">上传证书
                                    </el-button>
                                </el-form-item>
                                <el-form-item label="密钥设置" prop="">
                                    <span style="color: red;position: absolute;left: -4px;">*</span>
                                    <el-input v-model="editInfo.ssl.key" placeholder="密钥设置" v-if="false"
                                              class="domain el_put"></el-input>
                                    <el-button style="margin-left: 20px" class="primary confirm" type="primary" :disabled="true"
                                               @click="trigUpload('key')">上传密钥
                                    </el-button>
                                </el-form-item>
                                <el-form-item label="密钥密码" prop="">
                                    <el-input v-model="editInfo.ssl.keyPassword" placeholder="密钥密码" :disabled="true"
                                              class="domain el_put"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="重定向" name="third" v-if="editInfo.mode=='HTTP'||editInfo.mode=='HTTPS'">
                            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="0px"
                                     class="demo-ruleForm">
                                <!--<el-form-item label="启用重定向" prop="" style="">-->
                                <p>
                                    <span>启用重定向</span>
                                    <el-checkbox v-model="editInfo.redirectUse" class="checbox_20" :disabled="true">启用</el-checkbox>
                                </p>
                                <!--</el-form-item>-->
                                <template v-if="editInfo.redirectUse==true">
                                    <el-form-item label="">
                                        <!--margin-left:100px;-->
                                        <el-table
                                                ref="multipleTable"
                                                :data="editInfo.redirect"
                                                border
                                                tooltip-effect="dark"
                                                style="max-height: 206px;width: 100%;overflow-y: auto">
                                            <el-table-column
                                                    label="位置"
                                                    align="center"
                                                    width="120"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.location" placeholder="位置" :disabled="true"
                                                               class="referer">
                                                        <el-option label="location" value="location"></el-option>
                                                        <el-option label='prefix' value="prefix"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="目标url"
                                                    align="center"
                                                    width="180">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.url" placeholder="目标url" :disabled="true"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="动作"
                                                    align="center"
                                                    width="120"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.option" placeholder="动作" :disabled="true"
                                                               class="referer">
                                                        <el-option label="set cookie" value="set-cookie"></el-option>
                                                        <el-option label='drop query' value="drop-query"></el-option>
                                                        <el-option label='clear cookie'
                                                                   value="clear-cookie"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="参数"
                                                    width="180"
                                                    align="center">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.param" placeholder="参数" :disabled="true"></el-input>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="条件"
                                                    align="center"
                                                    width="100"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.condition" placeholder="条件" :disabled="true"
                                                               class="referer">
                                                        <el-option label="if" value="if"></el-option>
                                                        <el-option label='unless' value="unless"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="aclName"
                                                    align="center"
                                                    width="100"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.aclName" placeholder="ACL" :disabled="true">
                                                        <el-option
                                                                v-for="item in aclNameList"
                                                                :key="item.id"
                                                                :label="item.name"
                                                                :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="操作" align="center">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="small"
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            :disabled="true"
                                                            @click="redirectAdd()">
                                                        <img :src="addImg">
                                                    </el-button>
                                                    <span>
                                                <el-button
                                                        size="small"
                                                        style="border: none;background: transparent;padding: 4px 7px;"
                                                        :disabled="true"
                                                        @click="redirectDel(scope.$index,scope.row)">
                                                    <img :src="delImg">
                                                </el-button>
                                            </span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-form-item>
                                </template>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="访问控制" name="fourth"
                                     v-if="editInfo.mode=='TCP'||editInfo.mode=='HTTP'||editInfo.mode=='HTTPS'">
                            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px"
                                     class="demo-ruleForm">
                                <el-form-item label="启用" prop="">
                                    <el-checkbox v-model="editInfo.accessControlUse" class="checbox_20" :disabled="true">启用</el-checkbox>
                                </el-form-item>
                                <template v-if="editInfo.accessControlUse==true">
                                    <el-form-item label="tcp">
                                        <el-table
                                                ref="multipleTable"
                                                :data="editInfo.accessControlTCP"
                                                border
                                                tooltip-effect="dark"
                                                style="max-height: 206px;overflow-y: auto;margin-left: 100px;width: 65%">
                                            <el-table-column
                                                    label="动作"
                                                    align="center"
                                                    width="100"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.option" placeholder="动作" :disabled="true"
                                                               class="referer">
                                                        <el-option label="accept" value="accept"></el-option>
                                                        <el-option label='reject' value="reject"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="条件"
                                                    align="center"
                                                    width="120"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.condition" placeholder="条件" :disabled="true"
                                                               class="referer">
                                                        <el-option label="if" value="if"></el-option>
                                                        <el-option label='unless' value="unless"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="ACL"
                                                    align="center"
                                                    width="120"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.aclName" placeholder="ACL" :disabled="true">
                                                        <!--<el-option label="if" value="if"></el-option>-->
                                                        <el-option
                                                                v-for="item in aclNameList"
                                                                :key="item.id"
                                                                :label="item.name"
                                                                :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="操作" align="center" style="text-align: center" width="">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="small"
                                                            :disabled="true"
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            @click="ctrlTcpAdd()"><img :src="addImg">
                                                    </el-button>
                                                    <span>
                                                <el-button
                                                        size="small"
                                                        :disabled="true"
                                                        style="border: none;background: transparent;padding: 4px 7px;"
                                                        @click="ctrlTcpDel(scope.$index,scope.row)"><img :src="delImg">
                                                </el-button>
                                            </span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-form-item>
                                    <el-form-item label="阻止">
                                        <el-table
                                                ref="multipleTable"
                                                :data="editInfo.accessControlHTTPBlock"
                                                border
                                                tooltip-effect="dark"
                                                style="max-height: 206px;overflow-y: auto;margin-left: 100px;width: 65%">
                                            <el-table-column
                                                    label="动作"
                                                    align="center"
                                                    width=""
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.option" placeholder="条件" :disabled="true"
                                                               class="referer">
                                                        <el-option label="block" value="block"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="条件"
                                                    align="center"
                                                    width=""
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.condition" placeholder="条件" :disabled="true"
                                                               class="referer">
                                                        <el-option label="if" value="if"></el-option>
                                                        <el-option label='unless' value="unless"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="操作" align="center" style="text-align: center" width="">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="small"
                                                            :disabled="true"
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            @click="ctrlBlockAdd()"><img :src="addImg">
                                                    </el-button>
                                                    <span>
                                                <el-button
                                                        size="small"
                                                        :disabled="true"
                                                        style="border: none;background: transparent;padding: 4px 7px;"
                                                        @click="ctrlBlockDel(scope.$index,scope.row)"><img
                                                        :src="delImg">
                                                </el-button>
                                            </span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-form-item>
                                    <el-form-item label="访问">
                                        <el-table
                                                ref="multipleTable"
                                                :data="editInfo.accessControlHTTPAllow"
                                                border
                                                tooltip-effect="dark"
                                                style="max-height: 206px;overflow-y: auto;margin-left: 100px;width: 65%">
                                            <el-table-column
                                                    label="动作"
                                                    align="center"
                                                    width=""
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.option" placeholder="动作" :disabled="true">
                                                        <el-option label="allow" value="allow"></el-option>
                                                        <el-option label='deny request' value="reqdeny"></el-option>
                                                        <el-option label='deny response' value="rspdeny"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="正则"
                                                    align="center"
                                            >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.regex" placeholder="正则" :disabled="true"></el-input>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="操作" align="center" style="text-align: center" width="">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="small"
                                                            :disabled="true"
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            @click="ctrlHttpAdd()"><img :src="addImg">
                                                    </el-button>
                                                    <span>
                                                        <el-button
                                                                size="small"
                                                                :disabled="true"
                                                                style="border: none;background: transparent;padding: 4px 7px;"
                                                                @click="ctrlHttpDel(scope.$index,scope.row)"><img
                                                                :src="delImg">
                                                        </el-button>
                                                    </span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-form-item>
                                </template>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="反攻击" name="five">
                            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="145px"
                                     class="demo-ruleForm">
                                <el-form-item label="启用" prop="">
                                    <el-checkbox v-model="editInfo.counterAttacksUse" class="checbox_20" :disabled="true">启用
                                    </el-checkbox>
                                </el-form-item>
                                <el-form-item label="最大并发连接数" prop="">
                                    <span style="color:red;position: absolute;left: -48px;">*</span>
                                    <el-input v-model="editInfo.maxConn" placeholder="最大并发连接数" class="el_put" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="客户端超时" prop="">
                                    <span style="color:red;position: absolute;left: -19px;">*</span>
                                    <el-input v-model="editInfo.clientTimeout" placeholder="客户端超时" :disabled="true"
                                              class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="HTTP超时" prop="">
                                    <span style="color:red;position: absolute;left: -13px;">*</span>
                                    <el-input v-model="editInfo.httpTimeout" placeholder="HTTP超时" :disabled="true"
                                              class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="HTTPKeep-alive" prop="">
                                    <span style="color:red;position: absolute;left: -63px;">*</span>
                                    <el-input v-model="editInfo.httpKeepAliveTimeout" placeholder="HTTPKeep-alive" :disabled="true"
                                              class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="连接速率限制" prop="">
                                    <el-input v-model="editInfo.connRateLimit" placeholder="连接速率限制" :disabled="true"
                                              class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="tarpit超时" prop="">
                                    <el-input v-model="editInfo.tarpitTimeout" placeholder="tarpit超时" :disabled="true"
                                              class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="正则表达" prop="">
                                    <el-input v-model="editInfo.tarpitRegex" placeholder="正则表达"  :disabled="true"
                                              class="el_put"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="重写" name="six" v-if="editInfo.mode=='HTTP'||editInfo.mode=='HTTPS'">
                            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="0"
                                     class="demo-ruleForm">
                                <p>
                                    <span>启用重写</span>
                                    <el-checkbox v-model="editInfo.overrideUse" class="checbox_20" :disabled="true">启用</el-checkbox>
                                </p>
                                <el-form-item label="">
                                    <el-table
                                            ref="multipleTable"
                                            :data="editInfo.override"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%;max-height: 206px;overflow-y: auto">
                                        <el-table-column
                                                label="动作"
                                                align="center"
                                                width="100"
                                        >
                                            <template slot-scope="scope">
                                                <el-select v-model="scope.row.option" placeholder="条件" class="referer" :disabled="true">
                                                    <el-option label="request add" value="reqadd"></el-option>
                                                    <el-option label="request delete" value="reqdel"></el-option>
                                                    <el-option label="request replace" value="reqrep"></el-option>

                                                    <el-option label="response add" value="rspadd"></el-option>
                                                    <el-option label="response delete" value="rspdel"></el-option>
                                                    <el-option label="response replace" value="rsprep"></el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="参数1"
                                                align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.param1" placeholder="服务器池" :disabled="true"
                                                          class="domain"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="参数2"
                                                align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.param2" placeholder="服务器池" :disabled="true"
                                                          class="domain"></el-input>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                label="条件"
                                                align="center"
                                                width="100"
                                        >
                                            <template slot-scope="scope">
                                                <el-select v-model="scope.row.condition" placeholder="条件" :disabled="true">
                                                    <el-option label="if" value="1"></el-option>
                                                    <el-option label='unless' value="0"></el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="ACL"
                                                align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-select v-model="scope.row.aclName" placeholder="ACL" :disabled="true">
                                                    <!--<el-option label="if" value="1"></el-option>-->
                                                    <!--<el-option label='unless' value="0"></el-option>-->
                                                    <el-option
                                                            v-for="item in aclNameList"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id">

                                                    </el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                label="操作" align="center" style="text-align: center" width="100">
                                            <template slot-scope="scope">
                                                <el-button
                                                        size="small"
                                                        :disabled="true"
                                                        style="border: none;background: transparent;padding: 4px 7px;"
                                                        @click="overrideAdd()"><img :src="addImg">
                                                </el-button>
                                                <span>
                                                <el-button
                                                        size="small"
                                                        :disabled="true"
                                                        style="border: none;background: transparent;padding: 4px 7px;"
                                                        @click="overrideDel(scope.$index,scope.row)"><img :src="delImg">
                                                </el-button>
                                            </span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <!--<span class="canle" @click="resetForm('editInfo')">取消</span>-->
                    <!--<el-button-->
                            <!--class="btn_save"-->
                            <!--type="primary"-->
                            <!--@click="submitForm('editInfo')">-->
                        <!--确定-->
                    <!--</el-button>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {toStrings, toBoolean} from 'utils/dateUtil'
    import {virtualServiceAdd, virtualServiceById} from '@/api/loadBalance/virtualService'
    import {getAclListNopage} from '@/api/loadBalance/rule'
    import {getServerpoolListNopage} from '@/api/loadBalance/servePool'

    export default {
        components: {},
        data() {
            return {
                addImg: require('@/assets/addIcon/add.png'),
                delImg: require('@/assets/addIcon/del.png'),
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                val: '',
                rules: {},
                activeName: 'first',
                editVisible: true,
                arrs: [],
                // formTab1
                uploadfile: '',
                uploadVisible: false,
                currentUpload: '',//上传类型（cert,key）
                aclNameList: [],
                serverPoolNames:[],
                ipAddrOptions:[
                    {
                        label:"0.0.0.0",
                        value:"0.0.0.0",
                    },
                    {
                        label:window.location.hostname,
                        value:window.location.hostname,
                    }
                ],
                editInfo: {
                    name: '',
                    enable: false,//sting(提交传sting)
                    ipAddr: '',
                    port: '',
                    moshi: 'PROXY',
                    mode: 'HTTPS',
                    forwardFor: '',//string
                    contentCheck: true,//string
                    checkType: '',
                    checkTime: '',
                    defaultBackend: 'LK',
                    useBackend: [
                        {serverPoolName: '', aclName: '', condition: ''}
                    ],
                    sslUse: false,

                    ssl: {
                        version: 'ALL',
                        certificate: '',
                        key: '',
                        keyPassword: '',
                    },
                    redirectUse: true,//string
                    redirect: [
                        {
                            location: 'location',
                            url: '',
                            option: '',
                            param: '',
                            aclName: '',
                            condition: ''
                        }
                    ],
                    accessControlUse: true,//(要传string)
                    //mode 类型有（tcp,http）
                    accessControlTCP: [
                        {mode: 'TCP', option: '', condition: '', aclName: ''}
                    ],
                    accessControlHTTPBlock: [
                        {mode: 'HTTP', option: 'block', condition: '', aclName: ''}
                    ],
                    accessControlHTTPAllow: [
                        {mode: 'HTTP', option: 'allow', regex: ''}
                    ],

                    counterAttacksUse: false,//string
                    counterAttacks: {
                        maxConn: '',
                        clientTimeout: '',
                        httpTimeout: '',
                        httpKeepAliveTimeout: '',
                        connRateLimit: '',
                        tarpitTimeout: '',
                        tarpitRegex: '',
                    },
                    overrideUse: false,//string
                    override: [
                        {option: '', param1: '', param2: '', condition: '', aclName: ''}
                    ],
                },
                modeDRorNAT: [
                    {
                        value: 'TCP',
                        label: 'TCP'
                    }, {
                        value: 'UDP',
                        label: 'UDP'
                    }, {
                        value: 'FTP',
                        label: 'FTP'
                    },
                ],
                modePROXY: [
                    {
                        value: 'TCP',
                        label: 'TCP'
                    }, {
                        value: 'HTTP',
                        label: 'HTTP'
                    }, {
                        value: 'FASTHTTP',
                        label: 'FASTHTTP'
                    }, {
                        value: 'HTTPS',
                        label: 'HTTPS'
                    },
                ],
                versions: [
                    {
                        value: 'ALL',
                        label: 'ALL'
                    }, {
                        value: 'SSLv2',
                        label: 'SSLv2'
                    }, {
                        value: 'SSLv3',
                        label: 'SSLv3'
                    }, {
                        value: 'TLSv1',
                        label: 'TLSv1'
                    },
                ],
                formTab2: {}
            }
        },
        props: ['currentData'],
        created() {
            this.getList();
            this.doInit(this.currentData);
        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            doInit(currentData) {
                // this.editInfo=currentData;
                console.log('id:', currentData.id)
                // virtualServiceById({id: currentData.id}).then((resp) => {
                this.editInfo = currentData;
                this.editInfo.enable = toBoolean(this.editInfo.enable);
                this.editInfo.sslUse = toBoolean(this.editInfo.sslUse);
                this.editInfo.redirectUse = toBoolean(this.editInfo.redirectUse);
                this.editInfo.forwardFor = toBoolean(this.editInfo.forwardFor);
                this.editInfo.contentCheck = toBoolean(this.editInfo.contentCheck);
                this.editInfo.accessControlUse = toBoolean(this.editInfo.accessControlUse);
                this.editInfo.counterAttacksUse = toBoolean(this.editInfo.counterAttacksUse);
                this.editInfo.overrideUse = toBoolean(this.editInfo.overrideUse);

                if(this.editInfo.useBackend.length<1){
                    this.editInfo.useBackend.push({
                        serverPoolId: '',
                        condition: 'if',
                        aclId: '',
                    })
                }
                if(this.editInfo.redirect.length<1){
                    this.editInfo.redirect.push({
                        location: 'location',
                        url: '',
                        option: 'set-cookie',
                        param: '',
                        aclId: '',
                        condition: 'if'
                    })
                }
                if(this.editInfo.accessControlTCP.length<1){
                    this.editInfo.accessControlTCP.push({
                        mode: "TCP",
                        option: "accept",
                        condition: 'if',
                        aclId: ''
                    })
                }
                if(this.editInfo.accessControlHTTPBlock.length<1){
                    this.editInfo.accessControlHTTPBlock.push({
                        mode: "HTTP",
                        option: "block",
                        condition: 'if',
                        aclId: '',
                    })
                }
                if(this.editInfo.accessControlHTTPAllow.length<1){
                    this.editInfo.accessControlHTTPAllow.push({
                        mode: "HTTP",
                        option: "allow",
                        regex: "",
                    })
                }
                if(this.editInfo.override.length<1){
                    this.editInfo.override.push({
                        option: "reqadd",
                        param1: "",
                        param2: "",
                        condition: 'if',
                        aclId: '',
                    })
                }

                //
                // }).catch(err => {
                //
                // });
            },
            getList() {
                //获取acl名称
                getAclListNopage().then((resp) => {
                    this.aclNameList = resp.data;

                }).catch(err => {

                });
                //获取服务器池名称
                getServerpoolListNopage().then((resp) => {
                    this.serverPoolNames = resp.data;
                }).catch(err => {

                });
            },
            // ****redirectAdd*******************************
            redirectAdd() {
                this.editInfo.redirect.push({
                    location: '',
                    url: '',
                    option: '',
                    condition: '',
                    aclName: '',
                    param: ''
                })
            },
            redirectDel(index, row) {
                this.editInfo.redirect.splice(index, 1)
            },
            // ****useBackendAdd*******************************
            useBackendAdd() {
                this.editInfo.useBackend.push({
                    serverPoolName: '',
                    condition: '',
                    aclName: '',
                })
            },
            useBackendDel(index, row) {
                this.editInfo.useBackend.splice(index, 1)
            },
            // ****accessControl*******************************
            ctrlTcpAdd() {
                this.editInfo.accessControlTCP.push({
                    mode: "TCP",
                    option: "",
                    condition: '',
                    aclName: '',
                })
            },
            ctrlTcpDel(index, row) {
                this.editInfo.accessControlTCP.splice(index, 1)
            },

            ctrlBlockAdd() {
                this.editInfo.accessControlHTTPBlock.push({
                    mode: "HTTP",
                    option: "block",
                    condition: '',
                    aclName: '',
                })
            },
            ctrlBlockDel(index, row) {
                this.editInfo.accessControlHTTPBlock.splice(index, 1)
            },

            ctrlHttpAdd() {
                this.editInfo.accessControlHTTPAllow.push({
                    mode: "HTTP",
                    option: "allow",
                    regex: "",
                })
            },
            ctrlHttpDel(index, row) {
                this.editInfo.accessControlHTTPAllow.splice(index, 1)
            },
            // ****overrideAdd*******************************
            overrideAdd() {
                this.editInfo.override.push({
                    option: "",
                    param1: "",
                    param2: "",
                    condition: '',
                    aclName: '',
                })
            },
            overrideDel(index, row) {
                this.editInfo.override.splice(index, 1)
            },
            validate() {
                // console.log('poolname2:',this.$refs.poolname)
                // *******基本***********
                if (this.editInfo.name.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '名称不能为空！'
                    });
                    return false
                }
                if (this.editInfo.ipAddr.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: 'IP地址不能为空！'
                    });
                    return false
                }
                if (this.editInfo.port.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '端口不能为空！'
                    });
                    return false
                }
                if (this.editInfo.defaultBackend.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '默认服务池不能为空！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY' && this.$refs.poolname.value == '') {
                    this.$message({
                        type: 'warning',
                        message: '服务器池不能为空！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY' && this.$refs.aclname.value == '') {
                    this.$message({
                        type: 'warning',
                        message: 'acl不能为空！'
                    });
                    return false
                }
                // *****ssl终结*********
                if (this.editInfo.moshi == 'PROXY' && this.editInfo.ssl.certificate == '') {
                    this.$message({
                        type: 'warning',
                        message: '请上传证书设置！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY' && this.editInfo.ssl.key == '') {
                    this.$message({
                        type: 'warning',
                        message: '请上传密钥设置！'
                    });
                    return false
                }
                // **********反攻击*************
                if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.maxConn.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '最大并发连接数不能为空！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.clientTimeout.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '客户端超时不能为空！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.httpTimeout.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: 'HTTP超时不能为空！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.httpKeepAliveTimeout.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: 'HTTPKeep-alive超时不能为空！'
                    });
                    return false
                }


                return true
            },
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {
                if (this.validate()) {
                    console.log(this.editInfo, 'addinfo');
                    this.editInfo.enable = toStrings(this.editInfo.enable);
                    this.editInfo.sslUse = toStrings(this.editInfo.sslUse);
                    this.editInfo.redirectUse = toStrings(this.editInfo.redirectUse);
                    this.editInfo.forwardFor = toStrings(this.editInfo.forwardFor);
                    this.editInfo.contentCheck = toStrings(this.editInfo.contentCheck);

                    this.editInfo.accessControlUse = toStrings(this.editInfo.accessControlUse);
                    this.editInfo.counterAttacksUse = toStrings(this.editInfo.counterAttacksUse);
                    this.editInfo.overrideUse = toStrings(this.editInfo.overrideUse);

                    virtualServiceEdit(this.editInfo).then((resp) => {
                        if (resp.success == true) {
                            this.$message({
                                type: 'success',
                                message: '新建虚拟服务成功！'
                            });
                            this.editVisible = false;
                            this.$emit('onChangeStatus');
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: resp.code.info
                            });
                        }
                    }).catch(e => {
                        console.log("新建出错", e);
                    });

                }
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },


            handleCloseUpload() {
                this.$refs['upload'].clearFiles();
                this.uploadVisible = false;
            },
            submitUpload(formName) {
                this.$refs['upload'].submit();
            },
            trigUpload(type) {
                this.uploadVisible = true;
                this.currentUpload = type;
                if (type == "cert") {
                    this.uploadfile = "../server/HaproxyCFG/VirtualService/upload";
                } else {
                    this.uploadfile = "../server/HaproxyCFG/VirtualService/upload";
                }
            },

            uploadError: function (err) {
                this.$message({
                    type: 'warning',
                    message: '文件上传失败'
                });
            },
            uploadSuccess: function (response) {
                if (response.success == true) {
                    this.$message({
                        type: 'success',
                        message: "文件上传成功"
                    });
                    if (this.currentUpload == "cert") {
                        this.editInfo.ssl.certificate = response.data;
                    } else {
                        this.editInfo.ssl.key = response.data;
                    }


                } else {
                    this.$message({
                        type: 'warning',
                        message: "文件上传出错"
                    });

                }
                this.$refs['upload'].clearFiles();
                this.uploadVisible = false;
            },
        }
    }
</script>
<style lang="scss">
    .checbox_20 {
        margin-left: 20px;
    }
</style>
