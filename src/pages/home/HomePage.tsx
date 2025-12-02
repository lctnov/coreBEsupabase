import { useState } from "react";
import { Input, Select, Button, Card } from "antd";
import { SearchOutlined, NotificationOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import {
  vnBroadcasts,
  globalBroadcasts,
  globalArtists as _artists,
} from "@/data/broadcasts";

const { Option } = Select;

export default function HomePage() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  // fake fallback avatar
  const placeholderAvatar =
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&q=80";

  const globalArtists = _artists.map((a) => ({
    ...a,
    avatar: a.avatar || placeholderAvatar,
  }));

  const featuredCastings = [
    {
      title: 'PHIM "HÀ NỘI MÙA ĐÔNG"',
      role: "Nữ chính",
      age: "18 - 25 tuổi",
      deadline: "15/12",
      action: "NỘP HỒ SƠ",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
    },
    {
      title: "QUẢNG CÁO SỮA XYZ",
      role: "Gia đình",
      age: "30 - 45 tuổi",
      deadline: "10/12",
      action: "XEM CHI TIẾT",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    },
    {
      title: 'MV "ANH ĐÃ SAI"',
      role: "Bạn gái",
      age: "20 - 28 tuổi",
      deadline: "08/12",
      action: "APPLY NGAY",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
  ];

  const HoverCard = ({ children }) => (
    <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-10"></div>

      <div className="group-hover:scale-110 transition-transform duration-700">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
          ▶
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">CAST-V</div>
        <div className="space-x-4">
          <Button type="link" href="/auth/login" className="text-blue-600 dark:text-blue-400">Đăng nhập</Button>
          <Button type="link" href="/auth/register" className="text-blue-600 dark:text-blue-400">Đăng ký</Button>
        </div>
      </header>

      {/* HERO full-screen */}
<section className="relative w-full h-[100vh] md:h-[90vh] overflow-hidden">

  {/* Background */}
  <img
    src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc"
    alt="banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20"></div>

  {/* MAIN CONTENT */}
  <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
    
    {/* TITLE */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl leading-tight max-w-4xl">
      CAST-V — Kết nối Nghệ sĩ & Casting
    </h1>

    <p className="mt-4 text-sm sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
      Tìm casting nhanh • Xây dựng hồ sơ chuyên nghiệp • Kết nối đạo diễn & nhà sản xuất
    </p>

    {/* SEARCH CARD (FLOATING UI) */}
    <div className="mt-10 w-full max-w-5xl">
      <div className="
        bg-white/95 dark:bg-white/10 
        backdrop-blur-xl 
        rounded-2xl shadow-2xl 
        border border-white/40 dark:border-white/20 
        p-6
      ">
        
        <h2 className="text-center text-xl font-semibold mb-4 text-black dark:text-white">
          🎬 TÌM KIẾM CASTING NHANH
        </h2>

        <form className="flex flex-col md:flex-row gap-3 items-center">
  <Input
    size="large"
    placeholder="Tìm kiếm vai diễn..."
    prefix={<SearchOutlined />}
    className="rounded-xl flex-1 min-w-0"
  />

  <Select size="large" placeholder="Tìm theo" className="rounded-xl flex-1 min-w-0" onChange={setType}>
    <Option value="Phim">Phim</Option>
    <Option value="Quảng cáo">Quảng cáo</Option>
    <Option value="MV">MV</Option>
    <Option value="Sân khấu">Sân khấu</Option>
  </Select>

  <Select size="large" placeholder="Địa điểm" className="rounded-xl flex-1 min-w-0" onChange={setLocation}>
    <Option value="TP.HCM">TP.HCM</Option>
    <Option value="Hà Nội">Hà Nội</Option>
    <Option value="Đà Nẵng">Đà Nẵng</Option>
    <Option value="Toàn quốc">Toàn quốc</Option>
  </Select>

  <Select size="large" placeholder="Loại vai" className="rounded-xl flex-1 min-w-0" onChange={setRole}>
    <Option value="Chính">Chính</Option>
    <Option value="Phụ">Phụ</Option>
    <Option value="Quần chúng">Quần chúng</Option>
    <Option value="Người mẫu">Người mẫu</Option>
  </Select>

  <Button
    size="large"
    type="primary"
    className="rounded-xl bg-blue-600 hover:bg-blue-700 border-0 flex items-center justify-center"
    icon={<SearchOutlined />}
  >
    Tìm kiếm
  </Button>
</form>


        {/* Info line */}
        <div className="mt-3 flex justify-center items-center gap-2 text-sm text-black dark:text-white">
          <NotificationOutlined /> 3,248 casting đang mở • Cập nhật 2 phút trước
        </div>

      </div>
    </div>

  </div>

</section>


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
          spaceBetween={18}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {globalArtists.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="text-center bg-white text-black p-3 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-3">
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
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
      <footer className="mt-14 px-6 py-10 border-t bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-blue-600">CAST-V</h3>
            <p className="text-sm text-gray-700">
              Nền tảng casting & kết nối diễn viên – đạo diễn – nhà tuyển dụng.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Danh mục</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Diễn viên</li>
              <li>Nhà tuyển dụng</li>
              <li>Casting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Hỗ trợ</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Trung tâm trợ giúp</li>
              <li>Bảo mật</li>
              <li>Điều khoản</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Liên hệ</h4>
            <p className="text-sm text-gray-700">contact@castv.vn</p>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-600">
          © 2025 CAST-V. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
