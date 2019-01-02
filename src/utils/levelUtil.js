/**
 * Created by ENLINK on 2017/7/26.
 */

let level={
    "INFO":'提示',
    "WARNING":"警告",
    "ERROR":"错误"
}

export function getLevelName(key) {
    return level[key];
}