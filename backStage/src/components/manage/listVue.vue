<template>
  <div class="fathers">
    <div class="d1">
      <h2>商品详情</h2>
      <button @click="add">添加商品</button>
    </div>
    <div class="father5">
      <el-table :data="tableData.datay.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column prop="number" label="商品货号" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="parameter" label="参数" align="center" />
        <el-table-column prop="prices" label="价格" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="stock" label="库存" align="center" />
        <el-table-column prop="colortext" label="颜色" align="center" />

        <!-- 上传多张图片 -->
        <el-table-column label="封面图片" align="center">
          <template #default="scope">
            <<<<<<< HEAD <img v-for="(item,index) in tableData.datay[scope.$index].imgs.split(';')" :key="index"
              :src="serveUrl + item" alt="" width="40">
              =======
              <img v-for="(item,index) in tableData.datay[scope.row.id-1].imgs.split(';')" :key="index"
                :src="serveUrl + item" alt="" width="40">
              >>>>>>> de422bed82d8c7e297b964161ee0a84da24d40e7
          </template>
        </el-table-column>
        <el-table-column label="轮播图片" align="center">
          <template #default="scope">
            <<<<<<< HEAD <img v-for="(item,index) in tableData.datay[scope.$index].swiper.split(';')" :key="index"
              :src="serveUrl + item" alt="" width="40">
              =======
              <img v-for="(item,index) in tableData.datay[scope.row.id-1].swiper.split(';')" :key="index"
                :src="serveUrl + item" alt="" width="40">
              >>>>>>> de422bed82d8c7e297b964161ee0a84da24d40e7
          </template>
        </el-table-column>
        <el-table-column label="颜色图片" align="center">
          <template #default="scope">
            <img v-for="(item,index) in tableData.datay[scope.row.id-1].colorimg.split(';')" :key="index"
              :src="serveUrl + item" alt="" width="40">
          </template>
        </el-table-column>

        <el-table-column prop="launchTime" label="上架时间" align="center">
        </el-table-column>
        <el-table-column prop="offshelfTime" label="下架时间" align="center">
        </el-table-column>
        <el-table-column label="编辑" width="250" align="center">
          <template #default="scope">
            <el-button @click="handle('bj',scope.$index,scope.row)">编辑</el-button>
            <el-button @click="handles('xj',scope.$index,scope.row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[2, 4, 5, 6]"
        layout="total, sizes, prev, pager, next, jumper" :total="300" />
    </div>
    <!-- 修改商品的弹窗 -->
    <el-dialog v-model="form.dialogFormVisible" title="请选择你要修改的类型">
      <el-form>
        <el-form-item label="上架时间">
          <input type="text" v-model="form.launchTime" disabled>
        </el-form-item>
        <el-form-item label="请输入修改的参数">
          <el-input v-model="form.parameter" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入修改的价格">
          <el-input v-model="form.prices" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入修改的库存">
          <el-input v-model="form.stock" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入修改的颜色">
          <el-input v-model="form.colortext" autocomplete="off" />
        </el-form-item>

        <span>添加封面图片:</span>
        <el-upload ref="upload" class="upload-demo" :on-success="handleAvatarSuccess1" :action="serveUrl + 'api/upload'"
          name="files" :show-file-list="true" multiple :before-upload="handleBefore">
          <el-button type="primary">
            上传<el-icon class="el-icon--right">
              <Upload />
            </el-icon>
          </el-button>
        </el-upload>

        <span>添加轮播图片:</span>
        <el-upload ref="upload" class="upload-demo" multiple :on-success="handleAvatarSuccess2"
          :action="serveUrl + 'api/upload'" name="files" :show-file-list="true" :before-upload="handleBefore">
          <el-button type="primary">
            上传<el-icon class="el-icon--right">
              <Upload />
            </el-icon>
          </el-button>
        </el-upload>
        <span>添加颜色图片:</span>
        <el-upload ref="upload" class="upload-demo" multiple :on-success="handleAvatarSuccess3"
          :action="serveUrl + 'api/upload'" name="files" :show-file-list="true" :before-upload="handleBefore">
          <el-button type="primary">
            上传<el-icon class="el-icon--right">
              <Upload />
            </el-icon>
          </el-button>
        </el-upload>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="form.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="fn1">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加商品的弹窗 -->
    <el-dialog v-model="form1.dialogFormVisible" title="请选择你要添加的数据">
      <el-form-item label="请输入添加的货号" :aria-disabled="true">
        <el-input v-model="form1.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="请输入添加的标题" :aria-disabled="true">
        <el-input v-model="form1.title" autocomplete="off" />
      </el-form-item>
      <el-form>
        <el-form-item label="请输入添加的参数">
          <el-input v-model="form1.parameter" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入添加的价格">
          <el-input v-model="form1.prices" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入添加的库存">
          <el-input v-model="form1.stock" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入添加的颜色">
          <el-input v-model="form1.colortext" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请输入添加的类型">
          <el-input v-model="form1.type" autocomplete="off" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="form1.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="fn2">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import {
  computed,
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
} from 'vue'

