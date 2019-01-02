<template>
    <div class="side_menu">
        <div class="padding_scroll_btn">
            <div class="scroll_top"
                 v-show="menuScrollDir.firstScrollTop"
                 @mouseenter.stop="firstMenuScrollTopEnter"
                 @mouseleave.stop="firstMenuScrollTopLeave"
                 :style="{background: scrollBtnBg.firstBtnTop, color: menuScrollBtnColor.firstTopScrollBtnColor}"
            ><span class="el-icon-caret-top"></span></div>
        </div>
        <div class="scroll_main" :style="{height: menuHeight+'px'}">
            <ul class="en_menu" id="scroll_content" :style="{top: menuTopHeight.firstMenuTopHeight+'px'}" >
                <li
                        v-for="(item,index) in classifiedData"
                        class="en_menu_item"
                        :style="{background: item.active ? activeItemBackgroundColor : menuBackgroundColor}"
                        v-if="((!item.hidden && !item.children) || item.firstMenu) && !item.dynamic &&allRoleId.includes(item.id) "
                        @mouseenter.stop="showMenu(item, classifiedData)"
                        @mouseleave.stop="hideMenu(item, classifiedData)"
                >
                    <!--v-if="allRoleId.includes(item.id)"-->
                    <h4 class="clearfixed en_menu_h4" :style="{color:item.active ? activeTextColor : textColor,margin:item.children ? '5px 0' : '0 0'}">
                        <span class="left icon_font" :class="item.icon"></span>
                        <p class="left en_menu_title">{{ item.name }}</p>
                        <span class="el-icon-arrow-right right"></span>
                    </h4>

                </li>
                <!--v-show="isShowSecondMenu"-->
                <li class="en_second_sub_menu"
                    v-show="isShowSecondMenu"
                    :style="{background: menuBackgroundColor, color: menuScrollBtnColor.firstTopScrollBtnColor}"
                    @mouseenter.stop="showSecondMenu()"
                    @mouseleave.stop="hideSecondMenu()"
                >
                    <transition name="second-menu">
                        <div>
                            <div class="padding_scroll_btn">
                                <div class="scroll_top"
                                     v-show="menuScrollDir.secondScrollTop"
                                     @mouseenter.stop="secondMenuScrollTopEnter"
                                     @mouseleave.stop="secondMenuScrollTopLeave"
                                     :style="{background: scrollBtnBg.secondBtnTop, color: menuScrollBtnColor.secondTopScrollBtnColor}"
                                ><span class="el-icon-caret-top"></span></div>
                            </div>
                            <div class="en_sub_menu_main" :style="{height: secondMenuHeight+'px'}">
                                <ul
                                        class="en_menu_sub"
                                        :style="{background: menuBackgroundColor,top: sHeight+'px'}"
                                        id="second_menu_main"

                                >
                                    <!--v-show="isShowSecondUl"-->
                                    <li class="en_menu_item"
                                        :style="{background: child.hover ? activeItemBackgroundColor: menuBackgroundColor}"
                                        v-for="(child,index) in secondMenuData"
                                        @click.stop="routerFunction(child)"
                                        @mouseenter.stop="showSubMenu(child, secondMenuData)"
                                        @mouseleave.stop="hideSubMenu(child, secondMenuData)"
                                        v-if="allRoleId.includes(child.id)"
                                    >
                                        <!--只有admin或者有权限才展示2级菜单内容  allRoleId有权限的id集合-->
                                        <!--v-if="allRoleId.includes(child.id)"-->
                                        <h4 class="clearfixed en_menu_h4"
                                            :style="{color: child.hover ? activeTextColor : textColor,margin: '5px 0'}">
                                            <span class="icon_font left" :class="child.children ? child.icon : 'fa fa-circle-o'"></span>
                                            <p class="left en_menu_title">{{ child.name }}</p>
                                            <span v-if="child.children" class="el-icon-arrow-right right"></span>
                                        </h4>

                                    </li>
                                </ul>
                            </div>
                            <div class="padding_scroll_btn">
                                <div class="scroll_top"
                                     v-show="menuScrollDir.secondScrollBottom"
                                     @mouseenter.stop="secondMenuScrollBottomEnter"
                                     @mouseleave.stop="secondMenuScrollBottomLeave"
                                     :style="{background: scrollBtnBg.secondBtnBottom, color: menuScrollBtnColor.secondBottomScrollBtnColor}"
                                ><span class="el-icon-caret-top"></span></div>
                            </div>
                        </div>
                    </transition>
                </li>
                <li class="en_three_sub_menu"
                    @mouseleave="closeAllMenu"
                    @mouseenter="enterThreeMenu"
                    v-show="isShowThreeMenu">
                    <transition name="second-menu">
                        <div>
                            <div class="padding_scroll_btn">
                                <div class="scroll_top"
                                     v-show="menuScrollDir.threeScrollTop"
                                     @mouseenter.stop="threeMenuScrollTopEnter"
                                     @mouseleave.stop="threeMenuScrollTopLeave"
                                     :style="{background: scrollBtnBg.threeBtnTop, color: menuScrollBtnColor.threeTopScrollBtnColor}"
                                ><span class="el-icon-caret-top"></span></div>
                            </div>
                            <div class="en_three_menu_main" :style="{height: threeMenuHeight+'px'}">
                                <!-- v-show="isShowThreeMenu" -->
                                <ol
                                        id="three_menu_main"
                                        class="en_menu_three"
                                        :style="{top: menuTopHeight.threeMenuTopHeight+'px'}">
                                    <li class="en_menu_item"
                                        v-for="(val,index) in threeMenuData"
                                        :style="{background: val.hover ? activeItemBackgroundColor: itemBackgroundColor}"
                                        @click.stop="routerFunction(val)"
                                        @mouseenter.stop="hightLight(val)"
                                        @mouseleave.stop="clearHightLight(val)"
                                        v-if="!val.tag &&allRoleId.includes(val.id)"
                                    >
                                        <!--v-if="allRoleId.includes(child.id)"-->
                                        <h4 class="clearfixed en_menu_h4"
                                            :style="{color: val.hover ? activeTextColor : textColor,margin: '5px 0'}">
                                            <span class="icon_font left" :class="val.children ? val.icon : 'fa fa-circle-o'"></span>
                                            <p class="left en_menu_title">{{ val.name }}</p>
                                            <span v-if="val.children" class="el-icon-arrow-right right"></span>
                                        </h4>
                                    </li>
                                </ol>
                            </div>
                            <div class="padding_scroll_btn">
                                <div class="scroll_top"
                                     v-show="menuScrollDir.threeScrollBottom"
                                     @mouseenter.stop="threeMenuScrollBottomEnter"
                                     @mouseleave.stop="threeMenuScrollBottomLeave"
                                     :style="{background: scrollBtnBg.threeBtnBottom, color: menuScrollBtnColor.threeBottomScrollBtnColor}"
                                ><span class="el-icon-caret-top"></span></div>
                            </div>
                        </div>
                    </transition>
                </li>
            </ul>
        </div>
        <div class="padding_scroll_btn">
            <div
                    class="scroll_button"
                    v-show="menuScrollDir.firstScrollBottom"
                    @mouseenter.stop="firstMenuScrollBottomEnter"
                    @mouseleave.stop="firstMenuScrollBottomLeave"
                    :style="{background: scrollBtnBg.firstBtnBottom, color: menuScrollBtnColor.firstBottomScrollBtnColor}"
            ><span class="el-icon-caret-top"></span></div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getMenuHideItem} from '../../api/getMenuHideItem';
    export default {
        name: '',
        props: {
            menuData: Array,                    // 菜单数据
            textColor: String,                  // 菜单文字默认颜色
            activeTextColor: String,            // 菜单被选中时的颜色
            activeItemBackgroundColor: String,  // 菜单被选中时的背景色
            menuBackgroundColor: String,        // 菜单背景色
            itemBackgroundColor: String,         // 二三级菜单，菜单选项项的背景色
            allRole:Array
        },
        data () {
            return {
                isShowSecondUl:true,
                allRoleId:[],/*权限id集合*/
                //
	            dynamicData: [],
	            menuScrollBtnColor: {
		            firstTopScrollBtnColor: '#65696a',
		            firstBottomScrollBtnColor: '#65696a',
		            secondTopScrollBtnColor: '#65696a',
		            secondBottomScrollBtnColor: '#65696a',
		            threeTopScrollBtnColor: '#65696a',
		            threeBottomScrollBtnColor: '#65696a',
                },
	            scrollBtnBg: {
	            	firstBtnTop: 'rgba(255, 255, 255, 0.1)',
	            	firstBtnBottom: 'rgba(255, 255, 255, 0.1)',
	            	secondBtnTop: 'rgba(255, 255, 255, 0.1)',
		            secondBtnBottom: 'rgba(255, 255, 255, 0.1)',
		            threeBtnBottom: 'rgba(255, 255, 255, 0.1)',
		            threeBtnTop: 'rgba(255, 255, 255, 0.1)'
                },
            	menuCalculator: {
            		firstTopCalculator: 0,
            		secondTopCalculator: 0,
            		threeTopCalculator: 0
                },
	            menuWindowHeight: 0,
	            scrollMainHeight: 0,
                secondScrollMainHeight: 0,
	            threeScrollMainHeight: 0,
            	menuHeight: 0, // 记录菜单高度
                secondMenuHeight: 0,
                threeMenuHeight: 0,
                menuScrollDir: {
	                firstScrollTop: false,
	                firstScrollBottom: false,
	                secondScrollTop: false,
	                secondScrollBottom: false,
	                threeScrollTop: false,
	                trhessScrollBottom: false
                },
                menuTopHeight: {
	                firstMenuTopHeight: 0,
	                secondMenuTopHeight: 0,
	                threeMenuTopHeight: 0,
                },
                menuTimer: {
	            	firstMenuTopTimer: null,
	                firstMenuBottomTimer: null,
	                secondMenuTopTimer: null,
	                secondMenuBottomTimer: null,
	                threeMenuTopTimer: null,
	                threeMenuBottomTimer: null
                },
                active: false,
                sHeight: 0,
                pValue: 0,              // 记录页面滚动高度
                isConnectSecond: false, // 判断是否是二级关联菜单,
                firstTimer: null,       // 控制菜单显示的定时器
                secondTimer: null,
                threeTimer: null,
                fourTimer: null,
                fiveTimer: null,
                sixTimer: null,
                sevenTimer: null,
                eitTimer: null,
                path: '',               // 路由路径
                firstPath: '',
                secondPath: '',
                isShowSecondMenu: false,// 是否显示二级菜单
                isShowThreeMenu: false, // 是否显示三级菜单
                secondMenuData: [],     // 二级菜单数据 容器
                threeMenuData: []       // 三级菜单数据 容器
            }
        },
        created () {
        	this.menuWindowHeight = window.innerHeight - 50;
        	this.getHideMenuItemData();

        	this.allRoleId=this.allRole;
        },
        mounted () {
	        this.scrollMainHeight = document.getElementById("scroll_content").offsetHeight;
	        // 如果菜单窗口的高度，大于菜单本身的高度，则能显示全部菜单，不做处理
            // 如果菜单窗口的高度，小于菜单本身的高度，则显示滚动按钮
	        if (this.menuWindowHeight >= this.scrollMainHeight) {
		        this.menuHeight = this.menuWindowHeight;
            } else if (this.menuWindowHeight < this.scrollMainHeight) {
	        	this.menuScrollDir.firstScrollBottom = true;
		        this.menuScrollDir.firstScrollTop = false;
            };
	        this.menuHeight = this.menuWindowHeight - 52;
        },
        computed: {
            ...mapGetters([
                'name'
            ]),
            // 重新组合获取到的数据
            // 将有关联标记的firstMenu: true，的数据和没有children的数据放倒数组的第一级
            // 将 有关联标记的 flag同时不存在 firstMenu的数据，放到数组的第二级
            // 从而组合成一个包含二级，或者三级 对象数组
            classifiedData () {
                let data = [];
	            this.menuData.forEach((item, index, arr) => {
		            if (item.firstMenu && !item.hidden) {

		            	// 根据后台返回的id集合，隐藏 id相应 的菜单选项
			            this.dynamicData.forEach(child => {
				            if(item.id == child) {
					            this.$set(item, 'dynamic', true)
				            }

			            })
			            if(!item.children){
				            this.$set(item, 'children', [])
				            this.menuData.forEach((v, i, a) => {
					            if(v.flag == item.flag && !v.firstMenu) {
						            item.children.push(v)
					            }
				            })
			            }
			            data.push(item)
		            }
	            });
	            // console.log('classifiedData',data)
	            return data
            }
        },
        methods: {
            /*
            *
            * 组件中的多个定时器，是为了控制鼠标快速划过未选中的菜单项，进入下级菜单时，不切换选中项到快速划过的这些项。
            * 例如：选中第一级第二个菜单，子菜单展开后，快速划入子菜单最后一项
            * 若途中经过一级菜单的其他项时，若不做延迟处理，子菜单数据就会快速切换
            *
            * */
            showMenu (item, data) {

                // 定时器清除，保证定时器不重复启用
                clearTimeout(this.firstTimer)
                // 显示时，清除隐藏时的定时器，防止造成混乱
                clearTimeout(this.secondTimer)
                clearTimeout(this.fiveTimer)
                // 显示二级菜单
                this.isShowSecondMenu = true
                // 增加定时器， 方便控制菜单数据更新随一级菜单滑块变化时间同步
                this.firstTimer = setTimeout(() => {
	                this.sHeight = 0;
	                this.menuCalculator.secondTopCalculator = 0;
                    /* 清空所有的一级菜单高亮选项 */
                    data.forEach((val) => {
                        this.$set(val, 'active', false)
                    });
                    // 为鼠标停留的选项增加 高亮 类
                    this.$set(item, 'active', true)
                    this.path = '';
                    this.path = item.path
                    this.firstPath = item.path;

                    // 增加 报错出口
                    if(!item.children) return;
                    // 变更二级菜单的数据项
                    this.$nextTick(() => {
                        this.secondMenuData = item.children;
                    })
                    setTimeout(()=>{
	                    this.secondScrollMainHeight = document.getElementById("second_menu_main").offsetHeight;
	                    if(this.menuWindowHeight >= this.secondScrollMainHeight) {
		                    this.secondMenuHeight = this.menuWindowHeight;
		                    this.menuScrollDir.secondScrollBottom = false;
		                    this.menuScrollDir.secondScrollTop = false;
	                    } else {
		                    this.menuScrollDir.secondScrollBottom = true;
		                    this.menuScrollDir.secondScrollTop = false;
	                    };
	                    this.secondMenuHeight = this.menuWindowHeight - 52;
                    },100)
                }, 100);
                /*是否显示2级ul*/
                // for(let el of this.secondMenuData){
                //     if(!this.allRoleId.includes(el.id)){
                //        this.isShowSecondUl=false
                //     }
                // }
            },
            hideMenu (item, data) {

                clearTimeout(this.firstTimer)

                // 增加定时器，方便对隐藏二级菜单的控制
                this.secondTimer = setTimeout(() => {
                    this.isShowSecondMenu = false
                    this.$set(item, 'active', false)
                }, 100)
            },
            showSubMenu (item, data) {
                clearTimeout(this.secondTimer)
                clearTimeout(this.threeTimer)
                clearTimeout(this.fourTimer)

                /* 200毫秒后 显示三级菜单 */
                this.threeTimer = setTimeout(() => {
	                this.menuTopHeight.threeMenuTopHeight = 0;
	                this.menuCalculator.threeTopCalculator = 0;
                    if(item.children){
                        // 显示三级菜单
                        this.isShowThreeMenu = true
                        // 改变三级菜单的数据
                        this.$nextTick(() => {
                            this.threeMenuData = item.children;
                        })
                    }
                    this.firstPath = this.path;
                    this.path = '';
                    this.path = !item.children ? (this.firstPath + '/' + item.path) : item.path;
                    this.secondPath = item.path;
                    data.forEach(v => this.$set(v, 'hover', false))
                    this.$set(item, 'hover', true);
	                setTimeout(()=>{
		                this.threeScrollMainHeight = document.getElementById("three_menu_main").offsetHeight;
		                if(this.menuWindowHeight >= this.threeScrollMainHeight) {
			                this.threeMenuHeight = this.menuWindowHeight;
			                this.menuScrollDir.threeScrollBottom = false;
			                this.menuScrollDir.threeScrollTop = false;
		                } else {
			                this.menuScrollDir.threeScrollBottom = true;
			                this.menuScrollDir.threeScrollTop = false;
		                };
		                this.threeMenuHeight = this.menuWindowHeight - 52;
	                },100)
                }, 100)
            },
            hideSubMenu (item) {
                // 清除 显示三级菜单的 定时器
                clearTimeout(this.threeTimer)
                // 增加定时器，控制隐藏 三级菜单
                this.fourTimer = setTimeout(() => {
                    this.isShowThreeMenu = false
                    // 清除高亮选项
                    this.$set(item, 'hover', false)
                }, 100)
            },
            showSecondMenu () {
                // 清除定时器， 控制二级菜单显示，以及一级菜单高亮项不清除
                clearTimeout(this.secondTimer)
                // 清除定时器，保证三级菜单被隐藏，只有进入菜单选项才显示
                clearTimeout(this.sixTimer)
	            clearTimeout(this.fiveTimer)
	            clearTimeout(this.sevenTimer)
            },
            hideSecondMenu () {
                // 鼠标离开二级菜单 时 隐藏二级菜单
                this.fiveTimer = setTimeout(() => {
                    this.isShowSecondMenu = false;
                }, 100)
            },
            hightLight (item) {
                // 清除定时器 --- 高亮显示三级菜单选项时，不清除二级菜单中的高亮项，以及不隐藏二级菜单
                clearTimeout(this.fourTimer)
                clearTimeout(this.fiveTimer)
                // 计算 最终 获得的路由路径
                this.path = !item.children ? (this.secondPath + '/' + item.path) : item.path;
                // 控制备选项高亮
                if (!item.children) {
                    this.$set(item, 'hover', true)
                }
            },
            clearHightLight (item) {
                // 清除 三级菜单 高亮选择项
                this.$set(item, 'hover', false)
            },
            closeAllMenu () {
                // 增加定时器，控制二级菜单在 100 毫秒后才隐藏（针对从三级菜单返回二级菜单时，方便控制）
                this.sixTimer = setTimeout(() => {
                    this.isShowSecondMenu = false;
                }, 100)
                this.isShowThreeMenu = false;
            },
            enterThreeMenu () {
                // 进入三级菜单时 清除定时器，保证二级菜单不消失
                clearTimeout(this.fiveTimer)
                clearTimeout(this.sixTimer)
                clearTimeout(this.fourTimer)
	            this.isShowThreeMenu = true;
            },
            // 触发父级 控制 路由的方法 并隐藏所有子菜单
            routerFunction (item) {
                // let arr = [122, 113, 26, 114, 118, 119];//换位置
                let arr = [122, 113, 26, 114, 118];
                let path = '/admin';
                arr.forEach((v, i, a) => {
                	if(item.id == v){
                		path = '/enwas'
                    }
                })
	            console.log(path, item.path)
                if(item.children){
                    return
                }
                this.$emit('handleRouter', path+'/'+item.path);
                // 若还有子集，点击不隐藏菜单
                if(!item.children){
                    this.isShowThreeMenu = false;
                    this.isShowSecondMenu = false;
                }
            },
            getHideMenuItemData () {
	            getMenuHideItem().then(res => {
                    this.dynamicData = res.data;
                })
            },
	        firstMenuScrollBottomEnter () {
            	this.menuScrollBtnColor.firstBottomScrollBtnColor = "#b8c7ce";
            	this.scrollBtnBg.firstBtnBottom = 'rgba(255, 255, 255, 0.2)';
		        let scrollNum = this.scrollMainHeight + 52 - this.menuWindowHeight;
		        clearInterval(this.menuTimer.firstMenuTopTimer);
            	this.menuTimer.firstMenuTopTimer = setInterval(() => {
            		if(scrollNum > this.menuCalculator.firstTopCalculator) {
			            this.menuCalculator.firstTopCalculator = this.menuCalculator.firstTopCalculator + 3;
			            this.menuTopHeight.firstMenuTopHeight = this.menuTopHeight.firstMenuTopHeight - 3;
			            if(this.menuTopHeight.firstMenuTopHeight < -40) {
				            this.menuScrollDir.firstScrollTop = true;
			            };
                    } else {
            			clearInterval(this.menuTimer.firstMenuTopTimer);
			            this.menuScrollDir.firstScrollBottom = false;
                    };
                }, 50);
            },
	        firstMenuScrollBottomLeave () {
		        this.menuScrollBtnColor.firstBottomScrollBtnColor = "#65696a";
		        this.scrollBtnBg.firstBtnBottom = 'rgba(255, 255, 255, 0.1)';
		        clearInterval(this.menuTimer.firstMenuTopTimer);
            },
	        firstMenuScrollTopEnter () {
		        this.menuScrollBtnColor.firstTopScrollBtnColor = "#b8c7ce";
		        this.scrollBtnBg.firstBtnTop = 'rgba(255, 255, 255, 0.2)';
		        let scrollNum = this.scrollMainHeight + 52 - this.menuWindowHeight;
		        clearInterval(this.menuTimer.firstMenuBottomTimer);
		        this.menuTimer.firstMenuBottomTimer = setInterval(() => {
			        if(this.menuCalculator.firstTopCalculator > 0) {
				        this.menuCalculator.firstTopCalculator = this.menuCalculator.firstTopCalculator - 3;
				        this.menuTopHeight.firstMenuTopHeight = this.menuTopHeight.firstMenuTopHeight + 3;
				        if(this.menuTopHeight.firstMenuTopHeight >= 0) {
					        this.menuScrollDir.firstScrollTop = false;
				        };
				        this.menuScrollDir.firstScrollBottom = true;
			        } else {
				        clearInterval(this.menuTimer.firstMenuBottomTimer);
				        this.menuScrollDir.firstScrollBottom = false;
			        };
		        }, 50);
            },
	        firstMenuScrollTopLeave () {
		        this.menuScrollBtnColor.firstTopScrollBtnColor = "#65696a";
		        this.scrollBtnBg.firstBtnTop = 'rgba(255, 255, 255, 0.1)';
		        clearInterval(this.menuTimer.firstMenuBottomTimer);
            },
	        secondMenuScrollBottomEnter () {
		        this.isShowSecondMenu = true;
		        this.menuScrollBtnColor.secondBottomScrollBtnColor = "#b8c7ce";

		        // 定时器清除，保证定时器不重复启用
		        clearTimeout(this.firstTimer)
		        // 显示时，清除隐藏时的定时器，防止造成混乱
		        clearTimeout(this.secondTimer)
		        clearTimeout(this.fiveTimer)
		        this.scrollBtnBg.secondBtnBottom = 'rgba(255, 255, 255, 0.2)';
		        let scrollNum = this.secondScrollMainHeight + 52 - this.menuWindowHeight;
		        clearInterval(this.menuTimer.secondMenuTopTimer);
		        this.menuTimer.secondMenuTopTimer = setInterval(() => {
			        if(scrollNum > this.menuCalculator.secondTopCalculator) {
				        this.menuCalculator.secondTopCalculator = this.menuCalculator.secondTopCalculator + 3;
				        this.sHeight = this.sHeight - 3;
				        if(this.sHeight < -40) {
					        this.menuScrollDir.secondScrollTop = true;
                        };
			        } else {
				        clearInterval(this.menuTimer.secondMenuTopTimer);
				        this.menuScrollDir.secondScrollBottom = false;
			        };
		        }, 50);
            },
	        secondMenuScrollBottomLeave () {
		        this.menuScrollBtnColor.secondBottomScrollBtnColor = "#65696a";
		        this.scrollBtnBg.secondBtnBottom = 'rgba(255, 255, 255, 0.1)';
		        clearInterval(this.menuTimer.secondMenuTopTimer);
            },
	        secondMenuScrollTopEnter () {
		        this.menuScrollBtnColor.secondTopScrollBtnColor = "#b8c7ce";
		        this.isShowSecondMenu = true;
		        // 显示时，清除隐藏时的定时器，防止造成混乱
		        clearTimeout(this.secondTimer)
		        clearTimeout(this.sixTimer)
		        clearTimeout(this.fiveTimer)
		        this.scrollBtnBg.secondBtnTop = 'rgba(255, 255, 255, 0.2)';
		        clearInterval(this.menuTimer.secondMenuBottomTimer);
		        this.menuTimer.secondMenuBottomTimer = setInterval(() => {
			        if(this.menuCalculator.secondTopCalculator > 0 && this.sHeight < 0) {
				        this.menuCalculator.secondTopCalculator = this.menuCalculator.secondTopCalculator - 3;
				        this.sHeight = this.sHeight + 3;
				        if(this.sHeight >= 0) {
					        this.menuScrollDir.secondScrollTop = false;
				        };
				        this.menuScrollDir.secondScrollBottom = true;
			        } else {
				        clearInterval(this.menuTimer.secondMenuBottomTimer);
				        this.menuScrollDir.secondScrollBottom = true;
			        };
		        }, 50);
            },
	        secondMenuScrollTopLeave () {
		        this.menuScrollBtnColor.secondTopScrollBtnColor = "#65696a";
		        this.scrollBtnBg.secondBtnTop = 'rgba(255, 255, 255, 0.1)';
		        clearInterval(this.menuTimer.secondMenuBottomTimer);
            },
	        threeMenuScrollBottomEnter () {
		        clearTimeout(this.secondTimer)
		        clearTimeout(this.threeTimer)
		        clearTimeout(this.fourTimer)
		        clearTimeout(this.fiveTimer)
		        clearTimeout(this.sixTimer)
		        // 显示三级菜单
		        this.menuScrollBtnColor.threeBottomScrollBtnColor = "#b8c7ce";
		        this.isShowThreeMenu = true;
		        this.scrollBtnBg.threeBtnBottom = 'rgba(255, 255, 255, 0.2)';
		        let scrollNum = this.threeScrollMainHeight + 52 - this.menuWindowHeight;
		        clearInterval(this.menuTimer.threeMenuTopTimer);
		        this.menuTimer.threeMenuTopTimer = setInterval(() => {
			        if(scrollNum > this.menuCalculator.threeTopCalculator) {
				        this.menuCalculator.threeTopCalculator = this.menuCalculator.threeTopCalculator + 3;
				        this.menuTopHeight.threeMenuTopHeight = this.menuTopHeight.threeMenuTopHeight - 3;
				        if(this.menuTopHeight.threeMenuTopHeight < -40) {
					        this.menuScrollDir.threeScrollTop = true;
				        };
			        } else {
				        clearInterval(this.menuTimer.threeMenuTopTimer);
				        this.menuScrollDir.threeScrollBottom = false;
			        };
			        console.log(this.menuTopHeight.threeMenuTopHeight, scrollNum, this.menuCalculator.threeTopCalculator)
		        }, 50);
            },
	        threeMenuScrollBottomLeave () {
		        this.menuScrollBtnColor.threeBottomScrollBtnColor = "#65696a";
		        this.scrollBtnBg.threeBtnBottom = 'rgba(255, 255, 255, 0.1)';
		        clearInterval(this.menuTimer.threeMenuTopTimer);
            },
	        threeMenuScrollTopEnter () {
		        clearTimeout(this.secondTimer)
		        clearTimeout(this.threeTimer)
		        clearTimeout(this.fourTimer)
		        clearTimeout(this.fiveTimer)
		        clearTimeout(this.sixTimer)
		        // 显示三级菜单
		        this.menuScrollBtnColor.threeTopScrollBtnColor = "#b8c7ce";
		        this.isShowThreeMenu = true;
		        this.scrollBtnBg.threeBtnTop = 'rgba(255, 255, 255, 0.2)';
		        clearInterval(this.menuTimer.threeMenuBottomTimer);
		        this.menuTimer.threeMenuBottomTimer = setInterval(() => {
			        if(this.menuCalculator.threeTopCalculator > 0 && this.menuTopHeight.threeMenuTopHeight < 0) {
				        this.menuCalculator.threeTopCalculator = this.menuCalculator.threeTopCalculator - 3;
				        this.menuTopHeight.threeMenuTopHeight = this.menuTopHeight.threeMenuTopHeight + 3;
				        if(this.menuTopHeight.threeMenuTopHeight >= 0) {
					        this.menuScrollDir.threeScrollTop = false;
				        };
				        this.menuScrollDir.threeScrollBottom = true;
			        } else {
				        clearInterval(this.menuTimer.threeMenuBottomTimer);
				        this.menuScrollDir.threeScrollTop = false;
			        };
		        }, 50);
            },
	        threeMenuScrollTopLeave () {
		        this.menuScrollBtnColor.threeTopScrollBtnColor = "#65696a";
		        this.scrollBtnBg.secondBtnTop = 'rgba(255, 255, 255, 0.1)';
		        clearInterval(this.menuTimer.threeMenuBottomTimer);
            },
        }
    }
