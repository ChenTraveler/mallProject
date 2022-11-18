import { createStore, } from 'vuex'
import axios from '../axios'

export default createStore({
  state: {  //数据存放的位置
        data:[],
      //总价
      sum:0,
      //控制全选按钮
      allcheck:false,
      //单选选中个数
      radio:0,
      //判断购物车是否为空
      empty : false,
      // 存放选中结算商品的id
      ids:[]
  },
  getters:{
    
  },
  mutations: {//在mutations写方法更改state中的值
    // 接收数据
  GETDATA(state,data){
    state.data = data
    if(state.data){
      state.sum=0
      state.radio=0
      state.allcheck=false
      state.empty=false
    }
    if(state.data.length===0){
      state.empty=true
    }
  },

  //  改变单选状态
   RADIO(state,id){
    state.radio=0
    state.data.forEach((i)=>{
      //判断点击的是哪个商品
      if(i.id===id){
        // 判断是否为选中状态并进行更改
        if(i.flag==='f'){
          i.flag='t'
        }else if(i.flag==='t'){
          i.flag='f'
        }
        // 根据状态总价加减
        if(i.flag==='t'){
          state.sum = ((i.num*i.price) + state.sum*1 ).toFixed(2)
        }
        else{
          state.sum = (state.sum*1- (i.num*i.price) ).toFixed(2)
        }
      } 
      // 根据状态确定选中个数
      if(i.flag==='t'){
        state.radio= state.radio*1 +1
      }
      // 根据选中个数控制全选按钮
      if(state.radio===state.data.length){
        state.allcheck=true
      }else{
        state.allcheck=false
      }
    })
   },
  //  数量加
   ADD(state,id){
    state.data.forEach((i)=>{
      //判断点击的是哪个商品
      if(id===i.id){
        i.num += 1
        // 改变数据库对应的数据
        axios.post('/updcart',{setStr:`num=${i.num}`,id}).then(d=>{
          // console.log(d);
        }).catch(err=>console.log(err))

        // 最大数量为10
        if(i.num>=10){
          i.num=10
          axios.post('/updcart',{setStr:`num=${i.num}`,id}).then(d=>{
            // console.log(d);
          })
        }
      }
    })
    // 先清空总价，再遍历选中的商品价格相加
    state.sum=0
    state.data.forEach((i)=>{
      if(i.flag==='t'){
        state.sum = (state.sum*1+(i.num*i.price)).toFixed(2)
      }
    })
   },
  //  数量减
   SUB(state,id){
    state.data.forEach((i)=>{
      //判断点击的是哪个商品
      if(id===i.id){
        i.num -= 1
        // 改变数据库对应的数据
        axios.post('/updcart',{setStr:`num=${i.num}`,id}).then(d=>{
          // console.log(d);
        }).catch(err=>console.log(err))

        // 最少为1件
        if(i.num<=0){
          i.num=1
           // 改变数据库对应的数据
        axios.post('/updcart',{setStr:`num=${i.num}`,id}).then(d=>{
          // console.log(d);
        })
        }
        // 先清空总价，再遍历选中的商品价格相加
        state.sum=0
        state.data.forEach((i)=>{
          if(i.flag==='t'){
            state.sum = (state.sum*1+(i.num*i.price)).toFixed(2)
          }
        })
      }
    })
   },
  //  全选
  CHECKALL(state,flag){
      state.radio=0
      // 改变全选按钮状态
      state.allcheck=!state.allcheck
      // 根据全选按钮状态改变商品单选状态
      state.data.forEach((i)=>{
        if(state.allcheck===true){
          i.flag='t'
        }else{
          i.flag='f'
        }
      })
      // 根据全选按钮状态改变总价
      if(state.allcheck===true){
        state.sum=0
        state.data.forEach((i)=>{
          state.sum = (state.sum*1 +(i.num*i.price)).toFixed(2)
        })
        state.radio = state.data.length
      }else{
        state.sum=0
        state.radio=0
      }
  },

  // 删除
  DEL(state,id){
    state.data.forEach((i,index)=>{
      //判断点击的是哪个商品
      if(i.id===id){
        // 如果为选中状态，总价减去当前商品价钱
       if(i.flag==='t'){
         state.sum = (state.sum*1- (i.num*i.price) ).toFixed(2)
       }
      //  状态改为不显示
        i.isshow='f'
         // 改变数据库对应的数据
         axios.post('/delcart',{id}).then(d=>{
          console.log(d);
        }).catch(err=>console.log(err))

        // 删除当前数据，方便操作
        state.data.splice(index,1)
      }
    })
    // 清空单选个数，再循环确定选中个数
    state.radio=0
    state.data.forEach((i)=>{
      if(i.flag==='t'){
        state.radio= state.radio*1 +1
      }
      // 判断是否全部选中，改变全选按钮状态
      if(state.radio===state.data.length){
        state.allcheck=true
      }else{
        state.allcheck=false
      }
    })
    // 判断是否全部删除
    if(state.data.length===0){
      state.allcheck=false
      state.empty=true
    }
  },

  //删除已选商品
  DELSELECT(state){

    state.data.forEach((i)=>{
      let id = 0
      if(i.flag==='t'){
        id=i.id
        i.isshow='f'
        // 改变数据库对应的数据
         axios.post('/delcart',{id}).then(d=>{
          console.log(d);
        }).catch(err=>console.log(err))
      }
    })

    // 删除选中，并把选中个数清空
    state.radio=0
    state.data=state.data.filter((i)=>{
      return i.flag==='f'
    })
  
    // 清空总价，并判断是否全部删除
    state.sum=0
    if(state.data.length===0){
      state.allcheck=false
      state.empty=true
    }
  },
  //手动输入数量
  MANUAL(state,num){
    let id = 0
    state.data.forEach((i)=>{
      //判断更改的是哪个商品
      if(i.id===num[0]){
        // 如果大于限制数，则为限制数
        if(num[1]>=i.mostnum){
          i.num=1
          i.num=i.mostnum
          id=i.id
          // 改变数据库对应的数据
          axios.post('/updcart',{setStr:`num=${i.num}`,id}).then(d=>{
            // console.log(d);
          }).catch(err=>console.log(err))
        }

        // 如果小于0或者为空，则为1
        if(num[1]<=1 || num[1]===''){
          i.num=10
          i.num=1
          id=i.id
           // 改变数据库对应的数据
           axios.post('/updcart',{setStr:`num=${i.num}`,id}).then(d=>{
            // console.log(d);
          }).catch(err=>console.log(err))
        }

        // 如果为1~10之间，则向下取整
        if(num[1]>1 && num[1]<i.mostnum){
          i.num=10
          i.num=Math.floor(num[1])
          id=i.id
           // 改变数据库对应的数据
           axios.post('/updcart',{setStr:`num=${i.num}`,id}).then(d=>{
            // console.log(d);
          }).catch(err=>console.log(err))
        }
      }
    })
      // 判断是否为选中，输入数量改变总价
      state.sum=0
      state.data.forEach((i)=>{
        if(i.flag==='t'){
          state.sum = (state.sum*1+(i.num*i.price)).toFixed(2)
          
        }
      })
  },

  // 结算
  ACCOUNT(state,data){
    state.ids=[]
    state.data.forEach((i)=>{
      if(i.flag==='t'){
        state.ids.push(i.id)
      }
    })
  }

  },
  actions: {//通过actions触发mutations的方法
  
  },
  modules: {
	  
  }
})