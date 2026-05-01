import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MessageSquare, 
  MoreVertical,
  Clock,
  CheckCircle2,
  Circle
} from 'lucide-react'
import { formatDueDate, isOverdue } from '../../utils/dateUtils'
import Avatar from '../common/Avatar'
import Badge from '../common/Badge'

const TaskCard = ({ task, onClick, onMenuClick }) => {
  const {
    title,
    description,
    dueDate,
    priority,
    status,
    assignee,
    overdue
  } = task

  const priorityVariants = {
    LOW: 'neutral',
    MEDIUM: 'warning',
    HIGH: 'danger'
  }

  const statusIcons = {
    TODO: <Circle size={14} className="text-ink-hint" />,
    IN_PROGRESS: <Clock size={14} className="text-warning" />,
    DONE: <CheckCircle2 size={14} className="text-success" />
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      onClick={() => onClick(task)}
      className="bg-white p-4 rounded-xl border border-border shadow-sm hover:shadow-card-hover transition-all cursor-pointer group relative"
    >
      <div className="flex justify-between items-start mb-3">
        <Badge variant={priorityVariants[priority]}>
          {priority}
        </Badge>
        
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onMenuClick(e, task)
          }}
          className="p-1 -mr-1 text-ink-hint hover:text-ink hover:bg-page rounded-md transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="flex gap-2.5 mb-3">
        <div className="mt-1 flex-shrink-0">
          {statusIcons[status]}
        </div>
        <h4 className={`text-[15px] font-semibold text-ink leading-tight ${status === 'DONE' ? 'line-through text-ink-hint' : ''}`}>
          {title}
        </h4>
      </div>

      {description && (
        <p className="text-xs text-ink-muted line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-page">
        <div className="flex items-center gap-3">
          {dueDate && (
            <div className={`flex items-center gap-1 text-[11px] font-bold ${overdue ? 'text-danger' : 'text-ink-hint'}`}>
              <Calendar size={12} />
              <span>{formatDueDate(dueDate)}</span>
            </div>
          )}
        </div>

        {assignee ? (
          <Avatar name={assignee.name} size={24} className="ring-2 ring-white" />
        ) : (
          <div className="w-6 h-6 rounded-full border border-dashed border-border flex items-center justify-center text-[10px] text-ink-hint font-medium">
            ?
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TaskCard
