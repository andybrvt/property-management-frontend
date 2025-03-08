'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [properties, setProperties] = useState<{ id: string; address: string }[]>([])
  const [selectedProperty, setSelectedProperty] = useState<string>('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    async function fetchProperties() {
      console.log("🚀 Fetching properties...");
    
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/property/properties`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
    
        console.log("📡 Raw Response:", res);
    
        if (!res.ok) {
          console.error("❌ HTTP Error:", res.status, res.statusText);
          return;
        }
    
        const rawText = await res.text();
        console.log("📄 Raw response text:", rawText);
    
        const data = JSON.parse(rawText);
        console.log("📡 Parsed JSON:", data);
    
        setProperties(data);
      } catch (error) {
        console.error('❌ Error fetching properties:', error);
      }
    }
  
    fetchProperties()
  }, [])
  
  const handleSubmit = async () => {
    if (!text || !selectedProperty) {
      setStatus('❌ Please enter text and select a property.')
      return
    }

    setStatus('🚀 Processing...')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/outbound/mass-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, address: selectedProperty }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus(`✅ ${data.message}`)
      } else {
        setStatus(`❌ Failed: ${data.detail}`)
      }
    } catch (error) {
      setStatus('❌ Error sending texts.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">Mass Text Sender</h1>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Paste text below. AI will extract numbers and send texts.
      </p>

      {/* Text input - Set text color to black */}
      <textarea
        placeholder="Paste message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-md h-32 border border-gray-300 p-2 rounded mb-4 text-black bg-white placeholder-gray-500"
      />

      {/* ✅ Property Dropdown (Searchable) - Set text color to black */}
      <select
        value={selectedProperty}
        onChange={(e) => setSelectedProperty(e.target.value)}
        className="w-full max-w-md border border-gray-300 p-2 rounded mb-4 bg-white"
      >
        <option value="" disabled className="text-gray-500">
          Select a property...
        </option>
        {properties.map((property) => (
          <option key={property.id} value={property.address} className="text-black">
            {property.address}
          </option>
        ))}
      </select>

      {/* Submit Button */}
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
