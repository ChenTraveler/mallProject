<template>
  <div class="bigFather">
    <div class="head">
      <h2>商品分类</h2>
      <el-button text
                 @click="form.dialogFormVisible = true"
                 class="btn1">
        添加分类
      </el-button>
    </div>
    <el-table :data="tableData.data"
              max-height="620"
              class="d1"
              style="width: 100%; margin-bottom: 20px"
              row-key="value"
              border>
      <el-table-column prop="label"
                       label="分类名称"
                       align="center" />
      <el-table-column prop="flag"
                       label="是否上市"
                       align="center">
      </el-table-column>
      <el-table-column prop="dj"
                       label="等级"
                       align="center" />
      <el-table-column label="编辑"
                       align="center">
        <template #default="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加商品的弹窗 -->
    <el-dialog v-model="form.dialogFormVisible"
               title="请选择你要添加的数据">
      <el-form>
        <el-form-item label="请输入添加的分类名称">
          <el-input autocomplete="off"
                    v-model="form.name" />
        </el-form-item>
        <el-form-item label="请输入添加的层级">
          <div class="example-block">
            <el-cascader :options="tableData.data"
                         :props="props1"
                         placeholder="分类名称"
                         clearable
                         v-model="form.cj">
              <template #default="{data}">
                <span>{{data.label}}</span>
              </template>
            </el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="form.dialogFormVisible = false">取消</el-button>
          <el-button type="primary"
                     @click="fn2">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑商品的弹窗 -->
    <el-dialog v-model="form1.dialogFormVisible"
               title="请选择你要修改的数据">
      <el-form>
        <el-form-item label="请输入修改的分类名称">
          <el-input autocomplete="off"
                    v-model="form1.name" />
        </el-form-item>
        <el-form-item label="是否上市">
          <select v-model="form1.flag">
            <option>是</option>
            <option>否</option>
          </select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="form1.dialogFormVisible = false">取消</el-button>
          <el-button type="primary"
                     @click="fn1">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { fromPairs } from 'lodash'
import { InfoFilled, Lollipop } from '@element-plus/icons-vue'
import {
  computed,
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watchEffect,
} from 'vue'
const { proxy } = getCurrentInstance()
const props1 = {
  checkStrictly: true,
}
// 添加的点击确定的点击事件
const tableData = reactive({
  datay: [],
  data: computed(() => {
    const data = []
    // const obj = {}
    tableData.datay.forEach((i) => {
      const map = [
        [
          () => i.id[2] !== '0',
          () => {
            data[i.id[0] - 1].children[i.id[1] - 1].children[i.id[2] - 1] = {
              label: i.name,
              value: i.id,
              flag: i.flag,
              dj: '三级',
            }
          },
        ],
        [
          () => i.id[1] !== '0',
          () => {
            data[i.id[0] - 1].children[i.id[1] - 1] = {
              label: i.name,
              value: i.id,
              flag: i.flag,
              dj: '二级',
              children: [],
            }
          },
        ],
        [
          () => i.id[0] !== '0',
          () => {
            data[i.id[0] - 1] = {
              label: i.name,
              value: i.id,
              flag: i.flag,
              dj: '一级',
              children: [],
            }
          },
        ],
      ]

      const target = map.find((i) => i[0]())

      if (target) {
        target[1]()
      }
    })
    return data
  }),
  getdata() {
    proxy.$axios
      .post('/seldata', { table: 'type' })
      .then((d) => {
        tableData.datay = d.data
      })
      .catch((err) => console.log(err))
  },
})

// 获取数据
tableData.getdata()

// 点击编辑
const handleEdit = (index,data) => {
  form1.dialogFormVisible = true
  form1.name = data.label
  form1.flag = data.flag
  form1.id = data.value
  
}
const form = reactive({
  dialogFormVisible: false,
  name: '',
  cj: '',
})
const form1 = reactive({
  dialogFormVisible: false
})
const fn1 = () => {
  form1.dialogFormVisible = false
  proxy.$axios
        .post('/updtype', {
          name:form1.name,
          id:form1.id,
          flag:form1.flag
        })
        .then((d) => {
         alert(d.data)
         tableData.getdata()
        })
        .catch((err) => console.log(err))
  
}
const fn2 = () => {
  form.dialogFormVisible = false
  const ids = () => {
    return form.cj[2]
      ? false
      : form.cj[1]
      ? [
          form.cj[0][0],
          form.cj[1][1],
          tableData.data[form.cj[1][0] - 1].children[form.cj[1][1] - 1].children
            .length + 1,
        ]
      : form.cj[0]
      ? [
          form.cj[0][0],
          tableData.data[form.cj[0][0] - 1].children.length + 1,
          0,
        ]
      : [tableData.data.length + 1, 0, 0]
  }

  if (ids()) {
    if (form.name) {
      proxy.$axios
        .post('/adddata', {
          table: 'type',
          field: 'name,id',
          data: `"${form.name}","${ids().join('')}"`,
        })
        .then((d) => {
          alert('添加成功')
          tableData.getdata()
          form.cj = ''
        })
        .catch((err) => console.log(err))
    } else {
      alert('请输入分类名称')
    }
  } else {
    alert('最高三级分类')
  }
}
</script>

<style scoped>
h2 {
  margin: 30px;
}
.bigFather {
  width: 100%;

}
.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn1 {
  height: 50px;
  margin-right: 50px;
  background-color: #3ba8fd !important;
  color: #fff !important;
  font-weight: 700;
}

</style>