<template>
    <div class="currentFile">
        <img class="currentFile__img" :src="this.image" alt="">
        <span>{{ file.name.length > 15 ? file.name.slice(0, 15)+'...' : file.name }}</span>
    </div>
</template>

<script>
export default {
    name: 'fileComponent',
    props: {
        file: Object
    },

    data() {
        return {
            image: null,
            types: [
                'png',
                'pdf',
                'jpg',
                'doc',
                'ppt',
                'zip',
                'xml',
                'xls',
                'txt',
                'sql',
                'mp3',
                'gif',
                'svg',
                'eps',
                'psd',
                'bmp',
                'ai',
                'cdr',
                'avi',
                'js',
                'dll',
                'iso',
                'tif',
                'html',
                'mov',
                'cad',
                '3ds',
                'mpg',
                'midi',
                'aac',
                'wmv',
                'ps',
                'raw',
                'fla',
                'php',
                'css',
                'indd',
                'dmg',
                'dat',
                'flv',

            ]
        }
    },

    mounted() {
        if (this.file.type === 'dir') {
            this.image = require("@/assets/img/folder.png")
        }
        else if (this.types.includes(this.file.type)) {
            this.image = require(`@/assets/img/types/${this.file.type}.png`)
        }
        else {
            this.image = require("@/assets/img/file.png")
        }
    }

}
</script>

<style lang="less" scoped>

.currentFile {
    width: 70%;
    display: block;
    margin: 10px auto;
    text-align: center;
    word-wrap: break-word;

    &__img {
        width: 100%;
        margin-bottom: 10px;
    }

}

</style>