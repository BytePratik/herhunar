'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Send, 
  MessageSquare, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function MessagesContent() {
  const searchParams = useSearchParams();
  const recipientParam = searchParams.get('recipient');
  const recipientNameParam = searchParams.get('name');

  const { user, loginAs } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activePartner, setActivePartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, [user, recipientParam]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const currentUserId = user?.id || 'comp-1';
      const res = await fetch(`/api/messages?userId=${currentUserId}`);
      const json = await res.json();
      if (json.success) {
        let convList = json.data || [];

        if (recipientParam) {
          const expectedConvId = user?.role === 'talent' 
            ? `${recipientParam}_${user.id}`
            : `${user?.id || 'comp-1'}_${recipientParam}`;
          
          let existing = convList.find(c => c.conversationId === expectedConvId);
          if (!existing) {
            existing = {
              conversationId: expectedConvId,
              otherUser: {
                id: recipientParam,
                name: recipientNameParam || "Skill Partner",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
                role: user?.role === 'talent' ? 'company' : 'talent'
              },
              lastMessage: "Conversation initiated",
              lastTimestamp: new Date().toISOString()
            };
            convList = [existing, ...convList];
          }
          setActiveConversationId(expectedConvId);
          setActivePartner(existing.otherUser);
        } else if (convList.length > 0 && !activeConversationId) {
          setActiveConversationId(convList[0].conversationId);
          setActivePartner(convList[0].otherUser);
        }

        setConversations(convList);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeConversationId) {
      fetchMessages(activeConversationId);
    }
  }, [activeConversationId]);

  const fetchMessages = async (cid) => {
    try {
      const res = await fetch(`/api/messages?conversationId=${cid}`);
      const json = await res.json();
      if (json.success) {
        setMessages(json.data || []);
        scrollToBottom();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;

    const payload = {
      conversationId: activeConversationId,
      senderId: user?.id || 'comp-1',
      senderName: user?.name || 'Partner',
      senderRole: user?.role || 'company',
      receiverId: activePartner?.id || 'talent-1',
      text: inputText.trim()
    };

    setInputText('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        setMessages(prev => [...prev, json.data]);
        scrollToBottom();
      }
    } catch (err) {
      alert('Error sending message: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
            Real-Time Messages & Negotiation
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-900 mt-0.5">
            Conversation Threads
          </h1>
          <p className="text-xs text-warm-500">
            Discuss quotes, samples, timelines, and confirm order requirements safely.
          </p>
        </div>

        {/* Demo persona switcher helper */}
        <div className="flex items-center gap-2 bg-warm-100 p-1.5 rounded-xl border border-warm-200 text-xs">
          <span className="text-warm-500 font-medium">Testing as:</span>
          <button
            onClick={() => loginAs('company')}
            className={`px-2.5 py-1 rounded-lg transition font-medium ${
              user?.role === 'company' ? 'bg-white shadow-2xs text-terracotta-700' : 'text-warm-700 hover:text-warm-900'
            }`}
          >
            FabCraft (Company)
          </button>
          <button
            onClick={() => loginAs('talent')}
            className={`px-2.5 py-1 rounded-lg transition font-medium ${
              user?.role === 'talent' ? 'bg-white shadow-2xs text-terracotta-700' : 'text-warm-700 hover:text-warm-900'
            }`}
          >
            Asha (Talent)
          </button>
        </div>
      </div>

      {/* Main Messaging Interface */}
      <div className="bg-white rounded-3xl border border-warm-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row h-[620px]">
        {/* Left Sidebar: Conversations List */}
        <div className="w-full md:w-80 border-r border-warm-200 flex flex-col bg-warm-50/50">
          <div className="p-4 border-b border-warm-200 bg-white">
            <h3 className="font-bold text-warm-900 text-xs uppercase tracking-wider">
              Inbox ({conversations.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-warm-100">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-warm-400 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-warm-300" />
                <p>No active conversations yet.</p>
                <p className="text-[11px]">Send an enquiry from any profile to initiate a conversation.</p>
              </div>
            ) : (
              conversations.map((c) => {
                const isSelected = c.conversationId === activeConversationId;
                return (
                  <button
                    key={c.conversationId}
                    onClick={() => {
                      setActiveConversationId(c.conversationId);
                      setActivePartner(c.otherUser);
                    }}
                    className={`w-full p-4 text-left transition flex items-start gap-3 hover:bg-white ${
                      isSelected ? 'bg-white border-l-4 border-terracotta-600 shadow-2xs' : ''
                    }`}
                  >
                    <img
                      src={c.otherUser?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-warm-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-warm-900 text-xs truncate">
                          {c.otherUser?.name || 'Contact'}
                        </span>
                        <span className="text-[10px] text-warm-400 flex-shrink-0">
                          {c.lastTimestamp ? new Date(c.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p className="text-[11px] text-warm-500 truncate mt-0.5">
                        {c.lastMessage || 'Click to view messages'}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Area: Active Chat Window */}
        <div className="flex-1 flex flex-col bg-warm-50/20">
          {activePartner ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-warm-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activePartner.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-warm-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-warm-900 text-sm">{activePartner.name}</h4>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-warm-100 text-warm-700">
                        {activePartner.role}
                      </span>
                    </div>
                    <span className="text-[11px] text-sage-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-500"></span>
                      Direct Channel Active
                    </span>
                  </div>
                </div>

                <div className="text-xs text-warm-500 hidden sm:block">
                  Protected under HerHunar fair guidelines
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3.5">
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-xs text-warm-400 space-y-2">
                    <Sparkles className="w-6 h-6 mx-auto text-warm-300" />
                    <p>Start your discussion with {activePartner.name}.</p>
                    <p className="text-[11px]">You can negotiate quantities, sample delivery, and milestone payments.</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.senderId === (user?.id || 'comp-1');
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="text-[10px] text-warm-400 mb-1 px-1">
                          {isMe ? 'You' : msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div
                          className={`max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                            isMe
                              ? 'bg-terracotta-600 text-white rounded-br-xs'
                              : 'bg-white border border-warm-200 text-warm-900 rounded-bl-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Footer */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-warm-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Write a message to ${activePartner.name}...`}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-warm-50 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-4 py-2.5 bg-terracotta-600 text-white rounded-xl hover:bg-terracotta-700 transition disabled:opacity-40 flex items-center gap-1.5 shadow-sm text-xs font-semibold"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8 text-warm-400 text-xs">
              <div>
                <MessageSquare className="w-10 h-10 mx-auto text-warm-300 mb-3" />
                <h4 className="font-bold text-warm-800 text-sm">Select a Conversation</h4>
                <p className="mt-1">Choose a thread from the left or explore profiles to send an enquiry.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-warm-500">Loading messages...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
