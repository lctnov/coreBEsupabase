"use client";

import { useState } from "react";
import { Input, Select, Button, MenuProps, Avatar, Dropdown } from "antd";
import { SearchOutlined, NotificationOutlined } from "@ant-design/icons";
import { Tv, LogOut, User } from "lucide-react";
import { useLayoutAuth } from "./layout.context";

const { Option } = Select;

export default function Header() {
  // Search state (local – có thể tách hook sau)
  const [, setRole] = useState("");
  const [, setLocation] = useState("");
  const [, setType] = useState("");

  // Auth from Context
  const { user, logout, isLoggingOut } = useLayoutAuth();
  console.log('user', user);
  
  const displayName = user?.email ? user.email.split("@")[0] : "";

  console.log('displayName', displayName);
  
  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <User size={16} /> Profile
        </span>
      ),
    },
    {
      key: "logout",
      label: (
        <span className="flex items-center gap-2 text-red-500">
          <LogOut size={16} /> Logout
        </span>
      ),
      onClick: logout,
      disabled: isLoggingOut,
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-300 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-blue-600 rounded-xl text-white group-hover:bg-blue-700 transition">
          <Tv size={20} />
        </div>
        <span className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition">
          CAST-V
        </span>
      </a>

      {/* Right section */}
      {displayName ? (
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar
              src={user?.avatar}
              alt={displayName}
              size={36}
            >
              {!user?.avatar && displayName.charAt(0).toUpperCase()}
            </Avatar>
            <span className="font-medium text-gray-800">
              {displayName}
            </span>
          </div>
        </Dropdown>
      ) : (
        <div className="space-x-4">
          <Button
            type="link"
            href="/features/login"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Đăng nhập
          </Button>
          <Button
            type="link"
            href="/features/register"
            className="text-gray-700 hover:text-blue-600 transition font-medium px-4"
          >
            Đăng ký
          </Button>
        </div>
      )}
    </header>

  {/* HERO full-screen */}
<section className="relative w-full min-h-screen md:h-[90vh] overflow-hidden flex items-center">

  {/* Background */}
  <img
    src="/images/set-featuring-2.jpg"
    alt="banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20"></div>

  {/* MAIN CONTENT */}
  <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 text-center">

    {/* TITLE BLOCK */}
    <div className="relative flex items-center justify-center gap-3 sm:gap-4">
      <h1
        className="
          shine-text
          text-3xl sm:text-5xl md:text-6xl
          font-extrabold
          drop-shadow-xl
          leading-tight
          text-white
          max-w-3xl sm:max-w-4xl
          min-h-[40px] sm:min-h-[60px] md:min-h-[80px]
        ">
        Kết nối Nghệ sĩ & Casting
      </h1>
    </div>

    {/* Description */}
    <p className="mt-3 sm:mt-4 text-xs sm:text-lg md:text-xl text-gray-200 max-w-sm sm:max-w-xl md:max-w-2xl mx-auto">
      <i>Tìm casting nhanh • Xây dựng hồ sơ chuyên nghiệp • Kết nối đạo diễn & nhà sản xuất</i>
    </p>

    {/* SEARCH CARD */}
    <div className="mt-8 sm:mt-10 w-full max-w-6xl">
      <div
        className="
          bg-white/95 dark:bg-white/10
          backdrop-blur-xl
          rounded-2xl shadow-2xl
          border border-white/40 dark:border-white/20
          p-4 sm:p-6
        ">

        <h2 className="text-center text-base sm:text-xl font-semibold mb-3 sm:mb-4 text-black dark:text-white">
          🎬 TÌM KIẾM CASTING NHANH
        </h2>

        <form className="flex flex-col md:flex-row gap-2 sm:gap-3 items-center">

          {/* Input Search */}
          <Input
            size="large"
            placeholder="Tìm kiếm vai diễn..."
            prefix={<SearchOutlined />}
            className="rounded-xl flex-1 min-w-0"
          />

          {/* Column responsive to row */}
          <div className="w-full grid grid-cols-2 md:flex md:flex-1 gap-2 sm:gap-3">
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

            <Select size="large" placeholder="Loại vai" className="rounded-xl flex-1 min-w-0 col-span-2 md:col-span-1" onChange={setRole}>
              <Option value="Chính">Chính</Option>
              <Option value="Phụ">Phụ</Option>
              <Option value="Quần chúng">Quần chúng</Option>
              <Option value="Người mẫu">Người mẫu</Option>
            </Select>
          </div>

          <Button
            size="large"
            type="primary"
            className="
              rounded-xl w-full md:w-auto
              bg-blue-600 hover:bg-blue-700 border-0
              flex items-center justify-center
            "
            icon={<SearchOutlined />}
          >
            Tìm kiếm
          </Button>
        </form>

        <div className="mt-3 flex justify-center items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-black dark:text-white">
          <NotificationOutlined /> 3,248 casting đang mở • Cập nhật 2 phút trước
        </div>

      </div>
    </div>

  </div>
</section>

	</>

  );
}