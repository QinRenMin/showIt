(function () {
    //实现效果：
    //鼠标放到小图片上面的时候，后面的大盒子出现。鼠标离开的时候大盒子隐藏。
    //鼠标移动的时候，大盒子内的大图片也移动。
    let small = document.getElementsByClassName('small')[0];
    let big = document.getElementsByClassName('big')[0];
    let mask = document.getElementsByClassName('mask')[0];
    let box = document.getElementsByClassName('box')[0];
    let img = big.children[0];

    big.style.display = 'none';//事件发生之前，后面的大盒子先隐藏起来
    small.onmouseover = function () {
        big.style.display = 'block';//鼠标放上的时候，大盒子出现;
        mask.style.display = 'block';//与鼠标同步的放大镜也同时出现;
    };
    small.onmouseout = function () {//鼠标离开的时候，与上面的效果反之。
        big.style.display = 'none';
        mask.style.display = 'none';
    };
    small.onmousemove = function () {//鼠标移动事件
//            如果mask的到父元素左边的值大于 其父元素的宽度减去放大镜的宽度。就都等于父元素的宽度-mask的宽度。
        //放大镜的横坐标的值 等于当前鼠标的横坐标值减去box到其父元素左边（即浏览器）减去放大镜宽度的一半，鼠标始终保持在放大镜的中央。
        mask.style.left = event.clientX-box.offsetLeft-mask.offsetWidth+'px';
        //纵坐标，与上同理。
        mask.style.top = event.clientY-box.offsetTop-mask.offsetHeight+'px';
        img.style.left = 400+'px';
        //防止放大镜溢出 小图片盒子
        //放大镜到父元素的左边的距离 如果大于 小图片盒子的宽度 减去放大镜的宽度 即表示放大镜溢出
        // 则令其等于 小图片盒子的宽度 减去放大镜的宽度
        if(mask.offsetLeft>small.offsetWidth-mask.offsetWidth){
            mask.style.left = (small.offsetWidth-mask.offsetWidth)+'px';
            //放大镜的Left的值如果为负，就为零
        }else if(mask.offsetLeft<=0){
            mask.style.left = 0+'px';
            //纵坐标 与上同理
        }if(mask.offsetTop>small.offsetHeight-mask.offsetHeight){
            mask.style.top = (small.offsetHeight-mask.offsetHeight)+'px';
        }else if(mask.offsetTop<=0){
            mask.style.top = 0+'px';
        }
        //移动时 大图片移动的距离 应是 鼠标移动距离 放大镜到父元素的距离乘以大图片宽高除以小图片宽高
        let numX = big.offsetWidth/box.offsetWidth;
        let numY = big.offsetHeight/box.offsetHeight;
//            alert(beinum);
        img.style.transform = "translateX("+-mask.offsetLeft*numX+"px"+")"
            +"translateY("+-mask.offsetTop*numY+"px"+")";
    }

})();