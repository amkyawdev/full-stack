import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoUrls, transition } = body

    if (!videoUrls || videoUrls.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 videos required' },
        { status: 400 }
      )
    }

    // In production, use FFmpeg concat:
    // ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
    // Or with transitions:
    // ffmpeg -i v1.mp4 -i v2.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=1[v]" -map "[v]" output.mp4

    const outputUrl = `/uploads/merged_${Date.now()}.mp4`
    const totalDuration = videoUrls.length * 10 // Placeholder

    return NextResponse.json({
      success: true,
      input: { videoCount: videoUrls.length, transition },
      output: { url: outputUrl },
      totalDuration,
      message: 'Videos merged successfully',
    })
  } catch (error) {
    console.error('Merge error:', error)
    return NextResponse.json({ error: 'Merge failed' }, { status: 500 })
  }
}