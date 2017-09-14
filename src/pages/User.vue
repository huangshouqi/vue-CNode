<template>
  <div class="user">
    <div class="user-about">
      <!--个人信息-->
      <left-block class="user-about-header">
        <p slot="header">
          <router-link to="/">主页</router-link>
          /
        </p>
        <div class="user-header-info">
          <div class="loginname">
            <img :src="authorInfo.avatar_url" alt="">
            <span>{{authorInfo.loginname}}</span>
          </div>
          <p class="score">{{authorInfo.score}} 积分</p>
          <span  class="github">Github</span>
          <a :href="'https://github.com/'+authorInfo.githubUsername"
             target="_blank">@{{authorInfo.githubUsername}}</a>
          <p>注册于：{{authorInfo.create_at | getTime}}</p>
        </div>
      </left-block>
      <!--最近创建的话题-->
      <left-block class="user-about-item">
        <p slot="header">最近创建的话题</p>
        <ul>
          <li v-for="item in authorInfo.recent_topics">
            <img :src="item.author.avatar_url" alt="" class="avatar">
            <router-link :to="{path:'/topic/'+item.id}" class="title" :title="item.title">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </left-block>
      <!--最近参与的话题-->
      <left-block class="user-about-item">
        <p slot="header">最近参与的话题</p>
        <ul>
          <li v-for="item in userInfo.recent_replies">
            <img :src="item.author.avatar_url" alt="" class="avatar">
            <router-link :to="{path:'/topic/'+item.id}" class="title" :title="item.title">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </left-block>
    </div>

    <div class="user-sidebar">
      <right-block>
        <p slot="header">作者</p>
        <div class="avatar">
          <img :src="authorInfo.avatar_url" alt="">
          <span>{{authorInfo.loginname}}</span>
        </div>
        <p class="score">积分：{{authorInfo.score}}</p>
      </right-block>

      <right-block class="skill">
        <p slot="header">技术栈</p>
        <ul>
          <li>vue2.0</li>
          <li>vue-router</li>
          <li>vuex</li>
          <li>axios</li>
          <li>stylus</li>
        </ul>
      </right-block>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import LeftBlock from '../components/LeftBlock'
  import RightBlock from '../components/RigthBlock'
  import {mapGetters} from 'vuex'

  export default {
    components: {LeftBlock, RightBlock},
    data() {
      return {
        userInfo: {}
      }
    },
    created() {
      this.$store.dispatch('getAuthorInfo',this.$route.params.name)
    },
    computed:{
      ...mapGetters({
        authorInfo: 'getAuthorInfo'
      })
    },
    watch:{
      '$route'(to,from){
        this.$store.dispatch('getAuthorInfo',this.$route.params.name)
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .user
    border-radius: 5px
    width: 1080px
    margin: 18px auto 0
    overflow: hidden
    .user-about
      display: inline-block
      width: 800px
      .user-about-header
        background: #fff
        .user-header-info
          padding: 20px 40px
          .loginname
            img
              width: 40px
              height: 40px
              vertical-align: middle
            span
              margin-left: 10px
              color: #778087
          .score
            margin: 15px 0 10px
          .github
            margin: 5px 0
          p:last-child
            margin: 20px 0 0
            color: #999

      .user-about-item
        background: #fff
        li
          padding: 10px
          border-bottom: 1px solid #eee
          .avatar
            vertical-align middle
            width: 30px
            height: 30px
            border-radius: 3px
            display: inline-block
          .title
            color: #08c
            font-size: 16px
            vertical-align: middle
            &:hover
              color: #333
              text-decoration: underline


    .user-sidebar
      display: inline-block
      vertical-align: top
      margin-left: 5px
      .avatar
        img
          width: 48px
          height: 48px
          padding: 10px
          vertical-align: middle
        span
          margin-top: 28px
          font-size: 16px
          color: #778087
      .score
        padding: 12px
      .skill
        ul
          padding: 10px 15px
          font-size: 16px
          color: #777
          li
            padding: 10px
            &:before
              content: "•"
              margin-right: 10px

</style>
