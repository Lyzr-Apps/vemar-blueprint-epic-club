'use client'

import { useState } from 'react'
import { FiHelpCircle, FiChevronDown, FiChevronUp, FiSearch, FiCpu, FiDollarSign, FiShield, FiZap, FiSettings, FiAlertCircle } from 'react-icons/fi'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    // General Questions
    {
      category: 'general',
      question: 'What is VEMAR.AI?',
      answer: 'VEMAR.AI is a comprehensive AI Models Studio that provides enterprise-grade AI services including Text-to-Speech (TTS), Text Processing, RAG-powered Chat Assistant, Deepfake Detection, and Analytics Dashboard. We help businesses automate operations and enhance productivity with cutting-edge AI technology.',
    },
    {
      category: 'general',
      question: 'Who can use VEMAR.AI?',
      answer: 'VEMAR.AI is designed for businesses of all sizes - from startups to enterprises. Our platform is particularly valuable for BFSI institutions, content creators, customer service teams, and any organization looking to leverage AI for automation and efficiency.',
    },
    {
      category: 'general',
      question: 'Do I need technical knowledge to use VEMAR.AI?',
      answer: 'No! VEMAR.AI is designed with user-friendliness in mind. Our intuitive interface allows anyone to use our AI features without coding knowledge. However, we also provide API access for developers who want to integrate our services into their applications.',
    },
    {
      category: 'general',
      question: 'What makes VEMAR.AI different from other AI platforms?',
      answer: 'VEMAR.AI stands out with its multi-modal approach, combining TTS, NLP, and computer vision in one platform. We offer BFSI-specific deepfake detection, India-optimized pricing, local data residency, and a production-ready infrastructure built with Next.js and TypeScript for enterprise reliability.',
    },

    // Features & Capabilities
    {
      category: 'features',
      question: 'What AI features does VEMAR.AI offer?',
      answer: 'We offer: (1) Text-to-Speech with 6 AI voices and variable speed control, (2) Text Processing including summarization, translation, paraphrasing, completion, analysis, and extraction, (3) RAG-powered Chat Assistant with context-aware responses, (4) Deepfake Detection for video, image, and audio, and (5) Real-time Analytics Dashboard.',
    },
    {
      category: 'features',
      question: 'How does the Text-to-Speech feature work?',
      answer: 'Our TTS feature converts text (up to 4096 characters) into natural-sounding speech. You can choose from 6 different AI voices and adjust the speed from 0.25x to 4.0x. Simply paste your text, select your preferences, and download the generated MP3 audio file.',
    },
    {
      category: 'features',
      question: 'What is RAG and how does it help?',
      answer: 'RAG (Retrieval-Augmented Generation) is a technology that allows our AI chat assistant to provide context-aware responses by retrieving relevant information from your documents. It answers questions with source attribution, ensuring accuracy and transparency in responses.',
    },
    {
      category: 'features',
      question: 'How accurate is the Deepfake Detection?',
      answer: 'Our deepfake detection system uses multi-factor verification to analyze video, audio, and images. For BFSI applications, we achieve high accuracy rates with detailed risk scoring and confidence levels. The system provides actionable reports for fraud prevention.',
    },
    {
      category: 'features',
      question: 'Can I process multiple documents at once?',
      answer: 'Yes! Our platform supports batch processing for text operations and document analysis. Enterprise users get access to our Batch Processing API for handling large volumes of content efficiently.',
    },
    {
      category: 'features',
      question: 'What languages are supported?',
      answer: 'Currently, we support English for all features. Multi-language support for 10+ Indian languages (Hindi, Tamil, Telugu, Bengali, etc.) is on our roadmap for Q1 2026.',
    },

    // Pricing & Plans
    {
      category: 'pricing',
      question: 'What pricing plans do you offer?',
      answer: 'We offer four tiers: (1) Free Tier - 1,000 requests/month for testing, (2) Starter - $29/month for 10,000 requests, (3) Professional - $99/month for 50,000 requests with advanced analytics, and (4) Enterprise - Custom pricing with unlimited requests, SLA, and dedicated support.',
    },
    {
      category: 'pricing',
      question: 'Is there a free trial?',
      answer: 'Yes! Our Free Tier gives you 1,000 API requests per month with no credit card required. This allows you to test all features and determine which plan works best for your needs.',
    },
    {
      category: 'pricing',
      question: 'What happens if I exceed my plan limit?',
      answer: 'If you exceed your monthly request limit, you can either upgrade to a higher tier or purchase additional requests through our overage pricing. We\'ll notify you when you reach 80% of your limit to prevent service interruption.',
    },
    {
      category: 'pricing',
      question: 'Do you offer discounts for annual subscriptions?',
      answer: 'Yes! Annual subscriptions receive a 20% discount compared to monthly billing. Enterprise customers can negotiate custom pricing based on volume and requirements.',
    },
    {
      category: 'pricing',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time. Your service will continue until the end of your current billing period, and you won\'t be charged for the next cycle.',
    },

    // Technical & API
    {
      category: 'technical',
      question: 'Do you provide API access?',
      answer: 'Yes! All paid plans include API access. We provide RESTful APIs with comprehensive documentation, code examples in multiple languages, and SDKs for popular frameworks. Enterprise plans get dedicated API support.',
    },
    {
      category: 'technical',
      question: 'What are the API rate limits?',
      answer: 'Rate limits depend on your plan: Free Tier - 10 requests/minute, Starter - 60 requests/minute, Professional - 300 requests/minute, Enterprise - Custom limits. We use token bucket algorithm for fair rate limiting.',
    },
    {
      category: 'technical',
      question: 'How do I integrate VEMAR.AI into my application?',
      answer: 'Integration is simple! Sign up, get your API key, and use our REST API endpoints. We provide detailed documentation, code samples, and SDKs. You can also list our APIs on RapidAPI and AWS Marketplace for easy discovery.',
    },
    {
      category: 'technical',
      question: 'What is your API uptime guarantee?',
      answer: 'Professional plans include 99.5% uptime SLA, and Enterprise plans include 99.9% uptime SLA. We use Vercel\'s edge network for global distribution and automatic failover to ensure reliability.',
    },
    {
      category: 'technical',
      question: 'Do you support webhooks?',
      answer: 'Yes! Enterprise plans include webhook support for real-time notifications on completed processing jobs, allowing you to build event-driven integrations.',
    },

    // Security & Privacy
    {
      category: 'security',
      question: 'How do you ensure data security?',
      answer: 'We implement end-to-end encryption, HTTPS for all connections, and secure data transmission. Our infrastructure is hosted on ISO 27001 certified servers with regular security audits. Enterprise plans include SOC 2 Type II compliance.',
    },
    {
      category: 'security',
      question: 'Where is my data stored?',
      answer: 'All data is stored on servers located in India (Mumbai and Bangalore) to comply with data localization requirements. We offer on-premise deployment options for Enterprise customers with strict data residency needs.',
    },
    {
      category: 'security',
      question: 'Do you comply with GDPR and Indian data protection laws?',
      answer: 'Yes! We are GDPR-ready and compliant with India\'s Digital Personal Data Protection Act (DPDPA). We implement data minimization, user consent management, and provide data portability and deletion rights.',
    },
    {
      category: 'security',
      question: 'How long do you retain my data?',
      answer: 'API request logs are retained for 30 days for debugging purposes. Processed content is not stored unless you explicitly save it. You can request data deletion at any time through your account settings.',
    },
    {
      category: 'security',
      question: 'Can I get a Data Processing Agreement (DPA)?',
      answer: 'Yes! All Professional and Enterprise customers receive a standard DPA. Custom DPAs can be negotiated for Enterprise plans with specific compliance requirements.',
    },

    // Billing & Payments
    {
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), UPI, NEFT, RTGS, and bank transfers for Indian customers. Enterprise customers can also pay via purchase orders and wire transfers.',
    },
    {
      category: 'billing',
      question: 'When will I be charged?',
      answer: 'You\'ll be charged at the beginning of each billing cycle (monthly or annually). You can view your next billing date and amount in your account dashboard.',
    },
    {
      category: 'billing',
      question: 'Can I get a refund?',
      answer: 'We offer a 7-day money-back guarantee for new subscribers. If you\'re not satisfied within the first week, contact our support team for a full refund.',
    },
    {
      category: 'billing',
      question: 'Do you charge in INR or USD?',
      answer: 'We support both! Indian customers can pay in INR to avoid forex fluctuations, while international customers can pay in USD. Pricing is automatically converted based on your location.',
    },

    // Support & Troubleshooting
    {
      category: 'support',
      question: 'What kind of support do you provide?',
      answer: 'Free Tier users get community support. Starter and Professional plans include email support with 24-48 hour response time. Enterprise plans get 24/7 priority support, dedicated account manager, and phone support.',
    },
    {
      category: 'support',
      question: 'How do I report a bug or issue?',
      answer: 'You can report bugs via email at bugs@vemar.ai, through the feedback form, or by submitting a support ticket in your dashboard. Include error messages and steps to reproduce for faster resolution.',
    },
    {
      category: 'support',
      question: 'Do you provide training for my team?',
      answer: 'Yes! Professional plans include 2 hours of onboarding training. Enterprise plans include comprehensive training programs, workshops, and ongoing education for your team.',
    },
    {
      category: 'support',
      question: 'What if the API is down?',
      answer: 'Check our status page at status.vemar.ai for real-time updates. We provide status notifications via email and webhook. Enterprise customers receive priority resolution and compensation for SLA violations.',
    },
    {
      category: 'support',
      question: 'Can I request new features?',
      answer: 'Absolutely! We love feature requests. Submit them through our feedback form, and our product team will review and prioritize them. Enterprise customers get dedicated feature development options.',
    },
  ]

  const categories = [
    { id: 'all', name: 'All Questions', icon: FiHelpCircle },
    { id: 'general', name: 'General', icon: FiZap },
    { id: 'features', name: 'Features', icon: FiCpu },
    { id: 'pricing', name: 'Pricing', icon: FiDollarSign },
    { id: 'technical', name: 'Technical', icon: FiSettings },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'billing', name: 'Billing', icon: FiDollarSign },
    { id: 'support', name: 'Support', icon: FiAlertCircle },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <FiHelpCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-semibold">
              Find answers to common questions about VEMAR.AI
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg transition-all"
              />
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
            {searchQuery && (
              <p className="mt-3 text-center text-gray-600">
                Found <span className="font-bold text-blue-600">{filteredFaqs.length}</span> result{filteredFaqs.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQ List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16">
            <FiAlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-black text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search or browse all categories
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left transition-all"
                  >
                    <h3 className="text-lg font-black text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {isOpen ? (
                      <FiChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    ) : (
                      <FiChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-8 pb-6">
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-black mb-4">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8 font-semibold">
            Our support team is here to help you
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/feedback"
              className="bg-white text-purple-600 font-black px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <FiHelpCircle className="w-5 h-5" />
              Submit Feedback
            </a>
            <a
              href="mailto:support@vemar.ai"
              className="bg-blue-500 text-white font-black px-8 py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <FiAlertCircle className="w-5 h-5" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
