import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login/';
// noinspection JSAnnotator
import Layout from '../views/layout/Layout';


const Err404 = resolve => require(['../views/error/404.vue'], resolve);
const Err401 = resolve => require(['../views/error/401.vue'], resolve);
const Err500 = resolve => require(['../views/error/500.vue'], resolve);
const Err503 = resolve => require(['../views/error/503.vue'], resolve);

const HomePage = resolve => require(['../views/admin/home/first/homePage.vue'], resolve);
const s2sManager = resolve => require(['../views/admin/s2sVPN/s2sManager/s2s.vue'], resolve);
const nodeEquipmentManager = resolve => require(['../views/admin/s2sVPN/s2cManager/s2c.vue'], resolve);
// const HomePage2 = resolve => require(['../views/admin/home/first/homePage2.vue'], resolve);
const SeriaNum = resolve => require(['../views/admin/systemSet/sysConfig/seriaNum/seriaNum.vue'], resolve);

//工大一期暂时没有证书管理
const Cer = resolve => require(['../views/admin/systemSet/sysConfig/cerManager/certificate.vue'], resolve);
const timeSync = resolve => require(['../views/admin/systemSet/sysConfig/timeSync/timeSync.vue'], resolve);
const mailServer = resolve => require(['../views/admin/systemSet/sysConfig/mailServer/mailServer.vue'], resolve);
const sysLog = resolve => require(['../views/admin/systemSet/sysConfig/sysLog/sysLog.vue'], resolve);
const SNMP = resolve => require(['../views/admin/systemSet/sysConfig/SNMP/SNMP.vue'], resolve);
const adminConfig = resolve => require(['../views/admin/systemSet/sysConfig/adminConfig/adminConfig.vue'], resolve);
//系统维护
const sysOperation = resolve => require(['../views/admin/sysMaintain/sysOperation/sysOperation.vue'], resolve);
const practicalTool = resolve => require(['../views/admin/sysMaintain/practicalTool/practicalTool.vue'], resolve);
const backupRecovery = resolve => require(['../views/admin/sysMaintain/backupRecovery/backupRecovery.vue'], resolve);
const syshealthReport = resolve => require(['../views/admin/sysMaintain/syshealthReport/syshealthReport.vue'], resolve);
//ens2s
const s2cManager = resolve => require(['../views/admin/s2sVPN/s2c/s2c.vue'], resolve);
const dataSyncManager = resolve => require(['../views/admin/s2sVPN/dataSync/dataSync.vue'], resolve);
const interFace = resolve => require(['../views/admin/systemSet/networkConfig/interface/interface.vue'], resolve);
// const interFace2 = resolve => require(['../views/admin/systemSet/networkConfig/interface2/interface.vue'], resolve);
const routerSet = resolve => require(['../views/admin/systemSet/networkConfig/routerSet/routerSet.vue'], resolve);
const domainName = resolve => require(['../views/admin/systemSet/networkConfig/domain/resolve.vue'], resolve);
const vlanandtrun = resolve => require(['../views/admin/systemSet/networkConfig/vlan/vlanandtrun.vue'],resolve);
const dhcpComponent = resolve => require(['../views/admin/systemSet/networkConfig/dhcp/dhcpComponent.vue'],resolve);
const linesResolve = resolve => require(['../views/admin/systemSet/networkConfig/linesResolve/linesResolve.vue'], resolve);
// linesResolve

