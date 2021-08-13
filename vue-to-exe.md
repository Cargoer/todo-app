# 把vue项目打包变成可执行文件exe

参考来源：[知乎@Chuion-将Vue项目打包为Windows应用](https://zhuanlan.zhihu.com/p/59765568)

本文只阐述过程

下述A为electron官方例子；B为该vue项目

### step 1 得到electron的官方例子A

```shell
git clone https://github.com/electron/electron-quick-start 
```

### step 2 修改公共路径为相对路径

B根目录创建vue.config.js，内容为：

```javascript
module.exports = {
    publicPath: './'
}
```

### step 3 打包项目

B中执行

```shell
npm run build
```

然后把B中的dist文件夹复制到A中

### step 4 删除A根目录下的index.html文件

### step 5 修改入口文件

A中找到入口文件main.js，修改内容如下

```javascript
// 修改前
mainWindow.loadFile('index.html')
// 修改后
mainWindow.loadFile('./dist/index.html')
```

### step 6 安装依赖

建议先执行下面两行命令以避免electron下载很慢或出错

```shell
npm config set registry https://registry.npm.taobao.org/
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

然后执行

```shell
npm install
```

然后运行查看预览

```shell
npm run start
```

预览应该可以看到项目且可以正常使用，若白屏可能是step 2没有弄好

参考原文里还有一步是下载依赖eletron-packager，但是npm install貌似已经安装好了

### step 7 添加命令

在A中进入package.json，在script中添加：

```json
"script": {
    // 添加下面这行，本注释不要加
    "packager": "electron-packager ./ App --platform=win32 --arch=x64 --overwrite"
}
```

### step 8 获得exe

A中执行

```shell
npm run packager
```

然后A中会出现一个App-win32-x64 的文件夹，这个文件就是打包好的桌面应用，文件夹里有一个 App.exe 文件，App.exe就是这个项目的启动文件