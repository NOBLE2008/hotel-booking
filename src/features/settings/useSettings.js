import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getSettings } from '../../services/apiSettings'

export default function useSettings() {
    const {isLoading, data} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    })
  return {isLoading, data}
}
