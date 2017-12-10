/**
 * Created by Administrator on 2017/11/8 0008.
 */



window.onload = function () {

    // 图片页面轮播图,最后我们发现效果与实际页面相反，按右键应该图片换到下一张，按左键应该回到最后一张，所以我们更改时间绑定的按键
    //1.原本左键，改为右键 取到div
    var moveToRight = document.getElementById('slick_next');  // 这是最后的设置，改变绑定的元素
    // 创建一个控制圆点的变量
    var index = 0;
    // 创建事件并绑定
    moveToRight.onclick = function () {
        // 获取容器
        var imgStore = document.getElementById('imgStore');
        // 获取当前有效样式
        var style = window.getComputedStyle(imgStore,null);
        // 获取left值
        var left = parseInt(style.left);
        // 获取width值
        var Width = parseInt(style.width);
        // 这里想办法把1920换成一个变量, 先把获取这个大容器的第一个子元素
        var imgViewport = imgStore.firstElementChild;
        // 获取这个子元素的style
        var imgStyle = window.getComputedStyle(imgViewport,null);
        // 获取这个子元素style的宽度，这个宽度就是1920，因为是单个图片的视窗宽度
        var imgwidth = parseInt(imgStyle.width);
        // 减少大容器left值大小控制图片，往左移动
        left = left - imgwidth;
        // 这里设置一个判断，利用定位的left值进行判断
        if(left === -Width){   // 因为第一张图的left为0，第七张的left就是容器宽度减一张图的宽度
            left = 0;   // 因为下面left = left - 一张图的宽度，我们需要最后的left为0，所以这里设置为一张图的宽度
        }                       // 这样当第七张图的时候，left-1920 就是0，就是第一张图片
        // 最后把left值再设置回容器的left值
        imgStore.style.left = left + 'px';
        // 这里我们还要想办法让图片导航的圆点动起来
        // 首先找到相应的index，第一张图是0，最后一张图是6
        index = Math.abs(left/imgwidth);
        // 先找到这个圆点,发现是个ul，所以先找到ul，再找到li
        var imgNav = document.getElementById('slick_dots');
        // 找到li
        var imgNavLi = imgNav.children;
        // 遍历
        for(var i = 0; i < imgNavLi.length; i++){
            var imgNavLiItem = imgNavLi[i];
            // 把整个li里面控制圆点变蓝色的属性删掉
            imgNavLiItem.removeAttribute('class');
        }
        // 再给被选中的图片对应的li加上蓝点属性
            imgNavLi[index].setAttribute('class','slick-active');

    }

    //2.原本右键 改为左键 取到div
    var moveToLeft = document.getElementById('slick_prev');   // 这是最后的设置，改变绑定的元素
    moveToLeft.onclick = function () {
        // 获取容器
        var imgStore = document.getElementById('imgStore');
        // 获取当前有效样式
        var style = window.getComputedStyle(imgStore,null);
        // 获取left值
        var left = parseInt(style.left);
        // 获取width值
        var Width = parseInt(style.width);
        // 这里想办法把1920换成一个变量, 先把获取这个大容器的第一个子元素
        var imgViewport = imgStore.firstElementChild;
        // 获取这个子元素的style
        var imgStyle = window.getComputedStyle(imgViewport,null);
        // 获取这个子元素style的宽度，这个宽度就是1920，因为是单个图片的视窗宽度
        var imgwidth = parseInt(imgStyle.width);
        // 通过增大left值来控制图片向左移动
        left = left + imgwidth;
        // 当在第一张图的时候，left值为0；再点一下，left值因为累加的原因，会增大为1920，但是其实现在前面没有其他图片了
        if(left === imgwidth){
            left = -Width + imgwidth;  // 所以我们需要图片回到最后一张，最后一张图的left值为容器宽度减去一张图的宽度
        }
        // 再把left值设置回去
        imgStore.style.left = left + 'px';
        // 第一张图是0，第七张是7,这里要取绝对值
        index = Math.abs(left/imgwidth);
        // 还是要把圆点动起来
        // 先找到这个圆点,发现是个ul，所以先找到ul，再找到li
        var imgNav = document.getElementById('slick_dots');
        // 找到li
        var imgNavLi = imgNav.children;
        // 遍历
        for(var i = 0; i < imgNavLi.length; i++){
            var imgNavLiItem = imgNavLi[i];
            // 把整个li里面控制圆点变蓝色的属性删掉
            imgNavLiItem.removeAttribute('class');
        }
        // 再给被选中的图片对应的li加上蓝点属性
        imgNavLi[index].setAttribute('class','slick-active');
    }

    //3. 做一个图片的导航器，鼠标放上移动到相应的图片
    // 我们发现，其实是给li中div绑定onMouseOver事件
    // 先找到ul
    var ul = document.getElementById('slick_dots');
    // 再找到li
    var liSet = ul.children;
    // 遍历li找到div
    for (var i = 0; i < liSet.length; i++){
        // 每个li
        var li = liSet[i];
        // 把li中的圆点变蓝属性删掉   然后发现，默认初始的时候，蓝点没了，还不删除之前鼠标悬停所产生的蓝点
       /* li.removeAttribute('class');*/  // 因为没有写在事件中，所以页面一刷新就删除了所有的蓝点，所以要放到后面去
        // 每个li中的div
        var div = li.firstElementChild;
        // 给每个li中的div绑定事件
        div.onmouseover = function () {
            var k; // 初始化一个k，用来得到被选中的小圆点div相对应的li index值
            // 给被选中的圆点变为蓝色，就是给触发事件的元素变为蓝色
            var ele = event||window.event;
            var target = ele.target || ele.srcElement;
            var targetLi = target.parentElement; // 得到div相对应的li

            // 这里就要再加一个圆点的遍历，用来删除所有的蓝色圆点属性
            for(var j =0; j < liSet.length; j++){
                // 重新得到所有li
                var Li = liSet[j];
                // 如果被选中的div父级li和这个遍历中的li是同一个li
                if(targetLi == Li){
                    k = j;  // 那么就返回这个遍历中的li的index值给k
                }
                // 在鼠标悬停事件中删除所有的蓝色圆点的属性
                Li.removeAttribute('class');

            }
            // 得到相应的div后，这个变蓝的属性其实是给li加
            targetLi.setAttribute('class','slick-active');

            // 圆点显示相应的图片，其实就是li为0，容器left为0，li为1，容器left为-1920
            // 先得到容器
            var imgStore = document.getElementById('imgStore');
            // 还要知道当前被选中的是那一个div相对应的li的index值

            // 这里想办法把1920换成一个变量, 先把获取这个大容器的第一个子元素
            var imgViewport = imgStore.firstElementChild;
            // 获取这个子元素的style
            var imgStyle = window.getComputedStyle(imgViewport,null);
            // 获取这个子元素style的宽度，这个宽度就是1920，因为是单个图片的视窗宽度
            var imgwidth = parseInt(imgStyle.width);

            imgStore.style.left = -(k * imgwidth) + 'px';

        }
    }
    
    // 最后设置一个定时器
    var timeInterval = setInterval(function () {
        // 获取容器
        var imgStore = document.getElementById('imgStore');
        // 获取当前有效样式
        var style = window.getComputedStyle(imgStore,null);
        // 获取left值
        var left = parseInt(style.left);
        // 获取width值
        var Width = parseInt(style.width);
        // 这里想办法把1920换成一个变量, 先把获取这个大容器的第一个子元素
        var imgViewport = imgStore.firstElementChild;
        // 获取这个子元素的style
        var imgStyle = window.getComputedStyle(imgViewport,null);
        // 获取这个子元素style的宽度，这个宽度就是1920，因为是单个图片的视窗宽度
        var imgwidth = parseInt(imgStyle.width);
        // 减少大容器left值大小控制图片，往左移动
        left = left - imgwidth;
        // 这里设置一个判断，利用定位的left值进行判断
        if(left === -Width){   // 因为第一张图的left为0，第七张的left就是容器宽度减一张图的宽度
            left = 0;   // 因为下面left = left - 一张图的宽度，我们需要最后的left为0，所以这里设置为一张图的宽度
        }                       // 这样当第七张图的时候，left-1920 就是0，就是第一张图片
        // 最后把left值再设置回容器的left值
        imgStore.style.left = left + 'px';
        // 这里我们还要想办法让图片导航的圆点动起来
        // 首先找到相应的index，第一张图是0，最后一张图是6
        index = Math.abs(left/imgwidth);
        // 先找到这个圆点,发现是个ul，所以先找到ul，再找到li
        var imgNav = document.getElementById('slick_dots');
        // 找到li
        var imgNavLi = imgNav.children;
        // 遍历
        for(var i = 0; i < imgNavLi.length; i++){
            var imgNavLiItem = imgNavLi[i];
            // 把整个li里面控制圆点变蓝色的属性删掉
            imgNavLiItem.removeAttribute('class');
        }
        // 再给被选中的图片对应的li加上蓝点属性
        imgNavLi[index].setAttribute('class','slick-active');
    },4000)

    // 先找到整个无序列表
    var ul = document.getElementById('menu-ul');
    // 再找到相对应的li
    var li = ul.children[0];
    // 给这个li绑定一个事件
    li.onmouseover = function () {
        // 将二级菜单显示
        // 先定位二级菜单
        var secondMenu = document.getElementById('home-menu-child');
        // 然后设置displa
        secondMenu.style.display = 'block';
    }
    li.onmouseout = function () {
        // 将二级菜单隐藏
        // 找到二级菜单
        var secondMenu = document.getElementById('home-menu-child');
        // 然后设置displa
        secondMenu.style.display = 'none';
    }
}
