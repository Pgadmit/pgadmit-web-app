'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAI } from '@/lib/ai-context';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIChatWidget() {
  const { messages, isLoading, isChatOpen, sendMessage, openChat, closeChat } =
    useAI();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  const handleOpenChat = () => {
    openChat('general');
  };

  if (!isChatOpen) {
    return (
      <div className='fixed bottom-6 right-6 z-50'>
        <Button
          onClick={handleOpenChat}
          size='lg'
          className='h-14 w-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 group'
        >
          <MessageCircle className='h-6 w-6 group-hover:scale-110 transition-transform' />
          <span className='sr-only'>Open AI Chat</span>
        </Button>

        {/* Pulsing indicator */}
        <div className='absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full animate-pulse'>
          <Sparkles className='h-3 w-3 text-primary-foreground absolute top-0.5 left-0.5' />
        </div>
      </div>
    );
  }

  return (
    <div className='fixed bottom-6 right-6 z-50 w-80 md:w-96'>
      <Card className='shadow-2xl border-0 bg-card'>
        <CardHeader className='pb-3'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <div className='h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center'>
                <Sparkles className='h-4 w-4 text-accent' />
              </div>
              AI Counselor
            </CardTitle>
            <Button variant='ghost' size='sm' onClick={closeChat}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </CardHeader>

        <CardContent className='p-0'>
          <ScrollArea className='h-80 px-4'>
            <div className='space-y-4 py-4'>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className='flex justify-start'>
                  <div className='bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm flex items-center gap-2'>
                    <Loader2 className='h-3 w-3 animate-spin' />
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className='p-4 border-t border-border'>
            <form onSubmit={handleSendMessage} className='flex gap-2'>
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder='Ask me anything about studying abroad...'
                disabled={isLoading}
                className='flex-1'
              />
              <Button
                type='submit'
                size='sm'
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className='h-4 w-4' />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
