## 一、项目介绍 ##
> 本项目为自定义小程序端房产平台。
> 
 ```
  小程序appId：自配置
  对应的开发小程序：自定义

  ```

## 二、编码规范 ##
> 文件命名规范

1. 文件夹用横杠-分隔；
2. 组件(components)用小写加中划线命名 demo-index；
3. 页面组件(pages)用文件夹命名/index.js的形式；
4. js(除默认的index)一律采用小驼峰命名 homeIndex.js；

> 代码书写规范

1. 代码缩进2个空格(1个TAB);
2. js变量小驼峰；
3. scss变量小驼峰，命名使用bem规范，使用了[sass-bem](https://www.npmjs.com/package/sass-bem)辅助工具；
4. 增加了eslint作为代码规范标准，使用模式为standard，可查看.eslintrc.js文件。若需要忽略eslint可在.eslintignore中填写忽略配置。


## 三、踩坑攻略 ##

1.每个页面都要适配iphoneX，padding-bottom: 34px。可参考其他页面实现方式。注：底部无操作的话就不用将页面顶上去。

2.slot插槽数据渲染有问题 https://github.com/Meituan-Dianping/mpvue/issues/427

3.需要使用'cover-view'标签在视频播放时保持显示，最外层一定要使用fixed定位

4.使用'cover-view'标签内嵌入'button'按钮, 'button'内一定要再嵌入一个'cover-view'或者'cover-image'

5.涉及到web-view的地方，在最终设定src的时候，一定要判断有没有满足条件（例如有没有token），否则web-view可能会白屏

6.app.json里tabBar里面的list使用的pagePath跟wx.navigateTo路径一样的话不起作用，实现不了跳转。

7.进行数值类型大小对比不可以直接比较（会出现数位对比偏差），使用parseInt(num)方法

8.小程序在小米手机如果有大图渲染，会出现反复闪屏的情况；

9.使用wx:if来控制登录按钮（bindgetphonenumber="getPhoneNumber"）的显示/隐藏，在华为mate20会出现点击无反应的情况。

10.组件中使用fixed定位，ios无法固定

## 四、项目目录 ##
``` bash
.
|____component					    小程序应用组件
| |____common       					公用组件存放位置
| |____homePage					      首页模块
| |____detail					        详情模块
| |____personal					      个人模块
| |____login					        登录模块

|____image                  小程序所需本地图片
| |____common 					      公用图片存放位置
| |____homePage					      首页模块
| |____detail					        详情模块
| |____personal					      个人模块
| |____login					        登录模块

|____page					          项目文件目录
| |____homePage					      首页模块
| |____detail					        详情模块
| |____personal					      个人模块
| |____login					        登录模块

|____utils					        工具存放目录
|____app.json					      小程序主入口页面配置json
|____app.js					        小程序全局js配置
|____app.wxss					      小程序全局wxss配置
|____project.config.json		小程序配置文件

```


## 五、必要准备 ##


> 参考小程序文档  [官方文档] https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html"。



> 参考小程序文档使用VsCode进行小程序开发所需插件

1.Easy WXLESS
可使用less对小程序wxss进行编译

2.minapp
微信小程序标签、属性的智能补全（同时支持原生小程序、mpvue 和 wepy 框架，并提供 snippets）

3.Chinese (Simplified) Language Pack for Visual Studio Code
此中文（简体）语言包为 VS Code 提供本地化界面

4.wxml
微信小程序wxml格式化以及高亮组件(高度自定义)

5.vscode-icons
侧栏的图标直观化

6.vscode-wechat
支持 wxml、wxss 语法高亮

7.beautify
格式化代码