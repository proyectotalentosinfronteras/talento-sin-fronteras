document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const openChatBtn = document.getElementById('open-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Variable de memoria interna para guiar las respuestas continuas
    let ultimoContexto = ""; 

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
        const input = userInput.toLowerCase().trim();

        // --- MAPEO DE PAÍSES POR LAS 8 REGIONES GEOGRÁFICAS ---
        const latinoamerica = ['argentina', 'bolivia', 'brasil', 'chile', 'colombia', 'costa rica', 'cuba', 'ecuador', 'el salvador', 'guatemala', 'honduras', 'mexico', 'méxico', 'nicaragua', 'panama', 'panamá', 'paraguay', 'peru', 'perú', 'puerto rico', 'republica dominicana', 'república dominicana', 'uruguay', 'venezuela', 'latinoamerica', 'latinoamérica'];
        const reinoUnido = ['reino unido', 'gran bretaña', 'inglaterra', 'escocia', 'gales', 'irlanda del norte', 'uk', 'londres'];
        const europa = ['alemania', 'austria', 'belgica', 'bélgica', 'bulgaria', 'chipre', 'croacia', 'dinamarca', 'eslovaquia', 'eslovenia', 'estonia', 'finlandia', 'francia', 'grecia', 'hungria', 'hungría', 'irlanda', 'italia', 'letonia', 'lituania', 'luxemburgo', 'malta', 'paises bajos', 'países bajos', 'holanda', 'polonia', 'portugal', 'rumania', 'suecia', 'republica checa', 'república checa', 'suiza', 'noruega', 'islandia', 'liechtenstein', 'europa'];
        const norteamerica = ['estados unidos', 'usa', 'eeuu', 'ee.uu', 'canada', 'canadá', 'norteamerica', 'norteamérica'];
        const asia = ['china', 'india', 'japon', 'japón', 'corea', 'indonesia', 'tailandia', 'singapur', 'vietnam', 'filipinas', 'malasia', 'pakistan', 'pakistán', 'asia'];
        const africa = ['marruecos', 'senegal', 'nigeria', 'sudafrica', 'sudáfrica', 'argelia', 'tunéz', 'gambia', 'ghana', 'camerun', 'camerún', 'africa', 'áfrica'];
        const oceania = ['australia', 'nueva zelanda', 'fiyi', 'samoa', 'oceania', 'oceanía'];
        const orienteMedio = ['egipto', 'iran', 'irán', 'irak', 'iraq', 'arabia', 'emiratos', 'dubai', 'dúbai', 'qatar', 'catar', 'turquia', 'turquía', 'israel', 'jordania', 'oriente medio'];

        // =========================================================================
        // SISTEMA DE RESPUESTAS INTERACTIVAS ANTE PREGUNTAS DE CIERRE (MEMORIA)
        // =========================================================================
        
        // Respuestas de seguimiento al Bloque 2 (Derechos en el Trabajo / Renovación)
        if (ultimoContexto === "pregunta_contrato_renovacion") {
            ultimoContexto = "";
            if (input.includes('si') || input.includes('sí') || input.includes('tengo') || input.includes('activo') || input.includes('claro')) {
                return "¡Excelente! Al estar de alta con un contrato activo, tu renovación para conseguir la tarjeta de 4 años en este 2026 está bien encaminada. Solo necesitas aportar el contrato actual, tu pasaporte completo y pagar la tasa correspondiente. ¿Deseas saber el código de la tasa oficial?";
            } else {
                return "No te preocupes si no tienes un contrato activo en este momento. La normativa de 2026 te permite renovar demostrando que estás buscando empleo activamente (inscrito en el SEPE), aportando un nuevo informe de inserción social, o si demuestres que tu anterior baja fue involuntaria. ¿Te gustaría saber cómo inscribirte correctamente?";
            }
        }
        if (ultimoContexto === "pregunta_duda_contrato") {
            ultimoContexto = "";
            if (input.includes('si') || input.includes('sí') || input.includes('tengo') || input.includes('duda')) {
                return "Dime detalladamente cuál es tu duda (horas, salario, tipo de contrato). Recuerda que en 2026 el salario estipulado obligatoriamente debe estar ligado al Salario Mínimo Interprofesional (SMI) proporcional a tus horas de jornada.";
            } else {
                return "¡Perfecto! Mantener tus condiciones claras es clave. Si estás bajo un Arraigo Socioformativo, vigila bien no superar las 30 horas semanales permitidas para no tener problemas con la oficina de extranjería.";
            }
        }

        // Respuestas de seguimiento al Bloque 3 (Arraigos Ordinarios de 2 años)
        if (ultimoContexto === "pregunta_curso_socioformativo") {
            ultimoContexto = "";
            if (input.includes('si') || input.includes('sí') || input.includes('tengo') || input.includes('pensado') || input.includes('idea')) {
                return "¡Estupendo! Ten en cuenta que para validar el Arraigo Socioformativo este año, el curso debe impartirse obligatoriamente por un centro acreditado (grados de FP, certificados de profesionalidad oficiales o cursos específicos universitarios). En cuanto te matricules, podrás tramitarlo. ¿Quieres que veamos el trámite digital?";
            } else {
                return "No pasa nada si no lo tienes claro aún. Servicios Sociales y organizaciones como Cruz Roja disponen de listados de cursos gratuitos que habilitan para este arraigo en 2026. Lo vital es que sumes los 2 años previos de permanencia en España. ¿Quieres que comprobemos tus documentos de permanencia?";
            }
        }
        if (ultimoContexto === "pregunta_tiempo_social") {
            ultimoContexto = "";
            if (input.includes('2') || input.includes('dos') || input.includes('3') || input.includes('tres') || input.includes('año') || input.includes('mas') || input.includes('más') || input.includes('si') || input.includes('sí')) {
                return "¡Enhorabuena! Al cumplir la nueva barrera de los 2 años establecida en 2026, ya puedes iniciar el Arraigo Social clásico. El siguiente paso urgente es solicitar cita en tu ayuntamiento para la entrevista del informe de inserción social y ligarlo a una propuesta de contrato. ¿Sabes cómo pedir esa cita local?";
            } else {
                return "Si llevas menos de 2 años, debes seguir recopilando con mucho cuidado cada prueba de tu estancia (médicos, bancos, padrón). En cuanto alcances los 24 meses exactos, podrás aplicar de inmediato al Arraigo Social o al Socioformativo.";
            }
        }

        // Respuestas de seguimiento al Bloque 4 (Regularización Masiva Extraordinaria)
        if (ultimoContexto === "pregunta_requisitos_masiva") {
            ultimoContexto = "";
            if (input.includes('si') || input.includes('sí') || input.includes('todos') || input.includes('cumplo') || input.includes('tengo')) {
                return "¡Magnífico! Si ya tienes preparados tu pasaporte, tus antecedentes penales de origen legalizados, tu informe de vulnerabilidad y tus pruebas (como extractos de banco o folios médicos públicos), debes presentar el expediente digital YA. El plazo máximo cierra de forma tajante el 9 de junio de 2026. ¿Dispones de firma electrónica o certificado digital para subirlo de inmediato?";
            } else {
                return "¡Hay que darse prisa! Si te falta el certificado de vulnerabilidad, ve mañana a primera hora sin falta a Cáritas, Cruz Roja o a los Servicios Sociales de tu zona. Si te faltan meses de padrón, busca hoy mismo tus extractos bancarios o citas médicas de la sanidad pública. Todo cuenta para justificar la permanencia antes del cierre del 9 de junio de 2026. ¿Cuál de los documentos te falta?";
            }
        }

        // =========================================================================
        // FILTROS PRINCIPALES DE DIRECCIONAMIENTO DIRECTO (CON PALABRAS Y NÚMEROS)
        // =========================================================================

        // --- BLOQUE 1: SALUDO INICIAL INTERACTIVO ---
        if (input.includes('hola') || input.includes('buenas')) {
            ultimoContexto = "pregunta_saludo";
            return "¡Hola! Soy tu consultor de inclusión y extranjería para este año 2026. 🌍 Elige indicando el número (1, 2 o 3) o el tema que te interesa consultar:\n\n" +
                   "1. REGULARIZACIÓN DE TUS PAPELES (Para conocer el proceso extraordinario que vence pronto o las vías de Arraigo de 2 años).\n\n" +
                   "2. HOMOLOGACIÓN DE TÍTULOS (Para saber cómo convalidar tus estudios según tu país de origen).\n\n" +
                   "3. DERECHOS EN EL TRABAJO (Dudas sobre renovación laboral, horas permitidas y protección legal).\n\n" +
                   "¿Cuál de estos temas deseas explorar hoy?";
        }

        // --- BLOQUE 4: PROCESO EXTRAORDINARIO DE REGULARIZACIÓN MASIVA 2026 ---
        // Filtro unificado: Si escribe 1, o contiene "papeles", "regularizar", "masiva", etc.
        if (input === '1' || input.includes('opcion 1') || input.includes('opción 1') || input.includes('papeles') || input.includes('regularizar') || input.includes('masiva') || input.includes('plazo') || input.includes('cuando') || input.includes('junio') || input.includes('dia') || input.includes('día') || input.includes('requisitos')) {
            ultimoContexto = "pregunta_requisitos_masiva";
            return "¡ALERTA URGENTE! El plazo máximo e improrrogable para presentar tu solicitud en el PROCESO EXTRAORDINARIO DE REGULARIZACIÓN MASIVA termina el próximo 9 DE JUNIO DE 2026. Al estar a mediados de mayo, quedan menos de 3 semanas para que cierre el sistema. Los requisitos obligatorios y detallados son:\n\n" +
                   "1. DOCUMENTACIÓN PERSONAL DE IDENTIDAD E HISTORIAL:\n" +
                   "- Pasaporte en vigor: Es el documento de identidad base e indispensable.\n" +
                   "- Historial de Extranjería (si aplica): Resguardo de presentación de asilo en vigor o caducado (NIE Blanco) o tarjeta de solicitante de protección internacional (NIE Rojo).\n\n" +
                   "2. ACREDITACIÓN DE LA PERMANENCIA CONTINUA EN ESPAÑA:\n" +
                   "Se debe demostrar que se reside en el país de manera continuada. Si existen 'huecos' temporales en el registro principal, se admiten pruebas alternativas:\n" +
                   "- Prueba Principal: Certificado de empadronamiento histórico (colectivo o individual).\n" +
                   "- Pruebas Alternativas Válidas: Justificantes de citas médicas o informes de asistencia en el sistema de sanidad pública, extractos de cuentas bancarias españolas a tu nombre con movimientos continuos, contratos de alquiler previos o resguardos de envíos internacionales de dinero.\n\n" +
                   "3. CERTIFICACIÓN DE VULNERABILIDAD O INSERCIÓN:\n" +
                   "- Informe de Exclusión Social o Vulnerabilidad: Documento obligatorio emitido por los Servicios Sociales municipales de tu ayuntamiento o por entidades y ONGs oficialmente acreditadas para este proceso extraordinario.\n\n" +
                   "4. AUSENCIA DE ANTECEDENTES PENALES:\n" +
                   "- Certificado de Antecedentes Penales: Emitido por las autoridades de tu país de origen (debidamente apostillado o legalizado, y traducido si corresponde), además de carecer de antecedentes penales dentro de España.\n\n" +
                   "Cuéntame, ¿crees que cumples con todos estos requisitos para poder aplicar
