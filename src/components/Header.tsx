
import { useState } from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined, NotificationOutlined } from "@ant-design/icons";
import "swiper/css";
const { Option } = Select;

export default function Header() {
	const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  return (
	<>
	{/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">CAST-V</div>
        <div className="space-x-4">
          <Button type="link" href="/auth/login" className="text-blue-600 dark:text-blue-400">Đăng nhập</Button>
          <Button type="link" href="/auth/register" className="text-blue-600 dark:text-blue-400">Đăng ký</Button>
        </div>
      </header>

      {/* HERO full-screen */}
<section className="relative w-full min-h-screen md:h-[90vh] overflow-hidden">

  {/* Background */}
  <img
    src="/images/set-featuring-2.jpg"
    alt="banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20"></div>

  {/* MAIN CONTENT */}
  <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
    
    {/* TITLE */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl leading-tight max-w-4xl">
      Kết nối Nghệ sĩ & Casting
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
	</>
	
  );
}