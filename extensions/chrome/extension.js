window.onload=	function(){

					var produs=null;

					var contentPanel=document.getElementById("content");
				 	var alternativesButton= document.getElementById("alternatives-button");
				 	var priceButton= document.getElementById("price-button");
				 	var similarButton= document.getElementById("similar-products-button");

				 	alternativesButton.addEventListener("click",function(){

						alternativesButton.style.backgroundColor="peachpuff";
						priceButton.style.backgroundColor="white";
						similarButton.style.backgroundColor="white";

						if(produs==null){
							contentPanel.innerHTML="";

							contentPanel.appendChild(createNotSearchedMSG());
						}

				 	},false);


				 	priceButton.addEventListener("click",function(){
						alternativesButton.style.backgroundColor="white";
						priceButton.style.backgroundColor="peachpuff";
						similarButton.style.backgroundColor="white";

						if(produs==null){
							contentPanel.innerHTML="";

							contentPanel.appendChild(createNotSearchedMSG());
						}

				 	},false);



				 	similarButton.addEventListener("click",function(){
						alternativesButton.style.backgroundColor="white";
						priceButton.style.backgroundColor="white";
						similarButton.style.backgroundColor="peachpuff";

						if(produs==null){
							contentPanel.innerHTML="";

							contentPanel.appendChild(createNotSearchedMSG());
						}

				 	},false);

				};

function createNotSearchedMSG(){
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