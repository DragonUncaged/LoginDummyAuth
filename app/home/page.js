'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth-context'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome to</h1>
          <h2 className="text-4xl font-bold text-indigo-500 font-extrabold">Unstop</h2>
        </div>
        
        <Card className="p-8 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src={user.image || "/images/profile-image.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-indigo-500 mb-2">
              {user.name || 'Michael Dam'}
            </h3>
            <p className="text-gray-600 mb-1">
              {user.email || 'example@gmail.com'}
            </p>
            <p className="text-gray-500 mb-6">
              {user.gender || 'Female'}
            </p>
            <Button 
              onClick={logout}
              className="w-full bg-indigo-500 hover:bg-purple-700"
            >
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

