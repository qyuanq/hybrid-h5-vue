# 基于vue 混合开发

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 业务组件
  #### 分类列表
    基于better-scroll
    1. 引入依赖
    `import BScroll from '@better-scroll/core'`
    2. 滚动列表初始化
    在mounted中利用$nextTick
    判断是否存在bs实例，不存在就创建，存在就刷新
    当数据发生变化，刷新bs 重新计算 不然会滚动失效
