#coding: utf-8
from flask import Flask
from flask import send_file, send_from_directory
import os
app = Flask(__name__)
root = os.path.dirname(os.path.abspath(__file__))#html是个文件夹

@app.route('/<path:filename>')
def data_route(filename):
    return send_from_directory(root, filename,
                               cache_timeout=0)

@app.route('/')
def home():
    return send_from_directory(root, "index.html")#homepage.html在html文件夹下


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8082,debug=True) #真正运行时不要用debug=True