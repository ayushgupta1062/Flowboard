import React from 'react'
import { 
  Users, 
  Settings, 
  Plus, 
  Share2,
  Calendar,
  MoreHorizontal
} from 'lucide-react'
import Button from '../common/Button'
import AvatarStack from '../common/AvatarStack'
import Badge from '../common/Badge'

const ProjectHeader = ({ project, members = [], onAddMember, onAddTask, onSettings }) => {
  if (!project) return null

  const isProjectAdmin = project.myRole === 'ADMIN'

  return (
    <div className="bg-white rounded-[20px] border border-border p-6 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-ink">{project.name}</h2>
            <Badge variant="primary">Active</Badge>
          </div>
          <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
            {project.description || 'Manage your project tasks and collaborate with your team in real-time.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-end gap-2 pr-4 border-r border-border hidden sm:flex">
            <span className="text-[10px] font-bold text-ink-hint uppercase tracking-widest">Team</span>
            <div className="flex items-center gap-3">
              <AvatarStack members={members} size={32} />
              {isProjectAdmin && (
                <button 
                  onClick={onAddMember}
                  className="w-8 h-8 rounded-full border border-dashed border-border flex items-center justify-center text-primary hover:border-primary hover:bg-primary-light transition-all"
                  title="Add Member"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="md" 
              icon={Share2}
              onClick={() => {}}
              className="hidden sm:flex"
            >
              Share
            </Button>
            {isProjectAdmin && (
              <Button 
                variant="primary" 
                size="md" 
                icon={Plus}
                onClick={onAddTask}
              >
                New Task
              </Button>
            )}
            {isProjectAdmin && (
              <Button 
                variant="secondary" 
                size="md" 
                className="!p-2.5"
                onClick={onSettings}
              >
                <Settings size={20} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectHeader
