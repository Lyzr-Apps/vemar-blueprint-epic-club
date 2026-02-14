'use client'

import { useState } from 'react'
import { FiMessageSquare, FiStar, FiMail, FiUser, FiAlertCircle, FiCheckCircle, FiSend } from 'react-icons/fi'

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    rating: 5,
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        category: 'general',
        rating: 5,
        subject: '',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <FiMessageSquare className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Share Your Feedback
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-semibold">
              Help us improve VEMAR.AI - Your opinion matters!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Why Your Feedback Matters</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <FiCheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">Product Improvement</h3>
                    <p className="text-gray-600">
                      Your insights help us prioritize features and fix issues that matter most to you
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                    <FiStar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">Better User Experience</h3>
                    <p className="text-gray-600">
                      We use your feedback to create a more intuitive and powerful platform
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                    <FiUser className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">Community Building</h3>
                    <p className="text-gray-600">
                      Join our community of users shaping the future of AI-powered business solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Include */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-black mb-6">What to Include in Your Feedback</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Feature requests or suggestions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Bug reports or technical issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">User experience improvements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Performance feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Integration requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Pricing and plan feedback</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-black text-gray-900 mb-4">Other Ways to Reach Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">Email Support</p>
                    <a href="mailto:support@vemar.ai" className="text-blue-600 hover:underline">
                      support@vemar.ai
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-bold text-gray-900">Bug Reports</p>
                    <a href="mailto:bugs@vemar.ai" className="text-purple-600 hover:underline">
                      bugs@vemar.ai
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiMessageSquare className="w-5 h-5 text-pink-600" />
                  <div>
                    <p className="font-bold text-gray-900">Live Chat</p>
                    <p className="text-pink-600">Available 24/7 on our website</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feedback Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Feedback Form</h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your feedback has been submitted successfully. We'll review it within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-black text-gray-900 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-black text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-black text-gray-900 mb-2">
                      Feedback Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="ui">UI/UX Improvement</option>
                      <option value="performance">Performance Issue</option>
                      <option value="pricing">Pricing & Plans</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label htmlFor="rating" className="block text-sm font-black text-gray-900 mb-2">
                      Overall Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <FiStar
                            className={`w-8 h-8 ${
                              star <= formData.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm font-bold text-gray-700">
                        {formData.rating} / 5
                      </span>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-black text-gray-900 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                      placeholder="Brief summary of your feedback"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-black text-gray-900 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all resize-none"
                      placeholder="Tell us more about your feedback..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Response Timeline */}
        <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">What Happens Next?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
                1
              </div>
              <h3 className="font-black text-gray-900 mb-2">Submission</h3>
              <p className="text-sm text-gray-600">
                Your feedback is received instantly in our system
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
                2
              </div>
              <h3 className="font-black text-gray-900 mb-2">Review</h3>
              <p className="text-sm text-gray-600">
                Our team reviews all feedback within 24-48 hours
              </p>
            </div>

            <div className="text-center">
              <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
                3
              </div>
              <h3 className="font-black text-gray-900 mb-2">Action</h3>
              <p className="text-sm text-gray-600">
                We prioritize and add valuable feedback to our roadmap
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
                4
              </div>
              <h3 className="font-black text-gray-900 mb-2">Update</h3>
              <p className="text-sm text-gray-600">
                You'll be notified when your suggestion is implemented
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
