import { Card, CardContent } from '@/components/ui/card'
import { AvailabilityBlock as AvailabilityBlockProps } from '@/lib/optimizely/types/generated'

export default function AvailabilityBlock({
  availability,
  projectTypes,
}: AvailabilityBlockProps) {
  return (
    <section className="relative isolate container mx-auto px-4 py-16 text-white before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-gradient-to-br before:from-[#050917] before:via-black before:to-[#0b1745] before:content-['']">
      <Card className="border border-white/10 bg-[#080b1b] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-950/40">
        <CardContent className="p-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <p
              className="leading-relaxed text-gray-200"
              data-epi-edit="availability"
            >
              {availability}
            </p>
            <div>
              <p className="leading-relaxed text-gray-200">
                Projects include:
              </p>
              <ul
                className="mt-2 list-inside list-disc space-y-1"
                data-epi-edit="projectTypes"
              >
                {projectTypes?.map((type, index) => (
                  <li key={index} className="text-gray-200">
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
