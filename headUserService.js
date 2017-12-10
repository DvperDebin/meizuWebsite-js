/**
 * Created by Administrator on 2017/11/7 0007.
 */


window.onload = function () {
    var Height = 0;
    // 首先得到这个图片元素的父元素
    var link = document.getElementById('user-service-link');
    var menuItem;
    link.onmouseover = function () {
        // 创造一个div
        menuItem = document.createElement('div');
        // 给这个div一个属性
        menuItem.setAttribute('class','user-service-menu');
        menuItem.setAttribute('id','menuItem-div')
        // 在这个div中创造一个ul
        var ul = document.createElement('ul');
        // 给ul一个属性
        ul.setAttribute('id','user-menu-ul');

        // 给ul加入li，第一个li
        var li0 = document.createElement('li');
        // 给li0创建一个新的属性
        li0.setAttribute('class','user-menu-li');
        li0.textContent = '立即登录';
        // 第二个li
        var li1 = document.createElement('li');
        // 给li1创建一个新的属性
        li1.setAttribute('class','user-menu-li');
        li1.textContent = '立即注册';
        // 第三个li
        var li2 = document.createElement('li');
        // 给li2创建一个新的属性
        li2.setAttribute('class','user-menu-li');
        li2.textContent = '我的订单';
        // 第四个li
        var li3 = document.createElement('li');
        // 给li3创建一个新的属性
        li3.setAttribute('class','user-menu-li');
        li3.textContent = 'M码通道';
        // 把li放回到ul中
        ul.appendChild(li0);
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);


        // 把这个ul放回到创建的div中
        menuItem.appendChild(ul);
        // 把这个div放回到原来的link中
        link.appendChild(menuItem);

        // 得到有效样式
        var style = window.getComputedStyle(menuItem,null);
        // 得到高
        var height = parseInt(style.height);
        // 得到内边距
        var pad = parseInt(style.padding);
        // 得到最大值
        var Height = height + pad;
        // 初始化值
        var iniHeight = 0;
        // 设置初始高度为0，解决鼠标悬停闪一下的问题
        menuItem.style.height =0;

        var timeInterval = setInterval(function () {
          if(iniHeight >= Height){
                clearInterval(timeInterval)
          }else{
              iniHeight = iniHeight + 5;
              menuItem.style.height = iniHeight + 'px';
          }
        },10)

    }
   // 当鼠标移开时，就隐藏这个已经创造好的div
    link.onmouseout = function () {
        menuItem.style.display = 'none';
    }

    // 搜索框
    var searchInput = document.getElementById('search-input');
    // 绑定输入事件
    searchInput.oninput = function () {
        var outerDiv = document.getElementById('searchMenu');
        // 创造ul
        var ul = document.createElement('ul');
        ul.setAttribute('class','service-search-menu-list');
        // 创造一个ul
    }


}
