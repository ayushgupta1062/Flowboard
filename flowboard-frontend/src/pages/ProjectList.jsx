import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, FolderKanban, Filter } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { get, post } from '../api/axios'
import ProjectCard from '../components/projects/ProjectCard'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'
import SkeletonCard from '../components/common/SkeletonCard'
import EmptyState from '../components/common/EmptyState'

import { useAuth } from '../context/AuthContext'

const schema = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters').required('Project name is required'),
  description: yup.string().max(200, 'Description is too long'),
})

const ProjectList = () => {
  const { isAdmin } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await get('/projects')
      setProjects(response.data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const onCreateProject = async (data) => {
    try {
      setCreating(true)
      const response = await post('/projects', data)
      setProjects([response.data, ...projects])
      toast.success('Project created successfully!')
      setIsModalOpen(false)
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project')
    } finally {
      setCreating(false)
    }
  }

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">My Projects</h2>
          <p className="text-sm text-ink-muted mt-1">Manage and organize all your team boards.</p>
        </div>
        <Button 
          variant="primary" 
          icon={Plus} 
          onClick={() => setIsModalOpen(true)}
        >
          Create Project
        </Button>
      </div>

      {/* Toolbar Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[16px] border border-border shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-hint" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-page border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={Filter} className="h-10">
            Filter
          </Button>
          <span className="text-xs font-bold text-ink-hint uppercase tracking-wider ml-2">
            {filteredProjects.length} Projects
          </span>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} height={240} />
          ))
        ) : filteredProjects.length > 0 ? (
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="col-span-full">
            <EmptyState
              icon={FolderKanban}
              title={search ? "No results found" : "No projects yet"}
              description={search 
                ? `We couldn't find any projects matching "${search}".` 
                : "Create your first project to start managing tasks with your team."
              }
              actionLabel={search ? "Clear Search" : "Create Project"}
              onAction={() => search ? setSearch('') : setIsModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <form onSubmit={handleSubmit(onCreateProject)} className="space-y-6">
          <Input
            label="Project Name"
            name="name"
            placeholder="e.g. Marketing Q3 Launch"
            register={register}
            error={errors.name?.message}
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Description (Optional)</label>
            <textarea
              {...register('description')}
              placeholder="What is this project about?"
              rows={3}
              className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-border bg-white text-ink text-sm outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(108,99,255,0.12)] transition-all resize-none"
            />
            {errors.description && <p className="text-xs text-danger">{errors.description.message}</p>}
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button 
              variant="secondary" 
              className="flex-1" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1" 
              loading={creating}
            >
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ProjectList
