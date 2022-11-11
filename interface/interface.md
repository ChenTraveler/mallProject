## 请求的根路径

> http://localhost:3000/api

## 表格

### 商品列表

- 列表名称：goods

+ 参数格式：

| 参数名称     | 参数类型 | 是否必选             | 参数说明     |
| ------------ | -------- | -------------------- | ------------ |
| id           | Number   | 是（主键、默认自增） | Id           |
| imgs         | String   | 是（数组：;分隔）    | 封面图片路径 |
| title        | String   | 是                   | 商品标题     |
| price        | Number   | 是                   | 封面单价     |
| monthsales   | Number   | 是（默认0）          | 月销量       |
| sales        | Number   | 是（默认0）          | 总销量       |
| collection   | String   | 是（默认0）          | 收藏量       |
| number       | Number   | 是（唯一）           | 货号         |
| type         | String   | 是                   | 分类         |
| launchTime   | String   | 否                   | 上市时间     |
| offshelfTime | String   | 否                   | 下架时间     |



#### 修改商品

- 接口URL：/updgoods
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明                     | 示例                    |
| -------- | -------- | -------- | ---------------------------- | ----------------------- |
| setStr   | 是       | String   | 修改表达式（字符串注意引号） | title="标题",price=1150 |
| number   | 是       | Number   | 货号                         | 54126                   |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '修改成功'
}
```



### 商品详情列表

- 列表名称：details

- 参数格式：

| 参数名称   | 参数类型 | 是否必选          | 参数说明     |
| ---------- | -------- | ----------------- | ------------ |
| number     | Number   | 否（主键）        | 商品货号     |
| swiper     | String   | 否（数组：;分隔） | 轮播图路径   |
| options    | String   | 是（数组：JSON）  | 商品规格     |
| +color     | Object   | ...               | 颜色         |
| ++img      | String   | ...               | 颜色图片路径 |
| ++text     | String   | ...               | 颜色文本     |
| +price     | Number   | ...               | 单价         |
| +stock     | Number   | ...               | 库存         |
| discount   | String   | 否（JSON）        | 优惠         |
| activity   | String   | 否                | 活动         |
| guarantee  | String   | 否                | 保障         |
| parameter  | String   | 是（数组：;分隔） | 参数         |
| delivery   | String   | 否（数组：;分隔） | 配送         |
| detailsimg | String   | 否（数组：;分隔） | 详情图路径   |

- 外键参数：

| 外键名         | 父表格 | 关系字段 |
| -------------- | ------ | -------- |
| details_ibfk_1 | goods  | number   |



#### 查询商品详情

- 接口URL：/details
- 链接方式：POST
- 字段参数包含goods表
- 参数格式：

| 参数名称 | 是否必选        | 参数类型 | 参数说明 | 示例              |
| -------- | --------------- | -------- | -------- | ----------------- |
| option   | 否（默认：'*'） | String   | 字段     | id/id,title       |
| other    | 否（默认：''）  | String   | 条件     | where... limit... |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '根据字段参数返回数据'
}
```



#### 修改商品详情

- 接口URL：/upddetails
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明                     | 示例                    |
| -------- | -------- | -------- | ---------------------------- | ----------------------- |
| setStr   | 是       | String   | 修改表达式（字符串注意引号） | title="标题",price=1150 |
| number   | 是       | Number   | 货号                         | 54126                   |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '修改成功'
}
```



### 用户信息列表

- 列表名称：users

- 参数格式：

| 参数名称  | 参数类型 | 是否必选                            | 参数说明 |
| --------- | -------- | ----------------------------------- | -------- |
| id        | Number   | 是（主键、默认自增）                | Id       |
| username  | String   | 是（唯一）                          | 用户名   |
| headphoto | String   | 是（默认初始头像）                  | 头像     |
| password  | String   | 是（已加密）                        | 密码     |
| email     | String   | 否（唯一）                          | 邮箱     |
| phone     | Number   | 否（唯一）                          | 手机号   |
| power     | String   | 是（管理员：admin，默认用户：user） | 权限     |
| rejTime   | String   | 否                                  | 注册时间 |
| loginTime | String   | 否                                  | 登录时间 |
| exist     | String   | 是（默认存在：t，注销：f）          | 是否注销 |



#### 修改用户信息

- 接口URL：/upduser
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明                     | 示例                      |
| -------- | -------- | -------- | ---------------------------- | ------------------------- |
| setStr   | 是       | String   | 修改表达式（字符串注意引号） | exist="f",password=123546 |
| uname    | 是       | String   | 用户名                       | admin                     |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '修改成功'
}
```



### 用户数据列表

- 列表名称：userdata

- 参数格式：

| 参数名称   | 参数类型 | 是否必选              | 参数说明   |
| ---------- | -------- | --------------------- | ---------- |
| username   | String   | 是（主键）            | 用户名     |
| collection | String   | 否（货号数组：;分隔） | 收藏的商品 |

- 外键参数：

| 外键名          | 父表格 | 关系字段 |
| --------------- | ------ | -------- |
| userdata_ibfk_1 | users  | username |



#### 查询用户数据

- 接口URL：/udata
- 链接方式：POST
- 字段参数包含users表
- 参数格式：

| 参数名称 | 是否必选        | 参数类型 | 参数说明 | 示例                           |
| -------- | --------------- | -------- | -------- | ------------------------------ |
| option   | 否（默认：'*'） | String   | 字段     | collection/username,collection |
| other    | 否（默认：''）  | String   | 条件     | where username="admin"         |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '根据字段表格返回的数据'
}
```



#### 修改用户数据

- 接口URL：/updudata
- 链接方式：POST
- 字段参数参考：
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明                     | 示例                       |
| -------- | -------- | -------- | ---------------------------- | -------------------------- |
| setStr   | 是       | String   | 修改表达式（字符串注意引号） | collection='123456;456321' |
| uname    | 是       | String   | 用户名                       | admin                      |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '修改成功'
}
```



