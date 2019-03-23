<template>
    <transition-group tag="ul" name="month" class="picker-frame" :style="{backgroundColor: defaultBg, color: defaultColor}">
        <li class="item" :style="item.active ? activeStyle : ''" v-for="item in months" @click="changeDate(item.date)" :key="item.date">
            <span v-if="item.active">{{item.year}}年</span>
            <span>{{item.month}}月</span>
        </li>
    </transition-group>
</template>
<script>
import dateFn from './dateFn'
export default {
    name: 'MonthPicker',
    props: {
        dataGap: {
            type: Array,
            required: true
        },
        // TODO
        current: {
            type: String,
            default: new Date().toString(),
        },
        defaultBg: {
            type: String,
            default: '#eee'
        },
        defaultColor: {
            type: String,
            default: '#333'
        },
        activeBg: {
            type: String,
            default: '#f00'
        },
        activeColor: {
            type: String,
            default: '#fff'
        }
    },
    data () {
        const _this = this
        return {
            currentDate: _this.current,
            activeStyle: {
                backgroundColor: _this.activeBg,
                color: _this.activeColor
            }
        }
    },
    computed: {
        months () {
            return dateFn(this.dataGap, new Date(this.currentDate))
        }
    },
    methods: {
        changeDate (date) {
            this.currentDate = date
        }
    }
}
</script>
<style lang="postcss">
    .picker-frame {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        & .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 12px;
            &>span {
                white-space: nowrap;
            }
        }
    }
</style>

