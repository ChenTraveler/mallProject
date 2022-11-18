<template>
  <div class="con">
    <div class="con_box" style="width:300px">
      <!-- 创建密码标题 -->
      <div class="title">创建新密码</div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
        <!-- 旧密码 -->
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass" :type="view1?'text':'password'"
            :suffix-icon="accordingTo?0:view1?'View':'Hide'" autocomplete="off" />
          <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;" @click="toView('view1')"></i>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="ruleForm.newPass" :type="view2?'text':'password'"
            :suffix-icon="accordingTo?0:view2?'View':'Hide'" autocomplete="off" />
          <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;" @click="toView('view2')"></i>
        </el-form-item>
        <!-- 再次输入新密码 -->
        <el-form-item label="再次输入" prop="newPass2">
          <el-input v-model="ruleForm.newPass2" :type="view3?'text':'password'"
            :suffix-icon="accordingTo?0:view3?'View':'Hide'" autocomplete="off" />
          <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;" @click="toView('view3')"></i>
        </el-form-item>
        <!-- 提交和重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, inject, Ref } from "vue";
import type { ElMessage, FormInstance } from "element-plus";

// 解密token文件
import jwt_decode from "jwt-decode";
import { da } from "element-plus/es/locale";
import { useRouter } from "vue-router";
let { uname }: any = jwt_decode(localStorage.getItem("token"));
const router = useRouter();
const { proxy } = getCurrentInstance();

const ruleFormRef = ref<FormInstance>();

let userInfo = inject("userInfo");

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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
.con {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 115px;
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin: 30px;
  text-align: center;
}
</style>