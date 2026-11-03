import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactBlock as ContactBlockProps } from '@/lib/optimizely/types/generated'

export default function ContactBlock({
  title,
  description,
}: ContactBlockProps) {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-[#050917] via-black to-[#0b1745] px-4 py-16 text-white lg:px-8">
      <Card className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#080b1b] text-white shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-blue-950/40">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-white"
            data-epi-edit="title"
          >
            {title}
          </CardTitle>
          <p data-epi-edit="description" className="text-gray-300">
            {description}
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Input
              className="border-white/15 bg-white/[0.04] text-white placeholder:text-gray-500 focus-visible:ring-sky-400"
              placeholder="Name"
            />
            <Input
              className="border-white/15 bg-white/[0.04] text-white placeholder:text-gray-500 focus-visible:ring-sky-400"
              placeholder="Email"
              type="email"
            />
            <Textarea
              className="border-white/15 bg-white/[0.04] text-white placeholder:text-gray-500 focus-visible:ring-sky-400"
              placeholder="Message"
            />
            <Button className="w-full bg-blue-600 font-semibold text-white shadow-lg shadow-blue-900/30 transition-colors hover:bg-blue-700">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
