<template>
  <div>
    <div class="banner">
      <div class="tb"> <img src="../../../../public/images/loginAndReg/taobao.png"
             alt=""></div>
      <div class="logins">
        <div class="zhe-son2">
          <div class="tis"
               v-show="aaa">
            <div class="error">
              <i><img src="../../../../public/images/loginAndReg/gt.png"
                     alt=""></i>
              <div class="errmsg">
                {{useData.state}}
              </div>
            </div>
          </div>
          <div class="zhe-son2-head">
            <div v-for="(item,index) in data.dls"
                 :key="index"
                 :class="data.isdl==index?'dx':'mm'">
              <span @click="data.dl">{{item}}</span>
            </div>
            <!-- <div class="mm"><span>密码登录</span></div>
            <div class="mm"
                 @click="dl"><span>短信登录</span></div> -->
          </div>
          <div class="zhe-son2-content">
            <div>
              <input type="text"
                     placeholder="账号名/邮箱/手机号"
                     v-show="data.isdl"
                     v-model="useData.uname">

              <input type="text"
                     placeholder="请输入手机号"
                     v-show="!data.isdl"
                     maxlength="11"
                     v-model="useData.phone">

              <div class="dd"><img src="../../../../public/images/loginAndReg/user.png"
                     alt=""
                     v-show="data.isdl">
                <img src="../../../../public/images/loginAndReg/phone.png"
                     alt=""
                     v-show="!data.isdl">
              </div>
            </div>
            <div class="pass">
              <input type="password"
                     placeholder="请输入登录密码"
                     v-show="data.isdl"
                     v-model="useData.pwd">
              <input type="text"
                     placeholder="请输入验证码"
                     v-show="!data.isdl"
                     v-model="useData.yzm">
              <span class="getYzm"
                    v-show="!data.isdl"
                    @click="getyzm">
                {{yzmtext}}
              </span>
              <div class="dd"><img src="../../../../public/images/loginAndReg/suo.png"
                     alt=""
                     v-show="data.isdl">
                <img src="../../../../public/images/loginAndReg/shuzi.png"
                     alt=""
                     v-show="!data.isdl">
              </div>
            </div>
            <div class="lo"><span @click="login"
                    v-show="data.isdl">密码登录</span>
              <span @click="logins"
                    v-show="!data.isdl">验证登录</span>
            </div>
            <div class="denglu">
              <div class="weibo">
                <img src="../../../../public/images/loginAndReg/weibo.png"
                     alt="">
                <span>微博登录</span>
              </div>
              <div class="zfb">
                <img src="../../../../public/images/loginAndReg/zhifubao.png"
                     alt="">
                <span>支付宝登录</span>
              </div>
            </div>
          </div>
          <div class="zhuce">
            <div><span v-show="data.isdl">忘记密码</span>
              <span v-show="data.isdl">忘记账号名</span>
              <router-link to="/res"><span>免费注册</span></router-link>
            </div>
          </div>

        </div>
      </div>
      <div class="footer">
        <div class="footer-jt">
          <ul class="jt-ul">
            <li><a href="javascript:;">阿里巴巴集团</a></li>
            <li><a href="javascript:;">阿里巴巴国际站</a></li>
            <li><a href="javascript:;">阿里巴巴中国站</a></li>
            <li><a href="javascript:;">全球速卖通</a></li>
            <li><a href="javascript:;">淘宝网</a></li>
            <li><a href="javascript:;">天猫</a></li>
            <li><a href="javascript:;">聚划算</a></li>
            <li><a href="javascript:;">一淘</a></li>
            <li><a href="javascript:;">阿里妈妈</a></li>
            <li><a href="javascript:;">飞猪</a></li>
            <li><a href="javascript:;">虾米</a></li>
            <li><a href="javascript:;">阿里云计算</a></li>
            <li><a href="javascript:;">云OS</a></li>
            <li><a href="javascript:;">万网</a></li>
            <li><a href="javascript:;">支付宝</a></li>
          </ul>
        </div>
        <p class="footer-mp">
          <a href="javascript:;">关于淘宝</a>
          <a href="javascript:;">合作伙伴</a>
          <a href="javascript:;">营销中心</a>
          <a href="javascript:;">廉正举报</a>
          <a href="javascript:;">联系客服</a>
          <a href="javascript:;">开放平台</a>
          <a href="javascript:;">诚征英才</a>
          <a href="javascript:;">联系我们</a>
          <a href="javascript:;">网站地图</a>
          <a href="javascript:;">隐私权政策</a>
          <a href="javascript:;">法律声明</a>
          <a href="javascript:;">知识产权</a>
          <b>|</b>
          <span>© 2003-现在 Taobao.com 版权所有</span>
        </p>
        <p class="footer-bp">
          <span>增值电信业务经营许可证：浙B2-20080224</span><b>|</b>
          <span>增值电信业务经营许可证（跨地区）： B2-20150210</span><b>|</b>
          <span>浙网文（2019）1033-086号</span><b>|</b>
          <span>浙江省网络食品销售第三方平台提供者备案：浙网食A33010001</span>
        </p>
        <p class="footer-bp">
          <span>互联网药品信息服务资格证书（浙）-经营性-2018-0010</span><b>|</b>
          <span>短消息类服务接入代码使用证书：号【2016】00154-A01</span><b>|</b>
          <span>信息网络传播视听许可证：1109364号</span><b>|</b>
          <span>出版物网络交易平台服务经营备案号：新出发浙备字第002号</span>
        </p>
        <p class="footer-bp">
          <span><a target="_blank"
               href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010002000078">
              <span class="tb-footer-mod"
                    style="background-position:-861px 0px; width:20px; height: 20px; "></span>
              浙公网安备 33010002000078号</a></span><b>|</b><span><a href="http://beian.miit.gov.cn"
               rel="noopener
            noreferrer">浙B2-20080224-1</a></span><b>|</b><span>广播电视节目制作经营许可证（浙）字第01012号</span><b>|</b><span>市场名称登记证：工商网市字3301004120号</span><b>|</b>
        </p>
        <p class="footer-bp"> <span>医疗器械网络交易服务第三方平台备案：（浙）网械平台备字[2018]第00004号</span></p>
        <div class="footer-tb">
          <a href="#"><img src="../../../../public/images/loginAndReg/10001.gif"
                 alt=""></a>
          <a href="#"
             class="tb1"></a>
          <a href="#"
             class="tb2"></a>
          <a href="#"
             class="tb3"></a>
          <a href="#"
             class="tb4"></a>
          <a href="#"
             class="tb5"><img src="../../../../public/images/loginAndReg/ft-tb5.png"
                 alt=""></a>
          <a href="#"
             class="tb6"></a>
          <a href="#"
             class="tb7"></a>
          <a href="#"
             class="tb8"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()

    console.log(router)
    const phoneZ =
      /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    const data = reactive({
      dls: ['密码登录', '短信登录'],
      isdl: true,
      dl() {
        this.isdl = !this.isdl
      },
    })
    //获取验证码
    const yzmtext = ref('获取验证码')
    let time = 60
    let flag = true
    const getyzm = () => {
      if (phoneZ.test(useData.phone)) {
        yzmtext.value = `重新发送验证码(${time}s)`
        if (flag) {
          const timer = setInterval(() => {
            if (time <= 0) {
              yzmtext.value = '获取验证码'
              time = 60
              flag = true
              clearInterval(timer)
            } else {
              flag = false
              yzmtext.value = `重新发送验证码(${--time}s)`
            }
          }, 1000)

          proxy.$axios
            .post('/getcode')
            .then((d) => {
              ElMessageBox.alert(d.data, '验证码', {
                // if you want to disable its autofocus
                confirmButtonText: '确认',
              })
            })
            .catch((err) => console.log(err))
        }
      } else {
        useData.state = '请输入正确的手机号'
      }
    }
    const useData = reactive({
      uname: '',
      pwd: '',
      phone: '',
      yzm: '',
      state: '',
    })
    const aaa = ref(false)
    //密码登入
    const login = () => {
      if (useData.uname == '' && useData.pwd == '') {
        aaa.value = true
        return (useData.state = '用户名和密码不能为空！')
      }
      let unameZ = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{11}$/
      let pwdZ = /^[A-Za-z\d.?]{6,16}$/
      if (!unameZ.test(useData.uname)) {
        console.log(11111111111)
        aaa.value = true
        return (useData.state = '用户名格式不正确')
      }
      if (!pwdZ.test(useData.pwd)) {
        aaa.value = true
        return (useData.state = '密码格式不正确')
      }
      proxy.$axios
        .post('/login', { uname: useData.uname, pwd: useData.pwd })
        .then((data) => {
          console.log(data)
          if (data.status != 200) {
            aaa.value = true
            return (useData.state = '账号或密码不正确')
          }
          useData.state = data.message
          localStorage.setItem('token', data.data)
          router.push({ name: 'index' })
        })
    }
    //验证登录
    const logins = () => {
      if (useData.phone == '' && useData.yzm == '') {
        aaa.value = true
        return (useData.state = '手机号和验证码不能为空！')
      }
      // let pwdZ = /^[A-Za-z\d.?]{6}$/
      let pwdZ = useData.yzm
      if (!phoneZ.test(useData.phone)) {
        aaa.value = true
        return (useData.state = '手机格式不正确')
      }
      // if (pwdZ != '123456') return (useData.state = '验证码不正确')
      console.log(pwdZ)
      proxy.$axios
        .post('/login', { phone: useData.phone, ucode: pwdZ })
        .then((data) => {
          console.log(data)
          if (data.status == 200 && useData.yzm == '') {
            aaa.value = true
            return (useData.state = '账号或验证码错误')
          }
          aaa.value = true
          useData.state = data.message
          localStorage.setItem('token', data.data)
          router.push({ name: 'index' })
        })
    }

    return {
      data,
      useData,
      login,
      logins,
      getyzm,
      yzmtext,
      aaa,
    }
  },
}
</script>

