'use client'
import {
  TestimonialsBlock as TestimonialsBlockProps,
  TestimonialItemBlock,
} from '@/lib/optimizely/types/generated'
import { castContent } from '@/lib/optimizely/types/typeUtils'
import { FaqItem } from './faqItem';


export default function TestimonialsBlock({
  title,
  testimonials,
}: TestimonialsBlockProps) {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black px-4 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-2xl font-black text-white md:text-3xl">{title}</h2>
      <div className="space-y-4">
        {testimonials?.map((faq, index) => {
          const testimonialItem = faq ? { ...faq, __typename: 'TestimonialItemBlock' } : null;
          const testimonial = castContent<TestimonialItemBlock>(testimonialItem, 'TestimonialItemBlock');
          if (!testimonial) return null;
          const answer = testimonial?.content?.replace('{zip}', '90100');
          return (
            <FaqItem key={index} question={testimonial?.fullName ?? ''} answer={answer ?? ''} />
          )
      })}
      </div>
      </div>
    </section>
  )
}
 