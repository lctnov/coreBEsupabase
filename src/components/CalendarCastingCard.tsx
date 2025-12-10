import { motion } from "framer-motion";

interface BroadcastItem {
  image: string;
  title: string;
  desc: string;
}

interface CalendarCastingCardProps {
  title: string;
  items: BroadcastItem[];
}

export default function CalendarCastingCard({ title, items }: CalendarCastingCardProps) {
	
  return (
    <div className="p-0">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 bg-[#1f2233] p-3 rounded-xl hover:bg-[#222641] transition"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white font-semibold text-sm">{item.title}</h4>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