### 购物车订单列表

- 列表名称：cart

- 参数格式：

| 参数名称 | 参数类型 | 是否必选                                             | 参数说明         |
| -------- | -------- | ---------------------------------------------------- | ---------------- |
| id       | Number   | 是（主键、默认自增）                                 | Id               |
| username | String   | 是                                                   | 用户名           |
| title    | String   | 是                                                   | 商品标题         |
| option   | String   | 是                                                   | 商品规格         |
| num      | Number   | 是                                                   | 数量             |
| mostnum  | Number   | 是（默认：10）                                       | 单次限制购买数量 |
| price    | Number   | 是                                                   | 单价             |
| number   | Number   | 是                                                   | 货号             |
| submit   | String   | 是（默认：f,提交：t）                                | 是否提交订单     |
| state    | String   | 是（默认：'待结算'，等待买家付款/交易成功/交易失败） | 订单状态         |
| stime    | String   | 否                                                   | 提交时间         |
| ftime    | String   | 否                                                   | 完成时间         |
| isshow   | String   | 是（默认：t,删除：f）                                | 是否显示         |

- 外键参数：

| 外键名      | 父表格  | 关系字段 |
| ----------- | ------- | -------- |
| cart_ibfk_1 | users   | username |
| cart_ibfk_2 | details | number   |



#### 修改购物车订单

- 接口URL：/updcart
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明                     | 示例               |
| -------- | -------- | -------- | ---------------------------- | ------------------ |
| setStr   | 是       | String   | 修改表达式（字符串注意引号） | title="标题",num=5 |
| id       | 是       | Number   | id                           | 1/2/3...           |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '修改成功'
}
```



#### 删除购物车

- 接口URL：/delcart
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明 | 示例     |
| -------- | -------- | -------- | -------- | -------- |
| id       | 是       | Number   | id       | 1/2/3... |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '删除成功'
}
```



### 首页图片列表

- 列表名称：homepage

- 参数格式：

| 参数名称 | 参数类型 | 是否必选             | 参数说明     |
| -------- | -------- | -------------------- | ------------ |
| id       | Number   | 是（主键、默认自增） | Id           |
| img      | String   | 是                   | 图片路径     |
| route    | String   | 否（数组：JSON）     | 路由         |
| +style   | String   | ...                  | 盒子样式     |
| +url     | String   | ...                  | 跳转路由     |
| isswiper | String   | 是（默认：f，是：t） | 是否是轮播图 |



#### 修改首页图片

- 接口URL：/updhp
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明                     | 示例                   |
| -------- | -------- | -------- | ---------------------------- | ---------------------- |
| setStr   | 是       | String   | 修改表达式（字符串注意引号） | img="url",isswiper="t" |
| id       | 是       | Number   | id                           | 1/2/3...               |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '修改成功'
}
```



#### 删除首页图片

- 接口URL：/delhp
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明 | 示例     |
| -------- | -------- | -------- | -------- | -------- |
| id       | 是       | Number   | id       | 1/2/3... |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '删除成功'
}
```



## 其他操作接口

### 单表查询获取数据

- 接口URL：/seldata
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选        | 参数类型 | 参数说明 | 示例               |
| -------- | --------------- | -------- | -------- | ------------------ |
| table    | 是              | String   | 表名     | goods              |
| option   | 否（默认：'*'） | String   | 字段     | id/id,title        |
| other    | 否（默认：''）  | String   | 条件     | where ... limit... |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '根据字段表格返回的数据'
}
```



### 多表查询获取数据

- 接口URL：/seldata
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选        | 参数类型 | 参数说明         | 示例               |
| -------- | --------------- | -------- | ---------------- | ------------------ |
| tone     | 是              | String   | 表1名            | goods              |
| ttwo     | 是              | String   | 表2名            | details            |
| foreign  | 是              | String   | （外键）关系字段 | number             |
| option   | 否（默认：'*'） | String   | 字段             | id/id,title        |
| other    | 否（默认：''）  | String   | 条件             | where ... limit... |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '根据字段表格返回的数据'
}
```



### 添加数据

- 接口URL：/adddata
- 链接方式：POST
- 注意：不支持添加users、userdata
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明               | 示例              |
| -------- | -------- | -------- | ---------------------- | ----------------- |
| table    | 是       | String   | 表名                   | goods             |
| field    | 是       | String   | 字段                   | title/title,price |
| data     | 是       | String   | 数据（字符串注意引号） | "标题",1150       |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '添加成功'
}
```



### 用户注册

- 接口URL：/rej
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选 | 参数类型 | 参数说明 | 示例        |
| -------- | -------- | -------- | -------- | ----------- |
| uname    | 否       | String   | 用户名   | admin       |
| phone    | 否       | String   | 手机号   | 18012345678 |
| pwd      | 是       | String   | 密码     |             |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: '注册成功'
}
```



### 用户登录

- 接口URL：/login
- 链接方式：POST
- 参数格式：

| 参数名称 | 是否必选         | 参数类型 | 参数说明 | 示例        |
| -------- | ---------------- | -------- | -------- | ----------- |
| uname    | 否（需要密码）   | String   | 用户名   | admin       |
| phone    | 否（无需密码）   | String   | 手机号   | 18012345678 |
| pwd      | 否（需要用户名） | String   | 密码     |             |

- 返回实例

```JSON
{
    status: 200,
    message: 'success',
    data: 'token字符串'
}
```



```JSON
{
    status: 200,
    message: 'success',
    data: '根据字段表格返回的数据'
}
```