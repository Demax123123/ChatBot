document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let userMessage = messageInput.value.trim();
        if (userMessage === "") return;

        appendMessage("You", userMessage, "user");
        messageInput.value = "";

        fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            appendMessage("Bot", data.reply, "bot");
        })
        .catch(error => console.error("Error:", error));
    }

    function appendMessage(sender, text, senderClass) {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("message", senderClass);
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }
});
