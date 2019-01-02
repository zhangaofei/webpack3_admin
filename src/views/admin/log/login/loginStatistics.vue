<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a>统计与分析</a></li>
                <li class="active">用户登录与统计分析</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box paddint_b_20" style=";padding-left: 16px">
                        <div class="box-header" style="height:82px">
                            <h3 class="box-title" id="user_set_box_title"
                                style="margin-left:5px;float:left;font-size:18px;color: #4A4D4F;line-height:60px; height:60px;">
                                用户登录与统计分析
                            </h3>
                        </div>
                        <div class="log-tab">
                            <el-tabs type="border-card">
                                <el-tab-pane label="用户登录排行">
                                    <userLoginRank></userLoginRank>
                                </el-tab-pane>
                                <el-tab-pane label="用户登录统计">
                                    <userLoginStatistics></userLoginStatistics>
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
    import userLoginRank from './userLoginRank'
    import userLoginStatistics from './userLoginStatistics'

    export default {
        components: {
            userLoginRank, userLoginStatistics
        },
        data() {
            return {}
        },
        computed: {},
        created() {
        },
        watch: {},
        methods: {}
    }
</script>
<style>
    .user-log .el-select {
        min-width: 200px;
        width: 200px;
    }

    .user-log .el-select > .el-input {
        margin-left: 15px;
    }

    .title {
        margin: 0 auto;
        width: 200px;
        vertical-align: middle;
        height: 62px;
        font-size: 20px;
        color: #606366;
        line-height: 40px;
        height: 40px;
    }

    .logForm .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 50px;
    }

    .user-log-info .el-input {
        position: relative;
        display: inline-block;
        width: 200px;
        margin-left: 96px;
    }

    .log-config {
        width: 200px;
        margin-left: 60px;
    }

    strong {
        color: red;
    }

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