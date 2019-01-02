/**
 * Created by Administrator on 2017/9/19.
 */
import {fetch} from 'utils/fetch';

export function getSyslogList() {
    return fetch({
        url: '/api/admin/logSetting/configSyslog',
        method: 'get'
    });
}
// export function getLogServerList() {//获取数组
//     return fetch({
//         url: '/api/admin/logSetting/logserverList',
//         method: 'get'
//     });
// }
export function saveSyslogList(parm) {
    return fetch({
        url: '/api/admin/logSetting/configSyslog',
        method: 'post',
        body:parm
    });
}
