/**
 * Created by ENLINK on 2017/6/28.
 */

const codes={
    "MSG_10000":"管理端登录三次失败",
    "MSG_10001":"管理端当前用户不存在",
    "MSG_10002":"管理端登录密码错误",
    "MSG_10005":"管理端用户登录退出失败",

    "MSG_10050":"客户端用户名不可为空",
    "MSG_10051":"新建客户端用户失败",
    "MSG_10052":"编辑客户端用户失败",
    "MSG_10053":"编辑客户端用户时id不可为空",
    "MSG_10054":"修改客户端用户密码时id或密码不可为空",
    "MSG_10055":"修改客户端用户密码失败",
    "MSG_10056":"删除客户端用户时，非法传递数据异常",
    "MSG_10057":"删除客户端用户失败",
    "MSG_10058":"批量删除客户端用户失败",
    "MSG_10059":"当前客户端用户名也存在",

    "MSG_10100":"批量导入Excel客户端用户数据不能为空",
    "MSG_10101":"批量导入Excel客户端用户数据行数超过最大允许行数",
    "MSG_10102":"批量导入Excel客户端用户文件不存在",
    "MSG_10103":"批量导入Excel客户端用户文件格式不正确",
    "MSG_10104":"批量导入Excel客户端用户读取文件内容失败",
    "MSG_10105":"批量导入Excel客户端用户数据全部导入失败",
    "MSG_10106":"批量导入Excel客户端用户数据有部分导入失败",

    "MSG_10150":"获取认证数据列表时查询数据类型字符串不能为空",
    "MSG_10151":"批量物理删除认证资源以及删除关联数据时id_name_type解析错误",
    "MSG_10152":"批量物理删除认证资源以及删除关联数据时service方法执行错误",
    "MSG_10153":"添加认证时service方法执行错误",
    "MSG_10154":"编辑认证时service方法执行错误",
    "MSG_10155":"校验认证时用户名不能为空",
    "MSG_10156":"校验认证时类型不能为空",
    "MSG_10157":"校验认证时用户名不能为空",


    "MSG_10200":"用户登陆超时",
    "MSG_10201":"查询数据类型字符串不能为空",
    "MSG_10202":"解析字符串不能为空",
    "MSG_10203":"数组越界",
    "MSG_10204":"根据应用资源id批量物理删除应用资源以及删除关联数据时service方法调用出错",
    "MSG_10205":"请求参数Apps不能为空",
    "MSG_10206":"添加应用失败",
    "MSG_10207":"编辑应用失败",

    "MSG_10250":"策略名不能为空",
    "MSG_10251":"解析字符串不能为空",
    "MSG_10252":"数组越界",
    "MSG_10253":"根据用户策略id，批量物理删除用户策略以及删除关联数据时调用service方法出错",
    "MSG_10254":"请求参数UserRules不能为空",
    "MSG_10255":"添加用户策略时调用service方法出错",
    "MSG_10256":"更新用户策略时调用service方法出错",


    "MSG_10300":"修改虚拟网关时调用service方法出错",
    "MSG_10301":"修改虚拟网关时调用service方法出错",
    "MSG_10302":"修改虚拟网关时调用service方法出错",

    "MSG_10350":"设置Lisence失败",
    "MSG_10351":"请求参数pid_name不能为空",
    "MSG_10352":"解析字符串不能为空",
    "MSG_10353":"数组越界",
    "MSG_10354":"删除管理员权限时调用service方法出错",
    "MSG_10355":"请求参数Power不能为空",
    "MSG_10356":"新增管理员权限时调用service方法出错",
    "MSG_10357":"编辑管理员权限时调用service方法出错",

    "MSG_A0150":"新建用户组数据请求传递异常",
    "MSG_A0151":"新建用户组失败",
    "MSG_A0152":"编辑用户组数据请求传递异常",
    "MSG_A0153":"编辑用户组失败",
    "MSG_A0154":"当前用户组名已存在",
    "MSG_A0155":"删除用户组失败(指全部失败)",
    "MSG_A0156":"删除用户组：xx,xxx,xxx失败(部分失败)",
    "MSG_A0157":"删除用户组时传递请求参数异常",

    "MSG_A0158":"用户组名不可为空",
    "MSG_A0159":"主认证在其他组中已存在",
    "MSG_A0160":"主认证参数传递不完整（前端传参问题）",
    "MSG_A0161":"资源应用参数传递不完整（前端传参问题）",
    "MSG_A0162":"用户组id不可为空且大于0",

    "MSG_A0200":"新建管理员用户数据请求传递异常(用户名不可为空)",
    "MSG_A0201":"新建管理员用户数据失败",
    "MSG_A0202":"编辑管理员用户失败",
    "MSG_A0203":"编辑管理员用户时id不可为空",
    "MSG_A0204":"修改管理员用户密码时id或密码不可为空",
    "MSG_A0205":"修改管理员用户密码失败",
    "MSG_A0206":"删除管理员用户时，非法传递数据异常",
    "MSG_A0207":"删除管理员用户失败",
    "MSG_A0208":"批量删除管理员用户失败",
    "MSG_A0209":"当前管理员用户名已存在",

    "MSG_B0100":"证书有效期不能为空",
    "MSG_B0101":"生成证书失败",
    "MSG_B0102":"证书commonname不能为空",
    "MSG_B0103":"存在同名证书",
    "MSG_B0104":"ids信息为空",
    "MSG_B0105":"已存在服务端证书（需要删除后，才能重新生成）"
}

export function codeMessage(key) {
    return codes[key];
}
