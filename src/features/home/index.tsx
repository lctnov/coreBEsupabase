import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import FeaturedCastingCard from "@/features/home/components/FeaturedCastingCard";
import ArtistCastingCard from "@/features/home/components/ArtistCastingCard";
import CalendarCastingCard from "@/features/home/components/CalendarCastingCard";
import ActorCastingCard from "@/features/home/components/ActorCastingCard";
import { memo, lazy, Suspense } from "react";
import {
  vnBroadcasts,
  globalBroadcasts,
  featuredCastings,
  actorRecruiterData,
  globalArtists as _artists,
} from "@/data/broadcasts";

import { CalendarDays, FileType } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";

// Lazy load PricingSection
const PricingSection = lazy(() => import("@/features/home/components/PricingSection"));

export default memo(function HomePage() {
  
  const CalendarTitle = () => (
		<div className="text-center mb-6">
		<h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
			<CalendarDays className="w-6 h-6" />
			LỊCH PHÁT SÓNG
		</h2>
		<p className="text-sm text-gray-400">
			Cơ hội diễn xuất đến từ các nhà sản xuất uy tín
		</p>
		<div className="w-10 h-[2px] bg-blue-500 mx-auto mt-2 rounded-full" />
		</div>
	);

  const ActorTitle = () => (
		<div className="text-center mb-6">
		<h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
			<FileType className="w-6 h-6" />
			HỒ SƠ
		</h2>
		<p className="text-sm text-gray-400">
			Cơ hội diễn xuất đến từ các nhà sản xuất uy tín
		</p>
		<div className="w-10 h-[2px] bg-blue-500 mx-auto mt-2 rounded-full" />
		</div>
	);

  return (
    <div className="min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
      <Header />

      {/* CASTING NỔI BẬT */}
     <section className="w-full overflow-hidden px-6 py-10 lg:py-12">
      <FeaturedCastingCard data={featuredCastings || []} />
    </section>


      {/* LỊCH PHÁT SÓNG (2 CỘT) */}
      <section className="px-6 py-10 lg:py-12">
        <CalendarTitle />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* VN */}
          <CalendarCastingCard
            title="🇻🇳 Lịch phát sóng • Việt Nam"
            items={vnBroadcasts}
          />

          {/* Global */}
          <CalendarCastingCard
            title="🌍 Lịch phát sóng • Quốc tế"
            items={globalBroadcasts}
          />
        </div>
      </section>

      {/* NGHỆ SĨ NỔI BẬT */}
      <section className="px-6 py-10 lg:py-12">
        <ArtistCastingCard data={_artists || []} />
      </section>

      {/* ACTOR / RECRUITER */}
      <section className="px-6 py-10 lg:py-12">
        <ActorTitle />
        <ActorCastingCard data={actorRecruiterData} />
      </section>

      <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse rounded-2xl" />}>
        <PricingSection />
      </Suspense>
      
      <Footer />
    </div>
  );
});