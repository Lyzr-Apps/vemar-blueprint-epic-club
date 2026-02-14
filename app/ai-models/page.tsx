'use client'

import { useState } from 'react'
import { FiMic, FiType, FiPlay, FiLoader, FiVolume2, FiCpu, FiZap, FiCheckCircle, FiClock } from 'react-icons/fi'
import { ChatWidget } from '@/components/chat-widget'

type TTSVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer'
type TextTask = 'summarize' | 'translate' | 'paraphrase' | 'complete' | 'analyze' | 'extract'

export default function AIModelsPage() {
  const [activeTab, setActiveTab] = useState<'tts' | 'text'>('tts')

  // TTS State
  const [ttsText, setTtsText] = useState('')
  const [ttsVoice, setTtsVoice] = useState<TTSVoice>('alloy')
  const [ttsSpeed, setTtsSpeed] = useState(1.0)
  const [ttsLoading, setTtsLoading] = useState(false)
  const [ttsResult, setTtsResult] = useState<any>(null)

  // Text Model State
  const [textInput, setTextInput] = useState('')
  const [textTask, setTextTask] = useState<TextTask>('summarize')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [extractionType, setExtractionType] = useState('keywords')
  const [textLoading, setTextLoading] = useState(false)
  const [textResult, setTextResult] = useState<any>(null)

  const handleTTS = async () => {
    if (!ttsText.trim()) return

    setTtsLoading(true)
    setTtsResult(null)

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: ttsText,
          voice: ttsVoice,
          speed: ttsSpeed,
          model: 'tts-1',
        }),
      })

      const data = await response.json()
      setTtsResult(data)
    } catch (error) {
      setTtsResult({ success: false, error: 'Failed to generate speech' })
    } finally {
      setTtsLoading(false)
    }
  }

  const handleTextModel = async () => {
    if (!textInput.trim()) return

    setTextLoading(true)
    setTextResult(null)

    try {
      const options: any = {}

      if (textTask === 'translate') {
        options.targetLanguage = targetLanguage
      } else if (textTask === 'extract') {
        options.extractionType = extractionType
      }

      const response = await fetch('/api/text-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textInput,
          task: textTask,
          options,
        }),
      })

      const data = await response.json()
      setTextResult(data)
    } catch (error) {
      setTextResult({ success: false, error: 'Failed to process text' })
    } finally {
      setTextLoading(false)
    }
  }

  const voices: TTSVoice[] = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']
  const tasks: { value: TextTask; label: string }[] = [
    { value: 'summarize', label: 'Summarize' },
    { value: 'translate', label: 'Translate' },
    { value: 'paraphrase', label: 'Paraphrase' },
    { value: 'complete', label: 'Complete' },
    { value: 'analyze', label: 'Analyze' },
    { value: 'extract', label: 'Extract' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Chat Widget */}
      <ChatWidget position="top-right" />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <FiCpu className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-200">AI Models Studio</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Text-to-Speech &amp; Text Models</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Transform text to natural speech and process text with advanced AI models. Powered by
              state-of-the-art language models.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('tts')}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === 'tts'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <FiMic className="w-6 h-6" />
            <span>Text-to-Speech</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all ${
              activeTab === 'text'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <FiType className="w-6 h-6" />
            <span>Text Models</span>
          </button>
        </div>

        {/* Text-to-Speech Tab */}
        {activeTab === 'tts' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FiMic className="w-7 h-7 text-blue-400" />
                Generate Speech
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Text</label>
                  <textarea
                    value={ttsText}
                    onChange={(e) => setTtsText(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 min-h-[150px]"
                    placeholder="Enter text to convert to speech... (max 4096 characters)"
                    maxLength={4096}
                  />
                  <div className="text-xs text-slate-500 mt-1">{ttsText.length} / 4096 characters</div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Voice</label>
                  <div className="grid grid-cols-3 gap-2">
                    {voices.map((voice) => (
                      <button
                        key={voice}
                        onClick={() => setTtsVoice(voice)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          ttsVoice === voice
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {voice}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Speed: {ttsSpeed}x
                  </label>
                  <input
                    type="range"
                    min="0.25"
                    max="4.0"
                    step="0.25"
                    value={ttsSpeed}
                    onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0.25x</span>
                    <span>4.0x</span>
                  </div>
                </div>

                <button
                  onClick={handleTTS}
                  disabled={!ttsText.trim() || ttsLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white px-6 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
                >
                  {ttsLoading ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiPlay className="w-5 h-5" />
                      Generate Speech
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FiVolume2 className="w-7 h-7 text-purple-400" />
                Result
              </h2>

              {!ttsResult ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FiVolume2 className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-slate-400">Enter text and generate speech to see results</p>
                </div>
              ) : ttsResult.success ? (
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-300 font-semibold mb-2">
                      <FiCheckCircle className="w-5 h-5" />
                      Speech Generated Successfully
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-slate-400 text-sm">Duration</span>
                      <span className="text-white font-semibold">{ttsResult.duration}s</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-slate-400 text-sm">Format</span>
                      <span className="text-white font-semibold">{ttsResult.format?.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-slate-400 text-sm">Voice</span>
                      <span className="text-white font-semibold capitalize">{ttsVoice}</span>
                    </div>
                  </div>

                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-4">
                    <p className="text-blue-200 text-sm">
                      Audio URL: <span className="font-mono text-xs">{ttsResult.audioUrl}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 font-semibold">Error: {ttsResult.error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Text Models Tab */}
        {activeTab === 'text' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FiType className="w-7 h-7 text-blue-400" />
                Process Text
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Input Text</label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 min-h-[150px]"
                    placeholder="Enter text to process..."
                  />
                  <div className="text-xs text-slate-500 mt-1">{textInput.length} characters</div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Task</label>
                  <select
                    value={textTask}
                    onChange={(e) => setTextTask(e.target.value as TextTask)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    {tasks.map((task) => (
                      <option key={task.value} value={task.value}>
                        {task.label}
                      </option>
                    ))}
                  </select>
                </div>

                {textTask === 'translate' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Target Language
                    </label>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="pt">Portuguese</option>
                      <option value="ru">Russian</option>
                      <option value="zh">Chinese</option>
                      <option value="ja">Japanese</option>
                      <option value="ko">Korean</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                )}

                {textTask === 'extract' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Extraction Type
                    </label>
                    <select
                      value={extractionType}
                      onChange={(e) => setExtractionType(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="keywords">Keywords</option>
                      <option value="entities">Entities</option>
                      <option value="sentiment">Sentiment</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={handleTextModel}
                  disabled={!textInput.trim() || textLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white px-6 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
                >
                  {textLoading ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiZap className="w-5 h-5" />
                      Process Text
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FiCheckCircle className="w-7 h-7 text-purple-400" />
                Result
              </h2>

              {!textResult ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FiType className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-slate-400">Process text to see results</p>
                </div>
              ) : textResult.success ? (
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-300 font-semibold mb-2">
                      <FiCheckCircle className="w-5 h-5" />
                      Text Processed Successfully
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Output</h3>
                    <pre className="text-white whitespace-pre-wrap break-words text-sm leading-relaxed">
                      {textResult.result}
                    </pre>
                  </div>

                  {textResult.metadata && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-400">Metadata</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
                          <FiType className="w-4 h-4 text-blue-400" />
                          <div>
                            <div className="text-xs text-slate-500">Input</div>
                            <div className="text-white text-sm font-semibold">
                              {textResult.metadata.inputLength} chars
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
                          <FiType className="w-4 h-4 text-purple-400" />
                          <div>
                            <div className="text-xs text-slate-500">Output</div>
                            <div className="text-white text-sm font-semibold">
                              {textResult.metadata.outputLength} chars
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
                          <FiCpu className="w-4 h-4 text-green-400" />
                          <div>
                            <div className="text-xs text-slate-500">Model</div>
                            <div className="text-white text-sm font-semibold">
                              {textResult.metadata.model}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg">
                          <FiClock className="w-4 h-4 text-orange-400" />
                          <div>
                            <div className="text-xs text-slate-500">Time</div>
                            <div className="text-white text-sm font-semibold">
                              {textResult.metadata.processingTime}ms
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 font-semibold">Error: {textResult.error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
              <FiMic className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Text-to-Speech</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>6 natural-sounding voices</li>
                <li>Adjustable speech speed</li>
                <li>High-quality audio output</li>
                <li>Multiple language support</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
              <FiType className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Text Processing</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>Summarization &amp; paraphrasing</li>
                <li>Multi-language translation</li>
                <li>Text completion</li>
                <li>Content analysis</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
              <FiZap className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Advanced Extraction</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>Keyword extraction</li>
                <li>Named entity recognition</li>
                <li>Sentiment analysis</li>
                <li>Structured data output</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