const sysAdmin = resolve => require(['../views/admin/systemSet/adminSet/sysAdmin/sysAdmin.vue'], resolve);
const powerManager = resolve => require(['../views/admin/systemSet/adminSet/powerManager/powerManager.vue'], resolve);
// const interfaceManager = resolve => require(['../views/admin/systemSet/adminSet/interfaceManager/interfaceManager.vue'], resolve);
const aclManager = resolve => require(['../views/admin/systemSet/adminSet/aclManager/acl.vue'],resolve);
//SSL_vpn
const featureCollectList = resolve => require(['../views/admin/SSL_VPN/hardwareCode/featureCollectList.vue'], resolve);
const featureReview = resolve => require(['../views/admin/SSL_VPN/hardwareCode/featureReview.vue'], resolve);
const reviewLog= resolve => require(['../views/admin/SSL_VPN/hardwareCode/reviewLog.vue'], resolve);
const UserSet = resolve => require(['../views/admin/SSL_VPN/userManager/userSet/userSet.vue'], resolve);
const onlineUsers = resolve => require(['../views/admin/SSL_VPN/userManager/onlineUser/onlineUser.vue'], resolve);
const GroupSet = resolve => require(['../views/admin/SSL_VPN/userManager/groupSet/groupSet.vue'], resolve);
const Rdp = resolve => require(['../views/admin/SSL_VPN/resourceManager/rdp/rdp.vue'], resolve);
const cs = resolve => require(['../views/admin/SSL_VPN/resourceManager/cs/cs.vue'], resolve);
const L3 = resolve => require(['../views/admin/SSL_VPN/resourceManager/L3-Net/L3.vue'], resolve);
const ST = resolve => require(['../views/admin/SSL_VPN/resourceManager/ST/ST.vue'], resolve);

const model1 = resolve => require(['../views/admin/SSL_VPN/resourceManager/model1/cs.vue'], resolve);
const model2 = resolve => require(['../views/admin/SSL_VPN/resourceManager/model2/cs.vue'], resolve);

const group = resolve => require(['../views/admin/SSL_VPN/resourceManager/group/group.vue'], resolve);
/*用户组pub*/
const pubGroup = resolve => require(['../views/admin/SSL_VPN/pubGroup/pubGroup.vue'], resolve);
const expand = resolve => require(['../views/admin/SSL_VPN/userManager/expand/expand.vue'], resolve);

const matchRule = () => import('../views/admin/SSL_VPN/userManager/accessControl/matchRule/matchRule');
const breakRule = () => import('../views/admin/SSL_VPN/userManager/accessControl/breakRule/breakRule');

// accessControl/matchRule/matchRule
// const bs = resolve => require(['../views/admin/SSL_VPN/resourceManager/bs/bs.vue'], resolve);
const ad = resolve => require(['../views/admin/SSL_VPN/authManager/adAuth/adAuth.vue'], resolve);
const db = resolve => require(['../views/admin/SSL_VPN/authManager/dbAuth/dbAuth.vue'], resolve);
const ldap = resolve => require(['../views/admin/SSL_VPN/authManager/ldapAuth/ldapAuth.vue'], resolve);
const OAuth = resolve => require(['../views/admin/SSL_VPN/authManager/OAuth/OAuth.vue'], resolve);
const radius = resolve => require(['../views/admin/SSL_VPN/authManager/radiusAuth/radiusAuth.vue'], resolve);
const Policy = resolve => require(['../views/admin/SSL_VPN/policyManager/policy.vue'], resolve);
const trustDevice = resolve => require(['../views/admin/SSL_VPN/trustDevice/trustDevice.vue'], resolve);
const sms = resolve => require(['../views/admin/SSL_VPN/authManager/smsAuth.vue'], resolve);
const checkSet = resolve => require(['../views/admin/SSL_VPN/checkManager/checkConfig/checkConfig.vue'], resolve);
const userCheck = resolve => require(['../views/admin/SSL_VPN/checkManager/userCheck.vue'], resolve);
const checkLog = resolve => require(['../views/admin/SSL_VPN/checkManager/checkLog.vue'], resolve);
const consumeReport = resolve => require(['../views/admin/SSL_VPN/accountManager/consumeReport/consumeReport.vue'], resolve);
// const consumeChart = resolve => require(['../views/admin/SSL_VPN/accountManager/consumeChart.vue'], resolve);
const consumeDetail = resolve => require(['../views/admin/SSL_VPN/accountManager/consumeDetail.vue'], resolve);
const packageConfig = resolve => require(['../views/admin/SSL_VPN/accountManager/packageConfig/packageConfig.vue'], resolve);
const packageReport = resolve => require(['../views/admin/SSL_VPN/accountManager/packageReport/packageReport.vue'], resolve);
const packageDetail = resolve => require(['../views/admin/SSL_VPN/accountManager/packageDetail.vue'], resolve);
const query = resolve => require(['../views/admin/SSL_VPN/accountManager/query/query.vue'], resolve);

