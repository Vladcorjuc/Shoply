class RSSView {
    static createRSSNewsFeed(productNews) {
        let newsDiv = document.getElementById("newsDiv");
        let newsList = document.createElement('ul');
        newsList.style.listStyleType="none";
        newsList.style.width="100%";
        for(let i=0;i<productNews.length;i++){
            if(i>=4){
                break;
            }
            let newsElement=document.createElement("li");

            let newsBody=document.createElement("div");
            newsBody.style.display="flex";
            newsBody.style.flexDirection="column";
           // newsBody.style.marginTop="-25px";
            //newsBody.style.marginLeft="20px";

            let link=document.createElement("a");
            link.href="../html/product.html?name="+scrapePathName(productNews[i]["link"]);

            let newsImg=document.createElement("img");
            newsImg.src=productNews[i]["img_url"];
            newsImg.style.height="60px";
            newsImg.style.marginTop="2px";
            newsImg.style.marginLeft="5px";
            newsImg.style.width="50px";

            link.appendChild(newsImg);

            let newsTitleAnchor=document.createElement("a");
            newsTitleAnchor.href="../html/product.html?name="+scrapePathName(productNews[i]["link"]);
            newsTitleAnchor.style.textDecoration="none";
            newsTitleAnchor.style.color="coral";

            let newsTitle=document.createElement("H4");
            newsTitle.innerText=productNews[i]["title"];
            newsTitle.style.textAlign="center";
            newsTitle.style.marginTop="10px";

            newsTitleAnchor.appendChild(newsTitle);

            let newsDescription=document.createElement("P");
            newsDescription.innerText=productNews[i]["description"];
            //newsDescription.style.marginLeft="25px";
            newsDescription.style.textAlign="center";

            let shareLink=document.createElement("img");
            shareLink.src="../images/share.png";
            shareLink.style.width="30px";
            shareLink.style.height="30px";
            shareLink.style.marginTop="20px";
            shareLink.style.marginRight="10px";

            shareLink.addEventListener("click",function () {
                let url="http://127.0.0.1/html/product.html?name="+scrapePathName(productNews[i]["link"]);
                let facebook_url="https://www.facebook.com/sharer/sharer.php?u=" +url+"&hashtag=%23comit&title="+productNews[i]["title"]+"&quote="+productNews[i]["description"];
                open_facebook_window(facebook_url);
            });

            newsBody.appendChild(newsTitleAnchor);
            newsBody.appendChild(newsDescription);


            newsElement.appendChild(link);
            newsElement.appendChild(newsBody);
            newsElement.appendChild(shareLink);

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

function open_facebook_window( facebook_url ) {
    window.open(
        facebook_url, 'share-facebook','width=580,height=296'
    );
}
let url="../php/models/rss.php";
RSSModel.getRSSXML(url,RSSView.createRSSNewsFeed);