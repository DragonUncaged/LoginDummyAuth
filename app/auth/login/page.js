'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../auth-context'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const validateForm = () => {
    const newErrors = {}
    
    if (formData.username !== 'emilys') {
      newErrors.username = "Username must be 'emilys'"
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z0-9.-]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const result = await login(formData.username, formData.password)
    if (!result.success) {
      setErrors({ submit: result.error })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        <div className="hidden md:block">
          <img src="/images/home-image.png" alt="Login illustration" className="max-w-md" />
        </div>
        
        <Card className="max-w-md w-full mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-left">Welcome to</CardTitle>
            <CardTitle className="text-4xl text-indigo-500 font-extrabold text-left">Unstop</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" type="button">
                <img src="/images/google-image.png" alt="Google" className="w-5 h-5" />
                Login with Google
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" type="button">
                <img src="/images/fb-image.png" alt="Facebook" className="w-5 h-5" />
                Login with Facebook
              </Button>
            </div>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
                OR
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <img src="/images/avatar-image.png" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-10 bg-gray-50 border-gray-200"
                    placeholder="Username"
                  />
                </div>
                {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <img src="/images/email-image.png" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-gray-50 border-gray-200"
                    placeholder="example@gmail.com"
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <img src="/images/password-image.png" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-gray-50 border-gray-200"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img 
                      src="/images/eye-image.png" 
                      alt="" 
                      className="h-5 w-5"
                    />
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, rememberMe: checked })
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-indigo-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {errors.submit && (
                <p className="text-sm text-destructive text-center">{errors.submit}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-indigo-500 hover:underline">
                  Register
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

