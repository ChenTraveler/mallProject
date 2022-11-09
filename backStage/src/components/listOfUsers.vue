<template>
  <el-main>
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
    <el-table :data="filterTableData" style="width: 100%">
      <!-- 用户头像 -->
      <el-table-column label="头像" prop="pic">
        <template #default="scope">
          <el-avatar :src="scope.row.pic" />
        </template>
      </el-table-column>
      <!-- 注册事件 -->
      <el-table-column label="注册时间" prop="date" />
      <!-- 用户id -->
      <el-table-column label="id" prop="id" />
      <!-- 用户姓名 -->
      <el-table-column label="姓名" prop="name" />
      <!-- 用户级别 -->
      <el-table-column label="级别" prop="level" />
      <!-- 用户状态 -->
      <el-table-column label="状态" prop="state">
        <template #default="scope">
          <el-switch v-model="scope.row.state" style="margin-left:-3px" @change="change(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="right" prop="state">
        <!-- 用户搜索 -->
        <template #header>
          <el-input v-model="search" size="small" suffix-icon="Search" placeholder="用户搜索"><i slot="suffix"
              class="el-input__ icon el-icon-date"></i></el-input>
        </template>
        <!-- 用户相关操作 -->
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination small background layout="prev, pager, next" hide-on-single-page :default-page-size="7"
      pager-count="5" :total="tableData.length" class="mt-4" style="margin-top:10px" />
    <!-- Dialog 对话框 -->
    <el-dialog v-model="dialogVisible" title="用户编辑" width="45%" draggable style="min-width:400px">
      <template #footer>
        <el-form :model="form" label-width="70px">
          <el-row justify="center">
            <!-- 用户头像上传列 -->
            <el-col :xs="4" :sm="6" :md="8" :lg="10" :xl="8" style="min-width:200px">
              <div class="demo-type">
                <el-avatar :size="80">
                  <img :src=form.pic />
                </el-avatar>
              </div>
              <el-row justify="center" style="margin-top:17px;margin-bottom:20px">
                <el-upload ref="upload" class="upload-demo" :on-success="handleAvatarSuccess"
                  action="https://jsonplaceholder.typicode.com/posts/" :limit="1" :on-exceed="handleExceed"
                  :show-file-list="false" :before-upload="handleBefore">
                  <el-button type="primary">
                    上传<el-icon class="el-icon--right">
                      <Upload />
                    </el-icon>
                  </el-button>
                </el-upload>
              </el-row>
            </el-col>
            <!-- 用户信息编辑列 -->
            <el-col :xs="4" :sm="6" :md="8" :lg="10" :xl="8" style="min-width:200px">
              <!-- 姓名编辑 -->
              <el-form-item label="姓名：">
                <el-input v-model="form.name" />
              </el-form-item>
              <!-- 级别编辑 -->
              <el-form-item label="级别：">
                <el-select v-model="form.level" placeholder="please select your zone">
                  <el-option label="1级" value="1" />
                  <el-option label="2级" value="2" />
                  <el-option label="3级" value="3" />
                  <el-option label="4级" value="4" />
                </el-select>
              </el-form-item>
              <!-- 密码编辑 -->
              <el-form-item label="密码：">
                <el-input :type="view?'text':'password'" :suffix-icon="view?'View':'Hide'" v-model="form.pass">
                </el-input>
                <i style="position:absolute;right:0;width:25px;height:18px;cursor:pointer;" @click="toView()"></i>
              </el-form-item>
              <!-- 状态编辑 -->
              <el-form-item label="状态：">
                <el-switch v-model="form.state" />
              </el-form-item>
              <!-- 信息提交与取消 -->
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm(form.id)">
                  确认
                </el-button>
              </span>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-dialog>
  </el-main>
</template>

<script lang="ts" setup>
import { computed, reactive, Ref, ref, getCurrentInstance } from "vue";
//信息提示
import  {
  FormInstance,
  ElMessage,
  UploadProps,
  UploadUserFile,
  UploadInstance,
  UploadRawFile,
  genFileId,
} from "element-plus";
import { Edit } from "@element-plus/icons-vue"; //图标
import { nanoid } from "nanoid"; //id随机生成文件
import * as dayjs from "dayjs"; //引入格式化时间插件

const { proxy } = getCurrentInstance();

const upload = ref<UploadInstance>();

// 超出文件限制时执行的函数
const handleExceed: UploadProps["onExceed"] = (files) => {
  // upload.value!.clearFiles();
  // const file = files[0] as UploadRawFile;
  // file.uid = genFileId();
  // upload.value!.handleStart(file);
};

// const submitUpload = () => {
//   upload.value!.submit();
// };

// 每页显示的条数
const aNumberOf: Ref<number> = ref(6);

