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

var open_facebook_window = function( facebook_url ) {
    window.open(
        facebook_url, 'share-facebook','width=580,height=296'
    );
    return false;
};
/*
document.getElementById("facebook-share").addEventListener("click",function () {
    let facebook_url="https://www.facebook.com/sharer/sharer.php?u=" + "https://www.google.com/"+"&hashtag=%23comit&quote="+"producta adhadiahdahadidahaid value 345";
    open_facebook_window(facebook_url);
});
*/



class RSSView {
    static createRSSNewsFeed(productNews) {
        let newsDiv = document.getElementById("newsDiv");
        let newsList = document.createElement('ul');
        newsList.style.listStyleType="none";
        newsList.style.width="50%";
        for(let i=0;i<productNews.length;i++){
            let newsElement=document.createElement("li");
            newsElement.style.borderStyle="dotted";
            newsElement.style.backgroundColor="#ffebcc";
            newsElement.style.borderColor="coral";
            newsElement.style.marginTop="3px";

            let newsBody=document.createElement("div");
            newsBody.style.display="flex";
            newsBody.style.marginTop="-25px";
            newsBody.style.marginLeft="20px";

            let link=document.createElement("a");
            link.href=productNews[i]["link"];

            let newsImg=document.createElement("img");
            newsImg.src=productNews[i]["img_url"];
            newsImg.style.height="60px";
            newsImg.style.marginTop="-15px";
            newsImg.style.width="50px";

            link.appendChild(newsImg);

            let newsTitle=document.createElement("H4");
            newsTitle.innerText=productNews[i]["title"];
            newsTitle.style.textAlign="center";
            newsTitle.style.marginTop="5px";

            let newsDescription=document.createElement("P");
            newsDescription.innerText=productNews[i]["description"];
            newsDescription.style.marginLeft="25px";
            newsDescription.style.textAlign="center";
            newsDescription.style.width="70%";

            let shareLink=document.createElement("img");
            shareLink.src="share.png";
            shareLink.style.width="30px";
            shareLink.style.height="30px";
            shareLink.style.alignItems="right";
            shareLink.style.marginLeft="10px";

            shareLink.addEventListener("click",function () {
                console.log(productNews[i]["link"]);
                let url=productNews[i]["link"].replace("localhost","127.0.0.1");
                let facebook_url="https://www.facebook.com/sharer/sharer.php?u=" +url+"&hashtag=%23comit&title="+productNews[i]["title"]+"&quote="+productNews[i]["description"];
                open_facebook_window(facebook_url);
            });




            newsBody.appendChild(link);
            newsBody.appendChild(newsDescription);
            newsBody.appendChild(shareLink);

            newsElement.appendChild(newsTitle);
            newsElement.appendChild(newsBody);

            newsList.appendChild(newsElement);
        }
        newsDiv.appendChild(newsList);

    }
}


class RSSModel{
    static getRSSXML(url,callback){
        let response="";
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("GET", url, true);
        if (xmlHttpRequest.overrideMimeType) {
            xmlHttpRequest.overrideMimeType('text/xml');
        }
        xmlHttpRequest.send();
        xmlHttpRequest.onreadystatechange = function() {
            // readyState: 0 = unsent, 1 = opened, 2 = headers_received, 3 = loading, 4 = done
            if (this.readyState === 1) {

            }
            if (this.readyState === 4) {
                if (this.status === 200) {
                    response = {data:this.responseText, message: "OK"};
                }
                else {
                    response = {data:this.responseText, message: "ERROR"};
                }
            }
        };
        xmlHttpRequest.onload=function(){
            let source=response.data;
            let productNews=[];
            console.log(source);
            let parser = new window.DOMParser().parseFromString(source, "text/xml");
            let items = parser.getElementsByTagName("item");
            for(let i=0;i<items.length;i++){
                let title=items[i].getElementsByTagName("title")[0].textContent;
                let link=items[i].getElementsByTagName("link")[0].textContent;
                let description=items[i].getElementsByTagName("description")[0].textContent;
                let image_url=items[i].getElementsByTagName("image")[0]
                    .getElementsByTagName("url")[0].textContent;

                productNews.push({"title":title,"link":link,"description":description,"img_url":image_url});
            }
            callback(productNews);
        };
    }
}

document.getElementById("facebook-share").addEventListener("click",function () {
    let url="http://localhost:80/stars/da.xml";
    RSSModel.getRSSXML(url,RSSView.createRSSNewsFeed);

});


const stars=new StarsController();