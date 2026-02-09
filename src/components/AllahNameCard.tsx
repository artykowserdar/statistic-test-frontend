import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import StatsPanel from './StatsPanel'

interface AllahNameCardProps {
  item: {
    id: string
    number: number
    name_arabic: string
    name_cyr: string
    translations: string[]
  }
  index: number
}

export default function AllahNameCard({ item, index }: AllahNameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className={cn(
        "glass hover-glow p-6 md:p-8 relative overflow-hidden group cursor-pointer",
        "transform-gpu"
      )}
    >
      {/* Фоновая арабская каллиграфия (полупрозрачная) */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none select-none">
        <p className="arabic-text absolute -top-20 -right-10 transform rotate-12">
          {item.name_arabic}
        </p>
      </div>

      <div className="relative z-10">
        {/* Номер и арабский текст */}
        <div className="text-center mb-6">
          <p className="text-sm md:text-base text-gold/80 font-medium mb-2">
            № {item.number}
          </p>
          <p className="arabic-text leading-none mb-3">
            {item.name_arabic}
          </p>
          <p className="text-xl md:text-2xl font-semibold text-white/90">
            {item.name_cyr}
          </p>
        </div>

        {/* Переводы */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {item.translations.slice(0, 5).map((t, i) => (
            <span
              key={i}
              className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white/90 text-sm rounded-full border border-white/5 hover:bg-white/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Статистика */}
        <StatsPanel type="allah_name" id={item.id} />
      </div>
    </motion.div>
  )
}