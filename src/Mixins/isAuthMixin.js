export default {
    computed: {
        isAuth: function () {
            return this.$store.getters.getIsAuth
        }
    },

    watch: {
        isAuth: function () {
            this.$router.push({path: '/'})
        }
    },
}