"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { plansActor } from "@/data/broadcasts";
import { Star, Zap, Gem } from "lucide-react";

export default function PricingSection() {
  const [activePlan, setActivePlan] = useState<string | null>(null);

  // Gán icon theo tên gói
  const getIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "standard":
      case "stand":
        return <Star className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" />;
      case "pro":
        return <Zap className="w-6 h-6 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.5)]" />;
      case "premium":
      case "premeum":
        return <Gem className="w-7 h-7 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />;
      default:
        return null;
    }
  };

  return (
    <section className="px-6 py-12 lg:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white tracking-wide">GÓI ĐĂNG KÝ</h2>
        <p className="text-gray-400 text-sm mt-1">
          Lựa chọn gói phù hợp cho hành trình diễn xuất của bạn
        </p>
        <div className="w-12 h-[2px] bg-blue-500 mx-auto mt-3 rounded-full" />
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plansActor.map((plan, i) => {
          const isActive = activePlan === plan.name;

          return (
            <motion.div
              key={plan.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              onClick={() => !plan.disabled && setActivePlan(plan.name)}
              className={`
                relative cursor-pointer rounded-2xl p-[1px] transition
                ${isActive ? "bg-gradient-to-br from-blue-500 to-purple-600" : "bg-gray-800"}
                ${plan.disabled ? "cursor-not-allowed opacity-70" : "hover:shadow-blue-500/30 hover:shadow-xl"}
              `}
            >
              {/* INNER CARD */}
              <div
                className={`rounded-2xl h-full p-6 bg-[#0e0e11]/90 backdrop-blur-xl transition 
                  ${isActive ? "ring-2 ring-blue-400" : "ring-1 ring-gray-700"}
                `}
              >
                {/* Best Offer Tag */}
                {plan.highlight && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-0 right-0 bg-blue-600 text-xs px-3 py-1 rounded-bl-xl font-semibold"
                  >
                    Best Offer
                  </motion.div>
                )}

                {/* Title + ICON */}
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  >
                    {getIcon(plan.name)}
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                </motion.div>

                {/* Price */}
                <div className="mt-3">
                  <p className="text-3xl font-bold text-white">{plan.price}</p>
                  {plan.oldPrice && (
                    <p className="text-gray-500 text-sm line-through">{plan.oldPrice}</p>
                  )}
                </div>

                <p className="text-gray-400 text-sm mt-3">{plan.description}</p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-blue-500" /> {f}
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <motion.button
                  layout
                  disabled={plan.disabled}
                  className={`mt-6 w-full py-2 rounded-lg font-semibold transition ${
                    plan.disabled
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : isActive
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-500/30"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {plan.button}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
