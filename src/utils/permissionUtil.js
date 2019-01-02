import store from "../store/index";
export function hasPermission(roles, route) {
    if (undefined == roles || null == roles) {
        return false
    }
    if('admin' == store.getters.name ){
        return true
    }

    // <!-- 首页菜单id4和5  首页任何管理员都有权限 -->
    if (route.hasOwnProperty('id') && route.id && ('4' == route.id || '5' == route.id)) {
        return true
    }
    if (route.hasOwnProperty('id') && route.id && (typeof roles == 'string' ) && -1 != roles.indexOf(parseInt(route.id))) {
        return true
    }
    else if (route.hasOwnProperty('id') && route.id && (typeof roles == 'object' )) {
        if (roles.hasOwnProperty('item') && -1 != roles.item.indexOf(parseInt(route.id))) {
            return true
        }
        if (roles.hasOwnProperty('pItem') && -1 != roles.pItem.indexOf(parseInt(route.id))) {
            return true;
        }
    }
    else {
        return false
    }
}

export function isReadonly(id) {
    if('admin' == store.getters.name ){
        return false;
    } else {
        let type1 = typeof (store.getters.power);
        var arr1;
        if(type1 == 'string'){
           arr1 = JSON.parse(store.getters.power);
        } else {
            arr1 = store.getters.power;
        }
        let arr = arr1.readonly;
        console.log('arr:', arr1.readonly);
        if(arr == [] || arr == undefined  || arr == null){
            return false;
        } else {
            if(arr.indexOf(parseInt(id)) != -1){
                return true;
            } else {
                return false;
            }
        }
    }
}
