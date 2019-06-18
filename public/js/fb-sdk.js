
/**
 * FaceBook Login [Start]
 */
let socket = io();
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk')
);
window.fbAsyncInit = function() {
    FB.init({
    appId      : '835521060224002',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.3'
    });
    FB.AppEvents.logPageView();
    let ProcessLogin1 = (response)=>{
        if(response.status==="connected"){
            console.log(response.authResponse.userID);
        }
    }
    let ProcessLogin = (response)=>{
        if(response.status==="not_authorized"){
            console.log("!");
        }else if(response.status==="unknown"){
            console.log("!");
        }else if(response.status==="connected"){
            let uInfo = {
                id: response.authResponse.userID,
                accessToken: response.authResponse.accessToken
            };
            socket.emit("checkBF",uInfo);
            socket.on("SentBackStatus",(data)=>{
                if(!data) alert(data.msg);
                else{
                    window.location.href = './loginwithkey?key=' + data.msg.key;
                }
            });
        }
    }
    FB.getLoginStatus(ProcessLogin1);
    FB.Event.subscribe('auth.login',ProcessLogin);
}
/**
 * Facebook Login [End] 
 */