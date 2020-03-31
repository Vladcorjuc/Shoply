window.onload=	function(){
				 	if (document.readyState !== "loading") {
				 		$('#wait').hide();
				 			ExtensionController.pageController();
					} else {
						$('#wait').hide();
    					document.addEventListener("DOMContentLoaded", ExtensionController.pageController());
					}


};
class ExtensionController{
	static pageController(){
		var products=null;

		var contentPanel=document.getElementById("content");
		var alternativesButton= document.getElementById("alternatives-button");
		var priceButton= document.getElementById("price-button");
		var similarButton= document.getElementById("similar-products-button");
		var searchButton= document.getElementById("search-button");

		
		alternativesButton.addEventListener("click",function(){ExtensionView.firsMenuOption(products)},false);
		priceButton.addEventListener("click",function(){ExtensionView.secondMenuOption(products)},false);
		similarButton.addEventListener("click",function(){ExtensionView.thirdMenuOption(products)},false);
						 	 
		searchButton.addEventListener("click",function(){
			var searchedText=document.getElementById("search-text").value;
			if(searchedText!==null&&searchedText!==''){
				var response;
				contentPanel.innerHTML=" ";
				response=ExtensionModel.getProductsFromServer(searchedText);
				if(response.message=="OK"&&response.data.length){
					products=response.data;
				}
				else{
					products=null;
				}

				ExtensionView.firsMenuOption(products);
							 			
			}
								
		},false);




	}
	
}
class ExtensionView{
	static firsMenuOption(products){
		var contentPanel=document.getElementById("content");
		var alternativesButton= document.getElementById("alternatives-button");
		var priceButton= document.getElementById("price-button");
		var similarButton= document.getElementById("similar-products-button");


		alternativesButton.style.backgroundColor="peachpuff";
		priceButton.style.backgroundColor="white";
		similarButton.style.backgroundColor="white";


		if(products===null){
			contentPanel.innerHTML="";
			contentPanel.appendChild(ExtensionView.createNotSearchedMSG());
		}
		else{
			contentPanel.innerHTML="";
			for (var key in products) {
				if (products.hasOwnProperty(key)) {
						contentPanel.innerHTML+="<p>"+products[key]["title"]+"  "+products[key]["description"]+" "+products[key]["offer-num"]+"<p><br>";
									 
				}
			}
		}
	}
	static secondMenuOption(products){
		var contentPanel=document.getElementById("content");
		var alternativesButton= document.getElementById("alternatives-button");
		var priceButton= document.getElementById("price-button");
		var similarButton= document.getElementById("similar-products-button");

		alternativesButton.style.backgroundColor="white";
		priceButton.style.backgroundColor="peachpuff";
		similarButton.style.backgroundColor="white";

		if(products==null){
			contentPanel.innerHTML="";
			contentPanel.appendChild(ExtensionView.createNotSearchedMSG());
		}
	}
	static thirdMenuOption(products){
		var contentPanel=document.getElementById("content");
		var alternativesButton= document.getElementById("alternatives-button");
		var priceButton= document.getElementById("price-button");
		var similarButton= document.getElementById("similar-products-button");

		alternativesButton.style.backgroundColor="white";
		priceButton.style.backgroundColor="white";
		similarButton.style.backgroundColor="peachpuff";

		if(products==null){
			contentPanel.innerHTML="";
			contentPanel.appendChild(ExtensionView.createNotSearchedMSG());
		}
	}
	static createNotSearchedMSG(){
		var notSearchedMessage=document.createElement("P");
		notSearchedMessage.style.fontFamily="\"Open Sans\", sans-serif";
		notSearchedMessage.style.fontSize="large";
		notSearchedMessage.innerText="You have not searched any product yet."
		notSearchedMessage.style.textAlign="center";
		notSearchedMessage.style.width="100%";
		notSearchedMessage.style.marginTop="20px";
	    notSearchedMessage.style.color="#5e5e5e";

	    return notSearchedMessage;
	}
}
class ExtensionModel{
	static getProductsFromServer(searchedText){
		var response;
		$.ajax({
					type: "GET",
					url: "https://127.0.0.1:5000/search?search="+searchedText,
					dataType: "json",
					async:false,
					beforeSend: function() { $('#wait').show(); },
					success: function (data) {
						response={data:JSON.parse(data),message: "OK"};

					},
					error:function (data) {
						response={data:JSON.stringify(data),message: "ERROR"};
					},
        			complete: function() { $('#wait').hide(); }
				});
		return response;
	}
	static getProductVendorsFromServer(productURL){
		var response;
		$.ajax({
					type: "GET",
					url: "https://127.0.0.1:5000/vendors?product_link="+productURL,
					dataType: "json",
					async:false,
					success: function (data) {
						response={data:JSON.parse(data),message: "OK"};

					},
					error:function (data) {
						response={data:JSON.stringify(data),message: "ERROR"};
					}
				});
		return response;
	}
}





