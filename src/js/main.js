let url = "./src/common/data.txt";
let Ul = document.getElementById("Ul");
window.onload = createAJAX();
function createAJAX() {
    let xmlHttp = new XMLHttpRequest();
    let showDiv = document.getElementById('showImages');
    let price = document.getElementById("nowPrice");
    let size = document.getElementsByClassName("active")[0];
    let color = document.getElementsByClassName("active")[1];
    let oDiv = document.getElementsByClassName('col-md-4');
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
    //监听数据通信道状态
    //console.log(showDiv)
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let data = JSON.parse(xmlHttp.response);
            //渲染页面
            draw(data);
        }
    };
    function draw(data) {
        let str = "";
        showDiv.innerHTML +=`<img src=${data.commodity.allPicAddress[0]} height="400" width="400">`;
        //console.log(showDiv)
        for(let i = 0, len = data.commodity.allPicAddress.length; i< len; i++){
            str+=`<li class="showImgs"><img src=${data.commodity.allPicAddress[i]} ></li>`
        }
        Ul.innerHTML+=str;
        str = "";
        price.innerText ="现价：￥" +data.commodity.commPrice;
        for(let i = 0, len = data.commodity.allSizeList.length; i < len; i++) {
            str+=`<span  class="goodsSize"> ${data.commodity.allSizeList[i]}</span>`;
        }
        size.innerHTML+=str;
        str = "";
        for(let i = 0, len = data.commodity.allPicAddress.length; i< len; i++){
            str+=`<img  class="showColors" src=${data.commodity.allPicAddress[i]} >`
        }
        color.innerHTML+=str;
        //添加事件
        showGoods();
        showFormation();
        function showGoods() {
            let Img = document.getElementById("Ul").getElementsByTagName('img');
            let big = document.getElementsByClassName('big')[0].getElementsByTagName("img")[0];
            let MainImg =showDiv.getElementsByTagName('img')[0];
            for(let i = 0, len = Img.length;i < len; i++ ){
                Img[i].onmouseover = function () {
                    MainImg.setAttribute('src', Img[i].getAttribute("src"));
                    big.setAttribute("src",Img[i].getAttribute("src"));
                    this.style.cursor='hand';
                    this.style.border = '2px solid red';
                    this.onmouseout = function () {
                        this.style.border = '';
                    }
                }
            }
        }
        //展示商品信息
        function showFormation() {

            let spans = document.getElementsByClassName('goodsSize');
            //设置选择每个尺寸后的按钮样式
            //console.log(spans)
            for (let i = 0; i < spans.length;i++){
                spans[i].onclick = function () {
                    for (let j = 0; j < spans.length;j++){
                        spans[j].style.background = '';
                    }
                    this.style.background = 'red'
                };

            }
            //设置移入移出样式

            for(let i = 0; i < spans.length;i++){
                spans[i].onmouseover = function () {
                    this.style.border = '1px solid red';
                    this.style.cursor='hand';
                };
                spans[i].onmouseout = function () {
                    this.style.border = '';
                };
            }



            let showColors = document.getElementsByClassName('showColors');
            //实现点击切换
            for (let i = 0; i < showColors.length; i++) {
                let MainImg =showDiv.getElementsByTagName('img')[0];
                showColors[i].onclick = function () {
                    for (let j = 0; j < showColors.length; j++){
                        showColors[j].style.border = '';
                    }
                    this.style.border = '1px solid red';
                    MainImg.setAttribute('src', showColors[i].getAttribute("src"));
                }
            }

            let inc =   document.getElementById('inc');
            let dec =   document.getElementById('dec');
            let input = document.getElementById('exampleInputAmount');

            inc.onclick = function () {
                dec.style.display = 'inline-block';
                if(parseInt(input.value) < 200){
                    input.value = parseInt(input.value)+1;
                }else{
                    alert("一次加购不能超过20件");
                    input.value=1;
                }
                if(parseInt(input.value) === 1){
                    dec.style.display = 'none'
                }

            };
            dec.onclick = function () {
                if(parseInt(input.value)>1){
                    input.value = parseInt(input.value)-1;
                    dec.style.display = 'inline-block';
                }
                if(parseInt(input.value) === 1){
                    dec.style.display = 'none'
                }
            };
            //立即购买和加入购物车模块
            //此处缺少对于加入购物车和立即购买的相关详细界面
            let buy = document.createElement('div');
            buy.setAttribute("id","add_buy");
            // language=HTML
            buy.innerHTML=`<button type="button" class="btn btn-warning" title="加入购物车"><a href="./src/html/addCars.html" target="_blank" style="text-decoration: none;color: white">加入购物车</a></button>
            <button type="button" class="btn btn-danger" title="立即购买"><a href="./src/html/buy.html" target="_blank" style="text-decoration: none;color: white">立即购买</a></button>`;
            oDiv[1].appendChild(buy);
        }
        getMax();
        function getMax() {
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
        }

    }
}