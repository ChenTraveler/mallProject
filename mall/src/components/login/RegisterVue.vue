<template>
  <div class="wrapper">
    <div class="logo">
      <div class="logo-img">
        <img src="../../../public/images/loginAndReg/taobao.png"
             alt="">

      </div>
      <h2 class="title">用户注册</h2>
    </div>
    <div class="reg-form">
      <!-- 手机号输入框 -->
      <div class="reg-form-item">
        <label for="tel-num"
               class="reg-form-item-label">手机号码：</label>
        <div class="tel-box">
          <input type="text"
                 placeholder="请输入你的手机号码"
                 id="tel-num"
                 v-model="ipt.phoneNum"
                 maxlength="11">
        </div>
      </div>
      <!-- 密码输入框 -->
      <div class="reg-form-item">
        <label for="psd"
               class="reg-form-item-label">密码：</label>
        <div class="psd-box">
          <input type="password"
                 placeholder="请设定密码"
                 id="psd"
                 v-model="ipt.passWord">
        </div>
      </div>

      <!-- 验证码输入框 -->
      <div class="reg-form-item">
        <label for="yzm"
               class="reg-form-item-label">验证码：</label>
        <div class="yzm-box">
          <input type="text"
                 placeholder="请输入验证码"
                 id="yzm"
                 maxlength="6"
                 v-model="ipt.yzm">
          <!-- 获取验证码 -->
          <span class="getYzm"
                @click="hqYzm"
                :style="{ 'color': isClicked ? '#666' : '#f40' }">{{yzmtext}}</span>
        </div>
      </div>
      <!-- 注册按钮 -->
      <div class="btn-reg"
           :style="{ 'opacity': isActive ? '1' : '.5' }"
           @click="register"> 注册</div>
      <!-- 勾选协议 -->
      <div class="agreeXy">
        <input type="checkbox"
               @click="changChecked"
               :checked="isChecked">
        <p class="xy-text">
          <span>已阅读并同意以下协议</span>
          <a href="javascript:;">淘宝平台服务协议</a>、<a href="javascript:;">隐私权政策</a>、<a href="javascript:;">法律声明</a>、<a href="javascript:;">支付宝及客户端服务协议</a>
        </p>
      </div>
    </div>
    <div class="footer">
      <!-- 底部集团 -->
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
          <li><a href="javascript:;">阿里云计算</a></li>
          <li><a href="javascript:;">云OS</a></li>
          <li><a href="javascript:;">万网</a></li>
          <li><a href="javascript:;">支付宝</a></li>
        </ul>
      </div>
      <!-- 关于淘宝 -->
      <p class="footer-mp">
        <a href="javascript:;">关于淘宝</a>
        <a href="javascript:;">合作伙伴</a>
        <a href="javascript:;">营销中心</a>
        <a href="javascript:;">联系客服</a>
        <a href="javascript:;">开放平台</a>
        <a href="javascript:;">诚征英才</a>
        <a href="javascript:;">联系我们</a>
        <a href="javascript:;">网站地图</a>
        <a href="javascript:;">法律声明及隐私权政策</a>
        <span>© 2022 Taobao.com 版权所有</span>
      </p>
      <p class="footer-bp">
        <span>网络文化经营许可证：<a href="javascript:;">文网文[2010]040号</a></span>
        <b>|</b>
        <span>增值电信业务经营许可证：浙B2-20080224-1</span>
        <b>|</b>
        <span>信息网络传播视听节目许可证：1109364号</span>
      </p>
    </div>
    <!-- 勾选协议提示 -->
    <div class="xyTipBox"
         v-show="xyTip">
      <div class="xyTip"></div>
      <div class="xy-box">
        <div class="tip">请阅读并同意协议</div>
        <div class="sure"
             @click="closeXy">确认</div>
      </div>
    </div>
    <!-- 手机号格式错误提示 -->
    <div class="phone-err"
         v-show="phErr.isError">
      {{ phErr.message }}
    </div>
  </div>
