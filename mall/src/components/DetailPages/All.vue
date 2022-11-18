<template>
  <div class="all">
    <div class="person">
      <div class="head">
        <div class="left">
          <img src="../../../public/images/DetailPages/a46.png"
               alt="">
        </div>
        <div class="right">
          <h2>t**6</h2>
          <p>5天前 镀玫瑰金色链子</p>
        </div>
      </div>
      <p class="cha">外观设计:不错</p>
      <p>回复:感谢亲亲的喜欢，想要更瞩目吸晴可以和下方蓝色链接商品叠搭佩戴哦，更能凸显您的迷人气质哦~选购时有任何疑问可以随时联系在线客服哦，我们将竭诚为您服务，期待您的再次光顾哟。 </p>
    </div>
    <div class="person">
      <div class="head">
        <div class="left">
          <img src="../../../public/images/DetailPages/a46.png"
               alt="">
        </div>
        <div class="right">
          <h2>林**5</h2>
          <p>2个月前 镀玫瑰金色链子</p>
        </div>
      </div>
      <p class="cha">此用户没有填写评价</p>
      <div class="bg">
        <span>95天后追评</span>
        <span>正品，漂亮</span>
        <p>回复:感谢亲亲的喜欢，想要更瞩目吸晴可以和下方蓝色链接商品叠搭佩戴哦，更能凸显您的迷人气质哦~选购时有任何疑问可以随时联系在线客服哦，我们将竭诚为您服务，期待您的再次光顾哟。 </p>
      </div>
    </div>
    <div class="person">
      <div class="head">
        <div class="left">
          <img src="../../../public/images/DetailPages/a47.jpg"
               alt="">
        </div>
        <div class="right">
          <h2>f**5</h2>
          <p>2个月前 镀玫瑰金色链子</p>
        </div>
      </div>
      <p class="cha">材质很好,质量也不错,到货也很快</p>
      <p>回复:感谢亲亲的喜欢，想要更瞩目吸晴可以和下方蓝色链接商品叠搭佩戴哦，更能凸显您的迷人气质哦~选购时有任何疑问可以随时联系在线客服哦，我们将竭诚为您服务，期待您的再次光顾哟。 </p>
    </div>
    <div class="person">
      <div class="head">
        <div class="left">
          <img src="../../../public/images/DetailPages/a46.png"
               alt="">
        </div>
        <div class="right">
          <h2>背**独</h2>
          <p>3个月前 镀玫瑰金色链子</p>
        </div>
      </div>
      <p class="cha">此用户没有填写评价</p>
      <div class="bg">
        <span>0天后追评</span>
        <span>喜欢💕</span>
        <div>
          <img src="../../../public/images/DetailPages/a50.webp"
               alt="">
        </div>
        <p>回复:感谢亲亲的喜欢，想要更瞩目吸晴可以和下方蓝色链接商品叠搭佩戴哦，更能凸显您的迷人气质哦~选购时有任何疑问可以随时联系在线客服哦，我们将竭诚为您服务，期待您的再次光顾哟。 </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'All',
}
</script>

<style lang="less" scoped>
.all {
  width: 100%;
  .person {
    width: 100%;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 18px;
    p {
      color: #7a7a7a;
      font-size: 13px;
    }
    .head {
      width: 100%;
      display: flex;
      align-items: center;
      .left {
        img {
          width: 36px;
          height: 36px;
          border-radius: 18px;
        }
      }
      .right {
        margin-left: 10px;
        h2 {
          margin-block-start: 0em;
          margin-block-end: 0em;
          font-size: 17px;
          color: #000;
          line-height: 22px;
        }
        p {
          color: #7a7a7a;
          font-size: 14px;
          margin-block-start: 0em;
          margin-block-end: 0em;
          line-height: 17px;
        }
      }
    }
    .cha {
      font-size: 16px;
      color: #000;
    }
    .bg {
      background-color: rgba(0, 0, 0, 0.02);
      border-radius: 20px;

      span {
        display: inline-block;
        padding: 15px 10px;
      }
      span:nth-child(1) {
        color: #ff5000;
        margin-left: 5px;
      }

      img {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        padding: 5px 10px;
      }
      p {
        padding: 0 10px 15px;
      }
    }
  }
}
</style>