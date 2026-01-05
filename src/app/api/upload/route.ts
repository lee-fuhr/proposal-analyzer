import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'File type not supported. Upload PDF, Word (.doc/.docx), or plain text.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large (max 10MB)' },
        { status: 400 }
      )
    }

    // Generate unique upload ID
    const uploadId = generateUploadId()

    // In production:
    // 1. Store file in Vercel Blob Storage
    // 2. Store metadata in Vercel KV
    // 3. Create Stripe checkout session
    // 4. Return checkout URL

    // For now, return success with upload ID
    // This would normally redirect to Stripe checkout
    console.log('File uploaded:', file.name, file.size, 'bytes')

    return NextResponse.json({
      success: true,
      uploadId,
      // In production: checkoutUrl: stripeSession.url
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}

function generateUploadId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
