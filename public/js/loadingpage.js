$(document).ready(()=>{
        let router = $("head").attr("router");
        let go = ()=>{
            if(router===undefined||router===""){
                alert("Sorry link is not invaild !");
                window.location.href = "./logout";
            }else{
                setTimeout(()=>{
                    window.location.href = "./" + router;
                },5000);
            }
        };
        go(router);
    }
)
