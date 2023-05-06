<template>
    <div class="uploader">
        <div class="uploader__header">
            <div class="uploader__title">Загрузки</div>
            <div class="uploader__close"><img src="@/assets/img/close_white.png" alt="" @click="this.hideUploader"></div>
        </div>
        <div class="uploader__content">
            <UploadFile v-for="file in this.getUploadFiles" :key="file.id" :file="file"/>
        </div>
    </div>
</template>

<script>
import UploadFile from "@/components/Disk/UploadFile.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    components: {UploadFile},

    methods: {
        ...mapActions(['hideUploader']),
    },

    computed: {
        ...mapGetters(['getUploadFiles'])
    }

}
</script>

<style lang="less" scoped>

.uploader {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 300px;
  width: 300px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  background: white;

  border-radius: 8px;


  &__header {
    display: flex;
    justify-content: space-between;
    background: #1D1D1D;
    color: white;
    padding: 15px 20px;
    border-radius: 8px 8px 0 0;
  }

  &__close {
    display: flex;
    align-items: center;

    & img {
      height: 12px;
      cursor: pointer;
    }
  }

    &__content{

        width: 100%;
    }
}

</style>