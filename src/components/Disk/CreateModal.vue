<template>
    <modalUI>
        <h2>Создать папку</h2>
        <my-input type="text" placeholder="Введите название папки" v-model="newDirName" ref="createInput"/>
        <button @click="clickCreate()">Создать</button>
    </modalUI>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
    data() {
        return {
            newDirName: '',
        }
    },

    methods: {
        ...mapMutations(['setModalDisplay']),

        clickCreate: function () {
            this.$store.dispatch('createDir', this.newDirName)
            this.newDirName = ''
            this.setModalDisplay(false)
        },
    },

    computed: {
        ...mapGetters(['getCurrentDir']),
    },

    mounted() {
        this.$refs.createInput.$refs.myinput.focus()
    }
}
</script>

<style lang="scss" scoped>

</style>