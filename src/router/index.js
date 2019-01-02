import Router from 'vue-router';
import Layout from '@/views/layout/Layout';
// const _import = require('./_import_' + process.env.NODE_ENV);
const subPath="@/views/admin/";
const Err401 = ()=>import('@/views/error/401');
const Err404 = ()=>import('@/views/error/404');
const Err500 = ()=>import('@/views/error/500');
const Err503 = ()=>import('@/views/error/503');
Vue.use(Router);
var data = [
    {path: '/login', component: ()=>import('@/views/login/index'), hidden: true, meta: -1},
    {path: '/404', component: Err404, hidden: true, meta: -1},
    {path: '/401', component: Err401, hidden: true, meta: -1},
    {path: '/500', component: Err500, hidden: true, meta: -1},
    {path: '/503', component: Err503, hidden: true, meta: -1},
    {
        id: 4,
        path: '/admin',
        flag: 1,
        isConnectSecond: false,
        firstMenu: true,
        component: Layout,
        isShowChildren: false,
        name: '首页',
        icon: 'fa fa-home',
        children: [
            {id: 5, path: 'home', hover: false, component: ()=>import('@/views/admin/home/first/homePage'), name: '首页', meta: 5},
        ]
    },
    {id: 6, path: '/401',flag: 6, firstMenu: true, icon: 'fa fa-gear', isConnectSecond: false, isShowChildren: false, component: Err401, title: true, name: '系统管理', backColor: 'header'},
    {
        id: 7,
        flag: 6,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '系统设置',
        icon: 'fa fa-gears',
        treeview: "treeview",
        children: [
            {id: 8, path: 'seriaNum', hover: false, component: ()=>import('@/views/admin/systemSet/sysConfig/seriaNum/seriaNum'), name: '序列号管理', meta: 8},
            {id: 146, path: 'adminConfig', hover: false, component: ()=>import('@/views/admin/systemSet/sysConfig/adminConfig/adminConfig'),name: '管理台设置', meta: 146},
            {id: 140, path: 'timeSync', hover: false, component: ()=>import('@/views/admin/systemSet/sysConfig/timeSync/timeSync'),name: '时间与同步', meta: 140},
            {id: 141, path: 'mailServer', hover: false, component: ()=>import('@/views/admin/systemSet/sysConfig/mailServer/mailServer'),name: '邮箱服务器', meta: 141},
            {id: 142, path: 'sysLog', hover: false, component: ()=>import('@/views/admin/systemSet/sysConfig/sysLog/sysLog'),name: 'SysLog', meta: 142},
            {id: 143, path: 'SNMP', hover: false, component: ()=>import('@/views/admin/systemSet/sysConfig/SNMP/SNMP'),name: 'SNMP', meta: 143},
            {id: 119, path: 'systemConfig', hover: false, component: ()=>import('@/views/admin/systemSet/sysConfig/systemConfig/systemConfig'), name: '系统参数配置', meta: 119}
        ]
    },
    {
        id: 10,
        flag: 6,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '管理员设置',
        icon: 'fa fa-user-md',
        treeview: "treeview",
        children: [
            {id: 11, path: 'sysAdmin', hover: false, component: ()=>import('@/views/admin/systemSet/adminSet/sysAdmin/sysAdmin'), name: '系统管理员', meta: 11},
            {id: 12, path: 'powerManager', hover: false, component: ()=>import('@/views/admin/systemSet/adminSet/powerManager/powerManager'), name: '权限管理', meta: 12},
        ]
    },
    {
        id: 13,
        flag: 6,
        isConnectSecond: false,
        isShow: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '网络配置',
        icon: 'fa fa-user-md',
        treeview: "treeview",
        children: [
            {id: 14, path: 'interface', hover: false, component: ()=>import('@/views/admin/systemSet/networkConfig/interface/interface'), name: '接口设置', meta: 14},
            {id: 15, path: 'routerset', hover: false, component: ()=>import('@/views/admin/systemSet/networkConfig/routerSet/routerSet'), name: '路由设置', meta: 15},
            {id: 16, path: 'domain', hover: false, component: ()=>import('@/views/admin/systemSet/networkConfig/domain/resolve'), name: '域名解析', meta: 16},
            {id: 1701, path: 'vlan', hover: false, component: ()=>import('@/views/admin/systemSet/networkConfig/vlan/vlanandtrun'), name: 'VLAN', meta: 1701},
            {id: 1702, path: 'dhcp', hover: false, component: ()=>import('@/views/admin/systemSet/networkConfig/dhcp/dhcpComponent'), name: 'DHCP', meta: 1702},
            {id: 144, path: 'linesResolve', hover: false, component: ()=>import('@/views/admin/systemSet/networkConfig/linesResolve/linesResolve'), name: '智能线路解析', meta: 144},

        ]
    },
    {
        id: 1001,
        flag: 6,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '系统选项',
        icon: 'fa fa-user-md',
        treeview: "treeview",
        children: [
            {id: 1010, path: 'iconCenter', hover: false, component: ()=>import('@/views/admin/systemSet/systemOptions/iconCenter/iconCenter'), name: '图标中心', meta: 1010},
            {id: 1011, path: 'appLibrary', hover: false, component: ()=>import('@/views/admin/systemSet/systemOptions/appLibrary/appLibrary'), name: '应用库', meta: 1011},

        ]
    },
    {id: 155,flag: 155, icon: 'fa fa-check-circle-o', firstMenu: true, isConnectSecond: false, path: '/401',isShowChildren: false, component: Err401, title: true, name: '用户管理', backColor: 'header'},
    {
        id: 18,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '用户设置',
        icon: 'fa fa-user',
        children: [
            {id: 19, path: 'userSet', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/userSet/userSet'), name: '用户设置', meta: 19},
            {id: 20, path: 'groupSet', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/groupSet/groupSet'), name: '用户组设置', meta: 20},
            {id: 21, path: 'onlineUsers', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/onlineUser/onlineUser'), name: '在线用户', meta: 21},
            {id: 220, path: 'expand', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/expand/expand'), name: '拓展功能', meta: 220},
            {id: 222, path: 'versionManager', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/versionManager/versionManager'), name: '版本管理', meta: 222},
            //江苏大学定制用11.13
            // {id: 221, path: 'thirdUserSet', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/thirdUserSet/userSet'), name: '第三方用户设置', meta: 221},
        ]
    },
    //11.22号 v1.05之后显示
    {
        id: 280,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '访问控制',
        icon: 'fa fa-user',
        children: [
            {id: 281, path: 'matchRule', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/accessControl/matchRule/matchRule'), name: '匹配规则', meta: 281},
            {id: 282, path: 'breakRule', hover: false, component: ()=>import('@/views/admin/SSL_VPN/userManager/accessControl/breakRule/breakRule'), name: '拦截规则', meta: 282},
        ]
    },
   // 12.7 打开
    {
        id: 200,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '硬件特征管理',
        icon: 'fa fa-user',
        children: [
            {id: 201, path: 'featureCollectList', hover: false, component: ()=>import('@/views/admin/SSL_VPN/hardwareCode/featureCollectList'), name: '特征收集列表', meta: 201},
            {id: 202, path: 'featureReview', hover: false, component: ()=>import('@/views/admin/SSL_VPN/hardwareCode/featureReview'), name: '特征码审核', meta: 202},
            {id: 203, path: 'reviewLog', hover: false, component: ()=>import('@/views/admin/SSL_VPN/hardwareCode/reviewLog'), name: '审核日志', meta: 203},

        ]
    },
    {
        id: 27,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '认证设置',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 28, path: 'db', hover: false, component: ()=>import('@/views/admin/SSL_VPN/authManager/dbAuth/dbAuth'), name: 'DB认证', meta: 28},
            {id: 29, path: 'ldap', hover: false, component: ()=>import('@/views/admin/SSL_VPN/authManager/ldapAuth/ldapAuth'), name: 'LDAP认证', meta: 29},
            {id: 30, path: 'radius', hover: false, component: ()=>import('@/views/admin/SSL_VPN/authManager/radiusAuth/radiusAuth'), name: 'RADIUS认证', meta: 30},
            {id: 31, path: 'ad', hover: false, component: ()=>import('@/views/admin/SSL_VPN/authManager/adAuth/adAuth'), name: 'AD认证', meta: 31},
            // {id: 112, path: 'oauth', hover: false, component: ()=>import('@/views/admin/SSL_VPN/authManager/OAuth/OAuth'), name: 'OAuth认证', meta: 112},
            {id: 87, path: 'sms', hover: false, component:()=>import('@/views/admin/SSL_VPN/authManager/smsAuth'), name: '短信认证', meta: 87},
            // {id: 115, path: 'oauths', hover: false, component:()=>import('@/views/admin/SSL_VPN/authManager/OAuth2/OAuth2'), name: 'OAuth2', meta: 115},
            {id: 117, path: 'casAuth', hover: false, component:()=>import('@/views/admin/SSL_VPN/authManager/casAuth/casAuth'), name: 'casAuth', meta: 117},
        ]
    },

    {
        id: 32,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '策略设置',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 33, path: 'Policy', hover: false, component: ()=>import('@/views/admin/SSL_VPN/policyManager/policy'), name: '策略规则', meta: 33}
        ]
    },
    // 12.7 打开
    {
        id: 302,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '可信设备',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 303, path: 'trustDevice', hover: false, component: ()=>import('@/views/admin/SSL_VPN/trustDevice/trustDevice'), name: '全局可信设备', meta: 303}
        ]
    },

    {
        id: 74,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '审核设置',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 76, path: 'checkSet', hover: false, component: ()=>import('@/views/admin/SSL_VPN/checkManager/checkConfig/checkConfig'), name: '审核设置', meta: 76},
            {id: 77, path: 'userCheck', hover: false, component: ()=>import('@/views/admin/SSL_VPN/checkManager/userCheck'), name: '用户审核', meta: 77},
            {id: 78, path: 'checkLog', hover: false, component: ()=>import('@/views/admin/SSL_VPN/checkManager/checkLog'), name: '审核日志', meta: 78},
        ]
    },
    {
        id: 210,
        flag: 155,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '用户组授权设置',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 211, path: 'pubGroup', hover: false, component: ()=>import('@/views/admin/SSL_VPN/pubGroup/pubGroup'), name: '用户组授权', meta: 211},
        ]
    },
    {
        id: 79,
        flag: 155,
        isConnectSecond: false,
        firstMenu: true,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '计费管理',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 80, path: 'packageConfig', hover: false, component: ()=>import('@/views/admin/SSL_VPN/accountManager/packageConfig/packageConfig'), name: '套餐设置', meta: 80},
            {id: 81, path: 'query', hover: false, component: ()=>import('@/views/admin/SSL_VPN/accountManager/query/query'), name: '充值退费查询', meta: 81},
            {id: 82, path: 'packageReport', hover: false, component: ()=>import('@/views/admin/SSL_VPN/accountManager/packageReport/packageReport'), name: '套餐报表', meta: 82},
            {id: 83, path: 'packageDetail', hover: false, component: ()=>import('@/views/admin/SSL_VPN/accountManager/packageDetail'), name: '套餐明细', meta: 83},
            {id: 84, path: 'consumeReport', hover: false, component: ()=>import('@/views/admin/SSL_VPN/accountManager/consumeReport/consumeReport'), name: '收支报表', meta: 84},
            {id: 85, path: 'consumeDetail', hover: false, component: ()=>import('@/views/admin/SSL_VPN/accountManager/consumeDetail'), name: '收支明细', meta: 85},
            // {id: 86, path: 'consumeChart', component: consumeChart, name: '收支统计图', meta: 86},
        ]
    },
    {
        id: 111,
        flag: 110,
        isConnectSecond: false,
        firstMenu: true,
        path: '/enwas',
        component: Layout,
        isShowChildren: false,
        name: 'EnWAS',
        icon: 'fa  fa fa-credit-card',
        children: [
            // {id: 122, path: 'enwasGroup', hover: false, component: ()=>import('@/views/admin/enWAS/group/group'), name: '用户组授权', meta: 122},
            // {id: 113, path: 'callPolicy', hover: false, component: ()=>import('@/views/admin/enWAS/blackName/blackName'), name: '可信域', meta: 113},
            {id: 26, path: 'webApp', hover: false, component: ()=>import('@/views/admin/enWAS/resource/resource'), name: 'Web应用', meta: 26},
            // {id: 114, path: 'enwasRule', hover: false, component: ()=>import('@/views/admin/enWAS/rule/rule'), name: '规则库', meta: 114},
            // {id: 119, path: 'systemConfig', hover: false, component: ()=>import('@/views/admin/enWAS/systemConfig/systemConfig'), name: '系统参数配置', meta: 119}
        ]
    },
    /*{
        id: 116,
        flag: 110,
        isConnectSecond: false,
        path: '/enwas',
        component: Layout,
        isShowChildren: false,
        name: '规则管理',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 114, path: 'enwasRule', hover: false, component: ()=>import('@/views/admin/'), name: '规则库', meta: 114}
        ]
    },*/
    {
        id: 22,
        flag: 17,
        isConnectSecond: false,
        firstMenu: true,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: 'EnSSL',
        icon: 'fa  fa-folder-open',
        children: [
            // {id: 23, path: 'rdp', hover: false, component: ()=>import('@/views/admin/SSL_VPN/resourceManager/rdp/rdp'), name: 'RDP应用', meta: 23},
            {id: 24, path: 'cs', hover: false, component: ()=>import('@/views/admin/SSL_VPN/resourceManager/cs/cs'), name: 'Client应用', meta: 24},
            {id: 98, path: 'ST', hover: false, component: ()=>import('@/views/admin/SSL_VPN/resourceManager/ST/ST'), name: 'ST应用', meta: 98},
            {id: 25, path: 'L3-Net', hover: false, component: ()=>import('@/views/admin/SSL_VPN/resourceManager/L3-Net/L3'), name: 'L3-Net应用', meta: 25},
            // {id: 75, path: 'group', hover: false, component: ()=>import('@/views/admin/SSL_VPN/resourceManager/group/group'), name:'用户组授权', meta: 75},
            // {id: 23, path: 'innerPol', hover: false, component: ()=>import('@/views/admin/SSL_VPN/resourceManager/innerPol/innerPol'), name: '内网策略', meta: 23},
            // {id: 75, path: 'whiteList', hover: false, component: ()=>import('@/views/admin/SSL_VPN/resourceManager/whiteList/whiteList'), name:'白名单', meta: 75}
        ]
    },

    {
        id: 241,
        flag: 240,
        isConnectSecond: false,
        firstMenu: true,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
         name: 'web终端',
        icon: 'fa  fa-folder-open',
        children: [
            {id: 242, path: 'webEnd', hover: false, component: ()=>import('@/views/admin/webTerminal/webEnd/webEnd'), name: 'web终端', meta: 242},
            // {id: 243, path: 'webEndGroup', hover: false, component: ()=>import('@/views/admin/webTerminal/group/group'), name: '用户组授权', meta: 243}
        ]
    },

    // {
    //     id: 72,
    //     flag: 69,
    //     isConnectSecond: false,
    //     firstMenu: true,
    //     path: '/admin',
    //     isShowChildren: false,
    //     component: Layout,
    //     name: 'EnS2S',
    //     icon: 'fa fa-gears',
    //     children: [
    //         {id: 73, path: 'nodeEquipment', hover: false, component: ()=>import('@/views/admin/s2sVPN/s2cManager/s2c'), name: '节点设备管理', meta: 73},
    //         {id: 71, path: 's2s', hover: false, component: ()=>import('@/views/admin/s2sVPN/s2sManager/s2s'), name: 's2s设置', meta: 71},
    //         {id: 87, path: 'dataSync', hover: false, component: ()=>import('@/views/admin/s2sVPN/dataSync/dataSync'), name: '数据同步管理', meta: 87},
    //         {id: 88, path: 's2c', hover: false, component: ()=>import('@/views/admin/s2sVPN/s2c/s2c'), name: 's2c管理', meta: 88},
    //     ]
    // },
    // {
    //     id: 66,
    //     flag: 65,
    //     isConnectSecond: false,
    //     firstMenu: true,
    //     path: '/admin',
    //     component: Layout,
    //     isShowChildren: false,
    //     name: 'Ipsec',
    //     icon: 'fa fa-gears',
    //     children: [
    //         {id: 67, path: 'ipsec', hover: false, component: ()=>import('@/views/admin/ipsec/ipsec'), name: 'Ipsec配置', meta: 67},
    //         {id: 68, path: 'ipsecDairy', hover: false, component: ()=>import('@/views/admin/ipsec/ipsecDairy'), name: 'Ipsec日志', meta: 68}
    //     ]
    // },
    // {id: 91, path: '/401',flag: 91, firstMenu: true, icon: 'fa fa-gear', isConnectSecond: false, isShowChildren: false, component: Err401, title: true, name: '智能DNS', backColor: 'header'},
    // {
    //     id: 108,
    //     flag: 91,
    //     isConnectSecond: false,
    //     path: '/admin',
    //     component: Layout,
    //     isShowChildren: false,
    //     name: '域名管理',
    //     icon: 'fa  fa fa-credit-card',
    //     treeview: "treeview",
    //     children: [
    //         {id: 92, path: 'domainAdmin', hover: false, component: ()=>import('@/views/admin/dns/domainArea/domainAdmin'), name: '域名管理', meta: 92},
    //         {id: 93, path: 'region', hover: false, component: ()=>import('@/views/admin/dns/region/regionAdmin'), name: '区域管理', meta: 93},
    //         {id: 94, path: 'line', hover: false, component: ()=>import('@/views/admin/dns/line/lineAdmin'), name: '线路管理', meta: 94},
    //         {id: 95, path: 'recursion', hover: false, component: ()=>import('@/views/admin/dns/recursion/recursionAdmin'), name: '递归管理', meta: 95},
    //         {id: 96, path: 'cache', hover: false, component: ()=>import('@/views/admin/dns/cache/cacheAdmin'), name: '缓存管理', meta: 96},
    //         {id: 97, path: 'quicklyAddRecord', hover: false, component: ()=>import('@/views/admin/dns/domainArea/quicklyAddRecord'), name: '快速添加记录', meta: 97, tag: true},
    //         {id: 99, path: 'resourceTransmit', hover: false, component: ()=>import('@/views/admin/dns/resourceTransmit/resourceTransmit'), name: '资源转发', meta: 99},
    //         {id: 100, path: 'domainExport', hover: false, component: ()=>import('@/views/admin/dns/domainExport/domainExport'), name: '域名导入导出', meta: 100},
    //     ]
    // },
    // {
    //     id: 109,
    //     flag: 91,
    //     isConnectSecond: false,
    //     path: '/admin',
    //     component: Layout,
    //     isShowChildren: false,
    //     name: '域名统计',
    //     icon: 'fa  fa fa-credit-card',
    //     treeview: "treeview",
    //     children: [
    //         {id: 101, path: 'domainVisit', hover: false, component: ()=>import('@/views/admin/dns/domainVisit/domainVisit') , name: '域名访问统计', meta: 101},
    //         {id: 102, path: 'queryStatistic', hover: false, component: ()=>import('@/views/admin/dns/queryStatistic/queryStatistic'), name: '查询统计图', meta: 102},
    //         {id: 103, path: 'lineStatistic', hover: false, component: ()=>import('@/views/admin/dns/lineStatistic/lineStatistic'), name: '线路统计图', meta: 103},
    //         {id: 104, path: 'typeStatistic', hover: false, component: ()=>import('@/views/admin/dns/typeStatistic/typeStatistic'), name: '类型统计图', meta: 104},
    //         {id: 105, path: 'domainStatistic', hover: false, component: ()=>import('@/views/admin/dns/domainStatistic/domainStatistic'), name: '域名统计图', meta: 105},
    //         {id: 106, path: 'regionStatistic', hover: false, component: ()=>import('@/views/admin/dns/regionStatistic/regionStatistic'), name: '区域统计图', meta: 106},
    //         {id: 107, path: 'regionSpread', hover: false, component: ()=>import('@/views/admin/dns/regionSpread/regionSpread'), name: '区域分布图', meta: 107}
    //     ]
    // },

    // {
    //     id: 231,
    //     flag: 230,
    //     isConnectSecond: false,
    //     path: '/admin',
    //     firstMenu: true,
    //     component: Layout,
    //     isShowChildren: false,
    //     name: '负载均衡',
    //     icon: 'fa fa-gears',
    //     children: [
    //         {id: 232, path: 'virtualService', hover: false, component: ()=>import('@/views/admin/loadBalance/config/virtualService/virtualService'), name: '虚拟服务', meta: 232},
    //         {id: 233, path: 'serverPool', hover: false, component: ()=>import('@/views/admin/loadBalance/config/serverPool/serverPool'), name: '服务器池', meta: 233},
    //         {id: 234, path: 'serverNode', hover: false, component: ()=>import('@/views/admin/loadBalance/config/serverNode/serverNode'), name: '服务器节点', meta: 234},
    //         {id: 235, path: 'rules', hover: false, component: ()=>import('@/views/admin/loadBalance/config/rules/rules'), name: '规则', meta: 235},
    //     ]
    // },

    {
        id: 57,
        flag: 56,
        isConnectSecond: false,
        firstMenu: true,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '防火墙',
        icon: 'fa fa-gears',
        children: [
            {id: 58, path: 'ipConfig', hover: false, component: ()=>import('@/views/admin/firewall/ip/ip'), name: 'IP设置', meta: 58},
            {id: 59, path: 'ipGroup', hover: false, component: ()=>import('@/views/admin/firewall/ipGroup/ipGroup'), name: 'IP组设置', meta: 59},
            {id: 60, path: 'service', hover: false, component: ()=>import('@/views/admin/firewall/service/service'), name: '服务设置', meta: 60},
            {id: 61, path: 'fwTime', hover: false, component: ()=>import('@/views/admin/firewall/fwTime/fwTime'), name: '时间设置', meta: 61},
            {id: 62, path: 'fwPolicy', hover: false, component: ()=>import('@/views/admin/firewall/policy/policy'), name: '策略设置', meta: 62},
            {id: 63, path: 'snat', hover: false, component: ()=>import('@/views/admin/firewall/snat/snat'), name: '源地址转换', meta: 63},
            {id: 64, path: 'dnat', hover: false, component: ()=>import('@/views/admin/firewall/dnat/dnat'), name: '目的地址转换', meta: 64}
        ]
    },

    {id: 34,flag: 34, icon: 'fa fa-sticky-note', firstMenu: true, isConnectSecond: false, path: '/401',isShowChildren: false, component: Err401, name: '日志中心',title:true, backColor: 'header'},
    {
        id: 35,
        flag: 34,
        isConnectSecond: false,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '日志管理',
        icon: 'fa  fa fa-credit-card',
        children: [
            {id: 36, path: 'logConfig', hover: false, component: ()=>import('@/views/admin/log/logConfig'), name: '日志设置', meta: 36},
            {id: 37, path: 'downloadLog', hover: false, component: ()=>import('@/views/admin/log/downloadLog'), name: '日志下载', meta: 37},
            {id: 38, path: 'userLog', hover: false, component: ()=>import('@/views/admin/log/userLog'), name: '用户日志', meta: 38},
            {id: 39, path: 'adminLog', hover: false, component: ()=>import('@/views/admin/log/adminLog'), name: '管理员日志', meta: 39},
            {id: 40, path: 'systemLog', hover: false, component: ()=>import('@/views/admin/log/systemLog'), name: '系统日志', meta: 40},
            {id: 47, path: 'resourceLog', hover: false, component: ()=>import('@/views/admin/log/resourceLog'), name: '资源日志', meta: 47},
            {id: 48, path: 'domainLog', hover: false, component: ()=>import('@/views/admin/log/domainLog/domainLog'), name: '域名日志', meta: 48},

        ]
    },

    // {
    //     id: 41,
    //     flag: 34,
    //     isConnectSecond: false,
    //     path: '/admin',
    //     component: Layout,
    //     isShowChildren: false,
    //     name: '统计与分析',
    //     icon: 'fa  fa fa-credit-card',
    //     children: [
    //         {id: 42, path: 'loginStatistics', hover: false, component: ()=>import('@/views/admin/log/login/loginStatistics'), name: '用户登录与统计分析', meta: 42},
    //         {id: 43, path: 'resourceStatistics', hover: false, component: ()=>import('@/views/admin/log/resource/resourceStatistics'), name: '资源统计与分析', meta: 43},
    //         {id: 44, path: 'flowStatistics', hover: false, component: ()=>import('@/views/admin/log/flow/flowStatistics'), name: '流量统计与分析', meta: 44}
    //     ]
    // },

    {
        id: 151,
        flag: 150,
        isConnectSecond: false,
        firstMenu: true,
        path: '/admin',
        component: Layout,
        isShowChildren: false,
        name: '系统维护',
        icon: 'fa fa-gears',
        treeview: "treeview",
        children: [
            {id: 152, path: 'sysOperation', hover: false, component: ()=>import('@/views/admin/sysMaintain/sysOperation/sysOperation'), name: '系统操作', meta: 152},
            {id: 153, path: 'practicalTool', hover: false, component: ()=>import('@/views/admin/sysMaintain/practicalTool/practicalTool'), name: '实用工具', meta: 153},
            {id: 154, path: 'backupRecovery', hover: false, component: ()=>import('@/views/admin/sysMaintain/backupRecovery/backupRecovery'), name: '备份与恢复', meta: 154},
            {id: 300, path: 'syshealthReport', hover: false, component: ()=>import('@/views/admin/sysMaintain/syshealthReport/syshealthReport'), name: '系统健康报告', meta: 300},
        ]
    },

    {path: '*', redirect: '/404', hidden: true, meta: -1},
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({x:0,y: 0}),
    routes:data

});
