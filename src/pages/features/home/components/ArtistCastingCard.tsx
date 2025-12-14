import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { UserStar } from "lucide-react";
import { memo, useState } from "react";

import 'swiper/css';

type ArtistItem = {
  name: string;
  avatar?: string;
  birth?: string | number;
}

type ArtistCastingCardProps = {
  data?: ArtistItem[];
}

interface ArtistProps {
  item: ArtistItem;
}

export default memo(function ArtistCastingCard({ data = [] }: ArtistCastingCardProps) {
  
  const globalArtists = data.map(a => ({
    ...a,
    avatar: a.avatar,
  }));

  const initialSlide = Math.floor(globalArtists.length / 2);

  const TitleSection = () => (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
        <UserStar className="w-6 h-6" />
        NGHỆ SĨ NỔI BẬT
      </h2>
      <p className="text-sm text-gray-400">
        Cơ hội diễn xuất đến từ các nhà sản xuất uy tín
      </p>
      <div className="w-10 h-[2px] bg-blue-500 mx-auto mt-2 rounded-full" />
    </div>
  );

  return (
    <div className="text-center mb-6">
      <TitleSection />

      <Swiper
        modules={[EffectCoverflow]}
        centeredSlides
        grabCursor
        slidesPerView="auto"
        initialSlide={initialSlide}
        effect="coverflow"
        coverflowEffect={{
          rotate: 40,
          depth: 200,
          modifier: 1.5,
          stretch: 0,
          slideShadows: false,
        }}
        className="mySwiper"
      >
        {globalArtists.map((item, index) => (
          <SwiperSlide key={index} className="!w-[220px]">
            <ArtistItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});


function ArtistItem({ item }: ArtistProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="p-3 text-center bg-white text-black rounded-xl shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:text-white"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
    >
      <div className="mb-3 overflow-hidden rounded-lg aspect-[3/4] bg-gray-700">
        {!isLoaded && (
          <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
        )}
        <img
          src={item.avatar}
          alt={item.name}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`object-cover w-full h-full will-change-transform transition-opacity ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <h4 className="text-sm font-semibold">{item.name}</h4>
      {item.birth && (
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Sinh năm {item.birth}
        </p>
      )}
    </motion.div>
  );
}
