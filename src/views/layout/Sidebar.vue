<template>
    <div>
        <aside class="main-sidebar">

            <section class="sidebar" style=" padding-bottom: 0;">

                <!-- search form 搜索框-->
                <form action="#" method="get" class="sidebar-form" style="display: none;">
                    <div class="input-group">
                        <input type="text" name="q" class="form-control" placeholder="Search...">
                        <span class="input-group-btn">
                            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i
                                    class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>
                <el-row style="background: #1c2226;">
                    <el-col>
                        <en-menu
                                :menuData="permissionRoutes"
                                :allRole="allRole"
                                textColor="#b8c7ce"
                                activeTextColor="#3986dc"
                                menuBackgroundColor="#1c2226"
                                itemBackgroundColor="#232d32"
                                activeItemBackgroundColor="#3c464f"
                                @handleRouter="handleRouter"
                        ></en-menu>
                    </el-col>
                </el-row>
                <!--<ul class="sidebar-menu">
                    <template>

                        <el-menu
                                :unique-opened="true"
                                default-active="2"
                                class="el-menu-vertical-demo"
                                background-color="#222d32"
                                text-color="#fff"
                                active-text-color="#ffd04b">
                            <template v-for="(item,index) in permissionRoutes" v-if="!item.hidden">
                                <template v-if="item.title">
                                    <a :key="index" href="javascript:void(0)" :class="[item.backColor]"
                                       style=" display:block;padding: 10px 15px; background:#1a2226; color: #fff;">
                                        &lt;!&ndash;<i class="fa "> #4b646f</i>&ndash;&gt;
                                        <span > {{item.name}}</span>
                                    </a>
                                </template>
                                <el-submenu :index="item.id+'-1'" v-else>
                                    <template slot="title">
                                        <i :class=item.icon></i>
                                        <span style="color:#b8c7ce"> {{item.name}}</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item v-for="(r,index) in item.children" :key="index" :index="r.id+'-2'" @click="handleRouter(item.path+'/'+r.path)">

                                            <a href="javascript:void(0)" class=""
                                               style="color:#b8c7ce">
                                                <i class="fa fa-circle-o"></i>
                                                <span > {{r.name}}</span>
                                            </a>
                                        </el-menu-item>

                                    </el-menu-item-group>
                                </el-submenu>
                            </template>

                        </el-menu>
                    </template>

                </ul>-->
            </section>

        </aside>
    </div>
</template>

