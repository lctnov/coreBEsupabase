import { motion } from "framer-motion";
import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

type GridProps = {
  children: React.ReactNode;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

type UploadProps = {
  onChange: (f: File[]) => void;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary" | "ghost";
};

type GenderToggleProps = {
  value: "male" | "female" | "other";
  onChange: (v: "male" | "female" | "other") => void;
};	



function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Grid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

function Input({ label, ...props }: InputProps) {
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

function Textarea({ label, ...props }: TextareaProps) {
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

function Upload({ onChange }: UploadProps) {
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

function Button({ children, onClick, variant }: ButtonProps) {
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
}: GenderToggleProps) {
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

export { Section, Grid, Input, Textarea, Upload, Button, GenderToggle };