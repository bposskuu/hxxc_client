<template>
    <div class="container" @click="clickContainer">
        <div class="fileList">
            <div
                class="file"
                v-for="file in this.getSearchedList"
                :key="file._id"
                @dblclick="dbClick(file)"
                :class="{selected: file.isActive}"
                @click.stop="clickFile(file)"
            >
                <img class="file__share" src="@/assets/img/share-file.png" alt="" v-if="file.accessLink">
                <File :file="file"></File>
            </div>
        </div>
    </div>
</template>

<script>
import File from "@/components/Disk/File.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    components: {File},

    data() {
        return {
            currentFile: {},
        }
    },

    methods: {
        ...mapMutations(['setCurrentDir', 'setIsActive', 'setSelectedFile', 'pushDirStack']),
        ...mapActions(['getFiles']),

        clickFile: function(file) {
            if (!file.isActive)
            {
                if (this.getSelectedFile) {
                    this.setIsActive(false)
                }
                this.setSelectedFile(file)
                this.setIsActive(true)
            }
        },
        clickContainer: function () {
            if (this.getSelectedFile) {
                this.setIsActive(false)
                this.setSelectedFile(null)
            }
        },
        dbClick: function (file) {
            if (file.type === 'dir') {
                this.pushDirStack(this.currentDir)
                this.setCurrentDir(file)
                this.setSelectedFile(null)
            }
        },
    },

    computed: {
        ...mapGetters(['getCurrentDir', 'getFiles', 'getSelectedFile', 'getSearchedList', 'getSortSelect', 'getSortDirection']),

        currentDir: function () {
            return this.getCurrentDir
        },
        sortSelect: function () {
            return this.getSortSelect
        },
        sortDirection: function () {
            return this.getSortDirection
        },
    },

    watch: {
        currentDir: function () {
            this.$store.dispatch('getFiles')
        },
        sortSelect: function () {
            this.$store.dispatch('getFiles')
        },
        sortDirection: function () {
            this.$store.dispatch('getFiles')
        },
    },

    mounted() {
        this.$store.dispatch('getFiles')
    },
}
</script>

<style lang="less" scoped>

.file {
    width: 100%;
    max-width: 123.5px;
    margin: 7px;
    display: flex;
    cursor: pointer;

    &__share {
        width: 20px;
        position: absolute;
        margin-left: 90px;
        margin-top: 5px;
    }

    &:hover {
        background: rgba(29, 29, 29, 0.1);;
        border-radius: 8px;
        transform: scale(1.05);
    }
}

.selected {
    background: rgba(29, 29, 29, 0.1);;
    border-radius: 8px;

    &:hover {
        background: rgba(29, 29, 29, 0.2);
    }
}

.fileList {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

}

.container {
    display: flex;
    margin-top: 50px;
    width: 100%;
    height: 400px;
}
</style>