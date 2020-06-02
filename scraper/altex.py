import sys
sys.path.insert(0, 'lib')
import requests
from bs4 import BeautifulSoup
import json
import threading
from datetime import date, datetime
import ast
import mysql.connector
from mysql.connector import Error
from mysql.connector import pooling

conn_pool=mysql.connector.pooling.MySQLConnectionPool(pool_name="shoply_pool",
                                                    pool_size=5,
                                                    pool_reset_session=True,
                                                    host="remotemysql.com",
                                                    user="9RI3meN7i3",
                                                    password="fV5wY4UVd3",
                                                    database="9RI3meN7i3")


def getVendor(link,price):
    vendor=[{'link':link,'price':price,'logo':"https://www.ghidelectrocasnice.ro/wp-content/uploads/2013/10/altex-logo.jpg",'name':"altex.ro",'currency':"RON"}]
    return vendor
def getDescription(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, 'html.parser')
    texts=soup.find(class_="Description").find(class_="Cms-container").find('div').findAll('p')[1:]
    description=""
    for text in texts:
        description=description+text.text+"\n"
    description=description.rstrip()
    return description

def initialize_database(conn):
    cursor=conn.cursor()
    pages=[
        "https://altex.ro/telefoane/cpl/",
        "https://altex.ro/laptopuri/cpl/",
        "https://altex.ro/televizoare/cpl/",
        "https://altex.ro/media-playere/cpl/",
        "https://altex.ro/sisteme-pc-calculatoare/cpl/",
        "https://altex.ro/videoproiectoare-accesorii/cpl/"
    ]
    for page_link in pages:
        page = requests.get(page_link)
        soup = BeautifulSoup(page.content, 'html.parser')
        products=soup.findAll(class_="Product")
        for product in products:
            if(not product.find(class_="Product-photo")):
                continue
            img_link=product.find(class_="Product-photo")['src']
            price=product.find(class_="Price-int").text.replace('.','')
            name=product.find(class_="Product-name").text
            link=product.find('a')['href']
            vendor=getVendor(link,price)
            description=getDescription(link)
            sql = "INSERT INTO products (title,description,price,currency,offers,link,image,vendors,info) VALUES (%s, %s, %s,%s,%s,%s,%s,%s,%s)"
            val = (name,description,price,"RON","o oferta",link,img_link,json.dumps(vendor),"")
            try:
                cursor.execute(sql,val)
                conn.commit()
                sql="INSERT INTO categories(link,category) VALUES(%s,%s)"
                val=(link,"electronice")
                try:
                    cursor.execute(sql,val)
                    conn.commit()
                except Exception as e:
                    print(e)
            except Exception as e:
                print(e)
            finally:
                sql="INSERT INTO product_log(link,updated_at,price) VALUES(%s,NOW(),%s)"
                val=(link,price)
                try:
                    cursor.execute(sql,val)
                    conn.commit()
                except Exception as e:
                    print(e)
    cursor.close()
    conn.close()

if __name__ == "__main__":
	initialize_database(conn_pool.get_connection())