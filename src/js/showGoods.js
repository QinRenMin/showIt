(function () {
    select();

    //显示左侧的相关推荐
    function select() {
        let goods = [];
        let Su = document.getElementById('showSuggest');
        let SuImg = Su.getElementsByTagName('img');
        for(let i =0, len = SuImg.length;  i < len; i++) {
            goods[i] = SuImg[i].getAttribute("src");
        }
        let imgLocation = goods.indexOf(SuImg[2].getAttribute('src'));
        let svgs = document.getElementById('page').getElementsByTagName('svg');
        for(let i = 0; i< svgs.length;i++){
            svgs[i].onmouseover=function(){
                this.style.cursor='hand';
            };
        }
        svgs[0].onclick=function (e) {
            if(imgLocation === 2) {
                imgLocation = goods.length-1;
                for(let i = 2; i<= SuImg.length-1&&i>=0;i--){
                    SuImg[i].src = goods[imgLocation--];
                }
            } else if(imgLocation === 0){

                for (let i = 0; i < SuImg.length; i++) {
                    SuImg[i].src = goods[imgLocation++];
                }
                imgLocation -=1;
            }else{
                for(let i = 2; i<= SuImg.length-1&&i>=0;i--){

                    SuImg[i].src = goods[imgLocation];
                    imgLocation--;
                }
                if(imgLocation === 2){
                    imgLocation = 0;
                }
            }
            e.stopPropagation();
        };
        svgs[1].onclick = function (e) {
            if (imgLocation === goods.length-1) {
                imgLocation = 0;
                for (let i = 0; i < SuImg.length; i++) {
                    SuImg[i].src = goods[imgLocation++];
                }
                imgLocation -=1;
            } else if(imgLocation === 0){
                imgLocation = 2;
                for (let i = 0; i < SuImg.length; i++) {
                    imgLocation++;
                    SuImg[i].src = goods[imgLocation];
                }
            }else {
                for (let i = 0; i < SuImg.length; i++) {
                    imgLocation++;
                    SuImg[i].src = goods[imgLocation];
                }
            }
            e.stopPropagation();
        };


    }
})();
