/**
 * Created by zuce wei on 2017/7/26.
 */
import {fetch} from 'utils/fetch';

// ======================管理后台模块接口 Start ===========================
/**
 * 获取日志设置信息
 * @returns {*}
 */
export function getLogList() {
    return fetch({
        url: '/api/admin/logSetting',
        method: 'get'
    });
}

/**
 * 获取日志存储服务器集合
 * @returns {*}
 */
export function getLogServerList() {
    return fetch({
        url: '/api/admin/logSetting/logserverList',
        method: 'get'
    });
}

/**
 * 保存日志设置信息
 * @param params
 * @returns {*}
 */
export function saveLogList(params) {
    return fetch({
        url: '/api/admin/logSetting',
        method: 'post',
        body: params
    });
}

/**
 * 获取在线人数
 * @returns {*}
 */
export function getOnlinePerson() {
    return fetch({
        url: '/api/admin/auth/onlineUserNum',
        method: 'get'
    });
}

/**
 * 网络速率
 * @returns {*}
 */
export function getNetspeed() {
    return fetch({
        url: '/api/admin/sysTool/netUsage',
        method: 'get'
    });
}

// ======================管理后台模块接口 End ===========================

// ======================日志模块接口 Start ===========================

const urlRoot = "/logs/api";
let es_management='/es-management/api'

// 获取用户组、用户权限、以及认证服务器、日志级别等动态条件，用于精确搜索
export function selectConditionList(logType, condition) {
    return fetch({
        url: urlRoot + '/log/groupConditions',
        method: 'get',
        params: {
            'logType': logType,
            "condition": condition
        }
    });
}

// 用户、管理员、登录、资源日志查询
export function logList(logType, condition) {
    return fetch({
        url: urlRoot + '/log/list',
        method: 'post',
        params: {
            'logType': logType,
        },
        body: condition
    });
}


// ================================资源日志统计分析================================

// 统计与分析-资源统计与分析-访问资源排行榜/下载资源排行榜/上传资源排行榜 type：访问资源排行榜(all)\下载资源排行榜(down)\上传资源排行榜(up)
export function linkTrafficRank(type, topCount, timeCondition) {
    return fetch({
        url: urlRoot + '/reslog/linkTrafficRank',
        method: 'post',
        params: {
            topCount: topCount,
            type: type
        },
        body: timeCondition
    });
}

// 统计与分析-资源统计与分析-访问应用类型占比
export function accessApplicationPie(timeCondition) {
    return fetch({
        url: urlRoot + '/reslog/applicationPie',
        method: 'post',
        params: {
            topCount: 9
        },
        body: timeCondition
    });
}

// 统计与分析-资源统计与分析-下载/上传文件格式的占比（type=down/up）
export function loadFileFormatPie(type, timeCondition) {
    return fetch({
        url: urlRoot + '/reslog/fileFormatPie',
        method: 'post',
        params: {
            topCount: 10,
            type: type
        },
        body: timeCondition
    });
}


// 统计与分析-流量统计与分析-用户流量排行榜（type=userName/userGroup/res）
export function trafficRank(type, topCount, condition) {
    return fetch({
        url: urlRoot + '/reslog/trafficRank',
        method: 'post',
        params: {
            type: type,
            topCount: topCount
        },
        body: condition
    });
}

// 统计与分析-流量统计与分析-用户流量统计/应用资源流量统计
export function trafficGroupStatics(type, condition) {
    return fetch({
        url: urlRoot + '/reslog/trafficGroupStatics',
        method: 'post',
        params: {
            'type': type
        },
        body: condition
    });
}

// 统计与分析-流量统计与分析-应用资源流量统计-详情
export function trafficDetails(type, condition) {
    return fetch({
        url: urlRoot + '/traffic/trafficDetails',
        method: 'post',
        params: {
            'type': type
        },
        body: condition
    });
}

// ================================用户日志统计=======================================

// 统计与分析-用户登录与统计分析-用户登录排行-用户登录排行榜
export function userLoginRank(topCount, choice, condition) {
    return fetch({
        url: urlRoot + '/userlog/userLoginRank',
        method: 'post',
        params: {
            'topCount': topCount
        },
        body: condition
    });
}

// 统计与分析-用户登录与统计分析-用户登录排行-终端系统占比
export function userLoginTerminalPie(condition) {
    return fetch({
        url: urlRoot + '/userlog/terminalPie',
        method: 'post',
        body: condition
    });
}

// 统计与分析-用户登录与统计分析-用户登录统计
export function userLoginGroupStatics(condition) {
    return fetch({
        url: urlRoot + '/userlog/userLoginGroupStatics',
        method: 'post',
        body: condition
    });
}

// 统计与分析-用户登录与统计分析-用户登录统计-用户登录明细
export function userLoginDetails(condition) {
    return fetch({
        url: urlRoot + '/userlog/userLoginDetails',
        method: 'post',
        body: condition
    });
}

