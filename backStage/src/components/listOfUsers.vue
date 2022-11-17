<template>
  <el-main style="height:800px;overflow:auto">
    <!-- 标题 -->
    <el-row>
      <el-col :span="24" class="title">
        用户列表
      </el-col>
    </el-row>
    <!-- 添加用户 -->
    <el-row style="margin:15px">
      <el-button @click="addUser">添加用户</el-button>
    </el-row>
    <!-- tableData.slice((currentPage - 1) * pageSize, currentPage*pageSize) -->
    <el-table :data="filterAutomobileInfs.slice((fy.currentPage-1)*fy.pageSize,fy.currentPage*fy.pageSize)"
      style="width: 100%">
      <!-- 用户头像 -->

      <el-table-column label="头像" prop="pic">
        <template #default="scope">
          <el-avatar :src="scope.row.pic" />
        </template>
      </el-table-column>
      <!-- 注册事件 -->
      <el-table-column label="注册时间" prop="rejdate" />
      <!-- 用户id -->
      <el-table-column label="权限" prop="state" />
      <!-- 用户姓名 -->
      <el-table-column label="姓名" prop="name">
        <template #default="scope">
          <span>{{scope.row.name}}</span>
          <el-tag v-if="scope.row.name==uname" class="ml-2" type="danger" style="margin-left:5px">当前</el-tag>
          <el-tag v-if="scope.row.name=='admin'&&uname!='admin'" class="ml-2" type="warning">超级管理员</el-tag>
        </template>

      </el-table-column>
      <!-- 用户级别 -->
      <el-table-column label="电话" prop="iphone" />
      <!-- 用户状态 -->
      <!-- <el-table-column label="状态" prop="state">
        <template #default="scope">
          <el-switch v-model="scope.row.state" style="margin-left:-3px" @change="change(scope.row)" />
        </template>
      </el-table-column> -->
      <el-table-column align="right">
        <!-- 用户搜索 -->
        <template #header>
          <el-input v-model="search" size="small" suffix-icon="Search" placeholder="用户搜索"><i slot="suffix"
              class="el-input__ icon el-icon-date"></i></el-input>
        </template>
        <!-- 用户相关操作 -->
        <template #default="scope">
          <el-button v-if="uname=='admin'||scope.row.name==uname" size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button v-if="uname=='admin'||scope.row.name==uname" size="small" type="danger"
            @click="handleDelete(scope.$index, scope.row)">
            注销
          </el-button>
          <el-tag v-if="uname!='admin'&&scope.row.name!=uname" class="ml-2" type="info">无权限修改</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- <el-pagination @current-change="handleCurrentChange" small background layout="prev, pager, next" hide-on-single-page
      :default-page-size="2" pager-count="2" :total="tableData.length" class="mt-4" style="margin-top:10px" /> -->

    <el-pagination v-model:currentPage="fy.currentPage" v-model:page-size="fy.pageSize" :page-sizes="[3, 5, 8, 20]"
      :small="fy.small" layout="total, sizes, prev, pager, next, jumper" :total=fy.sss
      @size-change="fy.handleSizeChange" @current-change="fy.handleCurrentChange" />

    <!-- Dialog 对话框 -->
    <el-dialog v-model="dialogVisible" :title="title" width="45%" draggable style="min-width:400px">
      <template #footer>
        <el-form :model="form" label-width="70px" ref="ruleFormRef" :rules="rules">
          <el-row justify="center">
            <!-- 用户头像上传列 -->
            <el-col v-if="useState==0">
              <div class="demo-type">
                <el-avatar :size="80">
                  <img :src=form.pic2 />
                </el-avatar>
              </div>
              <el-row justify="center" style="margin-top:17px;margin-bottom:20px">
                <el-upload ref="upload" class="upload-demo" :action="imgUrl+'api/upload'" name="files"
                  :show-file-list="false" :before-upload="handleBefore" :on-success="handleAvatarSuccess">
                  <el-button type="primary">
                    上传<el-icon class="el-icon--right">
                      <Upload />
                    </el-icon>
                  </el-button>
                </el-upload>
              </el-row>
            </el-col>
            <!-- 用户信息编辑列 -->
            <el-row justify="center" style="text-align:center;flex-direction:column;padding:15px;width:400px">
              <!-- 姓名编辑 -->
              <el-form-item label="姓名：" v-if="useState==1" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
              <!-- 电话编辑 -->
              <el-form-item label="电话：" v-if="form.name==uname||uname=='admin'" prop="iphone">
                <el-input v-model="form.iphone" />
              </el-form-item>
              <!-- 密码编辑 -->
              <el-form-item label="密码：" v-if="useState==1||uname=='admin'" prop="pass">
                <el-input class="ico" style="position:relative" :type="view?'text':'password'"
                  :suffix-icon="accordingTo?0:view?'View':'Hide'" v-model="form.pass">
                </el-input>
                <i v-if="form.pass!=''" style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;"
                  @click="toView()"></i>
              </el-form-item>
              <!-- 状态编辑 -->
              <el-form-item label="权限：" v-if="form.name!=uname">
                <el-switch v-model="form.state" />
              </el-form-item>
              <!-- 信息提交与取消 -->
              <span class="dialog-footer" style="text-align:right;padding-bottom:15px">
                <el-button @click="dialogVisible = false" style="margin-top:15px">取消</el-button>
                <el-button type="primary" @click="confirm(form.id,ruleFormRef)" style="margin-top:15px">
                  确认
                </el-button>
              </span>
            </el-row>
          </el-row>
        </el-form>
      </template>
    </el-dialog>
  </el-main>
