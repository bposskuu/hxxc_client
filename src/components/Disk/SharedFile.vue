<template>
    <div class="shared-file">
        <div class="shared-file__content" v-if="this.getSharedFile">
            <File :file="this.getSharedFile" />
            <button @click="this.$store.dispatch('downloadFile', this.getSharedFile)">Загрузить</button>
        </div>
        <h1 v-else>Файл не найден!</h1>
    </div>
</template>

<script>
import File from "@/components/Disk/File.vue";
import {mapGetters} from "vuex";

export default {
    components: {File},

    computed: {
        ...mapGetters(['getSharedFile'])
    },

    mounted() {
        this.$store.dispatch('getFileByAccessLink', this.$route.params.url)
    }
}
</script>

<style lang="less" scoped>
.shared-file {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-self: center;
    padding: 50px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

    &__content {
        width: 70%;
        display: flex;
        justify-content: center;
        flex-direction: column;

        & button {
            background-color: #1D1D1D;
            color: white;
            padding: 12px;
            margin-top: 40px;
            font-size: 16px;
            border-radius: 20px;
            width: 150px;
            align-self: center;
        }
    }
}
</style>