// web终端
const webEnd = resolve => require(['../views/admin/webTerminal/webEnd/webEnd.vue'], resolve);
const webEndGroup=resolve => require(['../views/admin/webTerminal/group/group.vue'], resolve);
/*
* 系统选项
* */
const iconCenter = resolve => require(['../views/admin/systemSet/systemOptions/iconCenter/iconCenter.vue'], resolve);
const appLibrary = resolve => require(['../views/admin/systemSet/systemOptions/appLibrary/appLibrary.vue'], resolve);

/** *
 * log日志部分
 * **/
const LogConfig = resolve => require(['../views/admin/log/logConfig.vue'], resolve);
const linesLog = resolve => require(['../views/admin/log/linesLog.vue'], resolve);

const loginStatistics = resolve => require(['../views/admin/log/login/loginStatistics.vue'], resolve);
const userLog = resolve => require(['../views/admin/log/userLog.vue'], resolve);
const systemLog = resolve => require(['../views/admin/log/systemLog.vue'], resolve);
const adminLog = resolve => require(['../views/admin/log/adminLog.vue'], resolve);
const resourceLoged= resolve => require(['../views/admin/log/resourceLog.vue'], resolve);
const domainLog=() => import('../views/admin/log/domainLog/domainLog');
const flowStatistics = resolve => require(['../views/admin/log/flow/flowStatistics.vue'], resolve);
const resourceStatistics = resolve => require(['../views/admin/log/resource/resourceStatistics.vue'], resolve);
// const downloadLog = resolve => require(['../views/admin/log/downloadLog.vue'], resolve);
const downloadLog = resolve => require(['../views/admin/log/local/download.vue'], resolve);

const localLog = resolve => require(['../views/admin/log/local/localLog.vue'], resolve);

// enWAS admin................................begin.........................................

const enwas_resource = resolve => require(['../views/admin/enWAS/resource/resource.vue'], resolve);
const enwas_blackName = resolve => require(['../views/admin/enWAS/blackName/blackName.vue'], resolve);
const enwas_rule = resolve => require(['../views/admin/enWAS/rule/rule.vue'], resolve);
const enwas_customer = resolve => require(['../views/admin/enWAS/customer/customer.vue'], resolve);
const enwas_group = resolve => require(['../views/admin/enWAS/group/group.vue'], resolve);
const enwas_config = resolve => require(['../views/admin/systemSet/sysConfig/systemConfig/systemConfig.vue'], resolve);

// enWAS admin................................end.........................................

// firewall admin................................begin.........................................

const ipConfig = resolve => require(['../views/admin/firewall/ip/ip.vue'], resolve);
const ipGroup = resolve => require(['../views/admin/firewall/ipGroup/ipGroup.vue'], resolve);
const fwTime = resolve => require(['../views/admin/firewall/fwTime/fwTime.vue'], resolve);
const service = resolve => require(['../views/admin/firewall/service/service.vue'], resolve);
const fwPolicy = resolve => require(['../views/admin/firewall/policy/policy.vue'], resolve);
const snat = resolve => require(['../views/admin/firewall/snat/snat.vue'], resolve);
const dnat = resolve => require(['../views/admin/firewall/dnat/dnat.vue'], resolve);

// firewall admin................................end.........................................


// ipsec admin................................begin.........................................

const ipsecConfig = resolve => require(['../views/admin/ipsec/ipsec.vue'], resolve);
const ipsecDairy = resolve => require(['../views/admin/ipsec/ipsecDairy.vue'], resolve);

// ipsec admin................................end.........................................

// dns admin................................begin.........................................

