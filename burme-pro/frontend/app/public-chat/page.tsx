'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Send, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ChatMessage } from '@/types';

export default function PublicChatPage() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to Burme Pro Community Chat! 🎉',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleJoin = () => {
    if (!username.trim()) return;
    setJoined(true);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      username: username,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      const responses = [
        'That\'s a great point! 👍',
        'Welcome to the community! 🎉',
        'Thanks for sharing!',
        'Interesting perspective!',
        'Great to have you here!',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: randomResponse,
          username: 'Bot',
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-cyan-500/20 rounded-2xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Join Community Chat</h1>
            <p className="text-gray-400">Enter your username to start chatting</p>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
            className="w-full bg-[#0a0e17] border border-cyan-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
          />

          <Button variant="neon" size="lg" className="w-full" onClick={handleJoin}>
            Join Chat
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Community Chat</h1>
            <p className="text-xs text-gray-400">Real-time messaging</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-400">{username}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'system'
                  ? 'bg-yellow-600'
                  : msg.role === 'user'
                  ? 'bg-cyan-600'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {msg.role === 'system' ? (
                  <span className="text-xs">📢</span>
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'system'
                  ? 'bg-yellow-600/20 text-yellow-100 text-center'
                  : msg.role === 'user'
                  ? 'bg-cyan-600/20 text-cyan-100'
                  : 'bg-card border border-cyan-500/20'
              }`}>
                {msg.role !== 'user' && msg.role !== 'system' && (
                  <p className="text-xs text-cyan-400 mb-1">{(msg as any).username || 'Bot'}</p>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="text-xs text-gray-500 mt-2 block">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-cyan-500/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-card border border-cyan-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <Button type="submit" variant="neon">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}