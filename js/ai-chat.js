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

        // --- MAPEO DE PAÍSES POR LAS 8 REGIONES GEOGRÁFICAS ---
        const latinoamerica = ['argentina', 'bolivia', 'brasil', 'chile', 'colombia', 'costa rica', 'cuba', 'ecuador', 'el salvador', 'guatemala', 'honduras', 'mexico', 'méxico', 'nicaragua', 'panama', 'panamá', 'paraguay', 'peru', 'perú', 'puerto rico', 'republica dominicana', 'república dominicana', 'uruguay', 'venezuela', 'latinoamerica', 'latinoamérica'];
        const reinoUnido = ['reino unido', 'gran bretaña', 'inglaterra', 'escocia', 'gales', 'irlanda del norte', 'uk', 'londres'];
        const europa = ['alemania', 'austria', 'belgica', 'bélgica', 'bulgaria', 'chipre', 'croacia', 'dinamarca', 'eslovaquia', 'eslovenia', 'estonia', 'finlandia', 'francia', 'grecia', 'hungria', 'hungría', 'irlanda', 'italia', 'letonia', 'lituania', 'luxemburgo', 'malta', 'paises bajos', 'países bajos', 'holanda', 'polonia', 'portugal', 'rumania', 'suecia', 'republica checa', 'república checa', 'suiza', 'noruega', 'islandia', 'liechtenstein', 'europa'];
        const norteamerica = ['estados unidos', 'usa', 'eeuu', 'ee.uu', 'canada', 'canadá', 'norteamerica', 'norteamérica'];
        const asia = ['china', 'india', 'japon', 'japón', 'corea', 'indonesia', 'tailandia', 'singapur', 'vietnam', 'filipinas', 'malasia', 'pakistan', 'pakistán', 'asia'];
        const africa = ['marruecos', 'senegal', 'nigeria', 'sudafrica', 'sudáfrica', 'argelia', 'tunéz', 'gambia', 'ghana', 'camerun', 'camerún', 'africa', 'áfrica'];
        const oceania = ['australia', 'nueva zelanda', 'fiyi', 'samoa', 'oceania', 'oceanía'];
        const orienteMedio = ['egipto', 'iran', 'irán', 'irak', 'iraq', 'arabia', 'emiratos', 'dubai', 'dúbai', 'qatar', 'catar', 'turquia', 'turquía', 'israel', 'jordania', 'oriente medio'];

        // 1. SALUDO INICIAL INTERACTIVO CON LAS 3 OPCIONES PRINCIPALES
        if (input.includes('hola') || input.includes('buenas')) {
            return "¡Hola! Soy tu consultor de inclusión y extranjería para este año 2026. 🌍 Escribe el tema que te interesa consultar:\n\n" +
                   "👉 REGULARIZACIÓN DE TUS PAPELES (Para conocer el proceso extraordinario que vence pronto o las vías de Arraigo de 2 años).\n\n" +
                   "👉 HOMOLOGACIÓN DE TÍTULOS (Para saber cómo convalidar tus estudios según tu país de origen).\n\n" +
                   "👉 DERECHOS EN EL TRABAJO (Dudas sobre renovación laboral, horas permitidas y protección legal).\n\n" +
                   "¿Cuál de estos temas deseas explorar hoy?";
        }

        // 2. BLOQUE DE DERECHOS EN EL TRABAJO Y RENOVACIONES LABORALES (2026)
        if (input.includes('derechos') || input.includes('trabajo') || input.includes('laboral') || input.includes('contrato') || input.includes('seguridad social')) {
            // Sub-caso específico de renovación
            if (input.includes('renovar') || input.includes('renovacion') || input.includes('nie') || input.includes('año')) {
                return "¡Excelente pregunta laboral! Al renovar tu residencia por Arraigo por primera vez en 2026, la nueva tarjeta que te otorgarán tendrá una validez directa de 4 AÑOS (siempre que sigas de alta en la Seguridad Social o cuentes con medios propios). ¿Tienes un contrato de trabajo activo en este momento?";
            }
            // Sub-caso del antiguo arraigo laboral
            if (input.includes('segunda oportunidad') || input.includes('antiguo laboral')) {
                return "En 2026, el antiguo Arraigo Laboral pasó a llamarse oficialmente 'Arraigo de Segunda Oportunidad'. Exige 2 años de permanencia previa y está específicamente diseñado para personas que tuvieron un permiso de trabajo legal en el pasado pero lo perdieron quedando en situación irregular. ¿Es tu caso?";
            }
            return "Tus derechos laborales en 2026 están firmemente protegidos. Si estás bajo el Arraigo Socioformativo, tienes permitido trabajar por cuenta ajena hasta 30 horas semanales. Si estás regularizándote, recuerda que ningún empleador puede abusar de tu condición. ¿Tienes alguna duda sobre las horas de tu contrato o la cotización para tu renovación?";
        }

        // 3. BLOQUE ORDINARIO DE ARRAIGO (Alineado a 2 años por reforma)
        if (input.includes('socioformativo') || input.includes('formacion') || input.includes('estudiar') || input.includes('curso')) {
            return "El Arraigo Socioformativo (antiguo Arraigo para la Formación) exige demostrar 2 años de permanencia continua en España. En 2026, la gran ventaja es que la ley te autoriza a trabajar legalmente un máximo de 30 horas semanales mientras cursas tus estudios certificados. ¿Tienes pensado algún curso o formación reglada?";
        }
        if (input.includes('social') && !input.includes('exclusión')) {
            return "¡Un cambio histórico para el 2026! Con la última reforma, el Arraigo Social ya NO requiere 3 años de permanencia, ¡ahora se redujo a solo 2 años! Sigues necesitando el informe de inserción social y un contrato firmado que se ajuste al Salario Mínimo Interprofesional (SMI). ¿Cuánto tiempo llevas viviendo en España?";
        }

        // 4. BLOQUE CRUCIAL: REGULARIZACIÓN MASIVA EXTRAORDINARIA 2026 (REQUISITOS COMPLETOS)
        if (input.includes('papeles') || input.includes('regularizar') || input.includes('masiva') || input.includes('plazo') || input.includes('cuando') || input.includes('junio') || input.includes('dia') || input.includes('día') || input.includes('requisitos')) {
            return "¡ALERTA URGENTE! El plazo máximo e improrrogable para presentar tu solicitud en el PROCESO EXTRAORDINARIO DE REGULARIZACIÓN MASIVA termina el próximo 9 DE JUNIO DE 2026. Al estar a mediados de mayo, quedan menos de 3 semanas. Los requisitos obligatorios y detallados son:\n\n" +
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
                   "Cuéntame, ¿crees que cumples con todos estos requisitos para poder aplicar a la regularización antes de que cierre el plazo?";
        }

        // --- SISTEMA DE DETECCIÓN DE HOMOLOGACIÓN POR LAS 8 REGIONES ---

        // Región 1: Latinoamérica
        const detectaLatam = latinoamerica.find(reg => input.includes(reg));
        if (detectaLatam) {
            return `¡Perfecto! Para ${detectaLatam.toUpperCase()} (Latinoamérica), tus títulos de bachillerato o universitarios deben llevar la Apostilla de la Haya. En 2026, al tramitar tu homologación digital, te dan un 'volante condicional' que te permite trabajar o estudiar de inmediato. Además, recuerda que los ciudadanos de países de origen hispano y Brasil tienen el beneficio de poder solicitar la nacionalidad española con solo 2 años de residencia legal continua.`;
        }

        // Región 2: Reino Unido
        const detectaUk = reinoUnido.find(reg => input.includes(reg));
        if (detectaUk) {
            return "¡Entendido, Reino Unido! Desde el Brexit, el Reino Unido se trata como un tercer país fuera de la UE. En 2026, para homologar tu bachillerato británico (A-Levels o GCSE), requieres la Apostilla de la Haya de UK y una traducción jurada oficial al castellano. Para temas de arraigo, entras bajo las condiciones generales de 2 años de permanencia en España.";
        }

        // Región 3: Europa (UE y EFTA)
        const detectaEuropa = europa.find(reg => input.includes(reg));
        if (detectaEuropa) {
            return "¡Región Europea! Si tus estudios o nacionalidad son de la Unión Europea o espacio EFTA, cuentas con la mayor ventaja en 2026. Tus títulos NO necesitan la Apostilla de la Haya. El proceso de convalidación y equivalencia de notas es directo y muy rápido. Si eres ciudadano comunitario, recuerda que estás exento de arraigos; puedes solicitar el Certificado de Registro de Ciudadano de la Unión (CUE) si cuentas con empleo o medios económicos.";
        }

        // Región 4: Norteamérica (EE.UU. y Canadá)
        const detectaNorteam = norteamerica.find(reg => input.includes(reg));
        if (detectaNorteam) {
            return "¡Región de Norteamérica (EE.UU. / Canadá)! Para homologar tus estudios en España en 2026, tu diploma y el registro de calificaciones (Transcripts) deben estar legalizados con la Apostilla de la Haya de tu país/estado y llevar traducción jurada oficial. Con el resguardo digital del trámite obtienes el 'volante condicional' válido para incorporarte al mercado laboral o iniciar tu formación.";
        }

        // Región 5: Asia
        const detectaAsia = asia.find(reg => input.includes(reg));
        if (detectaAsia) {
            return "¡Región de Asia! En 2026, la homologación de títulos de países asiáticos requiere la Apostilla de la Haya (o legalización diplomática por vía consular si tu país no está en el convenio) junto con una traducción jurada obligatoria al castellano. Nota especial: si eres de FILIPINAS, por lazos históricos, tienes derecho preferencial a solicitar la nacionalidad española con solo 2 años de residencia legal.";
        }

        // Región 6: África
        const detectaAfrica = africa.find(reg => input.includes(reg));
        if (detectaAfrica) {
            return "¡Continente Africano! En 2026, para convalidar tus estudios, si tu país firmó el Convenio de la Haya (como Marruecos o Sudáfrica) necesitas la Apostilla; si no (como Senegal o Gambia), tus documentos deben legalizarse por vía diplomática en el Consulado de España local, sumado a la traducción jurada. Con la nueva ley de extranjería, los trabajadores de estos orígenes aplican con alto éxito a los Arraigos de Segunda Oportunidad o Socioformativos al cumplir los 2 años.";
        }

        // Región 7: Oceanía
        const detectaOceania = oceania.find(reg => input.includes(reg));
        if (detectaOceania) {
            return "¡Región de Oceanía (Australia / Nueva Zelanda)! Al ser países miembros del Convenio de la Haya, tus diplomas académicos deben estar Apostillados y contar con una traducción jurada oficial al castellano en este 2026. Al iniciar el proceso digital de homologación, se te expedirá el 'volante condicional' que te habilita legalmente para trabajar o matricularte en cursos superiores.";
        }

        // Región 8: Oriente Medio
        const detectaOriente = orienteMedio.find(reg => input.includes(reg));
        if (detectaOriente) {
            return "¡Región de Oriente Medio! En 2026, para homologar tus títulos, la mayoría de los países (como Turquía o Emiratos) emiten la Apostilla de la Haya, mientras que otros requieren legalización por vía consular. Es indispensable que los documentos vengan con traducción jurada oficial al castellano. Sus profesionales técnicos suelen ser perfiles muy demandados para modificar arraigos hacia autorizaciones de profesionales altamente cualificados.";
        }

        // 5. BLOQUE GENERAL DE HOMOLOGACIÓN (Si escribe la palabra pero no el país en la frase)
        if (input.includes('titulo') || input.includes('homologar') || input.includes('estudios') || input.includes('bachiller') || input.includes('bachillerato') || input.includes('universidad')) {
            return "Para homologar tu Bachillerato o título universitario en 2026, el trámite se realiza de forma 100% digital ante el Ministerio de Educación. Requieres tu título y notas debidamente legalizados o apostillados. Al tramitarlo te otorgan un 'volante condicional' inmediato que te permite estudiar o trabajar mientras esperas la resolución. ¿De qué país o región (como Latinoamérica, Reino Unido, Europa, etc.) es tu título?";
        }

        // Respuesta por defecto adaptada a las 3 opciones si el bot se pierde
        return "Comprendo tu mensaje. Para darte la información legal exacta en este 2026, indícame cuál de nuestras áreas principales te interesa consultar: 'Regularización de papeles', 'Homologación de títulos' o 'Derechos en el trabajo', o indícame directamente tu país de procedencia.";
    }
});
