<template>
    <div style="width:100%;height: 100%;">
        <div class="d_main" style="position: absolute;top: 0;left: 250px;bottom: 0;right:0;margin: auto;width: 1000px;height: 500px;">
            <div style="display: inline-block;position: absolute;top: 165px;font-size: 20px;color: #999;">
                <!--<p>404</p>-->
                <p>内部服务器错误</p>
                <p>您查找的资源存在问题，无法显示</p>
                <p><a  @click="goHome">返回首页>></a></p>
            </div>
            <div>
                <img src="../../assets/new500.png" alt="404">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            message() {
                return '特朗普说这个页面你不能进......'
            }
        },
        methods:{
            goHome(){
                this.$router.push({path:'/admin/home'})
            }
        }
    }
</script>