// ==================================用户日志统计End =======================================================


// =================================首页日志统计Start========================================================

// 首页>>用户Top5排行>>用户登录总数
export function getLoginCount(params) {
    return fetch({
        url: urlRoot + '/log/totalLoginCount',
        method: 'post',
        body: params
    });
}

// 首页>>用户Top5排行>>用户访问流量总和 === 首页>>应用Top5排行>>应用访问流量总和
export function getLoginFlow(params) {
    return fetch({
        url: urlRoot + '/log/resTotalFlow',
        method: 'post',
        body: params
    });
}


// 首页>>用户Top5排行>>用户流量top5排行列表
export function homeTrafficRank(topCount, condition) {
    return fetch({
        url: urlRoot + '/log/trafficTopCount',
        method: 'post',
        params: {
            topCount: topCount
        },
        body: condition
    });
}

// 首页>>用户Top5排行>>用户登录top5排行列表
export function loginTopCount(condition, topCount) {
    return fetch({
        url: urlRoot + '/log/loginTopCount',
        method: 'post',
        params: {
            'topCount': topCount
        },
        body: condition
    });
}

// 首页>>应用Top5排行>>应用资源总数
export function getResTotalCount(param) {
    return fetch({
        url: urlRoot + '/log/resTotal',
        method: 'post',
        params: {},
        body: param
    });
}

// 首页>>应用Top5排行>>应用流量top5排行列表
export function appTrafficTop(condition, topCount) {
    return fetch({
        url: urlRoot + '/log/resTotalTopCount',
        method: 'post',
        params: {
            topCount: topCount
        },
        body: condition
    });
}

// 首页>>应用Top5排行>>应用访问top5排行列表
export function resourceVisitRank(timeCondition, topCount) {
    return fetch({
        url: urlRoot + '/log/resAccessTotalTopCount',
        method: 'post',
        params: {
            'topCount': topCount
        },
        body: timeCondition
    });
}

// 首页>>网卡流量图
export function getFlowList() {
    return fetch({
        url: es_management + '/network/traffic',
        method: 'get',
    });
}

// =================================首页日志统计 End========================================================


export function trafficRank_r(type, topCount, choice, condition) {
    return fetch({
        url: urlRoot + '/traffic/trafficRank',
        // url:'api/traffic/userFlowAndLoginCount',
        method: 'post',
        params: {
            'type': type,
            topCount: topCount,
            choice: choice
        },
        body: condition
    });
}

/******************
 *
 *用户组/资源类型流量占比 type：user/resource localhost:8100/traffic/trafficPie?type=user
 ********************/
// 统计与分析-流量统计与分析-用户组流量占比（type：user/resource）
export function trafficPie(type, condition) {
    return fetch({
        url: urlRoot + '/traffic/trafficPie',
        method: 'post',
        params: {
            'type': type
        },
        body: condition
    });
}

/****************************
 *
 * *获取访问资源排行榜数据**
 *
 ****************************/


/*******************************
 *
 *获取访问资源的详情数据
 *
 * *****************************/

export function resourceVisitDetails(condition) {
    return fetch({
        url: urlRoot + '/resLog/resourceVisitDetails',
        method: 'post',
        body: condition
    });
}


/*******************
 *
 *最近30天日志累计折线图
 *
 ********************/
export function recentMonthStatics() {
    return fetch({
        url: urlRoot + '/log/recentMonthStatics',
        method: 'get'
    });
}


/**************
 *
 * 获取日志设置
 *
 **************/
export function getLogSetting() {
    return fetch({
        url: urlRoot + '/log/setting',
        method: 'get'
    });
}

/**************
 *
 * 重置日期设置
 *
 **************/
export function resetSetting(setting) {
    return fetch({
        url: urlRoot + '/log/setting',
        method: 'post',
        body: setting
    });
}
/*2018-8-27 新需求  首页登录数据接口*/
// let es_management='/es-management/api'
export function getTopRank(param,num) {
    return fetch({
        url: es_management+'/topRanking/top/'+num,
        method: 'post',
        body: param
    });
}
/* 域名日志*/
export function domainLogAdd(param) {
    return fetch({
        url: '/api/enwas/logs/domian/add',
        method: 'post',
        body:param
    });
}
export function domainLogList(param) {
    return fetch({
        url: '/api/enwas/logs/domian/list',
        method: 'post',
        body:param
    });
}
export function domainLogEdit(param) {
    return fetch({
        url: '/api/enwas/logs/domian/modify',
        method: 'post',
        body:param
    });
}
export function getDomainLogEditList(param) {
    return fetch({
        url: '/api/enwas/logs/subdomians/list',
        method: 'post',
        body:param
    });
}
export function domainLogDelete(param) {
    return fetch({
        url: '/api/enwas/logs/domian/del',
        method: 'post',
        body:param
    });
}
