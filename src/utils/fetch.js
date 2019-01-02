import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store';
import router from '../router';



axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export function fetch(options) {
    let header = {};
    let body = {};
    if (options.method == 'PATCH' || options.method == 'post' || options.method == 'put' || options.method == 'delete' || options.method == 'DELETE' || options.method == 'PUT' || options.method == 'POST') {
        header = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        body = options.body;
    }
    return new Promise((resolve, reject) => {
        axios({
            //baseURL: process.env.BASE_API,
            timeout: 200000,
            credentials: 'include',
            method: options.method,
            url: options.url,
            data: body,
            params: options.params,
            headers: header
        }).then(response => {
            const res = response.data;
            // console.log(res,'res==')
            if (res.status != 'SUCCESS' && res.status != 1) {
                // Message({
                //     message: res,
                //     type: 'error',
                //     duration: 1 * 1000
                // });
                // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
                if (res.hasOwnProperty('code') && (res.code.error ==='Exception_004'||res.code.error ==='ERROR_LICENSE_009'||res.code.error ==='Exception_008')) {
                    if(res.code.error == 'ERROR_COMMON_NAME_DATA__NOT_EXIST'){
                        Message({
                            message: '该用户没有开启计费模式!',
                            type: 'warning',
                            duration: 3 * 1000
                        });
                    } else {
                        Message({
                            message: res.code.info,
                            type: 'warning',
                            duration: 3 * 1000
                        });
                    }
                    // 登出
                    store.dispatch('FedLogOut').then(() => {
                        router.push({path: '/login'})
                    });
                    return;
                }
                if(res.hasOwnProperty('code') && res.code.info && (res.code.info !='')){
                    console.log("codeInfo",res.code.info)
                    if(res.code.error == 'ERROR_COMMON_NAME_DATA__NOT_EXIST'){
                        Message({
                            message: '该用户没有开启计费模式!',
                            type: 'warning',
                            duration: 3 * 1000
                        });
                    } else if(res.code.error == 'Exception_005'){
                            Message({
                            message: '提交的参数存在错误!',
                            type: 'warning',
                            duration: 3 * 1000
                        });
                    } else {
                        Message({
                            message: res.code.info,
                            type: 'warning',
                            duration: 3 * 1000
                        });
                    }
                }
                else {
                    resolve(res);
                }
                resolve(res);
            }
            else {
                resolve(res);
            }

        }).catch(error => {
            reject(error)
            console.log("fetch err:", error)
            // Message({
            //     message: error,
            //     type: 'error',
            //     duration: 2 * 1000
            // });

            // reject(error);//注释
        });
    })
}