<style lang=stylus scoped>
.banner
  width 100%
  min-width 1200px
  position relative
  a
    text-decoration none
    color #000
  .tb
    width 1200px
    margin 0 auto
    img
      width 70px
      height 45px
      padding 22px 0
  .logins
    position absolute
    top 88px
    left 0
    background-size cover
    background-repeat no-repeat
    background-position 50%
    width 100%
    height 600px
    min-width 1200px
    background-image url('../../../../public/images/loginAndReg/login-banner.jpg')
    .zhe-son2
      position relative
      left 62%
      top 20%
      height 350px
      width 350px
      background-color rgb(233, 233, 242)
      display block
      span
        cursor pointer
        user-select none
      .pass
        position relative
        span
          position absolute
          font-size 12px
          color #999
          top 12px
          right 10px
      .tis
        width 220px
        height 26px
        position absolute
        top 67px
        left 35px
        background-color #fef2f2
        border 1px solid #ff934c
        .error
          display flex
          i
            width 16px
            height 16px
            margin 5px 5px 0 5px
            img
              width 16px
              height 16px
          .errmsg
            width 200px
            height 26px
            padding-top 3px
      .zhe-son2-head
        display flex
        .mm
          width 65px
          height 20px
          padding 35px 0 5px 0
          margin 0 0 25px 25px
          border-bottom 2px solid #000
          font-weight 700
        .dx
          width 65px
          height 20px
          padding 35px 0 5px 0
          margin 0 0 25px 25px
          font-weight 700
      .zhe-son2-content
        position absolute
        top 80px
        left 0
        div
          position relative
          margin 20px 0 0 22px
          .dhhm
            position absolute
            width 55px
            height 38px
            margin 0
            top 10px
            left 50px
          input
            outline none
            width 250px
            height 36px
            padding-left 50px
            border 0
          .aaa
            outline none
            width 200px
            height 36px
            padding-left 100px
            border 0
          #sjh
            width 55px
            height 38px
            position absolute
            top -10px
            left -10px
            border none
            outline none
            opacity 0
          .dd
            position absolute
            width 40px
            height 40px
            top 0
            left 0
            background-color #ccc
            margin 0
            img
              position absolute
              width 25px
              height 25px
              top 7px
              left 7px
      .lo
        width 300px
        height 42px
        color #fff
        font-size 16px
        text-align center
        background-color #f40
        line-height 42px
        border-radius 5px
      .denglu
        top 0
        left 0
        img
          position absolute
          width 20px
          height 20px
          top 0
          left 0
        span
          font-size 12px
          position absolute
          top 1px
          left 22px
        .weibo
          position absolute
          width 70px
          height 24px
          top 0
          left 0
          margin 0
        .zfb
          position absolute
          width 85px
          height 24px
          top 0
          left 80px
          margin 0
      .zhuce
        div
          width 320px
          font-size 12px
          display flex
          position absolute
          bottom 25px
          right 25px
          justify-content flex-end
          font-weight 200
          span
            margin-left 10px
  .footer
    width 1200px
    margin 650px auto 0 auto
    b
      font-weight normal
      color #ddd
    a
      text-decoration none
      color #000
    .footer-jt
      ul
        display flex
        border-top 1px solid #999
        border-bottom 1px solid #999
        padding 15px 0
        li
          list-style none
          a
            display block
            margin-right 10px
            font-size 12px
            color #6c6c6c
          a:nth-child(1)
            margin-left 4px
          a:hover
            color #fd6020
    .footer-mp
      display flex
      margin 5px 0
      a
        display block
        margin-right 10px
        font-size 12px
        color #6c6c6c
      a:nth-child(1)
        margin-left 4px
      a:hover
        color #fd6020
      span
        margin-left 30px
        color #9c9c9c
        font-size 12px
    .footer-bp
      line-height 15px
      span
        color #9c9c9c
        font-size 12px
      a:hover
        color #fd6020
      b
        margin 0 4px
    .footer-tb
      margin 16px 0
      display flex
      align-items center
      a
        margin-left 15px
        background-image url('https://img.alicdn.com/tfs/TB1EPnIQXXXXXaSXpXXXXXXXXXX-1133-35.jpg') // img.alicdn.com/tfs/TB1EPnIQXXXXXaSXpXXXXXXXXXX-1133-35.jpg);
      a:nth-child(1)
        margin-left 0
        background-image none
      .tb1
        height 36px
        background-position 0px 0px
        width 30px
      .tb2
        background-position -40px 0px
        width 33px
        height 36px
      .tb3
        background-position -80px 0px
        width 50px
        height 40px
      .tb4
        background-position -140px 0px
        width 83px
        height 36px
      .tb5
        height 64px
      .tb6
        background-position -650px 0px
        width 105px
        height 36px
      .tb7
        background-position -345px 0px
        width 82px
        height 36px
      .tb8
        background-position -761px 0px
        width 97px
        height 34px
</style>