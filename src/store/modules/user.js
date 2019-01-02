import {loginByEmail, logout} from 'api/new-login';
import {getInfo} from 'api/login';
import Cookies from 'js-cookie';
import {getModuleStatus} from "../../api/systemSet/sysConfig/seriaNum";
import store from "../../store/index";
import permission from "../../store/permission";
import router from 'router';

const user = {
    state: {
        currentUser: {},
        //1.
        All:Cookies.get('X-Ivanka-All')=='true'?true:false,
        Main: Cookies.get('X-Ivanka-MAIN')=='true'?true:false,
        SSL: Cookies.get('X-Ivanka-SSL')=='true'?true:false,
        Pc: Cookies.get('X-Ivanka-PC')=='true'?true:false,
        Mobile: Cookies.get('X-Ivanka-MOBILE')=='true'?true:false,
        Enssl: Cookies.get('X-Ivanka-ENSSL')=='true'?true:false,
        Enwas: Cookies.get('X-Ivanka-ENWAS')=='true'?true:false,
        Charg: Cookies.get('X-Ivanka-CHARG')=='true'?true:false,
        Log: Cookies.get('X-Ivanka-LOG')=='true'?true:false,
        Ens2s: Cookies.get('X-Ivanka-ENS2S')=='true'?true:false,

        Ipsec: Cookies.get('X-Ivanka-IPSEC')=='true'?true:false,
        Dns: Cookies.get('X-Ivanka-DNS')=='true'?true:false,
        Firewall: Cookies.get('X-Ivanka-FIREWALL')=='true'?true:false,
        Haproxy: Cookies.get('X-Ivanka-HAPROXY')=='true'?true:false,
        Terminal: Cookies.get('X-Ivanka-TERMINAL')=='true'?true:false,
        // Terminal
        power: Cookies.get('power'),
        powerRead: Cookies.get('powerRead'),
        user: '',
        status: '',
        email: '',
        code: '',
        uid: undefined,
        auth_type: '',
        token: Cookies.get('SESSION'),
        name: Cookies.get('name'),
        roleName:Cookies.get('roleName'),
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },
    mutations: {
        //2.
        SET_All: (state, All) => {
            state.All = All;
        },
        SET_SSL: (state, SSL) => {
            state.SSL = SSL;
        },
        SET_MAIN: (state, Main) => {
            state.Main = Main;
        },
        SET_PC: (state, Pc) => {
            state.Pc = Pc;
        },
        SET_MOBILE: (state, Mobile) => {
            state.Mobile = Mobile;
        },
        SET_ENSSL: (state, Enssl) => {
            state.Enssl = Enssl;
        },
        SET_ENWAS: (state, Enwas) => {
            state.Enwas = Enwas;
        },
        SET_CHARG: (state, Charg) => {
            state.Charg = Charg;
        },
        SET_LOG: (state, Log) => {
            state.Log = Log;
        },
        SET_ENS2S: (state, Ens2s) => {
            state.Ens2s = Ens2s;
        },

        SET_IPSEC: (state, Ipsec) => {
            state.Ipsec = Ipsec;
        },
        SET_DNS: (state, Dns) => {
            state.Dns = Dns;
        },
        SET_FIREWALL: (state, Firewall) => {
            state.Firewall = Firewall;
        },

        SET_HAPROXY: (state, Haproxy) => {
            state.Haproxy = Haproxy;
        },
        SET_TERMINAL: (state, Terminal) => {
            state.Terminal = Terminal;
        },
        // *************END****************
        SET_AUTH_TYPE: (state, type) => {
            state.auth_type = type;
        },
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_UID: (state, uid) => {
            state.uid = uid;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_ROLENAME: (state, roleName) => {
            state.roleName = roleName;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_POWER: (state, power) => {
            state.power = power;
        },
        SET_POWERREAD: (state, powerRead) => {
            state.powerRead = powerRead;
        },
        LOGIN_SUCCESS: (state, currentUser) => {
            state.currentUser = currentUser;
        },
        LOGOUT_USER: state => {
            state.user = '';
        }
    },

    actions: {
        login({commit}, userInfo) {
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                loginByEmail(email, userInfo.password).then(response => {
                    console.log("resp:", response, response.extend.roleName)
                    if (response.status == 'SUCCESS') {
                        const data = response.data;
                        commit('LOGIN_SUCCESS', response.data);
                        // Cookies.set('X-Ivanka-Token', response.data);
                        commit('SET_TOKEN', response.data);
                        commit('SET_EMAIL', email);
                        commit('SET_NAME', email);
                        Cookies.set('roleName', response.extend.roleName);
                        commit('SET_ROLENAME', response.extend.roleName);//roleName
                        console.log( response.extend.roleName,'---')
                        Cookies.set('name', email);
                        Cookies.set('SESSION', response.data);
                        /**/
                        // Cookies.set('foo', 'ddd');
                        // var power = response..power
                        // var powerjson = ''
                        // if (power && null != power && 'null' != power) {
                        //     powerjson = power.powerjson
                        // }
                        var power = response.extend.access
                        console.log('power:', power);
                        var powerjson = ''
                        if (power && null != power && 'null' != power) {
                            let pItem = [];
                            let item = [];
                            let readonly = []
                            let data = response.extend.access.accessContentDTOList;
                            for (let i = 0; i < data.length; i++){
                                pItem.push(data[i].id);
                                if(data[i].readOnly == true){
                                    readonly.push(data[i].id);
                                }
                                if (data[i].accessContentDTOList != null){
                                    for (let j = 0; j < data[i].accessContentDTOList.length; j++){
                                        item.push(data[i].accessContentDTOList[j].id);
                                        if(data[i].accessContentDTOList[j].readOnly == true){
                                            readonly.push(data[i].accessContentDTOList[j].id)
                                        }
                                    }
                                }
                            }
                            powerjson = {
                                item: item,
                                pItem: pItem,
                                readonly: readonly
                            }
                            console.log('powerjson:', powerjson);
                        }
                        Cookies.set('power', powerjson);
                        commit('SET_POWER', powerjson);
                        Cookies.set('powerRead', power);
                        commit('SET_POWERREAD', power);
                        permission.init({
                            roles: powerjson,
                            router: router.options.routes
                        });
                    }
                    resolve(response);
                }).catch(error => {
                    console.log("登录失败:", error)
                    reject(error);
                });
            });
        },


        approveLicense({commit}, type) {
            let value = true;
            console.log('type0',type)
            if (type == 'SSL') {
                Cookies.set('X-Ivanka-All', value);
                commit('SET_All', value);
            }
            if (type == 'SSL') {
                Cookies.set('X-Ivanka-SSL', value);
                commit('SET_SSL', value);
            }
            if (type == 'Main') {
                Cookies.set('X-Ivanka-MAIN', value);
                commit('SET_MAIN', value);
            }
            if (type == 'Pc') {
                Cookies.set('X-Ivanka-PC', value);
                commit('SET_PC', value);
            }
            if (type == 'Mobile') {
                Cookies.set('X-Ivanka-MOBILE', value);
                commit('SET_MOBILE', value);
            }
            if (type == 'Enssl') {
                Cookies.set('X-Ivanka-ENSSL', value);
                commit('SET_ENSSL', value);
            }
            if (type == 'Enwas') {
                Cookies.set('X-Ivanka-ENWAS', value);
                commit('SET_ENWAS', value);
            }
            if (type == 'Charg') {
                Cookies.set('X-Ivanka-CHARG', value);
                commit('SET_CHARG', value);
            }
            if (type == 'Log') {
                Cookies.set('X-Ivanka-LOG', value);
                commit('SET_LOG', value);
            }
            if (type == 'Ens2s') {
                Cookies.set('X-Ivanka-ENS2S', value);
                commit('SET_ENS2S', value);
            }

            if (type == 'Ipsec') {
                Cookies.set('X-Ivanka-IPSEC', value);
                commit('SET_IPSEC', value);
            }
            if (type == 'Dns') {
                Cookies.set('X-Ivanka-DNS', value);
                commit('SET_DNS', value);
            }
            if (type == 'Firewall') {
                Cookies.set('X-Ivanka-FIREWALL', value);
                commit('SET_FIREWALL', value);
            }

            if (type == 'Haproxy') {
                Cookies.set('X-Ivanka-HAPROXY', value);
                commit('SET_HAPROXY', value);
            }
            if (type == 'Terminal') {

                Cookies.set('X-Ivanka-TERMINAL', value);
                console.log('type',type,Cookies.get('X-Ivanka-TERMINAL'))
                commit('SET_TERMINAL', value);
            }

        },


        checkLicense({commit}) {
            getModuleStatus().then(response => {
                console.log('response_status',response)
                if (response.status == 'SUCCESS') {

                    Cookies.set('X-Ivanka-All', response.data.All == null ? false : response.data.All);
                    Cookies.set('X-Ivanka-SSL', response.data.SSL == null ? false : response.data.SSL);
                    Cookies.set('X-Ivanka-MAIN', response.data.Main == null ? false : response.data.Main);

                    Cookies.set('X-Ivanka-PC', response.data.Pc == null ? false : response.data.Pc);
                    Cookies.set('X-Ivanka-MOBILE', response.data.Mobile == null ? false : response.data.Mobile);
                    Cookies.set('X-Ivanka-ENSSL', response.data.Enssl == null ? false : response.data.Enssl);
                    Cookies.set('X-Ivanka-ENWAS', response.data.Enwas == null ? false : response.data.Enwas);
                    Cookies.set('X-Ivanka-CHARG', response.data.Charg == null ? false : response.data.Charg);
                    Cookies.set('X-Ivanka-LOG', response.data.Log == null ? false : response.data.Log);
                    Cookies.set('X-Ivanka-ENS2S', response.data.Ens2s == null ? false : response.data.Ens2s);

                    Cookies.set('X-Ivanka-IPSEC', response.data.Ipsec == null ? false : response.data.Ipsec);
                    Cookies.set('X-Ivanka-DNS', response.data.Dns == null ? false : response.data.Dns);
                    Cookies.set('X-Ivanka-FIREWALL', response.data.Firewall == null ? false : response.data.Firewall);

                    Cookies.set('X-Ivanka-HAPROXY', response.data.Haproxy == null ? false : response.data.Haproxy);
                    Cookies.set('X-Ivanka-TERMINAL', response.data.Terminal == null ? false : response.data.Terminal);

                    commit('SET_All', response.data.All == null ? false : response.data.All);
                    commit('SET_SSL', response.data.SSL == null ? false : response.data.SSL);
                    commit('SET_MAIN', response.data.Main == null ? false : response.data.Main);


                    commit('SET_PC', response.data.Pc == null ? false : response.data.Pc);
                    commit('SET_MOBILE', response.data.Mobile == null ? false : response.data.Mobile);
                    commit('SET_ENSSL', response.data.Enssl == null ? false : response.data.Enssl);
                    commit('SET_ENWAS', response.data.Enwas == null ? false : response.data.Enwas);
                    commit('SET_CHARG', response.data.Charg == null ? false : response.data.Charg);
                    commit('SET_LOG', response.data.Log == null ? false : response.data.Log);
                    commit('SET_ENS2S', response.data.Ens2s == null ? false : response.data.Ens2s);

                    commit('SET_IPSEC', response.data.Ipsec == null ? false : response.data.Ipsec);
                    commit('SET_DNS', response.data.Dns == null ? false : response.data.Dns);
                    commit('SET_FIREWALL', response.data.Firewall == null ? false : response.data.Firewall);

                    commit('SET_HAPROXY', response.data.Haproxy == null ? false : response.data.Haproxy);
                    commit('SET_TERMINAL', response.data.Terminal == null ? false : response.data.Terminal);


                    console.log('in user store:SSL:', store.getters.SSL,response,'checkLicense');
                    console.log('in user store:Main:', store.getters.Main);
                    console.log('in user store:Dns:', store.getters.Dns);
                    console.log('web:', store.getters.Terminal);
                }
            }).catch((e) => {
                console.log(e)
            });
        },

        // 获取用户信息
        GetInfo({commit, state}) {
            // return new Promise((resolve, reject) => {
            //     getInfo(state.token).then(response => {
            //         commit('SET_ROLES', state.roles);
            //         commit('SET_NAME', state.currentUser.name);
            //         var imgUrl = require('../../assets/menu.png')
            //         commit('SET_AVATAR', imgUrl);
            //         commit('SET_INTRODUCTION', state.currentUser.name);
            //         resolve(state.currentUser);
            //     }).catch(error => {
            //         reject(error);
            //     });
            // });
        },
        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '');
                    Cookies.remove('SESSION');
                    Cookies.remove('X-Ivanka-All');
                    Cookies.remove('X-Ivanka-MAIN');
                    Cookies.remove('X-Ivanka-SSL');
                    Cookies.remove('X-Ivanka-PC');
                    Cookies.remove('X-Ivanka-MOBILE');
                    Cookies.remove('X-Ivanka-ENSSL');
                    Cookies.remove('X-Ivanka-ENWAS');
                    Cookies.remove('X-Ivanka-CHARG');
                    Cookies.remove('X-Ivanka-LOG');
                    Cookies.remove('X-Ivanka-ENS2S');
                    Cookies.remove('X-Ivanka-IPSEC');
                    Cookies.remove('X-Ivanka-DNS');
                    Cookies.remove('X-Ivanka-FIREWALL');
                    Cookies.remove('X-Ivanka-HAPROXY');
                    Cookies.remove('X-Ivanka-TERMINAL');

                    Cookies.remove('power');
                    Cookies.remove('powerRead');
                    Cookies.remove('name');
                    Cookies.remove('roleName');
                    window.location.reload();
                    resolve();
                }).catch(error => {
                    commit('SET_TOKEN', '');
                    Cookies.remove('SESSION');
                    // commit('SET_ROLES', []);
                    // Cookies.remove('X-Ivanka-Token');
                    Cookies.remove('X-Ivanka-MAIN');
                    Cookies.remove('X-Ivanka-SSL');
                    resolve();
                });
            });
        },
        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('SESSION');
                Cookies.remove('SESSION');
                Cookies.remove('X-Ivanka-All');
                Cookies.remove('X-Ivanka-MAIN');
                Cookies.remove('X-Ivanka-SSL');
                Cookies.remove('X-Ivanka-PC');
                Cookies.remove('X-Ivanka-MOBILE');
                Cookies.remove('X-Ivanka-ENSSL');
                Cookies.remove('X-Ivanka-ENWAS');
                Cookies.remove('X-Ivanka-CHARG');
                Cookies.remove('X-Ivanka-LOG');
                Cookies.remove('X-Ivanka-ENS2S');
                Cookies.remove('X-Ivanka-IPSEC');
                Cookies.remove('X-Ivanka-DNS');
                Cookies.remove('X-Ivanka-FIREWALL');
                Cookies.remove('X-Ivanka-HAPROXY');
                Cookies.remove('X-Ivanka-TERMINAL');

                Cookies.remove('power');
                Cookies.remove('powerRead');
                Cookies.remove('name');
                Cookies.remove('roleName');
                window.location.reload();
                resolve();
            });
        }
    }
};

export default user;
