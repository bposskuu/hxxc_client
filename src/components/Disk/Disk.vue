<template>
    <div class="disk">
        <transition name="fade">
            <FileInfo/>
        </transition>
        <Header/>
        <FileList/>
        <CreateModal v-if="this.getModalDisplay === 'CREATE_DIR'"/>
        <RenameModal v-else-if="this.getModalDisplay === 'RENAME'"/>
        <ShareModal v-else-if="this.getModalDisplay === 'SHARE'"/>
        <DiskUploader v-if="this.getIsVisible"/>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import FileInfo from "@/components/Disk/FileInfo.vue";
import Header from "@/components/Disk/Header.vue";
import FileList from "@/components/Disk/FileList.vue";
import CreateModal from "@/components/Disk/CreateModal.vue";
import RenameModal from "@/components/Disk/RenameModal.vue";
import DiskUploader from "@/components/Disk/DiskUploader.vue";
import ShareModal from "@/components/Disk/ShareModal.vue";


export default {
    name: 'diskPage',
    components: {ShareModal, DiskUploader, RenameModal, CreateModal, FileList, FileInfo, Header},

    computed: {
        ...mapGetters(['getModalDisplay', 'getIsVisible']),
    },


}
</script>

<style lang="less" scoped>

.disk {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1140px;
    border-radius: 8px;
    align-self: center;
    background-color: white;
    padding: 70px 20px 70px 20px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

</style>