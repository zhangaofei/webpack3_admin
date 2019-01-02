<template>
    <div class="admin public">
        <el-dialog
                title="新增规则"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose">
            <div class="admin-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="">
                        <span style="color:red;position:absolute;left: 26px;">*</span>
                        <el-input v-model="addInfo.name" placeholder="名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="">
                        <el-input v-model="addInfo.describe" placeholder="描述" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="操作符" prop="">
                        <el-select v-model="mark" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="item in optionsMark"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button style="" class="btn_save" type="primary" @click="addMark">add</el-button>
                    </el-form-item>
                    <el-form-item label="TCP" prop="">
                        <el-select v-model="tcp" placeholder="请选择" class="el_sel" @change="chang(tcp)">
                            <el-option
                                    v-for="item in optionsTcp"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>

                        </el-select>
                        <el-button style="" class="btn_save" type="primary" @click="addTcp">add</el-button>
                    </el-form-item>
                    <el-form-item label="HTTP请求行" prop="">
                        <el-select v-model="httpline" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="item in httpLine"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button style="" class="btn_save" type="primary" @click="addHttpline">add</el-button>
                    </el-form-item>
                    <el-form-item label="HTTP请求头" prop="">
                        <el-select v-model="httphead" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="item in httpHeader"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button style="" class="btn_save" type="primary" @click="isHttpHead=true">add</el-button>
                    </el-form-item>
                    <el-form-item label="HTTP请求内容" prop="">
                        <el-select v-model="httpcont" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="item in httpContent"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button style="" class="btn_save" type="primary" @click="isHttpCont=true">add</el-button>
                    </el-form-item>
                    <el-form-item label="默认ACL" prop="">
                        <el-select v-model="acl" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="item in defultAcl"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button style="" class="btn_save" type="primary" @click="isAcl=true">add</el-button>
                    </el-form-item>
                    <el-form-item label="操作内容" prop="">
                        <el-input v-model="addInfo.content" placeholder="操作内容" :disabled="true" class="el_put" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                        <el-button style="" class="btn_save" type="primary" @click="clearCont">清除</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="submitForm('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <!--**********tcp*******-->
        <el-dialog
                title="TCP"
                :visible.sync="isTcp"
                size="small"
                custom-class="dialog public"
                top="8%"
        >
            <div class="admin-form">
                <el-form :model="tcpForm" ref="tcpForm" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="参数" prop="">
                        <el-input v-model="tcpForm.param" placeholder="参数" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="header" prop="" v-if="tcp=='nbsrv2'">
                        <el-input v-model="tcpForm.header" placeholder="header" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="reset('tcpForm')">取消</span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="saveTcp('tcpForm')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <!--*********http***********-->
        <el-dialog
                title="HTTP请求行"
                :visible.sync="isHttp"
                size="small"
                custom-class="dialog public"
                top="8%"
        >
            <div class="admin-form">
                <el-form :model="httpForm" ref="httpForm" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="参数" prop="">
                        <el-input v-model="httpForm.param" placeholder="参数" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器池" prop="" v-if="false">
                        <el-input v-model="httpForm.header" placeholder="服务器池" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="reset('httpForm')">取消</span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="saveHttp('httpForm')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <!--*********http-head***********-->
        <el-dialog
                title="HTTP头部"
                :visible.sync="isHttpHead"
                size="small"
                custom-class="dialog public"
                top="8%"
        >
            <div class="admin-form">
                <el-form :model="httpHeadForm" ref="httpHeadForm" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="参数" prop="">
                        <el-input v-model="httpHeadForm.param" placeholder="参数" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器池" prop="" v-if="httphead=='hdr2'||httphead=='hdr_beg2'||
                    httphead=='hdr_end2'||httphead=='hdr_sub2'||httphead=='hdr_reg2'||
                    httphead=='hdr_val2'||httphead=='hdr_cnt2'">
                        <el-input v-model="httpHeadForm.header" placeholder="服务器池" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="reset('httpHeadForm')">取消</span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="saveHttpHead('httpHeadForm')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <!--*********http-cont***********-->
        <el-dialog
                title="HTTP内容"
                :visible.sync="isHttpCont"
                size="small"
                custom-class="dialog public"
                top="8%"
        >
            <div class="admin-form">
                <el-form :model="httpContForm" ref="httpContForm" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="参数" prop="">
                        <el-input v-model="httpContForm.param" placeholder="参数" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器池" prop="" v-if="false">
                        <el-input v-model="httpContForm.header" placeholder="服务器池" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="reset('httpContForm')">取消</span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="saveHttpCont('httpContForm')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <!--*********acl***********-->
        <el-dialog
                title="默认ACL"
                :visible.sync="isAcl"
                size="small"
                custom-class="dialog public"
                top="8%"
        >
            <div class="admin-form acl_from">
                <el-form :model="aclForm" ref="aclForm" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="参数类型" prop="">
                        <span class="acl_char" v-if="acl=='always_true'||acl=='always_false'||acl=='wait_end'||acl=='req_proto_http'">无</span>
                        <span class="acl_char" v-if="acl=='url_reg'">正则表达式</span>
                        <span class="acl_char" v-if="acl=='req_rdp_cookie_cnt'||acl=='req_len'||acl=='req_ver'||acl=='req_ver2'
                        ||acl=='req_val'||acl=='req_val'||acl=='req_val'">数值</span>
                        <span class="acl_char" v-if="acl=='method'||acl=='method2'||acl=='method3'||acl=='method4'||
                        acl=='method5'||acl=='url_beg'||acl=='url_beg2'">字符串</span>
                        <span class="acl_char" v-if="acl=='src'">IP地址</span>
                    </el-form-item>
                    <el-form-item label="参数" prop="">
                        <template v-if="acl=='always_true'||acl=='always_false'||acl=='wait_end'||acl=='req_proto_http'">
                            <el-input v-model="aclForm.param" placeholder="无参数" class="el_put" :disabled="true"></el-input>
                        </template>

                        <el-input v-model="aclForm.param" placeholder="1.1" class="el_put" v-if="acl=='req_ver'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="1.0" class="el_put" v-if="acl=='req_ver2'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="^[^/:]*://" class="el_put" v-if="acl=='url_reg'"></el-input>

                        <el-input v-model="aclForm.param" placeholder="0" class="el_put" v-if="acl=='req_val'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="/" class="el_put" v-if="acl=='url_beg'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="*" class="el_put" v-if="acl=='url_beg2'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="127.0.0.1/8" class="el_put" v-if="acl=='src'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="CONTENT" class="el_put" v-if="acl=='method'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="HEAD" class="el_put" v-if="acl=='method2'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="OPTIONS" class="el_put" v-if="acl=='method3'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="POST" class="el_put" v-if="acl=='method4'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="TRACE" class="el_put" v-if="acl=='method5'"></el-input>

                        <el-input v-model="aclForm.param" placeholder="0" class="el_put" v-if="acl=='req_rdp_cookie_cnt'"></el-input>
                        <el-input v-model="aclForm.param" placeholder="0" class="el_put" v-if="acl=='req_len'"></el-input>


                    </el-form-item>


                    <el-form-item label="头部" prop="" v-if="acl=='req_val'">
                        <el-input v-model="aclForm.header" placeholder="content-length" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="reset('aclForm')">取消</span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="saveAcl('aclForm')">
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
    import {getAclAdd} from '@/api/loadBalance/rule'

    export default {
        components: {},
        data() {
            return {
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                val: '',
                rules: {},
                activeName: 'first',
                addInfo: {
                    name: '',
                    describe: '',
                    content: '',
                },
                optionsMark: [
                    {
                        value: 'and',
                        label: 'AND'
                    }, {
                        value: 'or',
                        label: 'OR'
                    },
                ],
                optionsTcp: [
                    {
                        value: 'src',
                        label: 'Source IP',
                        id:1
                    }, {
                        value: 'src_port',
                        label: 'Source Port',
                        id:2
                    }, {
                        value: 'dst',
                        label: 'Destination IP',
                        id:3
                    }, {
                        value: 'dst_port',
                        label: 'Destination Port',
                        id:4
                    }, {
                        value: 'dst_conn',
                        label: 'Destination Connection',
                        id:5
                    },
                    {
                        //???
                        // value: 'nbsrv',
                        value: 'nbsrv',
                        label: '#Servers In Defaul Port',
                        id:6
                    },
                    {
                        // value: 'nbsrv',
                        value: 'nbsrv2',
                        label: '#Servers In Specific Port',
                        id:7
                    }, {
                        value: 'req_len',
                        label: 'Length of Request',
                        id:8
                    }, {
                        value: 'req_ssl_ver',
                        label: 'SSL Version',
                        id:9
                    },
                ],
                // httpLine
                httpLine: [
                    {
                        value: 'method',
                        label: 'method'
                    }, {
                        value: 'path',
                        label: 'Path Equals'
                    }, {
                        value: 'path_beg',
                        label: 'Path Begins With'
                    }, {
                        value: 'path_end',
                        label: 'Path Ends With'
                    }, {
                        value: 'path_sub',
                        label: 'Path Contains'
                    }, {
                        value: 'path_reg',
                        label: 'Path Matches'
                    }, {
                        value: 'url',
                        label: 'Url Equals'
                    }, {
                        value: 'url_beg',
                        label: 'Url Begins With'
                    }, {
                        value: 'url_end',
                        label: 'Url Begins End'
                    }, {
                        value: 'url_sub',
                        label: 'Url Contains'
                    }, {
                        value: 'url_reg',
                        label: 'Url Matches'
                    }, {
                        value: 'req_ver',
                        label: 'Version'
                    },
                ],
                // httpHeader
                httpHeader:[
                    {
                        value: 'hdr',
                        label: 'Any Header Equals',
                        id:1
                    }, {
                        value: 'hdr2',
                        label: 'Header Equals',
                        id:2
                    }, {
                        value: 'hdr_beg',
                        label: 'Any Header Begins With',
                        id:3
                    }, {
                        value: 'hdr_beg2',
                        label: 'Header Begins With',
                        id:4
                    }, {
                        value: 'hdr_end',
                        label: 'Any Header End',
                        id:5
                    }, {
                        value: 'hdr_end2',
                        label: 'Any Header with',
                        id:6
                    }, {
                        value: 'hdr_sub',
                        label: 'Any Header Contains',
                        id:7
                    }, {
                        //???
                        value: 'hdr_sub2',
                        label: 'Header Contains',
                        id:8
                    }, {
                        value: 'hdr_reg',
                        label: 'Any Header Matches',
                        id:9
                    }, {
                        value: 'hdr_reg2',
                        label: 'Header Matches',
                        id:10
                    }, {
                        value: 'hdr_val',
                        label: 'Any Header Value',
                        id:11
                    }, {
                        value: 'hdr_val2',
                        label: 'Header Value',
                        id:12
                    }, {
                        value: 'hdr_cnt',
                        label: '# of all Headers',
                        id:13
                    }, {
                        value: 'hdr_cnt2',
                        label: '# of Specific Headers',
                        id:14
                    },
                ],
                // httpContent
                httpContent: [
                    {
                        value: 'req_body_match',
                        label: 'Body Matches'
                    }
                ],
                // defultAcl
                defultAcl:[
                    {
                        value: 'always_true',
                        label: 'Always True',
                        id:1
                    }, {
                        value: 'always_false',
                        label: 'Always False',
                        id:2
                    }, {
                        value: 'wait_end',
                        label: 'WAIT_END',
                        id:3
                    }, {
                        value: 'req_proto_http',
                        label: 'HTTP',
                        id:4
                    }, {
                        value: 'req_ver',
                        label: 'HTTP_1.1',
                        id:5
                    }, {
                        value: 'req_ver2',
                        label: 'HTTP_1.0',
                        id:6
                    }, {
                        value: 'req_val',
                        label: 'HTTP_CONTENT',
                        id:7
                    }, {
                        value: 'url_reg',
                        label: 'HTTP_URL_ABS',
                        id:8
                    }, {
                        value: 'url_beg',
                        label: 'HTTP_URL_SLASH',
                        id:9
                    }, {
                        value: 'url_beg2',
                        label: 'HTTP_URL_StAR',
                        id:10
                    }, {
                        value: 'src',
                        label: 'LOCALHOST',
                        id:11
                    }, {
                        value: 'method',
                        label: 'METHOD_CONTENT',
                        id:12
                    }, {
                        value: 'method2',
                        label: 'METHOD_HEAD',
                        id:13
                    }, {
                        value: 'method3',
                        label: 'METHOD_OPTIONS',
                        id:14
                    }, {
                        value: 'method4',
                        label: 'METHOD_POST',
                        id:15
                    }, {
                        value: 'method5',
                        label: 'METHOD_TRACE',
                        id:16
                    }, {
                        value: 'req_rdp_cookie_cnt',
                        label: 'RDP_COOKIE',
                        id:17
                    }, {
                        value: 'req_len',
                        label: 'REQ_CONTENT',
                        id:18
                    },
                ],

                pswInfo: {
                    id: '',
                    password: '',
                    conpassword: ''
                },
                isExistUser: {
                    administratorId: '',
                    userName: ''
                },
                dialogVisible: false,
                addVisible: true,
                // **************
                mark: 'and',
                tcp: 'src',
                httpline: 'method',
                httphead: 'hdr',
                httpcont: 'req_body_match',
                acl: 'always_true',
                isTcp: false,
                isHttp: false,
                isHttpHead: false,
                isHttpCont: false,
                isAcl: false,
                tcpForm: {
                    param: '',
                    header: ''
                },
                httpForm: {
                    param: '',
                    header: ''
                },
                httpHeadForm: {
                    param: '',
                    header: ''
                },
                httpContForm: {
                    param: '',
                    header: ''
                },
                aclForm: {
                    param: '',
                    header: ''
                },
            }
        },
        created() {

        },
        methods: {
            chang(val){
            console.log('val:',val)
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            addTcp() {
                this.isTcp = true;
            },
            addHttpline() {
                this.isHttp = true;
            },
            validForm(form){
                if(form=='tcpForm'){
                  if(this.tcpForm.param==''){
                      this.$message({
                          type:'warning',
                          message:'参数不能为空'
                      });
                      return false
                  }
                  if(this.tcp=='nbsrv2'&&this.tcpForm.header==''){//服务器池
                        this.$message({
                            type:'warning',
                            message:'服务器池不能为空'
                        });
                      return false
                    }
                }

                if(form=='httpForm'){
                    if(this.httpForm.param==''){
                        this.$message({
                            type:'warning',
                            message:'参数不能为空'
                        });
                        return false
                    }
                }

                if(form=='httpHeadForm'){
                    if(this.httpHeadForm.param==''){
                        this.$message({
                            type:'warning',
                            message:'参数不能为空'
                        });
                        return false
                    }
                    if((this.httphead=='hdr2'||this.httphead=='hdr_beg2'||this.httphead=='hdr_end2'||this.httphead=='hdr_sub2'
                        ||this.httphead=='hdr_reg2'||this.httphead=='hdr_val2'||this.httphead=='hdr_cnt2')
                        &&this.httpHeadForm.header==''){//服务器池
                        this.$message({
                            type:'warning',
                            message:'服务器池不能为空'
                        });
                        return false
                    }
                }

                if(form=='httpContForm'){
                    if(this.httpContForm.param==''){
                        this.$message({
                            type:'warning',
                            message:'参数不能为空'
                        });
                        return false
                    }
                }

                // if(form=='aclForm'){
                //     if(this.acl=='req_ver'&&this.aclForm.param==''){
                //         this.$message({
                //             type:'warning',
                //             message:'参数不能为空'
                //         });
                //         return false
                //     }
                // }


                return true
            },


            saveTcp(form) {
                if(this.validForm(form)){
                    let val;
                    if (this.tcp=='nbsrv2') {
                        this.tcpForm.header = '(' + this.tcpForm.header + ')';
                        this.tcp=this.tcp.substring(0,this.tcp.indexOf(2));
                    }
                    val = this.tcp + this.tcpForm.header +' ' + this.tcpForm.param;
                    this.addInfo.content = this.addInfo.content + ' ' + val;
                    this.reset(form);//保存后清空
                    console.log('content:', this.addInfo.content)
                }

            },

            saveHttp(form) {
                if(this.validForm(form)){
                    let val;
                    if (this.httpForm.header) {
                        this.httpForm.header = '(' + this.httpForm.header + ')'
                    }
                    val = this.httpline + this.httpForm.header +' ' + this.httpForm.param;
                    this.addInfo.content = this.addInfo.content + ' ' + val;
                    console.log('textarea2:', this.addInfo.content);
                    this.reset(form);//保存后清空
                }

            },

            saveHttpHead(form) {
                if(this.validForm(form)){
                    let val;
                    if (this.httphead=='hdr2') {
                        this.httpHeadForm.header = '(' + this.httpHeadForm.header + ')';
                        this.httphead=this.httphead.substring(0,this.httphead.indexOf(2));
                    }
                    if (this.httphead=='hdr_beg2') {
                        this.httpHeadForm.header = '(' + this.httpHeadForm.header + ')';
                        this.httphead=this.httphead.substring(0,this.httphead.indexOf(2));
                    }
                    if (this.httphead=='hdr_end2') {
                        this.httpHeadForm.header = '(' + this.httpHeadForm.header + ')';
                        this.httphead=this.httphead.substring(0,this.httphead.indexOf(2));
                    }
                    if (this.httphead=='hdr_sub2') {
                        this.httpHeadForm.header = '(' + this.httpHeadForm.header + ')';
                        this.httphead=this.httphead.substring(0,this.httphead.indexOf(2));
                    }
                    if (this.httphead=='hdr_reg2') {
                        this.httpHeadForm.header = '(' + this.httpHeadForm.header + ')';
                        this.httphead=this.httphead.substring(0,this.httphead.indexOf(2));
                    }
                    if (this.httphead=='hdr_val2') {
                        this.httpHeadForm.header = '(' + this.httpHeadForm.header + ')';
                        this.httphead=this.httphead.substring(0,this.httphead.indexOf(2));
                    }
                    if (this.httphead=='hdr_cnt2') {
                        this.httpHeadForm.header = '(' + this.httpHeadForm.header + ')';
                        this.httphead=this.httphead.substring(0,this.httphead.indexOf(2));
                    }
                    val = this.httphead + this.httpHeadForm.header +' ' + this.httpHeadForm.param;
                    this.addInfo.content = this.addInfo.content + ' ' + val;
                    console.log('textarea3:', this.addInfo.content)
                    this.reset(form);//保存后清空
                }

            },

            saveHttpCont(form) {
                if(this.validForm(form)){
                    let val;
                    // this.isHttpCont = false;
                    this.reset(form);
                    if (this.httpContForm.header) {
                        this.httpContForm.header = '(' + this.httpContForm.header + ')'
                    }
                    val = this.httpcont + this.httpContForm.header +' ' + this.httpContForm.param;
                    this.addInfo.content = this.addInfo.content + ' ' + val;
                    console.log('textarea4:', this.addInfo.content);
                    this.reset(form);//保存后清空
                }

            },

            saveAcl(form) {
                let val;
                // req_ver2
                if (this.acl=='req_ver2') {
                    this.aclForm.header = '(' + this.aclForm.header + ')';
                    this.acl=this.acl.substring(0,this.acl.indexOf(2));
                }

                if (this.acl=='url_beg2') {
                    this.aclForm.header = '(' + this.aclForm.header + ')';
                    this.acl=this.acl.substring(0,this.acl.indexOf(2));
                }

                if (this.acl=='method2') {
                    this.aclForm.header = '(' + this.aclForm.header + ')';
                    this.acl=this.acl.substring(0,this.acl.indexOf(2));
                }

                if (this.acl=='method3') {
                    this.aclForm.header = '(' + this.aclForm.header + ')';
                    this.acl=this.acl.substring(0,this.acl.indexOf(3));
                }
                if (this.acl=='method4') {
                    this.aclForm.header = '(' + this.aclForm.header + ')';
                    this.acl=this.acl.substring(0,this.acl.indexOf(3));
                }
                if (this.acl=='method5') {
                    this.aclForm.header = '(' + this.aclForm.header + ')';
                    this.acl=this.acl.substring(0,this.acl.indexOf(4));
                }

                if (this.aclForm.header) {
                    this.aclForm.header = '(' + this.aclForm.header + ')'
                }
                val = this.acl + this.aclForm.header +' ' + this.aclForm.param;
                this.addInfo.content = this.addInfo.content + ' ' + val;
                this.reset(form);
            },

            addMark() {
                this.addInfo.content = this.addInfo.content + ' ' + this.mark;
            },
            validate(){
                if(this.addInfo.name.trim()==''){
                    this.$message({
                        type: 'warning',
                        message: '名称不能为空'
                    });
                    return false
                }
                if(this.addInfo.content==''){
                    this.$message({
                        type: 'warning',
                        message: '操作内容不能为空'
                    });
                    return false
                }
                return true
            },
            submitForm(formName) {
                if(this.validate()){
                    getAclAdd(this.addInfo).then((resp) => {
                        if (resp.success == true) {
                            this.$message({
                                type: 'success',
                                message: '新建成功！'
                            });
                            this.addVisible = false;
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
                this.addVisible = false;
                this.$refs[formName].resetFields();
                console.log(formName, '------',this.$refs[formName]);
            },
            clearCont(){
               this.addInfo.content='';
            },
            reset(from){
                console.log('from:',from)
                if(from=='tcpForm'){
                    this.isTcp=false;
                    this.tcpForm={
                        param: '',
                        header: ''
                    };
                }else if(from=='httpForm'){
                    this.isHttp=false;
                    this.httpForm={
                        param: '',
                        header: ''
                    };
                }else if(from=='httpHeadForm') {
                    this.isHttpHead=false;
                    this.httpHeadForm={
                        param: '',
                        header: ''
                    };
                    console.log('HttpHeadForm:',this.HttpHeadForm)
                }else if(from=='httpContForm') {
                    this.isHttpCont=false;
                    this.httpContForm={
                        param: '',
                        header: ''
                    };
                }else {
                    this.isAcl=false;
                    this.aclForm={
                        param: '',
                        header: ''
                    };
                }
            }
        }
    }
</script>
<style lang="scss">
    .checbox_20 {
        margin-left: 20px;
    }
    .acl_from .acl_char{
        margin-left: 18px;
    }
</style>
