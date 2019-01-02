<template>
    <div class="reservedIp">
        <el-row class="flex_center_v">
            <el-col :span="2" class="flex_right_h">
                <span class="mandatory">接口</span>
            </el-col>
            <el-col :span="6" class="set_margin_left20">
                <el-select
                        @change="changeReservedValue(initReseved[0].device)"
                        :load="getSlectValue"
                        v-model="initReseved[0].device"
                        placeholder="请选择"
                        style="width: calc(100% - 20px);">
                    <el-option v-for="item in interface"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="padding_v_20 flex_center_v">
            <el-col :span="6" :offset="2" class="flex_center_h">
                <span class="mandatory">预留IP</span>
            </el-col>
            <el-col :span="6" class="flex_center_h">
                <span class="mandatory">预留MAC地址</span>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="14" :offset="2">
                <el-row class="flex_center_v set_margin_bottom20 set_margin_left20" v-for="(item,index) in initReseved" :key="index">
                    <el-col :span="11" class="flex_center_h set_margin_right20">
                        <el-input v-model="item.ip" placeholder="请输入预留IP"></el-input>
                    </el-col>
                    <el-col :span="11" class="flex_center_h set_margin_right20">
                        <el-input v-model="item.mac" placeholder="请输入预留MAC地址"></el-input>
                    </el-col>
                    <el-col :span="4" class="flex_center_v">
                        <i @click="addNewItem(index)" class="el-icon-circle-close set_margin_right15 text_color_blue rotate_45deg cursor_pointer" v-if="reservedType=='editReserved'?false:true"></i>
                        <i @click="delNewAdd(index)" class="el-icon-remove text_color_blue cursor_pointer" v-if="index==0||reservedType=='editReserved'?false:true"></i>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <p class="set_margin_left15">填写规则（x必须是0-255之间的数字）</p>
                <p class="set_margin_left15">预留IP的写法：</p>
                <p class="set_margin_left15">必须是x.x.x.x/255.255.255.255或者x.x.x.x</p>
                <p class="set_margin_top20 set_margin_left15">正确示例：</p>
                <p class="set_margin_left15">预留IP：192.168.2.224</p>
                <p></p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props: {
            slectValue: String,
            reservedType: String,
            initReseved: Array
        },
        data () {
            return {
                value: '',
                interface: [],
                newAddData: [],
                resevedList: [],
                id: 0
            }
        },
        computed: {
            getReservedIpInitDatas () {
                return this.$store.getters.getReservedIpInitData;
            },
            getSlectValue () {
                return this.value = this.slectValue;
            }
        },
        created () {
            this.initDevice();
        },
        methods: {
            initDevice () {
                if( !this.$store.getters.dhcpRangeDatas ) {
                    return {
                        value: '',
                        label: ''
                    }
                };
                this.interface = this.$store.getters.dhcpRangeDatas.map( item => {
                    return {
                        value: item.device,
                        label: item.device
                    }
                });
            },
            addNewItem (index) {
                this.initReseved.splice(index+1, 0, {
                    "device": "",
                    "ip": "",
                    "mac": "",
                    "id": index+1
                })
            },
            delNewAdd (index) {
                this.initReseved.splice(index, 1);
            },
            changeReservedValue (val) {
                this.value = val;
                this.$store.dispatch('changeResSelectValue', val);
            }
        }
    }
</script>

<style scoped lang="">

</style>