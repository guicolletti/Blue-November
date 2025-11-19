// js/whatsapp.js
class WhatsAppShare {
    constructor() {
        this.init();
    }

    init() {
        this.createShareSection();
        this.attachEvents();
    }

    createShareSection() {
        // Verificar se a seção já existe
        if (document.querySelector('.whatsapp-section')) return;

        const ctaSection = document.querySelector('.cta');
        if (!ctaSection) return;

        const whatsappSection = document.createElement('section');
        whatsappSection.className = 'whatsapp-section section-padding';
        whatsappSection.innerHTML = `
            <div class="container">
                <div class="whatsapp-content">
                    <h2 class="section-title" data-i18n="whatsapp.title">Compartilhe a <span class="highlight">Conscientização</span></h2>
                    <p data-i18n="whatsapp.subtitle">Ajude a salvar vidas compartilhando informações importantes sobre saúde masculina</p>
                    
                    <div class="whatsapp-options">
                        <div class="whatsapp-option">
                            <h3 data-i18n="whatsapp.option1.title">Mensagem de Conscientização</h3>
                            <p data-i18n="whatsapp.option1.description">Compartilhe informações gerais sobre prevenção</p>
                            <button class="btn btn-whatsapp" data-type="awareness">
                                <span data-i18n="whatsapp.button">Compartilhar no WhatsApp</span>
                            </button>
                        </div>
                        
                        <div class="whatsapp-option">
                            <h3 data-i18n="whatsapp.option2.title">Lembrete de Exames</h3>
                            <p data-i18n="whatsapp.option2.description">Incentive amigos a fazerem exames preventivos</p>
                            <button class="btn btn-whatsapp" data-type="exams">
                                <span data-i18n="whatsapp.button">Compartilhar no WhatsApp</span>
                            </button>
                        </div>
                        
                        <div class="whatsapp-option">
                            <h3 data-i18n="whatsapp.option3.title">Dicas de Prevenção</h3>
                            <p data-i18n="whatsapp.option3.description">Compartilhe hábitos saudáveis importantes</p>
                            <button class="btn btn-whatsapp" data-type="prevention">
                                <span data-i18n="whatsapp.button">Compartilhar no WhatsApp</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        ctaSection.parentNode.insertBefore(whatsappSection, ctaSection.nextSibling);
    }

    attachEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-whatsapp')) {
                const button = e.target.closest('.btn-whatsapp');
                const messageType = button.getAttribute('data-type');
                this.shareMessage(messageType);
            }
        });
    }

    shareMessage(type) {
        const messages = {
            'awareness': i18n.getWhatsAppMessage(),
            'exams': this.getExamReminderMessage(),
            'prevention': this.getPreventionTipsMessage()
        };

        const message = messages[type] || messages['awareness'];
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

        this.openShareWindow(whatsappUrl);
    }

    getExamReminderMessage() {
        const lang = i18n.currentLang;
        const messages = {
            'pt-BR': `💙 *LEMBRETE IMPORTANTE - EXAMES PREVENTIVOS* 💙

*Não deixe para depois! Sua saúde em primeiro lugar.*

📅 *Quando fazer exames:*
• Homens a partir de 50 anos: anualmente
• Com histórico familiar: a partir dos 45 anos
• Sempre que notar alterações na saúde

🔍 *Exames essenciais:*
• Consulta com urologista
• Toque retal
• Exame de PSA

⚠️ *Importante:*
Muitos casos não apresentam sintomas iniciais!
A prevenção salva vidas.

#CheckUpMensal #SaúdeMasculina`,

            'en': `💙 *IMPORTANT REMINDER - PREVENTIVE EXAMS* 💙

*Don't leave it for later! Your health comes first.*

📅 *When to get exams:*
• Men from age 50: annually
• With family history: from age 45
• Whenever noticing health changes

🔍 *Essential exams:*
• Consultation with urologist
• Digital rectal exam
• PSA test

⚠️ *Important:*
Many cases show no initial symptoms!
Prevention saves lives.

#MensCheckUp #MensHealth`,

            'es': `💙 *RECORDATORIO IMPORTANTE - EXÁMENES PREVENTIVOS* 💙

*¡No lo dejes para después! Tu salud primero.*

📅 *Cuándo hacer exámenes:*
• Hombres a partir de 50 años: anualmente
• Con historial familiar: a partir de 45 años
• Siempre que notes cambios en la salud

🔍 *Exámenes esenciales:*
• Consulta con urólogo
• Tacto rectal
• Examen de PSA

⚠️ *Importante:*
¡Muchos casos no presentan síntomas iniciales!
La prevención salva vidas.

#ChequeoMensual #SaludMasculina`
        };

        return messages[lang] || messages['pt-BR'];
    }

    getPreventionTipsMessage() {
        const lang = i18n.currentLang;
        const messages = {
            'pt-BR': `💙 *DICAS DE PREVENÇÃO - SAÚDE MASCULINA* 💙

*Hábitos que fazem a diferença:*

🥗 *Alimentação:*
• Frutas e verduras diariamente
• Reduza carne vermelha processada
• Beba bastante água

🏃‍♂️ *Exercícios:*
• 30 minutos por dia, 5x na semana
• Caminhadas, natação, ciclismo
• Evite sedentarismo

⚖️ *Peso Saudável:*
• Mantenha IMC entre 18,5 e 24,9
• Circunferência abdominal < 94cm

🚭 *Evite:*
• Cigarro e derivados
• Álcool em excesso
• Estresse prolongado

🩺 *Check-up:*
• Visite o médico regularmente
• Conheça seu histórico familiar
• Não ignore sintomas

#VidaSaudável #Prevenção`,

            'en': `💙 *PREVENTION TIPS - MEN'S HEALTH* 💙

*Habits that make a difference:*

🥗 *Nutrition:*
• Fruits and vegetables daily
• Reduce processed red meat
• Drink plenty of water

🏃‍♂️ *Exercise:*
• 30 minutes daily, 5x per week
• Walking, swimming, cycling
• Avoid sedentary lifestyle

⚖️ *Healthy Weight:*
• Maintain BMI between 18.5-24.9
• Waist circumference < 37 inches

🚭 *Avoid:*
• Cigarettes and derivatives
• Excessive alcohol
• Prolonged stress

🩺 *Check-up:*
• Visit doctor regularly
• Know your family history
• Don't ignore symptoms

#HealthyLiving #Prevention`,

            'es': `💙 *CONSEJOS DE PREVENCIÓN - SALUD MASCULINA* 💙

*Hábitos que marcan la diferencia:*

🥗 *Alimentación:*
• Frutas y verduras diariamente
• Reduce carne roja procesada
• Bebe bastante agua

🏃‍♂️ *Ejercicio:*
• 30 minutos al día, 5x por semana
• Caminatas, natación, ciclismo
• Evita el sedentarismo

⚖️ *Peso Saludable:*
• Mantén IMC entre 18.5-24.9
• Circunferencia abdominal < 94cm

🚭 *Evita:*
• Cigarrillos y derivados
• Alcohol en exceso
• Estrés prolongado

🩺 *Chequeo:*
• Visita al médico regularmente
• Conoce tu historial familiar
• No ignores síntomas

#VidaSaludable #Prevención`
        };

        return messages[lang] || messages['pt-BR'];
    }

    openShareWindow(url) {
        const width = 600;
        const height = 400;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        window.open(url, 'whatsapp-share',
            `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`
        );
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppShare();
});