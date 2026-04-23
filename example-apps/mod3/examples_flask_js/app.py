from flask import Flask, request,render_template

app = Flask(__name__)

book_list = [ 
    {'item_id':'b001','item_name':'文学名作 100選','discount':10},
    {'item_id':'b002','item_name':'Python 入門','discount':20},
    {'item_id':'b003','item_name':'おいしいご飯の炊き方','discount':30},
]

pc_list = [ 
    {'item_id':'p001','item_name':'HDMI ケーブル (1m)','discount':15},
    {'item_id':'p002','item_name':'液晶タブレット 13.3 インチ','discount':25},
    {'item_id':'p003','item_name':'WiFi 無線 LAN ルーター','discount':35},
]

food_list = [ 
    {'item_id':'f001','item_name':'精米 5kg','discount':11},
    {'item_id':'f002','item_name':'クッキー詰め合わせ','discount':12},
]

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/timesale', methods=['GET'])
def timesale():
    queryString = request.args
    category = queryString.get('category')
    print(category)
    if category == 'book':
        item_list = book_list
    elif category == 'pc':
        item_list = pc_list
    elif category == 'food':
        item_list = food_list    
    return item_list
# 
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 8090, debug=True)