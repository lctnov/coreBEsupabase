import React, { useState } from "react";
import { Input, Select, Button, Checkbox, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { trpc } from "@/utils/trpc";
import axios from "axios";
import UploadCastingFile from "@/components/UploadCastingFile";
/**
 * PostCastingPage.tsx
 * Trang: ĐĂNG CASTING (Dành cho nhà tuyển)
 */

const { TextArea } = Input;
const { Option } = Select;

const Header: React.FC = () => (
  <header className="w-full bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">CAST-V</div>
      <nav className="flex items-center gap-4">
        <a href="/" className="text-sm">Trang chủ</a>
        <a href="/casting-list" className="text-sm">Casting</a>
        <a href="/auth/login" className="text-sm text-black dark:text-white">Đăng nhập</a>
      </nav>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="mt-12 border-t bg-white dark:bg-gray-900 py-8">
    <div className="max-w-7xl mx-auto px-4 text-sm text-gray-700 dark:text-gray-300">
      © 2025 CAST-V — All rights reserved.
    </div>
  </footer>
);

// sample top recruiters (by flow)
const topRecruiters = [
  { id: 1, name: "Công ty Sản xuất ABC", flow: "12k lượt" },
  { id: 2, name: "Agency XYZ", flow: "8.5k lượt" },
  { id: 3, name: "Đạo diễn QW", flow: "6.3k lượt" },
];

export default function PostCastingPage() {
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("Phim");
  const [role, setRole] = useState("Nữ chính");
  const [ageRange, setAgeRange] = useState("18-25");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [filesUploaded, setFilesUploaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // chỉ demo: console log
    console.log({ title, projectType, role, ageRange, salary, deadline, location, desc, isPublic });
    alert("Casting đã được gửi (demo). Bạn cần hook API để lưu thực tế.");
  };

  
  console.log('filesUploaded', filesUploaded);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">📢 ĐĂNG CASTING MỚI</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700 space-y-6">
          <div>
            <label className="font-semibold">Tiêu đề:</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="VD: Tìm diễn viên nữ chính 20–25 tuổi" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Loại hình:</label>
              <Select value={projectType} onChange={(v) => setProjectType(v)} className="w-full">
                <Option value="Phim">Phim</Option>
                <Option value="Quảng cáo">Quảng cáo</Option>
                <Option value="MV">MV</Option>
                <Option value="Sân khấu">Sân khấu</Option>
              </Select>
            </div>

            <div>
              <label className="font-semibold">Dự án:</label>
              <Input placeholder="Tên dự án (nếu có)" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold">Vai diễn:</label>
              <Select value={role} onChange={(v) => setRole(v)} className="w-full">
                <Option value="Nữ chính">Nữ chính</Option>
                <Option value="Nam chính">Nam chính</Option>
                <Option value="Vai phụ">Vai phụ</Option>
              </Select>
            </div>

            <div>
              <label className="font-semibold">Tuổi:</label>
              <Select value={ageRange} onChange={(v) => setAgeRange(v)} className="w-full">
                <Option value="18-25">18-25</Option>
                <Option value="20-30">20-30</Option>
                <Option value="30-40">30-40</Option>
              </Select>
            </div>

            <div>
              <label className="font-semibold">Lương / Thù lao:</label>
              <Input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="VD: 15.000.000 VND" />
            </div>
          </div>

          <div>
            <label className="font-semibold">Mô tả vai:</label>
            <TextArea rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Mô tả chi tiết yêu cầu nhân vật..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold">Hạn nộp:</label>
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">Địa điểm quay:</label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="VD: TP.HCM" />
            </div>
            <div>
              <label className="font-semibold">Yêu cầu hồ sơ:</label>
              <div className="mt-2 text-sm">Headshot, Reel, CV</div>
            </div>
          </div>

          <div>
            <label className="font-semibold">Đính kèm hình ảnh / brief</label>
            <UploadCastingFile castingId="new" onUploaded={() => setFilesUploaded(true)} />

              {filesUploaded && (
                <Button type="primary">Tiếp tục</Button>
              )}
          </div>

          <div className="flex items-center gap-4">
            <Checkbox checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>Công khai</Checkbox>
            <Checkbox checked={!isPublic} onChange={(e) => setIsPublic(!e.target.checked)}>Ẩn danh</Checkbox>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <strong>Hiển thị top nhà tuyển</strong>
              <div className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {topRecruiters.map(r => (
                  <div key={r.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <div>{r.name}</div>
                    <div className="text-xs text-gray-500">{r.flow}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-[220px]">
              <Button type="primary" htmlType="submit" size="large" className="w-full bg-blue-600 border-0">ĐĂNG CASTING</Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
