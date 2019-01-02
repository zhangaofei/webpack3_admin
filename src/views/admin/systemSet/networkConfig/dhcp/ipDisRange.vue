<template>
    <div class="disRange">
        <el-row>
            <el-col :span="12" :gutter="20">
                <el-row :gutter="10" class="flex_center_v">
                    <el-col :span="4" class="flex_right_h set_margin_right20" style="padding: 0;">
                        <span class="mandatory">接口</span>
                    </el-col>
                    <el-col :span="20" style="padding: 0;">
                        <el-select
                        v-model="initRange.value"
                        style="width: 100%;"
                        placeholder="请选择">
                            <el-option v-for="item in AllRangeDevice(getAllDevice)"
                                       :key="item.value"
                                       @change="changeSelect"
                                       :label="item.label"
                                       :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="flex_center_v set_margin_top20">
                    <el-col :span="4" class="flex_right_h set_margin_right20" style="padding: 0;">
                        <span class="mandatory">网关</span>
                    </el-col>
                    <el-col :span="20" style="padding: 0;">
                        <el-input v-model="initRange.routers" :placeholder="'请输入网关'"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="flex_center_v set_margin_top20">
                    <el-col :span="4" class="flex_right_h set_margin_right20" style="padding: 0;">
                        <span>DNS1</span>
                    </el-col>
                    <el-col :span="20" style="padding: 0;">
                        <el-input v-model="initRange.dns1" placeholder="请输入DNS1"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="flex_center_v set_margin_top20">
                    <el-col :span="4" class="flex_right_h set_margin_right20" style="padding: 0;">
                        <span>DNS2</span>
                    </el-col>
                    <el-col :span="20" style="padding: 0;">
                        <el-input v-model="initRange.dns2" placeholder="请输入DNS2"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="flex_center_v set_margin_top20">
                    <el-col :span="4" class="flex_right_h set_margin_right20" style="padding: 0;">
                        <span class="mandatory">分配范围</span>
                    </el-col>
                    <el-col :span="20" style="padding: 0;">
                        <el-input v-model="initRange.ranges" type="textarea" placeholder="请输入分配范围"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" style="padding: 0;">
                <p style="margin-left: 25px;">分配范围填写规则：</p>
                <p style="margin-left: 25px;">一行只能输入一个ip地址、子网、不可跨网段，起始地址不能大于结束地址</p>
                <p style="margin-left: 25px;">分配范围地址的ip地址写法：必须是x.x.x.x/255.255.255.255或者x.x.x.x</p>
                <p style="margin-left: 25px;">分配范围地址的子网写法：必须是x.x.x.x/x.x.x.x或者x.x.x.x</p>
                <p style="margin-left: 25px;">分配范围地址的IP字段写法：必须是x.x.x.x-x.x.x.x</p>
                <p class="set_margin_top20" style="margin-left: 25px;">正确示例：</p>
                <p style="margin-left: 25px;">ip：192.168.20.221/32 或者 192.168.20.221/255.255.255.255</p>
                <p style="margin-left: 25px;">子网：192.168.20.221/32 或者 192.168.20.221/255.255.0.0</p>
                <p style="margin-left: 25px;">ip字段：192.168.20.1-192.168.20.221</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props: {
            initRange: Object,
            rangeType: String,
            chooseDevice: String
        },
        name: '',
        created(){
            this.$nextTick(() => {
                this.getAllDeviceData();
            })
        },
        computed: {
            getAllDevice () {
                return this.rangeDevice = this.$store.getters.getAllDevice;
            },
            dhcpRangeData () { // 获取分配范围数据
                return this.$store.getters.dhcpRangeDatas;
            }
        },
        methods: {
            changeSelect () {
                this.getAllDeviceData();
            },
            validations (ev, val, type) {
                let txt = '', flag = true;
                if(val == '' && type == 'device'){
                    this.validation(ev.target, '接口不能为空！')
                };

            },
            getAllDeviceData () {
                this.$store.dispatch('getAllDevice', this);
            },
            AllRangeDevice (device) {
                if(!device) return;
                for (var i = 0; i < device.length; i++){
                    for (var j = 0; j < this.dhcpRangeData.length; j ++) {
                        if (device[i].value == this.dhcpRangeData[j].device) {
                            device.splice(i, 1);
                        }
                    }
                };
                return device;
            }
        },
        data () {
            return {
                value: '',
                rangeList: [],
                rangeDevice: [],
                selectList: [
                    {
                        value: 1,
                        label: '选项一'
                    },
                    {
                        value: 2,
                        label: '选项二'
                    },
                    {
                        value: 3,
                        label: '选项三'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="">

</style>