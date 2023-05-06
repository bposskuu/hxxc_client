<template>
    <div class="dropdown">
        <slot name="primary"></slot>
        <div class="dropdown__content" :style="left ?  {'left': '-130px'} : {}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dropdownUI',

    props: {
        left: {
            type: Boolean,
            default: true
        }
    }

}
</script>

<style lang="less" scoped>

.dropdown {
  position: relative;
  display: inline-block;

  &__content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
      width: max-content;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    color: black;
      border-radius: 8px;
      flex-direction: column;

  }
  &:hover .dropdown__content {
    display: flex;
  }
}

:slotted(label) {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;

    & img {
        margin-right: 10px;
    }

    &:hover {
        background-color: #ddd;
    }
}

:slotted(p) {
    padding: 2px 16px;
}

</style>