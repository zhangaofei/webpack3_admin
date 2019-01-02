<template>
    <div>
        <div style="width: 100%;min-height: 600px;margin-top: 150px">

            <div class="multiple-condition">

                <el-tag @close="handleClose('inp')"
                        v-show="options[2].checked"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    用户名：<input v-model="group"
                               class="tag-input"/>
                </el-tag>


                <el-tag @close="handleClose('inp')"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    用户组：
                    <select class="tag-input" size="mini">
                        <option value ="volvo">
                            <el-checkbox v-model="test">语文组</el-checkbox>
                        </option>
                        <option value ="saab">
                            <el-checkbox >数学组</el-checkbox>
                        </option>
                        <option value="opel">
                            <el-checkbox >外语组</el-checkbox>
                        </option>
                        <option value="audi">
                            <el-checkbox >物理组</el-checkbox>
                        </option>
                    </select>
                </el-tag>

                <el-tag @close="handleClose('inp')"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    日期：
                    <el-date-picker
                            v-model="dateRange"
                            type="daterange"
                            size="small"
                            style="margin-left: 0;height: 35px;border: none"
                            placeholder="选择日期范围">
                    </el-date-picker>
                </el-tag>


                <el-tag @close="handleClose('inp')"
                        key="inp"
                        :closable="true"
                        :close-transition="false">
                    用户组：
                    <el-select v-model="groupValue"
                               size="mini"
                               placeholder="请选择"
                               popper-class="tag-select"
                               style="border: none;height: 30px">
                        <el-option
                                key="k1"
                                label="语文组"
                                value="k1">
                        </el-option>

                        <el-option
                                key="k2"
                                label="数学组"
                                value="k2">
                        </el-option>
                    </el-select>
                </el-tag>

            </div>


            <!------------------------------------------------------------------>
            <div class="block user-log-info"
                 style="float:left;margin-left: 0px;width: 100%;">
                <div style="width: 220px;float:left;margin-left: -15px;">
                    <el-select v-model="optionValue"
                               placeholder="添加条件"
                               style="margin-left: 0px"
                               popper-class="log-select">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                            <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left: 30px ;float:left;width: 400px">

                    <span style="margin-left: 15px">
                        <el-button size="small" style="width: 100px;height:35px;font-size:15px;background-color: #3C8DBC">下载</el-button>
                    </span>

                </div>
            </div>

            <div>
                <div style="margin-left: 20px ;">
                    <div class="block">
                        <label>
                            <el-date-picker
                                    v-model="dateRange"
                                    type="daterange"
                                    size="small"
                                    style="margin-left: 25px;height: 35px;width: 300px;"
                                    placeholder="选择日期范围">
                            </el-date-picker>
                        </label>
                    </div>
                </div>
            </div>
            <div>{{dialogVisible}}</div>
            <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

            <el-dialog
                    title="提示"
                    v-model="dialogVisible"
                    size="tiny"
                    :before-close="dialogHandleClose">
                <span>这是一段信息</span>
            </el-dialog>

</div>
        <!--------------------------------------------------------------------->
    </div>
</template>


<script>
    export default{
        components: {
        },
        data(){
            return {

                dialogVisible: false,

                beginTime:'2016-12-03',
                endTime:'2017-07-03',

                dateRange:'',
                optionValue:'',

                group:'',
                groupValue:[],

                test:true,

                category:[{
                    key:'userLog',
                    name:'用户日志'
                },{
                    key:'managerLog',
                    name:'管理员日志'
                },{
                    key:'systemLog',
                    name:'系统日志'
                }],

                checkedLevel:["info","warning","error"],
                level:["info","warning","error"],//日志级别


                checked:false,
                checkedId: [],

                options: [{
                    value: '1',
                    label: '日期',
                    checked:false
                }, {
                    value: '2',
                    label: '级别',
                    checked:false
                }, {
                    value: '3',
                    label: '用户名',
                    checked:false
                },{
                    value: '4',
                    label: '用户组',
                    checked:false
                },{
                    value: '5',
                    label: '认证服务器',
                    checked:false
                }],

                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: true,
                inputValue: ''
            }
        },
        computed:{

        },
        created(){

        },
        watch: {//深度 watcher
        },
        methods: {
            dialogHandleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },


            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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

<!--

<style scoped>

    .log-tag{
        float: left;
        width: 80px;
        /*background-color: yellow;*/
    }
    .log-download-checkbox{
        float: left;
        min-width: 600px;
        /*background-color: #b1b1b1;*/
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

    .multiple-condition .el-tag{
        height: 32px;
        line-height: 30px;
        margin-left: 10px;
        color: #3C8DBC;
        background-color: #fff;
        border: 1px solid #3C8DBC ;
    }

    .multiple-condition .el-tag *{
        color: #3C8DBC;
    }



</style>

<style>
    /*.el-tag .el-input&#45;&#45;mini .el-input__inner {*/
        /*border: none!important;*/
    /*}*/

    /*.el-tag .el-input&#45;&#45;small .el-input__inner {*/
        /*border: none!important;*/
    /*}*/


</style>

-->
