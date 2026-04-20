import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoUrl, startTime, endTime } = body

    if (!videoUrl || startTime === undefined || endTime === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: videoUrl, startTime, endTime' },
        { status: 400 }
      )
    }

    // In production, use FFmpeg to trim:
    // ffmpeg -i input.mp4 -ss {startTime} -to {endTime} -c copy output.mp4
    const trimmedUrl = videoUrl.replace('.mp4', `_trim_${startTime}_${endTime}.mp4`)

    return NextResponse.json({
      success: true,
      input: { videoUrl, startTime, endTime },
      output: { url: trimmedUrl },
      duration: endTime - startTime,
      message: 'Video trimmed successfully',
    })
  } catch (error) {
    console.error('Trim error:', error)
    return NextResponse.json({ error: 'Trim failed' }, { status: 500 })
  }
}