const serveUrl = 'http://192.168.3.21:3000/'

// 图片上传pagination

// 点击头像上传时
const handleBefore = (file) => {
  // form.pic = rawFile.name;
  const url = window.URL || window.webkitURL
  const img = new Image() // 手动创建一个Image对象
  img.src = url.createObjectURL(file) // 创建Image的对象的url

  return new Promise((resolve, reject) => {
    const isLt2M = file.size / 1024 / 1024 < 200
    form.pic2 = img.src
    resolve(file)
    // 判断数据库里有没有，是否重新上传*****************
  })
}

// 图片上传成功后
const handleAvatarSuccess1 = (res, file) => {
  if (res.status) {
    ElMessage({ message: '上传成功！', type: 'success' })
    form.imgs = res.msg
  } else {
    ElMessage.error(res.msg)
  }
}
const handleAvatarSuccess2 = (res, file) => {
  if (res.status) {
    ElMessage({ message: '上传成功！', type: 'success' })
    form.swiper = form.swiper.concat(res.msg)
  } else {
    ElMessage.error(res.msg)
  }
}
const handleAvatarSuccess3 = (res, file) => {
  if (res.status) {
    ElMessage({ message: '上传成功！', type: 'success' })
    form.colorimg = form.colorimg.concat(res.msg)
  } else {
    ElMessage.error(res.msg)
  }
}
const cg = () => {
  console.log('上传成功了')
}
const scq = (rawFile) => {
  console.log(rawFile)
}
// 添加的点击事件
const submitUpload3 = () => {
  console.log('添加颜色图片')
}
const submitUpload2 = () => {
  console.log('添加轮播图片')
}
const submitUpload1 = () => {
  console.log('添加封面图片')
}

const tableData = reactive({
  datay: [],
  getdata () {
    // 获取数据
    proxy.$axios
      .post('/details')
      .then((d) => {
        for (let i = 0; i < d.data.length; i++) {
          d.data[i].launchTime = d.data[i].launchTime.slice(0, 10)
          d.data[i].offshelfTime
            ? (d.data[i].offshelfTime = d.data[i].offshelfTime.slice(0, 10))
            : null
        }
        tableData.datay = d.data
        console.log(tableData.datay)
      })
      .catch((err) => console.log(err))
  },
})
const { proxy } = getCurrentInstance()
tableData.getdata()

// 默认翻到第几页
const currentPage = ref(1)
// 默认一页几条数据
const pageSize = ref(30)
const submitUpload = () => {
  upload.value.submit()
}

