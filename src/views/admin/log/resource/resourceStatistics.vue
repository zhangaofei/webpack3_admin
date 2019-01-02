<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a >统计与分析</a></li>
                <li class="active">资源统计与分析</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box paddint_b_20" style=";padding-left: 16px">
                        <div class="box-header" style="height:82px">
                            <h3 class="box-title" id="user_set_box_title"
                                style="margin-left:0px;float:left;font-size:18px;color: #4A4D4F;line-height:60px; height:60px;">
                                资源统计与分析
                            </h3>
                        </div>
                        <div class="log-tab">
                            <el-tabs type="border-card">
                                <el-tab-pane label="访问资源排行">
                                    <accessResourceRank></accessResourceRank>
                                </el-tab-pane>
                                <el-tab-pane label="下载资源排行">
                                    <transportResource type="down"
                                                       title="下载资源排行榜"
                                                       loadType="下载文件格式占比"
                                                       barId="downloadResourceBar"
                                                       pieId="downloadResourcePie">
                                    </transportResource>
                                </el-tab-pane>
                                <el-tab-pane label="上传资源排行">
                                    <!--<uploadResourceRank></uploadResourceRank>-->
                                    <transportResource type="up"
                                                       title="上传资源排行榜"
                                                       loadType="上传文件格式占比"
                                                       barId="uploadResourceBar"
                                                       pieId="uploadResourcePie">
                                    </transportResource>
                                </el-tab-pane>

                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import accessResourceRank from "./accessResourceRank"
    //    import downloadResourceRank from "./downloadResourceRank.vue"
    //    import uploadResourceRank from "./uploadResourceRank.vue"
    import transportResource from "./transportResource"

    export default {
        components: {
            accessResourceRank,
//            downloadResourceRank,
//            uploadResourceRank,
            transportResource
        },
        data() {
            return {}
        },
        computed: {},
        created() {
        },
        watch: {//深度 watcher
            'logForm.type': 'typeChange'
        },
        methods: {
            showDetail() {
                this.detailVisible = true;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.resourceQuery.pageSize = val;
            },
            handleCurrentChange(val) {
                this.resourceQuery.currentPage = val;
            }
        }
    }
</script>
<style>
</style>

