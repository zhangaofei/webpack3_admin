import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import loginAPI from './login';
import articleAPI from './article';
import article_tableAPI from './article_table';
import remoteSearchAPI from './remoteSearch';
import adminUserAPI from  './user';
import adminTypeAPI from  './type';
import adminResourceAPI from  './resource';
import adminRuleAPI from  './engine';
import adminRdpAPI from  './rdp';



const mock = new MockAdapter(axios);
//self
mock.onPost('/api/rdp/list').reply(adminRdpAPI.getRdpList);
// 登录相关
// mock.onPost('/api/login').reply(loginAPI.loginByEmail);
// mock.onGet('/api/login').reply(loginAPI.loginByEmail);
// mock.onPost('/login/logout').reply(loginAPI.logout);
// mock.onGet('/user/info').reply(loginAPI.getInfo);

//admin相关
mock.onPost('/api/user/list').reply(adminUserAPI.getUserList);
mock.onGet('/admin/user/add').reply(adminUserAPI.addUser);
mock.onGet('/admin/user/update').reply(adminUserAPI.updateUser);
mock.onGet('/admin/user/delete').reply(adminUserAPI.deleteUser);

mock.onGet('/admin/type/list').reply(adminTypeAPI.getTypeList);
mock.onGet('/admin/type/add').reply(adminTypeAPI.addType);
mock.onGet('/admin/type/update').reply(adminTypeAPI.updateType);
mock.onGet('/admin/type/delete').reply(adminTypeAPI.deleteType);

mock.onGet('/admin/resource/list').reply(adminResourceAPI.getResourceList);
mock.onGet('/admin/resource/add').reply(adminResourceAPI.addResource);
mock.onGet('/admin/resource/update').reply(adminResourceAPI.updateResource);
mock.onGet('/admin/resource/delete').reply(adminResourceAPI.deleteResource);

mock.onGet('/admin/rule/list').reply(adminRuleAPI.getRuleList);
mock.onGet('/admin/rule/add').reply(adminRuleAPI.addRule);
mock.onGet('/admin/rule/update').reply(adminRuleAPI.updateRule);
mock.onGet('/admin/rule/delete').reply(adminRuleAPI.deleteRule);

// 文章相关
mock.onGet('/article/list').reply(articleAPI.getList);
mock.onGet('/article/detail').reply(articleAPI.getArticle);

// table example相关
mock.onGet('/article_table/list').reply(article_tableAPI.getList);
mock.onGet('/article_table/pv').reply(article_tableAPI.getPv);

// 搜索相关
mock.onGet('/search/user').reply(remoteSearchAPI.searchUser);
//远程
mock.onGet('/api/rdp/list').reply(rdpAPI.getRdpList);
mock.onGet('/api/rdp/add').reply(rdpAPI.addRdp);
mock.onGet('/api/rdp/update').reply(rdpAPI.updateRdp);
mock.onGet('/api/rdp/delete').reply(rdpAPI.deleteRdp);
mock.onGet('/api/rdp/multiDelete').reply(rdpAPI.multiDelete);

export default mock;
