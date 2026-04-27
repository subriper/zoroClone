import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

// تنظیمات اتصال به سرور Gogoanime
const rapidApi = axios.create({
  baseURL: 'https://gogoanime2.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'gogoanime2.p.rapidapi.com',
    'x-rapidapi-key': '748d416499mshbb161b48db61a5dp1eb23cjsn80a9f87dbc23' 
  }
})

export const fetchTrendingAnime = async () => {
  // به جای Kitsu، لیست انیمه‌های پرطرفدار و در حال پخش را از Gogoanime می‌گیریم
  const { data } = await rapidApi.get('/top-airing?page=1')
  
  // اگر ترجیح می‌دهید به جای در حال پخش، پربازدیدترین‌های کل زمان‌ها را نشان دهید،
  // می‌توانید خط بالا را پاک کنید و از خط پایین استفاده کنید:
  // const { data } = await rapidApi.get('/popular?page=1')

  return data
}

export default function useTrendingAnime() {
  return useQuery(['trending'], () => fetchTrendingAnime())
}
