import prisma from '@/lib/prisma'
import React, { Suspense } from 'react'
import CategoryList from './CategoryList'

const page =async () => {
const categories = await prisma.category.findMany()

  return (
    <Suspense fallback={<>Loading...</>}>
      <CategoryList categories={categories}/>
    </Suspense>
  )
}

export default page