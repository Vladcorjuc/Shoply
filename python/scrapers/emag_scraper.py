import re
import requests
import json
import mysql.connector
from bs4 import BeautifulSoup
from mysql.connector import pooling

connection_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="shoply_pool",
                                                              pool_size=5,
                                                              pool_reset_session=True,
                                                              host="remotemysql.com",
                                                              user="9RI3meN7i3",
                                                              password="fV5wY4UVd3",
                                                              database="9RI3meN7i3")


def add_data_in_database(database_connection):
    cursor = database_connection.cursor()
    categories = ["calculatoare", "electronice"]
    categories_links = [
        [
            "https://www.emag.ro/laptopuri/c?ref=hp_menu_quick-nav_1_1&type=category",
            "https://www.emag.ro/label/laptopuri/Laptopuri-cu-Windows/c?ref=hp_menu_quick-nav_1_2&type=link"
        ],
        [
            "https://www.emag.ro/telefoane-mobile/c?ref=hp_menu_quick-nav_1_16&type=category",
            "https://www.emag.ro/tablete/c?ref=hp_menu_quick-nav_1_32&type=category",
            "https://www.emag.ro/televizoare/c?ref=hp_menu_quick-nav_190_1&type=category"
        ]
    ]

    category_index = -1
    for category in categories_links:
        category_index = category_index + 1
        for page_link in category:
            page = requests.get(page_link)
            soup = BeautifulSoup(page.content, "html.parser")
            product_elements = soup.findAll(class_="card")
            for product_element in product_elements:
                if not product_element.find(class_="lozad"):
                    continue
                link = product_element.find(class_="thumbnail-wrapper js-product-url")["href"]
                description = scrape_description(link)
                if description is None:
                    continue
                title = product_element.find(class_="product-title js-product-url")["title"]
                price = product_element.find(class_="product-new-price").text.replace(".", "")[:-6]
                image = product_element.find(class_="lozad")["data-src"]
                vendor = get_vendor(link, price)
                query = "INSERT IGNORE INTO products (link, title, characteristics, description, price, offers, image, vendors) " \
                        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                values = (link, title, "", description,
                          price, "o oferta", image, vendor,)
                try:
                    cursor.execute(query, values)
                    database_connection.commit()
                except Exception as exception:
                    print(exception)
                    exit()
                print(link)
                query = "INSERT IGNORE INTO product_log(link, price) VALUES (%s, %s)"
                values = (link, price)
                try:
                    cursor.execute(query, values)
                    database_connection.commit()
                except Exception as exception:
                    print(exception)
                    exit()
                query = "INSERT IGNORE INTO categories(category, link) VALUES (%s, %s)"
                values = (categories[category_index], link)
                try:
                    cursor.execute(query, values)
                    database_connection.commit()
                except Exception as exception:
                    print(exception)
                    exit()
            print(page_link)
    cursor.close()
    database_connection.close()


def scrape_description(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    if not soup.find(id="description-body"):
        return None
    description = soup.find(id="description-body").text
    description = re.sub("[\n|\t]+[\s]*", "\n", description)
    return description


def get_vendor(link, price):
    vendor = [{"logo": "https://s12emagst.akamaized.net/layout/ro/images/logo//49/73695.svg", "link": link,
               "name": "emag.ro",
               "price": price}]
    return json.dumps(vendor)


if __name__ == "__main__":
    add_data_in_database(connection_pool.get_connection())
