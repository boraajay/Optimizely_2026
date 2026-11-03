import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ProfileBlock as ProfileBlockProps } from '@/lib/optimizely/types/generated'
import { BlockBase } from '@/lib/optimizely/types/block'
import { cva } from 'class-variance-authority'

type ProfileBlockPropsV2 = ProfileBlockProps & BlockBase

const backgroundVariants = cva(
  'container mx-auto rounded-2xl border border-white/10 px-1 py-16 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-950/40',
  {
  variants: {
    colorScheme: {
      default: 'bg-[#080b1b]',
      primary: 'bg-[#0b1745]',
      secondary: 'bg-[#101d38]',
    },
  },
  defaultVariants: {
    colorScheme: 'default',
  },
  }
)

export default function ProfileBlock({
  imageSrc,
  name,
  title,
  bio,
  isFirst,
  displaySettings,
}: ProfileBlockPropsV2) {
  const colorScheme =
    displaySettings?.find((setting) => setting.key === 'colorScheme')?.value ||
    'default'

  return (
    <section className="container mx-auto bg-gradient-to-br from-[#050917] via-black to-[#0b1745] px-4 py-16 text-white">
      <Card
        className={backgroundVariants({
          colorScheme: colorScheme as 'default' | 'primary' | 'secondary',
        })}
      >
        <CardContent className="p-8">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Image
                src={imageSrc || '/placeholder.svg'}
                alt={title ?? ''}
                fill
                className="rounded-lg object-cover"
                priority={isFirst}
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold" data-epi-edit="name">
                {name}
              </h1>
              <p className="text-xl" data-epi-edit="title">
                {title}
              </p>
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold">Bio:</h2>
                <p className="leading-relaxed" data-epi-edit="bio">
                  {bio}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
