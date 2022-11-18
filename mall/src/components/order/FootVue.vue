<template>
  <div class="footer">
    <!-- 切换场景 -->
    <div class="div">
      <div>
        <a href="#"></a>
        <a href="#"></a>
      </div>
    </div>
    <!-- 导航栏1 -->
    <div class="nav">
      <a class="biao"
         href="#">
        <div class="left">
          优
        </div>
        <div class="right">
          <h2>优质保障</h2>
          <p>品质护航 购物无忧</p>
        </div>
      </a>
      <a class="biao"
         href="#">
        <div class="left">
          七
        </div>
        <div class="right">
          <h2>七天无理由退换货</h2>
          <p>为您提供售货无忧保障</p>
        </div>
      </a>
      <a class="biao"
         href="#">
        <div class="left">
          特
        </div>
        <div class="right">
          <h2>特色服务</h2>
          <p>为您呈现不一样的服务</p>
        </div>
      </a>
      <a class="biao"
         href="#">
        <div class="left">
          帮
        </div>
        <div class="right">
          <h2>帮助中心</h2>
          <p>您的购物指南</p>
        </div>
      </a>
    </div>
    <!-- 导航栏二 -->
    <div class="nav1">
      <ul>
        <li>
          <title>
            购物指南
          </title>
          <a href="#">免费注册</a>
          <a href="#">开通支付宝</a>
          <a href="#">支付宝充值</a>
        </li>
        <li>
          <title>
            天猫保障
          </title>
          <a href="#">发票保障</a>
          <a href="#">售后规则</a>
          <a href="#">物流时效保障</a>
        </li>
        <li>
          <title>
            支付方式
          </title>
          <a href="#">快捷支付</a>
          <a href="#">信用卡</a>
          <a href="#">余额宝</a>
          <a href="#">蚂蚁花呗</a>
        </li>
        <li>
          <title>
            商家服务
          </title>
          <a href="#">天猫规则</a>
          <a href="#">商家入驻</a>
          <a href="#">商家中心</a>
          <a href="#">天猫必修课</a>
          <a href="#">喵言喵语</a>
          <a href="#">平台服务协议</a>
        </li>
        <li>
          <title>
            手机天猫
          </title>
          <a href="#"><img src="../../../public/images/index/a100.png"
                 alt=""></a>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterVue',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  background-color: #fff;
  margin-top: 30px;
  // 导航栏1
  .div {
    width: 100%;
    border-bottom: 1px solid #d1d7dc;
    div {
      width: 113px;
      height: 31px;
      margin: 0 auto;
      background: url(../../../public/images/index/a102.png) no-repeat;
      a {
        display: inline-block;
        width: 50px;
        height: 31px;
        margin-left: 5px;
      }
    }
  }
  .nav {
    width: 1200px;
    // text-align: center;
    margin: 0 auto;
    display: flex;
    align-items: center;
    // padding-left: 40px;
    border-bottom: 1px solid #d1d7dc;
    padding: 20px 0;
    // border-top: 1px solid #d1d7dc;
    .biao {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      padding-left: 20px;
      .left {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 5px solid red;
        color: red;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        font-weight: bolder;
      }
      .right {
        width: 250px;
        margin-left: 10px;
        text-align: left;
        h2 {
          font-size: 22px;
          color: #464646;
          // transform: translateY(15px);
        }
        p {
          color: #b9b9b9;
          font-size: 22px;
          padding-top: -15px;
          transform: translateY(-5px);
        }
      }
    }
  }
  // 导航栏二
  .nav1 {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
    ul {
      width: 100%;
      display: flex;
      margin-left: -40px;
      // align-items: center;
      li {
        width: 20%;
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-left: 30px;

        title {
          display: block;
          color: #646464;
          font-size: 18px;
        }
        a {
          width: 100%;
          display: inline-block;
          text-decoration: none;
          color: #929492;
          font-size: 12px;
          line-height: 20px;
          img {
            width: 105px;
            height: 105px;
          }
        }
        a:hover {
          // color: red;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>