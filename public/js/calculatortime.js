$(document).ready(()=>{
    $("a.button").click(()=>{
        let start = $("input[name  = 'start']").val();
        let reload = $("input[name  = 'reload']").val();
        let gosleep = $("input[name  = 'gosleep']").val();
        let total = "Có phải bạn đi ngủ lúc: " + start + " - Ngủ: " + reload + " chu kỳ - Cần: " + gosleep + " phút để đi vào giấc ngủ ?";
        if(start===undefined||start===""||start.length === 0){
            alert('Vui lòng nhập thời gian bắt đầu đi ngủ');
        }else if(reload===undefined||reload===""||reload.length === 0){
            alert('Vui lòng nhập thời gian bắt đầu đi ngủ');
        }else if(gosleep===undefined||gosleep===""||gosleep.length === 0){
            alert('Vui lòng nhập thời gian bắt đầu đi ngủ');
        }else{
            if(confirm(total)){
                let DateNow = new Date();
                let currentTime = new Date(DateNow.getFullYear() + "/" + DateNow.getMonth() + "/" + DateNow.getDate() + " " + start + ":00");
                reload = (reload * 90) + parseInt(gosleep);
                let totalMin = reload + (currentTime.getHours() * 60) + currentTime.getMinutes();
                let hours = parseInt(totalMin/60);
                    hours = hours < 24 ? hours : hours - 24;
                let du = (totalMin/60)%60;
                    du = '0.'+(du + '').split(".")[1];
                    du  = parseFloat(du);
                let minutes = du*60;
                alert("Bạn cần thức dậy lúc "+hours + "H:" + parseInt(minutes) + " Phút !");
            }else {alert("Đã hủy tính toán !");}
        }
    });
});