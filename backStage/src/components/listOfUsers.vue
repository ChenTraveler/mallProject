<template>
  <el-main>
    <el-row>
      <el-col :span="24" class="title">
        用户列表
      </el-col>
    </el-row>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="头像" prop="name" />
      <el-table-column label="注册时间" prop="date" />
      <el-table-column label="id" prop="name" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="级别" prop="level" />
      <el-table-column label="状态" prop="id">
        <el-switch :id_dat="tableData.id" v-model="tableData.state" style="margin-left:-3px" @click="fn()" />
      </el-table-column>
      <el-table-column align="right" prop="state">
        <template #header>
          <el-input v-model="search" size="small" placeholder="用户搜索" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";

interface User {
  id: string;
  date: string;
  name: string;
  level: number;
  state: boolean;
  address: string;
}
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const fn = (e) => {
  console.log(e);
};

const tableData: User[] = [
  {
    id: "001",
    date: "2016-05-03",
    name: "Tom",
    level: 1,
    state: false,
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: "002",
    date: "2016-05-02",
    name: "John",
    level: 1,
    state: true,
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: "003",
    date: "2016-05-04",
    name: "Morgan",
    level: 2,
    state: true,
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: "004",
    date: "2016-05-01",
    name: "Jessy",
    level: 2,
    state: true,
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style lang="less" scoped>
.title {
  font-size: 25px;
  line-height: 2.5;
}
</style>
