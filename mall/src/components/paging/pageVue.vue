<template>
  <div class="wrap">
    <!-- 版心 -->
    <div class="banner">
      <!-- 顶部栏 -->
      <div class="top">
        <div class="left"><img src="images/index/f1.jpg"
               alt="">
        </div>
        <div class="right">
          <img src="../../../images/index/f2.jpg"
               alt="">
          <div class="ss"><input type="text"
                   v-model="data.ipt">
            <i><img src="../../../images/index/ss.png"
                   alt=""></i>
          </div>
        </div>
      </div>
      <!-- 顶部选项卡 -->
      <div class="nav">
        <div v-for="(item,index) in list.data"
             :key="index"
             :class="list.isnav==index?'navs':''"
             @click="list.nav(index)">
          <!-- <router-link :to="item.routers"
                       @click="list.nav(index)">{{item.nums}}</router-link> -->
          <span @click="list.nav(index)"> {{item}}</span>
        </div>
      </div>
      <!-- 顶部内容 -->
      <div class="tab">
        <!-- 顶部内容收起栏 -->
        <div class="t_top">
          <div class="left">
            <span>所有分类 ></span>
            <!-- <label for="">
              <input type="text"
                     placeholder="在当前结果中搜索"
                     onfocus="value=''">
              <i><img src="../../../images/index/ss.png"
                     alt=""></i>
            </label> -->
          </div>
          <div class="right"
               @click="tt.tab">
            <img src="../../../images/paging/jlt.png"
                 alt=""
                 v-show="!tt.istt">
            <img src="../../../images/paging/jia.png"
                 alt=""
                 v-show="tt.istt">
          </div>

        </div>
        <!-- 顶部内容收起部分 -->
        <div class="t_t"
             v-show="!tt.istt">
          <div class="t_cont">
            <div class="l_l">
              <img src="../../../images/paging/right.png"
                   alt="">
              <div class="sss">所有分类</div>
            </div>
            <div class="lll">
              <ul :style="open.isopen?'':'max-height:58px'">
                <li v-for="(item,index) in lists"
                    :key="index">{{item}}</li>

              </ul>
              <div class="gd"
                   @click="open.tab">
                <span>更多</span>
                <img src="../../../images/paging/bottom.png"
                     alt=""
                     v-show="!open.isopen">
                <img src="../../../images/paging/top.png"
                     alt=""
                     v-show="open.isopen">
              </div>
            </div>
          </div>

          <div class="t_cont"
               v-for="(item,index) in datas"
               :key="index"
               v-show="index<gd.shownum">
            <div class="l_l">
              <div class="sss">{{item.title}}</div>
            </div>
            <div class="lll"
                 v-show="!(dx.isdx === index)">
              <ul>
                <li v-for="(mmm,index) in
                                    item.arr"
                    :key="index">{{mmm}}</li>
              </ul>
              <!-- <div class="gd">
                <div class="dx"
                     @click="dx.tab(index)">+ 多选</div>
              </div> -->
            </div>
            <div class="lll_1"
                 v-show="dx.isdx === index">
              <ul>
                <li v-for="(mmm,index) in
                                    item.arr"
                    :key="index">{{mmm}}</li>
              </ul>
              <div class="gd">
                <div class="dx">
                  <div class="dete">
                    <span class="detes">确定</span>
                    <span @click="dx.tab()">取消</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="t_foot">
            <div class="kong"></div>
            <div class="gdxx"
                 @click="gd.tab">
              <span v-show="!gd.isgd">更多选项</span>
              <span v-show="gd.isgd">精简选项</span>

              <img src="../../../images/paging/bottom.png"
                   alt=""
                   v-show="!gd.isgd">
              <img src="../../../images/paging/top.png"
                   alt=""
                   v-show="gd.isgd">
            </div>
          </div>
        </div>
      </div>
      <!--  -->

      <!-- 顶部内容底部 -->
      <div class="filter">
        <div class="left">
          <div :class="{zh:true, bbb:data.active === 'zh'}"
               @click="data.xz('zh')">综合排序</div>
          <div :class="{bbb:data.active === 'xl'}"
               @click="data.xz('xl')"><span>销量</span>
            <img src="../../../images/paging/top1.png"
                 alt="">
            <img src="../../../images/paging/topred.png"
                 alt=""
                 class="aaa">
          </div>
          <div :class="{bbb:data.active === 'xp'}"
               @click="data.xz('xp')"><span>新品</span>
            <img src="../../../images/paging/top1.png"
                 alt="">
            <img src="../../../images/paging/topred.png"
                 alt=""
                 class="aaa">
          </div>
          <div :class="{bbb:data.active === 'sc'}"
               @click="data.xz('sc')"><span>收藏</span>
            <img src="../../../images/paging/top1.png"
                 alt=""> <img src="../../../images/paging/topred.png"
                 alt=""
                 class="aaa">
          </div>
          <div :class="{bbb:data.active === 'jg'}"
               @click="data.xz('jg')"><span>价格</span>
            <!-- <img src="../../../images/paging/jg.png"
                 alt=""> -->
            <img src="../../../images/paging/top1.png"
                 alt=""> <img src="../../../images/paging/topred.png"
                 alt=""
                 class="aaa">
          </div>
        </div>
        <div class="inp">
          <input type="text"
                 v-model="data.minp">
          <img src="../../../images/paging/qian.png"
               alt=""> - <input type="text"
                 v-model="data.maxp">
          <img src="../../../images/paging/qian.png"
               alt="">
        </div>
        <!-- <div class="inps">
          <input type="checkbox"> <span>店铺VIP商品</span>
        </div> -->
        <div class="inpss">
          <!-- <router-link to="/page/big"> -->
          <div :class="da.iscon?'datu':''"
               @click="da.dada"><img src="../../../images/paging/datu.png"
                 alt=""
                 v-show="da.iscons">
            <img src="../../../images/paging/dred.png"
                 alt=""
                 v-show="da.iscon"><span>大图</span>
          </div>
          <!-- </router-link> -->
          <!-- <router-link to="/page/small"> -->
          <div :class="da.iscons?'datu':''"
               @click="da.xiao"><img src="../../../images/paging/xiaotu.png"
                 alt=""
                 v-show="da.iscon">
            <img src="../../../images/paging/xred.png"
                 alt=""
                 v-show="da.iscons"><span>小图</span>
          </div>
          <!-- </router-link> -->
        </div>
        <!-- <div class="inpsss">
          <span>1/15</span>
          <div class="zuo"><img src="../../../images/paging/top.png"
                 alt=""></div>
          <div class="you"><img src="../../../images/paging/top.png"
                 alt=""></div>
        </div> -->
      </div>

      <!-- <router-view> -->
      <!-- big  v-show==-->
      <div class="conr">
        <FenYe></FenYe>
        <bigs v-show="da.iscon"></bigs>
        <smalls v-show="da.iscons"> </smalls>

      </div>
      <!-- smaill -->
      <!-- </router-view> -->

    </div>
    <FooterVueVue></FooterVueVue>
  </div>

