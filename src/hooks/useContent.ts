import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/api'

// ← Вот здесь добавляем type перед импортом типов
import type { StatResponse, NoteUpdate } from '../api/types'

export const useContentStat = (type: string, id: string) => {
  return useQuery<StatResponse, Error>({
    queryKey: ['stat', type, id],
    queryFn: async () => {
      const { data } = await api.get(`/stats/content/${type}/${id}`)
      return data
    },
    enabled: !!id && !!type,
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ type, id, notes }: { type: string; id: string; notes: string }) =>
      api.patch(`/stats/content/${type}/${id}`, { notes } as NoteUpdate),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['stat', variables.type, variables.id] })
    },
  })
}