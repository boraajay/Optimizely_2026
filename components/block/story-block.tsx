import { Card, CardContent } from '@/components/ui/card'
import { StoryBlock as StoryBlockProps } from '@/lib/optimizely/types/generated'

interface HighlightProps {
  text?: string
}

function Highlight({ text }: HighlightProps) {
  return (
    <div className="my-6 rounded-xl border border-white/10 bg-[#080b1b] p-4 text-gray-200">
      <p>{text}</p>
    </div>
  )
}

export default function StoryBlock({ story, highlights }: StoryBlockProps) {
  return (
    <section className="relative isolate container mx-auto px-4 py-16 text-white before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-gradient-to-br before:from-[#050917] before:via-black before:to-[#0b1745] before:content-['']">
      <Card className="border border-white/10 bg-[#080b1b] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-950/40">
        <CardContent className="p-8">
          <div className="mx-auto max-w-3xl">
            <p
              className="mb-8 text-xl leading-relaxed text-gray-200"
              data-epi-edit="story"
            >
              {story}
            </p>
            <div data-epi-edit="highlights">
              {highlights?.map((highlight, index) => (
                <Highlight key={index} text={highlight ?? ''} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
