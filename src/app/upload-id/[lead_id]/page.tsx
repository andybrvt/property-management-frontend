'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function UploadIDPage() {
  const { lead_id } = useParams()
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>('')

  console.log('Lead ID:', lead_id)

  if (!lead_id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-xl">Loading...</h1>
      </div>
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !lead_id) {
      setStatus('❌ Missing file or lead ID.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setStatus('Uploading...')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/leads/upload-id/${lead_id}`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (res.ok) {
        setStatus('✅ ID uploaded successfully!')
      } else {
        setStatus('❌ Failed to upload. Please try again.')
      }
    } catch (error) {
      setStatus('❌ Error uploading file.')
    }
  }

  const showSuccessMessage = status === '✅ ID uploaded successfully!'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
        className="mb-8 dark:invert"
      />
      {showSuccessMessage ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            ✅ ID Uploaded Successfully!
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
            Thanks for uploading your ID. You'll receive a text shortly with a link to schedule your showing!
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Upload Your Driver&apos;s License
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
            Please upload a clear photo or PDF of your valid driver&apos;s license to verify your identity. Accepted formats: JPG, PNG, or PDF.
          </p>
          <form
            onSubmit={handleUpload}
            className="w-full max-w-md bg-white p-6 rounded-xl shadow"
            encType="multipart/form-data"
          >
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              required
              className="w-full mb-4 border border-gray-300 p-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
        </>
      )}
      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}
