// Store current chat ID
let currentChatId = "1";
let chatData = {}

const late = {
    "1": {
        name: "John Doe",
        initials: "JD",
        status: "Online",
        color: "blue",
        messages: [
            {
                sender: "John Doe",
                content: "Hey! How's it going?",
                time: "12:30 PM",
                isReceived: true
            },
            {
                sender: "You",
                content: "Hi! I'm doing great, thanks for asking!",
                time: "12:35 PM",
                isReceived: false
            }
        ]
    },
    "2": {
        name: "Alice Smith",
        initials: "AS",
        status: "Last seen 5m ago",
        color: "purple",
        messages: [
            {
                sender: "Alice Smith",
                content: "Meeting at 2 PM?",
                time: "03.26.25 10:30 AM",
                isReceived: true
            },
            {
                sender: "You",
                content: "Yes, I'll be there!",
                time: "10:32 AM",
                isReceived: false
            },
            {
                sender: "Alice Smith",
                content: "Great, see you then!",
                time: "10:33 AM",
                isReceived: true
            }
        ]
    },
    "3": {
        name: "Team Chat",
        initials: "TC",
        status: "5 members online",
        color: "green",
        messages: [
            {
                sender: "Mike",
                content: "Project updates: We've completed the first phase.",
                time: "Yesterday",
                isReceived: true
            },
            {
                sender: "You",
                content: "Great progress everyone!",
                time: "Yesterday",
                isReceived: false
            },
            {
                sender: "Sarah",
                content: "Should we schedule a review meeting?",
                time: "Yesterday",
                isReceived: true
            }
        ]
    }
};

// Helper function to scroll to bottom of messages
function scrollToBottom(smooth = false) {
    const messageList = document.querySelector(`.message-list[data-chat-id="${currentChatId}"]`);
    if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
    }
}

document.body.addEventListener('htmx:afterSwap', function(event) {
    // Check if the request was for the chats element
    if (event.target.id === 'chats') {
        // Parse JSON data
        try {
            const users = JSON.parse(event.target.innerText);
            
            // Create HTML for chats ${user.user_id}
            const chatsHtml = users.map(user => {
                return `<div class="chat-item p-3 hover:bg-gray-50 cursor-pointer" hx-get="/api/chat/${user.user_id}" hx-target="#chat-window" hx-trigger="click">
                    <div class="flex items-center space-x-3">
                        <div class="chat-avatar bg-blue-100">
                            <span class="text-blue-600 font-medium text-sm">${user.initials || 'UN'}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-baseline">
                                <h3 class="text-sm font-semibold text-gray-900 truncate">${user.username || 'User'}</h3>
                                <span class="text-xs text-gray-500">${user.time || ''}</span>
                            </div>
                            <p class="text-sm text-gray-500 truncate">${user.lastMessage || ''}</p>
                        </div>
                    </div>
                </div>`;
            }).join('');

            users.map(user => {
                chatData[user.user_id] = {
                    name: user.username,
                    initials: user.username[0],
                    status: "Online",
                    color: "blue",
                    messages: []
                }
            })

            console.log(chatData)

            //currentChatId = user[0].user_id
            
            document.getElementById('chats').innerHTML = chatsHtml;

            htmx.process(document.getElementById('chats'));
        } catch (error) {
            console.error("Error parsing JSON:", error);
            document.getElementById('chats').innerHTML = '<div class="p-3 text-red-500">Error loading chats</div>';
        }
    }
});

