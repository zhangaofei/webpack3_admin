/**
 * Created by wjc on 2017/5/10.
 */
export default {
    isNull: (obj) => {
        if (obj == null || obj == '' || obj == undefined) {
            return true
        }
        return false
    },
    trim:function(str){ //删除左右两端的空格
        console.log("用到是否为空的方式：")
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    leftTrim:function (str){ //删除左边的空格
        return str.replace(/(^\s*)/g,"");
    },
    rightTrim:function (str){ //删除右边的空格
        return str.replace(/(\s*$)/g,"");
    }
}