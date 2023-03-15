from flask import Flask, request, jsonify
from preprocess import preprocess
from model_lstm import get_class_label

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

    label = get_class_label(preprocess_sentence,"../Models/best_model.h5","../Encoder/encoder_lstm.pickle")
    print("the label is ---->   ",label)

    return {'labels':labels }, 200