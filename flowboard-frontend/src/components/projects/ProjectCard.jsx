import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Users, 
  CheckSquare, 
  Calendar,
  ArrowRight,
  Trash2
} from 'lucide-react'
import { format } from 'date-fns'
import { del } from '../../api/axios'
import toast from 'react-hot-toast'
import Badge from '../common/Badge'
import Avatar from '../common/Avatar'

const ProjectCard = ({ project }) => {
  const {
    id,
    name,
    description,
    memberCount,
    totalTasks,
    completedTasks,
    progress,
    createdAt,
    createdBy,
    myRole
  } = project

  const onDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await del(`/projects/${id}`)
        toast.success('Project deleted')
        window.location.reload() // Simple way to refresh the list
      } catch (error) {
        toast.error('Failed to delete project')
      }
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[20px] border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <Badge variant={myRole === 'ADMIN' ? 'primary' : 'neutral'}>
          {myRole === 'ADMIN' ? 'Owner' : 'Member'}
        </Badge>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-ink-hint flex items-center gap-1.5 font-medium">
            <Calendar size={12} />
            {format(new Date(createdAt), 'MMM d, yyyy')}
          </span>
          {myRole === 'ADMIN' && (
            <button 
              onClick={onDelete}
              className="p-1.5 text-ink-hint hover:text-danger hover:bg-danger/5 rounded-lg transition-all"
              title="Delete Project"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <Link to={`/projects/${id}`}>
        <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
      </Link>
      
      <p className="text-sm text-ink-muted mb-6 line-clamp-2 leading-relaxed min-h-[40px]">
        {description || 'No description provided.'}
      </p>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-1 text-[11px] font-bold text-ink-hint uppercase tracking-wider">
            <CheckSquare size={12} className="text-primary" />
            <span>Progress</span>
          </div>
          <span className="text-xs font-bold text-ink">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-page rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-page">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-ink-muted">
            <Users size={16} />
            <span className="text-xs font-semibold">{memberCount}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-1.5 text-ink-muted">
            <CheckSquare size={16} />
            <span className="text-xs font-semibold">{completedTasks}/{totalTasks}</span>
          </div>
        </div>

        <Link 
          to={`/projects/${id}`}
          className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider hover:gap-2 transition-all"
        >
          View Board
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}

export default ProjectCard
