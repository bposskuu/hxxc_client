<template>
    <input :value="modelValue" @input="updateInput" ref="myinput">
</template>

<script>
export default {
    name: 'my-input',

    props: {
        modelValue: [String]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    },

}
</script>

<style lang="less" scoped>
input[type=file] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    display: block;
    width: 0;
    height: 0;
}

input {
    border: none;
    border-bottom: #1D1D1D 1px solid;
    background-color: transparent;
    outline: none;
}
</style>