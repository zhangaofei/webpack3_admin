<template>
    <div>
        <header class="main-header">
            <!--左导航-->
            <a href="" class="logo a_logo" style="">
                <!--<span class="logo-mini">-->
                    <!--<img src="../../assets/nav/logo_mini.png" alt="" style="width:32px;max-width:44px; max-height: 44px;border:0;"/>-->
                <!--</span>-->
                <span class="logo-lg">
                    <img src="../../assets/nav/logo_newBig.png" alt="" style="margin-left:-22px;width:105px;max-width:134px; max-height: 44px;border:0;"/>
                </span>
            </a>
            <!--右导航-->
            <nav class="navbar navbar-static-top navbar_bar" id="navbar_bar" role="navigation">
                <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button" v-if="false">
                    <span class="sr-only">Toggle navigation</span>
                </a>
                <!-- Navbar Right Menu -->
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <!-- Messages: style can be found in dropdown.less-->
                        <li class="dropdown messages-menu" style="display: none">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-envelope-o"></i>
                                <span class="label label-success">4</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">You have 4 messages</li>
                                <li>
                                    <!-- inner menu: contains the actual data -->
                                    <ul class="menu">
                                        <li><!-- start message -->
                                            <a href="#">
                                                <div class="pull-left">
                                                    <!--<img src="../../assets/nav/user1-128x128.jpg" class="img-circle" alt="User Image">-->
                                                </div>
                                                <h4>
                                                    Sender Name
                                                    <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                                </h4>
                                                <p>Message Excerpt</p>
                                            </a>
                                        </li><!-- end message -->
                                        ...
                                    </ul>
                                </li>
                                <li class="footer"><a href="#">See All Messages</a></li>
                            </ul>
                        </li>
                        <!-- Notifications: style can be found in dropdown.less -->
                        <li class="dropdown notifications-menu" style="display: none">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-bell-o"></i>
                                <span class="label label-warning">10</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">You have 10 notifications</li>
                                <li>
                                    <!-- inner menu: contains the actual data -->
                                    <ul class="menu">
                                        <li>
                                            <a href="#">
                                                <i class="ion ion-ios-people info"></i> Notification title
                                            </a>
                                        </li>
                                        ...
                                    </ul>
                                </li>
                                <li class="footer"><a href="#">View all</a></li>
                            </ul>
                        </li>


                        <!-- Tasks: style can be found in dropdown.less -->
                        <li class="dropdown tasks-menu" style="display: none">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-flag-o"></i>
                                <span class="label label-danger">9</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">You have 9 tasks</li>
                                <li>
                                    <!-- inner menu: contains the actual data -->
                                    <ul class="menu">
                                        <li><!-- Task item -->
                                            <a href="#">
                                                <h3>
                                                    Design some buttons
                                                    <small class="pull-right">20%</small>
                                                </h3>
                                                <div class="progress xs">
                                                    <div class="progress-bar progress-bar-aqua" style="width: 20%"
                                                         role="progressbar" aria-valuenow="20" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                        <span class="sr-only">20% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li><!-- end task item -->
                                        ...
                                    </ul>
                                </li>
                                <li class="footer">
                                    <a href="#">View all tasks</a>
                                </li>
                            </ul>
                        </li>
                        <!-- User Account: style can be found in dropdown.less -->
                        <li class="dropdown user user-menu" style="margin-right: 20px;">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <!--<img src="../../assets/nav/logo_mini.png" class="user-image" alt="User Image">-->
                                <span class="hidden-xs">{{name}}</span>
                            </a>
                            <ul class="dropdown-menu reset_menu">
                                <!-- User image -->
                                <li class="user-header drop_menu_item" style="height: 38px;">
                                    <!--<img src="../../assets/nav/user2-160x160.jpg" class="img-circle" alt="User Image">-->
                                    <!--<p>-->
                                        <!--{{'帮助中心'}}-->
                                        <!--&lt;!&ndash;<small>Member since Nov. 2012</small>&ndash;&gt;-->
                                    <!--</p>-->
                                    <div class="text_center" style="display: inline-block;" @click="helpAction()">
                                        帮助中心
                                    </div>
                                </li>
                                <!-- Menu Body -->
                                <!--<li class="user-body">-->
                                <!--<div class="col-xs-4 text-center">-->
                                <!--<a href="#">Followers</a>-->
                                <!--</div>-->
                                <!--<div class="col-xs-4 text-center">-->
                                <!--<a href="#">Sales</a>-->
                                <!--</div>-->
                                <!--<div class="col-xs-4 text-center">-->
                                <!--<a href="#">Friends</a>-->
                                <!--</div>-->
                                <!--</li>-->
                                <!-- Menu Footer-->
                                <li class="user-footer drop_menu_item">
                                    <!--<div class="pull-left">-->
                                    <!--<a href="#" class="btn btn-default btn-flat">Profile</a>-->
                                    <!--</div>-->
                                    <div class="text_center" @click="logout()">
                                        退出登录
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li style="display: none">
                            <a  data-toggle='control-sidebar'><i class="fa fa-gears"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex'
    import store from "../../store/index";
    export default {
        data() {
            return {
                hide: false
            }
        },
        computed: {
            ...mapGetters([
                'name'
            ])
        }, methods: {
            helpAction(){
                location.href = 'http://www.enlink.com.cn';
            },
            logout() {
                console.log("点击删除")
//                this.$confirm('确认退出登录?', '提示', {
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    type: 'warning'
//                }).then(() => {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'});
                }).catch(() => {

                })

//                }).catch(() => {    // 取消事件
//                    console.log("取消删除。")
//                    //do nothing
//                });
            }
        }
    }
</script>
<style scoped="scoped">
    .main-header{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
    }
    .skin-blue .main-header .navbar {
        background-color: #4596dd;
    }
    .skin-blue .main-header .logo {
        background-color: #3986dc;
    }
    .skin-blue .main-header .logo{
        width: 210px;
    }
    .skin-blue .main-header .navbar{
        margin-left:210px;
    }
    .navbar-nav>.user-menu>.dropdown-menu.reset_menu{
        width: 100px;
        min-width: 100px;
    }
    .reset_menu li{
        cursor: pointer;
    }
    .navbar-nav>.user-menu>.dropdown-menu>.drop_menu_item{
        background: #f9f9f9;
    }
    .navbar-nav>.user-menu>.dropdown-menu>.drop_menu_item:hover{
        background: rgb(228, 231, 241);
    }
</style>



