<template>
    <div class="upload-file">
        <div class="upload-file__header">
            {{ file.name.length > 15 ? file.name.slice(0, 15)+'...' : file.name }}
        </div>
        <progress class="upload-file__progress" max="100" :value="file.progress" />
    </div>
</template>

<script>
export default {

    props: {
        file: Object
    }

}
</script>

<style lang="less" scoped>

.upload-file {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    &__header {
        font-size: 12px;
    }

    &:hover {
        background: rgba(29,29,29,0.1);
        border-radius: 8px;
    }

    &__progress {
        width: 50%;
        background: lighten( #1d1d1d, 35% );
        height: 5px;
        border-radius: 8px;
    }

    &__upload-bar {
        width: 35%;
        background: #1D1D1D;
    }

    &__progress, progress[value] {
        border: none;
        width: 50%;
        height: 5px;
        display: flex;
        appearance: none;
        -webkit-appearance: none;
        &::-webkit-progress-bar {
            background-color: lighten( #1d1d1d, 35% );
            border-radius: 8px;
        }
        &::-webkit-progress-value {
            background-color: #1D1D1D;
            border-radius: 8px;
        }
    }
}

</style>