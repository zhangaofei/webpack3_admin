/*
import Cookies from 'js-cookie'
import {getUserList} from '@/api/admin';
const admin = {
    state: {
        userList: [],
        appRoles: [{
            value: '1',
            label: '管理员'
        },
            {
                value: '2',
                label: '普通用户'
            }],
        resourceType: [],
        parts: [{id: '1', name: '请求头', describe: '请求头部'},
            {id: '2', name: '请求cookie', describe: '请求cookie'},
            {id: '3', name: '请求体', describe: '请求体'},
            {id: '4', name: '响应头', describe: '响应头'},
            {id: '5', name: '重定向', describe: '重定向url'},
            {id: '6', name: '响应cookie', describe: '响应cookie'},
            {id: '7', name: '响应体', describe: '响应体'}
        ],
        actions: [
            {id: '1', name: '替换', describe: '处理静态本内容，以source的值为变量名根据指定的阶段（请求头，请求cookie...）从响应的位置取出变量，把likeContent替换为 content'},
            {id: '2', name: '保存', describe: '处理动态内容，以content的值为变量名，从头部，参数等部分获得值，以source的值为变量名保存到dict中'},
            {id: '3', name: '注入', describe: '向请求数据对象中添加以前“保存”过的值，把以前保存的以content值为变量名的变量，添加到source(请求头字段等等)指定的字段中'}
        ],
        compares: [{id: '1', name: '等于', value: '等于'}, {id: '2', name: '包含', value: '包含'}],
        // methods: [{id: '1', name: 'GET'}, {id: '2', name: 'POST'}],
        variables: [{id: '1', name: 'uri', value: 'uri'}, {id: '2', name: 'host', value: 'host'}, {id: '3', name: 'method', value: 'method'}]

    },
    mutations: {
        SET_USER_LIST: (state, userList) => {
            state.userList = userList
        }
    },
    actions: {
        getUserList: ({commit}) => {
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                getUserList().then(response => {
                    const data = response.data;
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
}
export default admin;
*/
