先画线，生成路径在漫游

## https://blog.csdn.net/lovelovelovelovelo/article/details/74004273

## 无人机切换
## 飞行过程中转动镜头
## 视频点位的绑定
* 视频定义四种状态，状态码：在线-0，离线-1，未找到-2，禁用-3



## 部署注意事项
 
 ### 1、无法粘贴问题
 * 如果无法粘贴到远程，需要先把文件拷贝到本地c盘（最好不要放桌面）
 * 然后可以在远程端的网络下看到本地的C盘，这样就可以在远程直接把文件移动或者拷贝到远程部署

### 2、乱码问题
 * 解决办法：找到代码中一个名为web.congfig的文件，把这个文件删除即可

    git使用教程：
    git pull 的时候报错：your local changes to the following files would be overwritten by merge
    解决办法：
    git stash
    git pull origin master
    git stash pop



#### cesium表示颜色统一用 Cesium.Color.fromCssColorString("#FF0FAB") 这种16进制格式 