</template>

<script>
import {
  reactive,
  getCurrentInstance,
  watch,
  watchEffect,
  onUnmounted,
  onBeforeUnmount,
} from 'vue'
import { useRouter } from 'vue-router'
import bus from '../../bus.js'
import bigs from './MainBig.vue'
import smalls from './MainSmaill.vue'
import FenYe from '../FenYe.vue'
import FooterVueVue from '../public/FooterVue.vue'
import { onBeforeMount } from 'vue'

export default {
  components: {
    bigs,
    smalls,
    FenYe,
    FooterVueVue,
  },
  setup() {
    onBeforeMount(() => {
      document.documentElement.scrollTop = 0
    })
    const { proxy } = getCurrentInstance()
    const $router = useRouter()

    //选项卡
    const list = reactive({
      data: [
        '首页',
        '所有商品',
        '项链',
        '手饰',
        '戒指',
        '耳饰',
        '套装',
        '手表',
        '家居配饰',
      ],
      isnav: 1,
      nav(index) {
        list.isnav = index
        if (list.data[list.isnav] === '首页') {
          $router.push('/index')
        }
      },
    })

    bus.on('pageClick', (v) => {
      console.log(v)
      list.isnav = v
    })

    //筛选
    const data = reactive({
      data: [],
      other: () =>
        `where type like "%${
          list.data[list.isnav] === '所有商品' ? '' : list.data[list.isnav]
        }%" `,
      getdata(other) {
        proxy.$axios
          .post('/seldata', {
            table: 'goods',
            other,
          })
          .then((d) => {
            data.data = d.data
            // console.log(d)
            bus.emit('data', data.data)
          })
          .catch((err) => console.log(err))
      },
      ipt: '',
      jgflag: true,
      active: 'zh',
      minp: '',
      maxp: '',
      xz(v) {
        data.active = ''
        data.active = v
      },
      sx(v) {
        const other = {
          //综合
          zh: () => {
            return `order by id `
          },
          //销量
          xl: () => {
            return `order by sales desc `
          },
          //新品
          xp: () => {
            return `and datediff(now(),launchTime) < 28 `
          },
          //收藏
          sc: () => {
            return `order by collection desc `
          },
          //价格
          jg: () => {
            data.jgflag = !data.jgflag
            if (data.jgflag) {
              return `order by price desc `
            } else {
              return `order by price `
            }
          },
          // 搜索
          ipt: () => {
            if (data.ipt !== '') {
              return `and title like "%${data.ipt}%" `
            } else {
              return ` `
            }
          },
          // 价格区间
          jgqj: () => {
            const map = [
              [
                () =>
                  data.minp !== '' &&
                  data.maxp != '' &&
                  /^\d+$/.test(data.minp) &&
                  /^\d+$/.test(data.maxp),
                () => `and price between ${data.minp} and ${data.maxp} `,
              ],
              [
                () => data.minp !== '' && /^\d+$/g.test(data.minp),
                () => `and price > ${data.minp} `,
              ],
              [
                () => data.maxp !== '' && /^\d+$/g.test(data.maxp),
                () => `and price < ${data.maxp} `,
              ],
            ]

            const target = map.find((i) => i[0]())

            if (target) {
              return target[1]()
            } else {
              return ` `
            }
          },
        }

        data.getdata(
          data.other() + other['ipt']() + other['jgqj']() + other[v]()
        )
      },
    })

    // 监听获取数据
    watchEffect(() => {
      data.getdata(data.other())
    })
    // 监听价格区间搜索获取数据
    watchEffect(() => {
      data.sx(data.active)
    })
    //内容清单
    const lists = reactive([
      '所有折扣',
      '满300-50清单',
      '88vip专享',
      '时髦率性',
      '甜美灵动',
      '首降折扣',
      '现货6折',
      '专区限时85折起',
      '限时优惠11.3',
      '现货4折',
      '加购',
      'UNA&红天鹅',
      '加价购竹子专区 ',
      'D11开门红',
      'SS21',
      '127系列',
    ])
    //内容选项
    const datas = reactive([
      { title: '直径', arr: ['20mm以下'] },
      { title: '机芯产地', arr: ['瑞士', '中国'] },
      { title: '防水深度', arr: ['50m'] },
      { title: '颜色分类', arr: ['白色'] },
      { title: '坠子材料', arr: ['合金', 'Swarovski水晶'] },
    ])
    //多选
    const dx = reactive({
      isdx: '',
      tab(index) {
        dx.isdx = index
      },
    })

    const tt = reactive({
      istt: false,
      tab() {
        tt.istt = !tt.istt
      },
    })
    const open = reactive({
      isopen: false,
      tab() {
        open.isopen = !open.isopen
      },
    })
    //更多
    const gd = reactive({
      isgd: false,
      shownum: 3,
      tab() {
        gd.isgd ? (gd.shownum = 3) : (gd.shownum = datas.length)
        gd.isgd = !gd.isgd
      },
    })
    //大图
    const da = reactive({
      iscon: true,
      iscons: false,
      xiao() {
        da.iscon = false
        da.iscons = true
      },
      dada() {
        da.iscon = true
        da.iscons = false
      },
      tab() {
        da.isda = !da.isda
      },
    })
    //筛选
    const sx = reactive({
      issx: false,
      tab() {
        sx.issx = !sx.issx
      },
    })

    return {
      list,
      lists,
      datas,
      dx,
      tt,
      open,
      gd,
      da,
      sx,
      data,
      onUnmounted,
      onBeforeUnmount,
    }
  },
}
</script>