</template>

<script>
import '../../register.css'
// import axios from '../../axios'
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'WorkspaceJsonRegister',
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()

    // 注册按钮
    const isActive = ref(false)
    // 复选框
    const isChecked = ref(false)
    // 获取验证码
    const isClicked = ref(false)
    // 格式错误提示
    const phErr = reactive({
      isError: false,
      message: '手机号码格式不正确，请重新输入',
    })
    // 同意协议提示
    const xyTip = ref(false)
    // 三个输入值
    const ipt = reactive({
      phoneNum: '',
      passWord: '',
      yzm: '',
    })
    // 获取验证码
    const yzmtext = ref('获取验证码')
    // 复选框状态
    function changChecked() {
      isChecked.value = !isChecked.value
    }
    // 关闭同意协议提示
    function closeXy() {
      xyTip.value = false
    }
    // 三个输入框正则
    const numzz =
      /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    const passzz = /^[A-Za-z\d.?]{6,16}$/
    const yzmzz = /^[0-9]{6}$/

    // 提示文字
    function ddd() {
      phErr.isError = true
      setTimeout(() => {
        phErr.isError = false
      }, 1500)
    }

    // 注册按钮点击事件
    function register() {
      // 判断手机号是否为空
      if (ipt.phoneNum === '') {
        phErr.message = '请输入手机号,手机号不能为空'
        ddd()
      } else {
        // 判断手机号格式
        if (!numzz.test(ipt.phoneNum)) {
          phErr.message = '您输入的不是手机号'
          ddd()
        } else {
          // 判断密码格式
          // 判断密码是否为空
          if (ipt.passWord === '') {
            phErr.message = '密码不能为空'
            ddd()
          } else {
            if (!passzz.test(ipt.passWord)) {
              phErr.message = '密码长度应为6-16，不包含特殊字符（仅支持.?）'
              ddd()
            } else {
              // 判断验证码格式
              if (ipt.yzm === '') {
                phErr.message = '请输入验证码'
                ddd()
              } else {
                if (ipt.yzm.length < 6) {
                  phErr.message = '验证码长度应为6'
                  ddd()
                } else if (!yzmzz.test(ipt.yzm)) {
                  phErr.message = '验证码为6位数字'
                  ddd()
                } else {
                  phErr.isError = false
                  // 判断是否勾选协议
                  if (isChecked.value === false) {
                    xyTip.value = true
                  } else {
                    // 格式无误 发送请求
                    proxy.$axios
                      .post('/rej', {
                        phone: ipt.phoneNum,
                        ucode: ipt.yzm,
                        pwd: ipt.passWord,
                      })
                      .then((d) => {
                        phErr.message = d.data
                        ddd()
                        router.push({ name: 'login' })
                      })
                      .catch((err) => console.log(err))
                  }
                }
              }
            }
          }
        }
      }
    }
    watch(ipt, () => {
      if (ipt.phoneNum !== '' && ipt.passWord !== '') {
        isActive.value = true
      }
      if (ipt.phoneNum === '' || ipt.passWord === '') {
        isActive.value = false
      }
    })

    let time = 60
    let flag = true
    function hqYzm() {
      if (numzz.test(ipt.phoneNum)) {
        isClicked.value = true
        yzmtext.value = `重新发送验证码(${time}s)`
        if (flag) {
          const timer = setInterval(() => {
            if (time <= 0) {
              yzmtext.value = '获取验证码'
              time = 60
              flag = true
              isClicked.value = false
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
        phErr.message = '请输入正确的手机号'
        ddd()
      }
    }
    return {
      isActive,
      ipt,
      register,
      phErr,
      xyTip,
      isChecked,
      changChecked,
      closeXy,
      hqYzm,
      yzmtext,
      isClicked,
    }
  },
}
</script>

