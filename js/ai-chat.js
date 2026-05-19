document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Variable de memoria interna para guiar las respuestas continuas
    let ultimoContexto = ""; 

    // --- ARREGLO PARA ABRIR EL CHAT DESDE CUALQUIER BOTÓN ---
    // Busca por ID 'open-chat-btn' o por cualquier enlace/botón que contenga el texto "PROBAR IA CONSULTORA"
    const openChatButtons = document.querySelectorAll('#open-chat-btn, .open-chat-btn');
    
    // Función compartida para abrir el chat de manera limpia
    function abrirElChat(e) {
        if (e) e.preventDefault();
        if (chatContainer) {
            chatContainer.classList.remove('hidden');
            // Muestra un saludo automático si el chat está vacío al abrirse
            if (chatMessages && chatMessages.children.length === 0) {
                const saludoInicial = getAIResponse("hola");
                appendMessage(saludoInicial, 'bot-message');
            }
            if (chatInput) chatInput.focus();
        }
    }

    // Asigna el evento de apertura a todos los botones encontrados
    openChatButtons.forEach(btn => {
        btn.addEventListener('click', abrirElChat);
    });

    // Buscar también de forma global si hay un enlace de texto plano con esa frase exacta
    document.querySelectorAll('a, button').forEach(el => {
        if (el.textContent.toUpperCase().includes('PROBAR IA CONSULTORA')) {
            el.addEventListener('click', abrirElChat);
        }
    });

    // --- FIN DEL ARREGLO DE APERTURA ---

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            if (chatContainer) chatContainer.classList.add('hidden');
        });
    }

    function sendMessage() {
        if (!chatInput) return;
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        appendMessage(messageText, 'user-message');
        chatInput.value = '';

        setTimeout(() => {
            const aiResponse = getAIResponse(messageText);
            appendMessage(aiResponse, 'bot-message');
        }, 1000);
    }

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function appendMessage(text, className) {
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse(userInput) {
        const input = userInput.toLowerCase().trim();

        // --- MAPEO DE PAÍSES POR LAS 8 REGIONES GEOGRÁFICAS ---
        const latinoamerica = ['argentina', 'bolivia', 'brasil', 'chile', 'colombia', 'costa rica', 'cuba', 'ecuador', 'el salvador', 'guatemala', 'honduras', 'mexico', 'méxico', 'nicaragua', 'panama', 'panamá', 'paraguay', 'peru', 'perú', 'puerto rico', 'republica dominicana', 'república dominicana', 'uruguay', 'venezuela', 'latinoamerica', 'latinoamérica'];
        const reinoUnido = ['reino unido', 'gran bretaña', 'inglaterra', 'escocia', 'gales', 'irlanda del norte', 'uk', 'londres'];
        const europa = ['alemania', 'austria', 'belgica', 'bélgica', 'bulgaria', 'chipre', 'croacia', 'dinamarca', 'eslovaquia', 'eslovenia', 'estonia', 'finlandia', 'francia', 'grecia', 'hungria', 'hungría', 'irlanda', 'italia', 'letonia', 'lituania', 'luxemburgo', 'malta', 'paises bajos', 'países bajos', 'holanda', 'polonia', 'portugal', 'rumania', 'suecia', 'republica checa', 'república checa', 'suiza', 'noruega', 'islandia', 'liechtenstein', 'europa'];
        const norteamerica = ['estados unidos', 'usa', 'eeuu', 'ee.uu', 'canada', 'canadá', 'norteamerica', 'norteamérica'];
        const asia = ['china', 'india', 'japon', 'japón', 'corea', 'indonesia', 'tailandia', 'singapur', 'vietnam', 'filipinas', 'malasia', 'pakistan', 'pakistán', 'asia'];
        const africa = ['marruecos', 'senegal', 'nigeria', 'sudafrica', 'sudáfrica', 'argelia', 'tunéz', 'gambia', 'ghana', 'camerun', 'camerún', 'africa', 'áfrica'];
        const oceania = ['australia', 'nueva zelanda', 'fiyi', 'samoa', 'oceania', 'oceanía'];
        const orienteMedio =
