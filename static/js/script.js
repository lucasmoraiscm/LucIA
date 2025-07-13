document.addEventListener('DOMContentLoaded', () => {
    const socket = io();


    const conteudoChat = document.getElementById('chat-content');
    const formularioChat = document.getElementById('chat-form');
    const entradaUsuario = document.getElementById('user-input');
    const imagemCarregada = document.getElementById('image-upload');
    const botaoEnviar = document.getElementById('send-btn');


    let aguardandoPromptImagem = false;
    let arquivoImagemCarregado = null;


    socket.on('connect', () => {
        console.log('Conectado ao servidor WebSocket! ID:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('Desconectado do servidor WebSocket.');
    });

    socket.on('receber_mensagem', (dados) => {
        console.log("Resposta recebida do servidor:", dados);
        atualizarUltimaMensagemBot(dados.response);
    });


    formularioChat.addEventListener('submit', (event) => {
        event.preventDefault();
        submissao();
    });

    botaoEnviar.addEventListener('click', () => {
        submissao();
    });

    imagemCarregada.addEventListener('change', carregarImagem);


    function submissao() {
        if (aguardandoPromptImagem) {
            submissaoImagem();
        } else {
            submissaoTexto();
        }
    }

    function submissaoImagem() {
        const promptUsuario = entradaUsuario.value.trim();

        if (!promptUsuario || !arquivoImagemCarregado) {
            alert("Por favor, digite uma pergunta sobre a imagem.");
            return;
        }

        adicionarConteudo('user', promptUsuario);
        entradaUsuario.value = '';
        adicionarConteudo('bot', '...', true);

        socket.emit('enviar_mensagem', {
            prompt: promptUsuario,
            image: arquivoImagemCarregado
        });

        aguardandoPromptImagem = false;
        arquivoImagemCarregado = null;
        entradaUsuario.placeholder = "Digite sua pergunta aqui...";
    }

    function submissaoTexto() {
        const promptUsuario = entradaUsuario.value.trim();

        if (!promptUsuario) return;

        adicionarConteudo('user', promptUsuario);
        entradaUsuario.value = '';
        adicionarConteudo('bot', '...', true);

        socket.emit('enviar_mensagem', { prompt: promptUsuario });
    }

    function carregarImagem(event) {
        const arquivo = event.target.files[0];

        if (!arquivo) return;

        const leitor = new FileReader();
        leitor.onload = (e) => {
            const dadosImagemBase64 = e.target.result;
            
            arquivoImagemCarregado = dadosImagemBase64; 

            const img = document.createElement('img');
            img.src = dadosImagemBase64;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '10px';
            adicionarConteudo('user', img);
        };
        leitor.readAsDataURL(arquivo);

        aguardandoPromptImagem = true;
        entradaUsuario.placeholder = "Qual é a sua pergunta sobre esta imagem?";
        entradaUsuario.focus();
    }

    function adicionarConteudo(remetente, conteudo, digitado = false) {
        const mensagem = document.createElement('div');
        mensagem.classList.add('chat-message', `${remetente}-message`);

        if (digitado) {
            mensagem.id = 'indicador-digitado';
        }

        const conteudoMensagem = document.createElement('div');
        conteudoMensagem.classList.add('message-content');

        if (typeof conteudo === 'string') {
            conteudoMensagem.innerHTML = conteudo;
        } else {
            conteudoMensagem.appendChild(conteudo);
        }

        mensagem.appendChild(conteudoMensagem);
        conteudoChat.appendChild(mensagem);
        conteudoChat.scrollTop = conteudoChat.scrollHeight;
    }

    function atualizarUltimaMensagemBot(novoConteudo) {
        const indicadorDigitado = document.getElementById('indicador-digitado');

        if (indicadorDigitado) {
            const conteudoMensagem = indicadorDigitado.querySelector('.message-content');
            
            if (conteudoMensagem) {
                conteudoMensagem.innerHTML = novoConteudo;
            }
            
            indicadorDigitado.id = '';
        }
    }
});
