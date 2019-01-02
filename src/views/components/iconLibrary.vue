<template>
    <div v-show="dialogVisible" class="icon_list_content">
        <span @click="prevePages" class="preve"><i class="el-icon-arrow-left"></i></span>
        <span @click="nextPages" class="next"><i class="el-icon-arrow-right"></i></span>
        <el-row tag="ul" class="icon_list">
            <el-col v-for="(item,index) in iconList" :key="item.id" tag="li" class="icon_li"
                    :style="{
                        'border-bottom': item.isSetBorder0?0:'1px solid #D3DCE6',
                        'border-bottom-color': 'transparent'
                    }" >
                <a :class="{active:item.choose}" @click="choosedIcon(index)">
                    <img :src="item.icon" title="" alt="" />
                </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {iconListData} from '../../api/systemSet/sysConfig/iconCenter'
    export default {
        name: "iconLibrary",
        data () {
            return {
                dialogVisible: false,
                iconList: [
                    {
                        choose: false,
                        icon: '',
                        isSetBorder0: false
                    }
                ],
                listQuery: {
                    total: 0
                },
                totalPage: 0,
                currPage: 1,
                nextPage: 0,
                lastPage: 1
            }
        },
        created () {
            this.getIconList(1, 9);
        },
        methods: {
            choosedIcon (num) {
                for(var i = 0; i < this.iconList.length; i++){
                    this.iconList[i].choose = false
                }
                this.iconList[num].choose = !this.iconList[num].choose
                this.$emit("reIconList", this.iconList)
            },
            prevePages () {
                this.currPage--
                if(this.currPage < 1) {
                    this.currPage = 1
                    this.$message({
                        message: '已经是第一页了',
                        type: 'warning'
                    })
                    return;
                };
                this.getIconList(this.currPage, 9);
            },
            nextPages () {
                this.currPage++
                if(this.currPage > this.lastPage) {
                    this.currPage = this.lastPage
                    this.$message({
                        message: '已经是最后一页了',
                        type: 'warning'
                    })
                    return;
                };
                this.getIconList(this.currPage, 9);
            },
            getIconList (page, pageSize) {
                iconListData({page: page, page_size: pageSize}).then( res => {
                    if(res.msg == "success"){
                        this.listQuery.total = res.data.items.page_count;
                        this.lastPage = Math.ceil(this.listQuery.total / 9);
                        this.iconList = res.data.items.res.map(item => {
                            return {
                                choose: false,
                                icon: item.icon_path,
                                isSetBorder0: false,
                                file_name: item.file_name,
                                id: item.id
                            }
                        });

                        if(this.listQuery.total < pageSize) {
                            this.lastPage = page;
                        }
                        console.log(this.lastPage);
                    }
                }).catch( res => {
                    this.$message({
                        message: res.status,
                        type: 'error'
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .icon_list{
        display: inline-block;
        width: 450px;
        margin: -40px 50%;
        transform: translateX(-50%);
        .icon_li{
            width: 150px;
            height: 150px;
            position: relative;
            cursor: pointer;
            a{
                display: inline-block;
                width: 150px;
                height: 150px;
                padding: 35px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .checkbox{
                position: absolute;
                left: 14px;
                top: 14px;
                margin: 0;
            }
            a.active:after{
                content: '';
                border: 1px solid #3484df;
                position: absolute;
                left: -1px;
                top: -1px;
                right: -1px;
                bottom: -1px;
                z-index: 10;
                background: url("../../assets/choose_icon.png") no-repeat right bottom/20px 20px;
            }
        }
        .icon_li:nth-of-type(6n){
            border-right: 0;
        }
    }
    .icon_list_content{
        position: relative;
        .preve,.next{
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            background: #7e899d;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
            cursor: pointer;

            transform: translateY(-50%);
            position: absolute;
            top: 50%;
        }
        .preve{
            left: 0;
        }
        .next{
            right: 0;
        }
    }
</style>