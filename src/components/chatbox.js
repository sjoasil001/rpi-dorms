const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Display user's message
  const userDiv = document.createElement("div");
  userDiv.textContent = "You: " + userMessage;
  chatBox.appendChild(userDiv);

  // Clear the input field
  userInput.value = "";

  // Send the message to the backend
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    if (data.response) {
      // Display bot's response
      const botDiv = document.createElement("div");
      botDiv.textContent = "Bot: " + data.response;
      chatBox.appendChild(botDiv);

      // Scroll to the bottom of the chat box
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

