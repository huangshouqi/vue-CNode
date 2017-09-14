<template>
  <div class="loading" v-show="loading">
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState({
        loading: state => state.common.loading
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  body

    .loading
      background: #f9f9f9;
      position: absolute
      left: 0
      bottom: 0
      top: 0
      right: 0
      .spinner
        width: 30px
        height: 30px
        position: absolute
        top: 40%
        left: 45%


      .cube1, .cube2
        background-color: #80BD01;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: cubemove 1.8s infinite ease-in-out;
        animation: cubemove 1.8s infinite ease-in-out;

      .cube2 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
      }

      @-webkit-keyframes cubemove
        25%
          -webkit-transform: translateX(60px) rotate(-90deg) scale(0.5)

        50%
          -webkit-transform: translateX(60px) translateY(60px) rotate(-180deg)

        75%
          -webkit-transform: translateX(0px) translateY(60px) rotate(-270deg) scale(0.5)

        100%
          -webkit-transform: rotate(-360deg)

      @keyframes cubemove
        25%
        transform translateX(60px) rotate(-90deg) scale(0.5)
        -webkit-transform translateX(60px) rotate(-90deg) scale(0.5)
        50%
        transform translateX(60px) translateY(60px) rotate(-179deg)
        -webkit-transform translateX(60px) translateY(60px) rotate(-179deg)

        50.1%
        transform translateX(60px) translateY(60px) rotate(-180deg)
        -webkit-transform translateX(60px) translateY(560px) rotate(-180deg)

        75%
        transform translateX(0px) translateY(60px) rotate(-270deg) scale(0.5)
        -webkit-transform translateX(0px) translateY(60px) rotate(-270deg) scale(0.5)
        100%
        transform rotate(-360deg)
        -webkit-transform rotate(-360deg)
</style>
