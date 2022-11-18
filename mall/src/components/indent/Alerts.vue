<template>
  <div>
    <span>地址信息：</span>
    <el-cascader size="large"
                 :options="options"
                 :placeholder="'请选择省/市/区'"
                 v-model="selectedOptions"
                 @change="handleChange" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { regionData, CodeToText } from 'element-china-area-data'
const options = ref(regionData)
const selectedOptions = ref([])
const handleChange = () => {
  console.log(selectedOptions.value)
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
  }
  return {
    options,
  }
}
</script>

