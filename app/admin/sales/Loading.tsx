import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div>
      <Skeleton className='w-full h-full'/>
    </div>
  )
}

export default Loading