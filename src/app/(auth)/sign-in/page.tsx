import { getCurrent } from '@/features/auth/queries'
import { SignInCard } from '@/features/auth/components/sign-in-card'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function SignInPage() {
  const user = await getCurrent();

  if (user) redirect("/")
  return (
    <SignInCard />
  )
}
