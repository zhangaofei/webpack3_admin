<template>

    <div style="width:100%;height: 100%;">
        <div class="d_main" style="position: absolute;top: 0;left: 250px;bottom: 0;right:0;margin: auto;width: 1000px;height: 500px;">
            <div style="display: inline-block;position: absolute;top: 165px;font-size: 20px;color: #999;">
                <p>非常抱歉</p>
                <p>您没有权限访问该页面</p>
                <p><a  @click="goHome">返回首页>></a></p>
            </div>
            <div>
                <img src="../../assets/new401.png" alt="404">
            </div>
        </div>
    </div>
</template>
<script>
    import errGif from 'assets/401.gif';
    import store from "../../store/index";

    export default {
        data() {
            return {
                errGif: errGif + '?' + +new Date(),

            }
        },
        methods: {
            goHome(){
                this.$router.push({path:'/admin/home'})
            },
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .errPage-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: -50px;
    }
</style>
