<template>
  <div class="back-top" @click="backTop" v-show="showButton">
    回到顶部
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showButton: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll', this.hideTopBtn)
      })
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      backTop() {
        var timer = null
        var timer = setInterval(function () {
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var ispeed = Math.floor(-scrollTop / 6);
//          console.log(ispeed)
          if (scrollTop == 0) {
            clearInterval(timer);
          }
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed;
        }, 30)
      },
      hideTopBtn() {
        if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
          this.showButton = true
        }
        else {
          this.showButton = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .back-top
    position: fixed
    width: 24px
    color: gray
    padding: 12px 0 12px 5px
    line-height: 1.8em
    height: 100px
    bottom: 150px
    right: 0
    cursor: pointer
    text-align: center
    z-index: 20
    background-color: #fff
    border-radius: 12px 0 0 12px
    transition: display 2s
</style>
