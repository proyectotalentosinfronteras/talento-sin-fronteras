document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const openChatBtn = document.getElementById('open-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (openChatBtn) {
        openChatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            chatContainer.classList.remove('hidden');
            chatInput.focus();
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatContainer.classList.add('hidden');
        });
    }

    function sendMessage() {
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
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse(userInput) {
        const input = userInput.toLowerCase();
        if (input.includes('hola') || input.includes('buenas')) {
            return "¡Hola! Estoy aquí para guiarte. ¿Tienes alguna duda sobre la regularización de tus papeles, homologación de títulos o tus derechos en el trabajo?";
        }
        if (input.includes('papeles') || input.includes('regularizar') || input.includes('nie') || input.includes('residencia')) {
            return "Para regularizar tu situación laboral, el arraigo (social, laboral o para la formación) suele ser la vía común. ¿Cuál es tu situación actual?";
        }
        if (input.includes('titulo') || input.includes('homologar') || input.includes('estudios')) {
            return "La homologación se gestiona ante el Ministerio de Educación. Necesitarás tu título legalizado y apostillado. ¿Qué profesión deseas homologar?";
        }
        return "Comprendo tu situación. Para ayudarte mejor, puedes consultar nuestra sección de 'Recursos Legales' o detallarme un poco más tu duda.";
    }
});