const form = reactive({
  dialogFormVisible: false,
  parameter: '', //参数
  prices: '', //价格
  stock: '', //库存
  colortext: '', //颜色
  number: '',
  launchTime: '', //上架时间
  colorimg: [], //颜色图片
  swiper: [], // 轮播图片
  imgs: '', //封面图片
})
const form1 = reactive({
  dialogFormVisible: false,
  parameter: '', //参数
  prices: '', //价格
  stock: '', //库存
  colortext: '', //颜色
  imgs: '',
  number: '',
  title: '',
  type: '',
  isnum: true,
})
// 点击添加商品事件
const add = () => {
  form1.dialogFormVisible = true
}
// 点击下架、
const handles = (a, b, c) => {
  proxy.$axios
    .post('/updgoods', {
      setStr: 'offshelfTime=now()',
      number: c.number,
    })
    .then((d) => {
      console.log(d)
    })
    .catch((err) => console.log(err))
  // 下架时间上去后重新拉取
  setTimeout(() => {
    tableData.getdata()
  }, 100)
}
// 点击编辑事件
const handle = (a, b, c) => {
  console.log(c)
  form.dialogFormVisible = true
  form.number = c.number
  form.prices = c.prices
  form.parameter = c.parameter
  form.stock = c.stock
  form.colortext = c.colortext
  form.launchTime = c.launchTime
}
//点击编辑后确定事件
const fn1 = () => {
  form.dialogFormVisible = false
  // 上传封面图片
  proxy.$axios
    .post('/updgoods', {
      setStr: `imgs='${form.imgs}'`,
      number: form.number,
    })
    .then((d) => {
      form.imgs = ''
      console.log(d)
    })
    .catch((err) => console.log(err))
  proxy.$axios
    .post('/upddetails', {
      setStr: `parameter='${form.parameter}',prices='${form.prices}',stock='${form.stock
        }',colortext='${form.colortext}',swiper= '${form.swiper.join(
          ';'
        )}', colorimg='${form.colorimg.join(';')}'`,
      number: form.number,
    })
    .then((d) => {
      console.log(d)
      form.colorimg = []
      form.swiper = []
    })
    .catch((err) => console.log(err))
  // 上传完数据以后重新拉取数据更新
  setTimeout(() => {
    tableData.getdata()
  }, 100)
}

const fn2 = () => {
  form1.dialogFormVisible = false
  for (let i = 0; i < tableData.datay.length; i++) {
    if (tableData.datay[i].number === parseInt(form1.number)) {
      form1.isnum = false
      break
    } else {
      form1.isnum = true
    }
  }
  if (form1.isnum) {
    // 先添加商品goods
    proxy.$axios
      .post('/adddata', {
        table: 'goods',
        field: 'number,price,title,imgs,type,launchTime',
        data: `${form1.number},${form1.prices.split(';')[0]},'${form1.title
          }','123456','${form1.type}',now()`,
      })
      .then((d) => {
        console.log(d)
        // 如果前面添加成功再添加details表
        if (d.status === 200) {
          console.log('判断成功了')
          proxy.$axios
            .post('/adddata', {
              table: 'details',
              field: 'number,parameter,prices,stock,colortext',
              data: `${form1.number},'${form1.parameter}','${form1.prices}','${form1.stock}','${form1.colortext}'`,
            })
            .then((d) => {
              // 添加以后重新拉取数据
              setTimeout(() => {
                console.log('重新拉去数据了')
                tableData.getdata()
              }, 100)
              console.log(d)
            })
            .catch((er) => console.log(err))
        }
      })
      .catch((er) => console.log(err))

    setTimeout(() => {
      form1.launchTime = ''
      form1.type = ''
      form1.title = ''
      form1.imgs = ''
      form1.number = ''
      form1.parameter = ''
      form1.prices = ''
      form1.stock = ''
      form1.colortext = ''
      form1.swiper = ''
      form1.colorimg = ''
    }, 200)
  } else {
    ElMessage({
      showClose: true,
      message: '货号已经存在',
      center: true,
    })
  }
}
</script>
<style>
h2 {
  margin: 25px;
}
.father5 {
  box-sizing: border-box;
  /* padding: 20px 0px 10px 50px; */
  max-height: 615px;
  overflow: auto;
}
.d1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.d1 > button {
  width: 110px;
  height: 55px;
  background-color: #3ca7fd !important;
  color: #fff;
  margin-right: 50px;
}
.el-upload {
  width: 50px;
  height: 50px;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 50px;
  height: 50px;
}
.el-pagination {
  width: 650px;
  margin: 0 auto;
}
.fathers {
  width: 100%;
  overflow-x: hidden;
}
.demo-pagination-block {
  margin-top: 20px;
}
</style>