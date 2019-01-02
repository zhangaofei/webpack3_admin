<template>
    <div class="power-form public" v-model="addVisible">
        <el-dialog title="新建权限" :visible.sync="addVisible" top="6%" custom-class="dialog public" size="small" @close="handleClose">
            <el-tabs type="border-card" class="">
                <el-tab-pane label="访问权限">
            <div>
                <el-form :model="powerForm" ref="powerForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="权限名称" prop="name">
                        <el-input v-model="powerForm.name" class="el_put" placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                    <el-form-item label="权限说明">
                        <el-input v-model="powerForm.remark" class="el_put" placeholder="请输入权限说明"></el-input>
                    </el-form-item>

                    <el-form-item label="权限列表" class="item_mark">
                        <!--<span style="color:red;position:absolute;left:30px;font-weight:bold" class="span-header">*</span>-->
                        <div>
                            <!--<div id="e" style="width:460px;float: left;" v->-->
                                <!--<div style="width: 80%;float: left">-->
                                     <!--<span style="width: 300px;" class="span-header">权限列表</span>-->
                                <!--</div>-->
                            <!--</div>-->
                            <div id="tree"
                                 class="row pre-scrollable tree_css"
                                 style="">
                                <el-tree
                                        :data="menuData"
                                        show-checkbox
                                        node-key="id"
                                        ref="tree"
                                        :render-after-expand="false"
                                        :expand-on-click-node="false"
                                        :props="defaultProps"
                                        :render-content="renderContent"
                                >
                                </el-tree>
                            </div>
                        </div>

                    </el-form-item>
                </el-form>
            </div>
                </el-tab-pane>
                <el-tab-pane label="密码权限">
                    <el-form label-width="130px" class="power_psw_check">
                        <el-form-item label="密码基础设置">
                                <div class="text item1" style="">
                                    <input type="checkbox" v-model="powerForm.isUserNameEqualPw">
                                    {{'允许用户名密码一致'}}
                                </div>
                                <div class="text item1" style="">
                                    <input type="checkbox" v-model="powerForm.isNewPwEqualOldPw">
                                    {{'允许新旧密码一致'}}
                                </div>

                                <div style="" class="item_mark">
                                    <span class="ele_before">密码长度范围</span>
                                    <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                        <input class="el-input__inner" style="height: 32px" v-model.number="powerForm.minPwLength"
                                               >
                                       <!-- @blur="minPasswordLength" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                                        <span class="el-form-item1__error common_psw common_psw_min" id="minLengthErrMsg" style="">请输入6到最大值之间的正整数</span>-->
                                    </div>
                                    至
                                    <div class="el-input" style="width: 64px; margin-left: 10px">
                                        <input class="el-input__inner" style="height: 32px" v-model.number="powerForm.maxPwLength"
                                               >
                                       <!-- @blur="maxPasswordLength" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                                        <span class="el-form-item1__error common_psw common_psw_max" id="maxLengthErrMsg" style="">请输入最小值到99之间的正整数</span>-->
                                    </div>
                                </div>
                                <div style="margin-top: 15px;">
                                    密码组成部分包括
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="powerForm.isNumber"> 数字
                                    <input type="checkbox" style="margin-left: 30px; margin-right: 5px" v-model="powerForm.isLetter"> 英文字母
                                    <input type="checkbox" style="margin-left: 20px; margin-right: 5px" v-model="powerForm.isSpecialSymbol"> 特殊符号
                                </div>
                        </el-form-item>

                        <el-form-item label="账号锁定" class="power_psw_check ">
                            <div>
                                <span style="">密码连续输入错误</span>
                                <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                    <input class="el-input__inner" style="height: 32px" v-model.number="powerForm.adminErrorNum"
                                           >
                                    <!--@blur="ErrorCount" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                                    <div class="el-form__error common_psw" id="passErrMsg"  style="">请输入0-9999之间的整数</div>-->
                                </div>
                                (0-100次),登录时,需要输入验证码
                            </div>
                            <div style="margin-top: 15px">
                                <span style="">账号连续</span>
                                <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                    <input class="el-input__inner" style="height: 32px" v-model.number="powerForm.notLoginDay"
                                           >
                                   <!-- @blur="passwordLocked" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                                    <div class="el-form-item1__error common_psw" id="passwordNumErrMsg" style="">请输入0-9999之间的整数</div>-->
                                </div>
                                天未登录,自动锁定
                            </div>
                        </el-form-item>
                        <el-form-item label="密码有效期" class="power_psw_check ">
                            <span style="">密码有效期</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="powerForm.pwValid"
                                       >
                               <!-- @blur="pwValidBefEvent"
                                <div class="el-form-item1__error common_psw" id="pwValidErrMsg" style="">请输入0-9999之间的整数</div>-->
                            </div>
                            天
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div class='form-footer ' slot="footer">
                <div class="foot">

                    <span @click="resetForm('powerForm')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="add('powerForm')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import {addPower} from "../../../../../api/systemSet/new_adminSet/new_powerManager";

    export default {
        computed: {
            ...mapGetters([
                'menuData'
            ])
        },
        created() {
            // console.log('menuData:',this.menuData)
        },
        data() {
            var name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9_]{1,99}$/.test(value) == false){
                    callback(new Error("请输入中文、英文、数字、下划线"));
                } else if(value == '超级管理员'){
                    callback(new Error("权限名称不能为超级管理员"));
                } else {
                    callback();
                }
            };
            return {
                rules:{
                    name:[
                        {required: true,validator: name,trigger: 'blur'}
                    ],
                    accessList:[
                        {required: true, message:'请选择用户权限' ,trigger: 'blur'}
                    ]
                },
                addVisible: true,
                powerForm: {
                    name: '',
                    remark: '',
                    isDefault: true,
                    accessContentDTOList: [],
                    isUserNameEqualPw:true,
                    isNewPwEqualOldPw:true,
                    minPwLength:6,
                    maxPwLength:20,
                    isNumber:true,
                    isLetter:true,
                    isSpecialSymbol:false,
                    adminErrorNum:5,
                    notLoginDay:365,
                    pwValid:365
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checkedBox:[]
            }
        },
        methods: {
            minPasswordLength(e){
                let value = e.target.value;
                if ((value >= this.powerForm.maxPwLength && this.powerForm.maxPwLength >= 6) || value < 6 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#minLengthErrMsg').show();
                }
                else {
                    $('#minLengthErrMsg').hide();
                }

            },
            maxPasswordLength(e){
                let value = e.target.value;
                if (this.powerForm.minPwLength >= value || value > 99||this.powerForm.minPwLength<6 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#maxLengthErrMsg').show();
                }
                else {
                    $('#maxLengthErrMsg').hide();
                }
            },
            ErrorCount(e){
                let value = e.target.value;
                if (value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#passErrMsg').show();
                } else {
                    $('#passErrMsg').hide();
                }
            },
            passwordLocked(e){
                let value = e.target.value;
                if (value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#passwordNumErrMsg').show();
                } else {
                    $('#passwordNumErrMsg').hide();
                }
            },
            pwValidBefEvent(e)
            {
                let value =e.target.value;
                if(value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false)
                {
                    $('#pwValidErrMsg').show();
                } else {
                    $('#pwValidErrMsg').hide();
                }
            },
            handleClose() {
                this.changeStatus();
            },
            renderContent(h, { node, data, store }) {
                // console.log('renderContent:',h,{ node, data, store })
                return (
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                        <span>
                            <span>{node.label}</span>
                        </span>
                        <span>
                            <span>
                                <input type="checkbox" name="check_box" value={data.id} on-click={ () => this.doCheck(node, data) }/>
                                <el-button type="text" style="background-color: white;margin-left: 10px" size="mini">只读</el-button>
                            </span>
                    </span>
                    </span>);
            },
            findIndex(list,val){
                console.log('findIndex_list','xx')
                //找某一个值在数组中的序号，没有则返回-1
                for(let i=0;i<list.length;i++){
                    if(list[i].id==val){
                        console.log('findIndex',i)
                        return i;
                    }
                }

                return -1;
            },

            doCheck(node, data) {
                // console.log('doCheck:',node,'===',data)
                var r=document.getElementsByName("check_box");
                for(var i=0;i<r.length;i++){
                    if(r[i].value==data.id){
                        if(r[i].checked){
                            //勾选节点
                            this.checked(node,data);
                        }else{
                            //不勾选节点
                            this.unchecked(node,data);
                        }
                        break;
                    }
                }
                //每次勾选或者不勾选之后更新节点的勾选状态
                this.updateCheckbox();
            },

            updateCheckbox(){
                var r=document.getElementsByName("check_box");
                for(var i=0;i<r.length;i++){
                    r[i].checked=false; //把勾选的先去掉
                }

                for(let j=0;j<this.checkedBox.length;j++){
                    for(var i=0;i<r.length;i++){
                        if(r[i].value==this.checkedBox[j].id){
                            r[i].checked=true;   //重新勾选
                        }
                    }
                }
            },

            removeCheckedBox(id){
                let index=-1;
                //清除当前节点
                index=this.findIndex(this.checkedBox,id);
                if(index != -1){
                    this.checkedBox.splice(index, 1);
                }
            },

            unchecked(node, data){
                const parent = node.parent.data;
                //清除当前节点
                this.removeCheckedBox(data.id);
                data.readOnly = false;
                if(parent.length>1){
                    //说明该节点是一级节点，去除下面的所有节点
                    const children = node.data.children;   //该节点的所有子节点
                    for(let i=0;i<children.length;i++){
                        //逐个清除子节点
                        this.removeCheckedBox(children[i].id);
                        children[i].readOnly = false;
                        if(children[i].hasOwnProperty('children')){
                            for(let j=0;j<children[i].children.length;j++){
                                this.removeCheckedBox(children[i].children[j].id);
                                children[i].children[j].readOnly = false;
                            }
                        }


                    }
                }else if(node.parent.parent.label==undefined){
                    //这时所有的当前节点的父节点的子节点不是所有的都勾选，父节点设置不不勾选
                    this.removeCheckedBox(node.parent.data.id);

                    node.parent.data.readOnly = false;
                    /*2级*/
                    if(node.parent.parent.label==undefined){
                        if(data.hasOwnProperty('children')){
                            for(let i=0;i<data.children.length;i++){
                                data.children[i].readOnly = false;
                                this.removeCheckedBox(data.children[i].id);
                                /**/
                            }
                        }

                        this.removeCheckedBox(node.parent.data.id);
                    }
                }else {
                    this.removeCheckedBox(node.parent.data.id);
                    this.removeCheckedBox(node.parent.parent.data.id);
                }

            },
            checked(node, data){
                console.log('node:',node,'data:',data)
                const parent = node.parent.data;
                if(parent.length>1){
                    //说明该节点是一级节点，添加下面所有的子节点
                    this.checkedBox.push({id:data.id,rank:1});
                    data.readOnly = true;
                    const children = node.data.children;   //该节点的所有子节点
                    for(let i=0;i<children.length;i++){

                        //逐个添加子节点
                        if(this.findIndex(this.checkedBox,children[i].id)==-1){
                            this.checkedBox.push({id:children[i].id,rank:2});//如果之前的勾选列表中没有这个值，就将该值添加进去，有的话就避免二次添加
                            children[i].readOnly = true;
                            /*三级节点 */
                            if(children[i].hasOwnProperty('children')){
                                for(let j=0;j<children[i].children.length;j++){
                                    this.checkedBox.push({id:children[i].children[j].id,rank:3});
                                    children[i].children[j].readOnly = true;
                                    console.log('三级：',this.checkedBox)
                                }
                            }

                        }

                    }
                }else if(node.parent.parent.label==undefined){
                    this.checkedBox.push({id:data.id,rank:2});
                    // if(node.parent.parent.label==undefined){
                    //     this.checkedBox.push({id:data.id,rank:2});
                    // }else {
                    //     this.checkedBox.push({id:data.id,rank:3});
                    // }
                    console.log('data_sec',data)

                    data.readOnly = true;
                    const children = node.parent.data.children;   //获取该节点所在的所有同级节点
                    //查看是否所有同级兄弟节点已经被勾选了,如果所有同级节点都被勾选了，则他们的父节点也要被勾选
                    if(children != null && children.length != 0){
                        let isParentExist=true;
                        let index=-1;
                        for(let k=0;k<children.length;k++){
                            index=this.findIndex(this.checkedBox,children[k].id)
                            if(index==-1){
                                isParentExist=false;
                                break;
                            }
                        }
                        if(isParentExist){
                            this.checkedBox.push({id:node.parent.data.id,rank:1});
                            console.log('checkedBox_exist',this.checkedBox)
                            node.parent.data.readOnly = true;
                        }
                    }
                    /*=====(2级)当前节点的子节点*/
                    if(node.data.hasOwnProperty('children')){
                        for(let i=0;i<node.data.children.length;i++){
                            this.checkedBox.push({id:node.data.children[i].id,rank:3});
                            node.data.children[i].readOnly = true;
                        }
                    }
                }else {
                    data.readOnly = true;
                    this.checkedBox.push({id:data.id,rank:3});

                    const children = node.parent.data.children;   //获取该节点所在的所有同级节点
                    //查看是否所有同级兄弟节点已经被勾选了,如果所有同级节点都被勾选了，则他们的父节点也要被勾选
                    if(children != null && children.length != 0){
                        let isParentExist=true;
                        let index=-1;
                        for(let k=0;k<children.length;k++){
                            index=this.findIndex(this.checkedBox,children[k].id)
                            if(index==-1){
                                isParentExist=false;
                                break;
                            }
                        }
                        if(isParentExist){
                            this.checkedBox.push({id:node.parent.data.id,rank:2});
                            // this.checkedBox.push({id:node.parent.parent.data.id,rank:1});
                            console.log('checkedBox_exist',this.checkedBox)
                            node.parent.data.readOnly = true;
                        }
                    }
                }

            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            valided(){
                if(/^\d*$/.test(this.powerForm.minPwLength)&&/^\d*$/.test(this.powerForm.maxPwLength)&&this.powerForm.minPwLength>=6&&this.powerForm.maxPwLength<=99){
                    if(this.powerForm.minPwLength>this.powerForm.maxPwLength){
                        this.$message({
                            type: 'warning',
                            message: '密码长度最大值应大于最小值！'
                        });
                        return false
                    }
                }else {
                    if(this.powerForm.minPwLength===0&&this.powerForm.maxPwLength===0){

                    }else {
                        this.$message({
                            type: 'warning',
                            message: '密码长度在6至99之间整数！'
                        });
                        return false
                    }
                }
                if(this.powerForm.adminErrorNum!==''&&typeof (this.powerForm.adminErrorNum)!='string') {
                    if (/^\d*$/.test(this.powerForm.adminErrorNum)&&(0 <= this.powerForm.adminErrorNum && this.powerForm.adminErrorNum <= 100)) {

                    }else {
                        this.$message({
                            type: 'warning',
                            message: '密码连续输入次数错误'
                        });
                        return false
                    }
                }else{
                    /*不填写 为默认值*/
                    if(this.powerForm.adminErrorNum===''){
                        this.powerForm.adminErrorNum= 5;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '密码连续输入次数错误'
                        });
                        return false
                    }
                }
                if(this.powerForm.notLoginDay!==''&&typeof (this.powerForm.notLoginDay)!='string') {
                    if (/^\d*$/.test(this.powerForm.notLoginDay)&&(0 <= this.powerForm.notLoginDay&&this.powerForm.notLoginDay<=1000000000)) {

                    }else {
                        this.$message({
                            type: 'warning',
                            message: '账号连续登录天数错误'
                        });
                        return false
                    }
                }else{
                    /*不填写 为默认值*/
                    if(this.powerForm.notLoginDay===''){
                        this.powerForm.notLoginDay= 365;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '账号连续登录天数错误'
                        });
                        return false
                    }
                }

                if(this.powerForm.pwValid!==''&&typeof (this.powerForm.pwValid)!='string') {
                    if (/^\d*$/.test(this.powerForm.pwValid)&&(0 <= this.powerForm.pwValid&&this.powerForm.pwValid<=1000000000)) {

                    }else {
                        this.$message({
                            type: 'warning',
                            message: '密码有效期天数错误'
                        });
                        return false
                    }
                }else{
                    /*不填写 为默认值*/
                    if(this.powerForm.pwValid===''){
                        this.powerForm.pwValid= 365;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '密码有效期天数错误'
                        });
                        return false
                    }
                }
                return true
            },
            add(powerForm) {
                console.log("选中的树：", this.$refs.tree.getCheckedNodes(),'half',this.$refs.tree.getHalfCheckedNodes());

                var nodes = this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes());
                console.log('tree_node',nodes)
                // return;
                if (null == nodes || nodes.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择功能列表'
                    });
                    return
                }
                var idArr=[];
                console.log('tree_node',nodes)
                for (var i = 0; i < nodes.length; i++) {//如果是父节点,先把父节点储存起来,子节点先不管
                    var res = false;
                    if(nodes[i].readOnly == true){
                        res = true;
                    } else {
                        res = false;
                    }
                    if (nodes[i].hasOwnProperty('children')) {
                        if (nodes[i].children.length != null)
                        {
                            idArr.push(nodes[i].id)
                            this.powerForm.accessContentDTOList.push(
                                {
                                    'id':nodes[i].id,
                                    'name':nodes[i].label,
                                    'readOnly':res,
                                    accessContentDTOList:[]
                                }
                            )
                            }
                    }
                    else {
                        //防止父节点存放重复
                        if (idArr.indexOf(nodes[i].parentId)!=-1)//是子节点情况,存放子节点
                        {
                            for(var a=0;a<this.powerForm.accessContentDTOList.length;a++)
                            {
                                if(nodes[i].parentId==this.powerForm.accessContentDTOList[a].id){
                                    this.powerForm.accessContentDTOList[a].accessContentDTOList.push({
                                        'id': nodes[i].id,
                                        'name': nodes[i].label,
                                        'readOnly': res,
                                        accessContentDTOList:null
                                    })
                                }
                            }
                        }
                        else {//遍历时如果父节点没被存放过,再重新存放一次
                            this.powerForm.accessContentDTOList.push(
                                {
                                    'id': nodes[i].parentId,
                                    'name': nodes[i].label,
                                    'readOnly': false,
                                    accessContentDTOList:[//存放子节点
                                        {
                                            'id': nodes[i].id,
                                            'name': nodes[i].label,
                                            'readOnly': res,
                                            'accessContentDTOList': null
                                        }]
                                }
                            )
                            console.log('powerForm',this.powerForm.accessContentDTOList)
                        }


                    }

                }

                this.$refs[powerForm].validate((valid) => {
                        if (valid) {
                            if(this.valided()){
                                if(this.powerForm.isUserNameEqualPw == true){
                                    this.powerForm.isUserNameEqualPw = 1;
                                } else {
                                    this.powerForm.isUserNameEqualPw = 0
                                }
                                if(this.powerForm.isNewPwEqualOldPw == true){
                                    this.powerForm.isNewPwEqualOldPw = 1;
                                } else {
                                    this.powerForm.isNewPwEqualOldPw = 0;
                                }
                                if(this.powerForm.isNumber == true){
                                    this.powerForm.isNumber = 1;
                                } else {
                                    this.powerForm.isNumber = 0;
                                }
                                if(this.powerForm.isLetter == true){
                                    this.powerForm.isLetter = 1;
                                } else {
                                    this.powerForm.isLetter = 0;
                                }
                                if(this.powerForm.isSpecialSymbol == true){
                                    this.powerForm.isSpecialSymbol = 1;
                                } else {
                                    this.powerForm.isSpecialSymbol = 0;
                                }
                                addPower(this.powerForm).then(response => {
                                    if (response.status == 'SUCCESS') {
                                        this.$message({
                                            type: 'success',
                                            message: '新建权限成功！'
                                        });
                                        this.addVisible = false;
                                        this.$emit('onChangeStatus');
                                        this.$refs[v].resetFields();
                                    } else {
                                        this.$message({
                                            type: 'warning',
                                            message: response.code.info
                                        });
                                    }

                                })
                                    .catch(err => {

                                    });
                            }

            }
                });

            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },
        }
    }
