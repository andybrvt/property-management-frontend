'use client'

import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    if (!text || !address) {
      setStatus('❌ Please enter text and select an address.')
      return
    }

    setStatus('Processing...')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mass-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, address }),
      })

      if (res.ok) {
        setStatus('✅ Mass text sent successfully!')
      } else {
        setStatus('❌ Failed to send texts.')
      }
    } catch (error) {
      setStatus('❌ Error sending texts.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Mass Text Sender
      </h1>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Enter your message below. We&apos;ll extract phone numbers and send a mass text with your selected address.
      </p>
      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-md h-32 border border-gray-300 p-2 rounded mb-4"
      />
      <input
        type="text"
        placeholder="Enter property address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full max-w-md border border-gray-300 p-2 rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="w-full max-w-md bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
      >
        Send Mass Text
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}
