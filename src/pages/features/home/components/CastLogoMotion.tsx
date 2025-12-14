import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CastLogoMotion() {
	
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const TOTAL_TIME = 3000;
    const INTERVAL = 100;
    const STEP = 100 / (TOTAL_TIME / INTERVAL);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + STEP, 100);

        if (next === 100) {
          clearInterval(timer);
          setTimeout(() => {
            router.replace("/features/home");
          }, 200);
        }

        return next;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="relative flex flex-col items-center -mt-12 mb-8 w-full">

      {/* ===== Logo block (GIỮ NGUYÊN) ===== */}
      <div className="relative mt-12">
  {/* ===== OUTER FLOAT MOTION ===== */}
  <motion.div
    animate={{ y: [0, -6, 0] }}
    transition={{
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative will-change-transform"
  >
    {/* Gradient glow - optimize: single animation */}
    <motion.div
      animate={{ opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -inset-4 bg-gradient-to-r 
                 from-blue-600 to-purple-600 
                 rounded-full blur-xl will-change-opacity"
    />

    {/* Floating lights - optimize: use CSS animation instead */}
    <div
      className="absolute top-0 -left-4 w-24 h-24 
                 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"
    />

    <div
      className="absolute bottom-0 -right-4 w-32 h-32 
                 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-1000"
    />

    {/* ===== LOGO (STATIC) ===== */}
    <div
      className="relative bg-white dark:bg-gray-900 p-6 rounded-full 
                 ring-8 ring-white/20 shadow-2xl"
    >
      <Image
        src="/images/cast.png"
        alt="CAST-V Logo"
        width={128}
        height={128}
        priority
        className="w-32 h-32 object-contain rounded-full"
      />
    </div>
  </motion.div>
</div>



      {/* ===== TEXT ===== */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <h1 className="text-4xl font-black bg-gradient-to-r 
                       from-blue-600 to-purple-600 
                       bg-clip-text text-transparent">
          CAST-V
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 tracking-wider">
          Professional Broadcasting System
        </p>

        <span className="mt-4 block text-xs tracking-widest text-gray-400">
          Loading… {Math.round(progress)}%
        </span>
      </motion.div>
    </div>
  );
}
