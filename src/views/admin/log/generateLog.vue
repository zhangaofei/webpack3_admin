<template>
    <el-dialog
            class="public"
        title="日志生成"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <div class="dialog_body">
            <div class="content_center clearfixed">
                <div class="content_title cs_icon_name left">
                    <label>文件名称</label>
                </div>
                <div class="content_main left">
                    <div class="line">
                        <el-input v-model="dataJson.fileName" placeholder="请输入内容"></el-input>
                        <p class="tips" v-if="showTips">{{tipsContent}}</p>
                    </div>
                    <p>日志文件生成完毕后，请前去日志下载页面进行下载</p>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer foot">
            <span class="btn_middle cancle" @click="handleClose">取消</span>
            <el-button class="primary confirm btn_middle" type="primary" @click="submitForm">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {fetch} from "../../../utils/fetch";

    export default {
        name: "generateLog",
        props: {
            visibleDialog: Boolean,
            type: String,
            dataJson: Object
        },
        data () {
            return {
                dialogVisible: false,
                showTips: false,
                tipsContent: ''
            }
        },
        watch: {
            visibleDialog (n, o) {
                if(n) this.dialogVisible = n;
            },
            fileNmae(n, o) {
                if(n && n !== '') {
                    this.showTips = false;
                    this.tipsContent = "";
                };
            }
        },
        computed: {
            fileNmae () {
                return this.dataJson.fileName;
            }
        },
        methods: {
            handleClose () {
                this.dialogVisible = false;
                this.$parent.visibleDialog = false;
            },
            submitForm () {
                console.log(this.type)
                if(this.dataJson.fileName == "") {
                    this.showTips = true;
                    this.tipsContent = "请输入文件名";
                    return;
                };
                let url = '';
                if (this.type === 'user') {
                    url = '/es-management/api/search/user/createDownload';
                } else if (this.type == 'admin') {
                    url = '/es-management/api/search/admin/createDownload';
                } else if (this.type == 'system') {
                    url = '/es-management/api/search/system/createDownload';
                } else if (this.type === 'resource') {
                    url = '/es-management/api/search/res/createDownload';
                };
                fetch({
                    url: url,
                    method: 'post',
                    body: this.dataJson
                }).then(res => {
                    if(res.code == 200) {
                        this.$message.success("文件正在生成，请到下载页查看");
                        this.handleClose();
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(error => this.$message.error(error));
            }
        }
    }
</script>

<style scoped lang="scss">
    .dialog_body{
        padding: 30px 40px;
        text-align: center;
        .content_center{
            display: inline-block;
            .content_title{
                margin-right: 20px;
                label{
                    font-size: 16px;
                    font-weight: 400;
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                }
            }
            .content_main{
                position: relative;
                p{
                    margin-top: 20px;
                    margin-bottom: 0;
                }
                p.tips{
                    margin: 0;
                    line-height: 1;
                    color: #ff4949;
                    position: absolute;
                    left: 0;
                    top: 44px;
                    font-size: 12px;
                }
            }
        }
    }
</style>