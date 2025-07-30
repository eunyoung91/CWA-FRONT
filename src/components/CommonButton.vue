<!-- CommonButton.vue -->
<template>
    <component
    :is="buttonTag"
    :to="to"
    :type="type"
    :class="['btn', variantClass, sizeClass, customClass, { 'is-active': isActive }]"
    @click="handleClick"
    :disabled="disabled"
    >
    <template v-if="iconPosition === 'left'">
        <slot name="icon" />
    </template>

    <slot />

    <template v-if="iconPosition === 'right'">
        <slot name="icon" />
    </template>
    </component>
</template>

<script>
    export default {
        name: 'CommonButton',
        props: {
        type: {
            type: String,
            default: 'button'
        },
        variant: {
            type: String,
            default: 'primary'
        },
        size: {
            type: String,
            default: 'medium'
        },
        customClass: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        iconPosition: {
            type: String,
            default: 'left',
            validator: value => ['left', 'right'].includes(value)
        },
        toggleActive: {
            type: Boolean,
            default: true
        },
        to: {
            type: [String, Object],
            default: null
        }
        },
        computed: {
        buttonTag() {
            return this.to ? 'router-link' : 'button';
        },
        variantClass() {
            return `btn-${this.variant}`;
        },
        sizeClass() {
            return `btn-size-${this.size}`;
        }
        },
        data() {
        return {
            isActive: false
        };
        },
        methods: {
        handleClick(event) {
            if (this.toggleActive && !this.to) {
            this.isActive = !this.isActive;
            }
            this.$emit('click', event);
        }
        }
    };
</script>
