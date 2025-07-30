<!-- 🔹 PopupLayer.vue: 공통 팝업 레이어 컴포넌트 -->
<template>
<div v-if="visible" class="popup-overlay" @click.self="close">
    <div class="popup-inner">
        <a href="#" class="close-btn" @click.prevent="close">&#10005;</a>
        <!-- 🔹 slot으로 header 받을 수 있도록 -->
        <div class="popup-header" v-if="$slots.header || title">
            <slot name="header">
                <span>{{ title }}</span>
            </slot>
        </div>
        <div class="popup-content">
            <slot />
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'PopupLayer',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: ''
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>
