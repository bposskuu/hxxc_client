<template>
    <div class="app" @dragenter.stop.prevent="dragEnterHandler" @dragover.stop.prevent="dragOverHandler">
        <Navbar/>
        <div class="wrap">
            <router-view></router-view>
        </div>
    </div>

    <teleport to="body" v-if="dragEnter">
        <div class="dragndrop" @dragover.stop.prevent @dragleave.stop.prevent="dragLeaveHandler" @drop.stop.prevent="dropHandler">
            <h1>Отпустите чтобы загрузить</h1>
            <div class="dragndrop__container">
            </div>
        </div>
    </teleport>

</template>

<script>



import Navbar from "@/components/Navbar.vue";

export default {
    name: 'App',
    components: {
      Navbar


    },

    data() {
        return {
            dragEnter: false
        }
    },

    methods: {
        dragEnterHandler: function () {
            this.dragEnter = true
            console.log(this.dragEnter)
        },
        dragOverHandler: function () {
            this.dragEnter = true
            console.log(this.dragEnter)
        },
        dragLeaveHandler: function () {
            this.dragEnter = false
            console.log(this.dragEnter)
        },
        dropHandler: function (event) {
            this.dragEnter = false
            const files = [...event.dataTransfer.files]
            files.forEach(file => this.$store.dispatch('uploadFile', file))

        }
    },

    mounted() {
        this.$store.dispatch('auth')
    },

}
</script>

<style lang="less">
@font-face {
    font-family: "GetVoIP";
    src: url("@/assets/fonts/GetVoIP_Grotesque.otf");
}

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #DDDDDD;
    font-family: "Roboto";
    user-select: none;
}

#app {
    width: 100%;
    height: 100vh;
}

a {
    color: white;
    text-decoration: none;
}

.wrap {
    display: flex;
    flex-direction: column;
    margin-top: 150px;
}

button {
    font-family: Roboto;
    border: none;
    cursor: pointer;
}

img {
    vertical-align: top;
}

.dragndrop {
    z-index: 1;
    background: rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 150px;

    &__container {
        margin: 50px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 5px dashed;
    }
}


</style>
