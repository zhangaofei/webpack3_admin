import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'admin-lte'
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
import store from './store';

import 'assets/custom-theme/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'normalize.css/normalize.css';
import 'styles/index.scss';
import 'styles/element-customized.scss';
import 'components/Icon-svg/index';
import 'assets/iconfont/iconfont';
import * as filters from './filters';
import Multiselect from 'vue-multiselect';
import Sticky from 'components/Sticky';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import vueWaves from './directive/waves';
import vueSticky from './directive/sticky';
import errLog from 'store/errLog';
import { hasPermission } from './utils/permissionUtil';
import globalMixin from './mixin/configMixin';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/common.scss';
import 'flex.css'
// import './mock/index.js';
// register globally
Vue.prototype.$http = axios;
Vue.component('multiselect', Multiselect);
Vue.component('Sticky', Sticky);
Vue.use(ElementUI);
Vue.use(vueWaves);
Vue.use(vueSticky);
Vue.mixin(globalMixin);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

function checkHasPermission(roles, id) {
    if (store.getters.name && store.getters.name.indexOf('admin') >= 0) {
        return true;
    }
    if (id == -1) {
        return true
    }
    if (undefined == roles || roles == null) {
        return false
    }
    return hasPermission(roles, { id: id.toString() })
}

// register global progress.
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
    document.body.scrollTop = 0;
    document.getElementsByClassName('app-main content-wrapper').scrollTop=0;
    next();

  if (store.getters.token) {
    if (to.path === '/login' || to.path === '/' || to.path === '/admin' || (to.path == '/404' && to.redirectedFrom == '/')) {
      next({ path: '/admin/home' });
    } else {
      if (to.meta) {
        if (checkHasPermission(store.getters.power, to.meta)) {
          next();
        } else {
          if(to.path == '/admin/quicklyAddRecord'||to.path == '/admin/seriaNum'){
              next();
          } else {
              next('/401');
          }
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList && whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});


// 生产环境错误日志
if (process.env === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
