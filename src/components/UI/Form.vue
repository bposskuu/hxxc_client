<template>
    <div class="my-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'my-form'
}
</script>

<style lang="less" scoped>
  .my-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    border: 1px transparent solid;
    border-radius: 8px;
    align-self: center;
    background-color: white;
    padding: 70px 0px;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  :slotted(button) {
      background-color: #1D1D1D;
      color: white;
      padding: 12px;
      margin-top: 40px;
      font-size: 18px;
      border-radius: 20px;
  }

  :slotted(input) {
      margin: 10px 0px;
      padding: 5px;
      font-family: Roboto;
      font-size: 18px;
      width: 50%;
  }

  :slotted(.header) {
      font-size: 30px;
      margin-bottom: 30px;
  }
</style>