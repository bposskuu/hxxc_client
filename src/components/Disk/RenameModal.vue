<template>
    <modalUI>
        <h2>Переименовать</h2>
        <my-input type="text" placeholder="Введите новое название"  v-model="changedName" ref="renameInput" />
        <button @click="clickRename">Сохранить</button>
    </modalUI>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {

    data() {
        return {
            changedName: ''
        }
    },

    methods: {
        ...mapMutations(['setModalDisplay', 'setSelectedFile', 'setIsActive']),

        clickRename: function () {
            if (this.changedName !== this.getSelectedFile.name) {
                this.$store.dispatch('renameFile', this.changedName)
            }
            this.setModalDisplay(false)

        }
    },

    computed: {
        ...mapGetters(['getModalDisplay', 'getSelectedFile']),
    },

    mounted() {
        this.changedName = this.getSelectedFile.name
        this.$refs.renameInput.$refs.myinput.select()
    }
}
</script>

<style lang="scss" scoped>

</style>