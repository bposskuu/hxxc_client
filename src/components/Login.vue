<template>
    <my-form>
        <div class="header">Авторизация</div>
        <my-input autofocus type="text" placeholder="Введите E-Mail" v-model="email"/>
        <my-input type="password" placeholder="Введите пароль" v-model="password"/>
        <button @click="this.$store.dispatch('login', {email, password})">Авторизоваться</button>
    </my-form>
</template>

<script>
import MyForm from "@/components/UI/Form.vue";
import isAuthMixin from "@/Mixins/isAuthMixin";

export default {
    name: 'LoginPage',
    components: {MyForm},
    mixins: [isAuthMixin],

    data() {
        return {
            email: '',
            password: ''
        }
    },

    computed: {
        isAuth: function () {
            return this.$store.getters.getIsAuth
        }
    },
    watch: {
        isAuth: function (newValue) {
            if (newValue) {
                this.$router.push({path: '/'})
            }
        }
    }

}
</script>

<style lang="less" scoped>
.header {
    font-size: 30px;
    margin-bottom: 30px;
}

</style>