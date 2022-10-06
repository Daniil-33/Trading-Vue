<template>
    <div class="dropdown" :class="{ 'active': isOpened }">
        <div class="dropdown__selected" @click="isOpened = !isOpened">
            <slot name="selected" v-bind="value"></slot>
        </div>
        <ul class="dropdown__list">
            <li
                v-for="item in options"
                class="dropdown__list-item"
                :key="item.value"
                @click="selectOption(item)"
            >
                <slot name="option" v-bind="item"></slot>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
        value: {
            type: Object,
            default: () => ({})
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data: () => ({
        isOpened: false
    }),
    methods: {
        selectOption(option: any) {
            this.$emit('change', option);

            this.isOpened = false;
        }
    }
})
</script>
<style scoped lang="scss">
.dropdown {
    position: relative;
    min-width: 150px;
    width: fit-content;
    color: #fafafa;
    cursor: pointer;
    z-index: 9999;
    user-select: none;

    &__selected {
        min-height: 44px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        position: relative;
        font-size: 18px;
    }

    &__selected::after {
        content: '';
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        right: 14px;
        left: auto;
        top: 50%;
        border: 2px solid #fafafa;
        border-width: 0 0 2px 2px;
        transition: all .2s linear;
        transform: rotate(45deg) translateY(-50%);
    }

    .active &__selected::after {
        display: block;
        transform: rotate(-45deg);
        top: 25%;
    }

    &__list {
        display: none;
        list-style: none;
        position: absolute;
        top: 46px;
        width: 100%;
        border-radius: 8px;
        background: #fff;
    }

    .active &__list {
        display: block;
    }

    &__list-item {
        width: 100%;
        padding: 10px;
        transition: all .2s linear;
        font-size: 18px;
        color: rgb(18, 24, 38);
    }

    &__list-item:hover {
        background: rgba(18, 24, 38, 0.1);
    }
}
</style>