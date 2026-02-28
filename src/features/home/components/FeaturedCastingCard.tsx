import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Button, Tag } from "antd";
import { Flame } from "lucide-react";
import { memo, useState } from "react";

type CastingItem = {
  title: string;
  role: string;
  age: string;
  deadline: string;
  action: string;
  image: string;
  type?: string;
  featured?: boolean;
};

type FeaturedCastingProps = {
  data?: CastingItem[];
};

interface CastingProps {
  item: CastingItem;
}

export default memo(function FeaturedCastingCard({ data = [] }: FeaturedCastingProps) {
  
  const useSwiper = data.length > 5;
  const initialSlide = Math.floor(data.length / 2);

  const TitleSection = () => (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
        <Flame className="w-6 h-6" />
        CASTING NỔI BẬT
      </h2>
      <p className="text-sm text-gray-400">
        Cơ hội diễn xuất đến từ các nhà sản xuất uy tín
      </p>
      <div className="w-10 h-[2px] bg-blue-500 mx-auto mt-2 rounded-full" />
    </div>
  );

  if (!useSwiper) {
    return (
      <div className="max-w-[1200px] mx-auto px-4">
        <TitleSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <CastingCard key={index} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden py-4">
      <TitleSection />
      <Swiper
        slidesPerView="auto"
        centeredSlides
        spaceBetween={20}
        grabCursor
        style={{ padding: "0 40px" }}
        initialSlide={initialSlide > 0 ? initialSlide - 1 : 0}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "300px" }}>
            <CastingCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

const CastingCard = memo(function CastingCard({ item }: CastingProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="rounded-2xl bg-[#1f2233] shadow-md overflow-hidden border border-transparent hover:border-blue-500 transition">
      <div className="relative h-56 overflow-hidden bg-gray-800">
        {/* Skeleton loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}

        <motion.img
          whileHover={{ scale: 1.05 }}
          onLoad={() => setIsImageLoaded(true)}
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`object-cover w-full h-full rounded-t-2xl will-change-transform transition-opacity ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <Tag className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-blue-600/80 text-white">
          {item.type || "Casting"}
        </Tag>

        {item.featured && (
          <Tag className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-orange-500/90 text-white">
            Hot
          </Tag>
        )}
      </div>

      <div className="p-4 text-white">
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <p className="text-sm text-gray-300">🎭 Vai: {item.role}</p>
        <p className="text-sm text-gray-300">🎂 Tuổi: {item.age}</p>
        <p className="text-sm text-red-400 mt-1">⏳ Hạn: {item.deadline}</p>
        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700 mt-4 border-0 w-full rounded-full text-sm font-medium"
        >
          {item.action}
        </Button>
      </div>
    </div>
  );
});
