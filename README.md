# todo-app

## usage
```shell
npm run serve
```

## 开发日志
### 20210721
1. 完成基本功能实现：
* 显示所有待办事项
* 增加新的待办事项（通过按钮或回车键）
* 勾选完成待办事项
* 筛选完成/未完成的待办事项
* 移除待办事项
2. 完成UI的完善

### 20210722
1. 实现响应式布局（暂无思路，先搁置）
2. 增加显示时间功能：
* 当前时间（已完成）
* 待办事项添加时的时间（已完成）
* 待办事项完成的时间（已完成）
遇到的坑：
new Date().getMonth()是从0开始的，得到实际月份需要加一
new Date().getDay()是获取星期的而不是几号的
new Date().getDate()才是获取几号的
3. 更改显示逻辑：
* 默认优先显示未完成的待办事项而不是全部事项（已完成）
* 已完成事项进行UI区分，并不予删除（已完成）
* 未完成的待办事项勾选后，过渡消失（难）
4. 编辑栏增加输入逻辑：
* 最多输入字数（已完成）
* 最多显示字数,超出最多显示字数部分用...显示（已完成）
5. 对于可能出现错误勾选的情况，再次点击可取消勾选（已完成）
6. 显示各列表事项的数目
7. 勾选的变化UI增加过渡

### 20210726
1. 批量移除：
* 切换到该模式，对批量选择的item进行移除（已完成）
* 点击全选，移除全部（已完成）
* 模式的切换：点击“批量移除”及“完成”、已移除全部（已完成）
* 当处于批量移除模式时，无法添加新的待办事项（已完成）

### 20210727
1. 添加拖拽功能：
* 拖拽项目调整顺序（已完成）-使用vuedraggable
* 将项目拖拽到其他分类标签下可实现移动（难）
2. 进一步构思其他标签模块：
* 数据分离：store - module？
* 组件是否可以复用？
初步构思：收集箱和愿望清单项目卡片不需要勾选完成，项目清单的项目卡片则可以点击展开详情
3. 路由问题：点击当前界面的tab报错 "NavigationDuplicated: Avoided redundant navigation to current location"

### 20210728
1. 调整逻辑细节：
* 各个列表模式下若没有项目时，都应提示消息。此前的判断依据是todoItems的长度，故在已完成和未完成下没有项目也会显示批量删除（已完成）
2. 排序问题：（已完成）
* 在all模式下，始终保持为完成的事项在前，已完成的事项在后
* 当有未完成的事项完成了，排序变为已完成事项的首位
* 当有已完成的事项取消完成，排序变为首位

### 20210730
1. 显示逻辑调整：
* 若当天完成项目，把显示完成时间改为“当天完成”（已完成）
2. 增加选择主题色功能：
* 定义主题色模式（初步思路为以hsv颜色模型为基础的一组颜色）
* 新增颜色选择器
* 选择颜色后改变主题色（用css变量的方式？）

### 20210803
1. 增加记忆功能
* 利用localStorage来读取和保存已经记录的todo项，这样下一次启动应用时还是可以看到上次关闭时的记录
* 问题：localStorage的容量只有5M，满了怎么办

### 20210804
1. 当列表项过多，对后面的项目进行隐藏处理，保持页面整洁（待完善）
* 设置非展开状态下最大可显示数
* 设置展开按钮，点击后可展开所有项
* 若应显示数小于等于最大可显示数，不显示展开按钮
* 怎么关闭展开？