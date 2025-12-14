import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Gender = "male" | "female" | "other";

type Props = {
  open: boolean;
  onClose: () => void;
  remainSlots: number;
};

const initialForm = {
  fullName: "",
  dob: "",
  gender: "male" as Gender,
  cmnd: "",
  phone: "",
  email: "",
  address: "",
  height: "",
  job: "",
  applyRole: "",
  note: "",
  images: [] as File[],
};

export function ActorCastingInfor({ open, onClose, remainSlots }: Props) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) setForm(initialForm);
  }, [open]);

  const update = (key: keyof typeof form, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm
                     flex items-center justify-center px-3 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-3xl bg-white dark:bg-gray-900
                       rounded-2xl shadow-xl flex flex-col max-h-[90vh]"
          >
            {/* HEADER */}
            <header className="px-6 py-4 border-b dark:border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tạo hồ sơ Casting
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Bạn còn <b>{remainSlots}</b> lượt tạo miễn phí
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-500 text-xl"
                >
                  ✕
                </button>
              </div>
            </header>

            {/* CONTENT */}
            <div className="overflow-y-auto px-6 py-6 space-y-8 text-black">
              {/* === THÔNG TIN CÁ NHÂN === */}
              <Section title="Thông tin cá nhân">
                <Grid>
                  <Input
                    label="Họ và tên"
                    value={form.fullName}
                    onChange={(e: any) => update("fullName", e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                  <Input
                    label="Ngày sinh"
                    type="date"
                    value={form.dob}
                    onChange={(e: any) => update("dob", e.target.value)}
                  />
                  <GenderToggle
                    value={form.gender}
                    onChange={(v) => update("gender", v)}
                  />
                  <Input
                    label="Số CMND / CCCD"
                    value={form.cmnd}
                    onChange={(e: any) => update("cmnd", e.target.value)}
                    placeholder="0123456789"
                  />
                  <Input
                    label="Số điện thoại"
                    value={form.phone}
                    onChange={(e: any) => update("phone", e.target.value)}
                    placeholder="090xxxxxxx"
                  />
                  <Input
                    label="Email"
                    value={form.email}
                    onChange={(e: any) => update("email", e.target.value)}
                    placeholder="email@email.com"
                  />
                  <Input
                    label="Địa chỉ"
                    value={form.address}
                    onChange={(e: any) => update("address", e.target.value)}
                    placeholder="Quận / Thành phố"
                  />
                </Grid>
              </Section>

              {/* === THÔNG TIN CASTING === */}
              <Section title="Thông tin casting">
                <Grid>
                  <Input
                    label="Chiều cao (cm)"
                    value={form.height}
                    onChange={(e: any) => update("height", e.target.value)}
                    placeholder="175"
                  />
                  <Input
                    label="Nghề nghiệp"
                    value={form.job}
                    onChange={(e: any) => update("job", e.target.value)}
                    placeholder="Diễn viên tự do"
                  />
                  <Input
                    label="Ứng tuyển vị trí"
                    value={form.applyRole}
                    onChange={(e: any) => update("applyRole", e.target.value)}
                    placeholder="Vai chính / phụ / quần chúng…"
                  />
                </Grid>

                <Textarea
                  label="Ghi chú"
                  value={form.note}
                  onChange={(e: any) => update("note", e.target.value)}
                  placeholder="Kinh nghiệm, lịch rảnh, thế mạnh..."
                />

                <Upload
                  onChange={(files) => update("images", files)}
                />
              </Section>
            </div>

            {/* FOOTER */}
            <footer className="px-6 py-4 border-t dark:border-gray-800 flex flex-col sm:flex-row gap-3">
              <Button variant="ghost" onClick={onClose}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("SUBMIT:", form);
                  onClose();
                }}
              >
                Tạo hồ sơ Casting
              </Button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===== UI HELPERS ===== */

function Section({ title, children }: any) {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Grid({ children }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300
                   px-3 py-2 text-sm
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full rounded-lg border border-gray-300
                   px-3 py-2 text-sm min-h-[110px]
                   focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Upload({ onChange }: { onChange: (f: File[]) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600">
        Hình ảnh / Portfolio
      </label>
      <label className="mt-2 flex flex-col items-center justify-center
                       border-2 border-dashed border-gray-300
                       rounded-xl h-32 cursor-pointer
                       hover:border-blue-500 transition">
        <span className="text-sm text-gray-500">
          Kéo & thả hoặc bấm để upload
        </span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) =>
            onChange(e.target.files ? Array.from(e.target.files) : [])
          }
        />
      </label>
    </div>
  );
}

function Button({ children, onClick, variant }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
        variant === "primary"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

function GenderToggle({
  value,
  onChange,
}: {
  value: "male" | "female" | "other";
  onChange: (v: "male" | "female" | "other") => void;
}) {
  const items = [
    { key: "male", label: "Nam" },
    { key: "female", label: "Nữ" },
    { key: "other", label: "Khác" },
  ] as const;

  const activeIndex = items.findIndex((i) => i.key === value);

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">
        Giới tính
      </label>

      <div className="relative flex h-10 rounded-xl bg-gray-100 border border-gray-300 p-1">
        {/* SLIDER */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 bottom-1 w-1/3 rounded-lg bg-blue-600"
          style={{ left: `${activeIndex * 33.333}%` }}
        />

        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`relative z-10 flex-1 text-sm font-medium transition
              ${
                value === item.key
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

