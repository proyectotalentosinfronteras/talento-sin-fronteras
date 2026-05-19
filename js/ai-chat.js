document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar todos los elementos de la pantalla
    const chatContainer = document.getElementById('chat-container');
    const openChatBtn = document.getElementById('open-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    // 2. Funciones para Abrir y Cerrar el chat
    if (openChatBtn) {
        openChatBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte
            chatContainer.classList.remove('hidden');
            chatInput.focus(); // Pone el cursor listo para escribir
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatContainer.classList.add('hidden');
        });
    }

    // 3. Función para enviar un mensaje
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === '') return; // Si está vacío, no hace nada

        // Mostrar el mensaje del usuario en pantalla
        appendMessage(messageText, 'user-message');
        chatInput.value = ''; // Limpiar la caja de texto

        // Simular que la IA está pensando y responde
        setTimeout(() => {
            const aiResponse = getAIResponse(messageText);
            appendMessage(aiResponse, 'bot-message');
        }, 1000); // Tarda 1 segundo en responder
    }

    // 4. Escuchar los clics del botón Enviar y la tecla Enter
    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 5. Función auxiliar para pintar los globos de texto
    function appendMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Auto-scroll hacia abajo para ver el nuevo mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 6. Base de conocimientos de la IA (Simulador de respuestas)
    function getAIResponse(userInput) {
        const input = userInput.toLowerCase();

        if (input.includes('hola') || input.includes('buenas')) {
            return "¡Hola! Estoy aquí para guiarte. ¿Tienes alguna duda sobre la regularización de tus papeles, homologación de títulos o tus derechos en el trabajo?";
        }
        if (input.includes('papeles') || input.includes('regularizar') || input.includes('nie') || input.includes('residencia')) {
            return "Para regularizar tu situación laboral, el arraigo (social, laboral o para la formación) suele ser la vía común. Dependiendo del caso, te pedirán un contrato de trabajo o demostrar permanencia. ¿Cuál es tu situación actual para darte más detalles?";
        }
        if (input.includes('titulo') || input.includes('homologar') || input.includes('estudios') || input.includes('universidad')) {
            return "La homologación de títulos extranjeros se gestiona ante el Ministerio de Educación. Necesitarás tu título legalizado y apostillado (Apostilla de la Haya) y las notas de tus estudios. ¿Qué carrera o profesión deseas homologar?";
        }
        if (input.includes('contrato') || input.includes('despido') || input.includes('derechos') || input.includes('horas')) {
            return "Recuerda que como trabajador, tienes derecho a una jornada máxima legal, vacaciones pagadas y a un salario no inferior al Salario Mínimo Interprofesional (SMI), sin importar tu estatus migratorio. ¿Crees que no se están respetando tus condiciones?";
        }

        // Respuesta por defecto si no entiende la palabra clave
        return "Comprendo tu situación. Para darte la información legal exacta sobre ese tema, te sugiero revisar nuestra sección de 'Recursos Legales' en el menú superior o consultar con uno de nuestros abogados aliados de la plataforma.";
    }
});
