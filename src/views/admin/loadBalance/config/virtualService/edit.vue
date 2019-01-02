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
                title="修改虚拟服务"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">

                <el-tabs type="card" v-model="activeName">
                    <el-tab-pane label="基本" name="first">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px" class="demo-ruleForm">
                            <el-form-item label="名称" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.name" placeholder="请输入用户名" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="启用" prop="">
                                <el-checkbox v-model="editInfo.enable" class="checbox_20">启用</el-checkbox>
                            </el-form-item>
                            <el-form-item label="IP地址" prop="">
                                <span style="color: red;position: absolute;left: 12px;">*</span>
                                <!--<el-input v-model="editInfo.ipAddr" class="el_put"></el-input>-->
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
                                <!--:disabled="(editInfo.moshi=='DR'||editInfo.moshi=='NAT')&&editInfo.mode=='FTP'"-->
                                <el-input v-model="editInfo.port" class="el_put" ></el-input>
                            </el-form-item>
                            <el-form-item label="模式" prop="">
                                <el-select v-model="editInfo.moshi" class="el_sel" placeholder="请选择状态" @change="changeMode(val)">
                                    <el-option label="DR" value="DR"></el-option>
                                    <el-option label="NAT" value="NAT"></el-option>
                                    <el-option label="PROXY" value="PROXY"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="协议" prop="">
                                <el-select v-model="editInfo.mode" class="el_sel" placeholder="协议"
                                           v-if="editInfo.moshi=='DR'||editInfo.moshi=='NAT'">
                                    <el-option
                                            v-for="item in modeDRorNAT"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="editInfo.mode" class="el_sel" placeholder="协议" v-else>
                                    <el-option
                                            v-for="item in modePROXY"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="插入Forwarded" prop="">
                                <el-checkbox v-model="editInfo.forwardFor" class="checbox_20">插入</el-checkbox>
                            </el-form-item>
                            <el-form-item label="内容检查设置" prop="roleName">
                                <el-checkbox v-model="editInfo.contentCheck" class="checbox_20">启用</el-checkbox>
                            </el-form-item>

                            <template v-if="editInfo.contentCheck==true">
                                <el-form-item label="检查类型" prop="">
                                    <span class="dot" style="position: absolute;left: -4px;color: red;">*</span>
                                    <el-select v-model="editInfo.checkType" class="el_sel" placeholder="请选择">
                                        <el-option label="Delay" value="Delay"></el-option>
                                        <el-option label="Length" value="Length"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="时间后检查" prop="">
                                    <el-input v-model="editInfo.checkTime" placeholder="时间后检查" class="el_put"></el-input>
                                </el-form-item>
                            </template>


                            <el-form-item label="默认服务池" prop="">
                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                <el-select v-model="editInfo.defaultBackendId" class="el_sel" placeholder="请选择">

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
                                            width="140"
                                    >
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.serverPoolId" placeholder="服务器池" class="poolname"
                                                       ref="poolname" >
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
                                            <el-select v-model="scope.row.condition" placeholder="条件" class="referer">
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
                                            <el-select v-model="scope.row.aclId" placeholder="ACL" ref="aclname" class="aclname">
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
                                                    @click="useBackendAdd()">
                                                <img :src="addImg">
                                            </el-button>
                                            <span v-if="editInfo.useBackend.length>1">
                                                <el-button
                                                        size="small"
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
                                    <el-select v-model="editInfo.ssl.version" class="el_sel" placeholder="SSL版本">
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
                                    <el-input v-model="editInfo.ssl.certificate" placeholder="证书设置" v-if="false"
                                              class="domain el_put"></el-input>
                                    <el-button style="margin-left: 20px" class="btn_save" type="primary"
                                               @click="trigUpload('cert')">上传证书
                                    </el-button>
                                </el-form-item>
                                <el-form-item label="密钥设置" prop="">
                                    <span style="color: red;position: absolute;left: -4px;">*</span>
                                    <el-input v-model="editInfo.ssl.key" placeholder="密钥设置" v-if="false"
                                              class="domain el_put"></el-input>
                                    <el-button style="margin-left: 20px" class="btn_save" type="primary"
                                               @click="trigUpload('key')">上传密钥
                                    </el-button>
                                </el-form-item>
                                <el-form-item label="密钥密码" prop="">
                                    <el-input v-model="editInfo.ssl.keyPassword" placeholder="密钥密码"
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
                                    <el-checkbox v-model="editInfo.redirectUse" class="checbox_20">启用</el-checkbox>
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
                                                    fixed
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.location" placeholder="位置"
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
                                                    <el-input v-model="scope.row.url" placeholder="目标url" ref="url" class="re_urls"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="动作"
                                                    align="center"
                                                    width="120"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.option" placeholder="动作">
                                                        <el-option label="set cookie" value="set-cookie"></el-option>
                                                        <el-option label='drop query' value="drop-query"></el-option>
                                                        <el-option label='clear cookie' value="clear-cookie"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="参数"
                                                    width="180"
                                                    align="center">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.param" placeholder="参数" ref="re_param" class="re_param"></el-input>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="条件"
                                                    align="center"
                                                    width="100"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.condition" placeholder="条件"
                                                               class="referer">
                                                        <el-option label="if" value="if"></el-option>
                                                        <el-option label='unless' value="unless"></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="aclId"
                                                    align="center"
                                                    width="100"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.aclId" placeholder="ACL" ref="re_acl" class="re_acl">
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
                                                            @click="redirectAdd()">
                                                        <img :src="addImg">
                                                    </el-button>
                                                    <span v-if="editInfo.redirect.length>1">
                                                        <el-button
                                                                size="small"
                                                                style="border: none;background: transparent;padding: 4px 7px;"
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
                                    <el-checkbox v-model="editInfo.accessControlUse" class="checbox_20">启用</el-checkbox>
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
                                                    <el-select v-model="scope.row.option" placeholder="动作"
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
                                                    <el-select v-model="scope.row.condition" placeholder="条件"
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
                                                    <el-select v-model="scope.row.aclId" placeholder="ACL" ref="ctrl_acl" class="ctrl_acl">
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
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            @click="ctrlTcpAdd()"><img :src="addImg">
                                                    </el-button>
                                                    <span v-if="editInfo.accessControlTCP.length>1">
                                                        <el-button
                                                                size="small"
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
                                                    <el-select v-model="scope.row.option" placeholder="条件"
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
                                                    <el-select v-model="scope.row.condition" placeholder="条件"
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
                                                    <el-select v-model="scope.row.aclId" placeholder="ACL" ref="ctrl_acl" class="ctrl_acl">
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
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            @click="ctrlBlockAdd()"><img :src="addImg">
                                                    </el-button>
                                                    <span v-if="editInfo.accessControlHTTPBlock.length>1">
                                                        <el-button
                                                                size="small"
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
                                                    <el-select v-model="scope.row.option" placeholder="动作">
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
                                                    <el-input v-model="scope.row.regex" placeholder="正则" ref="ctrl_reg" class="ctrl_reg"></el-input>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="操作" align="center" style="text-align: center" width="">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="small"
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            @click="ctrlHttpAdd()"><img :src="addImg">
                                                    </el-button>
                                                    <span v-if="editInfo.accessControlHTTPAllow.length>1">
                                                        <el-button
                                                                size="small"
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
                                    <el-checkbox v-model="editInfo.counterAttacksUse" class="checbox_20">启用</el-checkbox>
                                </el-form-item>
                                <template v-if="editInfo.counterAttacksUse">
                                    <el-form-item label="最大并发连接数" prop="">
                                        <span style="color:red;position: absolute;left: -48px;">*</span>
                                        <el-input v-model="editInfo.counterAttacks.maxConn" placeholder="最大并发连接数"
                                                  class="el_put"></el-input>
                                    </el-form-item>
                                    <el-form-item label="客户端超时" prop="">
                                        <span style="color:red;position: absolute;left: -19px;">*</span>
                                        <el-input v-model="editInfo.counterAttacks.clientTimeout" placeholder="客户端超时"
                                                  class="el_put"></el-input>
                                    </el-form-item>
                                    <el-form-item label="HTTP超时" prop="">
                                        <span style="color:red;position: absolute;left: -13px;">*</span>
                                        <el-input v-model="editInfo.counterAttacks.httpTimeout" placeholder="HTTP超时"
                                                  class="el_put"></el-input>
                                    </el-form-item>
                                    <el-form-item label="HTTPKeep-alive" prop="">
                                        <span style="color:red;position: absolute;left: -63px;">*</span>
                                        <el-input v-model="editInfo.counterAttacks.httpKeepAliveTimeout" placeholder="HTTPKeep-alive"
                                                  class="el_put"></el-input>
                                    </el-form-item>
                                    <el-form-item label="连接速率限制" prop="">
                                        <el-input v-model="editInfo.counterAttacks.connRateLimit" placeholder="连接速率限制"
                                                  class="el_put"></el-input>
                                    </el-form-item>
                                    <el-form-item label="tarpit超时" prop="">
                                        <el-input v-model="editInfo.counterAttacks.tarpitTimeout" placeholder="tarpit超时"
                                                  class="el_put"></el-input>
                                    </el-form-item>
                                    <el-form-item label="正则表达" prop="">
                                        <el-input
                                                type="textarea"
                                                :rows="2"
                                                class="el_put"
                                                placeholder="正则表达(多个用逗号分隔)"
                                                v-model="editInfo.counterAttacks.tarpitRegex">
                                        </el-input>
                                    </el-form-item>
                                </template>

                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="重写" name="six" v-if="editInfo.mode=='HTTP'||editInfo.mode=='HTTPS'">
                            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="0"
                                     class="demo-ruleForm">
                                <p>
                                    <span>启用重写</span>
                                    <el-checkbox v-model="editInfo.overrideUse" class="checbox_20">启用</el-checkbox>
                                </p>
                                <template v-if="editInfo.overrideUse">

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
                                                    <el-select v-model="scope.row.option" placeholder="条件"
                                                               class="referer">
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
                                                    <el-input v-model="scope.row.param1" placeholder="参数1" ref="write_parm1"
                                                              class="domain write_parm1"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    label="参数2"
                                                    align="center">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.param2" placeholder="参数2" ref="write_parm2"
                                                              class="domain write_parm2"></el-input>
                                                </template>
                                            </el-table-column>

                                            <el-table-column
                                                    label="条件"
                                                    align="center"
                                                    width="100"
                                            >
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.condition" placeholder="条件">
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
                                                    <el-select v-model="scope.row.aclId" placeholder="ACL" ref="write_acl">
                                                        <el-option
                                                                v-for="item in aclNameList"
                                                                :key="item.id"
                                                                :label="item.label"
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
                                                            style="border: none;background: transparent;padding: 4px 7px;"
                                                            @click="overrideAdd()"><img :src="addImg">
                                                    </el-button>
                                                    <span v-if="editInfo.override.length>1">
                                                        <el-button
                                                                size="small"
                                                                style="border: none;background: transparent;padding: 4px 7px;"
                                                                @click="overrideDel(scope.$index,scope.row)"><img :src="delImg">
                                                        </el-button>
                                                    </span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-form-item>
                                </template>
                            </el-form>
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="resetForm('editInfo')">取消</span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="submitForm('editInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {toStrings, toBoolean} from 'utils/dateUtil'
    import {virtualServiceAdd, virtualServiceById,virtualServiceEdit} from '@/api/loadBalance/virtualService'
    import {getAclList,getAclListNopage} from '@/api/loadBalance/rule'
    import {getServerpoolListNopage } from '@/api/loadBalance/servePool'

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
                    forwardFor: false,//string
                    contentCheck: false,//string
                    checkType: '',
                    checkTime: '',
                    defaultBackendId: '',
                    useBackend: [
                        {serverPoolId: '', aclId: '', condition: ''}
                    ],
                    sslUse: false,

                    ssl: {
                        version: 'ALL',
                        certificate: '',
                        key: '',
                        keyPassword: '',
                    },
                    redirectUse: false,//string
                    redirect: [
                        {
                            location: 'location',
                            url: '',
                            option: '',
                            param: '',
                            aclId: '',
                            condition: ''
                        }
                    ],
                    accessControlUse: true,//(要传string)
                    //mode 类型有（tcp,http）
                    accessControlTCP: [
                        {mode: 'TCP', option: '', condition: '', aclId: ''}
                    ],
                    accessControlHTTPBlock: [
                        {mode: 'HTTP', option: 'block', condition: ''}
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
                        {option: 'reqadd', param1: '', param2: '', condition: '', aclId: ''}
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
            changeMode(val){
                this.editInfo.mode='TCP'
            },
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
                    aclId: '',
                    param: ''
                })
            },
            redirectDel(index, row) {
                this.editInfo.redirect.splice(index, 1)
            },
            // ****useBackendAdd*******************************
            useBackendAdd() {
                this.editInfo.useBackend.push({
                    serverPoolId: '',
                    condition: 'if',
                    aclId: '',
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
                    condition: 'if',
                    aclId: '',
                })
            },
            ctrlTcpDel(index, row) {
                this.editInfo.accessControlTCP.splice(index, 1)
            },

            ctrlBlockAdd() {
                this.editInfo.accessControlHTTPBlock.push({
                    mode: "HTTP",
                    option: "block",
                    condition: 'if',
                    aclId: '',
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
                    condition: 'if',
                    aclId: '',
                })
            },
            overrideDel(index, row) {
                this.editInfo.override.splice(index, 1)
            },
            validate() {
                let pools=document.querySelectorAll('.poolname input');
                let aclNames=document.querySelectorAll('.aclname input');

                let re_urls =document.querySelectorAll('.re_urls input');
                let re_params=document.querySelectorAll('.re_param input');
                let re_acls=document.querySelectorAll('.re_acl input');

                let ctrl_acls=document.querySelectorAll('.ctrl_acl input');
                let ctrl_regs=document.querySelectorAll('.ctrl_reg input');

                let write_parm1 =document.querySelectorAll('.write_parm1 input');
                let write_parm2=document.querySelectorAll('.write_parm2 input');
                let write_acls=document.querySelectorAll('.write_acl input');

                if (this.editInfo.name == '') {
                    this.$message({
                        type: 'warning',
                        message: '名称不能为空！'
                    });
                    return false
                }
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(this.editInfo.ipAddr) == false){
                    this.$message({
                        type: 'warning',
                        message: '请输入正确的IP地址！'
                    });
                    return false
                }
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.editInfo.port) == false) {
                    this.$message({
                        type: 'warning',
                        message: '端口为1-65535之间的数字！'
                    });
                    return false
                }

                if(this.editInfo.contentCheck==true){

                    if (this.editInfo.checkType == '') {
                        this.$message({
                            type: 'warning',
                            message: '请选择检查类型！'
                        });
                        return false
                    }
                    if (/^[0-9]*$/.test(this.editInfo.checkTime) == false) {
                        this.$message({
                            type: 'warning',
                            message: '时间后检查请输入数字！'
                        });
                        return false
                    }
                }


                if (this.editInfo.defaultBackendId == '') {
                    this.$message({
                        type: 'warning',
                        message: '默认服务池不能为空！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY') {
                    for(let i=0;i<pools.length;i++){
                        if(pools[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '服务器池不能为空！'
                            });
                            return false
                        }
                    }
                    for(let i=0;i<aclNames.length;i++){
                        if(aclNames[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '服务器池路由ACL不能为空！'
                            });
                            return false
                        }
                    }
                }
                // *****ssl终结*********

                if (this.editInfo.moshi == 'PROXY'&& this.editInfo.mode == 'HTTPS' && this.editInfo.ssl.certificate == '') {
                    this.$message({
                        type: 'warning',
                        message: '请上传证书设置！'
                    });
                    return false
                }
                if (this.editInfo.moshi == 'PROXY' && this.editInfo.mode == 'HTTPS'&& this.editInfo.ssl.key == '') {
                    this.$message({
                        type: 'warning',
                        message: '请上传密钥设置！'
                    });
                    return false
                }

                // **********重定向*************
                if (this.editInfo.moshi == 'PROXY'&&(this.editInfo.mode == 'HTTPS'||this.editInfo.mode == 'HTTP')&&
                    this.editInfo.redirectUse==true) {

                    for(let i=0;i<re_urls.length;i++){
                        if(re_urls[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '重定向url不能为空！'
                            });
                            return false
                        }
                    }
                    for(let i=0;i<re_params.length;i++){
                        if(re_params[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '重定向参数不能为空！'
                            });
                            return false
                        }
                    }
                    for(let i=0;i<re_acls.length;i++){
                        if(re_acls[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '重定向ACL不能为空！'
                            });
                            return false
                        }
                    }

                }

                //**********访问控制*************
                if (this.editInfo.moshi == 'PROXY'&&(this.editInfo.mode == 'HTTPS'||this.editInfo.mode == 'HTTP'||this.editInfo.mode == 'TCP')&&
                    this.editInfo.accessControlUse==true) {

                    for(let i=0;i<ctrl_acls.length;i++){
                        if(ctrl_acls[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '访问控制ACL不能为空！'
                            });
                            return false
                        }
                    }

                    for(let i=0;i<ctrl_regs.length;i++){
                        if(ctrl_regs[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '访问控制正则不能为空！'
                            });
                            return false
                        }
                    }
                }
                // **********反攻击*************
                // if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.maxConn == '') {
                //     this.$message({
                //         type: 'warning',
                //         message: '最大并发连接数不能为空！'
                //     });
                //     return false
                // }
                // if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.clientTimeout == '') {
                //     this.$message({
                //         type: 'warning',
                //         message: '客户端超时不能为空！'
                //     });
                //     return false
                // }
                // if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.httpTimeout == '') {
                //     this.$message({
                //         type: 'warning',
                //         message: 'HTTP超时不能为空！'
                //     });
                //     return false
                // }
                // if (this.editInfo.moshi == 'PROXY' && this.editInfo.counterAttacksUse == true && this.editInfo.httpKeepAliveTimeout == '') {
                //     this.$message({
                //         type: 'warning',
                //         message: 'HTTPKeep-alive超时不能为空！'
                //     });
                //     return false
                // }
                // **********重写*************
                if (this.editInfo.moshi == 'PROXY'&&(this.editInfo.mode == 'HTTPS'||this.editInfo.mode == 'HTTP')&&
                    this.editInfo.overrideUse==true) {

                    for(let i=0;i<write_parm1.length;i++){
                        if(write_parm1[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '重写参数1不能为空！'
                            });
                            return false
                        }
                    }
                    for(let i=0;i<write_parm2.length;i++){
                        if(write_parm2[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '重写参数2不能为空！！'
                            });
                            return false
                        }
                    }
                    for(let i=0;i<write_acls.length;i++){
                        if(write_acls[i].value==''){
                            this.$message({
                                type: 'warning',
                                message: '重写ACL不能为空！！'
                            });
                            return false
                        }
                    }
                }

                return true
            },
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {
                if (this.validate()) {
                    console.log(this.editInfo, 'editInfo', this.editInfo.accessControlTCP);

                    virtualServiceEdit(this.editInfo).then((resp) => {
                        this.editInfo.enable = toStrings(this.editInfo.enable);
                        this.editInfo.sslUse = toStrings(this.editInfo.sslUse);
                        this.editInfo.redirectUse = toStrings(this.editInfo.redirectUse);
                        this.editInfo.forwardFor = toStrings(this.editInfo.forwardFor);
                        this.editInfo.contentCheck = toStrings(this.editInfo.contentCheck);
                        this.editInfo.accessControlUse = toStrings(this.editInfo.accessControlUse);
                        this.editInfo.counterAttacksUse = toStrings(this.editInfo.counterAttacksUse);
                        this.editInfo.overrideUse = toStrings(this.editInfo.overrideUse);
                        if (resp.success == true) {
                            this.$message({
                                type: 'success',
                                message: '修改虚拟服务成功！'
                            });
                            this.editVisible = false;
                            this.$emit('onChangeStatus');
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: resp.code.info
                            });
                            this.editInfo.enable = toBoolean(this.editInfo.enable);
                            this.editInfo.sslUse = toBoolean(this.editInfo.sslUse);
                            this.editInfo.redirectUse = toBoolean(this.editInfo.redirectUse);
                            this.editInfo.forwardFor = toBoolean(this.editInfo.forwardFor);
                            this.editInfo.contentCheck = toBoolean(this.editInfo.contentCheck);
                            this.editInfo.accessControlUse = toBoolean(this.editInfo.accessControlUse);
                            this.editInfo.counterAttacksUse = toBoolean(this.editInfo.counterAttacksUse);
                            this.editInfo.overrideUse = toBoolean(this.editInfo.overrideUse);
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