</template>

<script lang="ts" setup>
import { computed, reactive, Ref, ref, getCurrentInstance } from "vue";
//信息提示
import type { FormInstance, ElMessage } from "element-plus";
import { Edit } from "@element-plus/icons-vue"; //图标
import { nanoid } from "nanoid"; //id随机生成文件
import * as dayjs from "dayjs"; //引入格式化时间插件

import { useRouter } from "vue-router";
// 解密token文件
import jwt_decode from "jwt-decode";
let { uname }: any = jwt_decode(localStorage.getItem("token"));
const router = useRouter();
const imgUrl = "http://192.168.3.21:3000/";
const props = defineProps(["body"]);

const { proxy } = getCurrentInstance();

let title = ref();

let tableData: any = reactive({ arr: [] });
(proxy as any).$axios
  .post("/api/udata", {})
  .then((data) => {
    fy.sss = data.data.length;
    data.data.forEach((item) => {
      if (item.headphoto == " ") item.headphoto = "default.webp";
      let obj = {
        id: item.id,
        rejdate: item.rejTime.slice(0, 10),
        name: item.username,
        iphone: item.phone,
        state: item.exist == "false" ? "已注销" : "正在使用",
        pic: imgUrl + item.headphoto,
      };
      if (obj.name != uname) {
        tableData.arr.push(obj);
      } else {
        tableData.arr.unshift(obj);
      }
    });
  })
  .catch((err) => {
    // url重定向
    router.push({
      path: "/login",
    });
  });

let useData = {}; //用来保存编辑行对象

// 点击头像上传时
const handleBefore = (file) => {
  // form.pic = rawFile.name;
  const url = window.URL || window.webkitURL;
  const img = new Image(); // 手动创建一个Image对象
  img.src = url.createObjectURL(file); // 创建Image的对象的url

  return new Promise((resolve, reject) => {
    const isLt2M = file.size / 1024 / 1024 < 200;
    form.pic2 = img.src;
    resolve(file);
    // 判断数据库里有没有，是否重新上传*****************
  });
};

// 图片上传成功后
const handleAvatarSuccess = (res, file) => {
  if (res.status) {
    ElMessage({ message: "上传成功！", type: "success" });
    form.pic2 = imgUrl + res.msg;
  } else {
    ElMessage.error(res.msg);
  }
  // form.pic = URL.createObjectURL(file.raw);
};

interface User {
  id: string;
  date: string;
  name: string;
  iphone: number;
  state: boolean;
  pic: string;
  pass: string;
}

// 用户搜索
const search = ref("");
const filterTableData = computed(() =>
  tableData.arr.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.iphone.includes(search.value.toLowerCase())
  )
);

