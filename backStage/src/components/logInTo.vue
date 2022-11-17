<template>
  <div class="login_con">
    <div class="login_box">
      <div class="login_title">施华洛世奇后台管理系统</div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0px" class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item prop="uname">
          <el-input v-model="ruleForm.uname" :prefix-icon="Avatar" type="text" autocomplete="off" />
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="pwd">
          <el-input v-model="ruleForm.pwd" :prefix-icon="Lock" :type="view?'text':'password'"
            :suffix-icon="accordingTo?0:view?'View':'Hide'" autocomplete="off" />
          <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;" @click="toView()"></i>
        </el-form-item>
        <!-- 登入与重置 -->
        <el-form-item class="logInToReset">
          <el-button type="primary" @click="submitForm(ruleFormRef)">登入</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance } from "vue";
import type { ElMessage, FormInstance } from "element-plus";
import { Avatar, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const { proxy } = getCurrentInstance();

// 用户名规则
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名！"));
  } else {
    if (ruleForm.uname !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    const regPwd = /^[a-z0-9A-Z]{3,10}$/;
    if (!regPwd.test(value)) {
      callback(new Error("请以字母数字组合！，字符串长度在10以内"));
    } else {
      callback();
    }
  }
};

let accordingTo = ref(false);
let view = ref(false);
//用户密码查看
const toView = () => {
  view.value = !view.value;
};

// 密码规则
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码！"));
  } else {
    const regPwd = /^[a-z0-9A-Z]{6,18}$/;
    if (!regPwd.test(value)) {
      callback(new Error("密码不符合规则！请输入6-18位密码！"));
    } else {
      callback();
    }
  }
};

// 用户名称、密码
const ruleForm = reactive({
  pwd: "123456",
  uname: "admin",
});

// 规则定义
const rules = reactive({
  pwd: [{ validator: validatePass2, trigger: "blur" }],
  uname: [{ validator: validatePass, trigger: "blur" }],
});

// 登入
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      sendHttp();
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 登入成功信息提示
const successful = () => {
  ElMessage({
    message: "登入成功！",
    type: "success",
  });
};

// 登入请求
const sendHttp = () => {
  console.log(ruleForm);
  console.log((proxy as any).$axios);
  (proxy as any).$axios
    .post("/api/login", ruleForm)
    .then((res) => {
      //请求成功
      if (res.status == 200) {
        // 登入成功调用成功信息函数
        successful();
        localStorage.setItem("token", res.data);
        // 菜单初始缓存
        localStorage.setItem("active", "2");
        // url重定向
        router.push({
          path: "/",
        });
      } else {
        ElMessage.error(res.data + res.message);
        return 0;
      }
    })
    .catch((err) => {
      console.log("请求失败");
      failure();
    });
};
// 信息提示
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};
</script>

<style lang="less" scoped>
.login_con {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("/public/image/werf645654454.webp");
  background-size: 100% 100%;
  .login_title {
    font-size: 26px;
    line-height: 78px;
    text-align: center;
  }
  .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #fff;
    border-radius: 15px;
    padding: 0 25px 15px;
    box-shadow: 0 0 15px #666;
  }
  .logInToReset {
    float: right;
  }
}
</style>