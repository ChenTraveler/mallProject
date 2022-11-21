<template>
  <div class="con">
    <!-- 个人资料 -->
    <div class="car">
      <div class="title">
        <h5>个人资料</h5>
      </div>
      <div class="pic">
        <el-row justify="center" style="margin-top:17px;margin-bottom:20px">
          <el-upload ref="upload" class="upload-demo" :action="'http://localhost:3000/api/upload'" name="files"
            :show-file-list="false" :before-upload="handleBefore" :on-success="handleAvatarSuccess">
            <div class="headPortrait">
              <img :src="userInfo.headphoto">
            </div>
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </el-row>
      </div>
      <ul>
        <li><span class="utitle">登入名称：</span> <span class="name">{{userInfo.username}}</span></li>
        <li><span class="utitle">手机号码：</span> <span class="name">{{userInfo.phone}}</span></li>
        <li><span class="utitle">邮箱地址：</span> <span class="name">{{userInfo.email}}</span></li>
        <li class="bot"><span class="utitle">注册时间</span> <span class="name">{{userInfo.rejTime}}</span></li>
      </ul>
    </div>
    <!-- 个人信息修改 -->
    <div class=" car_info">
      <div class="title">
        <h5>基本资料</h5>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs demo-tab" @tab-click="handleClick">
        <!-- 基本信息修改 -->
        <el-tab-pane label="基本资料" name="first">
          <el-form ref="ruleFormRef1" :model="userInfo2" status-icon :rules="userInfoRules" label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="用户名：">
              <el-input v-model="userInfo.username" disabled type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="userInfo2.phone" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="email：" prop="email">
              <el-input v-model="userInfo2.email" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button type="success" :icon="Check" @click="save(ruleFormRef1)">保存</el-button>
              <el-button type="danger" :icon="Refresh" @click="resetForm(ruleFormRef1)">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 密码修改 -->
        <el-tab-pane label="修改密码" name="second">
          <div class="con_box">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
              <!-- 旧密码 -->
              <el-form-item label="旧密码" prop="oldPass">
                <el-input v-model="ruleForm.oldPass" :type="view1?'text':'password'"
                  :suffix-icon="accordingTo?0:view1?'View':'Hide'" autocomplete="off" />
                <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;"
                  @click="toView('view1')"></i>
              </el-form-item>
              <!-- 新密码 -->
              <el-form-item label="新密码" prop="newPass">
                <el-input v-model="ruleForm.newPass" :type="view2?'text':'password'"
                  :suffix-icon="accordingTo?0:view2?'View':'Hide'" autocomplete="off" />
                <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;"
                  @click="toView('view2')"></i>
              </el-form-item>
              <!-- 再次输入新密码 -->
              <el-form-item label="再次输入" prop="newPass2">
                <el-input v-model="ruleForm.newPass2" :type="view3?'text':'password'"
                  :suffix-icon="accordingTo?0:view3?'View':'Hide'" autocomplete="off" />
                <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;"
                  @click="toView('view3')"></i>
              </el-form-item>
              <!-- 提交和重置按钮 -->
              <el-form-item>
                <el-button type="success" :icon="Check" @click="submitForm(ruleFormRef)">保存</el-button>
                <el-button type="danger" :icon="Refresh" @click="resetForm(ruleFormRef)">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, inject, Ref } from "vue";
import type { ElMessage, FormInstance, TabsPaneContext } from "element-plus";

// 解密token文件
import jwt_decode from "jwt-decode";
import { da } from "element-plus/es/locale";
import { useRouter } from "vue-router";
import { Check, Refresh, Plus, CloseBold } from "@element-plus/icons-vue"; //图标

import bus from "../../../plugins/bus";

let { uname }: any = jwt_decode(localStorage.getItem("token"));
const router = useRouter();
const { proxy } = getCurrentInstance();

let userInfo = reactive({
  username: "",
  headphoto: "",
  phoen: "",
  email: "",
  rejTime: "",
});

let userInfo2 = reactive({
  phone: "",
  email: "",
});

const ruleFormRef = ref<FormInstance>();
const ruleFormRef1 = ref<FormInstance>();

let accordingTo = ref(false);
let view1 = ref(false);
let view2 = ref(false);
let view3 = ref(false);
//用户密码查看
const toView = (v) => {
  v == "view1"
    ? (view1.value = !view1.value)
    : v == "view2"
    ? (view2.value = !view2.value)
    : (view3.value = !view3.value);
};

// 导航

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

let password: Ref<boolean> = ref(false);

// 旧密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码！！"));
    password.value = true;
  } else {
    const regPwd = /^[a-z0-9A-Z]{6,18}$/;
    if (!regPwd.test(value)) {
      callback(new Error("密码不符合规则！请输入6-18位密码！"));
      password.value = true;
    } else {
      callback();
      password.value = false;
    }
  }
};

// 新密码
const validatePass1 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入要设置的新密码"));
  } else if (value !== ruleForm.newPass) {
    callback(new Error("Two inputs don't match!"));
  }
  const regPwd = /^[a-z0-9A-Z]{6,18}$/;
  if (!regPwd.test(value)) {
    callback(new Error("密码不符合规则！请输入6-18位密码！"));
  } else {
    callback();
  }
};

// 再次新密码
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入新密码"));
  } else if (value !== ruleForm.newPass2) {
    callback(new Error("Two inputs don't match!"));
  }
  const regPwd = /^[a-z0-9A-Z]{6,18}$/;
  if (!regPwd.test(value)) {
    callback(new Error("密码不符合规则！请输入6-18位密码！"));
  } else {
    callback();
  }
};

