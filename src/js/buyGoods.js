
    let addTr = document.getElementById("showAddress");
    let modelInput = document.getElementById("myModal").getElementsByTagName("input");
    let save = document.getElementById("save");

    function checkName() {

        if(modelInput[0].value.length > 6 ||modelInput[0].value===''){
            modelInput[0].style.border="1px solid red";
            return false;
        }else{
            modelInput[0].style.border="";
            return true;
        }
    }
    function checkTel() {
        let re = /0?(13|14|15|18)[0-9]{9}/;
        if(!re.test(modelInput[1].value)||modelInput[1].value===''){
            modelInput[1].style.border="1px solid red";
            return false;
        }else{
            modelInput[1].style.border="";
            return true;
        }
    }

    function checkCode() {
        let re =  /^[1-9][0-9]{5}$/;
        if(!re.test(modelInput[3].value)||modelInput[3].value===''){
            modelInput[3].style.border="1px solid red";
            return false;
        }else{
            modelInput[3].style.border="";
            return true;
        }
    }
    save.onclick = function () {
        let flag = 1;
        for(let i = 0; i < modelInput.length;i++){
            if(modelInput[i].style.border!==""){
                flag = 0;
            }
        }
        if(flag){
            addTr.innerHTML+=`<tr><td><input type="radio" name="select" title=""><span> ${modelInput[2].value}(${modelInput[0].value}收) 
 <b>${modelInput[1].value}</b></span></td></tr>`;
        }else{
            alert("请输入正确信息后保存")
        }

    };
