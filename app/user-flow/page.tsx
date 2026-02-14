'use client'

import { FiUser, FiCpu, FiCheckCircle, FiArrowRight, FiSettings, FiDatabase, FiZap, FiMessageSquare, FiFileText, FiMic, FiShield, FiBarChart2 } from 'react-icons/fi'

export default function UserFlowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              VEMAR.AI User Flow
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-semibold">
              Comprehensive journey through our AI Models Studio platform
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main User Journeys */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Three User Journeys</h2>
            <p className="text-xl text-gray-600">Different paths for different user types</p>
          </div>

          {/* Journey 1: TTS User */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center gap-4">
                <FiMic className="w-10 h-10" />
                <div>
                  <h3 className="text-2xl font-black">Journey 1: Text-to-Speech User</h3>
                  <p className="text-blue-100">Converting text content into natural speech</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-blue-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      1
                    </div>
                  </div>
                  <div className="text-center">
                    <FiUser className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-black text-gray-900 mb-2">User Arrives</h4>
                    <p className="text-sm text-gray-600">Lands on AI Models page</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-blue-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      2
                    </div>
                  </div>
                  <div className="text-center">
                    <FiFileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-black text-gray-900 mb-2">Input Text</h4>
                    <p className="text-sm text-gray-600">Enters text (up to 4096 chars)</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-blue-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      3
                    </div>
                  </div>
                  <div className="text-center">
                    <FiSettings className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-black text-gray-900 mb-2">Select Options</h4>
                    <p className="text-sm text-gray-600">Chooses voice & speed</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-purple-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      4
                    </div>
                  </div>
                  <div className="text-center">
                    <FiCpu className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-black text-gray-900 mb-2">AI Processing</h4>
                    <p className="text-sm text-gray-600">OpenAI generates audio</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-purple-500" />
                </div>
              </div>

              {/* Step 5 */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-green-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      5
                    </div>
                  </div>
                  <div className="text-center">
                    <FiCheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-black text-gray-900 mb-2">Download Audio</h4>
                    <p className="text-sm text-gray-600">Receives MP3 file</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Journey 2: Text Processing User */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center gap-4">
                <FiFileText className="w-10 h-10" />
                <div>
                  <h3 className="text-2xl font-black">Journey 2: Text Processing User</h3>
                  <p className="text-purple-100">Analyzing and transforming text documents</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-purple-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      1
                    </div>
                  </div>
                  <div className="text-center">
                    <FiUser className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-black text-gray-900 mb-2">User Arrives</h4>
                    <p className="text-sm text-gray-600">Opens Text Models</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-purple-500" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-purple-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      2
                    </div>
                  </div>
                  <div className="text-center">
                    <FiSettings className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-black text-gray-900 mb-2">Select Operation</h4>
                    <p className="text-sm text-gray-600">Summarize, Translate, etc.</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-purple-500" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-purple-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      3
                    </div>
                  </div>
                  <div className="text-center">
                    <FiFileText className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-black text-gray-900 mb-2">Input Text</h4>
                    <p className="text-sm text-gray-600">Pastes document content</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-purple-500" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-pink-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      4
                    </div>
                  </div>
                  <div className="text-center">
                    <FiCpu className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                    <h4 className="font-black text-gray-900 mb-2">AI Analysis</h4>
                    <p className="text-sm text-gray-600">GPT processes text</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-pink-500" />
                </div>
              </div>

              {/* Step 5 */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-green-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      5
                    </div>
                  </div>
                  <div className="text-center">
                    <FiCheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-black text-gray-900 mb-2">View Results</h4>
                    <p className="text-sm text-gray-600">Gets processed output</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Journey 3: RAG Chat User */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center gap-4">
                <FiMessageSquare className="w-10 h-10" />
                <div>
                  <h3 className="text-2xl font-black">Journey 3: RAG Chat User</h3>
                  <p className="text-pink-100">Asking questions with context-aware AI</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-6 gap-6">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-pink-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      1
                    </div>
                  </div>
                  <div className="text-center">
                    <FiUser className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                    <h4 className="font-black text-gray-900 mb-2">User Opens Chat</h4>
                    <p className="text-sm text-gray-600">Clicks chat widget</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-pink-500" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-pink-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      2
                    </div>
                  </div>
                  <div className="text-center">
                    <FiMessageSquare className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                    <h4 className="font-black text-gray-900 mb-2">Asks Question</h4>
                    <p className="text-sm text-gray-600">Types query in chat</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-pink-500" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-purple-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      3
                    </div>
                  </div>
                  <div className="text-center">
                    <FiDatabase className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-black text-gray-900 mb-2">Vector Search</h4>
                    <p className="text-sm text-gray-600">Retrieves context</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-purple-500" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-blue-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      4
                    </div>
                  </div>
                  <div className="text-center">
                    <FiCpu className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-black text-gray-900 mb-2">AI Generates</h4>
                    <p className="text-sm text-gray-600">Creates response</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-green-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      5
                    </div>
                  </div>
                  <div className="text-center">
                    <FiCheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-black text-gray-900 mb-2">Shows Answer</h4>
                    <p className="text-sm text-gray-600">Displays with sources</p>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <FiArrowRight className="w-6 h-6 text-green-500" />
                </div>
              </div>

              {/* Step 6 */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-4 border-teal-500 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl">
                      6
                    </div>
                  </div>
                  <div className="text-center">
                    <FiZap className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                    <h4 className="font-black text-gray-900 mb-2">Follow-up</h4>
                    <p className="text-sm text-gray-600">Continues conversation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Backend System Architecture */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Backend System Architecture</h2>
            <p className="text-xl text-gray-600">How our platform processes requests</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend Layer */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiUser className="w-10 h-10" />
                <h3 className="text-2xl font-black">Frontend Layer</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-blue-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Next.js 14 App Router</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">React Server Components</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">TypeScript for type safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Tailwind CSS styling</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Client-side validation</span>
                </li>
              </ul>
            </div>

            {/* API Layer */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiZap className="w-10 h-10" />
                <h3 className="text-2xl font-black">API Layer</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-purple-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Next.js API Routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-purple-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">RESTful endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-purple-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Request validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-purple-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Error handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-purple-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Rate limiting</span>
                </li>
              </ul>
            </div>

            {/* AI Services */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiCpu className="w-10 h-10" />
                <h3 className="text-2xl font-black">AI Services</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-pink-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">OpenAI TTS API</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pink-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">GPT-4 Text Processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pink-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Vector embeddings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pink-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">RAG retrieval system</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-pink-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Response streaming</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Flow Diagram */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Complete Data Flow</h2>
            <p className="text-xl text-gray-600">End-to-end request processing</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-gray-200">
            <div className="grid md:grid-cols-7 gap-4">
              {/* Step 1: User Input */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 mb-4 shadow-lg">
                  <FiUser className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-black">User Input</p>
                </div>
                <p className="text-sm text-gray-600">Browser / Client</p>
              </div>

              <div className="flex items-center justify-center">
                <FiArrowRight className="w-8 h-8 text-gray-400" />
              </div>

              {/* Step 2: Frontend Validation */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 mb-4 shadow-lg">
                  <FiShield className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-black">Validation</p>
                </div>
                <p className="text-sm text-gray-600">Client-side checks</p>
              </div>

              <div className="flex items-center justify-center">
                <FiArrowRight className="w-8 h-8 text-gray-400" />
              </div>

              {/* Step 3: API Request */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 mb-4 shadow-lg">
                  <FiZap className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-black">API Route</p>
                </div>
                <p className="text-sm text-gray-600">Server processing</p>
              </div>

              <div className="flex items-center justify-center">
                <FiArrowRight className="w-8 h-8 text-gray-400" />
              </div>

              {/* Step 4: AI Processing */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 mb-4 shadow-lg">
                  <FiCpu className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-black">AI Model</p>
                </div>
                <p className="text-sm text-gray-600">OpenAI processing</p>
              </div>

              <div className="flex items-center justify-center md:col-start-7">
                <FiArrowRight className="w-8 h-8 text-gray-400 transform rotate-180" />
              </div>

              <div className="text-center md:col-start-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 mb-4 shadow-lg">
                  <FiCheckCircle className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-black">Response</p>
                </div>
                <p className="text-sm text-gray-600">Result delivered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Enterprise User Journey</h2>
            <p className="text-xl text-gray-600">Additional features for business users</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Deepfake Detection Flow */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiShield className="w-10 h-10" />
                <h3 className="text-2xl font-black">Deepfake Detection Flow</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">1. Upload Media</p>
                  <p className="text-sm text-red-50">Video, audio, or image file</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">2. AI Analysis</p>
                  <p className="text-sm text-red-50">Multi-factor verification checks</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">3. Risk Score</p>
                  <p className="text-sm text-red-50">Confidence level + detailed report</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">4. Action Decision</p>
                  <p className="text-sm text-red-50">Approve, reject, or manual review</p>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard Flow */}
            <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiBarChart2 className="w-10 h-10" />
                <h3 className="text-2xl font-black">Analytics Dashboard Flow</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">1. Real-time Metrics</p>
                  <p className="text-sm text-teal-50">Live API usage & performance</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">2. Historical Data</p>
                  <p className="text-sm text-teal-50">Trends over time periods</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">3. Cost Analysis</p>
                  <p className="text-sm text-teal-50">Usage breakdown & billing</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-black mb-2">4. Export Reports</p>
                  <p className="text-sm text-teal-50">PDF or CSV downloads</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Platform Performance Metrics</h2>
            <p className="text-xl text-blue-100">Real-world performance indicators</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-5xl font-black mb-2">2s</div>
              <p className="text-blue-100 font-semibold">Avg Response Time</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-5xl font-black mb-2">99.2%</div>
              <p className="text-blue-100 font-semibold">Success Rate</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-5xl font-black mb-2">24/7</div>
              <p className="text-blue-100 font-semibold">Availability</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-5xl font-black mb-2">6</div>
              <p className="text-blue-100 font-semibold">AI Models</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
