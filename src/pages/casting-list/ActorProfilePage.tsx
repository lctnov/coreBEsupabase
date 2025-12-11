import { Button } from "antd";
import Footer from "@/components/Footer";
import { Tabs } from "antd";

const top3Actors = [
  { id: 1, name: "Nguyễn Thị Anh Thư", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80", rating: 4.9, reviews: 127 },
  { id: 2, name: "Trần Minh Hằng", avatar: "https://images.unsplash.com/photo-1545996124-6a75f6b2e4f7?w=600&q=80", rating: 4.8, reviews: 98 },
  { id: 3, name: "Lê Văn Nam", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&q=80", rating: 4.7, reviews: 82 },
  { id: 4, name: "Lê Văn Tuấu", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&q=80", rating: 4.6, reviews: 72 },
];

export default function ActorProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">CAST-V</div>
        <div className="space-x-4">
          <Button type="link" href="/auth/login" className="text-blue-600 dark:text-blue-400">Đăng nhập</Button>
          <Button type="link" href="/auth/register" className="text-blue-600 dark:text-blue-400">Đăng ký</Button>
        </div>
      </header>

      {/* BANNER */}
      <section className="relative w-full h-[380px]"> <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80" className="absolute inset-0 w-full h-full object-cover" /> <div className="absolute inset-0 bg-black/50" /> <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white px-4"> <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80" className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl mx-auto mb-4" /> <h1 className="text-4xl font-bold mb-2"> Nguyễn Thị Anh Thư </h1> <p className="text-gray-200 max-w-2xl mx-auto text-sm leading-relaxed"> Diễn viên – Model • 24 tuổi • TP.HCM • 1m65 – 48kg • Tóc đen dài • Mắt nâu </p> </div> </section>


      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 mt-[40px] pb-20 relative z-30">


        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-fit sticky top-32">

            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              📌 Hồ sơ cá nhân
            </h3>

            <div className="space-y-2.5 text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed">
              <p><b>👤 Họ tên:</b> Nguyễn Thị Anh Thư</p>
              <p><b>🎂 Tuổi:</b> 24</p>
              <p><b>📏 Chiều cao:</b> 1m65</p>
              <p><b>⚖ Cân nặng:</b> 48kg</p>
              <p><b>👁 Mắt:</b> Nâu</p>
              <p><b>💇 Tóc:</b> Đen dài</p>
              <p><b>📍 Địa chỉ:</b> TP.HCM</p>
              <p><b>✉ Email:</b> anhthu.actor@gmail.com</p>
              <p><b>📱 SĐT:</b> 090xxxxxxx</p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button type="primary" size="large" className="rounded-xl w-full">Chỉnh sửa hồ sơ</Button>
              <Button size="large" className="rounded-xl w-full">Tải CV PDF</Button>
              <Button size="large" className="rounded-xl w-full">Chia sẻ hồ sơ</Button>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="lg:col-span-7 space-y-8">

            {/* DEMO REEL */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">🎞 Demo Reel</h3>
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <video src="" controls className="w-full h-full object-cover" />
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">🎭 Kinh nghiệm diễn xuất</h3>

              <div className="space-y-4 text-[15px] text-gray-700 dark:text-gray-300">
                <div>
                  <div className="font-medium">2024</div>
                  <div>Vai phụ — Phim &quot;Miền Ký Ức&quot;</div>
                </div>
                <div>
                  <div className="font-medium">2023</div>
                  <div>Người mẫu — Quảng cáo Shopee</div>
                </div>
                <div>
                  <div className="font-medium">2022</div>
                  <div>Diễn viên sân khấu — Nhà hát kịch Việt Nam</div>
                </div>
              </div>
            </div>

            {/* AWARDS */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">🏆 Giải thưởng</h3>
              <ul className="text-[15px] space-y-2 text-gray-700 dark:text-gray-300">
                <li>Nữ diễn viên triển vọng — Liên hoan phim ngắn 2023</li>
              </ul>
            </div>

            {/* TOP ACTORS */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">⭐ Top nghệ sĩ nổi bật</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {top3Actors.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl">
                    <img src={a.avatar} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-sm opacity-80">⭐ {a.rating} • {a.reviews} đánh giá</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* PORTFOLIO TABS */}
<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">

  <h3 className="text-xl font-semibold mb-4">📂 Portfolio</h3>

  <Tabs
    defaultActiveKey="1"
    className="portfolio-tabs"
    items={[
      {
        key: "1",
        label: "🎞 Reel",
        children: (
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <video
              src="https://filesamples.com/samples/video/mp4/sample_640x360.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>
        ),
      },
      {
        key: "2",
        label: "📸 Photos",
        children: (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full aspect-square rounded-xl overflow-hidden">
                <img
                  src={`https://source.unsplash.com/random/800x800?portrait&sig=${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        ),
      },
      {
        key: "3",
        label: "🎬 Credits",
        children: (
          <div className="space-y-4 text-[15px] text-gray-700 dark:text-gray-300">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
              <div className="font-semibold">Miền Ký Ức (2024)</div>
              <div>Vai phụ — Đạo diễn Trần Minh Hoàng</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
              <div className="font-semibold">Shopee TVC (2023)</div>
              <div>Người mẫu chính — Production Shopee Vietnam</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
              <div className="font-semibold">Nhà hát Kịch VN (2022)</div>
              <div>Diễn viên sân khấu — Vai phụ</div>
            </div>
          </div>
        ),
      },
    ]}
  />
</div>


{/* GALLERY 3×4 */}
<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
  <h3 className="text-xl font-semibold mb-4">📷 Gallery 3×4 (Casting International)</h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {[
      "full body",
      "close up",
      "side",
      "smile",
      "portrait",
      "acting",
      "beauty",
      "fashion",
      "outdoor",
      "studio",
      "natural",
      "profile",
    ].map((tag, i) => (
      <div key={i} className="rounded-xl overflow-hidden shadow-md bg-gray-900">
        <img
          src={`https://source.unsplash.com/random/1000x1000?${tag}&sig=${i}`}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
        />
      </div>
    ))}
  </div>
</div>


          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