// Mock API responses for HTMX
htmx.on("htmx:afterRequest", function(evt) {
    console.log(evt.detail.pathInfo.requestPath)
    // Settings menu toggle
    if (evt.detail.pathInfo.requestPath === "/api/settings-menu") {
        const dropdown = document.getElementById("settings-dropdown");
        dropdown.innerHTML = `
            <div class="dropdown-menu">
                <a href="#" class="dropdown-item">Settings</a>
                <a href="#" class="dropdown-item">Preferences</a>
                <a href="#" class="dropdown-item">Help</a>
            </div>
        `;
        dropdown.classList.toggle("hidden");
    }

    // User menu toggle
    if (evt.detail.pathInfo.requestPath === "/api/user-menu") {
        const dropdown = document.getElementById("user-dropdown");
        dropdown.innerHTML = `
            <div class="dropdown-menu">
                <a href="#" class="dropdown-item">Profile</a>
                <a href="#" class="dropdown-item">Status</a>
                <a href="#" class="dropdown-item">Sign out</a>
            </div>
        `;
        dropdown.classList.toggle("hidden");
    }

    // Chat selection handler
    if (evt.detail.pathInfo.requestPath.startsWith("/api/chat/")) {
        // Check if the clicked chat is already active
        if (evt.detail.elt.classList.contains('active-chat')) {
            evt.detail.shouldSwap = false;
            return;
        }

        // Remove active class from all chats
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active-chat');
        });
        
        // Add active class to clicked chat
        evt.detail.elt.classList.add('active-chat');
        
        // Update current chat ID
        currentChatId = evt.detail.pathInfo.requestPath.split('/').pop();

        const selectedChat = chatData[currentChatId];
        
        // Update the chat window content
        document.getElementById('chat-window').innerHTML = `
            <!-- Chat Header -->
            <div class="h-16 bg-white border-b flex items-center justify-between px-4 shadow-sm">
                <div class="flex items-center space-x-3">
                    <div class="chat-avatar-header bg-${selectedChat.color}-100">
                        <span class="text-${selectedChat.color}-600 font-medium">${selectedChat.initials}</span>
                    </div>
                    <div>
                        <p class="font-semibold margin-buttom text-gray-900">${selectedChat.name}</p>
                        <p class="text-xs text-gray-500">${selectedChat.status}</p>
                    </div>
                </div>
            </div>

            <!-- Messages Area -->
            <div class="message-list p-4 flex-1 relative" data-chat-id="${currentChatId}">
                <div class="flex flex-col-reverse gap-4 space-y-reverse absolute bottom-0 left-0 right-0 px-4">
                    ${selectedChat.messages.map(message => `
                        <div class="flex items-end ${message.isReceived ? '' : 'justify-end'}">
                            ${message.isReceived ? `
                                <div class="chat-avatar-sm bg-${selectedChat.color}-100">
                                    <span class="text-${selectedChat.color}-600 font-medium text-xs">${message.sender.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                            ` : ''}
                            <div class="${message.isReceived ? 
                                'message-received' : 
                                'message-sent'}">
                                <p>${message.content}</p>
                                <p class="${
                                    message.isReceived ? 'message-time-received' : 'message-time-sent'
                                }">${message.time}</p>
                            </div>
                        </div>
                    `).reverse().join('')}
                </div>
            </div>

            <!-- Message Input -->
            <div class="bg-white border-t p-4">
                <form class="flex items-center space-x-2" id="message-form" data-chat-id="${currentChatId}">
                    <input type="text" 
                           name="message" 
                           placeholder="Type your message..." 
                           class="message-input"
                           required
                    >
                    <button type="submit" class="send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        `;

        // Scroll to bottom after chat switch
        requestAnimationFrame(() => {
            scrollToBottom();
        });
    }
});

// Message form handler
document.addEventListener('submit', function(event) {
    const form = event.target;
    if (form.id === 'message-form') {
        event.preventDefault();
        
        const input = form.querySelector('input[name="message"]');
        const message = input.value.trim();
        
        if (message) {
            const messageList = document.querySelector(`.message-list[data-chat-id="${currentChatId}"] .flex-col-reverse`);
            if (messageList) {
                const newMessage = `
                    <div class="flex items-end justify-end">
                        <div class="message-sent">
                            <p>${message}</p>
                            <p class="message-time-sent">Just now</p>
                        </div>
                    </div>
                `;
                
                // Insert at the beginning of the flex-col-reverse container
                messageList.insertAdjacentHTML('afterbegin', newMessage);
                
                // Clear input
                input.value = '';
                
                // Scroll to bottom
                scrollToBottom(true);
            }
        }
    }
});

try {
    const socket = io('http://127.0.0.1:3000/chat');

    socket.on('connect', () => {
        console.log('Соединение установлено');
    });

    socket.on('send-message', (data) => {
        console.log('Получено сообщение:', data);
        const messageList = document.querySelector(`.message-list[data-chat-id="${currentChatId}"] .flex-col-reverse`);
        if (data.client != socket.id && currentChatId == "1") {
            const newMessage = `
                <div class="flex items-end">
                    <div class="chat-avatar-sm bg-blue-100">
                        <span class="text-blue-600 font-medium text-xs">US</span>
                    </div>
                    <div class="message-received">
                        <p class="text-gray-800">${data.message.text}</p>
                        <p class="message-time-received">Just now</p>
                    </div>
                </div>
            `;
            
            messageList.insertAdjacentHTML('afterbegin', newMessage);
            scrollToBottom(true);
        }
    });

    socket.on('disconnect', () => {
        console.log('Соединение разорвано');
    });

    function sendMessage() {
        let value = document.getElementById('input-message-area').value
        socket.emit('new-message', { text: value });
    }
    
    socket.onmessage = function(event) {
        try {
            const data = JSON.parse(event.data);
            if (data.send !== undefined && data.send !== "") {
                const messageList = document.querySelector(`.message-list[data-chat-id="${currentChatId}"] .flex-col-reverse`);
                if (messageList) {
                    const newMessage = `
                        <div class="flex items-end">
                            <div class="chat-avatar-sm bg-blue-100">
                                <span class="text-blue-600 font-medium text-xs">US</span>
                            </div>
                            <div class="message-received">
                                <p class="text-gray-800">${data.send}</p>
                                <p class="message-time-received">Just now</p>
                            </div>
                        </div>
                    `;
                    
                    messageList.insertAdjacentHTML('afterbegin', newMessage);
                    scrollToBottom(true);
                }
            }
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    };
} catch (error) {
    console.error("Error setting up WebSocket:", error);
}