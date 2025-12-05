import { useState } from "react";
import { Select, Button, Card } from "antd";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { HoverCard } from "@/components/HoverCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "swiper/css";
import "swiper/css/effect-coverflow";

import {
  vnBroadcasts,
  globalBroadcasts,
  featuredCastings,
  globalArtists as _artists,
  
} from "@/data/broadcasts";


export default function HomePage() {

  // fake fallback avatar
  const placeholderAvatar = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&q=80";

  

  const globalArtists = _artists.map((a) => ({
    ...a,
    avatar: a.avatar || placeholderAvatar,
  }));

  const initialSlide = Math.floor(globalArtists.length / 2);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      
    <Header />

      {/* CASTING NỔI BẬT */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">
          🔥 CASTING NỔI BẬT
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCastings.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white text-black rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <HoverCard>
                <img src={item.image} className="w-full h-56 object-cover" />
              </HoverCard>

              <div className="p-5">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p>Vai: {item.role}</p>
                <p>Tuổi: {item.age}</p>
                <p>Hạn: {item.deadline}</p>

                <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
                  {item.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LỊCH PHÁT SÓNG (2 CỘT) */}
      <section className="px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* VN */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
              🇻🇳 Lịch phát sóng • Việt Nam
            </h3>
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {vnBroadcasts.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-3 rounded-xl bg-white text-black shadow-sm hover:shadow-md transition"
                >
                  <video src={item.video} className="w-44 h-28 object-cover rounded-md" controls />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
              🌍 Lịch phát sóng • Quốc tế
            </h3>
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {globalBroadcasts.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-3 rounded-xl bg-white text-black shadow-sm hover:shadow-md transition"
                >
                  <video src={item.video} className="w-44 h-28 object-cover rounded-md" controls />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NGHỆ SĨ NỔI BẬT */}
      <section className="px-6 py-10 lg:py-12">
        <h3 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          🌟 NGHỆ SĨ NỔI BẬT
        </h3>

        <Swiper
  modules={[EffectCoverflow]}
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  slidesPerView="auto"
        initialSlide={Math.floor(globalArtists.length / 2)}

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
      <motion.div
        className="text-center bg-white text-black p-3 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-3">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-semibold text-sm">{item.name}</h4>
        <p className="text-xs text-gray-600">Sinh năm {item.birth}</p>
      </motion.div>
    </SwiperSlide>
  ))}
</Swiper>

      </section>

      {/* ACTOR / RECRUITER */}
      <section className="px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-lg p-6 text-center">
            <h4 className="font-bold mb-4">👥 DÀNH CHO DIỄN VIÊN</h4>

            <ul className="mb-4 space-y-2 text-gray-700">
              <li>• Tạo hồ sơ miễn phí</li>
              <li>• Upload headshot & reel</li>
              <li>• Nhận thông báo casting mới</li>
            </ul>

            <Button type="primary" className="bg-blue-600 border-0">
              BẮT ĐẦU NGAY →
            </Button>
          </Card>

          <Card className="rounded-2xl shadow-lg p-6 text-center">
            <h4 className="font-bold mb-4">👥 DÀNH CHO NHÀ TUYỂN</h4>

            <ul className="mb-4 space-y-2 text-gray-700">
              <li>• Đăng casting nhanh chóng</li>
              <li>• Tiếp cận 50.000+ diễn viên</li>
              <li>• Quản lý hồ sơ ứng viên</li>
            </ul>

            <Button type="primary" className="bg-blue-600 border-0">
              ĐĂNG CASTING →
            </Button>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
