import json
from flask import Flask, request, jsonify
from preprocess import preprocess
from model_lstm import get_class_label
from preprocessBERT import preprocessBERT
from model_bert import get_class_label_bert
from model_cnn import get_class_label_cnn
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
        preprocess_sentence_cnn = preprocess(line)
        preprocess_inputs_bert = preprocessBERT(line)
    
    #get the output for both models
        sarcasm_percentage_lstm = get_class_label(preprocess_sentence_lstm,"../Models/LSTMOptimized(1).h5","../Encoder/encoder_lstm.pickle")
        sarcasm_percentage_cnn = get_class_label_cnn(preprocess_sentence_cnn,"../Models/CNNOptimized.h5","../Encoder/encoder_lstm.pickle")


    # print('.')
    # print('.')
    # print('.')
    # print('.')
        print("LSTM:-",sarcasm_percentage_lstm)
    # print('.')
    # print('.')
    # print('.')
    # print('.')
        print("CNN:-",sarcasm_percentage_cnn)

        label = ''

        lstm_weight = 0.5
        cnn_weight = 0.5

        weighted_avg = sarcasm_percentage_lstm*lstm_weight+sarcasm_percentage_cnn*cnn_weight
        if(weighted_avg>=0.5):
            label = 'Sarcasm'
        else:
            label = 'Regular'


        labels.append({"sentence":line,"class":label})

    # return {'labels':label, 'weight_avg':weighted_avg }, 200
    return {'labels':labels,  }, 200


