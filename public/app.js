    
      let socket;

      async function startChat() {
        const chatId = document.getElementById("chatId").value;
        if (!chatId) {
          alert("Please enter a Chat ID.");
          return;
        }

        if (socket) {
          socket.close(); // Close the previous connection if it exists
        }

        // Connect to WebSocket server with the chatId
        socket = new WebSocket(
          `ws://54.167.208.201:5000?chatId=${encodeURIComponent(chatId)}`
        );

        socket.onopen = async function () {
          console.log("Connected to WebSocket server.");

          try {
            const response = await fetch(
              "http://54.167.208.201:5000/messages/getmessage",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatId }),
              }
            );

            if (response.ok) {
              const messages = await response.json();
              const chat = document.getElementById("chat");

              // Clear previous messages
              chat.innerHTML = "";

              messages.forEach((message) => {
                const messageElement = document.createElement("div");
                messageElement.classList.add("message");
                messageElement.innerHTML = `<strong>${message.senderName}:</strong> ${message.text}`;
                chat.appendChild(messageElement);
              });

              chat.scrollTop = chat.scrollHeight;
            } else {
              console.error("Failed to fetch messages.");
            }
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        };

        socket.onmessage = function (event) {
          console.log("Message received:", event.data);
          try {
            const message = JSON.parse(event.data);
            const chat = document.getElementById("chat");
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.innerHTML = `<strong>${
              message.senderName || "Unknown"
            }:</strong> ${message.text}`;
            chat.appendChild(messageElement);
            chat.scrollTop = chat.scrollHeight;
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        };

        socket.onerror = function (error) {
          console.error("WebSocket Error:", error);
        };

        socket.onclose = function () {
          console.log("Disconnected from WebSocket server.");
        };
      }

      async function sendMessage() {
        const chatId = document.getElementById("chatId").value;
        const senderId = document.getElementById("senderId").value;
        const text = document.getElementById("message").value;

        if (!chatId || !senderId || !text) {
          alert("Please fill in all fields.");
          return;
        }

        try {
          const response = await fetch(
            "http://54.167.208.201:5000/messages/createmessage",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ chatId, senderId, text }),
            }
          );

          if (response.ok) {
            const result = await response.json();
            console.log("Message created:", result);
            // Sending the message to the WebSocket server
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  text: result.text,
                  senderName: result.senderName,
                })
              );
              document.getElementById("message").value = "";
            } else {
              alert("WebSocket connection is not open.");
            }
          } else if (response.status === 404) {
            alert("Chat ID or Sender ID not found.");
          } else {
            alert("Error sending message.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error sending message.");
        }
      }

      async function viewChat(){} 
