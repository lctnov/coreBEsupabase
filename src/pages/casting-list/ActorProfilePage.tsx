"use client";

import React from "react";
import { Button } from "antd";
import { PlayCircleOutlined, DownloadOutlined, ShareAltOutlined } from "@ant-design/icons";

/**
 * ActorProfilePage.tsx
 * Trang: HỒ SƠ DIỄN VIÊN
 */

const Header: React.FC = () => (
  <header className="w-full bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">CAST-V</div>
      <nav className="flex items-center gap-4">
        <a href="/" className="text-sm">Trang chủ</a>
        <a href="/casting-list" className="text-sm">Casting</a>
        <a href="/artists" className="text-sm">Nghệ sĩ</a>
        <a href="/auth/login" className="text-sm text-black dark:text-white">Đăng nhập</a>
      </nav>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="mt-12 border-t bg-white dark:bg-gray-900 py-8">
    <div className="max-w-7xl mx-auto px-4 text-sm text-gray-700 dark:text-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold text-blue-600">CAST-V</h4>
          <p className="mt-2">Nền tảng kết nối casting & nghệ sĩ.</p>
        </div>
        <div>
          <h5 className="font-semibold">Danh mục</h5>
          <ul className="mt-2 space-y-1">
            <li>Diễn viên</li>
            <li>Nhà tuyển dụng</li>
            <li>Casting</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Hỗ trợ</h5>
          <ul className="mt-2 space-y-1">
            <li>Trợ giúp</li>
            <li>Bảo mật</li>
            <li>Điều khoản</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Liên hệ</h5>
          <p className="mt-2">contact@castv.vn</p>
        </div>
      </div>

      <p className="text-center mt-6">© 2025 CAST-V. All rights reserved.</p>
    </div>
  </footer>
);

const top3Actors = [
  { id: 1, name: "Nguyễn Thị Anh Thư", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80", rating: 4.9, reviews: 127 },
  { id: 2, name: "Trần Minh Hằng", avatar: "https://images.unsplash.com/photo-1545996124-6a75f6b2e4f7?w=600&q=80", rating: 4.8, reviews: 98 },
  { id: 3, name: "Lê Văn Nam", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&q=80", rating: 4.7, reviews: 82 },
];

export default function ActorProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Header />

      {/* Banner */}
      <section className="relative h-[36vh] md:h-[40vh] lg:h-[48vh]">
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          alt="actor banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="flex items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              alt="avatar"
              className="w-36 h-36 rounded-xl object-cover border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                NGUYỄN THỊ ANH THƯ
                <span className="text-yellow-400 text-sm font-medium">⭐ 4.9</span>
                <span className="text-sm opacity-80">(127 đánh giá)</span>
              </h2>
              <p className="mt-2 text-sm opacity-90">
                🎂 24 tuổi • 📏 1m65 • ⚖ 48kg • 👁 Mắt nâu • 💇 Tóc đen dài
              </p>
              <p className="mt-1 text-sm opacity-90">📍 TP.HCM • ✉️ anhthu.actor@gmail.com • 📱 090xxxxxxx</p>

              <div className="mt-4 flex gap-3">
                <Button icon={<PlayCircleOutlined />} size="large">Xem Demo Reel</Button>
                <Button icon={<DownloadOutlined />} size="large">Tải CV PDF</Button>
                <Button icon={<ShareAltOutlined />} size="large">Chia sẻ</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile content */}
      <main className="max-w-7xl mx-auto px-4 -mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: summary & actions */}
        <aside className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-3">Tổng quan</h3>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Họ tên:</strong> Nguyễn Thị Anh Thư</li>
            <li><strong>Tuổi:</strong> 24</li>
            <li><strong>Chiều cao:</strong> 1m65</li>
            <li><strong>Cân nặng:</strong> 48kg</li>
            <li><strong>Mắt:</strong> Mắt nâu</li>
            <li><strong>Tóc:</strong> Đen dài</li>
            <li><strong>Địa chỉ:</strong> TP.HCM</li>
            <li className="mt-2"><strong>Liên hệ:</strong> anhthu.actor@gmail.com • 090xxxxxxx</li>
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <Button type="primary" className="rounded-xl">Chỉnh sửa hồ sơ</Button>
            <Button className="rounded-xl">Tải CV PDF</Button>
            <Button className="rounded-xl">Chia sẻ hồ sơ</Button>
          </div>
        </aside>

        {/* Middle + Right: reel, experience, awards */}
        <section className="lg:col-span-2 space-y-6">
          {/* Demo Reel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3">🎞 Demo Reel</h3>
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
              {/* demo video (placeholder) */}
              <video src="" controls className="w-full h-full object-cover bg-black" />
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3">🎭 Kinh nghiệm</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li>2024: Vai phụ - Phim "Miền Ký Ức" (Đạo diễn Trần Văn)</li>
              <li>2023: Người mẫu - Quảng cáo Shopee</li>
              <li>2022: Diễn viên sân khấu - Nhà hát kịch Việt Nam</li>
            </ul>
          </div>

          {/* Awards */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3">🏆 Giải thưởng</h3>
            <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li>Giải "Nữ diễn viên triển vọng" - Liên hoan phim ngắn 2023</li>
            </ul>
          </div>

          {/* Top 3 actors (list) */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-3">Top 3 nghệ sĩ nổi bật</h3>
            <div className="space-y-3">
              {top3Actors.map((a) => (
                <div key={a.id} className="flex items-center gap-3">
                  <img src={a.avatar} alt={a.name} className="w-14 h-14 object-cover rounded-lg" />
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">⭐ {a.rating} • {a.reviews} đánh giá</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
