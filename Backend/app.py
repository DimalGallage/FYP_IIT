from flask import Flask, request, jsonify
from preprocess import preprocess

app = Flask(__name__)

labels = []
sentences = []


#get classification from the model
def getClassification(sentence):
    return "sarcasm"


@app.route("/getClass", methods=['GET'])
def home():
    request_body = request.get_data()
    sentence = request.get_json()['sentence']

    print(sentence)
    preprocess_sentence = preprocess(sentence)
    print(preprocess_sentence)

    return {'labels':labels }, 200