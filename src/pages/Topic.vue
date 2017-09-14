<template>
  <div class="topic">

    <div class="topic-left">
        <!--标题-->
        <div class="topic-header">
          <h2 class="topic-title">{{detail.title}}</h2>
          <p class="topic-info">
            <span>发布于{{detail.create_at | getTime }}</span>
            <!--<span>作者{{detail.author.loginname}}</span>-->
            <span>{{detail.visit_count}}次浏览</span>
            <span>来自{{detail.tab | toString}}</span>
          </p>
        </div>
        <!--文章内容-->
        <div class="topic-article" v-html="detail.content"></div>
      <!--文章评论-->
      <left-block class="topic-reply">
          <p slot="header" v-if="detail.replies.length" class="reply-count">{{detail.replies.length}} 回复</p>
          <p slot="header" class="reply-count" v-else-if="!detail.replies.length">暂无回复</p>
          <ul>
            <li v-for="(item,index) in detail.replies">
              <div class="reply-info">
                <div class="reply-author">
                  <router-link :to="{path:'/user/'+item.author.loginname}">
                    <img :src="item.author.avatar_url" alt="">
                  </router-link>
                  <router-link :to="{path:'/user/'+item.author.loginname}">
                    {{item.author.loginname}}
                  </router-link>
                  <span>{{index+1}}楼•{{item.create_at | getTime}}</span>
                </div>
                <div class="reply-up">{{item.ups.length}}</div>
              </div>
              <p class="reply-content" v-html="item.content"></p>

            </li>
          </ul>
      </left-block>
    </div>

    <!--侧栏-->
    <div class="topic-sidebar">

      <right-block>
        <p slot="header">作者</p>
        <div class="avatar">
          <router-link :to="{path:'/user/'+detail.author.loginname}">
            <img :src="detail.author.avatar_url" alt="">
            <span>{{detail.author.loginname}}</span>
          </router-link>
        </div>
        <p class="score">积分：{{authorInfo.score}}</p>
      </right-block>

      <right-block class="item">
        <p slot="header">作者的其他话题</p>
        <p v-show="!authorInfo.recent_topics">暂无数据</p>
        <router-link
          v-for="(item,index) in recentTopics"
          :key="index"
          :to="{path:'/topic/'+item.id}">
          {{item.title}}
        </router-link>
      </right-block>

      <right-block class="no-reply">
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
  import RightBlock from '../components/RigthBlock'
  import LeftBlock from '../components/LeftBlock'
  import {mapGetters,mapState} from 'vuex'

  export default {
    data() {
      return {
      }
    },
    components: {RightBlock, LeftBlock},
    created() {
      this.$store.dispatch('getTopicDetail', this.$route.params.id)
      this.$store.dispatch('getAuthorInfo', this.$store.state.detail.author.loginname)
    },
    updated(){
      this.$store.commit('TOGGLE_LOADING', false)
    },
    watch: {
      '$route'(to, from) {
        this.$store.dispatch('getTopicDetail', this.$route.params.id)
        this.$store.dispatch('getAuthorInfo', this.$store.state.detail.author.loginname)
      }
    },
    computed: {
      filteredItems(){
        return this.noReplyList.slice(0,5)
      },
      recentTopics(){
        return this.authorInfo.recent_topics.slice(0,5)
      },
      ...mapGetters({
        detail: 'getTopicDetail',
        loading: 'loading',
        authorInfo: 'getAuthorInfo'
      }),
      ...mapState({
          noReplyList: state => state.topics.noReplyList
        }
      )
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../stylus/mixin.styl'
  .topic
    border-radius: 5px
    width: 1080px
    margin: 18px auto 0
    overflow: hidden

    .topic-left
      width: 800px
      display: inline-block
      .topic-header
        padding: 20px
        border-bottom: 1px solid #eee
        background: #fff
        .topic-info
          padding: 20px 5px 0
          font-size: 12px
          color: #838383
          letter-spacing: 2px
          span:before
            content: "•"
            margin-right: 2px
      .topic-article
        width: 800px
        padding: 0px 40px
        box-sizing: border-box
        display: inline-block
        background: #fff
        pre.prettyprint
          line-height: 1.8em
          overflow: auto;
          padding: 0 15px;
          margin: 20px -10px;
          border-width: 1px 0;
          background: #f7f7f7;
        li
          list-style disc
          margin: 20px 0px 20px 30px
        a
          color: #08c
        p
          white-space: pre-wrap
          margin: 1em 0
          display: block;
          -webkit-margin-before: 1em
          -webkit-margin-after: 1em
          -webkit-margin-start: 0px
          -webkit-margin-end: 0px
          font-size: 15px
          line-height: 1.7em
          overflow: auto
        h1, h2, h3, h4, h5, h6
          margin: 30px 0 25px
          padding-bottom: 10px
          border-bottom: 1px solid #eee
          font-family: inherit
          font-weight: 700
          font-size: 24.5px
        h1
          font-size: 2em
        img
          width: 90%
          display: block
          margin: 10px auto 20px

      .topic-reply
        li
          padding: 15px
          background: #fff
          border-top: 1px solid #f0f0f0
        img
          max-width:90%
        .reply-count
          color: #444
        .reply-info
          .reply-author
            display: inline-block
            img
              vertical-align:middle;
              width: 30px
              height: 30px
              border-radius: 3px
              margin-right: 5px
            a
              color: #555
              font-size: 12px;
              font-weight: 700
            span
              vertical-align: top
              font-size: 12px
              color: #08c
              vertical-align: middle
              &:hover
                cursor: pointer
                text-decoration: underline
          .reply-up
            float: right
        .reply-content
          padding: 15px 30px
          line-height: 1.7em
          overflow: auto
          .markdown-text
            p
              font-size: 15px;
              font-weight: 0
              a
                color: #08c
                &:hover
                  cursor: pointer
                  text-decoration: underline
    .topic-sidebar
      display: inline-block
      width: 260px
      margin-left: 15px
      margin-top: -15px
      vertical-align: top
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
      .item
        margin-top: 15px
        p:nth-child(2)
          padding: 20px
          text-align: center
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
