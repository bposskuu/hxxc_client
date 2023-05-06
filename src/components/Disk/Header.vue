<template>
    <div class="header">
        <div class="header__left">
            <img src="@/assets/img/back.png" alt="" @click="clickBack">
            <img src="@/assets/img/home.png" alt="" @click="clickHome">
            <div class="search">
                <my-input placeholder="Поиск" :model-value="this.$store.getters.getSearchQuery" @update:model-value="setSearchQuery" />
                <img src="@/assets/img/close.png" alt="" @click="this.setSearchQuery('')">
            </div>
        </div>
        <div class="header__center">
            <h1>{{ this.getCurrentDir.name ? this.getCurrentDir.name : `Файлы` }}</h1>
        </div>
        <div class="header__right">
            <div class="sort">
                <select name="sort" id="" @change="e => this.setSortSelect(e.target.value)">
                    <option value="name">По названию</option>
                    <option value="size">По размеру</option>
                    <option value="date">По дате</option>
                    <option value="type">По типу</option>
                </select>
                <img src="@/assets/img/arrow.png" @click="clickArrow" :class="{sort__rotate180: !this.upArrow}" alt="">
            </div>
            <dropdownUI>
                <template #primary>
                    <img src="@/assets/img/add.png" alt="">
                </template>
                <label @click="() => this.setModalDisplay('CREATE_DIR')">
                    <img src="@/assets/img/add-folder.png" alt="">
                    Создать папку
                </label>
                <label>
                    <my-input @change="fileUploadHandler" multiple type="file"/>
                    <img src="@/assets/img/upload.png" alt="">
                    Загрузить файл
                </label>
            </dropdownUI>
        </div>
    </div>
</template>

<script>
import MyInput from "@/components/UI/Input.vue";
import {mapGetters, mapMutations} from "vuex";

export default {
    name: 'DiskHeader',
    components: {MyInput},

    data() {
        return {
            upArrow: true
        }
    },

    computed: {
        ...mapGetters(['getCurrentDir', 'getDirStack']),

    },

    methods: {
        ...mapMutations(['setSearchQuery', "setCurrentDir", 'setDirStack', 'setModalDisplay', "setSortSelect", 'setSortDirection']),

        clickBack: function () {
            if (this.getDirStack.length !== 0)
            {
                this.$store.dispatch('setPrevDir')
            }
        },
        clickHome: function () {
            this.setCurrentDir({})
            this.setDirStack([])
        },
        fileUploadHandler: function (event) {
            const files = [...event.target.files]
            files.forEach(file => this.$store.dispatch('uploadFile', file))
            event.target.value = ''
        },
        clickArrow: function () {
            this.upArrow = !this.upArrow
            this.setSortDirection(this.upArrow? 1 : -1)
        }
    }
}
</script>

<style lang="less" scoped>

.header {

  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 2%;

  img {
    height: 30px;
    cursor: pointer;
  }

  &__left {
    display: flex;
    align-items: center;
    width: 40%;

    & img {
      margin-right: 5%;
    }
  }
  &__center {
    display: flex;
    justify-content: center;
    width: 20%;
  }
  &__right {
    display: flex;
    justify-content: flex-end;
    width: 40%;

  }



}

.sort {
    margin-right: 30px;

    & img {
        margin-left: 15px;
    }

    &__rotate180 {
        transform: rotate(180deg);
    }

    & select {
        height: 30px;
    }
}

.search {
    margin: 0 auto;

    & input {
        font-size: 20px;
        align-self: flex-end;
    }

    & img {
        height: 15px;
        position: absolute;
        margin-left: -20px;
        margin-top: 2px;
    }
}

</style>