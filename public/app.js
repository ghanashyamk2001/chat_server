let url = "//localhost:5000";
let localURL = "http:" + url;
// let api = require("./apiEndPoint.json");

let apiEndPoint = {
  createMessage: "/messages/createmessage",
  getMessage: "/messages/getmessage",
  userList: "/chats/finduser"
};

async function apiHelper(apiEndPoint, data) {
  const response = await fetch(localURL + apiEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
    if (response.ok) {
      const responseData = await response.json();
      return responseData
    }
    else {
      console.error("Failed to fetch messages.");
    }
}


let socket;

// async function startChat() {
//   const chatId = document.getElementById("chatId").value;
//   if (!chatId) {
//     alert("Please enter a Chat ID.");
//     return;
//   }

//   if (socket) {
//     socket.close(); // Close the previous connection if it exists
//   }

//   // Connect to WebSocket server with the chatId
//   socket = new WebSocket(
//     `ws://localhost:5000?chatId=${encodeURIComponent(chatId)}`
//   );

//   socket.onopen = async function () {
//     console.log("Connected to WebSocket server.");

//     try {
//       const response = await fetch(localURL + "/messages/getmessage", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ chatId }),
//       });

//       if (response.ok) {
//         const messages = await response.json();
//         const chat = document.getElementById("chat");

//         // Clear previous messages
//         chat.innerHTML = "";

//         messages.forEach((message) => {
//           const messageElement = document.createElement("div");
//           messageElement.classList.add("message");
//           messageElement.innerHTML = `<strong>${message.senderName}:</strong> ${message.text}`;
//           chat.appendChild(messageElement);
//         });

//         chat.scrollTop = chat.scrollHeight;
//       } else {
//         console.error("Failed to fetch messages.");
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   socket.onmessage = function (event) {
//     console.log("Message received:", event.data);
//     try {
//       const message = JSON.parse(event.data);
//       const chat = document.getElementById("chat");
//       const messageElement = document.createElement("div");
//       messageElement.classList.add("message");
//       messageElement.innerHTML = `<strong>${
//         message.senderName || "Unknown"
//       }:</strong> ${message.text}`;
//       chat.appendChild(messageElement);
//       chat.scrollTop = chat.scrollHeight;
//     } catch (error) {
//       console.error("Error parsing message:", error);
//     }
//   };

//   socket.onerror = function (error) {
//     console.error("WebSocket Error:", error);
//   };

//   socket.onclose = function () {
//     console.log("Disconnected from WebSocket server.");
//   };
// }

// async function sendMessage() {
//   const chatId = document.getElementById("chatId").value;
//   const senderId = document.getElementById("senderId").value;
//   const text = document.getElementById("message").value;

//   if (!chatId || !senderId || !text) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   try {
//     const response = await fetch(localURL + "/messages/createmessage", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ chatId, senderId, text }),
//     });

//     if (response.ok) {
//       const result = await response.json();
//       console.log("Message created:", result);
//       // Sending the message to the WebSocket server
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(
//           JSON.stringify({
//             text: result.text,
//             senderName: result.senderName,
//           })
//         );
//         document.getElementById("message").value = "";
//       } else {
//         alert("WebSocket connection is not open.");
//       }
//     } else if (response.status === 404) {
//       alert("Chat ID or Sender ID not found.");
//     } else {
//       alert("Error sending message.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Error sending message.");
//   }
// }

// async function startChatV2() {
//   const chatId = document.getElementById("chatId").value;
//   if (!chatId) {
//     alert("Please enter a Chat ID.");
//     return;
//   }

//   if (socket) {
//     socket.close(); // Close the previous connection if it exists
//   }

//   // Connect to WebSocket server with the chatId
//   socket = new WebSocket(`ws:${url}?chatId=${encodeURIComponent(chatId)}`);


//   socket.onopen = async function () {
//     console.log("Connected to WebSocket server.");

//     try {
//      let messages = await apiHelper(apiEndPoint.getMessage, { chatId });

//       // if (response.ok) {
//       //   const messages = await response.json();
//         const chat = document.getElementById("chat");

//         // Clear previous messages
//         chat.innerHTML = "";

//         messages.forEach((message) => {
//           const messageElement = document.createElement("div");
//           messageElement.classList.add("message");
//           messageElement.innerHTML = `<strong>${message.senderName}:</strong> ${message.text}`;
//           chat.appendChild(messageElement);
//         });

//         chat.scrollTop = chat.scrollHeight;
//       } 
//      catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   socket.onmessage = function (event) {
//     console.log("Message received:", event.data);
//     try {
//       const message = JSON.parse(event.data);
//       const chat = document.getElementById("chat");
//       const messageElement = document.createElement("div");
//       messageElement.classList.add("message");
//       messageElement.innerHTML = `<strong>${
//         message.senderName || "Unknown"
//       }:</strong> ${message.text}`;
//       chat.appendChild(messageElement);
//       chat.scrollTop = chat.scrollHeight;
//     } catch (error) {
//       console.error("Error parsing message:", error);
//     }
//   };

//   socket.onerror = function (error) {
//     console.error("WebSocket Error:", error);
//   };

//   socket.onclose = function () {
//     console.log("Disconnected from WebSocket server.");
//   };
// }

// async function sendMessageV2() {
//   const chatId = document.getElementById("chatId").value;
//   const senderId = document.getElementById("senderId").value;
//   const text = document.getElementById("message").value;

//   if (!chatId || !senderId || !text) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   try {
//     const data = { chatId, senderId, text };
//     const messages = await apiHelper(apiEndPoint.createMessage, data);

//     // if (response.ok) {
//     //   const result = await response.json();
//       console.log("Message created:", messages);
//       // Sending the message to the WebSocket server
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(
//           JSON.stringify({
//             text: result.text,
//             senderName: result.senderName,
//           })
//         );
//         document.getElementById("message").value = "";
//       //  else {
//       //   alert("WebSocket connection is not open.");
//       // }
//     } else if (response.status === 404) {
//       alert("Chat ID or Sender ID not found.");
//     } else {
//       alert("Error sending message.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Error sending message.");
//   }
// }

// Declare global variables to store the current chat ID and sender ID
let currentChatId = null;
let currentSenderId = null;

async function fetchChatList() {
  const senderId = document.getElementById("senderIdInput").value;

  if (!senderId) {
    alert("Please enter a Sender ID.");
    return;
  }

  try {
    const userListResponse = await apiHelper(apiEndPoint.userList, { userId: senderId });
    console.log(userListResponse);

    const chatListElement = document.getElementById("chatList");
    chatListElement.innerHTML = "";

    if (Array.isArray(userListResponse)) {
      userListResponse.forEach(chat => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = chat.otherUserName;
        listItem.dataset.chatId = chat.chatId; // Store chatId in dataset
        listItem.addEventListener("click", () => startChat(chat.chatId, senderId)); // Start chat on click
        chatListElement.appendChild(listItem);
      });
    } else {
      alert("Unexpected response format.");
    }
  } catch (error) {
    console.error("Error fetching chat list:", error);
    alert("Error fetching chat list.");
  }
}

document.getElementById("submitSenderId").addEventListener("click", fetchChatList);

async function startChat(chatId, senderId) {
  if (!chatId || !senderId) {
    alert("Please select a Chat ID and enter a Sender ID.");
    return;
  }

  // Store current chat ID and sender ID
  currentChatId = chatId;
  currentSenderId = senderId;

  if (socket) {
    socket.close(); // Close the previous connection if it exists
  }

  // Connect to WebSocket server with the chatId
  socket = new WebSocket(`ws:${url}?chatId=${encodeURIComponent(chatId)}`);

  socket.onopen = async function () {
    console.log("Connected to WebSocket server.");

    try {
      const messages = await apiHelper(apiEndPoint.getMessage, { chatId });

      const chat = document.getElementById("chat");
      chat.innerHTML = "";

      messages.forEach(message => {
        const senderName = message.senderId === currentSenderId ? "You" : message.senderName;
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `<strong>${senderName}:</strong> ${message.text}`;
        chat.appendChild(messageElement);
      });

      chat.scrollTop = chat.scrollHeight;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  socket.onmessage = function (event) {
    console.log("Message received:", event.data);
    try {
      const message = JSON.parse(event.data);
  
      if (!message) {
        console.error("Received invalid message format.");
        return;
      }
  
      const chat = document.getElementById("chat");
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
  
      const senderName = message.senderId === currentSenderId ? "You" : message.senderName;
      messageElement.innerHTML = `<strong>${senderName}:</strong> ${message.text}`;
  
      chat.appendChild(messageElement);
      chat.scrollTop = chat.scrollHeight;
  
    } catch (error) {
      console.error("Error parsing message:", error);
    }

  };

  socket.onclose = function () {
    console.log("Disconnected from WebSocket server.");
  };
}

async function sendMessageV3() {
  if (!currentChatId || !currentSenderId) {
    alert("Chat ID or Sender ID is not set.");
    return;
  }

  const text = document.getElementById("message").value;

  if (!text) {
    alert("Please enter a message.");
    return;
  }

  try {
    const data = { chatId: currentChatId, senderId: currentSenderId, text };
    const response = await apiHelper(apiEndPoint.createMessage, data);

      // Sending the message to the WebSocket server
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            text: response.text,
            senderName: response.senderName,
          })
        );
        document.getElementById("message").value = "";

        // Displaying the sent message in the chat box
        const chat = document.getElementById("chat");
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `<strong>You:</strong> ${response.text}`;
        chat.appendChild(messageElement);
        chat.scrollTop = chat.scrollHeight;
      } else {
        alert("WebSocket connection is not open.");
      }
  } catch (error) {
    console.error("Error:", error);
    alert("Error sending messageV2.");
  }
}

document.getElementById("sendMessageBtn").addEventListener("click", sendMessageV3);
