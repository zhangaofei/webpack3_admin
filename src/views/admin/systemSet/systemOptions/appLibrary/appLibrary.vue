<template>
    <div class="iconCenter">
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a >系统选项</a></li>
                <li class="active">应用库</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="overflow: hidden;">
                        <div class="box-header vlan-header-title">
                            <h3 class="box-title">应用库</h3>
                        </div>

                        <div class="app_library_main">
                            <el-row>
                                <el-col>
                                    <a class="function_btn_main" @click="addAppLibrary">
                                        <i class="fa fa-plus"></i>
                                        <span>新建</span>
                                    </a>
                                    <a class="function_btn_main" @click.stop="batchDeleteLibrary">
                                        <i class="fa fa-trash"></i>
                                        <span class="function_btn">批量删除</span>
                                    </a>
                                    <a class="function_btn_main" @click="bulkImport">
                                        <i class="fa fa-download"></i>
                                        <span class="function_btn bulk_import">批量导入</span>
                                    </a>
                                    <a class="function_btn_main" @click="bulkExport">
                                        <i class="fa fa-upload"></i>
                                        <span class="function_btn">批量导出</span>
                                    </a>
                                </el-col>
                            </el-row>
                            <el-row class="table_row">
                                <el-col>
                                    <el-table
                                            :data="tableData"
                                            border
                                            header-row-class-name="header_row_class"
                                            @selection-change="handleSelectionChange"
                                            style="width: 100%">
                                        <el-table-column
                                                type="selection"
                                                header-align="center"
                                                align="center"
                                                width="55">
                                        </el-table-column>
                                        <el-table-column
                                                prop="app_name"
                                                show-overflow-tooltip
                                                header-align="center"
                                                align="center"
                                                label="应用名称"
                                                width="280">
                                        </el-table-column>
                                        <el-table-column
                                                prop="description"
                                                label="说明"
                                                show-overflow-tooltip
                                                header-align="center"
                                                align="center"
                                                min-width="280">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                header-align="center"
                                                align="center"
                                                label="操作"
                                                width="180">
                                            <template slot-scope="scope">
                                                <el-button
                                                        @click="eyeRow(scope.$index, scope.row)"
                                                        type="text"
                                                        size="small">
                                                    <i class="fa fa-eye"></i>
                                                </el-button>
                                                <el-button
                                                        @click="editRow(scope.$index, scope.row)"
                                                        type="text"
                                                        size="small">
                                                    <i class="fa fa-pencil"></i>
                                                </el-button>
                                                <el-button
                                                        @click="deleteRow(scope.$index, scope.row)"
                                                        type="text"
                                                        size="small">
                                                    <i class="fa fa-trash-o"></i>
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                            <div class="paging_main">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="query.current_page"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="query.page_size"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="query.total">
                                </el-pagination>
                            </div>
                        </div>

                        <AppLibrary :dataJson="dataJson" :type="type" :visibleDialog="visibleDialog"></AppLibrary>

                        <el-dialog
                            title="批量导入"
                            :visible.sync="uploadVisible"
                            size="small"
                            :before-close="handleClose"
                            custom-class="custom_dialog_class public minWidth600"
                        >
                            <div style="text-align: center;">
                                <el-upload
                                    action="/es-management/api/appLibrary/batchImport"
                                    :show-file-list="true"
                                    :on-success="onSuccess"
                                    :before-upload="beforeUpload"
                                    class="upload-demo function_btn_main"
                                    ref="upload"
                                    :file-list= 'fileList'
                                    style="text-align: center"
                                    drag
                                    :multiple="false"
                                    :limit="1"
                                    name="file"
                                    :with-credentials="true"
                                    :auto-upload="false"
                                    accept="excel">
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <div style="margin-bottom: 5px" class="el-upload__tip" slot="tip">只能上传xls或xlsx格式的文件</div>
                                </el-upload>
                            </div>

                            <div class='form-footer ' slot="footer" >
                                <div class="foot">
                                    <el-button
                                            size="small" type="primary" class="primary confirm btn_middle"
                                            @click="downloadModel">
                                        模板下载
                                    </el-button>
                                    <el-button
                                            class="primary confirm btn_middle"
                                            type="primary"
                                            style="width:140px!important;"
                                            @click="submitUpload">
                                        上传到服务器
                                    </el-button>
                                </div>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {fetch} from 'utils/fetch';
    import AppLibrary from './appLibraryInfo.vue';
    export default {
        name: 'appLibrary',
        components: {
            AppLibrary
        },
        data () {
            return {
                files: [],
                tableData: [],
                fileList: [],
                exportIds:[],
                multipleSelection: [],
                dataJson: {
                    app_name: '',
                    description: '',
                    app_urls: [],
                    url: ''
                },
                query: {
                    current_page: 1,
                    page_size: 10,
                    total: 0,
                    terms: {},
                    fuzziness : {}
                },
                visibleDialog: false,
                type: '',
                uploadVisible: false
            }
        },
        created () {
            this.getAppLibraryList();
        },
        watch: {
            fileList (nVal, oVal) {
                if(nVal) {
                    this.filelist = this.arrayUnique(this.filelist3, "name");
                }
            }
        },
        methods: {
            getAppLibraryList () {
                fetch({
                    url: '/es-management/api/appLibrary/list',
                    method: 'post',
                    body: {
                        "pageIndex": this.query.current_page,
                        "pageSize": this.query.page_size,
                        "terms": this.query.terms,
                        "fuzziness" : this.query.fuzziness
                    }
                }).then(res => {
                    if(res.code == 200) {
                        this.tableData = res.data.data;
                        this.query.total = res.data.total;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(error => this.$message.error(error));
            },
            // 改变每页条数
            handleSizeChange(val) {
                this.query.page_size = val;
                this.getAppLibraryList();
            },
            // 改变当前页页码
            handleCurrentChange(val) {
                this.query.current_page = val;
                this.getAppLibraryList();
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
                this.exportIds=val.map((item)=>{
                    return item.id
                });
                // console.log('ids',this.ids,val)
            },
            eyeRow (index, row) {
                this.visibleDialog = true;
                this.type = 'view';
                this.dataJson = {
                    app_name: row.app_name,
                    description: row.description,
                    app_urls: row.app_urls,
                    url: row.app_urls.join(",").replace(/([,])/g, '\r')
                };
            },
            editRow (index, row) {
                this.visibleDialog = true;
                this.type = 'edit';
                this.dataJson = {
                    id: row.id,
                    app_name: row.app_name,
                    description: row.description,
                    app_urls: row.app_urls,
                    url: row.app_urls.join(",").replace(/([,])/g, '\r'),
                    create_at: row.create_at
                };
            },
            // 应用库单条删除
            deleteRow (index, row) {
                let id = row.id;
                this.$confirm('确定永久删除该应用库?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch({
                        url: '/es-management/api/appLibrary/delete/' + id,
                        method: 'get'
                    }).then(res => {
                        if(res.code == 200) {
                            this.getAppLibraryList();
                            this.$message({ type: 'success', message: '删除应用库成功!' });
                        } else {
                            this.$message({ type: 'error', message: res.message });
                        }
                    }).catch(error => {
                        this.$message({ type: 'error', message: error });
                    })
                }).catch(() => {

                });
            },
            batchDeleteLibrary () {
                let ids = this.multipleSelection.map(item => item.id);
                if(this.multipleSelection.length == 0) return this.$message.error('请选择要删除的应用库')
                this.$confirm('确定永久删除所选应用库?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch({
                        url: '/es-management/api/appLibrary/deleteBatch',
                        method: 'post',
                        body: {
                            ids: ids
                        }
                    }).then(res => {
                        if(res.code == 200) {
                            this.getAppLibraryList();
                            this.$message({ type: 'success', message: '删除应用库成功!' });
                        } else {
                            this.$message({ type: 'error', message: res.message });
                        }
                    }).catch(error => {
                        this.$message({ type: 'error', message: error });
                    })
                }).catch(() => {

                });
            },
            addAppLibrary () {
                this.visibleDialog = true;
                this.type = 'add';
                this.dataJson = {
                    app_name: '',
                    description: '',
                    app_urls: [],
                    url: ''
                };
            },
            bulkImport () {
                console.log('批量导入功能')
                this.uploadVisible = true;
            },
            bulkExport () {
                if(this.multipleSelection.length>0){
                    fetch({
                        url: '/es-management/api/appLibrary/batchExport',
                        method: 'post',
                        body: {
                            pageIndex: 1,
                            pageSize: 10,
                            terms: {},
                            termsList:{
                                id:this.exportIds
                            },
                            fuzziness : {}
                        }
                    }).then(res => {
                        if(res.code == 200) {
                            window.location.href = res.data;
                        }
                    })
                }else {
                   this.$message({
                       type:'warning',
                       message:'请选择导出内容！'
                   })
                }
            },
            submitUpload () {
                this.$refs.upload.submit();
            },
            downloadModel () {
                fetch({
                    url: '/es-management/api/appLibrary/getAppLibTemplate',
                    method: 'get'
                }).then(res => {
                    if(res.code == 200) {
                        window.location.href = res.data;
                    };
                })
            },
            beforeUpload (file) {
                let suffix = file.name.indexOf(".xls") != -1;
                if(!suffix) this.$message.error("请选择Exce文件进行导入")
                return suffix;
            },
            onSuccess (res, file, fileList) {
                let name = file.name;
                if(res.code == 200) {
                    this.$message.success('文件：'+name+',上传成功');
                    this.uploadVisible = false;
                    this.getAppLibraryList();
                    this.$refs.upload.clearFiles()
                }else{
                    this.$message({
                        type:'warning',
                        message:res.message
                    });
                    this.$refs.upload.clearFiles()
                }
            },
            arrayUnique (arr, name) {
                var hash = {};
                return arr.reduce(function (item, next) {
                    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
                    return item;
                }, []);
            },
            exportAppLibrary () {},
            handleClose () {
                this.uploadVisible = false;
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
        margin: 15px;
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
    .app_library_main{
        padding: 30px 40px;
    }
    .table_row{
        margin-top: 30px;
    }
    /deep/ .el-table .header_row_class{
        th{
            background-color: #eef1f6;
            border-color: #e1e7eb;
        }
    }
    .paging_main{
        padding: 20px 0 0;
        text-align: right;
    }
    .upload-demo{
        display: inline-block;
    }
</style>