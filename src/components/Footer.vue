<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="links">
        <a href="#">by Archie | 源码地址</a>
        <a href="https://cnodejs.org">~ CNode 网址</a>
      </div>
      <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
      <p>本站仅供学习参考之用</p>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .footer
    line-height: 50px
    margin-top: 20px
    background: #fff
    padding: 40px
    .footer-container
      font-size: 16px
      width: 1080px
      margin: 0 auto
      a:nth-child(2)
        display: block
        line-height: 30px
      p
        font-size: 20px
        color:#555
        font-weight: 700

</style>