const domainAdmin = resolve => require(['../views/admin/dns/domainArea/domainAdmin.vue'], resolve);
const regionAdmin = resolve => require(['../views/admin/dns/region/regionAdmin.vue'], resolve);
const lineAdmin = resolve => require(['../views/admin/dns/line/lineAdmin.vue'], resolve);
const recursionAdmin = resolve => require(['../views/admin/dns/recursion/recursionAdmin.vue'], resolve);
const cacheAdmin = resolve => require(['../views/admin/dns/cache/cacheAdmin.vue'], resolve);
const quicklyAddRecord = resolve => require(['../views/admin/dns/domainArea/quicklyAddRecord.vue'], resolve);
const resourceTransmit = resolve => require(['../views/admin/dns/resourceTransmit/resourceTransmit.vue'], resolve);
const domainExport = resolve => require(['../views/admin/dns/domainExport/domainExport.vue'], resolve);
const domainVisit = resolve => require(['../views/admin/dns/domainVisit/domainVisit.vue'], resolve);
const queryStatistic = resolve => require(['../views/admin/dns/queryStatistic/queryStatistic.vue'], resolve);
const lineStatistic = resolve => require(['../views/admin/dns/lineStatistic/lineStatistic.vue'], resolve);
const typeStatistic = resolve => require(['../views/admin/dns/typeStatistic/typeStatistic.vue'], resolve);
const domainStatistic = resolve => require(['../views/admin/dns/domainStatistic/domainStatistic.vue'], resolve);
const regionStatistic = resolve => require(['../views/admin/dns/regionStatistic/regionStatistic.vue'], resolve);
const regionSpread = resolve => require(['../views/admin/dns/regionSpread/regionSpread.vue'], resolve);
// dns admin................................end.........................................
// 负载均衡 ................................begin.........................................
const virtualService = resolve => require(['../views/admin/loadBalance/config/virtualService/virtualService.vue'], resolve);
const serverPool = resolve => require(['../views/admin/loadBalance/config/serverPool/serverPool.vue'], resolve);
const serverNode = resolve => require(['../views/admin/loadBalance/config/serverNode/serverNode.vue'], resolve);
const rules = resolve => require(['../views/admin/loadBalance/config/rules/rules.vue'], resolve);
// 负载均衡 ................................end.........................................


