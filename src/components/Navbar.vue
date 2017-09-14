<template>
  <div class="navbar">
    <div class="navbar-container">
      <!--导航栏左侧-->
      <div class="navbar-left">
        <router-link to="/?tab=all">
          <img class="logo" src="../assets/logo.png" alt="">
        </router-link>
        <div class="search">
          <input type="text">
        </div>
      </div>
      <!--导航栏右侧-->
      <div class="navbar-right">
        <nav>首页</nav>
        <nav>新手入门</nav>
        <nav>API</nav>
        <nav>关于</nav>
        <nav>注册</nav>
        <nav>登录</nav>
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .navbar
    background: #444
    color: #ccc
    height: 50px
    .navbar-container
      max-width: 1080px
      margin: 0 auto
      .navbar-left
        float: left
        .logo
          width: 35px
          height: 35px
          margin-top: 10px
        .search
          margin-left: 40px
          float: right
          line-height: 50px
          input
            height: 26px
            width: 200px
            border-radius: 15px
            outline: none
            border: none
            background: #aaa
            transition: background 500ms
            &:hover
              background: #fff
      .navbar-right
        float: right
        nav
          float: left
          line-height: 50px
          margin-right: 20px
          cursor: pointer
          &:hover
            color: #fff
</style>
