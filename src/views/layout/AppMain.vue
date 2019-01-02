<template>
    <section class="app-main" style="overflow-y: hidden;">
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>
<script>
    export default {
        name: 'AppMain',
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }

        }

    }

//    console.log(this.key())
</script>
<style>
    /*.app-main a{*/
        /*color: #3c8dbc;*/
    /*}*/
    /*.app-main a:hover{*/
        /*color: #337ab7;*/
    /*}*/
    /*.app-main a:active{*/
        /*color: #337ab7;*/
    /*}*/
</style>
