import google.generativeai as genai
import PIL.Image as pil
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv
import os
import traceback
import base64
import io
import markdown

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

model = genai.GenerativeModel("gemma-3-12b-it")
historico_inicial = [
    {"role": "user", "parts": [{"text": "Quero que você se comporte como uma simpática assitente e seu nome será LucIA. Você foi desenvolvida pelo Lucas Morais como um projeto da Disciplina de Inteligência Artifial do curso de Análise e Desenvolvimento de Sistema do IFPI"}]},
    {"role": "model", "parts": [{"text": "Olá, sou LucIA!👋 Como posso te ajudar hoje?"}]}
]
chat_session = model.start_chat(history=historico_inicial)

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


def enviar_prompt_texto(prompt):
    print("--- [LOG] Preparando para enviar o prompt para o Gemini... ---")
    try:
        response = chat_session.send_message(prompt)
        print("--- [LOG] Resposta recebida do Gemini com sucesso. ---")
        return response.text
    except Exception as e:
        print("--- [ERRO DETALHADO] A chamada para a API do Gemini falhou! ---")
        print(traceback.format_exc())


def enviar_prompt_imagem(prompt, imagem_bytes):
    img = pil.open(io.BytesIO(imagem_bytes))
    
    print("--- [LOG] Preparando para enviar imagem e prompt para o Gemini... ---")
    try:
        response = model.generate_content([prompt, img])
        print("--- [LOG] Resposta recebida do Gemini com sucesso. ---")
        return response.text
    except Exception as e:
        print("--- [ERRO DETALHADO] A chamada para a API do Gemini falhou! ---")
        print(traceback.format_exc())
        return "Desculpe, ocorreu um erro ao me comunicar com a IA para analisar a imagem."


@socketio.on('enviar_mensagem')
def handle_message(data):
    prompt = data.get('prompt')
    if not prompt:
        emit('receber_mensagem', {'response': "Erro: Nenhum prompt fornecido."})
        return

    resposta_ia = ""
    try:
        if 'image' in data:
            header, encoded = data['image'].split(",", 1)
            image_bytes = base64.b64decode(encoded)
            resposta_ia = enviar_prompt_imagem(prompt, image_bytes)
        else:
            resposta_ia = enviar_prompt_texto(prompt)

        resposta_html = markdown.markdown(resposta_ia)

        emit('receber_mensagem', {'response': resposta_html})

    except Exception as e:
        print(f"--- ERRO NO EVENTO WEBSOCKET: {e} ---")
        print(traceback.format_exc())
        emit('receber_mensagem', {'response': "Desculpe, um erro interno ocorreu."})


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
