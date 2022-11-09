<template>
  <div class="login_con">
    <div class="login_box">
      <div class="login_title">施华洛世奇后台管理系统</div>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0px" class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName" :prefix-icon="Avatar" type="text" autocomplete="off" />
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="passWord">
          <el-input v-model="ruleForm.passWord" :prefix-icon="Lock" type="password" autocomplete="off" />
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
import {
  reactive,
  ref,
  getCurrentInstance,
  defineComponent,
  toRefs,
  onMounted,
} from "vue";
import type { FormInstance, ElMessage } from "element-plus";
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
    if (ruleForm.userName !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

// onMounted(() => {
//   router.push({
//     path: "/",
//     query: { id: "1" },
//   });
// });

// 密码规则
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码！"));
  } else if (value !== ruleForm.passWord) {
    callback(new Error("请输入密码！"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  passWord: "",
  userName: "",
});

// 规则定义
const rules = reactive({
  passWord: [{ validator: validatePass2, trigger: "blur" }],
  userName: [{ validator: validatePass, trigger: "blur" }],
});

// 登入
const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(formEl.validate());
  if (!formEl) return;
  sendHttp();
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
//登入失败信息提示
const failure = () => {
  ElMessage.error("登入失败");
};

// 登入请求
const sendHttp = () => {
  proxy.$axios
    .get("/a", ruleForm)
    .then((res) => {
      //请求成功
      let data = res.data;
      console.log("res", res);
      successful();
      // sessionStorage.setItem('token',data.token)
      router.push({
        path: "/",
      });
    })
    .catch((err) => {
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
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcp.heyeehrm.com%2FContent%2FThemes%2FDefault%2Fimages%2Flogin-img.jpg&refer=http%3A%2F%2Fcp.heyeehrm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670400246&t=5ecde163356f359580b367c850214396");
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
  }
  .logInToReset {
    float: right;
  }
}
</style>