import { motion, AnimatePresence } from "framer-motion";
import type { ActorCastingInforProps } from "../actorfrom/actor-form.type";
import { useActorFormVM } from "../actorfrom/actor-form.hook";
import {
  Section,
  Grid,
  Input,
  Textarea,
  Upload,
  Button,
  GenderToggle,
} from "../actorfrom/actor-form.function";

export function ActorCastingInfor({ open, onClose, remainSlots }: ActorCastingInforProps) {
  const { form, updateForm, submitForm } = useActorFormVM({ open, onClose });

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
                    onChange={(e: any) => updateForm("fullName", e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                  <Input
                    label="Ngày sinh"
                    type="date"
                    value={form.dob}
                    onChange={(e: any) => updateForm("dob", e.target.value)}
                  />
                  <GenderToggle
                    value={form.gender}
                    onChange={(v) => updateForm("gender", v)}
                  />
                  <Input
                    label="Số CMND / CCCD"
                    value={form.cmnd}
                    onChange={(e: any) => updateForm("cmnd", e.target.value)}
                    placeholder="0123456789"
                  />
                  <Input
                    label="Số điện thoại"
                    value={form.phone}
                    onChange={(e: any) => updateForm("phone", e.target.value)}
                    placeholder="090xxxxxxx"
                  />
                  <Input
                    label="Email"
                    value={form.email}
                    onChange={(e: any) => updateForm("email", e.target.value)}
                    placeholder="email@email.com"
                  />
                  <Input
                    label="Địa chỉ"
                    value={form.address}
                    onChange={(e: any) => updateForm("address", e.target.value)}
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
                    onChange={(e: any) => updateForm("height", e.target.value)}
                    placeholder="175"
                  />
                  <Input
                    label="Nghề nghiệp"
                    value={form.job}
                    onChange={(e: any) => updateForm("job", e.target.value)}
                    placeholder="Diễn viên tự do"
                  />
                  <Input
                    label="Ứng tuyển vị trí"
                    value={form.applyRole}
                    onChange={(e: any) => updateForm("applyRole", e.target.value)}
                    placeholder="Vai chính / phụ / quần chúng…"
                  />
                </Grid>

                <Textarea
                  label="Ghi chú"
                  value={form.note}
                  onChange={(e: any) => updateForm("note", e.target.value)}
                  placeholder="Kinh nghiệm, lịch rảnh, thế mạnh..."
                />

                <Upload
                  onChange={(files) => updateForm("images", files)}
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
                // onClick={() => {
                //   console.log("SUBMIT:", form);
                //   onClose();
                // }}
                onClick={submitForm}
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

