
const menu = {
    menuData: [
        // {
        //     id: 4, label: '首页', open: true, rank: 1, checked: false,
        //     //新增参数，表示父框可以半钩状态
        //     nodeSelectNotAll: false, parentId: null, visible: true, searched: false,
        //     children: [
        //         {
        //             id: 5, label: '首页', checked: false, rank: 2, nodeSelectNotAll: false, parentId: 4, searched: false, visible: true
        //         }]
        // },
        {
            id: 6, label: '系统管理', "node-key":"6", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 7, label: '系统设置', "node-key":"7", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 8, label: '序列号管理', "node-key":"8", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        },
                        // {
                        //     id: 9, label: '证书管理', checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        // }
                        // ,
                        {
                            id: 146, label: '管理台设置', "node-key":"146", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        },
                        {
                            id: 140, label: '时间与同步', "node-key":"140", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        },
                        {
                            id: 141, label: '邮箱服务器', "node-key":"141", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        },
                        {
                            id: 142, label: 'SysLog', "node-key":"142", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        },
                        {
                            id: 143, label: 'SNMP', "node-key":"143", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        },
                        {
                            id: 119, label: '系统参数配置', "node-key":"119", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 7, searched: false, visible: true
                        },

                    ]
                },
                {
                    id: 10, label: '管理员设置', "node-key":"10", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 11, label: '系统管理员', "node-key":"11", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 10, searched: false, visible: true
                        },
                        {
                            id: 12, label: '权限管理', "node-key":"12", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 10, searched: false, visible: true
                        },
                        // {
                        //     id: 45, label: '接口管理', checked: false, rank: 2, nodeSelectNotAll: false, parentId: 10, searched: false, visible: true
                        // },
                        // {
                        //     id: 46, label: 'ACL管理', checked: false, rank: 2, nodeSelectNotAll: false, parentId: 10, searched: false, visible: true
                        // }
                    ]
                },

                {
                    id: 13, label: '网络配置', "node-key":"13", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 14, label: '接口设置', "node-key":"14", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 13, searched: false, visible: true
                        },
                        {
                            id: 15, label: '路由设置', "node-key":"15", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 13, searched: false, visible: true
                        },
                        {
                            id: 16, label: '域名解析', "node-key":"16", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 13, searched: false, visible: true
                        },
                        {
                            id: 1701, label: 'VLAN', "node-key":"1701", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 13, searched: false, visible: true
                        },
                        {
                            id: 1702, label: 'DHCP', "node-key":"1702", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 13, searched: false, visible: true
                        },
                        {
                            id: 144, label: '智能线路解析', "node-key":"144", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 13, searched: false, visible: true
                        }
                    ]
                },
                {
                    id: 1001, label: '系统选项', "node-key":"1001", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 1010, label: '图标中心', "node-key":"1010", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 1001, searched: false, visible: true
                        },
                        {   id: 1011, label: '应用库', "node-key":"1011", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 1001, searched: false, visible: true }
                    ]
                },
            ]
        },

        {
            id: 155, label: '用户管理', "node-key":"155", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 18, label: '用户设置', "node-key":"18", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 19, label: '用户设置', "node-key":"19", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 18, searched: false, visible: true
                        },
                        {
                            id: 20, label: '用户组设置', "node-key":"20", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 18, searched: false, visible: true
                        },
                        {
                            id: 21, label: '在线用户', "node-key":"21", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 18, searched: false, visible: true
                        },
                        {
                            id: 220, label: '拓展功能', "node-key":"220", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 18, searched: false, visible: true
                        },
                    ]
                },

                // {
                //     id: 200, label: '硬件特征管理', "node-key":"200", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                //     children: [
                //         {
                //             id: 201, label: '特征收集列表', "node-key":"201", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 200, searched: false, visible: true
                //         },
                //         {
                //             id: 202, label: '特征码审核', "node-key":"202", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 200, searched: false, visible: true
                //         },
                //         {
                //             id: 203, label: '审核日志', "node-key":"203", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 200, searched: false, visible: true
                //         }
                //     ]
                // },
                {
                    id: 27, label: '认证设置', "node-key":"27", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 28, label: 'DB认证', "node-key":"28", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        },
                        {
                            id: 29, label: 'LDAP认证', "node-key":"29", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        },
                        {
                            id: 30, label: 'RASIUS认证', "node-key":"30", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        },
                        {
                            id: 31, label: 'AD认证', "node-key":"31", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        },
                        // {
                        //     id: 112, label: 'OAuth认证', "node-key":"112", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        // },
                       /* {
                            id: 115, label: 'OAuth认证2', "node-key":"115", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        },*/
                        {
                            id: 87, label: '短信认证', "node-key":"87", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        },
                        {
                            id: 117, label: 'cas认证', "node-key":"117", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 27, searched: false, visible: true
                        }
                    ]
                },
                {
                    id: 32, label: '策略设置', "node-key":"32", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 33, label: '策略设置', "node-key":"33", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 32, searched: false, visible: true
                        }
                    ]
                },
                /*{
                    id: 280, label: '访问控制', "node-key":"280", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 281, label: '匹配规则', "node-key":"281", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 280, searched: false, visible: true
                        },
                        {
                            id: 282, label: '拦截规则', "node-key":"282", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 280, searched: false, visible: true
                        },
                    ]
                },*/
                // {
                //     id: 302, label: '可信设备', "node-key":"302", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                //     children: [
                //         {
                //             id: 303, label: '全局可信设备', "node-key":"303", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 303, searched: false, visible: true
                //         }
                //     ]
                // },
                {
                    id: 74, label: '审核设置', "node-key":"74", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 76, label: '审核设置', "node-key":"76", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 74, searched: false, visible: true
                        },
                        {
                            id: 77, label: '用户审核', "node-key":"77", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 74, searched: false, visible: true
                        },
                        {
                            id: 78, label: '审核日志', "node-key":"78", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 74, searched: false, visible: true
                        }
                    ]
                },
                {
                    id: 210, label: '用户组授权', "node-key":"210", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 211, label: '用户组授权', "node-key":"211", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 210, searched: false, visible: true
                        }
                    ]
                },
            ]
        },



        {
            id: 79, label: '计费管理', "node-key":"79", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 80, label: '套餐设置', "node-key":"80", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 79, searched: false, visible: true
                },
                {
                    id: 81, label: '充值退费查询', "node-key":"81", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 79, searched: false, visible: true
                },
                {
                    id: 82, label: '套餐报表', "node-key":"82", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 79, searched: false, visible: true
                },
                {
                    id: 83, label: '套餐明细', "node-key":"83", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 79, searched: false, visible: true
                },
                {
                    id: 84, label: '收支报表', "node-key":"84", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 79, searched: false, visible: true
                },
                {
                    id: 85, label: '收支明细', "node-key":"85", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 79, searched: false, visible: true
                }
            ]
        },

        {
            id: 111, label: 'EnWAS', "node-key":"111", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                // {
                //     id: 113, label: '可信域', "node-key":"113", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 111, searched: false, visible: true
                // },
                {
                    id: 26, label: 'Web应用', "node-key":"26", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 111, searched: false, visible: true
                },
                // {
                //     id: 114, label: '规则库', "node-key":"114", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 111, searched: false, visible: true
                // },
            ]
        },
        {
            id: 22, label: 'EnSSL', "node-key":"22", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 24, label: 'Client应用', "node-key":"24", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 22, searched: false, visible: true
                },
                {
                    id: 98, label: 'ST应用', "node-key":"98", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 22, searched: false, visible: true
                },
                {
                    id: 25, label: 'L3-Net应用', "node-key":"25", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 22, searched: false, visible: true
                },
                {
                    id: 23, label: '内网策略', "node-key":"23", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 22, searched: false, visible: true
                },
                {
                    id: 75, label: '白名单', "node-key":"75", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 22, searched: false, visible: true
                }
            ]
        },
        /*web终端*/
        {
            id: 241, label: 'web终端', "node-key":"241", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 242, label: 'web终端', "node-key":"242", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 241, searched: false, visible: true
                },
                // {
                //     id: 243, label: '用户组授权', "node-key":"243", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 241, searched: false, visible: true
                // }
            ]
        },
        // {
        //     id: 72, label: 'EnS2S', "node-key":"72", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
        //     children: [
        //         {
        //             id: 73, label: '节点设备管理', "node-key":"73", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 72, searched: false, visible: true
        //         },
        //         {
        //             id: 71, label: 's2s设置', "node-key":"71", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 72, searched: false, visible: true
        //         },
        //         {
        //             id: 87, label: '数据同步管理', "node-key":"87", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 72, searched: false, visible: true
        //         },
        //         {
        //             id: 88, label: 's2c设置', "node-key":"88", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 72, searched: false, visible: true
        //         }
        //     ]
        // },
        // {
        //     id: 66, label: 'Ipsec', "node-key":"66", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
        //     children: [
        //         {
        //             id: 67, label: 'Ipsec配置', "node-key":"67", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 66, searched: false, visible: true
        //         },
        //         {
        //             id: 68, label: 'Ipsec日志', "node-key":"68", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 66, searched: false, visible: true
        //         }
        //     ]
        // },
        // {
        //     id: 108, label: '域名管理', "node-key":"108", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
        //     children: [
        //         {
        //             id: 92, label: '域名管理', "node-key":"92", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 108, searched: false, visible: true
        //         },
        //         {
        //             id: 93, label: '区域管理', "node-key":"93", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 108, searched: false, visible: true
        //         },
        //         {
        //             id: 94, label: '线路管理', "node-key":"94", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 108, searched: false, visible: true
        //         },
        //         {
        //             id: 95, label: '递归管理', "node-key":"95", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 108, searched: false, visible: true
        //         },
        //         {
        //             id: 96, label: '缓存管理', "node-key":"96", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 108, searched: false, visible: true
        //         },
        //         {
        //             id: 99, label: '资源转发', "node-key":"99", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 108, searched: false, visible: true
        //         },
        //         {
        //             id: 100, label: '域名导入导出', "node-key":"100", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 108, searched: false, visible: true
        //         }
        //     ]
        // },
        // {
        //     id: 231, label: '负载均衡', "node-key":"231", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
        //     children: [
        //         {
        //             id: 232, label: '虚拟服务', "node-key":"232", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 231, searched: false, visible: true
        //         },
        //         {
        //             id: 233, label: '服务器池', "node-key":"233", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 231, searched: false, visible: true
        //         },
        //         {
        //             id: 234, label: '服务器节点', "node-key":"233", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 231, searched: false, visible: true
        //         },
        //         {
        //             id: 235, label: '规则', "node-key":"234", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 231, searched: false, visible: true
        //         }
        //     ]
        // },
        // {
        //     id: 109, label: '域名统计', "node-key":"109", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
        //     children: [
        //         {
        //             id: 101, label: '域名访问统计', "node-key":"101", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 109, searched: false, visible: true
        //         },
        //         {
        //             id: 102, label: '查询统计图', "node-key":"102", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 109, searched: false, visible: true
        //         },
        //         {
        //             id: 103, label: '线路统计图', "node-key":"103", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 109, searched: false, visible: true
        //         },
        //         {
        //             id: 104, label: '类型统计图', "node-key":"104", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 109, searched: false, visible: true
        //         },
        //         {
        //             id: 105, label: '域名统计图', "node-key":"105", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 109, searched: false, visible: true
        //         },
        //         {
        //             id: 106, label: '区域统计图', "node-key":"106", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 109, searched: false, visible: true
        //         },
        //         {
        //             id: 107, label: '区域分布图', "node-key":"107", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 109, searched: false, visible: true
        //         }
        //     ]
        // },
        {
            id: 57, label: '防火墙', "node-key":"57", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 58, label: 'IP设置', "node-key":"58", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 57, searched: false, visible: true
                },
                {
                    id: 59, label: 'IP组设置', "node-key":"59", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 57, searched: false, visible: true
                },
                {
                    id: 60, label: '服务设置', "node-key":"60", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 57, searched: false, visible: true
                },
                {
                    id: 61, label: '时间设置', "node-key":"61", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 57, searched: false, visible: true
                },
                {
                    id: 62, label: '策略设置', "node-key":"62", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 57, searched: false, visible: true
                },
                {
                    id: 63, label: '源地址转换', "node-key":"63", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 57, searched: false, visible: true
                },
                {
                    id: 64, label: '目的地址转换', "node-key":"64", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 57, searched: false, visible: true
                }
            ]
        },

        {
            id: 34, label: '日志中心', "node-key":"34", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 35, label: '日志管理', "node-key":"35", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                    children: [
                        {
                            id: 36, label: '日志设置', "node-key":"36", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 35, searched: false, visible: true
                        },
                        {
                            id: 37, label: '日志下载', "node-key":"37", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 35, searched: false, visible: true
                        },
                        {
                            id: 38, label: '用户日志', "node-key":"38", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 35, searched: false, visible: true
                        },
                        {
                            id: 39, label: '管理员日志', "node-key":"39", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 35, searched: false, visible: true
                        },
                        {
                            id: 40, label: '系统日志', "node-key":"40", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 35, searched: false, visible: true
                        },
                        {
                            id: 47, label: '资源日志', "node-key":"47", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 35, searched: false, visible: true
                        },
                        {
                            id: 48, label: '域名日志', "node-key":"48", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 35, searched: false, visible: true
                        }
                    ]
                },
                // {
                //     id: 41, label: '统计与分析', "node-key":"41", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
                //     children: [
                //         {
                //             id: 42, label: '用户登录与统计分析', "node-key":"42", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 41, searched: false, visible: true
                //         },
                //         {
                //             id: 43, label: '资源统计与分析', "node-key":"43", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 41, searched: false, visible: true
                //         },
                //         {
                //             id: 44, label: '流量统计与分析', "node-key":"44", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 41, searched: false, visible: true
                //         }
                //     ]
                // },
            ]
        },


        // {
        //     id: 116, label: '规则管理', "node-key":"116", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
        //     children: [
        //         {
        //             id: 114, label: '规则库', "node-key":"114", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 116, searched: false, visible: true
        //         }
        //     ]
        // },
        {
            id: 151, label: '系统维护', "node-key":"151", rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
            children: [
                {
                    id: 152, label: '系统操作', "node-key":"152", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 151, searched: false, visible: true
                },
                {
                    id: 153, label: '实用工具', "node-key":"153", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 151, searched: false, visible: true
                },
                {
                    id: 154, label: '备份与恢复', "node-key":"154", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 151, searched: false, visible: true
                },
                {
                    id: 300, label: '系统健康报告', "node-key":"300", checked: false, rank: 2, nodeSelectNotAll: false, parentId: 151, searched: false, visible: true
                },
            ]
        }

        // {
        //     id: 117, label: '客户管理', rank: 1, parentId: null, checked: false, nodeSelectNotAll: false, searched: false, visible: true,
        //     children: [
        //         {
        //             id: 115, label: '客户', checked: false, rank: 2, nodeSelectNotAll: false, parentId: 117, searched: false, visible: true
        //         }
        //     ]
        // },
    ]

}
export default menu;