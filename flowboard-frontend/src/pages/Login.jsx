import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Github } from 'lucide-react'
import toast from 'react-hot-toast'
import { post } from '../api/axios'
import useAuth from '../hooks/useAuth'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await post('/auth/login', data)
      const { token, user } = response.data
      login(token, user)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
            <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current">
              <circle cx="8" cy="16" r="4" />
              <circle cx="24" cy="8" r="4" />
              <circle cx="24" cy="24" r="4" />
              <path d="M12 16 L20 10 M12 16 L20 22" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-ink">Welcome to Flowboard</h1>
          <p className="text-sm text-ink-muted mt-2">Manage your team and tasks with flow.</p>
        </div>

        <div className="bg-white p-8 rounded-[24px] shadow-modal border border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              register={register}
              error={errors.email?.message}
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              register={register}
              error={errors.password?.message}
              required
            />

            <div className="flex justify-end">
              <Link to="#" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-ink-hint font-bold tracking-wider">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="secondary" icon={Github} className="w-full">
              GitHub
            </Button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-ink-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