</script>
<style>
    .el-input__inner {
        /*-webkit-appearance: none;*/
        /*background-color: #fff;*/
        /*border-radius: 4px;*/
        /*border: 1px solid #dcdfe6;*/
        /*box-sizing: border-box;*/
        /*color: #606266;*/
        /*display: inline-block;*/
        /*font-size: inherit;*/
        /*height: 40px;*/
        /*line-height: 1;*/
        /*outline: 0;*/
        /*padding: 0 15px;*/
        /*-webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);*/
        /*transition: border-color .2s cubic-bezier(.645,.045,.355,1);*/
        /*width: 100%;*/
    }
    .power-form .el-checkbox__inner {
        height: 13px;
        width: 13px;
    }
    /*.span-header {*/
        /*font-size: 16px;*/
        /*color: #606366;*/
    /*}*/

    #tree .halo-tree {
        margin-left: 10px;
    }
    /*.public .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
         /*left: 131px;*/
    /*}*/
    /*.public .el-form-item1__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*!* left: 131px; *!*/
        /*left: 0px;*/
    /*}*/
    /*.public .el-form__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*!* left: 131px; *!*/
        /*left: 20px;*/
    /*}*/
    .tree_css{
        float: left;
        margin-left: 4px;
        height:374px;
        width: 100%;
        border:solid 1px #e1e3eb;
    }
</style>
