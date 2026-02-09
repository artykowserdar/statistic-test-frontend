import { useQuery } from '@tanstack/react-query'
import api from '../api/api'
import AllahNameCard from '../components/AllahNameCard'

export default function AllahNames() {
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['allah-names'],
    queryFn: () => api.get('/v1/allah-names/').then(res => res.data),
  })

  const names = response?.items || []

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Фоновый паттерн — тонкий исламский орнамент */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
      </div>

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Заголовок */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4 tracking-wider drop-shadow-lg">
            Исламский помощник
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            99 прекрасных имён Аллаха — с переводами, статистикой и вашими личными заметками
          </p>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-gold border-solid mb-8"></div>
            <p className="text-2xl text-gold/80">Загружаем имена Аллаха...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            <p className="text-3xl font-bold mb-6">Не удалось загрузить</p>
            <p className="text-xl">{(error as any).message || 'Попробуйте позже'}</p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              99 Имён Аллаха
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {names.map((item: any, index: number) => (
                <AllahNameCard key={item.id} item={item} index={index} />
              ))}
            </div>

            <footer className="text-center mt-16 text-white/50 text-sm">
              Всего имён: {names.length} • Данные обновлены 09.02.2026
            </footer>
          </>
        )}
      </div>
    </div>
  )
}