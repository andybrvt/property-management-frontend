import Image from "next/image";

export default function Home() {
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
      <h1 className="text-2xl font-bold mb-4 text-center">
        Upload Your Driver's License
      </h1>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Please upload a clear photo or PDF of your valid driver's license to
        verify your identity. Accepted formats: JPG, PNG, or PDF.
      </p>
      <form
        action="https://YOUR-BACKEND-URL/api/upload-id/12345"
        method="POST"
        encType="multipart/form-data"
        className="w-full max-w-md bg-white p-6 rounded-xl shadow"
      >
        <input
          type="file"
          name="id_image"
          accept="image/*,application/pdf"
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
    </div>
  );
}
