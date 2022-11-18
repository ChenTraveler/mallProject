<template>
  <div class="headers">
    <div class="left">
      <a href="#">
        <img src="../../../public/images/indent/a1.png"
             alt="">
      </a>
    </div>
    <div class="right">
      <div class="top">
        <div>
          <span class="se">1</span>
          <p class="xian"></p>
        </div>
        <div>
          <span>2</span>
          <p class="xian"></p>
        </div>
        <div>
          <span>3</span>
          <p class="xian"></p>
        </div>
        <div>
          <span>4</span>
          <p class="xian"></p>
        </div>
        <div>
          <span>5</span>
        </div>
      </div>
      <div class="title">
        <p>查看购物车</p>
        <p>拍下商品</p>
        <p>付款到支付宝</p>
        <p>确认收货</p>
        <p>评价</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headers',
}
</script>

<style lang="less" scoped>
.headers {
  width: 100%;
  display: flex;
  padding: 20px 20px 0 20px;
  justify-content: space-between;
  .left {
    // border: 1px solid red;
    a {
      padding: 10px 10px 0;
      display: block;
    }
  }
  .right {
    .top {
      display: flex;
      > div {
        display: flex;
        align-items: center;
        span {
          width: 30px;
          height: 30px;
          border-radius: 15px;
          border: 1px solid #eee;
          text-align: center;
          color: 12px;
          line-height: 30px;
        }
        .se {
          background-color: red;
          color: #fff;
        }
        p {
          height: 3px;
          width: 60px;
          background-color: #eee;
          margin: 0 15px;
        }
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      transform: translateX(-35px);
      margin-top: 20px;
      p {
        width: 120px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-weight: 700;
      }
    }
  }
}
</style>