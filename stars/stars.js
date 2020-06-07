let alreadyVoted=false;
let response='';
let link="https://accesorii-electrocasnice-de-bucatarie.compari.ro/domotti/piese-schimb-pentru-filtru-cafea-6-persoane-p490838559/";
let username="Fanutu";
let callback=function () {};


class StarsModel {
    static handleStars(productLink,callback) {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {

                    let stars = JSON.parse(this.responseText)['response'];
                    callback(stars);
                }
                else {
                    response = {data:{"message":"aaaa"}, message: "ERROR"};
                }
            }
        };
        xmlHttpRequest.open("GET", "/api/stars.php?starlink='"+productLink+"'", true);
        xmlHttpRequest.send();
    }

    static submitStars(username, number,productLink,callback) {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    document.getElementById("ceva").innerText=JSON.parse(this.responseText)['response'];
                    callback();
                }
            }
        };
        xmlHttpRequest.open("POST", "/api/stars.php", true);
        xmlHttpRequest.send(JSON.stringify({
            link:productLink,
            user:username,
            stars:number
        }));
    }
}
class StarsView{
    static modifyStars(stars){
        if(stars>=1&&stars<2){
            document.getElementById("first-star").classList.add("checked");
        }
        if(stars>=2&&stars<3){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
        }
        if(stars>=3&&stars<4){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
            document.getElementById("third-star").classList.add("checked");
        }
        if(stars>=4&&stars<5){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
            document.getElementById("third-star").classList.add("checked");
            document.getElementById("fourth-star").classList.add("checked");
        }
        if(stars>=5){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
            document.getElementById("third-star").classList.add("checked");
            document.getElementById("fourth-star").classList.add("checked");
            document.getElementById("fifth-star").classList.add("checked");
        }
    }
    static hoverIn(stars){
        if(stars>=1&&stars<2){
            document.getElementById("first-star").classList.add("checked");
        }
        if(stars>=2&&stars<3){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
        }
        if(stars>=3&&stars<4){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
            document.getElementById("third-star").classList.add("checked");
        }
        if(stars>=4&&stars<5){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
            document.getElementById("third-star").classList.add("checked");
            document.getElementById("fourth-star").classList.add("checked");
        }
        if(stars>=5){
            document.getElementById("first-star").classList.add("checked");
            document.getElementById("second-star").classList.add("checked");
            document.getElementById("third-star").classList.add("checked");
            document.getElementById("fourth-star").classList.add("checked");
            document.getElementById("fifth-star").classList.add("checked");
        }

    }
    static hoverOut(stars){
        if(stars>=1&&stars<2){
            document.getElementById("first-star").classList.remove("checked");
        }
        if(stars>=2&&stars<3){
            document.getElementById("first-star").classList.remove("checked");
            document.getElementById("second-star").classList.remove("checked");
        }
        if(stars>=3&&stars<4){
            document.getElementById("first-star").classList.remove("checked");
            document.getElementById("second-star").classList.remove("checked");
            document.getElementById("third-star").classList.remove("checked");
        }
        if(stars>=4&&stars<5){
            document.getElementById("first-star").classList.remove("checked");
            document.getElementById("second-star").classList.remove("checked");
            document.getElementById("third-star").classList.remove("checked");
            document.getElementById("fourth-star").classList.remove("checked");
        }
        if(stars>=5){
            document.getElementById("first-star").classList.remove("checked");
            document.getElementById("second-star").classList.remove("checked");
            document.getElementById("third-star").classList.remove("checked");
            document.getElementById("fourth-star").classList.remove("checked");
            document.getElementById("fifth-star").classList.remove("checked");
        }
    }
}
class StarsController{
    constructor() {
        this.listen();
    }

    listen() {
        document.getElementById("first-star").addEventListener("click", function () {
            if(!alreadyVoted){
                StarsModel.handleStars(link,StarsView.modifyStars);
                StarsModel.submitStars(username,1,link,callback);
                alreadyVoted=true;
            }

        });
        document.getElementById("second-star").addEventListener("click", function () {
            if(!alreadyVoted){
                StarsModel.handleStars(link,StarsView.modifyStars);
                StarsModel.submitStars(username,2,link,callback);
                alreadyVoted=true;
            }


        });
        document.getElementById("third-star").addEventListener("click", function () {
            if(!alreadyVoted){
                StarsModel.handleStars(link,StarsView.modifyStars);
                StarsModel.submitStars(username,3,link,callback);
                alreadyVoted=true;
            }


        });
        document.getElementById("fourth-star").addEventListener("click", function () {
            if(!alreadyVoted){
                StarsModel.handleStars(link,StarsView.modifyStars);
                StarsModel.submitStars(username,4,link,callback);
                alreadyVoted=true;
            }


        });
        document.getElementById("fifth-star").addEventListener("click", function () {
            if(!alreadyVoted){
                StarsModel.handleStars(link,StarsView.modifyStars);
                StarsModel.submitStars(username,5,link,callback);
                alreadyVoted=true;
            }
        });


        document.getElementById("first-star").addEventListener("mouseenter", function(){
            if(!alreadyVoted) {
                StarsView.hoverIn(1);
            }
        });
        document.getElementById("second-star").addEventListener("mouseenter", function(){
            if(!alreadyVoted) {
                StarsView.hoverIn(2);
            }
        });
        document.getElementById("third-star").addEventListener("mouseenter", function(){
            if(!alreadyVoted){
                StarsView.hoverIn(3);
            }
        });
        document.getElementById("fourth-star").addEventListener("mouseenter", function(){
            if(!alreadyVoted) {
                StarsView.hoverIn(4);
            }
        });
        document.getElementById("fifth-star").addEventListener("mouseenter", function(){
            if(!alreadyVoted) {
                StarsView.hoverIn(5);
            }
        });


        document.getElementById("first-star").addEventListener("mouseout", function(){
            if(!alreadyVoted) {
                StarsView.hoverOut(1);
            }
        });
        document.getElementById("second-star").addEventListener("mouseout", function(){
            if(!alreadyVoted) {
                StarsView.hoverOut(2);
            }
        });
        document.getElementById("third-star").addEventListener("mouseout", function(){
            if(!alreadyVoted) {
                StarsView.hoverOut(3);
            }
        });
        document.getElementById("fourth-star").addEventListener("mouseout", function(){
            if(!alreadyVoted) {
                StarsView.hoverOut(4);
            }
        });
        document.getElementById("fifth-star").addEventListener("mouseout", function(){
            if(!alreadyVoted) {
                StarsView.hoverOut(5);
            }
        });
    }

}


/*
document.getElementById("facebook-share").addEventListener("click",function () {
    let facebook_url="https://www.facebook.com/sharer/sharer.php?u=" + "https://www.google.com/"+"&hashtag=%23comit&quote="+"producta adhadiahdahadidahaid value 345";
    open_facebook_window(facebook_url);
});
*/





document.getElementById("facebook-share").addEventListener("click",function () {
    let url="http://localhost:80/stars/da.xml";
    RSSModel.getRSSXML(url,RSSView.createRSSNewsFeed);

});


const stars=new StarsController();