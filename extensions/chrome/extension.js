let products = null;
let isProductSelected = false;
let productSelected = null;
let contentPanel=null;
let alternativesButton =null;
let priceButton =null;
let similarButton =null;
let searchButton = null;


window.onload=	function(){
	if (document.readyState !== "loading") {
		contentPanel = document.getElementById("content");
		alternativesButton= document.getElementById("alternatives-button");
		priceButton=document.getElementById("price-button");
		similarButton=document.getElementById("similar-products-button");
		searchButton=document.getElementById("search-button");
		ExtensionController.pageController();
	} else {
		contentPanel = document.getElementById("content");
		alternativesButton= document.getElementById("alternatives-button");
		priceButton=document.getElementById("price-button");
		similarButton=document.getElementById("similar-products-button");
		searchButton=document.getElementById("search-button");
		contentPanel.innerHTML="<p>celka</p>";
		document.addEventListener("DOMContentLoaded", ExtensionController.pageController());
	}


};
class ExtensionController{
	static pageController(){


		alternativesButton.addEventListener("click",function(){ExtensionView.firsMenuOption()});
		priceButton.addEventListener("click",function(){ExtensionView.secondMenuOption()});
		similarButton.addEventListener("click",function(){ExtensionView.thirdMenuOption()});

		searchButton.addEventListener("click",function (){ExtensionView.searchOption()});

	}
	
}
class ExtensionView{
	static searchOption(){
		const searchedText = document.getElementById("search-text").value;
		if(searchedText!==null&&searchedText!==''){
			var response;

			response=ExtensionModel.getProductsFromServer(searchedText);
			contentPanel.innerHTML="";
			if(response.message==="OK"&&response.data.length){
				products=response.data;
				isProductSelected=false;
			}
			else{
				products=null;
			}
			ExtensionView.firsMenuOption(products);

		}
	}
	static firsMenuOption(){


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
						ExtensionView.createProductElement(products[key]);
				}
			}
		}
		if(isProductSelected===true){
			contentPanel.innerHTML="";
			ExtensionView.createProductPage();
		}
	}
	static secondMenuOption(){

		alternativesButton.style.backgroundColor="white";
		priceButton.style.backgroundColor="peachpuff";
		similarButton.style.backgroundColor="white";

		if(products===null){
			contentPanel.innerHTML="";
			contentPanel.appendChild(ExtensionView.createNotSearchedMSG());
		}
		if(isProductSelected===false){
			contentPanel.innerHTML="";
			contentPanel.appendChild(ExtensionView.createNotSelectedMSG());
		}
		else{
			contentPanel.innerHTML="TO DO";
		}

	}
	static thirdMenuOption(){

		alternativesButton.style.backgroundColor="white";
		priceButton.style.backgroundColor="white";
		similarButton.style.backgroundColor="peachpuff";

		if(products==null){
			contentPanel.innerHTML="";
			contentPanel.appendChild(ExtensionView.createNotSearchedMSG());
		}
		if(isProductSelected===false){
			contentPanel.innerHTML="";
			contentPanel.appendChild(ExtensionView.createNotSelectedMSG());
		}
		else{
			contentPanel.innerHTML="";
			for(var key in products){
				if(products.hasOwnProperty(key)&&products[key]["title"]!==productSelected["title"]){
					ExtensionView.createProductElement(products[key]);
				}
			}
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
	static createNotSelectedMSG(){
		var notSearchedMessage=document.createElement("P");
		notSearchedMessage.style.fontFamily="\"Open Sans\", sans-serif";
		notSearchedMessage.style.fontSize="large";
		notSearchedMessage.innerText="You have not selected any product yet."
		notSearchedMessage.style.textAlign="center";
		notSearchedMessage.style.width="100%";
		notSearchedMessage.style.marginTop="20px";
	    notSearchedMessage.style.color="#5e5e5e";

	    return notSearchedMessage;
	}

	static createProductElement(product) {
		let productDiv = document.createElement("DIV");
		productDiv.style.display="flex";
		productDiv.style.border="2px dashed";
		productDiv.style.borderColor="#ffb441";
		productDiv.style.width="96%";
		productDiv.style.height="90px";
		productDiv.style.marginLeft="10px";
		productDiv.style.marginRight="10px";
		productDiv.style.marginTop="5px";

		let productImage = document.createElement("IMG");
		productImage.src=product["image"];
		productImage.style.marginTop="10px";
		productImage.style.marginLeft="10px";
		productImage.style.width="60px";
		productImage.style.height="70px";

		let productTitle=document.createElement("H4");
		productTitle.innerText=product["title"];
		productTitle.style.marginLeft="20px";
		productTitle.style.color="coral";
		productTitle.style.marginTop="30px";
		productTitle.style.width="140px";



		let priceElement=document.createElement("P");
		priceElement.innerText="De la "+product["price"];
		priceElement.style.marginTop="30px";
		priceElement.style.width="80px";
		priceElement.style.color="coral";


		let chevronElement=document.createElement("INPUT");
		chevronElement.type="image";
		chevronElement.src="chevron.png";
		chevronElement.style.marginTop="20px";
		chevronElement.style.marginLeft="10px";
		chevronElement.style.width="50px";
		chevronElement.style.height="50px";

		chevronElement.addEventListener("click",function () {
			isProductSelected=true;
			productSelected=product;
			ExtensionView.firsMenuOption();
		},false);

		productDiv.appendChild(productImage);
		productDiv.appendChild(productTitle);
		productDiv.appendChild(priceElement);
		productDiv.appendChild(chevronElement);



		document.getElementById("content").appendChild(productDiv);


	}

	static createProductPage() {
		let productDiv=document.createElement("DIV");
		let infoDiv=document.createElement("DIV");
		infoDiv.style.width="100%";
		infoDiv.style.display="flex";

		let productTitle=document.createElement("H3");
		productTitle.innerText=productSelected["title"];
		productTitle.style.textAlign="center";
		productTitle.style.color="coral";
		productTitle.style.width="100%";




		let productImage= document.createElement("IMG");
		productImage.src=productSelected['image'];
		productImage.style.marginLeft="40px";
		productImage.style.marginTop="10px";

		infoDiv.appendChild(productImage);

		if(productSelected['description']!==null&&productSelected['description']!=="None"){
			let productDescription=document.createElement("P");
			productDescription.style.marginLeft="30px";
			productDescription.style.marginTop="10px";
			productDescription.innerHTML=productSelected['description']+"<br>";

			infoDiv.appendChild(productDescription);
		}
		productDiv.appendChild(productTitle);
		productDiv.appendChild(infoDiv);



		let productVendors=ExtensionModel.getProductVendorsFromServer(productSelected["link"]).data;
		let vendorsDiv=document.createElement("DIV");
		vendorsDiv.style.marginTop="30px";
		vendorsDiv.style.marginLeft="15%";
		let vendorsUl=document.createElement("UL");
		vendorsUl.style.overflow="auto";
		vendorsUl.style.maxHeight="100px";
		for (var key in productVendors) {
			if (productVendors.hasOwnProperty(key)) {

				let vendorLi=ExtensionView.createVendorDiv(productVendors[key]);
				vendorsUl.appendChild(vendorLi);
			}
		}
		vendorsDiv.appendChild(vendorsUl);

		contentPanel.appendChild(productDiv);
		contentPanel.appendChild(vendorsDiv);


	}

	static  createVendorDiv(productVendor) {
		let vendorLi=document.createElement("LI");
		vendorLi.style.display="flex";
		vendorLi.style.border="1px dashed";
		vendorLi.style.borderColor="#ffb441";
		vendorLi.style.width="85%";

		let vendorName=document.createElement("H4");
		vendorName.innerText=productVendor["name"];
		vendorName.style.marginLeft="20px";
		vendorName.style.color="coral";
		vendorName.style.marginTop="10px";
		vendorName.style.width="140px";

		let vendorLogo = document.createElement("IMG");
		vendorLogo.src=productVendor["logo"];
		vendorLogo.style.marginTop="10px";
		vendorLogo.style.marginLeft="10px";
		vendorLogo.style.width="120px";
		vendorLogo.style.height="20px";

		let vendorPrice=document.createElement("H4");
		vendorPrice.innerText=productVendor["price"]+" "+productVendor["currency"];
		vendorPrice.style.marginLeft="20px";
		vendorPrice.style.color="coral";
		vendorPrice.style.marginTop="10px";
		vendorPrice.style.width="140px";

		vendorLi.appendChild(vendorName);
		vendorLi.appendChild(vendorLogo);
		vendorLi.appendChild(vendorPrice);

		return vendorLi;
		
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
					success: function (data) {
						response={data:JSON.parse(data),message: "OK"};

					},
					error:function (data) {
						response={data:JSON.stringify(data),message: "ERROR"};
					},
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
						response={data:data,message: "OK"};

					},
					error:function (data) {
						response={data:JSON.stringify(data),message: "ERROR"};
					}
				});
		return response;
	}
}





