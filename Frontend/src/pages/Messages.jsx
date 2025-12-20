import React, { useState } from 'react';

const Messages = () => {
  // Placeholder data
  const [conversations] = useState([
    { id: 1, name: "System", message: "Welcome to Kaarya Messages!", time: "Now" }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-[600px] flex">
        
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Messages</h2>
          </div>
          <div className="overflow-y-auto h-full">
             {conversations.map(chat => (
                 <div key={chat.id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700/50">
                     <h3 className="font-semibold text-gray-900 dark:text-white">{chat.name}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.message}</p>
                 </div>
             ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 flex flex-col bg-white dark:bg-gray-800">
           <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
               <div className="text-center">
                   <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                   <p>Select a conversation to start messaging</p>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Messages;
