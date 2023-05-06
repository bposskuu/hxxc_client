<template>
    <my-form>
        <div class="header">Регистрация</div>
        <my-input autofocus type="text" placeholder="Введите имя" v-model="name" />
        <my-input type="text" placeholder="Введите E-Mail" v-model="email"/>
        <my-input type="password" placeholder="Введите пароль" v-model="password"/>
        <button @click="() => this.$store.dispatch('registration', {name, email, password})">Зарегистрироваться</button>
    </my-form>>
</template>

<script>

import MyForm from "@/components/UI/Form.vue";
import isAuthMixin from "@/Mixins/isAuthMixin";

export default {
    name: 'RegistrationItem',
    components: {MyForm},
    mixins: [isAuthMixin],

    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    }

}
</script>

<style lang="less" scoped>



</style>