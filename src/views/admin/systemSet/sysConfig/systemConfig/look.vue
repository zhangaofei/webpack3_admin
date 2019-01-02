<template>
    <div class="web public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'查看系统参数配置'"
                :visible.sync="editVisible"
                @close="handleClose(dialogVisible)"
                size="small"
                custom-class="dialog public"
                top="10%">
            <el-form :model="info" v-show="!dialogVisible" label-width="142px" class="web-form" ref="info">
                <el-form-item label="名称" prop="" >
                    <el-input v-model="info.name" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="系统参数" prop="" >
                    <el-select v-model="info.value" placeholder="请选择" class="el_sel" v-if="info.name=='smart_link_support'" :disabled="true">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="info.value" class="el_put" :disabled="true" v-else></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="" >
                    <el-input v-model="info.remark" class="el_put" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div class='form-footer ' slot="footer"></div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                editVisible: true,
                info:{
                    id:'',
                    name: '',
                    value:'',
                    remark:'',
                },
                dialogVisible: false,
                options: [{
                    value: '1',
                    label: '开启'
                }, {
                    value: '0',
                    label: '关闭'
                }],
            }
        },
        props: {
            currentData: Object,
        },
        created() {
            this.info.id = this.currentData.id;
            this.info.name = this.currentData.name;
            this.info.value = this.currentData.value;
            this.info.remark = this.currentData.remark;
            if(this.info.name == 'update'){
                this.info.name = '更新'
            } else if(this.info.name == 'hash_name'){
                this.info.name = '泛域名'
            } else if(this.info.name == 'login_name'){
                this.info.name = 'https登录域名'
            } else if(this.info.name == 'http_login_name'){
                this.info.name = 'http登录域名'
            } else if(this.info.name == 'smart_link_support'){
                this.info.name = '链路解析'
            }
        },
        methods: {
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
            },
            doInit(currentData){
                this.editVisible = true;
            }
        }
    }
</script>

<style>
    .cs_icon_name label:before{
        content: '*';
        color: #ff4949;
        margin-right: 5px;
    }
    .upload_icon_content .choose_icon {
        margin-left: 20px;
        padding: 8px 20px;
    }
    .view_icon_content{
        margin-left: 20px;
    }
    .icon_choosed{
        width: 72px;
        height: 72px;
    }
</style>
