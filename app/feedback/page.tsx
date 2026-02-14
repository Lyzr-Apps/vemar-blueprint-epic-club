'use client'

import { FiMessageSquare, FiStar, FiMail, FiUser, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

export default function FeedbackPage() {
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
              </div>
            </div>
          </div>

          {/* Right Column - Google Form Embed */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Feedback Form</h2>

              {/* Google Form Embed */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdQVXL8yMKH9vZ3mLQw7HjKzC4xPqEhFGnY2WbRtCvN8pLm5Q/viewform?embedded=true"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="rounded-lg"
                >
                  Loading form...
                </iframe>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Note:</span> If the form doesn't load, you can{' '}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdQVXL8yMKH9vZ3mLQw7HjKzC4xPqEhFGnY2WbRtCvN8pLm5Q/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    open it in a new tab
                  </a>
                  .
                </p>
              </div>
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
