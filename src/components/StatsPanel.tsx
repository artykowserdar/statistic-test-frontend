import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Edit, Save, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useContentStat, useUpdateNote } from '../hooks/useContent'
import { cn } from '@/lib/utils'

interface Props {
  type: 'allah_name' | 'dua' | 'goal'
  id: string
}

export default function StatsPanel({ type, id }: Props) {
  const { data: stat, isLoading, error } = useContentStat(type, id)
  const updateNote = useUpdateNote()

  const [notes, setNotes] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Синхронизация заметок при загрузке данных
  useEffect(() => {
    if (stat?.notes !== undefined) {
      setNotes(stat.notes || '')
    }
  }, [stat?.notes])

  const handleSave = () => {
    if (notes === stat?.notes) {
      toast('Ничего не изменилось', { icon: 'ℹ️' })
      setIsEditing(false)
      return
    }

    updateNote.mutate(
      { type, id, notes },
      {
        onSuccess: () => {
          toast.success('Заметка сохранена', { duration: 2000 })
          setIsEditing(false)
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.detail || 'Не удалось сохранить', {
            icon: <AlertCircle className="text-red-500" />,
          })
        },
      }
    )
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg"
      >
        <div className="flex items-center justify-center gap-3 text-emerald-600">
          <div className="animate-spin h-5 w-5 border-2 border-emerald-600 border-t-transparent rounded-full" />
          <span>Загрузка статистики...</span>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-red-50/80 backdrop-blur-sm rounded-2xl border border-red-200 shadow-lg text-red-800"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6" />
          <span>Ошибка: {error.message || 'Не удалось загрузить статистику'}</span>
        </div>
      </motion.div>
    )
  }

  if (!stat) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg text-gray-600"
      >
        Статистика по этому элементу ещё не собиралась
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "p-6 rounded-2xl border shadow-xl backdrop-blur-sm",
        "bg-gradient-to-br from-white/90 to-slate-50/90",
        "border-emerald-100 hover:border-emerald-300/50 transition-all duration-300"
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-semibold text-emerald-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Ваша статистика
        </h3>
        <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium">
          {type === 'allah_name' ? 'Имя Аллаха' : type === 'dua' ? 'Дуа' : 'Цель'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="p-4 bg-white/50 rounded-xl border border-emerald-50">
          <div className="flex items-center gap-2 text-emerald-700 mb-1">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Просмотров</span>
          </div>
          <p className="text-2xl font-bold text-emerald-900">{stat.view_count}</p>
        </div>

        <div className="p-4 bg-white/50 rounded-xl border border-emerald-50">
          <div className="flex items-center gap-2 text-emerald-700 mb-1">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Последний раз</span>
          </div>
          <p className="text-lg font-medium text-gray-800">
            {stat.last_visited_at
              ? new Date(stat.last_visited_at).toLocaleString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'}
          </p>
        </div>
      </div>

      {/* Заметки */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="notes" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Edit className="h-4 w-4 text-emerald-600" />
            Личные заметки
          </label>

          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setNotes(stat?.notes || '')
                  setIsEditing(false)
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={updateNote.isPending}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg",
                  updateNote.isPending
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                )}
              >
                <Save className="h-4 w-4" />
                {updateNote.isPending ? 'Сохр...' : 'Сохранить'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
            >
              {stat?.notes ? 'Изменить' : 'Добавить заметку'}
            </button>
          )}
        </div>

        {isEditing ? (
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ваши мысли, напоминания, повторения..."
            className="w-full p-4 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 min-h-[120px] text-sm resize-y bg-white/70 backdrop-blur-sm"
          />
        ) : (
          <div className="p-4 bg-white/60 rounded-xl border border-emerald-100 min-h-[80px] text-sm text-gray-700 whitespace-pre-wrap">
            {notes || (
              <span className="text-gray-400 italic">Заметок пока нет...</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}