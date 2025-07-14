# 🤖 LucIA - Assistente com Inteligência Artificial

LucIA é um projeto de chatbot inteligente desenvolvido como trabalho final para a disciplina de Inteligência Artificial. A aplicação web permite que os usuários interajam com a assistente LucIA, que é alimentada pelo modelo de linguagem de última geração da Google, o Gemini.

## 🚀 Recursos

* **Interface de Chat Intuitiva:** Uma interface de chat limpa e amigável para uma comunicação fácil.
* **Comunicação em Tempo Real:** Utiliza WebSockets para uma troca de mensagens instantânea entre o usuário e a LucIA.
* **Suporte a Multimodalidade:** Capaz de processar tanto prompts de texto quanto de imagem, permitindo que os usuários enviem imagens e façam perguntas sobre elas.

## 🛠️ Tecnologias Utilizadas

* **Backend:**
    * Python
    * Flask
    * Flask-SocketIO
    * API Google Generative AI (Gemini 2.5 Flash)

* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript
    * Socket.IO Client

## 💻 Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/lucasmoraiscm/LucIA.git](https://github.com/lucasmoraiscm/LucIA.git)
    cd LucIA
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    python -m venv venv
    # No Windows
    .\venv\Scripts\activate
    # No macOS/Linux
    source venv/bin/activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure as variáveis de ambiente:**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione sua chave de API do Gemini ao arquivo `.env`:
        ```
        GEMINI_API_KEY="SUA_CHAVE_DE_API_AQUI"
        ```

5.  **Execute a aplicação:**
    ```bash
    flask run
    ```
    A aplicação estará disponível em `http://127.0.0.1:5000`.

## ⚙️ Como Usar

1.  Abra seu navegador e acesse `http://127.0.0.1:5000`.
2.  Digite suas perguntas na caixa de texto e pressione Enter ou clique no botão de envio.
3.  Para enviar uma imagem, clique no ícone de imagem, selecione uma imagem e, em seguida, digite sua pergunta sobre a imagem.

## 📁 Estrutura do Projeto
├── .gitignore
├── README.md
├── app.py
├── requirements.txt
├── static
│   ├── css
│   │   └── style.css
│   ├── img
│   │   ├── bot_favicon.png
│   │   ├── bot_logo.png
│   │   ├── enviar.png
│   │   └── imagem.png
│   └── js
│       └── script.js
└── templates
└── index.html

## 🧑‍💻 Autor

* **Lucas Morais** - [GitHub](https://github.com/lucasmoraiscm)

## 🤝 Agradecimentos

* Agradeço aos colegas de disciplina e ao professor Dr. Otilio Paulo, da disciplina de Inteligência Artificial do curso de Análise e Desenvolvimento de Sistemas do IFPI, pelos ensinamentos que possibilitaram a construção desse projeto.