/**
 * Created by ENLINK on 2017/8/4.
 */
/*
数据认证类型
('00':本地认证;'01':mysql,'02':oracle,'03':sql server;'10':LDAP,'11':RADIUS,'12':AD)
*/

const serverMap={
    "00":'本地认证',
    "01":'mysql认证',
    "02":'oracle认证',
    "03":'sql server认证',
    "10":'LDAP认证',
    "11":'RADIUS认证' ,
    "12":'AD认证'
}

export function getCerServerByKey(key) {
        let result=serverMap[key];
        if(result==null){
            return "-";
        }
        return result;
}

