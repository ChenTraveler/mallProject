<template>
  <div class="header">
    <div class="left">
      <div class="le">
        <div class="l">
          <img src="../../../public/images/DetailPages/a41.webp"
               alt="">
        </div>
        <div class="r">
          <h2>施华洛世奇官方旗舰店</h2>
          <img src="../../../public/images/DetailPages/a43.png"
               alt="">
        </div>
      </div>
      <div class="center">
        <router-link to="/">
          <p>宝贝描述</p>
          <p>4.8</p>
        </router-link>
        <router-link to="/">
          <p>卖家服务</p>
          <p>4.8</p>
        </router-link>
        <router-link to="/">
          <p>物流服务</p>
          <p>4.8</p>
        </router-link>
      </div>
    </div>
    <div class="right">
      <router-link to="/">
        <img src="../../../public/images/DetailPages/a44.png"
             alt="">
        <p>联系客服</p>
      </router-link>
      <router-link to="/">
        <img src="../../../public/images/DetailPages/a45.png"
             alt="">
        <p>进入店铺</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="less" scoped>
.header {
  width: 1192px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 40px;
  margin-bottom: 15px;
  .left {
    display: flex;
    align-items: center;
    margin-left: 20px;
    .le {
      display: flex;
      align-items: center;
      .l {
        img {
          width: 56px;
          height: 56px;
        }
      }
      .r {
        margin-left: 15px;
        h2 {
          font-size: 18px;
          margin-block-start: 0em;
          margin-block-end: 0em;
        }
        img {
          padding-top: 2px;
          width: 37px;
          height: 16px;
        }
      }
    }
    .center {
      display: flex;
      align-content: center;
      margin-left: 50px;
      a {
        text-decoration: none;
        color: #000;
        padding: 0 20px;
        p {
          margin-block-start: 0em;
          margin-block-end: 0em;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    margin-right: 10px;
    a {
      width: 100px;
      height: 30px;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      border: 1px solid #eee;
      border-radius: 15px;
      text-align: center;
      color: #000;
      margin: 0 10px;
      img {
        width: 13px;
        height: 13px;
        margin-right: 2px;
      }
    }
  }
}
</style>