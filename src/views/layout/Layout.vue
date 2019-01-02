<template>
    <div style="height: 100%; padding-top: 50px;">
        <div class="" style="height: 100%;background: #1c2226;min-width: 1349px;overflow-x: auto">
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <app-main class="content-wrapper" style="min-height:882px;"></app-main>
        </div>
    </div>

    <!--<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">-->
        <!--<div class="sidebar-wrapper">-->
            <!--<Sidebar class="sidebar-container"/>-->
        <!--</div>-->
        <!--<div class="main-container">-->
            <!--<Navbar/>-->
            <!--<App-main/>-->
        <!--</div>-->
    <!--</div>-->

</template>

<script>
    import { Navbar, Sidebar, AppMain } from 'views/layout';
    import store from 'store';
    import router from 'router';
    import permission from 'store/permission';
    // import { Loading } from 'element-ui';
    // let loadingInstance;
    export default {
        name: 'layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar;
            }
        },
        beforeRouteEnter: (to, from, next) => {
            permission.init({
                roles: store.getters.power,
                router: router.options.routes
            });
            next();
        }
    }
</script>
<style rel="stylesheet" lang="" scoped>
    .content-wrapper{
        margin-left:210px;
        overflow-x: hidden;
        min-height:100% !important;
        /*overflow-y: auto !important;*/

}

</style>
