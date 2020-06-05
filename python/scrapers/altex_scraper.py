import requests
import json
import mysql.connector
from bs4 import BeautifulSoup
from mysql.connector import pooling


def scrape_description(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    texts = soup.find(class_="Description").find(class_="Cms-container").find("div").findAll("p")[1:]
    description = ""
    for text in texts:
        description = description + text.text + "\n"
    description = description.rstrip()
    return description


def get_vendor(link, price):
    vendor = [{"logo": "https://www.ghidelectrocasnice.ro/wp-content/uploads/2013/10/altex-logo.jpg", "link": link,
               "name": "altex.ro",
               "price": price}]
    return json.dumps(vendor)


def add_data_in_database(database_connection):
    cursor = database_connection.cursor()
    categories = ["calculatoare", "electronice"]
    categories_links = [
        [
            "https://altex.ro/laptopuri/cpl/",
            "https://altex.ro/macbook/cpl/",
            "https://altex.ro/sisteme-pc-calculatoare/cpl/"
        ]
        [
            "https://altex.ro/telefoane/cpl/",
            "https://altex.ro/televizoare/cpl/",
            "https://altex.ro/media-playere/cpl/",
            "https://altex.ro/videoproiectoare-accesorii/cpl/"
        ]
    ]

    category_index = -1
    for category in categories_links:
        category_index = category_index + 1
        for page_link in category:
            page = requests.get(page_link)
            soup = BeautifulSoup(page.content, "html.parser")
            product_elements = soup.findAll(class_="Product")
            for product_element in product_elements:
                if not product_element.find(class_="Product-photo"):
                    continue
                link = product_element.find("a")["href"]
                title = product_element.find(class_="Product-name").text
                description = scrape_description(link)
                price = product_element.find(class_="Price-int").text.replace(".", "")
                image = product_element.find(class_="Product-photo")["src"]
                vendor = get_vendor(link, price)
                query = "INSERT IGNORE INTO products (link, title, info, description, price, offers, image, vendors) " \
                        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                values = (link, title, "", description,
                          price, "o oferta", image, vendor,)
                try:
                    cursor.execute(query, values)
                    database_connection.commit()
                except Exception as exception:
                    print(exception)
                    exit()
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


if __name__ == "__main__":
    connection_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="shoply_pool",
                                                                  pool_size=5,
                                                                  pool_reset_session=True,
                                                                  host="remotemysql.com",
                                                                  user="9RI3meN7i3",
                                                                  password="fV5wY4UVd3",
                                                                  database="9RI3meN7i3")
    add_data_in_database(connection_pool.get_connection())
