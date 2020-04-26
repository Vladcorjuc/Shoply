import requests
from bs4 import BeautifulSoup
import json
import threading
import mysql.connector
from flask import Flask, request
from flask_cors import CORS

database = ''
app = Flask(__name__)
CORS(app)


def convert_to_int(price_string):
    number = 0
    currency = price_string[-4:]
    for character in price_string:
        if character.isdigit():
            number = number * 10 + int(character)

    price = [number, currency]
    return price


def put_product_in_table(cursor, product):
    response_vendors = scrape_vendors(product["link"])

    sql = "INSERT IGNORE INTO products " \
          "(link, title, description, price, currency, offer_num, image, vendors) " \
          "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    val = (product["link"], product["title"], product["description"], convert_to_int(product["price"])[0],
           convert_to_int(product["price"])[1], product["offer-num"], product["image"], response_vendors)
    try:
        cursor.execute(sql, val)
    except mysql.connector.Error as error:
        print(error.msg)


def put_products_in_table(products):
    cursor = database.cursor()
    for product in products:
        put_product_in_table(cursor, product)
    try:
        database.commit()
    except mysql.connector.Error as error:
        print(error.msg)
    cursor.close()


def scrape_products(page, add_to_database):
    page = requests.get(page)
    soup = BeautifulSoup(page.content, 'html.parser')
    product_elements = soup.find_all(class_='product-box clearfix')

    products = []

    for product in product_elements:
        product_title = product.find(class_='name ulined-link').find('a').get_text()
        product_description = ""
        if product.find(class_='description clearfix hidden-xs'):
            product_description = str(product.find(class_='description clearfix hidden-xs').ul)

        product_price = product.find(class_='price').get_text()[6::]
        product_offer_num = product.find(class_='offer-num').get_text().lstrip().rstrip()
        product_link = product.find(class_='image')['href']
        product_image_url = product.find(class_="img-responsive lazy")
        if product_image_url:
            product_image_url = product_image_url['data-lazy-src']
        else:
            product_image_url = product.find(class_='img-responsive')['src']
        products.append({'link': product_link, 'title': product_title, 'description': product_description,
                         'price': product_price, 'offer-num': product_offer_num, 'image': product_image_url})
    if add_to_database:
        x = threading.Thread(target=put_products_in_table, args=products)
        x.start()
    return json.dumps(products)


@app.route("/vendors", methods=["GET", "POST"])
def scrape_vendors(product_link=None):
    if product_link is None:
        product_query = request.args
        product_link = product_query["product_link"]
    page = requests.get(product_link)
    soup = BeautifulSoup(page.content, 'html.parser')
    products = soup.find_all(itemprop='offers')

    vendors = []

    for i in range(1, len(products)):
        product = products[i]
        logo_raw_url = product.find(class_="col-logo")
        if logo_raw_url:
            logo_raw_url = logo_raw_url.find(class_="img-responsive logo-host")
        if logo_raw_url:
            logo_url = logo_raw_url['src']
        else:
            logo_url = "NO_LOGO"
        offers_price = product.find(itemprop="price").get("content")
        offers_price_currency = product.find(itemprop="priceCurrency").get("content")
        vendor_name = product.find(itemprop="seller").get("content")
        vendors.append({'logo': logo_url, 'price': offers_price, 'currency': offers_price_currency,
                        'name': vendor_name})
    return json.dumps(vendors)


