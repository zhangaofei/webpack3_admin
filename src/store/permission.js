import store from "../store/index";
import tool from '../utils/stringTools';
import {hasPermission} from '../utils/permissionUtil';

const permission = {
    state: {
        permissionRoutes: []
    },
    init(data) {
        const roles = data.roles;
        const router = data.router;
        if (store.getters.name != 'admin' && (tool.isNull(data) || tool.isNull(data.roles) || tool.isNull(data.router))) {
            this.permissionRoutes = []
            return
        }

        // /*权限控制（admin）有所有权限 34,91,155*/
        // let allRoles=[4,5,18  ,210,211];/*首页都有权限*/

        /*权限控制（admin）有所有权限 34,91,155；id=7系统设置，id=8序列号*/
        let allRoles=[4,5,18,7,8];/*首页都有权限*/


        if(roles!=''){
            if(typeof (roles)=='string'){
                for(let item of JSON.parse(roles).item.concat(JSON.parse(roles).pItem) ){
                    allRoles.push(item)
                }
            }else {
                for(let item of roles.item.concat(roles.pItem) ){
                    allRoles.push(item)
                }
            }

        }else {
            /*admin*/
            for(let item of router){
                if(item.hasOwnProperty('id')&&item.id){
                    allRoles.push(item.id);
                    if(item.hasOwnProperty('children')&&item.children.length>0){
                        for(let subItem of item.children){
                            allRoles.push(subItem.id);
                        }

                    }
                }
            }
        }
        // console.log('allRoles:',allRoles)
        const permissionRoutes = router.filter((v,index) => {
            if (store.getters.name.indexOf('admin') >= 0) {
                if (-1 != v.meta) {
                    v.hidden = false;
                } else {
                    v.hidden = true;
                }
            }
            if (v.hasOwnProperty('title') && v.title) {
                v.hidden = false;
                return true
            }
            if (hasPermission(roles, v)) {
                if (v.children && v.children.length > 0) {
                    v.children.filter(child => {
                        if (hasPermission(roles, child)) {
                            child.hidden = false
                            return true
                        } else {
                            child.hidden = true
                            return true;
                        }
                    });
                    v.hidden = false
                    return true
                } else {
                    v.hidden = true
                    return true
                }
            } else {
                v.hidden = true
                return true;
            }


        });
        // console.log('permissionRoutes==',this,this.permissionRoutes)
        this.permissionRoutes = permissionRoutes;
        this.allRoles=allRoles
    },
    get() {
        // console.log('getFun',this.permissionRoutes)
        return this.permissionRoutes
    },
    /**/
    getRole(){
        return this.allRoles
    }
};

export default permission;