// 新密码旧密码值
const ruleForm = reactive({
  oldPass: "",
  newPass: "",
  newPass2: "",
});

// 密码规则
const rules = reactive({
  oldPass: [{ validator: validatePass, trigger: "blur" }],
  newPass: [{ validator: validatePass, trigger: "blur" }],
  newPass2: [{ validator: validatePass, trigger: "blur" }],
});

// 用户电话
const userIphone = (rule: any, value: any, callback: any) => {
  console.log(value);
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else {
    const regPwd = /^[a-z0-9A-Z]{6,18}$/;
    if (!regPwd.test(value)) {
      callback(new Error("电话号码不正确！"));
    } else {
      callback();
    }
  }
};

//用户邮箱
const userEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else {
    const reg =
      /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
    if (!reg.test(value)) {
      callback(new Error("邮箱地址格式不正确！"));
    } else {
      callback();
    }
  }
};

// 用户修改规则
const userInfoRules = reactive({
  phone: [{ validator: userIphone, trigger: "blur" }],
  email: [{ validator: userEmail, trigger: "blur" }],
});

// 保存用户信息
const save = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      let obj = {
        setStr:
          "email='" +
          userInfo2.email +
          "'" +
          "," +
          "phone='" +
          userInfo2.phone +
          "'",
        uname: uname,
      };
      console.log(obj);
      (proxy as any).$axios.post("/upduser", obj).then((data) => {
        console.log(data);
        for (let k in userInfo) {
          if (userInfo2[k]) userInfo[k] = userInfo2[k];
        }
      });
    }
  });
};

// 提交修改后的密码
const submitForm = (formEl: FormInstance | undefined) => {
  let oldPass = ruleForm.oldPass;
  let newPass = ruleForm.newPass;
  let newPass2 = ruleForm.newPass2;
  if (newPass != newPass2) return ElMessage.error("两次输入的新密码不一致！");
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      (proxy as any).$axios
        .post("/pwd", {
          uname: uname,
          pwd: ruleForm.oldPass,
        })
        .then((data) => {
          if (data.status == 200) {
            if (oldPass == newPass)
              return ElMessage.error("修改失败，新密码与旧密码一致！");
            (proxy as any).$axios
              .post("/upduser", {
                setStr: `password=${newPass}`,
                uname: uname,
              })
              .then((data) => {
                if (data.status) {
                  ElMessage.success(data.data);
                  localStorage.removeItem("token");
                  router.push({
                    path: "/login",
                  });
                } else {
                  ElMessage.error(data.data);
                }
              });
          } else {
            ElMessage.error("旧密码输入有误！！");
          }
        });
    } else {
      return false;
    }
  });
};

// 清空填写
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 点击头像上传时
const handleBefore = (file) => {
  // form.pic = rawFile.name;
  const url = window.URL || window.webkitURL;
  const img = new Image(); // 手动创建一个Image对象
  img.src = url.createObjectURL(file); // 创建Image的对象的url

  return new Promise((resolve, reject) => {
    const isLt2M = file.size / 1024 / 1024 < 200;
    userInfo.headphoto = img.src;
    resolve(file);
    // 判断数据库里有没有，是否重新上传*****************
  });
};

// 图片上传成功后
const handleAvatarSuccess = (res, file) => {
  console.log(res);
  if (res.status == 200) {
    // 提示
    ElMessage({ message: "上传成功！", type: "success" });
    userInfo.headphoto = "http://localhost:3000/" + res.msg;
    let obj = {
      setStr: "headphoto=" + "'" + res.msg + "'",
      uname: uname,
    };
    // 修改数据库数据
    (proxy as any).$axios.post("/upduser", obj).then((data) => {
      console.log(data);
    });
    // 数据传递给父组件更新头像
    bus.emit("pic", userInfo.headphoto);
  } else {
    ElMessage.error(res.msg);
  }
};

// 数据获取
(proxy as any).$axios
  .post("/udata", { other: 'where users.username="admin"' })
  .then((data) => {
    for (let k in data.data[0]) {
      if (k == "rejTime") {
        userInfo[k] = data.data[0][k].slice(0, 9);
      } else {
        userInfo[k] = data.data[0][k];
        if (k == "headphoto")
          userInfo[k] = "http://localhost:3000/" + data.data[0][k];
      }
    }
  })
  .catch((err) => {
    router.push({
      path: "/login",
    });
  });
</script>

<style lang="less" scoped>
.con {
  display: flex;
  width: 100%;
  padding: 15px;
  margin-top: 10px;

  background-size: cover;
}
.title {
  padding: 0 18px;
  height: 41px;
  background-color: #f0f3f4;
  font-weight: 700;
  line-height: 41px;
  border-radius: 2px 2px 0 0;
}
.car {
  display: inline-block;
  width: 400px;
  height: 400px;
  min-width: 200px;
  background: #fff;
  padding-bottom: 25px;
  margin-right: 15px;
  border: 1px solid #e7eaec;

  .pic {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 15px 0;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 1px solid #999;
    }
    i {
      position: absolute;
    }

    .upload-demo:hover {
      .headPortrait {
        background: #fff;
        border-radius: 50%;
      }
      img {
        opacity: 0.4;
      }
      i {
        position: absolute;
        color: #999;
        font-size: 90px;
      }
    }
  }
  ul {
    line-height: 2.2;
    padding: 0 15px;
    li {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #999;
      margin-top: -1px;
    }
    .bot {
      border-bottom: 1px solid #999;
    }
  }
}
.car_info {
  flex: 1;
  background-color: #fff;
  border: 1px solid #e7eaec;
  .demo-tab {
    padding: 5px 18px;
  }
}
</style>