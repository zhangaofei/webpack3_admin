<template>
    <el-dialog
            :title="propsD == 'add' ? '新建-VLAN' : propsD == 'view' ? '查看-VLAN' : '编辑-VLAN'"
            :visible.sync="dialogVisible"
            @close="cancleNewAdd"
            class="public"
            custom-class="public dialog"
            >
        <div class="form-box">
            <el-form :model="propsC" :rules="rules" ref="propsC" label-width="110px">
                <el-form-item class="user_mandatory" label="vlan id" prop="vlanId">
                    <!--<el-col :span="14">-->
                        <el-input @blur="reRepeats(propsC)" :disabled="propsD == 'view'" v-model="propsC.vlanid" placeholder="请输入vlan id"></el-input>
                    <!--</el-col>-->
                </el-form-item>
                <el-form-item class="user_mandatory" label="接口" prop="device">
                    <!--<el-col :span="14">-->
                        <el-select class="valan_select" v-model="propsC.device" :disabled="propsD == 'view'" placeholder="请选择接口">
                            <el-option v-for="(item,index) of propsA" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    <!--</el-col>-->
                </el-form-item>
                <el-form-item class="user_mandatory" label="IP地址" prop="ipAdress">
                    <!--<el-col :span="14">-->
                        <el-input v-model="propsC.netip" :disabled="propsD == 'view'" placeholder="请输入IP地址"></el-input>
                    <!--</el-col>-->
                </el-form-item>
                <el-form-item class="user_mandatory" label="子网掩码" prop="submask">
                    <!--<el-col :span="14">-->
                        <el-input v-model="propsC.netmask" :disabled="propsD == 'view'" placeholder="请输入子网掩码"></el-input>
                    <!--</el-col>-->
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="foot">
            <span class="cancle btn_middle" @click="cancleNewAdd()" v-if="propsD != 'view'">取 消</span>
            <el-button class="primary confirm btn_middle" type="primary" @click="sureNewAdd(propsD,propsC)" v-if="propsD!='view'">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {reRepeat} from "@/api/systemSet/networkConfig/vlan";
    export default {
        props: {
            propsA: Array,
            propsB: Boolean,
            propsC: Object,
            propsD: String,
            vlanid: Number
        },
        name: "addVlan",
        created () {
            this.getNewAddForm();
        },
        data () {
            return {
                dialogVisible: false,
                isRepeat: true,
                newAddForm: {
                    vlanid: '',
                    device: '',
                    netip: '',
                    netmask: ''
                },
                rules:{
                    vlanid: [
                        { required: true, message: '请输入vlanid', trigger: 'blur' }
                    ],
                    device: [
                        { required: true, message: '请选择接口', trigger: 'blur' }
                    ],
                    netip: [
                        { required: true, message: '请输入ip地址', trigger: 'blur' }
                    ],
                    netmask: [
                        { required: true, message: '请输入子网掩码', trigger: 'blur' }
                    ]
                },
            }
        },
        watch: {
            propsB (nVal, oVal) {
                if (nVal) this.dialogVisible = nVal;
            }
        },
        methods: {
            getNewAddForm(){
                this.newAddForm = this.propsC;
            },
            sureNewAdd (type, data) {
                const regIp = /^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$/;

                console.log(this.newAddForm)

                if(this.isRepeat && (type == 'add' || type == 'edit') && data.vlanid != this.vlanid ){
                    this.$message({
                        type:'error',
                        message: "vlanid不能重复"
                    });
                    return
                }else if (data.vlanid == "") {
                    this.$message({
                        type:'error',
                        message: "vlanid不能为空"
                    });
                    return
                }else if (!/^[\d]*$/g.test(data.vlanid.toString())) {
                    this.$message({
                        type:'error',
                        message: "vlanid只能是大于0的整数"
                    });
                    return
                }else if (data.vlanid != "" && parseInt(data.vlanid) < 1) {
                    this.$message({
                        type:'error',
                        message: "vlanid必须是大于0的整数"
                    });
                    return
                }else if (data.device == "") {
                    this.$message({
                        type:'error',
                        message: "接口不能为空"
                    });
                    return
                }else if (data.netip == "") {
                    this.$message({
                        type:'error',
                        message: "ip地址不能为空"
                    });
                    return
                }else if (!regIp.test(data.netip)) {
                    this.$message({
                        type:'error',
                        message: "ip地址格式不对"
                    });
                    return
                }else if (!regIp.test(data.netmask)) {
                    this.$message({
                        type:'error',
                        message: "子网掩码格式不对"
                    });
                    return
                }else if (data.netmask == "") {
                    this.$message({
                        type:'error',
                        message: "子网掩码不能为空"
                    });
                    return
                }else{
                    this.$emit("sureNewAdds", data ,type);
                    this.dialogVisible = false;
                }
            },
            cancleNewAdd () {
                this.dialogVisible = false;
                this.$emit("cancleNewVlan", this.dialogVisible);
            },
            reRepeats (obj) {
                console.log("去重");
                var that = this;
                reRepeat({vlanid:obj.vlanid}).then(function(res){
                    if(res.status == "SUCCESS" && res.data != null){
                        if(obj.vlanid != that.vlanid){
                            that.$message({
                                type:'error',
                                message: "vlanid不能重复"
                            });
                        }
                        that.isRepeat = true;
                    }else{
                        that.isRepeat = false;
                    }
                }).catch(function (res) {
                    that.isRepeat = false;
                    that.$message({
                        type:'error',
                        message: res.status
                    });
                })
            },
            isReadOnly (type) {
                if(type !== "add"){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
</script>

<style scoped>
     .valan_select{
        width: 100%;
    }
</style>