<style lang="stylus" scoped>
.wrap {
  min-width: 1200px;
  overflow: hidden;

  .banner {
    width: 990px;
    margin: 0 auto;
  }

  .conr {
    display: flex;
    margin-top: 10px;
  }

  .top {
    width: 990px;
    margin: 0 auto;
    display: flex;
  }

  .left img {
    width: 738px;
    height: 124px;
  }

  .right {
    .ss {
      width: 250px;
      position: relative;

      input {
        width: 250px;
        height: 25px;
        font-size: 14;
        outline: none;
        border: 1px solid #000;
        padding-left: 10px;
      }

      img {
        width: 18px;
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
  }

  .nav {
    width: 990px;
    height: 30px;
    font-size: 15px;
    margin: 0 auto 0 auto;
    display: flex;
    color: #888;
    border-bottom: 1px solid #333;
    justify-content: center;
    cursor: pointer;

    a {
      text-decoration: none;
      color: #000;
    }

    div {
      text-align: center;
      width: 65px;
      margin: 5px 30px 0 0;
    }

    .navs {
      border-bottom: 3px solid #000;
    }
  }

  .tab {
    width: 990px;
    margin: 0 auto;
    border-top-right-radius: 10px;

    .t_top {
      height: 30px;
      border: 1px solid rgb(230, 226, 225);
      background-color: rgb(249, 249, 249);
      position: relative;
    }

    .left {
      position: relative;
      float: left;
      margin-left: 30px;
      top: 2px;

      input {
        width: 160px;
        line-height: 16px;
        border-radius: 50px;
        color: rgb(117, 117, 117);
        outline: none;
        padding: 2px 0 0 10px;
      }

      img {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 5px;
        right: 5px;
      }

      span {
        font-size: 14px;
        margin-right: 10px;
      }
    }

    .right {
      width: 25px;
      height: 25px;
      float: right;
      position: absolute;
      top: 0;
      right: 0;

      img {
        width: 25px;
        height: 25px;
      }
    }

    .t_cont {
      display: flex;
      border: 1px solid rgb(230, 226, 225);

      .l_l {
        width: 10%;
        height: auto;
        background-color: #f7f5f5;
        color: rgb(176, 165, 159);
        font-size: 14px;
        padding-left: 10px;
        display: flex;

        .sss {
          margin: 5px 0 0 3px;
        }

        img {
          width: 10px;
          height: 10px;
          margin-top: 10px;
        }
      }

      .lll_1 {
        float: left;
        background-color: #FFF;
        position: relative;
        width: 90%;
        padding: 4px 0 0 0;
        overflow: hidden;
        margin: 0;
        background-color: rgb(239, 235, 234);
        height: 65px;

        .cz {
          li {
            width: 7%;
          }
        }

        ul {
          position: relative;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin: 0 30px 0 40px;
          justify-content: flex-start;

          li {
            list-style: none;
            color: rgb(128, 111, 102);
            font-size: 14px;
            width: 17%;
            height: 22px;
            margin: 5px 10px 0 0;
          }

          li:hover {
            color: rgb(193, 0, 1);
            cursor: pointer;
          }
        }

        .gd {
          .dx {
            .dete {
              display: flex;
              justify-content: center;

              span {
                border: 1px solid #000;
                width: 40px;
                height: 20px;
                cursor: pointer;
                border-color: #ccc;
                margin-left: 20px;
                text-align: center;
                font-size: 12px;
                line-height: 20px;
                background-color: #ccc;
                user-select: none;
              }

              .detes {
                display: block;
                width: 40px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                font-weight: 400;
                border: 1px solid #ccc;
                background: #f2f2f2;
                color: #c5c5c5;
                cursor: default;
              }
            }
          }
        }
      }

      .lll {
        float: left;
        background-color: #FFF;
        position: relative;
        width: 90%;
        padding: 4px 0 0 0;
        overflow: hidden;
        margin: 0;

        .cz {
          li {
            width: 7%;
          }
        }

        ul {
          position: relative;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin: 0 30px 0 40px;
          justify-content: flex-start;

          li {
            list-style: none;
            color: rgb(128, 111, 102);
            font-size: 14px;
            width: 17%;
            height: 22px;
            margin: 5px 10px 0 0;
          }

          li:hover {
            color: rgb(193, 0, 1);
            cursor: pointer;
          }

          .lis {
            width: 10%;
          }
        }

        .gd {
          display: flex;
          position: absolute;
          float: right;
          width: 60px;
          height: 20px;
          top: 3px;
          right: 3px;
          cursor: pointer;
          user-select: none;

          span {
            width: 30px;
            font-size: 12px;
            margin-right: 20px;
            font-weight: 100;
            position: absolute;
            right: -5px;
            top: 3px;
          }

          img {
            width: 15px;
            height: 15px;
            position: absolute;
            right: 5px;
            top: 3px;
          }

          .dx {
            font-size: 13px;
            text-align: center;
            width: 50px;
            height: 18px;
            background-color: rgb(239, 235, 234);
            position: absolute;
            font-weight: 100;
            right: 55px;
            top: 4px;

            .dete {
              width: 200px;

              span {
                display: block;
                border: 1px solid #000;
              }
            }
          }
        }

        .gd:hover {
          color: rgb(193, 0, 1);
          cursor: pointer;
        }
      }
    }

    .t_foot {
      display: block;
      height: 30px;
      position: relative;
      top: -1px;
      z-index: 2;

      .kong {
        background: #EFEBEA;
        border: 1px solid #EBE4DE;
        border-top: 0;
        display: block;
        font-size: 0;
        height: 4px;
        line-height: 2px;
        overflow: hidden;
      }

      .gdxx {
        background-color: #EFECEB;
        border-color: #EFECEB #E6E2E1 #E6E2E1;
        border-style: solid;
        border-width: 1px;
        position: absolute;
        top: 4px;
        right: 0;
        z-index: 1;
        display: block;
        height: 16px;
        width: 85px;
        color: #806F66;
        font-size: 12px;
        line-height: 14px;
        text-indent: 12px;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;

        img {
          width: 15px;
          height: 15px;
          position: absolute;
          top: 0;
          right: 5px;
        }
      }

      .gdxx:hover {
        color: rgb(193, 0, 1);
      }
    }
  }

  .filter {
    width: 990px;
    margin: 0 auto 0 auto;
    padding-left: 5px;
    display: flex;
    background-color: rgb(250, 249, 249);
    height: 25px;
    font-size: 12px;

    div {
      width: 300px;
      display: flex;
      border: 1px solid #999;
      color: rgb(128, 111, 102);
      position: relative;
      cursor: pointer;

      img {
        width: 10px;
        height: 10px;
        position: absolute;
        right: 2px;
        top: 6px;
      }

      .aaa {
        display: none;
      }

      span {
        margin-left: 5px;
        line-height: 20px;
        cursor: pointer;
        user-select: none;
      }
    }

    .fff {
      background-color: rgb(241, 237, 236);
      color: #b10000;
    }

    .bbb {
      color: #b10000;
      cursor: pointer;
      background-color: rgb(241, 237, 236);

      img {
        display: block;
      }
    }

    .kb {
      padding-right: 12px;
    }

    .bgc {
      background-color: rgb(241, 237, 236);
      color: #b10000;
    }

    .zh {
      width: 400px;
      font-size: 14px;
      padding-right: 12px;
      padding-left: 5px;
      cursor: pointer;
    }

    .inp {
      width: 120px;
      margin-left: 10px;
      position: relative;
      background-color: rgb(241, 237, 236);

      input {
        width: 42px;
        padding-left: 12px;
        outline: none;
      }

      img {
        position: absolute;
        width: 15px;
        height: 15px;
        left: 0;
        top: 4px;
      }

      img:nth-child(2) {
        left: 63px;
      }
    }

    .inps {
      width: 100px;
      margin-left: 10px;
      position: relative;
      border: 0;
      color: rgb(128, 111, 102);
      position: relative;

      span {
        position: absolute;
        left: 16px;
        top: 2px;
      }
    }

    .inpss {
      width: 120px;
      margin-left: 10px;
      position: relative;
      border: 0;
      color: rgb(128, 111, 102);
      position: relative;
      top: 2px;

      div {
        border: 1px solid #666;
        width: 30px;
        height: 20px;
        padding-left: 15px;

        img {
          position: absolute;
          left: 2px;
          top: 5px;
        }

        span {
          position: absolute;
          left: 10px;
          top: -1px;
        }
      }

      .datu {
        color: #b10000;
        background-color: rgb(241, 237, 236);
      }

      div:hover {
        color: #b10000;
        cursor: pointer;
      }
    }

    .inpsss {
      width: 120px;
      margin-left: 10px;
      border: 0;
      color: rgb(128, 111, 102);
      position: relative;
      right: -200px;
      top: 2px;

      div {
        border: 1px solid #666;
        width: 10px;
        height: 20px;
        padding-left: 15px;
        margin-left: 5px;
      }

      .zuo {
        img {
          position: absolute;
          width: 20px;
          height: 20px;
          right: 3px;
          top: 0;
          transform: rotate(-90deg);
          background-color: rgb(241, 237, 236);
        }
      }

      .you {
        img {
          position: absolute;
          width: 20px;
          height: 20px;
          right: 3px;
          top: 0;
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>