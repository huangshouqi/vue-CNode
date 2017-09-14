<template>
  <div class="left-block">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .left-block
    width: 800px
    display: inline-block
    margin-top: 15px
    background: #fff
    .header
      height: 40px
      background: #f6f6f6
      color: #80BD01
      padding-left: 15px
      line-height: 40px
</style>
