<template>
    <div class="navbar">
        <div class="container">
            <router-link to="/"><img src="../assets/img/navbar-logo.png" alt="" class="navbar__logo"/></router-link>
            <div v-if="!isAuth" class="navbar__login"><router-link to="/login">Войти</router-link></div>
            <div v-if="!isAuth" class="navbar__registration"><router-link to="/registration">Регистрация</router-link></div>
            <div v-else class="navbar__authorized">
                <div class="navbar__usedspace">
                    <progress class="navbar__progress" max="100" :value="this.usedSpacePercent" />
                    <p>Осталось {{ this.freeSpace }} из {{ sizeFormat(this.getCurrentUser.diskSpace) }}</p>
                </div>
                <router-link to="/profile">
                    <div class="navbar__user">
                        <div class="navbar__avatar">
                            <img :src="userAvatar ? userAvatarPath : require('@/assets/img/avatar.png')" alt="">
                        </div>
                        <div class="navbar_username">
                            {{ this.getCurrentUser.name }}
                        </div>
                    </div>
                </router-link>
                <div class="navbar__login" @click="_logout">Выйти</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import sizeFormat from "../utils/sizeFormat";
import {API_URL} from "../../config";
export default {
    name: 'NavbarItem',

    methods: {
        API_URL() {
            return API_URL
        },
        sizeFormat,
        ...mapActions({
            logout: 'logout'
        }),

        _logout () {
            this.logout()
            this.$router.push('login')
        }
    },

    computed: {
        ...mapGetters({
            isAuth: 'getIsAuth',
            getCurrentUser: 'getCurrentUser'
        }),

        usedSpacePercent: function () {
            return (this.getCurrentUser.usedSpace / ( this.getCurrentUser.diskSpace / 100 ))
        },
        freeSpace: function () {
            return sizeFormat(this.getCurrentUser.diskSpace - this.getCurrentUser.usedSpace)
        },
        userAvatar: function () {
            return this.$store.getters.getCurrentUser.avatar
        },
        userAvatarPath: function () {
            return API_URL + '/'  + this.userAvatar
        }
    },
}
</script>

<style lang="less" scoped>
.navbar {
    display: flex;
    height: 100px;
    background-color: #1D1D1D;
    justify-content: center;
    color: white;
    font-family: "GetVoIP";

    &__logo {
        height: 75px;

    }

    &__login {
        margin-left: auto;
        margin-right: 20px;
        cursor: pointer;
    }

    &__usedspace {
        text-align: center;
        font-size: 14px;
        width: 100%;
        max-width: 200px;
        font-family: "Roboto";
        font-size: 14px;
        margin-right: 40px;
    }

    &__authorized {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: auto;
    }

    &__progress, progress[value] {
        border: none;
        width: 100%;
        height: 5px;
        display: flex;
        appearance: none;
        -webkit-appearance: none;
        &::-webkit-progress-bar {
            background-color: lighten( #1d1d1d, 35% );
            border-radius: 5px;
        }
        &::-webkit-progress-value {
            background-color: #fff;
            border-radius: 5px;
        }
    }

    &__user {
        margin-right: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;

        & img {
            height: 30px;
        }
    }

    &__avatar {
        border-radius: 50%;
        overflow: hidden;
        width: 30px;
        height: 30px;
        margin-right: 10px;

        & img {
            height: 30px;
            width: 30px;
        }
    }
}

.container {
    display: flex;
    width: 100%;
    max-width: 1140px;
    align-items: center;
}
</style>