<template>
    <modalUI>
        <h2>Поделиться файлом</h2>
        <div class="shared-form" v-if="this.$store.getters.getSelectedFile.accessLink">
            <my-input type="text" disabled :model-value="`http://localhost:8080/share/` + this.$store.getters.getSelectedFile.accessLink"/>
            <button @click="removeSharedLink">Закрыть доступ</button>
        </div>
        <div class="shared-form" v-else>
            <span>Общий доступ к файлу</span>
            <button @click="createSharedLink">Открыть доступ</button>
        </div>

    </modalUI>
</template>

<script>
export default {

    methods: {
        createSharedLink: function () {
            this.$store.dispatch('getAccessLink')
        },
        removeSharedLink: function () {
            this.$store.dispatch('removeAccessLink')
        },
    }

}
</script>

<style lang="less" scoped>

.shared-form {
  width: 100%;
  display: flex;
  flex-direction: column;

  & span {
    padding: 20px;
  }
}

</style>