
/**
 * FaceBook Login [Start]
 */
$(document).ready(()=>{
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
        let ProcessLogin = async (response)=>{
            let FBLoginBtton = $("button#fb-btn");
            let FBLoginBtton2 = $("button#fb-btn-2");
            if(response.status==="unknown"){
                FBLoginBtton2.hide();
                FBLoginBtton.show();
            }
            if(response.status==="not_authorized"){
                FBLoginBtton2.hide();
                FBLoginBtton.show();
            }
            if(response.status==="connected"){
                let uInfo = {
                    id: response.authResponse.userID,
                    accessToken: response.authResponse.accessToken
                }
                let userInfoRES = await getUserInfo(uInfo);
                    userInfoRES.accessToken = uInfo.accessToken;
                await renderUser(userInfoRES);
            }
        }
        FB.getLoginStatus(ProcessLogin);
        FB.Event.subscribe('auth.login',ProcessLogin);
    }
    /**
     * Facebook Login [End] 
     */
    /**
     * Get user info - Grapth API FaceBook [Start]
     */
    let getUserInfo = async (uInfo)=>{
        if(!uInfo) return null;
        else{
            let id = uInfo.id;
            let accessToken = "&access_token=" + uInfo.accessToken;
            let field = id + "?fields=id,name,email,picture";
            let url = "https://graph.facebook.com/v3.3/" + field + accessToken;
            return $.ajax({
                url: url,
                type: "POST",
                dataType: "JSON"
            }).done(PrDone).fail(PrFail);
        }
    }
    let renderUser = async (user)=>{
        let btnFB1 = $("button#fb-btn");
        let btnFB2 = $("button#fb-btn-2");
        let name = $("button#fb-btn-2 span");
        let imgUser = $("img#avata-fb");
            imgUser.attr("src",user.picture.data.url);
            imgUser.attr("data-id",user.id);
            imgUser.attr("data-as",user.accessToken);
            name.html("Login with name: <strong>" + user.name +"</strong>");
            btnFB1.hide();
            btnFB2.show();
    }
    let PrDone = res => res;
    let PrFail = err => err;
    let PrAlways = alw => alw;
    /**
     * I Connected [Start]
     */
    $("button#fb-btn-2").click(()=>{
        let id = $("img#avata-fb").attr("data-id");
        let acc = $("img#avata-fb").attr("data-as");
        let userEmit = {
            id: id,
            accessToken: acc
        }
        socket.emit("checkBF",userEmit);
        socket.on("SentBackStatus",(data)=>{
            if(!data.status) alert(data.msg);
            else{
                window.location.href = './loginwithkey?key=' + data.msg.key;
            }
        })
    });
})