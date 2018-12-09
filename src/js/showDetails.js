(function () {
    let tds = document.getElementById("showInformation").getElementsByTagName('td');
    let div0 = document.getElementById("showDetails0");
    let div1 = document.getElementById("showDetails1");
    let div2 = document.getElementById("showDetails2");
    let right = document.getElementById("right");

    let odiv = [div0,div1,div2];
    let comment = div1.getElementsByTagName("input");
    let span = div1.getElementsByTagName("span");
    changeTd(tds,odiv);
    showComment(comment,span);
    goodComments();
    function changeTd(tds,odiv) {
        for(let i = 0; i< tds.length;i++){
                tds[i].onclick = function () {
                    for(let j = 0; j< tds.length;j++){
                        tds[j].className = '';
                        odiv[j].style.display='none';
                        right.style.height = 800+'px';
                    }
                    if( i === 0){
                        right.style.height = 2000+'px';
                    }
                    this.className = 'active';
                    odiv[i].style.display='block';
                }
        }
    }

    //评价相关
    function showComment(input,span) {
        let table = document.getElementsByClassName("table-striped");
        for(let i = 0; i < input.length; i++){
            input[i].onclick = function () {
                for(let j = 0; j< input.length; j++){
                    span[j].className='';
                    input[i].checked = false;
                    table[j+1].style.display = "none";
                }
                span[i].className = 'selected';
                table[i+1].style.display="block";
                this.checked = true;
            }
        }
    }
    function goodComments() {
        let table = document.createElement("table");
        table.setAttribute("class","table table-hover");
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);
        //创建第一行
        let row1 = document.createElement("tr");
        tbody.appendChild(row1);

        let c11 = document.createElement("td");
        c11.appendChild(document.createTextNode("宝贝不错，值得购买"));
        row1.appendChild(c11);
    }
})();