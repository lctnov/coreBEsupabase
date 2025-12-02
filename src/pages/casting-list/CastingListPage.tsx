"use client";

import { useState } from "react";
import {
  Input,
  Select,
  Button,
  Checkbox,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  NotificationOutlined,
  EyeOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export default function CastingListPage() {
  const [types, setTypes] = useState<string[]>(["Phim", "Quảng cáo"]);
  const [roles, setRoles] = useState<string[]>(["Vai chính", "Vai phụ"]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("TP.HCM");
  const [category, setCategory] = useState("Phim");

  // sample data (tạm)
  const castings = [
    {
      id: 1,
      kind: "[PHIM]",
      title: "MẶT TRỜI ĐỎ",
      role: "Nữ chính (22-28 tuổi)",
      location: "TP.HCM",
      deadline: "12/12/2025",
      salary: "Thương lượng",
      views: "1.2k",
      likes: 89,
    },
    {
      id: 2,
      kind: "[QC]",
      title: "SỮA TƯƠI ABC",
      role: "Mẹ trẻ (30-38 tuổi)",
      location: "Hà Nội",
      deadline: "09/12/2025",
      salary: "15 triệu",
      views: "890",
      likes: 45,
    },
    // bạn có thể map thêm
  ];

  const topMovies = new Array(10).fill(0).map((_, i) => ({
    id: i,
    title: `Phim #${i + 1}`,
    poster: `https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&q=80&w=600&h=400&fit=crop&crop=faces`,
  }));

  const topArtists = new Array(5).fill(0).map((_, i) => ({
    id: i,
    name: `Nghệ sĩ #${i + 1}`,
    avatar: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&q=80&w=600&h=800&fit=crop&crop=faces`,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      {/* HEADER (bê từ HomePage) */}
      <header className="w-full backdrop-blur-lg bg-white/80 dark:bg-black/40 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">CAST-V</div>
        <div className="flex items-center gap-4">
          <Button type="link" href="/auth/login" className="text-black dark:text-white">Đăng nhập</Button>
          <Button type="link" href="/auth/register" className="text-black dark:text-white">Đăng ký</Button>
        </div>
      </header>

      {/* BANNER */}
      <section className="relative w-full h-[36vh] md:h-[40vh] lg:h-[48vh] overflow-hidden flex items-center justify-center text-center">
        <img src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc" className="absolute inset-0 w-full h-full object-cover" alt="banner"/>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">Danh sách Casting</h1>
          <p className="mt-2 text-white/80">Tìm, lọc và nộp hồ sơ — nhanh chóng & chuyên nghiệp</p>
        </div>
      </section>

      {/* FILTER PANEL */}
      <section className="max-w-6xl mx-auto -mt-12 px-4">
        <div className="bg-white dark:bg-white/5 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5">
          {/* Summary line */}
          <div className="text-center text-sm text-gray-700 dark:text-gray-300 mb-4">
            🔍 Tìm kiếm: <strong className="mx-1">"nữ chính"</strong> | 📍 <strong className="mx-1">TP.HCM</strong> | 🎭 <strong className="mx-1">Phim điện ảnh</strong>
          </div>

          <div className="border-t border-b border-gray-100 dark:border-gray-800 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* checkbox rows */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex flex-wrap gap-3 items-center">
                  <Checkbox checked>Phim</Checkbox>
                  <Checkbox checked>Quảng cáo</Checkbox>
                  <Checkbox>MV</Checkbox>
                  <Checkbox>Sân khấu</Checkbox>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <Checkbox checked>Vai chính</Checkbox>
                  <Checkbox checked>Vai phụ</Checkbox>
                  <Checkbox>Quần chúng</Checkbox>
                </div>
              </div>

              {/* search + selects */}
              <div className="flex gap-3 items-center w-full md:w-auto">
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder='Tìm kiếm: "nữ chính"'
                  prefix={<SearchOutlined />}
                  size="middle"
                  className="rounded-lg"
                />

                <Select value={location} onChange={(v) => setLocation(v)} size="middle" className="min-w-[140px] rounded-lg">
                  <Option value="TP.HCM">TP.HCM</Option>
                  <Option value="Hà Nội">Hà Nội</Option>
                  <Option value="Đà Nẵng">Đà Nẵng</Option>
                  <Option value="Toàn quốc">Toàn quốc</Option>
                </Select>

                <Select value={category} onChange={(v) => setCategory(v)} size="middle" className="min-w-[160px] rounded-lg">
                  <Option value="Phim">Phim</Option>
                  <Option value="Quảng cáo">Quảng cáo</Option>
                  <Option value="MV">MV</Option>
                  <Option value="Sân khấu">Sân khấu</Option>
                </Select>

                <Button type="primary" className="rounded-lg bg-blue-600 border-0" icon={<SearchOutlined />}>Tìm</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASTING GRID */}
      <section className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {castings.map((c) => (
          <article key={c.id} className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow">
            <div className="flex gap-4">
              <div className="w-28 h-20 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                {/* placeholder poster */}
                <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c" alt={c.title} className="w-full h-full object-cover"/>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="text-sm opacity-80">{c.kind}</span>
                  <span>{c.title}</span>
                </h3>

                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <div>Vai: <strong>{c.role}</strong></div>
                  <div>Địa điểm: {c.location}</div>
                  <div>Hạn nộp: {c.deadline}</div>
                  <div>Lương: {c.salary}</div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1"><EyeOutlined /> {c.views}</span>
                    <span className="flex items-center gap-1"><HeartOutlined /> {c.likes}</span>
                  </div>

                  <div className="flex gap-3">
                    <Button className="rounded-lg">Xem chi tiết</Button>
                    <Button type="primary" className="rounded-lg">Nộp hồ sơ</Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* TOP PHIM */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">🎬 Top 10 phim được yêu thích</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {topMovies.map((m) => (
            <div key={m.id} className="bg-white dark:bg-white/5 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
              <img src={m.poster} alt={m.title} className="w-full h-32 object-cover" />
              <div className="p-3 text-center">
                <div className="text-sm font-medium">{m.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOP NGHỆ SĨ */}
      <section className="max-w-6xl mx-auto px-4 mt-12 mb-12">
        <h2 className="text-2xl font-bold mb-4">⭐ Nghệ sĩ được book nhiều nhất</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {topArtists.map((a) => (
            <div key={a.id} className="text-center">
              <div className="w-full h-36 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img src={a.avatar} alt={a.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-2 text-sm font-medium">{a.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (bê từ HomePage) */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-700 dark:text-gray-300">
          © 2025 CAST-V — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
