<template>
  <div class="con">
    <div class="con_box" style="width:300px">
      <!-- 标题 -->
      <div class="title">个人基本信息</div>
      <el-row justify="center">
        <!-- 头像编辑 -->
        <el-upload ref="upload" class="upload-demo" :on-success="handleAvatarSuccess"
          action="http://localhost:3000/upload" :limit="1" :on-exceed="handleExceed" :show-file-list="false"
          :before-upload="handleBefore">
          <el-avatar :size="100" @error="errorHandler">
            <img :src="formLabelAlign.pic" />
          </el-avatar>
        </el-upload>
      </el-row>
      <el-row justify="center" style="margin-top:25px">
        <el-form :label-position="labelPosition" label-width="130px" :model="formLabelAlign" style="width: 460px">
          <!-- 姓名编辑 -->
          <el-form-item label="姓名：">
            <span>{{formLabelAlign.name}}</span>
            <!-- <el-button type="" text :icon="Edit" @click="theEditor('name')"></el-button> -->
          </el-form-item>
          <!-- id -->
          <el-form-item label="id：">
            <span>{{formLabelAlign.id}}</span>
          </el-form-item>
          <!-- 电子邮件 -->
          <el-form-item label="email：">
            <span>{{formLabelAlign.email}}</span>
            <el-button class="wrap" type="" text :icon="Edit" @click="theEditor('email')"></el-button>
          </el-form-item>
          <!-- 级别编辑 -->
          <!-- <el-form-item label="级别：">
            <span>{{formLabelAlign.level}}级</span>
            <el-button type="" text :icon="Edit" @click="theEditor('level')"></el-button>
          </el-form-item> -->
          <!-- 状态编辑 -->
          <el-form-item label="状态：">
            <span>{{stateStr}}</span>
            <el-button type="" text :icon="Edit" @click="theEditor('state')"></el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <!-- 对话框 -->
    <el-dialog v-model="centerDialogVisible" :title="state.title" width="30%">
      <el-form-item label="姓名：" v-if="state.type=='name'">
        <el-input v-model="formLabelAlign.name" placeholder="Please input" />
      </el-form-item>
      <el-form-item label="姓名：" v-else-if="state.type=='email'">
        <el-input v-model="formLabelAlign.email" placeholder="Please input" />
      </el-form-item>
      <el-form-item label="级别：" v-else-if="state.type=='level'">
        <el-select v-model="formLabelAlign.level" placeholder="please select your zone">
          <el-option label="1级" value="1" />
          <el-option label="2级" value="2" />
          <el-option label="3级" value="3" />
          <el-option label="4级" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" v-else>
        <el-switch v-model="formLabelAlign.state" />
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="shutDown">
            关闭
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed, Ref, getCurrentInstance } from "vue";
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
//信息提示
import type {
  FormInstance,
  ElMessage,
  UploadProps,
  UploadUserFile,
  UploadInstance,
  UploadRawFile,
  genFileId,
} from "element-plus";

// 解密token文件
import jwt_decode from "jwt-decode";
let { uname }: any = jwt_decode(localStorage.getItem("token"));

const labelPosition = ref("right");

import { useRouter } from "vue-router";
const router = useRouter();

// axios
const { proxy } = getCurrentInstance();

// 对话框显示值
const centerDialogVisible = ref(false);

// 编辑框接口定义
interface modifyThe {
  title: string;
  type: string;
}

// 编辑框的状态
const state: modifyThe = reactive({
  title: "",
  type: "",
});

// 编辑框弹出
const theEditor = (type: string) => {
  centerDialogVisible.value = true;
  state.type = type;
  formLabelAlign.type = type;
  state.title =
    type == "name"
      ? "请修改姓名"
      : type == "level"
      ? "请选择级别"
      : type == "state"
      ? "请选择状态"
      : "";
};

// 表单绑定的值
const formLabelAlign = reactive({
  name: uname,
  email: "",
  pic: "http://192.168.119.1/",
  id: "",
  level: "1",
  state: false,
  type: state.type,
});

// 在职状态
let stateStr: Ref<string> = ref("");

// 图片上传时
const handleBefore = (file) => {
  console.log(file);
  // form.pic = rawFile.name;
  const url = window.URL || window.webkitURL;
  const img = new Image(); // 手动创建一个Image对象
  img.src = url.createObjectURL(file); // 创建Image的对象的url

  (proxy as any).$axios
    .post("http://localhost:3000/upload", { pic: img.src })
    .then((data) => {
      console.log(data);
    });

  return new Promise((resolve, reject) => {
    const isLt2M = file.size / 1024 / 1024 < 200;
    if (file.type != "image/jpeg" && file.type != "image/png") {
      ElMessage.error("上传格式不对！");
      reject();
    } else {
      formLabelAlign.pic = img.src;
      ElMessage({ message: "上传成功！", type: "success" });
      resolve(file);
    }
    // 判断数据库里有没有，是否重新上传*****************
  });
};

stateStr.value = formLabelAlign.state == true ? "在职" : "离职";

// 关闭时将数据上传到数据库
const shutDown = () => {
  centerDialogVisible.value = false;
  let type1 = state.type;
  console.log(formLabelAlign.type);
  // state.type + "=" + '"' + formLabelAlign.type + '"' + ",password=123546",
  let obj = {
    setStr:
      "email='" +
      formLabelAlign.email +
      "'" +
      "," +
      "exist='" +
      formLabelAlign.state +
      "'",
    uname: uname,
  };
  console.log(obj);
  (proxy as any).$axios.post("/api/upduser", obj).then((data) => {
    console.log(data);
  });
};

// 状态监听
watch(
  () => formLabelAlign.state,
  (n, o) => {
    stateStr.value = formLabelAlign.state == true ? "在职" : "离职";
  }
);

(proxy as any).$axios
  .post("/api/udata", { other: 'where users.username="' + uname + '"' })
  .then((data) => {
    let data1 = data.data[0];
    formLabelAlign.id = data.data[0].id;
    formLabelAlign.email = data1.email;
    formLabelAlign.pic += data1.headphoto;
    formLabelAlign.state = data1.exist == "false" ? false : true;
  })
  .catch((err) => {
    router.push({
      path: "/login",
    });
  });
</script>

<style scoped>
.con {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}
.title {
  font-size: 25px;
  font-weight: bold;
  margin: 30px;
  text-align: center;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.wrap div {
  flex-wrap: nowrap;
}
</style>