<script>
    import permissionRoutes from 'store/permission';
    import store from "../../store/index";
    import permission from 'store/permission';

    import EnMenu from "../../components/menu/enMenu.vue"

    export default {
        name: 'Sidebar',
        data() {
            return {
                permissionRoutes: permissionRoutes.get(),
                wid: null,
                isDropMenu: false,
                allRole:permissionRoutes.getRole()
            }
        },
        components: {
            EnMenu
        },
        created() {
           // console.log(permissionRoutes,'cre',permission)
        },
        mounted() {

        },

        methods: {
            handle(val) {
                // console.log('pathhandle:', val)
            },
            handleRouter(path) {
                this.$router.beforeEach((to, from, next) => {
                    window.scrollTo(0, 0);
                    next()
                });
                // this.$router.push({path: path}); //测试可用
                if (store.getters.Main == true) {
                    this.$router.beforeEach((to, from, next) => {
                        window.scrollTo(0, 0);
                        next()
                    });
                    if (path == '/admin/seriaNum' || path == '/admin/home' || path == '/admin/userSet' || path == '/admin/groupSet' || path == '/admin/onlineUsers' || path == '/admin/trustDevice'||path =='/admin/expand'||path =='/admin/versionManager'
                        || path == '/admin/timeSync' || path == '/admin/mailServer' || path == '/admin/sysLog' || path == '/admin/SNMP' || path == '/admin/adminConfig'||path == '/admin/systemConfig'||path=='/admin/matchRule'
                        ||path=='/admin/breakRule'||path=='/admin/domainLog'
                        || path == '/admin/sysAdmin' || path == '/admin/powerManager'
                        || path == '/admin/interface' || path == '/admin/routerset' || path == '/admin/domain' || path == '/admin/vlan' || path == '/admin/dhcp' || path == '/admin/linesResolve'
                        || path == '/admin/iconCenter'
                        || path == '/admin/sysOperation' || path == '/admin/practicalTool' || path == '/admin/backupRecovery' || path == '/admin/syshealthReport'
                        || path == '/admin/db' || path == '/admin/ldap' || path == '/admin/radius' || path == '/admin/ad' || path == '/admin/oauth' || path == '/admin/sms'||path =='/admin/oauths'||path=='/admin/casAuth'
                        || path == '/admin/Policy'|| path == '/admin/model1'|| path == '/admin/model2'
                        || path == '/admin/pubGroup'
                        || path == '/admin/appLibrary'
                        || path == '/admin/virtualService' || path == '/admin/serverPool' || path == '/admin/serverNode' || path == '/admin/rules'
                        || path == '/admin/checkSet' || path == '/admin/userCheck' || path == '/admin/checkLog' || path == '/admin/featureCollectList' || path == '/admin/featureReview' || path == '/admin/reviewLog') {
                        this.$router.push({path: path});
                    } else {
                        // this.$router.push({path: path});
                        if (store.getters.Dns == true) {
                            if (path == '/admin/domainAdmin' || path == '/admin/region' || path == '/admin/line' || path == '/admin/recursion' || path == '/admin/cache' || path == '/admin/quicklyAddRecord'
                                || path == '/admin/resourceTransmit' || path == '/admin/domainExport' || path == '/admin/domainVisit' || path == '/admin/queryStatistic' || path == '/admin/lineStatistic'
                                || path == '/admin/typeStatistic' || path == '/admin/domainStatistic' || path == '/admin/regionStatistic' || path == '/admin/regionSpread'

                            ) {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/admin/domainAdmin' || path == '/admin/region' || path == '/admin/line' || path == '/admin/recursion' || path == '/admin/cache' || path == '/admin/quicklyAddRecord'
                                || path == '/admin/resourceTransmit' || path == '/admin/domainExport' || path == '/admin/domainVisit' || path == '/admin/queryStatistic' || path == '/admin/lineStatistic'
                                || path == '/admin/typeStatistic' || path == '/admin/domainStatistic' || path == '/admin/regionStatistic' || path == '/admin/regionSpread'
                            ) {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活智能DNS序列号!'
                                });
                            }
                        }
                        if (store.getters.Firewall == true) {
                            if (path == '/admin/ipConfig' || path == '/admin/ipGroup' || path == '/admin/service' || path == '/admin/fwTime' || path == '/admin/fwPolicy' || path == '/admin/snat' || path == '/admin/dnat') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/admin/ipConfig' || path == '/admin/ipGroup' || path == '/admin/service' || path == '/admin/fwTime' || path == '/admin/fwPolicy' || path == '/admin/snat' || path == '/admin/dnat') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活防火墙序列号!'
                                });
                            }
                        }
                        if (store.getters.Ipsec == true) {
                            if (path == '/admin/ipsec' || path == '/admin/ipsecDairy') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/admin/ipsec' || path == '/admin/ipsecDairy') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活Ipsec序列号!'
                                });
                            }
                        }


                        if (store.getters.Enssl == true) {
                            if (path == '/admin/rdp' || path == '/admin/cs' || path == '/admin/ST' || path == '/admin/L3-Net' || path == '/admin/group') {
                                this.$router.push({path: path});
                            }
                        } else {
                            console.log(path, 'path_Enssl')
                            if (path == '/admin/rdp' || path == '/admin/cs' || path == '/admin/ST' || path == '/admin/L3-Net' || path == '/admin/group') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活Enssl序列号!'
                                });
                                return
                            }
                        }
                        if (store.getters.Enwas == true) {
                            if (path == '/enwas/enwasGroup' || path == '/enwas/callPolicy' || path == '/enwas/webApp' || path == '/enwas/enwasRule') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/enwas/enwasGroup' || path == '/enwas/callPolicy' || path == '/enwas/webApp' || path == '/enwas/enwasRule' || path == '/enwas/clientDomain') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活Enwas序列号!'
                                });
                            }
                        }
                        if (store.getters.Charg == true) {
                            if (path == '/admin/packageConfig' || path == '/admin/query' || path == '/admin/packageReport' || path == '/admin/packageDetail' || path == '/admin/consumeReport' || path == '/admin/consumeDetail') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/admin/packageConfig' || path == '/admin/query' || path == '/admin/packageReport' || path == '/admin/packageDetail' || path == '/admin/consumeReport' || path == '/admin/consumeDetail') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活Charg序列号!'
                                });
                            }
                        }
                        if (store.getters.Ens2s == true) {
                            if (path == '/admin/nodeEquipment' || path == '/admin/s2s' || path == '/admin/dataSync' || path == '/admin/s2c') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/admin/nodeEquipment' || path == '/admin/s2s' || path == '/admin/dataSync' || path == '/admin/s2c') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活Ens2s序列号!'
                                });
                            }
                        }
                        if (store.getters.Log == true) {
                            if (path == '/admin/logConfig' || path == '/admin/downloadLog' || path == '/admin/userLog' || path == '/admin/adminLog' || path == '/admin/systemLog' || path == '/admin/resourceLog'
                                || path == '/admin/loginStatistics' || path == '/admin/resourceStatistics' || path == '/admin/flowStatistics'||path == '/admin/localLog') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/admin/logConfig' || path == '/admin/downloadLog' || path == '/admin/userLog' || path == '/admin/adminLog' || path == '/admin/systemLog' || path == '/admin/resourceLog'
                                || path == '/admin/loginStatistics' || path == '/admin/resourceStatistics' || path == '/admin/flowStatistics'||path == '/admin/localLog') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活Log序列号!'
                                });
                            }
                        }
                        /*负载均衡*/
                        if (store.getters.Haproxy == true) {
                            if (path == '/admin/virtualService' || path == '/admin/serverPool' || path == '/admin/serverNode' || path == '/admin/rules') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if (path == '/admin/virtualService' || path == '/admin/serverPool' || path == '/admin/serverNode' || path == '/admin/rules') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活负载均衡序列号!'
                                });
                            }
                        }
                        /*web终端*/
                        if (store.getters.Terminal == true) {
                            if (path == '/admin/webEnd'||path == '/admin/webEndGroup') {
                                this.$router.push({path: path});
                            }
                        } else {
                            if ( path == '/admin/webEnd'||path == '/admin/webEndGroup') {
                                this.$message({
                                    type: 'warning',
                                    message: '请先激活Web终端序列号!'
                                });
                            }
                        }
                    }

                } else {
                    if (path == '/admin/seriaNum' || path == '/admin/home') {
                        this.$router.push({path: path});
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请先激活主序列号!'
                        });
                    }
                }

            }
        }
    }

    //    console.log(this.permissionRoutes)
</script>

<style rel="stylesheet">
    .sidebar-menu li > a > .pull-right-container {
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -7px;
    }

    .noColor {
        border-left-color: black;
    }

    /*#1e282c  #3c8dbc*/
    .left_color:hover {
        border-left-color: #1e282c !important;
    }

    .left_color:focus {
        /*border-left-color: #1e282c !important;*/
    }

    .enlink-link {
        color: #8aa4af;
    }
</style>


<style>
    .skin-blue .main-sidebar {
        background-color: #1c2226;
    }

    .main-sidebar {
        /*min-height: 1400px;*/
        width: 210px !important;
        background-color: #1c2226;
        bottom: 0;
    }

    .sidebar-menu {
        background: #222D32;
    }

    .side_li {
        background-color: #222D32 !important;
    }

    @media (max-width: 767px) {
        .main-sidebar {
            /* -webkit-transform: translate(-230px, 0); */
            -ms-transform: translate(0px, 0);
            -o-transform: translate(0px, 0);
            transform: translate(0px, 0);
            padding-top: 0;
        }

    }

    /*@media  (max-width: 767px){*/
    /*.main-header .logo, .main-header .navbar{*/
    /*!*float: left;*!*/
    /*} */
    /*}*/
</style>