// 图片上传时
const handleBefore = (file) => {
  // form.pic = rawFile.name;
  const url = window.URL || window.webkitURL;
  const img = new Image(); // 手动创建一个Image对象
  img.src = url.createObjectURL(file); // 创建Image的对象的url

  return new Promise((resolve, reject) => {
    const isLt2M = file.size / 1024 / 1024 < 200;
    if (file.type != "image/jpeg" && file.type != "image/png") {
      ElMessage.error("上传格式不对！");
      reject();
    } else {
      form.pic = img.src;
      ElMessage({ message: "上传成功！", type: "success" });
      resolve(file);
    }
    // 判断数据库里有没有，是否重新上传*****************
  });
};

// 图片上传成功后
const handleAvatarSuccess = (res, file) => {
  console.log(res, file);
  form.pic = URL.createObjectURL(file.raw);
};

interface User {
  id: string;
  date: string;
  name: string;
  level: number;
  state: boolean;
  pic: string;
  pass: string;
}

// 用户搜索
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.id.toLowerCase().includes(search.value.toLowerCase())
  )
);

let view: Ref<boolean> = ref(false);
//用户密码查看
const toView = () => {
  console.log(1);
  view.value = !view.value;
  console.log(view.value);
};

let useState = 0; //用户编辑状态
// 用户编辑
const dialogVisible = ref(false);
const handleEdit = (index: number, row: User) => {
  useState = 1;
  console.log(index, row);
  dialogVisible.value = true;
  form.name = row.name;
  form.pic = row.pic;
  form.state = row.state;
  form.level = row.level;
  form.id = row.id;
  form.pass = row.pass;
};

// User information editing
interface Editor {
  id: string;
  name: string;
  pic: string;
  state: boolean;
  level: number;
  pass: string;
}
// 编辑框数据
const form = reactive({
  id: "",
  name: "",
  pic: "",
  state: undefined,
  level: undefined,
  pass: undefined,
});

const onSubmit = () => {
  console.log("submit!");
};

// 提交编辑后的数据
const confirm = (id) => {
  if (!form.name || !form.pass) {
    ElMessage.error("操作失败");
    return;
  }
  if (useState == 0) {
    // 确认添加用户操作
    let nano_id = nanoid();
    const obj = {
      id: nano_id,
      date: dayjs().format("YYYY-MM-DD"),
      name: form.name,
      level: form.level,
      state: form.state,
      pic: form.pic,
      pass: form.pass,
    };
    tableData.push(obj);
    //数据存入请求
    (proxy as any).$axios.get("/a", obj).then((data) => {
      dialogVisible.value = false;
      successful();
    });
  } else {
    //修改用户数据
    (proxy as any).$axios
      .get("/a", { id: id })
      .then((res) => {
        //请求成功
        dialogVisible.value = false;
        tableData.forEach((item, index) => {
          if (item.id == id) {
            item.name = form.name;
            item.pic = form.pic;
            item.state = form.state;
            item.level = form.level;
          }
        });
        successful();
      })
      .catch((err) => {
        failure();
      });
  }
};

// 用户添加
const addUser = () => {
  useState = 0;
  form.pic = "";
  form.name = "";
  form.state = undefined;
  form.level = undefined;
  form.id = undefined;
  form.pass = "";
  dialogVisible.value = true;
};

// 删除用户
const handleDelete = (index1: number, row: User) => {
  console.log(index1, row);
  tableData.forEach((item, index) => {
    if (index == index1) {
      tableData.splice(index1, 1);

      (proxy as any).$axios
        .get("/a", { id: row.id })
        .then((res) => {
          //请求成功
          console.log("res", res);
          successful();
        })
        .catch((err) => {
          failure();
        });
    }
  });
};

// 登入成功信息提示
const successful = () => {
  ElMessage({
    message: "操作成功！",
    type: "success",
  });
};
//登入失败信息提示
const failure = () => {
  ElMessage.error("操作失败");
};

// 状态开关
const change = (row) => {
  (proxy as any).$axios
    .get("/a", { id: row.id })
    .then((res) => {
      //请求成功
      console.log("res", res);
      successful();
    })
    .catch((err) => {
      failure();
    });
};

// 数据
const tableData: User[] = reactive([
  {
    id: "001",
    date: "2016-05-03",
    name: "Tom",
    level: 1,
    state: false,
    pic: "https://img2.baidu.com/it/u=2833484760,1116678162&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1668013200&t=0f66fb0b0c8670655bd38337d6e8ddd4",
    pass: "No. 189, Grove St, Los Angeles",
  },
  {
    id: "002",
    date: "2016-05-02",
    name: "John",
    level: 1,
    state: true,
    pic: "https://img0.baidu.com/it/u=242752498,3264950281&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    pass: "No. 189, Grove St, Los Angeles",
  },
  {
    id: "003",
    date: "2016-05-04",
    name: "Morgan",
    level: 2,
    state: true,
    pic: "https://img1.baidu.com/it/u=1244677718,3581533383&fm=253&fmt=auto&app=138&f=PNG?w=500&h=546",
    pass: "No. 189, Grove St, Los Angeles",
  },
  {
    id: "004",
    date: "2016-05-01",
    name: "Jessy",
    level: 2,
    state: false,
    pic: "https://img2.baidu.com/it/u=2164373940,1521803105&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=800",
    pass: "No. 189, Grove St, Los Angeles",
  },
]);
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
</style>
