import { motion } from "framer-motion";
import { memo, useState } from "react";

interface BroadcastItem {
  image: string;
  title: string;
  desc: string;
}

interface CalendarCastingCardProps {
  title: string;
  items: BroadcastItem[];
}

export default memo(function CalendarCastingCard({ title, items }: CalendarCastingCardProps) {
	
  return (
    <div className="p-0">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <BroadcastCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
});

function BroadcastCard({ item }: { item: BroadcastItem }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-4 bg-[#1f2233] p-3 rounded-xl hover:bg-[#222641] transition will-change-colors"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
    >
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-700">
        {!isLoaded && (
          <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
        )}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`object-cover w-full h-full will-change-transform transition-opacity ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div className="flex-1 text-left">
        <h4 className="text-white font-semibold text-sm">{item.title}</h4>
        <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
      </div>
    </motion.div>
  );
}
