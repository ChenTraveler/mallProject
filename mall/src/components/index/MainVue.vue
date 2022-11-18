<template>
  <div class="banner">
    <PicUp />
    <LunBo></LunBo>
    <PicUptwo></PicUptwo>
    <PicMid />
    <PicDown />
    <div class="foot"></div>

  </div>
</template>

<script>
import { provide, reactive, getCurrentInstance, toRefs } from 'vue'
import PicUp from './PicUp.vue'
import PicUptwo from './PicUptwo.vue'
import LunBo from './LunBo.vue'
import PicMid from './PicMid.vue'
import PicDown from './PicDown.vue'
import bus from '../../bus.js' // 引入mitt

export default {
  components: {
    PicUp,
    PicMid,
    PicDown,
    PicUptwo,
    LunBo,
  },
  setup() {
    // 定义一个空数组接收数据
    const data = reactive({
      data: [],
    })
    // 解构代理
    const { proxy } = getCurrentInstance()
    // 获取数据
    proxy.$axios
      .post('/seldata', { table: 'goods' })
      .then((d) => {
        data.data = d.data
        // 向子组件传送数据
        // bus.on('detailsClicK', (x) => {
        //   console.log(x)
        // })
        setTimeout(() => {
          data.data = data.data.filter((i) => {
            return i.id < 4
          })
          bus.emit('picUp', data.data)
        })
      })
      .catch((err) => console.log(err))

    return {
      data,
    }
  },
}
</script>

<style lang="stylus" scoped>
.banner {
  position: relative;
  width: 1910px;
  margin: 0 auto;
  margin-top: 10px;
  overflow: hidden;

  img {
    margin-top: -4px;
  }

  .foot {
    height: 300px;
    position: relative;

    .footImg {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -56px;
    }
  }
}
</style>