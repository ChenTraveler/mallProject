<template>
  <!-- Form -->
  <el-button text
             @click="fn"
             class="btn">
    修改
  </el-button>

  <el-dialog v-model="dialogFormVisible"
             title="修改地址">
    <el-form :model="form">
      <el-form-item label="地址信息(Division):"
                    :label-width="formLabelWidth">
        <el-cascader size="large"
                     :options="options"
                     :placeholder="'请选择省/市/区'"
                     v-model="selectedOptions"
                     @change="handleChange" /> <span>{{form.Tname}}</span>
      </el-form-item>
      <el-form-item label="详细地址(Detail):"
                    :label-width="formLabelWidth">
        <el-input v-model="form.address"
                  autocomplete="off"
                  :placeholder="'请输入详细地址'"
                  @blur=form.blur /> <span>{{form.Taddress}}</span>
      </el-form-item>
      <el-form-item label="收货人姓名:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.peopleName"
                  autocomplete="off"
                  :placeholder="'长度不超过25个字符'" /><span>{{form.TpeopleName}}</span>
      </el-form-item>
      <el-form-item label="手机号码:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.telephone"
                  autocomplete="off"
                  :placeholder="'电话号码、手机号码必须填一致'" /><span>{{form.Ttelephone}}</span>
      </el-form-item>
      <el-row class="mb-4 dd">
        <el-button type="primary"
                   @click="form.fn">保存</el-button>
      </el-row>
    </el-form>
  </el-dialog>

</template>

<script  setup>
import bus from '../../bus.js'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { regionData, CodeToText } from 'element-china-area-data'
let list = reactive({
  list: '',
})
onMounted(() => {
  list.list = JSON.parse(localStorage.getItem('list'))
  bus.on('index', (x) => {
    form.sum = x
  })
})

const options = ref(regionData)
const selectedOptions = ref([])
const handleChange = () => {
  console.log(selectedOptions)
  if (
    selectedOptions.value[0] != null &&
    selectedOptions.value[1] != null &&
    selectedOptions.value[2] != null
  ) {
    const str =
      CodeToText[selectedOptions.value[0]] +
      '/' +
      CodeToText[selectedOptions.value[1]] +
      '/' +
      CodeToText[selectedOptions.value[2]]
    console.log(str)
    localStorage.setItem('str', str)
  }
  return {
    options,
    fn,
  }
}
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
function fn() {
  form.Taddress = ''
  form.TpeopleName = ''
  form.Ttelephone = ''
  form.Tname = ''
  dialogFormVisible.value = !dialogFormVisible.value
}
const name = reactive({
  str: '',
  address: '',
  peopleName: '',
  telephone: '',
})
const form = reactive({
  blur() {
    form.address = form.address
    console.log(form.address)
  },
  // 省市区
  name: '',
  // 地址详情
  address: '',
  // 收货人姓名
  peopleName: '',
  // 手机号码
  telephone: '',
  Taddress: '',
  TpeopleName: '',
  Ttelephone: '',
  Tname: '',
  sum: '',
  fn() {
    form.Taddress = ''
    form.TpeopleName = ''
    form.Ttelephone = ''
    form.Tname = ''
    if (form.address.trim().length > 5 && form.address.trim().length < 120) {
      form.Taddress = ''
    } else {
      form.Taddress = '详细地址长度需要在5-120个汉字或字符'
    }
    if (
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
        form.telephone
      )
    ) {
      form.Ttelephone = ''
    } else {
      form.Ttelephone = '请输入正确的手机号码'
    }

    if (
      form.peopleName.trim().length < 25 &&
      form.peopleName.trim().length > 1
    ) {
      form.TpeopleName = ''
    } else {
      form.TpeopleName = '收货人姓名长度需要在2-25个汉字'
    }
    if (selectedOptions._rawValue[0] === undefined) {
      form.Tname = '请输入正确的地址信息'
    } else {
      form.Tname = ''
    }
    if (
      form.Tname === '' &&
      form.TpeopleName === '' &&
      form.Ttelephone === '' &&
      form.Taddress === ''
    ) {
      dialogFormVisible.value = !dialogFormVisible.value
      // console.log(111);
      name.str = localStorage.getItem('str')
      name.address = form.address
      name.peopleName = form.peopleName
      name.telephone = form.telephone
      bus.emit('xi', [
        name.str,
        name.address,
        name.peopleName,
        name.telephone,
        form.sum,
      ])
      form.address = ''
      form.peopleName = ''
      form.telephone = ''
    }
  },
})
</script>
<style scoped>
.btn {
  color: #c97;
  position: absolute;
  bottom: 8px;
  left: 9px;
}
.btn:hover {
  color: red;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
span {
  color: red;
  font-size: 12px;
  margin-left: 20px;
}
</style>