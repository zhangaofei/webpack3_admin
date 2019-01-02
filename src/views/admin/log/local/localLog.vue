<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a >日志管理</a></li>
                <li class="active">日志查询</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box paddint_b_20" style=";padding-left: 16px">
                        <div class="box-header clude_tab" style="height:82px">
                            <h3 class="box-title" id="user_set_box_title"
                                style="margin-left:5px;float:left;font-size:18px;color: #4A4D4F;">
                                日志查询
                            </h3>
                        </div>
                        <div class="log-tab">
                            <el-tabs type="border-card">
                                <el-tab-pane label="管理员日志">
                                    <adminLog></adminLog>
                                </el-tab-pane>

                                <el-tab-pane label="用户日志">
                                    <userLog></userLog>
                                </el-tab-pane>

                                <el-tab-pane label="系统日志">
                                    <systemLog></systemLog>
                                </el-tab-pane>

                                <el-tab-pane label="资源日志">
                                    <resLog></resLog>
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

    import adminLog from "./adminLog"
    import systemLog from "./systemLog"
    import userLog from "./userLog"
    import resLog from "./resLog"

    export default {
        components: {
            adminLog,
            systemLog,
            userLog,
            resLog
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .log-tab .el-tabs__item {
        padding: 10px 16px;
        height: 60px;
        font-size: 16px;
        color: #A5AAAF;
    }

    .log-tab .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background-color: #fff;
        color: #3C8DBC;
        border-right-color: #d1dbe5;
        border-left-color: #d1dbe5;
    }
</style>