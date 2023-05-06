<template>
    <div class="fileInfo" v-if="this.getSelectedFile">
        <div class="fileInfo__left">
            <dropdownUI :left="false">
                <template #primary>
                    <img class="btnicon infoicon" src="@/assets/img/info.png" alt="" />
                </template>
                <div class="info">
                    <p>Название: {{ this.getSelectedFile.name }}</p>
                    <p>Формат: {{ this.getSelectedFile.type === 'dir' ? 'Папка' : this.getSelectedFile.type }}</p>
                    <p v-if="this.getSelectedFile.type !== 'dir'">Размер: {{ sizeFormat(this.getSelectedFile.size) }}</p>
                    <p>Дата создания: {{ this.getSelectedFile.date.slice(0, 10) }}</p>
                </div>
            </dropdownUI>
            {{ this.getSelectedFile.name }}
            <button @click.stop="clickDownload">
                <img class="btnicon" src="@/assets/img/download.png" alt="" />
                Скачать
            </button>
            <button @click.stop="clickShare">
                <img class="btnicon" src="@/assets/img/share.png" alt="" />
                Поделиться
            </button>
        </div>
        <div class="fileInfo__right">
            <button @click="() => { this.$store.commit('setModalDisplay', 'RENAME') }">
                <img class="btnicon" src="@/assets/img/rename.png" alt="" />
                Переименовать
            </button>
            <button @click="clickRemove">
                <img class="btnicon" src="@/assets/img/delete.png" alt="" />
                Удалить
            </button>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import sizeFormat from "../../utils/sizeFormat";

export default {
    computed: {
        ...mapGetters(["getSelectedFile"])
    },

    methods: {
        sizeFormat,
        ...mapMutations(['setSelectedFile']),

        clickRemove: function () {
            this.$store.dispatch('removeFile', this.getSelectedFile._id)
            this.setSelectedFile(null)
        },
        clickDownload: function () {
            this.$store.dispatch('downloadFile', this.getSelectedFile)
        },
        clickShare: function () {
            this.$store.commit('setModalDisplay', 'SHARE')
        }
    }
}
</script>

<style lang="less" scoped>

.fileInfo {
  position: absolute;
  width: 100%;
  max-width: 1140px;
  margin-top: -70px;
  border-radius: 8px 8px 0 0;
  background: #1d1d1d;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__left {
    display: inline-flex;
    align-items: center;
    & button {
      background: #595959;
      color: white;
      padding: 6px;
      margin-left: 20px;
      border-radius: 8px;
        display: inline-flex;
        align-items: center;
    }
  }

  &__right {
    display: flex;
    & button {
      background: transparent;
      margin-right: 20px;
      color: white;
      font-size: 16px;
      display: inline-flex;
      align-items: center;
    }
  }
}

.btnicon {
    height: 20px;
    margin-right: 5px;
}

.infoicon {
    margin: 0 20px 0 10px;
}

.info {
  padding: 20px 5px;
}

</style>