// 每页显示的条数
const aNumberOf: Ref<number> = ref(6);
const pagesize = ref(2); //设置每页显示条目个数为10
const currentPage1 = ref(1);
let filterAutomobileInfs = ref(filterTableData); //分页前的数据

const fy = reactive({
  pageSize: 8,
  currentPage: 1,
  small: false,
  handleSizeChange: () => {},
  handleCurrentChange: () => {},
  sss: 10,
});
const c = () => {
  fy.sss = tableData.arr.length;
};
let view: Ref<boolean> = ref(false);
let accordingTo: Ref<boolean> = ref(false);
//用户密码查看
const toView = () => {
  view.value = !view.value;
};

let useState: Ref<number> = ref(0); //用户编辑状态
// 用户编辑按钮
const dialogVisible: Ref<boolean> = ref(false);
const handleEdit = (index: number, row) => {
  title.value = "用户编辑";
  useState.value = 0;
  useData = row;
  dialogVisible.value = true;
  form.name = row.name;
  form.pic2 = row.pic;
  form.state = row.state == "已注销" ? false : true;
  form.iphone = row.iphone;
  form.id = row.id;
  form.pass = row.pass;
};
// User information editing
interface Editor {
  id: string;
  name: string;
  pic: string;
  pic2: string;
  state: boolean;
  iphone: number;
  pass: string;
}
// 编辑框数据
const form: Editor = reactive({
  id: "",
  name: "",
  pic: "",
  pic2: "",
  state: false,
  iphone: 12,
  pass: "",
});

const ruleFormRef = ref<FormInstance>();
const validateUser = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名！"));
  } else {
    if (form.iphone!) {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    let regular = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,10}$/;
    if (!regular.test(value)) {
      callback(new Error("用户名的长度为6-30位，由字母、数字或下划线组成"));
    } else {
      callback();
    }
  }
};

