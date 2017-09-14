<template>
  <div class="home">
    <!--左侧主题列表-->
    <div class="home-list">
      <left-block>
        <!--导航栏-->
        <ul class="tab-content" slot="header">
          <li
            class="tab-item"
            v-for="(item,index) in category"
            @click="toggleTopic(index)"
          >
            <router-link :to="{path:'/',query: {tab: item.value}}" :class="{selected: index == current}">{{item.label}}
            </router-link>
          </li>
        </ul>

        <!--内容-->
        <ul>
          <li class="list-item" v-for="item in topicsList">
            <div class="topic-info-wrapper">
              <!--作者头像、点击跳转到作者信息页-->
              <router-link :to="{path:'/user/'+item.author.loginname}">
                <img :src="item.author.avatar_url" alt="">
              </router-link>
              <!--回复数、浏览数-->
              <span class="count">
              <span class="replies">{{item.reply_count}}/</span><span class="visit">{{item.visit_count}}</span>
          </span>

              <!--置顶-->
              <span class="top" v-if="item.top">置顶</span>
              <!--精华-->
              <span class="top" v-else-if="item.good&&tab">精华</span>
              <!--类型-->
              <span class="tab" v-if="tab" v-show="!item.top&&!item.good">{{ item.tab | toString }}</span>

              <!--跳转到文章详情页-->
              <router-link :to="{path:'/topic/'+item.id}" class="title" :title="item.title">
                {{item.title}}
              </router-link>

            </div>
            <!--最后回复-->
            <!--<div class="last-reply-wrapper">-->
            <!--<div class="last-reply">-->
            <!--<router-link :to="{path:'/user/'+item.last_reply_author.author.loginname}" class="last-reply-avatar">-->
            <!--<img :src="item.last_reply_author.author.avatar_url" alt="" width="30" height="30">-->
            <!--</router-link>-->

            <!--&lt;!&ndash;最后回复时间&ndash;&gt;-->
            <!--<router-link :to="{path:'/detail/'+item.id}" class="last-reply-time">-->
            <!--{{item.last_reply_at | getTime}}-->
            <!--</router-link>-->
            <!--</div>-->
            <!--</div>-->

          </li>
        </ul>
        <!--分页按钮-->
        <ul class="page-btn">
          <li v-for="item in 6">{{item}}</li>
        </ul>
      </left-block>
    </div>


    <!--右侧边栏-->
    <div class="home-sidebar">

      <div class="login-wrapper">
        <p>CNode：Node.js专业中文社区</p>
        <p>您可以 <span>登录</span> 或 <span>注册</span> , 也可以</p>
        <button>通过github登录</button>
      </div>

      <!--无人回复的话题-->
      <right-block class="no-reply">
        <!--使用block组件中具名slot设置头部-->
        <p slot="header">无人回复的话题</p>
        <ul>
          <!--用computed筛选前五条数据-->
          <li v-for="item in filteredItems">
            <router-link :to="{path:'/topic/'+item.id}" class="title" :title="item.title">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </right-block>

      <!--酱油区-->
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

      <right-block class="skill">
        <p slot="header">待实现功能</p>
        <ul>
          <li>搜索</li>
          <li>分页</li>
          <li>登录</li>
        </ul>
      </right-block>

    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import LeftBlock from '../components/LeftBlock'
  import RightBlock from '../components/RigthBlock'
  import {mapGetters, mapState} from 'vuex'

  export default {
    data() {
      return {
        topics: [],
        top: '置顶',
        tab: true,
        last_reply_author: [],
        current: 0,
        category: [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '精华',
            value: 'good'
          },
          {
            label: '分享',
            value: 'share'
          },
          {
            label: '问答',
            value: 'ask'
          },
          {
            label: '招聘',
            value: 'job'
          }
        ]
      }
    },
    components: {LeftBlock, RightBlock},
    created() {
      if (!this.$route.query.tab) {
        this.$store.dispatch('getTopicsList', 'all')
      }
      this.$store.dispatch('getTopicsList', this.$route.query.tab)
      this.getLastReplyAuthor()
    },
    methods: {
      toggleTopic(index) {
        this.current = index
      },
      getLastReplyAuthor() {
        this.$store.state.topics.topicsList.forEach(item => {
          api.TopicDetail(item.id)
            .then(res => {
              console.log(res)
              let replies = res.data.replies
              let last_reply = replies[replies.length - 1]
              console.log(last_reply)
            })
        })
      }
    },
    watch: {
      '$route'(to, from) {
        this.$store.dispatch('getTopicsList', this.$route.query.tab)
        // 改变分类tab显示状态
        if (this.$route.query.tab !== 'all') {
          this.tab = false
        } else {
          this.tab = true
        }
      }
    },
    computed: {
      filteredItems() {
        return this.noReplyList.slice(0, 5)
      },
      ...mapGetters({
        topicsList: 'getTopicsList',
        loading: 'loading',
      }),
      ...mapState({
          noReplyList: state => state.topics.noReplyList,
        }
      )
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../stylus/mixin.styl'
  .home
    border-radius: 5px
    width: 1080px
    overflow: hidden
    margin: 0 auto
    .tab-item
      display: inline-block
      margin: 0 10px
      a
        line-height: 40px
        color: #80bd01
        &:hover
          color: #003
      .selected
        background-color: #80bd01
        color: #fff
        padding: 3px 4px
        border-radius: 3px
        &:hover
          color: #fff

    .home-list
      display: inline-block
      .list-item
        padding: 2px 10px
        background: #fff
        border-bottom: 1px solid #f0f0f0
        &:hover
          background: #f6f6f6
        .topic-info-wrapper
          display: inline-block
          img
            vertical-align middle
            width: 30px
            height: 30px
            border-radius: 3px
            display: inline-block
          .count
            line-height: 45px
            display: inline-block
            width: 70px
            text-align: center
            .replies
              color: #9e78c0
            .visit
              font-size: 10px
              color: #b4b4b4
          .top, .tab
            padding: 2px 4px
            font-size: 12px
            border-radius: 4px
            margin-right: 5px
          .top
            background: #80bd01
            color: #fff
          .tab
            background-color: #e5e5e5
            color: #999
          .title
            no-wrap()
            max-width: 500px
            vertical-align: -2px
            display: inline-block
            font-size: 16px
            color: #333
            &:hover
              text-decoration: underline
        .last-reply-wrapper
          float: right
          .last-reply
            display: inline-block
            line-height: 50px
            font-size: 12px
            .last-reply-avatar
              display: inline-block
              img
                vertical-align: middle
                width: 18px
                height: 18px
            .last-reply-time
              width: 70px
              text-align: right
              display: inline-block
    .page-btn
      padding: 10px
      margin: 10px
      li
        float: left;
        padding: 4px 12px;
        line-height: 20px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-left-width: 0;
    .home-sidebar
      right-container()
      .login-wrapper
        margin-top: 15px
        display: block
        padding: 10px
        background: #fff
        border-radius: 3px
        p
          display: block
          -webkit-margin-before: 1em
          -webkit-margin-after: 1em
          -webkit-margin-start: 0px
          -webkit-margin-end: 0px
          margin: 0 0 10px
          &:first-child
            margin-bottom: 20px
            span
              color: #778087
        button
          display: inline-block;
          padding: 3px 10px;
          border: none;
          margin: 0;
          font-size: 14px;
          transition: all .2s ease-in-out;
          cursor: pointer;
          letter-spacing: 2px;
          box-shadow: none;
          border-radius: 3px;
          line-height: 2em;
          vertical-align: middle;
          color: #fff;
          background-color: #5bc0de;
          &:hover
            background: #76a6b5
      .no-reply
        a
          topicList()
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
