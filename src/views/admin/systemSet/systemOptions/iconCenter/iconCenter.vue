<template>
    <div class="iconCenter">
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a >系统选项</a></li>
                <li class="active">图标中心</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="overflow: hidden;">
                        <div class="box-header vlan-header-title">
                            <h3 class="box-title">图标中心</h3>
                        </div>

                        <template>
                            <el-row class="icon_center_content set_margin_left15 padding_v_20">
                                <a @click="showDialog" class="uploadIcon">
                                    <i class="fa fa-plus"></i>
                                    <span>上传新图标</span>
                                </a>
                                <a @click="deleteIcon">
                                    <i class="fa fa-trash"></i>
                                    <span>删除</span>
                                </a>
                            </el-row>
                            <div>
                                <div>
                                    <div style="overflow-x: auto; text-align: center;">
                                        <el-row tag="ul" class="icon_list">
                                            <el-col v-for="(item,index) in reIconList" :key="index" tag="li" :style="{'border-bottom': item.isSetBorder0?'0':'1px solid #D3DCE6'}" class="icon_li">
                                                <el-checkbox v-model="item.checkbox" class="checkbox"></el-checkbox>
                                                <a>
                                                    <img :src="item.icon" title="" alt="" />
                                                </a>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="row padding_v_20" style="margin-top:8px;padding: 20px 40px; text-align: right;" >
                                        <div class="block" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="listQuery.page"
                                                    :page-sizes="[28]"
                                                    :page-size="listQuery.page_size"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="listQuery.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </div>
                </div>
            </div>
            <UploadIcon
                :dialogStatus="visibleDialog"
                @getIconList="getIconList"
                @closeDialogs="closeDialogs"></UploadIcon>
        </section>
    </div>
</template>

<script>
    import {iconListData,delIcon} from '../../../../../api/systemSet/sysConfig/iconCenter'
    import UploadIcon from './uploadIcon.vue';
    export default {
        name: '',
        components: {
            UploadIcon
        },
        data () {
            return {
                visibleDialog: false,
                listQuery: {
                    page: 1,
                    page_size: 28,
                    total: 9
                },
                borderBottom0: {
                    'border-bottom': 0
                },
                iconList: []
            }
        },
        created () {
            this.getIconList();
        },
        computed: {
            reIconList () {
                /*
                * 重置 数据， 根据数据中isSetBorder0变量控制图标列表的边框，保证底部边框不重叠
                * 根据数据条数，和每行所占个数，计算出数据共记多少行；
                * 根据数据行数和数据条数，计算最后一行中数据个数，循环设置最后一行数据的 isSetBorder0 为 true
                * */
                let maxLine = parseInt(this.iconList.length/7); //计算数据最大行数
                let lastLineNum = this.iconList.length%7; // 计算数据最后一行个数
                if(this.iconList.length == 0) return; // 数据是否是初始化数据，如果是，直接返回
                // 最大行数 在计算中的 特殊可能 --- 数据小于 每行的 个数时 且不为空 最少是一行
                // 数据除以不能能被每行个数整除时，行数是整除时 +1
                maxLine = (this.iconList.length > 0 && this.iconList.length/7 < 1) ? 1 : (this.iconList.length/7).toString().indexOf('.') != -1 ? maxLine + 1 : maxLine;
                // 如果数据条数大于 0 数据条数%7 等于0 ，则最后一样有7条数据
                lastLineNum = (this.iconList.length > 0 && this.iconList.length%7 == 0) ? 7 : lastLineNum;
                for (var i = 0; i < lastLineNum; i++){
                    if(this.iconList.length/7 > 1){ // 数据行数 大于 1 时设置逻辑
                        this.$set(this.iconList[7*(maxLine-1)+i], 'isSetBorder0', true);
                    } else { // 数据 行数小于等于 1 时设置逻辑
                        this.$set(this.iconList[i], 'isSetBorder0', true);
                    }
                };
                return this.iconList;
            }
        },
        methods: {
            // 获取列表 数据
            getIconList () {
                iconListData({page: this.listQuery.page, page_size: this.listQuery.page_size}).then( res => {
                    if(res.msg == "success"){
                        this.listQuery.total = res.data.items.page_count;
                        this.iconList = res.data.items.res.map(item => {
                            return {
                                checkbox: false,
                                icon: item.icon_path,
                                isSetBorder0: false,
                                file_name: item.file_name,
                                id: item.id
                            }
                        });
                        console.log(this.iconList);
                    }
                }).catch( res => {
                    this.$message({ message: res.status, type: 'error' })
                })
            },
            // 改变翻页 条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.page_size = val;
                    that.getIconList();
                });
                //this.getList();
            },
            // 改变当前页
            handleCurrentChange(val) {
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.page = val;
                    console.log(`当前页: ${that.listQuery.page}`);
                    that.getIconList();
                });
            },
            // 勾选表格时
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            // 显示上传弹框
            showDialog () {
                this.visibleDialog = true;
            },
            // 关闭弹框
            closeDialogs () {
                this.visibleDialog = false;
            },
            // 删除图标
            deleteIcon () {
                var flag = false;
                this.iconList.map(item => {
                    if(item.checkbox == true){
                        return flag = true;
                    }
                });
                if (!flag) {
                    this.$message({
                        type: 'error',
                        message: '请选择要删除的图标!'
                    });
                    return;
                };
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var iconArr = [];
                    for (var i = 0; i < this.iconList.length; i++) {
                        if(this.iconList[i].checkbox == true){
                            iconArr.push(this.iconList[i].id);
                        }
                    };
                    delIcon({id: iconArr}).then(res => {
                        if(res.msg == "success"){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getIconList();
                        };
                        if(res.status == -1){
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped="scoped" lang="scss">
    .icon_center_content{
        /*border-top: 1px solid #D3DCE6;*/
        margin-top: 10px;
    }
    .icon_list{
        display: inline-block;
        width: 1122px;
        border: 1px solid #D3DCE6;
        margin: 10px 30px;
        .icon_li{
            width: 160px;
            height: 160px;
            position: relative;
            border-right: 1px solid #D3DCE6;
            a{
                display: inline-block;
                width: 80px;
                height: 80px;
                margin: 40px;
                border: 1px solid #EBEEF5;
                img{
                    width: 100%;
                    height: 100%;
                    border: 0;
                }
            }
            .checkbox{
                position: absolute;
                left: 14px;
                top: 14px;
                margin: 0;
            }
        }
        .icon_li:nth-of-type(7n){
            border-right: 0;
        }
    }
    .uploadIcon{
        margin: 0 20px;
        margin-right: 30px;
    }
</style>