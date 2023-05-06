<template>
    <div class="modal" @click="this.$store.commit('setModalDisplay', null)">
        <div class="content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modalUI',
}
</script>

<style lang="less" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
    font-size: 16px;
}

.content {
  width: 500px;
  background: white;
  padding: 20px;
  border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}

:slotted(input) {
    margin: 30px 0px;
    padding: 5px;
    font-family: Roboto;
    font-size: 18px;
    width: 100%;
}

:slotted(button) {
    background-color: #1D1D1D;
    color: white;
    padding: 8px;
    font-size: 15px;
    border-radius: 20px;
    align-self: flex-end;
}


</style>