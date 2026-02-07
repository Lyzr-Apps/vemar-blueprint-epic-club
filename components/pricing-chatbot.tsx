'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu } from 'react-icons/fi'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function PricingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help answer questions about our pricing plans. What would you like to know?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Pricing-related queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return 'We offer three pricing tiers: API Access ($49/month), Medium Scale ($199/month), and Enterprise (custom pricing). You can save up to 17% with annual billing. Which plan interests you?'
    }

    if (lowerMessage.includes('api access') || lowerMessage.includes('basic') || lowerMessage.includes('starter')) {
      return 'The API Access plan is $49/month ($490/year) and includes 10,000 API calls/month, REST & GraphQL endpoints, real-time webhooks, and email support. Perfect for developers and small teams!'
    }

    if (lowerMessage.includes('medium') || lowerMessage.includes('popular')) {
      return 'The Medium Scale plan is $199/month ($1990/year) and includes 100,000 API calls/month, priority support, advanced analytics, multiple environments, and a 99.9% SLA. This is our most popular plan!'
    }

    if (lowerMessage.includes('enterprise') || lowerMessage.includes('large') || lowerMessage.includes('unlimited')) {
      return 'Our Enterprise plan offers unlimited API calls, custom rate limits, dedicated account manager, 99.99% uptime SLA, and full white-label options. Contact our sales team for custom pricing tailored to your needs.'
    }

    if (lowerMessage.includes('difference') || lowerMessage.includes('compare')) {
      return 'The main differences are in API call limits, rate limits, support levels, and SLA guarantees. API Access has 10K calls/month, Medium Scale has 100K calls/month, and Enterprise has unlimited calls with custom rate limits.'
    }

    if (lowerMessage.includes('support')) {
      return 'Support varies by plan: API Access gets email support (48hr response), Medium Scale gets priority email support (12hr response), and Enterprise gets a dedicated 24/7 account manager.'
    }

    if (lowerMessage.includes('annual') || lowerMessage.includes('yearly') || lowerMessage.includes('save')) {
      return 'With annual billing, you save approximately 17% compared to monthly billing. For example, API Access is $490/year instead of $588/year if paid monthly!'
    }

    if (lowerMessage.includes('trial') || lowerMessage.includes('demo') || lowerMessage.includes('test')) {
      return 'For information about trials or demos, please contact our sales team using the "Contact Sales Team" button on the pricing page. They can set up a personalized demo for you.'
    }

    if (lowerMessage.includes('upgrade') || lowerMessage.includes('downgrade') || lowerMessage.includes('change plan')) {
      return 'You can upgrade or downgrade your plan at any time. Changes are prorated, so you only pay for what you use. Contact support to make plan changes.'
    }

    if (lowerMessage.includes('feature') || lowerMessage.includes('include')) {
      return 'Each plan includes different features. All plans include REST & GraphQL endpoints and webhooks. Medium Scale adds advanced analytics and multiple environments. Enterprise adds SSO, white-labeling, and custom integrations.'
    }

    if (lowerMessage.includes('sla') || lowerMessage.includes('uptime')) {
      return 'Our SLA guarantees are: API Access - 99.5%, Medium Scale - 99.9%, and Enterprise - 99.99% uptime. All plans include automatic failover and redundancy.'
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! How can I help you with our pricing plans today?'
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! Is there anything else you\'d like to know about our pricing?'
    }

    // Default response
    return 'I can help you with questions about our pricing plans, features, API limits, support levels, and billing options. Could you please be more specific about what you\'d like to know?'
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
        >
          <FiMessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCpu className="w-5 h-5" />
                <CardTitle className="text-lg">Pricing Assistant</CardTitle>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/80 mt-1">Ask me about our pricing plans</p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <FiUser className="w-4 h-4 text-white" />
                    ) : (
                      <FiCpu className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <FiCpu className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about pricing..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                >
                  <FiSend className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
