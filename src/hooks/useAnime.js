import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

// ساخت یک تنظیمات پایه برای Axios تا هدرها در تمام درخواست‌ها اعمال شوند
const rapidApi = axios.create({
  baseURL: 'https://gogoanime2.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'gogoanime2.p.rapidapi.com',
    // ⚠️ پیشنهاد امنیتی: بهتر است به جای قرار دادن مستقیم کلید در اینجا، 
    // آن را در فایل .env قرار دهید و با import.meta.env.VITE_RAPIDAPI_KEY فراخوانی کنید
    'x-rapidapi-key': '748d416499mshbb161b48db61a5dp1eb23cjsn80a9f87dbc23' 
  }
})

export function useLatestEpisode() {
  const fetchRecent = async () => {
    // type=1 معمولاً برای انیمه‌های ژاپنی (Sub) است
    const { data } = await rapidApi.get('/recent-release?type=1&page=1')
    return data
  }
  return useQuery(['episodes'], () => fetchRecent())
}

export function useSeries() {
  const fetchSeries = async () => {
    const { data } = await rapidApi.get('/popular?page=1')
    return data
  }
  return useQuery(['series'], () => fetchSeries())
}

export function usePopular() {
  const fetchMostPopular = async () => {
    const { data } = await rapidApi.get('/popular?page=1')
    return data
  }
  return useQuery(['popular'], () => fetchMostPopular())
}

export function useAiring() {
  const fetchTopAiring = async () => {
    const { data } = await rapidApi.get('/top-airing?page=1')
    return data
  }
  return useQuery(['airing'], () => fetchTopAiring())
}

export function useMovies() {
  const fetchMovies = async () => {
    const { data } = await rapidApi.get('/anime-movies?aph=A&page=1')
    return data
  }
  return useQuery(['movies'], () => fetchMovies())
}

export function useGenre({ genre }) {
  const fetchGenre = async () => {
    // API جدید شما قابلیت جستجوی مستقیم ژانر را دارد، نیازی به فیلتر دستی نیست!
    const { data } = await rapidApi.get(`/genre/${genre}?page=1`)
    return data
  }
  return useQuery(['genres', genre], () => fetchGenre(), {
    enabled: !!genre, // فقط وقتی ژانر وجود داشت درخواست بفرست
  })
}

export const useSearchAnime = (filter) => {
  const fetchData = async () => {
    // سرچ مستقیم از طریق API بسیار سریع‌تر و بهینه‌تر است
    const { data } = await rapidApi.get(`/search?keyw=${filter}&page=1`)
    return data
  }
  return {
    ...useQuery(['searchAnime', filter], () => {
      if (filter && filter.length > 1) {
        return fetchData()
      }
      return []
    }),
  }
}
