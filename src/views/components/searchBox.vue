
<!--
    参数说明：
        1.placeholder：搜索输入框占位符，string
        2.iconClass：搜索按钮icon图标class名，string
        3.inputClass：搜索输入框自定义class类名，string
        4.searchBoxId：搜索框顶层div 的 id名，string
        5.inputBoxId：搜索输入框id名，string
        6.width：搜索按钮的宽度（需带单位），string
        7.index：搜索组件的序号，用于区分一个页面多个搜索框时使用，string

    支持两个回调函数search(event, keyword, index)，onClickSearchButton(keyword, index):
        1.event:事件原生event
        2.keyword：搜索输入框的value值，通常用于搜索事件触发传递参数用
        3.index：搜索组件的序号，用于区分一个页面多个搜索框时使用
-->

<template>
    <div class="searchBox" :id="searchBoxId" :style="{border: borderInput, 'padding-right': width ? width: '60px'}">
        <input type="text"
           :class="inputClass"
           class="search_input"
           :placeholder="placeholder"
           v-model="keyWord"
           :id="inputBoxId"
           @focus.stop="inputFouce"
           @blur.stop="inputBlur"
           @keyup.enter="search($event)"
        />
        <span class="glyphicon glyphicon-search serch_head_icon"></span>
        <span class="search_btn" :style="{width: width ? width: '60px'}">
            <button class="search_button" type="button" @click="onClickSearchButton()" >
                <span :class="iconClass">搜索</span>
            </button>
        </span>
    </div>
</template>

<script>
    export default {
        name: "searchBox",
        data () {
            return {
                borderInput: '1px solid #ece7ef',
                keyWord: ''
            }
        },
        props: {
            placeholder: String,
            iconClass: String,
            inputClass: String,
            searchBoxId: String,
            inputBoxId: String,
            width: String,
            index: String
        },
        watch: {

        },
        methods: {
            search (event) {
                this.$emit('search', event, this.keyWord, this.index);
            },
            onClickSearchButton () {
                this.$emit('onClickSearchButton', this.keyWord, this.index);
            },
            inputFouce () {
                this.borderInput = '1px solid #007acc';
            },
            inputBlur () {
                this.borderInput = '1px solid #ece7ef';
            }
        }
    }
</script>

<style scoped lang="scss">
    /* 搜索按钮样式start */
    .searchBox{
        width: 100%;
        position: relative;
        padding-right: 100px;
        padding-left: 36px;
        height: 38px;
        border: 1px solid #ece7ef;
        -webkit-border-radius: 1px;
        -moz-border-radius: 1px;
        border-radius: 1px;
        .search_input {
            width: 100%;
            border: 0;
            height: 24px;
            margin-top: 6px;
            box-shadow: none;
            outline: none;
        }
        .serch_head_icon{
            position: absolute;
            left: 0;
            top: 0;
            width: 36px;
            height: 38px;
            text-align: center;
            line-height: 38px;
            color: #bdbdbd;
        }
        .search_btn{
            display: inline-block;
            text-align: center;
            position: absolute;
            right: -1px;
            top: -1px;
        }
    }
    .search_button{
        display: inline-block;
        *display: inline;
        zoom: 1;
        padding: 0;
        margin: 0;
        cursor: pointer;
        border: 1px solid #007acc;
        overflow: visible;
        text-decoration: none;
        white-space: nowrap;
        color: #ffffff;
        height: 38px;
        line-height: 38px;
        width: 100%;

        background-color: #3484df;
        //background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(84, 164, 239,1)), to(rgba(84, 164, 239,0)));
        //background-image: -webkit-linear-gradient(top, rgba(84, 164, 239, 1), rgba(84, 164, 239,0));
        //background-image: -moz-linear-gradient(top, rgba(84, 164, 239,1), rgba(84, 164, 239,0));
        //background-image: -ms-linear-gradient(top, rgba(84, 164, 239,1), rgba(84, 164, 239,0));

        //background-image: -o-linear-gradient(top, rgba(84, 164, 239,1), rgba(84, 164, 239,0));
        //background-image: linear-gradient(top, rgba(84, 164, 239,1), rgba(84, 164, 239,0));

        -webkit-transition: background-color .2s ease-out;
        -moz-transition: background-color .2s ease-out;
        -ms-transition: background-color .2s ease-out;
        -o-transition: background-color .2s ease-out;
        transition: background-color .2s ease-out;
        background-clip: padding-box; /* Fix bleeding */
        -moz-border-radius: 0px 1px 1px 0;
        -webkit-border-radius: 0px 1px 1px 0;
        border-radius: 0px 1px 1px 0;
        //-moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(84, 164, 239, .3) inset;
        //-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(84, 164, 239, .3) inset;
        //box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(84, 164, 239, .3) inset;
        //text-shadow: 0 1px 0 rgba(84, 164, 239, .9);
        box-shadow: none;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .search_button:hover{
        background-color: #44a4ef;
        color: #ffffff;
    }
    .search_button:active{
        background: #44a4ef;
        position: relative;
        //top: 1px;
        text-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        //-moz-box-shadow: 0 1px 1px rgba(52, 147, 224, .3) inset;
        //-webkit-box-shadow: 0 1px 1px rgba(52, 147, 224, .3) inset;
        //box-shadow: 0 1px 1px rgba(52, 147, 224, .3) inset;
    }
    .search_button[disabled], .search_button[disabled]:hover, .search_button[disabled]:active{
        border-color: #eaeaea;
        background: #fafafa;
        cursor: not-allowed;
        position: static;
        color: #999;
        /* Usually, !important should be avoided but here it's really needed :) */
        -moz-box-shadow: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
    }
    /* 搜索按钮样式end */
</style>