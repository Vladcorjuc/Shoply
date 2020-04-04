import requests
from bs4 import BeautifulSoup
import json
from flask import Flask, render_template, request, redirect, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



def scrapeProducts(page):
	page = requests.get(page)
	soup = BeautifulSoup(page.content, 'html.parser')
	product_elems = soup.find_all( class_='product-box clearfix')

	products=[]

	for product in product_elems:
		product_title=product.find(class_='name ulined-link').find('a').get_text()
		product_description=""
		if(product.find(class_='description clearfix hidden-xs')):
			product_description=str(product.find(class_='description clearfix hidden-xs').ul)

		product_price=product.find(class_='price').get_text()[6::]  
		product_offer_num=product.find(class_='offer-num').get_text().lstrip().rstrip()       
		product_link=product.find(class_='image')['href']
		product_image_url=product.find(class_="img-responsive lazy")
		if(product_image_url):
			product_image_url=product_image_url['data-lazy-src']
		else:
			product_image_url=product.find(class_='img-responsive')['src']
		products.append({'title':product_title,'description':product_description,'price':product_price,'offer-num':product_offer_num,'link':product_link,'image':product_image_url})
	return json.dumps(products)


@app.route("/vendors",methods=["GET", "POST"])
def scrapeVendors():
	productQuery=request.args
	product_link=productQuery["product_link"]
	page = requests.get(product_link)
	soup = BeautifulSoup(page.content, 'html.parser')
	product_elems = soup.find_all( itemprop='offers')

	vendors=[]

	for i in range(1, len(product_elems)):
		product=product_elems[i]
		logo_raw_url=product.find(class_="col-logo")
		if(logo_raw_url):
			logo_raw_url=logo_raw_url.find(class_="img-responsive logo-host")
		if(logo_raw_url):
			logo_url=logo_raw_url['src']
			offers_name=logo_raw_url['alt']
		else:
			logo_url="NO_LOGO"
		offers_price=product.find(itemprop="price").get("content")
		offers_price_currency=product.find(itemprop="priceCurrency").get("content")
		vendor_name=product.find(itemprop="seller").get("content")
		vendors.append({'logo':logo_url,'price':offers_price,'currency':offers_price_currency,'name':vendor_name})
	return json.dumps(vendors)


@app.route("/search",methods=["GET", "POST"])
def scrapeFromSearch():
	searchQuery=request.args
	searchQuery=searchQuery["search"]
	mainURL="https://www.compari.ro/CategorySearch.php?st="+searchQuery.replace(" ","+").replace("%20","+")
	result=scrapeProducts(mainURL)
	return json.dumps(result)


if __name__ == "__main__":
	app.run(ssl_context='adhoc')








