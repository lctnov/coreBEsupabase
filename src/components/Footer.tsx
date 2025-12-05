export default function Footer() {
  return (
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
		)
		};