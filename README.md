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
    3.（1） ScrollCategory.vue 该组件一次性获取分类数据，左右滚动联动
      （2） ScrollContent.vue 该组件分类获取数据，切换分类一请求，上拉加载分页数据
    4.待优化方案
      （1）根据菜单创建大小一致的数组，比如10个菜单对应[0,0,0,0,0,0,0,0,0,0]
      （2）初始化第一个数据替换数组[data,0,0,0,0,0,0,0,0,0]
      （3）内容列表实现上拉 请求index-1数据 并替换数组对应索引数据 计算当前内容高度和之后索引高度；
           第一个索引没有上拉功能
      （4）内容列表实现下拉 请求index+1数据 并替换数组对应索引数据 计算当前内容高度和之后索引高度；
           最后一个索引没有下拉功能
      （5）点击菜单 请求对应index数据 并替换数组对应索引数据 计算当前内容高度和之后索引高度；
      （6）上列3，4，5项任意执行先判断数组当前对应值是否为0；
            0请求数据，计算当前高度为内容高度加上一个不为0高度，动态更新index后面的不为0高度值
            不为0 不做为
      （7） 菜单选中项，点击 active = index
                      上拉 scrollY < index对应高度值 active = index - 1
                      下滑 scrollY > index对应高度值 active = index + 1