Vue.use(Router);
var data = [
    {path: '/login', component: Login, hidden: true, meta: -1},
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
            {id: 5, path: 'home', hover: false, component: HomePage, name: '首页', meta: 5},
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
            {id: 8, path: 'seriaNum', hover: false, component: SeriaNum, name: '序列号管理', meta: 8},
            {id: 146, path: 'adminConfig', hover: false, component: adminConfig,name: '管理台设置', meta: 146},
            // {id: 9, path: 'certificate', component: Cer, name: '证书管理', meta: 9},
            {id: 140, path: 'timeSync', hover: false, component: timeSync,name: '时间与同步', meta: 140},
            {id: 141, path: 'mailServer', hover: false, component: mailServer,name: '邮箱服务器', meta: 141},
            {id: 142, path: 'sysLog', hover: false, component: sysLog,name: 'SYSLOG', meta: 142},
            {id: 143, path: 'SNMP', hover: false, component: SNMP,name: 'SNMP', meta: 143},
            {id: 119, path: 'systemConfig', hover: false, component: enwas_config, name: '系统参数配置', meta: 119}
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
            {id: 11, path: 'sysAdmin', hover: false, component: sysAdmin, name: '系统管理员', meta: 11},
            {id: 12, path: 'powerManager', hover: false, component: powerManager, name: '权限管理', meta: 12},
            // {id: 45, path: 'interfaceManager', component: interfaceManager, name: 'API管理', meta: 45},
            // {id: 46, path: 'aclManager', component: aclManager, name: 'ACL管理' , meta: 46}
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
            {id: 14, path: 'interface', hover: false, component: interFace, name: '接口设置', meta: 14},
            {id: 15, path: 'routerset', hover: false, component: routerSet, name: '路由设置', meta: 15},
            {id: 16, path: 'domain', hover: false, component: domainName, name: '域名解析', meta: 16},
            {id: 1701, path: 'vlan', hover: false, component: vlanandtrun, name: 'VLAN', meta: 1701},
            {id: 1702, path: 'dhcp', hover: false, component: dhcpComponent, name: 'DHCP', meta: 1702},
            {id: 144, path: 'linesResolve', hover: false, component: linesResolve, name: '智能线路解析', meta: 144},

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
            {id: 1010, path: 'iconCenter', hover: false, component: iconCenter, name: '图标中心', meta: 1010},
            {id: 1011, path: 'appLibrary', hover: false, component: appLibrary, name: '应用库', meta: 1011}
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
            {id: 19, path: 'userSet', hover: false, component: UserSet, name: '用户设置', meta: 19},
            {id: 20, path: 'groupSet', hover: false, component: GroupSet, name: '用户组设置', meta: 20},
            {id: 21, path: 'onlineUsers', hover: false, component: onlineUsers, name: '在线用户', meta: 21},
            {id: 220, path: 'expand', hover: false, component: expand, name: '拓展功能', meta: 220},
        ]
    },
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
            {id: 281, path: 'matchRule', hover: false, component: matchRule, name: '匹配规则', meta: 281},
            {id: 282, path: 'breakRule', hover: false, component:breakRule, name: '拦截规则', meta: 282},
        ]
    },
    /*注释2018.7.6*/
    // {
    //     id: 200,
    //     flag: 155,
    //     isConnectSecond: false,
    //     path: '/admin',
    //     component: Layout,
    //     isShowChildren: false,
    //     name: '硬件特征管理',
    //     icon: 'fa fa-user',
    //     children: [
    //         {id: 201, path: 'featureCollectList', hover: false, component: featureCollectList, name: '特征收集列表', meta: 201},
    //         {id: 202, path: 'featureReview', hover: false, component: featureReview, name: '特征码审核', meta: 202},
    //         {id: 203, path: 'reviewLog', hover: false, component: reviewLog, name: '审核日志', meta: 203},
    //
    //     ]
    // },
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
            {id: 28, path: 'db', hover: false, component: db, name: 'DB认证', meta: 28},
            {id: 29, path: 'ldap', hover: false, component: ldap, name: 'LDAP认证', meta: 29},
            {id: 30, path: 'radius', hover: false, component: radius, name: 'RADIUS认证', meta: 30},
            {id: 31, path: 'ad', hover: false, component: ad, name: 'AD认证', meta: 31},
            // {id: 112, path: 'oauth', hover: false, component: OAuth, name: 'OAuth认证', meta: 112},
            {id: 87, path: 'sms', hover: false, component:sms, name: '短信认证', meta: 87},
            {id: 117, path: 'casAuth', hover: false, component:()=>import('../views/admin/SSL_VPN/authManager/casAuth/casAuth'), name: 'casAuth', meta: 117},
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
            {id: 33, path: 'Policy', hover: false, component: Policy, name: '策略规则', meta: 33}
        ]
    },
    /*注释2018.7.6*/
    // {
    //     id: 302,
    //     flag: 155,
    //     isConnectSecond: false,
    //     path: '/admin',
    //     component: Layout,
    //     isShowChildren: false,
    //     name: '可信设备',
    //     icon: 'fa  fa fa-credit-card',
    //     children: [
    //         {id: 303, path: 'trustDevice', hover: false, component: trustDevice, name: '全局可信设备', meta: 303}
    //     ]
    // },

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
            {id: 76, path: 'checkSet', hover: false, component: checkSet, name: '审核设置', meta: 76},
            {id: 77, path: 'userCheck', hover: false, component: userCheck, name: '用户审核', meta: 77},
            {id: 78, path: 'checkLog', hover: false, component: checkLog, name: '审核日志', meta: 78},
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
            {id: 211, path: 'pubGroup', hover: false, component: pubGroup, name: '用户组授权', meta: 211},
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
            {id: 80, path: 'packageConfig', hover: false, component: packageConfig, name: '套餐设置', meta: 80},
            {id: 81, path: 'query', hover: false, component: query, name: '充值退费查询', meta: 81},
            {id: 82, path: 'packageReport', hover: false, component: packageReport, name: '套餐报表', meta: 82},
            {id: 83, path: 'packageDetail', hover: false, component: packageDetail, name: '套餐明细', meta: 83},
            {id: 84, path: 'consumeReport', hover: false, component: consumeReport, name: '收支报表', meta: 84},
            {id: 85, path: 'consumeDetail', hover: false, component: consumeDetail, name: '收支明细', meta: 85},
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
            // {id: 122, path: 'enwasGroup', hover: false, component: enwas_group, name: '用户组授权', meta: 122},
            // {id: 113, path: 'callPolicy', hover: false, component: enwas_blackName, name: '可信域', meta: 113},
            {id: 26, path: 'webApp', hover: false, component: enwas_resource, name: 'Web应用', meta: 26},
            // {id: 114, path: 'enwasRule', hover: false, component: enwas_rule, name: '规则库', meta: 114},
            // {id: 119, path: 'systemConfig', hover: false, component: enwas_config, name: '系统参数配置', meta: 119}
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
     {id: 114, path: 'enwasRule', hover: false, component: enwas_rule, name: '规则库', meta: 114}
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
            {id: 24, path: 'cs', hover: false, component: cs, name: 'Client应用', meta: 24},
            {id: 98, path: 'ST', hover: false, component: ST, name: 'ST应用', meta: 98},
            {id: 25, path: 'L3-Net', hover: false, component: L3, name: 'L3-Net应用', meta: 25},
            {id: 23, path: 'model1', hover: false, component: model1, name: '内网策略', meta: 23},
            {id: 75, path: 'model2', hover: false, component: model2, name:'白名单', meta: 75}
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
            {id: 242, path: 'webEnd', hover: false, component: webEnd, name: 'web终端', meta: 242},
            // {id: 243, path: 'webEndGroup', hover: false, component: webEndGroup, name: '用户组授权', meta: 243}
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
    //         {id: 73, path: 'nodeEquipment', hover: false, component: nodeEquipmentManager, name: '节点设备管理', meta: 73},
    //         {id: 71, path: 's2s', hover: false, component: s2sManager, name: 's2s设置', meta: 71},
    //         {id: 87, path: 'dataSync', hover: false, component: dataSyncManager, name: '数据同步管理', meta: 87},
    //         {id: 88, path: 's2c', hover: false, component: s2cManager, name: 's2c管理', meta: 88},
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
    //         {id: 67, path: 'ipsec', hover: false, component: ipsecConfig, name: 'Ipsec配置', meta: 67},
    //         {id: 68, path: 'ipsecDairy', hover: false, component: ipsecDairy, name: 'Ipsec日志', meta: 68}
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
    //         {id: 92, path: 'domainAdmin', hover: false, component: domainAdmin, name: '域名管理', meta: 92},
    //         {id: 93, path: 'region', hover: false, component: regionAdmin, name: '区域管理', meta: 93},
    //         {id: 94, path: 'line', hover: false, component: lineAdmin, name: '线路管理', meta: 94},
    //         {id: 95, path: 'recursion', hover: false, component: recursionAdmin, name: '递归管理', meta: 95},
    //         {id: 96, path: 'cache', hover: false, component: cacheAdmin, name: '缓存管理', meta: 96},
    //         {id: 97, path: 'quicklyAddRecord', hover: false, component: quicklyAddRecord, name: '快速添加记录', meta: 97, tag: true},
    //         {id: 99, path: 'resourceTransmit', hover: false, component: resourceTransmit, name: '资源转发', meta: 99},
    //         {id: 100, path: 'domainExport', hover: false, component: domainExport, name: '域名导入导出', meta: 100}
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
    //         {id: 101, path: 'domainVisit', hover: false, component: domainVisit, name: '域名访问统计', meta: 101},
    //         {id: 102, path: 'queryStatistic', hover: false, component: queryStatistic, name: '查询统计图', meta: 102},
    //         {id: 103, path: 'lineStatistic', hover: false, component: lineStatistic, name: '线路统计图', meta: 103},
    //         {id: 104, path: 'typeStatistic', hover: false, component: typeStatistic, name: '类型统计图', meta: 104},
    //         {id: 105, path: 'domainStatistic', hover: false, component: domainStatistic, name: '域名统计图', meta: 105},
    //         {id: 106, path: 'regionStatistic', hover: false, component: regionStatistic, name: '区域统计图', meta: 106},
    //         {id: 107, path: 'regionSpread', hover: false, component: regionSpread, name: '区域分布图', meta: 107}
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
    //         {id: 232, path: 'virtualService', hover: false, component:virtualService , name: '虚拟服务', meta: 232},
    //         {id: 233, path: 'serverPool', hover: false, component: serverPool, name: '服务器池', meta: 233},
    //         {id: 234, path: 'serverNode', hover: false, component: serverNode, name: '服务器节点', meta: 234},
    //         {id: 235, path: 'rules', hover: false, component:rules , name: '规则', meta: 235},
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
            {id: 58, path: 'ipConfig', hover: false, component: ipConfig, name: 'IP设置', meta: 58},
            {id: 59, path: 'ipGroup', hover: false, component: ipGroup, name: 'IP组设置', meta: 59},
            {id: 60, path: 'service', hover: false, component: service, name: '服务设置', meta: 60},
            {id: 61, path: 'fwTime', hover: false, component: fwTime, name: '时间设置', meta: 61},
            {id: 62, path: 'fwPolicy', hover: false, component: fwPolicy, name: '策略设置', meta: 62},
            {id: 63, path: 'snat', hover: false, component: snat, name: '源地址转换', meta: 63},
            {id: 64, path: 'dnat', hover: false, component: dnat, name: '目的地址转换', meta: 64}
        ]
    },

    {id: 34,flag: 34, icon: 'fa fa-sticky-note', firstMenu: true, isConnectSecond: false, path: '/401',isShowChildren: false, component: Err401, title: true, name: '日志中心', backColor: 'header'},
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
            {id: 36, path: 'logConfig', hover: false, component: LogConfig, name: '日志设置', meta: 36},
            {id: 37, path: 'downloadLog', hover: false, component: downloadLog, name: '日志下载', meta: 37},
            {id: 38, path: 'userLog', hover: false, component: userLog, name: '用户日志', meta: 38},
            {id: 39, path: 'adminLog', hover: false, component: adminLog, name: '管理员日志', meta: 39},
            {id: 40, path: 'systemLog', hover: false, component: systemLog, name: '系统日志', meta: 40},
            {id: 47, path: 'resourceLog', hover: false, component: resourceLoged, name: '资源日志', meta: 47},
            // {id: 48, path: 'localLog', hover: false, component: localLog, name: '日志查询', meta: 48}
            {id: 48, path: 'domainLog', hover: false, component: domainLog, name: '域名日志', meta: 48},
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
    //         {id: 42, path: 'loginStatistics', hover: false, component: loginStatistics, name: '用户登录与统计分析', meta: 42},
    //         {id: 43, path: 'resourceStatistics', hover: false, component: resourceStatistics, name: '资源统计与分析', meta: 43},
    //         {id: 44, path: 'flowStatistics', hover: false, component: flowStatistics, name: '流量统计与分析', meta: 44}
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
            {id: 152, path: 'sysOperation', hover: false, component: sysOperation, name: '系统操作', meta: 152},
            {id: 153, path: 'practicalTool', hover: false, component: practicalTool, name: '实用工具', meta: 153},
            {id: 154, path: 'backupRecovery', hover: false, component: backupRecovery, name: '备份与恢复', meta: 154},
            {id: 300, path: 'syshealthReport', hover: false, component: syshealthReport, name: '系统健康报告', meta: 300},
        ]
    },

    // {
    //     id: 117,
    //     path: '/enwas',
    //     component: Layout,
    //     name: '客户管理',
    //     icon: 'fa  fa fa-credit-card',
    //     children: [
    //         {id: 115, path: 'enwasCustomer', component: enwas_customer, name: '客户', meta: 115}
    //     ]
    // },

    {path: '*', redirect: '/404', hidden: true, meta: -1},
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({x:0,y: 0}),
    routes:data

});
