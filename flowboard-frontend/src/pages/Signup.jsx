import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { post } from '../api/axios'
import useAuth from '../hooks/useAuth'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const schema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Full name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await post('/auth/signup', data)
      const { token, user } = response.data
      login(token, user)
      toast.success(`Account created! Welcome, ${user.name.split(' ')[0]}!`)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
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
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
            <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current">
              <circle cx="8" cy="16" r="4" />
              <circle cx="24" cy="8" r="4" />
              <circle cx="24" cy="24" r="4" />
              <path d="M12 16 L20 10 M12 16 L20 22" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-ink">Join Flowboard</h1>
          <p className="text-sm text-ink-muted mt-2">Start managing your team effectively today.</p>
        </div>

        <div className="bg-white p-8 rounded-[24px] shadow-modal border border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              placeholder="John Doe"
              icon={User}
              register={register}
              error={errors.name?.message}
              required
            />

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

            <div className="flex items-center gap-2 text-[12px] text-ink-muted p-3 bg-page rounded-lg">
              <CheckCircle2 size={14} className="text-success" />
              <span>Passwords are encrypted using BCrypt (Salted).</span>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
            >
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Signup