def initialize_database():
    categories_link = [
        "https://www.compari.ro/telefoane-mobile-c3277/",
        "https://www.compari.ro/televizoare-c3164/",
        "https://www.compari.ro/husa-telefon-mobil-pda-gps-c4202/",
        "https://smartwatch-bratara-fitness.compari.ro/",
        "https://www.compari.ro/aparate-foto-c40/",
        "https://boxa-portabila.compari.ro/",
        "https://www.compari.ro/headset-c3740/",
        "https://www.compari.ro/boxe-active-c4060/",
        "https://www.compari.ro/microfoane-si-casti-c3109/",
        "https://www.compari.ro/obiectiv-aparat-foto-c4191/",

        "https://www.compari.ro/notebook-laptop-c3100/",
        "https://tablet-pc.compari.ro/",
        "https://www.compari.ro/imprimante-si-multifunctionale-c3134/",
        "https://www.compari.ro/monitoare-c3126/",
        "https://www.compari.ro/placi-video-c3142/",
        "https://www.compari.ro/software-jocuri-c3255/",
        "https://www.compari.ro/cartuse-si-tonere-c3138/",
        "https://www.compari.ro/procesoare-c3139/",
        "https://www.compari.ro/placi-de-baza-c3128/",
        "https://www.compari.ro/console-c3154/",
        "https://www.compari.ro/routere-c3144/",
        "https://solid-state-drive-ssd.compari.ro/",

        "https://www.compari.ro/frigidere-congelatoare-c3168/",
        "https://www.compari.ro/masini-de-spalat-c3167/",
        "https://www.compari.ro/aspiratoare-c3170/",
        "https://www.compari.ro/cafetiere-filtre-de-cafea-c3174/",
        "https://www.compari.ro/hote-c3873/",
        "https://www.compari.ro/aer-conditionat-c3172/",
        "https://www.compari.ro/masini-de-spalat-vase-c3171/",
        "https://www.compari.ro/cuptoare-cu-microunde-c3179/",

        "https://pantof-dama.compari.ro/",
        "https://pantof-barbati.compari.ro/",
        "https://genti-dama.compari.ro/",
        "https://geanta-de-umar.compari.ro/",
        "https://valiza.compari.ro/",
        "https://www.compari.ro/rucsac-c3925/",
        "https://papuc-dama.compari.ro/",
        "https://pantof-copii.compari.ro/",
        "https://ciorapi.compari.ro/",
        "https://geanta-diplomat.compari.ro/",

        "https://www.compari.ro/biciclete-c104/",
        "https://www.compari.ro/trotineta-c3008/",
        "https://ceas-sport-computer.compari.ro/",
        "https://www.compari.ro/benzi-de-alergare-c4073/",
        "https://www.compari.ro/biciclete-fitness-c3044/",
        "https://geanta-frigorifica.compari.ro/",
        "https://proteina.compari.ro/",

        "https://www.compari.ro/parfumuri-c3262/",
        "https://www.compari.ro/epilatoare-c3185/",
        "https://www.compari.ro/placa-de-intins-parul-c4209/",
        "https://www.compari.ro/aparat-de-tuns-c4208/",

        "https://www.compari.ro/carucioare-c3919/",
        "https://www.compari.ro/scaune-auto-copii-c3950/",
        "https://pat-pentru-bebelusi.compari.ro/",
        "https://www.compari.ro/scutece-c3241/",
        "https://premergator.compari.ro/",

        "https://www.compari.ro/motosapa-c4186/",
        "https://drujba.compari.ro/",
        "https://www.compari.ro/motocoasa-c4184/",
        "https://aparat-de-spalat-cu-presiune.compari.ro/",
        "https://www.compari.ro/masina-de-tuns-iarba-c4185/",
        "https://pompa.compari.ro/",
        "https://generator.compari.ro/",
        "https://pulverizator.compari.ro/",

        "https://www.compari.ro/anvelope-c3615/",
        "https://www.compari.ro/lubrifiante-c3678/",
        "https://www.compari.ro/acumulatoare-auto-c3660/",
        "https://www.compari.ro/jante-c4074/",
        "https://ulei-cutie-de-viteza.compari.ro/",
        "https://acumulator-moto.compari.ro/",
        "https://incarcator-baterii-auto.compari.ro/",
        "https://husa-scaun-auto.compari.ro/",

        "https://lego.compari.ro/",
        "https://tricicleta.compari.ro/",
        "https://www.compari.ro/vehicule-biciclete-triciclete-c4043/",
        "https://tobogan.compari.ro/",
        "https://www.compari.ro/playmobile-c3830/",
        "https://www.compari.ro/joc-de-societate-c3805/",
        "https://masinuta-electrica-vehicul-electric.compari.ro/",
        "https://bucatarie-copii.compari.ro/",
        "https://www.compari.ro/papusi-c3831/",

        "https://www.compari.ro/copiatoare-c83/",
        "https://scaun-de-birou-rotativ.compari.ro/",
        "https://www.compari.ro/telefoane-c89/",
        "https://www.compari.ro/ghiozdane-c3991/",
        "https://stilou.compari.ro/",
        "https://pix.compari.ro/",
        "https://www.compari.ro/calculator-de-birou-c3414/",
        "https://penar.compari.ro/",
        "https://masina-de-gaurit-si-insurubat.compari.ro/",

        "https://aparat-de-sudura-invertor.compari.ro/",
        "https://polizor-unghiular.compari.ro/",
        "https://bormasina-ciocan-rotopercutor.compari.ro/",
        "https://masina-de-insurubat-cu-impact.compari.ro/",
        "https://camera-ip.compari.ro/",
        "https://foto-tapet.compari.ro/",
        "https://termostat.compari.ro/",
        "https://www.compari.ro/camere-de-supraveghere-c3871/",
        "https://fierastrau-circular-manual.compari.ro/"
    ]

    cursor = database.cursor()
    i = -1
    for page in categories_link:
        i = i + 1
        products = json.loads(scrape_products(page, False))
        print(i)

        for product in products:
            put_product_in_table(cursor, product)

            category = "constructie"
            if i < 10:
                category = "electronice"
            elif i < 22:
                category = "calculatoare"
            elif i < 29:
                category = "electrocasnice"
            elif i < 39:
                category = "imbracaminte"
            elif i < 46:
                category = "sport"
            elif i < 50:
                category = "sanatate"
            elif i < 55:
                category = "bebelusi"
            elif i < 63:
                category = "casa"
            elif i < 71:
                category = "auto"
            elif i < 80:
                category = "jucarii"
            elif i < 90:
                category = "birou"

            sql = "INSERT IGNORE INTO categories(link, category) VALUES (%s, %s)"
            val = (product['link'], category)
            try:
                cursor.execute(sql, val)
            except mysql.connector.Error as error:
                print(error.msg)

        try:
            database.commit()
        except mysql.connector.Error as error:
            print(error.msg)
    cursor.close()


@app.route("/search", methods=["GET", "POST"])
def scrape_from_search():
    search_query = request.args
    search_query = search_query["search"]
    main_url = "https://www.compari.ro/CategorySearch.php?st=" + search_query.replace(" ", "+").replace("%20", "+")
    result = scrape_products(main_url, True)
    return result


@app.route("/data", methods=["GET", "POST"])
def get_data():
    product_data = request.args
    product_link = product_data["product_link"]
    sql = "SELECT price, updated_at FROM product_log WHERE link = %s"
    val = product_link
    cursor = database.cursor()
    cursor.execute(sql, val)
    result = cursor.fetchall()
    data = []
    for data_log in result:
        date_time = data_log[1].strftime("%m/%d/%Y")
        data.append(dict({'x': data_log[0], 'y': date_time}))
    cursor.close()
    return json.dumps(data)


if __name__ == "__main__":
    database = mysql.connector.connect(host="34.65.28.199", user="shoply", passwd="shoply", database="shoply",
                                       auth_plugin='mysql_native_password')
    initialize_database()
    app.run(ssl_context='adhoc')
