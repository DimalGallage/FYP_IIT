import json
from flask import Flask, request, jsonify
from preprocess import preprocess
from model_lstm import get_class_label
from preprocessBERT import preprocessBERT
from model_bert import get_class_label_bert
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

labels = []
sentences = []


#get classification from the model
def getClassification(sentence):
    return "sarcasm"


@app.route("/getClass", methods=['POST'])
def home():
    payload = request.get_json()
    sentence = payload['sentences']
    
    print(sentence)
    print(type(sentence))

    # sentence = json.loads(sentence)
    # print(sentence[0])
    labels = []
    for line in sentence:
        print(line)
    

    # sentence = request.get_json()['sentence']
    # sentence = ""

    #preprocess sentence for both models
        preprocess_sentence_lstm = preprocess(line)
        preprocess_inputs_bert = preprocessBERT(line)
    
    #get the output for both models
        sarcasm_percentage_lstm = get_class_label(preprocess_sentence_lstm,"../Models/LSTMOptimized.h5","../Encoder/encoder_lstm.pickle")
        sarcasm_percentage_bert = get_class_label_bert(preprocess_inputs_bert)


    # print('.')
    # print('.')
    # print('.')
    # print('.')
        print("LSTM:-",sarcasm_percentage_lstm)
    # print('.')
    # print('.')
    # print('.')
    # print('.')
        print("BERT:-",sarcasm_percentage_bert)

        label = ''

        lstm_weight = 0.4
        bert_weight = 0.6

        weighted_avg = sarcasm_percentage_lstm*lstm_weight+sarcasm_percentage_bert*bert_weight
        if(weighted_avg>=0.5):
            label = 'Sarcasm'
        else:
            label = 'Regular'


        labels.append({"sentence":line,"class":label})

    # return {'labels':label, 'weight_avg':weighted_avg }, 200
    return {'labels':labels,  }, 200


