/**
 * Created by zuce wei on 2017/7/3.
 */

export function notifyFault() {
    this.$message({
        type:'warning',
        message:"网络或服务器故障！"
    });
}