# 简介
**hybrid-h5-vue**是一个移动端混合开发电商项目，它基于vue 2.x和vant 2.x实现，使用了vue全家桶。后台数据通过Easy-mock搭建。
## 功能实现

- [ √ ] 首页

  >>商品秒杀
  
  >>飞入购物车动画
  
- [ √ ] 分类

- [ √ ] 购物车

- [ √ ] 订单

- [ √ ] 个人中心

- [ √ ] 商品列表

  >>商品排序
  
  >>展示形式变换
    >>>垂直布局
    >>>网格布局
    >>>瀑布流
    
- [ √ ] 商品详情

  >>视差滚动
  
- [ √ ] 登录

- [ √ ] 注册

## 安装
```
# 克隆项目到本地
git clone https://github.com/qyuanq/hybrid-h5-vue.git

# 进入项目目录
cd hybrid-h5-vue

# 安装依赖
npm install

# 启动服务
npm run serve

# 浏览器访问
http://localhost:9001
```

## 发布
```
# 打包前将vue.config.js下列注释打开
const TerserPlugin = require('terser-webpack-plugin') //第4行
minimizer: [                                          //第72行
  new TerserPlugin({
    ......
    })
  ]
npm run build
```

