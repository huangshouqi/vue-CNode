<template>
    <div class="right-block">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .right-block
    display: block
    vertical-align: top
    width: 260px
    background: #fff
    border-radius: 3px
    margin-top: 15px
    .header
      line-height: 40px
      padding-left: 10px
      height: 40px
      background: #f6f6f6
      color: #444
</style>