</script>

<style scoped lang="scss">
    p,h4{
        padding: 0;
        margin: 0;
    }
    .scroll_top,.scroll_button{
        font-size: 18px;
        text-align: center;
        height: 26px;
        line-height: 26px;
        color: #65696a;
        background: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
    .padding_scroll_btn{
        height: 26px;
        background: #1d2236;
    }
    .side_menu .scroll_main{
        overflow: hidden;
        position: relative;
    }
    .side_menu .en_menu{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        margin: auto;
    }
    .en_menu_item{
        padding: 15px 15px;
        cursor: pointer;
    }
    .en_menu_h4{
        font-size: 14px;
        height: 1em;
        line-height: 1;
        font-weight: 400;
        .icon_font{
            display: inline-block;
            width: 16px;
            text-align: center;
        }
    }
    .en_menu_title{
        margin-left: 6px;
    }
    .en_second_sub_menu {
        position: fixed;
        left: 210px;
        background: #232d32;
        min-width: 210px;
        opacity: 0.98;
        top: 50px;
        bottom: 0;
        margin: auto;
    }
    .en_three_sub_menu {
        position: fixed;
        left: 420px;
        background: #232d32;
        min-width: 210px;
        opacity: 0.98;
        top: 50px;
        bottom: 0;
        margin: auto;
    }
    .en_three_menu_main{
        position: relative;
        overflow: hidden;
    }
    .en_menu_three {
        position: absolute;
        top: 0;
        left: 0px;
        right: 0;
        margin: auto;
        opacity: 0.94;
    }
    .second_menu{
        position: fixed;
        left: 210px;
        top: 0;
        width: 210px;
        height: 100%;
        padding: 50px 0 0;
        overflow: hidden;
        background: #232d32;
        opacity: 0.98;
    }
    /* vue动画钩子样式 */
    .second-menu-enter-active{
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
    }
    .second-menu-leave-active{
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        -o-transition: all 0.2s;
        transition: all 0.2s;
    }
    .second-menu-enter,.second-menu-leave-to{
        opacity: 0;
        width: 0;
    }
    .en_sub_menu_main{
        overflow: hidden;
        position: relative;
    }
    .en_menu_sub {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
    }
</style>