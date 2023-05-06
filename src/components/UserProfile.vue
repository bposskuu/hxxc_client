<template>
    <my-form>
        <div class="header">Настойка профиля</div>
        <div class="user-avatar" >
            <label>
                <my-input type="file" @change="uploadAvatar" />
                <img :src="avatar ? avatarPath : require('@/assets/img/avatar.png')" alt="">
            </label>
            <div class="user-avatar__button" @click.stop="removeAvatar">
                Удалить
            </div>
        </div>

        <my-input v-model="this.$store.getters.getCurrentUser.name" disabled />
        <my-input :model-value="this.$store.getters.getCurrentUser.email" disabled />
    </my-form>
</template>

<script>

import isAuthMixin from "@/Mixins/isAuthMixin";
import MyInput from "@/components/UI/Input.vue";
import {API_URL} from "../../config";

export default {
    components: {MyInput},
    mixins: [isAuthMixin],

    methods: {
        API_URL() {
            return API_URL
        },
        uploadAvatar: function (event) {
            this.$store.dispatch('uploadAvatar', event.target.files[0])
        },
        removeAvatar: function () {
            this.$store.dispatch('removeAvatar')
        },
    },

    computed: {
        avatar: function () {
            return this.$store.getters.getCurrentUser.avatar
        },
        avatarPath: function () {
            return API_URL + '/' + this.avatar
        }
    },

}
</script>

<style lang="less" scoped>
.user-avatar {
  height: 150px;
  width: 150px;
  border-radius: 50%;
    overflow: hidden;
  margin-bottom: 50px;

    & img {
        height: 150px;
        width: 150px;
        cursor: pointer;
    }

    &__button {
        display: none;
    }

    &:hover &__button {
        display: flex;
        width: 100%;
        background: rgba(29,29,29,0.6);
        margin-top: -50px;
        padding-top: 10px;
        color: white;
        position: relative;
        justify-content: center;
        height: 50px;
        cursor: pointer;
    }
 }
</style>