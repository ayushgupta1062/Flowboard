import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, AlertCircle, Trash2, Edit3, UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { get, post, patch, del } from '../api/axios'
import ProjectHeader from '../components/projects/ProjectHeader'
import TaskCard from '../components/projects/TaskCard'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'
import Spinner from '../components/common/Spinner'

const taskSchema = yup.object().shape({
  title: yup.string().min(3, 'Title is too short').required('Title is required'),
  description: yup.string().max(500, 'Description is too long'),
  dueDate: yup.string().nullable(),
  priority: yup.string().oneOf(['LOW', 'MEDIUM', 'HIGH']).required(),
  assigneeId: yup.number().nullable(),
})

const memberSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
})

const ProjectBoard = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // State
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: { priority: 'MEDIUM' }
  })

  const { 
    register: regMember, 
    handleSubmit: handleMemberSubmit, 
    reset: resetMember,
    formState: { errors: memberErrors } 
  } = useForm({
    resolver: yupResolver(memberSchema)
  })

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [projectRes, tasksRes] = await Promise.all([
        get(`/projects/${id}`),
        get(`/projects/${id}/tasks`)
      ])
      setProject(projectRes.data)
      setTasks(tasksRes.data)
    } catch (error) {
      toast.error('Failed to load project board')
      navigate('/projects')
    } finally {
      setLoading(false)
    }
  }, [id, navigate])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onTaskSubmit = async (data) => {
    try {
      setSubmitting(true)
      // Convert empty string to null for optional number/date fields
      const formattedData = {
        ...data,
        assigneeId: data.assigneeId === "" ? null : Number(data.assigneeId),
        dueDate: data.dueDate === "" ? null : data.dueDate
      }

      if (selectedTask) {
        const res = await patch(`/tasks/${selectedTask.id}`, formattedData)
        setTasks(tasks.map(t => t.id === selectedTask.id ? res.data : t))
        toast.success('Task updated')
      } else {
        const res = await post(`/projects/${id}/tasks`, formattedData)
        setTasks([res.data, ...tasks])
        toast.success('Task created')
      }
      setIsTaskModalOpen(false)
      setSelectedTask(null)
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed')
    } finally {
      setSubmitting(false)
    }
  }

  const onAddMember = async (data) => {
    try {
      setSubmitting(true)
      await post(`/projects/${id}/members`, data)
      toast.success('Member added to project')
      setIsMemberModalOpen(false)
      resetMember()
      fetchData() // Refresh project detail for member list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add member')
    } finally {
      setSubmitting(false)
    }
  }

  const onStatusChange = async (taskId, newStatus) => {
    try {
      const res = await patch(`/tasks/${taskId}`, { status: newStatus })
      setTasks(tasks.map(t => t.id === taskId ? res.data : t))
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(res.data)
      }
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const deleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await del(`/tasks/${taskId}`)
      setTasks(tasks.filter(t => t.id !== taskId))
      toast.success('Task deleted')
      setIsTaskModalOpen(false)
      setSelectedTask(null)
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const openEditTask = (task) => {
    setSelectedTask(task)
    setValue('title', task.title)
    setValue('description', task.description)
    setValue('priority', task.priority)
    setValue('dueDate', task.dueDate ? task.dueDate.split('T')[0] : '')
    setValue('assigneeId', task.assignee?.id || '')
    setIsTaskModalOpen(true)
  }

  const columns = [
    { id: 'TODO', title: 'To Do', color: 'bg-ink-hint' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-warning' },
    { id: 'DONE', title: 'Done', color: 'bg-success' }
  ]

  if (loading && !project) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spinner size={40} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ProjectHeader 
        project={project} 
        members={project?.members}
        onAddMember={() => setIsMemberModalOpen(true)}
        onAddTask={() => {
          setSelectedTask(null)
          reset({ priority: 'MEDIUM', assigneeId: '' })
          setIsTaskModalOpen(true)
        }}
        onSettings={() => setIsSettingsOpen(true)}
      />

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.id} className="min-w-[320px] flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider">{col.title}</h3>
                <span className="bg-page text-ink-hint text-[10px] font-bold px-2 py-0.5 rounded-full border border-border">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 min-h-[400px] p-2 bg-page/50 rounded-2xl border border-dashed border-border/50">
              {tasks.filter(t => t.status === col.id).map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={openEditTask}
                  onMenuClick={(e, t) => {
                    e.stopPropagation()
                    openEditTask(t)
                  }}
                />
              ))}
              
              {project?.myRole === 'ADMIN' && (
                <button
                  onClick={() => {
                    setSelectedTask(null)
                    reset({ priority: 'MEDIUM', assigneeId: '' })
                    setIsTaskModalOpen(true)
                  }}
                  className="w-full py-4 rounded-xl border border-dashed border-border text-ink-hint hover:text-primary hover:border-primary hover:bg-white transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest mt-2"
                >
                  <Plus size={14} />
                  Add Task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Task Modal (Create/Edit) */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={selectedTask ? 'Edit Task' : 'Create New Task'}
      >
        <form onSubmit={handleSubmit(onTaskSubmit)} className="space-y-5">
          <Input
            label="Task Title"
            name="title"
            placeholder="What needs to be done?"
            register={register}
            error={errors.title?.message}
            required
            disabled={project?.myRole === 'MEMBER'}
          />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Description</label>
            <textarea
              {...register('description')}
              placeholder="Add some details..."
              rows={3}
              disabled={project?.myRole === 'MEMBER'}
              className={`w-full px-4 py-3 rounded-[10px] border-[1.5px] border-border bg-white text-ink text-sm outline-none focus:border-primary transition-all resize-none ${project?.myRole === 'MEMBER' ? 'bg-page/50 cursor-not-allowed opacity-70' : ''}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-ink">Priority</label>
              <select
                {...register('priority')}
                disabled={project?.myRole === 'MEMBER'}
                className={`w-full h-11 px-4 rounded-[10px] border-[1.5px] border-border bg-white text-ink text-sm outline-none focus:border-primary transition-all cursor-pointer ${project?.myRole === 'MEMBER' ? 'bg-page/50 cursor-not-allowed opacity-70' : ''}`}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <Input
              label="Due Date"
              name="dueDate"
              type="date"
              register={register}
              error={errors.dueDate?.message}
              disabled={project?.myRole === 'MEMBER'}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-ink">Assign To</label>
            <select
              {...register('assigneeId')}
              disabled={project?.myRole === 'MEMBER'}
              className={`w-full h-11 px-4 rounded-[10px] border-[1.5px] border-border bg-white text-ink text-sm outline-none focus:border-primary transition-all cursor-pointer ${project?.myRole === 'MEMBER' ? 'bg-page/50 cursor-not-allowed opacity-70' : ''}`}
            >
              <option value="">Unassigned</option>
              {project?.members?.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {selectedTask && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-ink">Status</label>
              <div className="flex gap-2">
                {columns.map(col => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => onStatusChange(selectedTask.id, col.id)}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all ${
                      selectedTask.status === col.id 
                        ? 'bg-primary text-white border-primary shadow-sm' 
                        : 'bg-page text-ink-hint border-border hover:border-primary'
                    }`}
                  >
                    {col.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-page">
            {selectedTask && project?.myRole === 'ADMIN' && (
              <Button 
                variant="danger" 
                onClick={() => deleteTask(selectedTask.id)}
                icon={Trash2}
              >
                Delete
              </Button>
            )}
            <div className="flex-1" />
            <Button variant="secondary" onClick={() => setIsTaskModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={submitting}>
              {selectedTask ? (project?.myRole === 'ADMIN' ? 'Save Changes' : 'Update Status') : 'Create Task'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Member Modal */}
      <Modal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        title="Invite Team Member"
      >
        <form onSubmit={handleMemberSubmit(onAddMember)} className="space-y-6">
          <p className="text-sm text-ink-muted leading-relaxed">
            Invite a colleague to this project. They must have a Flowboard account.
          </p>
          <Input
            label="Colleague's Email"
            name="email"
            placeholder="email@example.com"
            register={regMember}
            error={memberErrors.email?.message}
            required
            icon={UserPlus}
          />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setIsMemberModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1" loading={submitting}>Send Invite</Button>
          </div>
        </form>
      </Modal>

      {/* Project Settings Modal */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Project Settings"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-ink-hint uppercase tracking-widest mb-4">Team Members</h4>
            <div className="space-y-2">
              {project?.members?.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-page rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{member.name}</p>
                      <p className="text-[10px] text-ink-muted">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${member.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                      {member.role}
                    </span>
                    {project.myRole === 'ADMIN' && member.role !== 'ADMIN' && (
                      <button 
                        onClick={async () => {
                          if (window.confirm(`Remove ${member.name} from project?`)) {
                            try {
                              await del(`/projects/${id}/members/${member.id}`)
                              toast.success('Member removed')
                              fetchData()
                            } catch (error) {
                              toast.error('Failed to remove member')
                            }
                          }
                        }}
                        className="p-1.5 text-ink-hint hover:text-danger hover:bg-danger/5 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <Button 
              variant="danger" 
              fullWidth 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
                  del(`/projects/${id}`).then(() => {
                    toast.success('Project deleted')
                    navigate('/projects')
                  }).catch(() => {
                    toast.error('Failed to delete project')
                  })
                }
              }}
            >
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectBoard
