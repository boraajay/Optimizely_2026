import dynamic from 'next/dynamic'
import blocksMapperFactory from '@/lib/utils/block-factory'

// Dynamically import each block
const AvailabilityBlock = dynamic(() => import('../block/availability-block'))
const ContactBlock = dynamic(() => import('../block/contact-block'))
const HeroBlock = dynamic(() => import('../block/hero-block'))
const StatusBlock = dynamic(() => import('../block/status-block'))
const LogosBlock = dynamic(() => import('../block/logos-block'))
const PortfolioGridBlock = dynamic(
  () => import('../block/portfolio-grid-block')
)
const ProfileBlock = dynamic(() => import('../block/profile-block'))
const ServicesBlock = dynamic(() => import('../block/services-block'))
const StoryBlock = dynamic(() => import('../block/story-block'))
const TestimonialsBlock = dynamic(() => import('../block/testimonials-block'))
const ImageBanner = dynamic(() => import('../block/imageBanner-block'))
const AYearOfNetflixBanner = dynamic(() => import('../block/aYearOfNetflix-block'))
const MiniPacksAvailable = dynamic(() => import('../block/miniPacks-block'))
const ProofOfGenrePack = dynamic(() => import('../block/proofGenrePack-block'))
const ConnectBlock = dynamic(() => import('../block/connect-block'))
const PackageCardsCarousel = dynamic(() => import('../block/packagesCardscarousel-block'))
const HelpSupportBlock = dynamic(() => import('../block/HelpSupport-Block'))

// Map the dynamically imported blocks
export const blocks = {
  AvailabilityBlock,
  ContactBlock,
  HeroBlock,
  StatusBlock,
  LogosBlock,
  PortfolioGridBlock,
  ProfileBlock,
  ServicesBlock,
  StoryBlock,
  TestimonialsBlock,
  ImageBanner,
  AYearOfNetflixBanner,
  MiniPacksAvailable,
  ProofOfGenrePack,
  ConnectBlock,
  PackageCardsCarousel,
  HelpSupportBlock
} as const

export default blocksMapperFactory(blocks)
 