import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  remainSlots: number;
};

const initialForm = {
  movieTitle: "",
  roleName: "",
  type: "Phim", // Loại: Phim, Quảng cáo, MV, Hài, Marketing
  location: "",
  ageRange: "",
  salary: "",
  deadline: "",
  requirements: "",
  education: "",
  talents: "",
  languages: "",
  description: "",
  posterFile: null as File | null,
  posterPreview: "",
};

export function RecruiterCastingInfor({ open, onClose, remainSlots }: Props) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) setForm(initialForm);
  }, [open]);

  const update = (key: keyof typeof form, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handlePosterChange = (file: File | null) => {
    if (!file) return;

    update("posterFile", file);
    update("posterPreview", URL.createObjectURL(file));
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
                    Tạo Casting tuyển diễn viên
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Bạn còn <b>{remainSlots}</b> lượt đăng miễn phí
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
              {/* POSTER */}
              <Section title="Ảnh tựa phim">
                <PosterUpload
                  preview={form.posterPreview}
                  onChange={handlePosterChange}
                />
              </Section>

              <Section title="Thông tin vai diễn">
                <Grid>
				  <Input
                    label="Loại casting"
                    value={form.type}
                    onChange={(e: any) => update("type", e.target.value)}
                    placeholder="Phim/TVC/MV/Hài/Marketing"
                  />
                  <Input
                    label="Tựa phim / Dự án"
                    value={form.movieTitle}
                    onChange={(e: any) => update("movieTitle", e.target.value)}
                    placeholder="Phim điện ảnh / TVC / Web Drama"
                  />
                  <Input
                    label="Vai diễn"
                    value={form.roleName}
                    onChange={(e: any) => update("roleName", e.target.value)}
                    placeholder="Vai chính / phụ / quần chúng"
                  />
                  <Input
                    label="Độ tuổi"
                    value={form.ageRange}
                    onChange={(e: any) => update("ageRange", e.target.value)}
                    placeholder="18 – 25"
                  />
                  <Input
                    label="Lương / Cát-xê"
                    value={form.salary}
                    onChange={(e: any) => update("salary", e.target.value)}
                    placeholder="5.000.000 – 10.000.000 VNĐ"
                  />
                  <Input
                    label="Thời hạn nhận hồ sơ"
                    type="date"
                    value={form.deadline}
                    onChange={(e: any) => update("deadline", e.target.value)}
                  />
				  <Input
                    label="Địa điểm"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="Hà Nội, TP.HCM..."
                  />
                </Grid>
              </Section>
			

			
              <Section title="Yêu cầu tuyển dụng">
                <Textarea
                  label="Yêu cầu"
                  value={form.requirements}
                  onChange={(e: any) => update("requirements", e.target.value)}
                  placeholder="Ngoại hình, thần thái, kinh nghiệm..."
                />

                <Grid>
                  <Input
                    label="Trình độ (nếu có)"
                    value={form.education}
                    onChange={(e: any) => update("education", e.target.value)}
                  />
                  <Input
                    label="Năng khiếu (nếu có)"
                    value={form.talents}
                    onChange={(e: any) => update("talents", e.target.value)}
                  />
                  <Input
                    label="Ngoại ngữ (nếu có)"
                    value={form.languages}
                    onChange={(e: any) => update("languages", e.target.value)}
                  />
                </Grid>

                <Textarea
                  label="Nội dung tuyển dụng"
                  value={form.description}
                  onChange={(e: any) => update("description", e.target.value)}
                  placeholder="Mô tả dự án, lịch quay, quyền lợi..."
                />
              </Section>
            </div>

            {/* FOOTER */}
            <footer className="px-6 py-4 border-t dark:border-gray-800 flex gap-3">
              <Button variant="ghost" onClick={onClose}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  /**
                   * SUBMIT FLOW (sắp tới):
                   * 1. Upload posterFile → S3
                   * 2. Nhận posterKey
                   * 3. Save recruiter_castings
                   */
                  console.log("SUBMIT:", form);
                  onClose();
                }}
              >
                Đăng Casting
              </Button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===== UI ===== */

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
      <label className="text-xs font-medium text-gray-600">{label}</label>
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
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <textarea
        {...props}
        className="w-full rounded-lg border border-gray-300
                   px-3 py-2 text-sm min-h-[120px]
                   focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function PosterUpload({
  preview,
  onChange,
}: {
  preview: string;
  onChange: (f: File | null) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-2">
        Ảnh đại diện dự án
      </label>

      <label className="relative flex items-center justify-center
                        border-2 border-dashed rounded-xl
                        h-48 cursor-pointer hover:border-blue-500 transition">
        {preview ? (
          <img
            src={preview}
            alt="Poster Preview"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        ) : (
          <span className="text-sm text-gray-500">
            Bấm để upload ảnh (JPG / PNG)
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            onChange(e.target.files ? e.target.files[0] : null)
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
          : "border border-gray-300 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}