const validateIphone = (rule: any, value: any, callback: any) => {
  if (value === undefined) {
    callback(new Error("请输入手机号！"));
  } else {
    if (form.pass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    let regular =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!regular.test(value)) {
      callback(new Error("手机号格式不正确！"));
    } else {
      callback();
    }
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    accordingTo.value = !accordingTo.value;
    callback(new Error("请输入密码！"));
  } else {
    if (form.pass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    let regular = /^[A-Za-z\d.?]{6,16}$/;
    if (!regular.test(value)) {
      callback(new Error("格式不正确，输入应为6~16个字符串"));
    } else {
      callback();
    }
  }
};

const rules = reactive({
  name: [{ validator: validateUser, trigger: "blur" }],
  iphone: [{ validator: validateIphone, trigger: "blur" }],
  pass: [{ validator: validatePass, trigger: "blur" }],
});

// 提交编辑后的数据
const confirm = (id, formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
  c();
  if (useState.value == 1) {
    if (!form.name || !form.pass || !form.iphone) {
      ElMessage.error("操作失败");
      return;
    }
    // 确认添加用户操作
    let nano_id = nanoid();
    const obj = {
      id: nano_id,
      rejdate: dayjs().format("YYYY-MM-DD"),
      name: form.name,
      iphone: form.iphone,
      state: form.state,
      pic: form.pic2,
      pass: form.pass,
    };
    const obj2 = {
      uname: form.name.toString(),
      pwd: form.pass.toString(),
      phone: form.iphone,
      headphoto: form.pic2,
    };
    //数据存入请求
    (proxy as any).$axios.post("/api/rej", obj2).then((data) => {
      if (data.status == 200) {
        dialogVisible.value = false;
        obj.state = obj.state != false ? "正在使用" : "已注销";
        tableData.arr.splice(1, 0, obj);
        ElMessage({
          message: "添加成功！",
          type: "success",
        });
      }
    });
  } else {
    let pic = form.pic2.split("/");
    //修改用户数据
    let obj = {
      setStr:
        "phone=" +
        "'" +
        form.iphone +
        "'" +
        "," +
        "headphoto=" +
        "'" +
        pic[pic.length - 1] +
        "'" +
        "," +
        "exist=" +
        "'" +
        form.state +
        "'",
      uname: form.name,
    };
    if (form.pass != undefined) {
      (proxy as any).$axios
        .post("/api/upduser", {
          setStr: `password=${form.pass}`,
          uname: form.name,
        })
        .then((data) => {});
    }
    (proxy as any).$axios.post("/api/upduser", obj).then((data) => {
      form.pic = form.pic2;
      if (data.status == 200) {
        for (let k in useData) {
          if (k != "rejdate") useData[k] = form[k];
          if (k == "state")
            useData[k] = useData[k] != false ? "正在使用" : "已注销";
        }
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
      dialogVisible.value = false;
    });

    // (proxy as any).$axios
    //   .get("/a", { id: id })
    //   .then((res) => {
    //     //请求成功
    //     dialogVisible.value = false;
    //     tableData.arr.forEach((item, index) => {
    //       if (item.id == id) {
    //         item.name = form.name;
    //         item.pic = form.pic;
    //         item.state = form.state;
    //         item.iphone = form.iphone;
    //       }
    //     });
    //     ElMessage({
    //       message: "修改成功！",
    //       type: "success",
    //     });
    //   })
    //   .catch((err) => {
    //     ElMessage.error("修改失败！");
    //   });
  }
};

// 用户添加
const addUser = () => {
  if (uname != "admin")
    return ElMessage.error("当前用户不可添加，请联系超级管理员");
  title.value = "用户添加";
  useState.value = 1;
  form.pic2 = "http://192.168.3.21:3000/images/werf645654454.webp";
  form.name = "";
  form.state = false;
  form.iphone = undefined;
  form.id = undefined;
  form.pass = "";
  dialogVisible.value = true;
};

// 删除用户
const handleDelete = (index1: number, row) => {
  if (row.state == "已注销") return 0;
  if (row.name == uname) return ElMessage.error("当前用户仅可编辑！");
  row.state = "已注销";
  tableData.arr.forEach((item, index) => {
    if (index == index1) {
      //修改用户数据

      let obj = {
        setStr: "exist='false'",
        uname: row.name,
      };
      (proxy as any).$axios.post("/api/upduser", obj).then((data) => {
        if (data.status == 200) {
          dialogVisible.value = false;
          ElMessage.success("注销成功！");
        }
      });
    }
  });
};
// 状态开关
const change = (row) => {
  if (row.name == uname) {
    row.state = true;
    return ElMessage.error("操作失败，当前用户仅可编辑！");
  }
  //修改用户数据
  let obj = {
    setStr: "exist=" + "'" + row.state + "'",
    uname: row.name,
  };
  (proxy as any).$axios.post("/api/upduser", obj).then((data) => {
    dialogVisible.value = false;
  });
};

let arr = [
  {
    id: "001",
    date: "2016-05-03",
    name: "Tom",
    iphone: 1,
    state: false,
    pic: "https://img2.baidu.com/it/u=2833484760,1116678162&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1668013200&t=0f66fb0b0c8670655bd38337d6e8ddd4",
    pass: "123456",
  },
  {
    id: "002",
    date: "2016-05-02",
    name: "John",
    iphone: 1,
    state: true,
    pic: "https://img0.baidu.com/it/u=242752498,3264950281&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    pass: "123456",
  },
  {
    id: "003",
    date: "2016-05-04",
    name: "Morgan",
    iphone: 2,
    state: true,
    pic: "https://img1.baidu.com/it/u=1244677718,3581533383&fm=253&fmt=auto&app=138&f=PNG?w=500&h=546",
    pass: "123456",
  },
  {
    id: "004",
    date: "2016-05-01",
    name: "Jessy",
    iphone: 2,
    state: false,
    pic: "https://img2.baidu.com/it/u=2164373940,1521803105&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=800",
    pass: "123456",
  },
];
</script>

<style lang="less" scoped>
.title {
  font-size: 25px;
  line-height: 2.5;
}
.demo-type {
  display: flex;
  justify-content: center;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.el-dialog__body {
  padding: 10px;
}
.ico span {
  position: absolute;
}
</style>
