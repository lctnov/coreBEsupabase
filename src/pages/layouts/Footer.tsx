import { Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 px-6 py-14 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About */}
<div>
  <h3 className="text-xl font-semibold text-blue-600 tracking-tight">
    CAST-V
  </h3>

  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed max-w-xs">
    Nền tảng casting & kết nối diễn viên – đạo diễn – nhà tuyển dụng.
  </p>

  {/* Social Icons */}
  <div className="flex items-center gap-3 mt-4">
    <a
      href="https://facebook.com/castv"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-blue-600 transition-colors"
    >
      <Facebook size={18} />
    </a>

    <a
      href="https://zalo.me/castv"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-blue-600 transition-colors"
    >
      <MessageCircle size={18} />
    </a>

    <a
      href="https://twitter.com/castv"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-blue-600 transition-colors"
    >
      <Twitter size={18} />
    </a>

    <a
      href="https://linkedin.com/company/castv"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-blue-600 transition-colors"
    >
      <Linkedin size={18} />
    </a>
  </div>
</div>


        {/* Menu */}
        <div>
    <h4 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 mb-4">
      Danh mục
    </h4>

  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
    <li>
      <Link
        href="/created/ActorCastingInfor"
        className="hover:text-blue-600 transition-colors"
      >
        Diễn viên
      </Link>
    </li>

    <li>
      <Link
        href="/created/DirectorCastingInfor"
        className="hover:text-blue-600 transition-colors"
      >
        Nhà tuyển dụng
      </Link>
    </li>

    <li>
      <Link
        href="/created/MoreCastingInfor"
        className="hover:text-blue-600 transition-colors"
      >
        Casting
      </Link>
    </li>
  </ul>
</div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 mb-4">
            Hỗ trợ
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Trung tâm trợ giúp</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Bảo mật</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Điều khoản</li>
          </ul>
        </div>

        {/* Contact + Map */}
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 mb-4">
            Liên hệ
          </h4>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Email: <span className="font-medium text-gray-900 dark:text-gray-300">contact@castv.vn</span></p>
            <p>Hotline: <span className="font-medium">(+84) 912 345 678</span></p>
            <p>Địa chỉ: <span className="font-medium">123 Nguyễn Huệ, Q.1, TP.HCM</span></p>
          </div>
          
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-10 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          © 2025 CAST-V. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
}
