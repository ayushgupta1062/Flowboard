import React from 'react'
import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ListTodo
} from 'lucide-react'
import { Link } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import StatCard from '../components/dashboard/StatCard'
import TaskDonutChart from '../components/dashboard/TaskDonutChart'
import UserTasksBarChart from '../components/dashboard/UserTasksBarChart'
import Badge from '../components/common/Badge'
import Avatar from '../components/common/Avatar'
import { formatDueDate } from '../utils/dateUtils'

const Dashboard = () => {
  const { data, loading, error } = useDashboard()

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-danger-light text-danger rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-ink">Dashboard Error</h3>
        <p className="text-ink-muted text-sm mt-2">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold text-ink tracking-tight">Overview</h2>
        <p className="text-sm text-ink-muted mt-1">Here's what's happening across your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Projects" 
          value={data?.totalProjects} 
          icon={FolderKanban} 
          color="primary"
          loading={loading}
        />
        <StatCard 
          title="Active Tasks" 
          value={(data?.todoCount || 0) + (data?.inProgressCount || 0)} 
          icon={ListTodo} 
          color="accent"
          loading={loading}
        />
        <StatCard 
          title="Completed" 
          value={data?.doneCount} 
          icon={CheckCircle2} 
          color="success"
          loading={loading}
        />
        <StatCard 
          title="Overdue" 
          value={data?.overdueCount} 
          icon={AlertCircle} 
          color="danger"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Distribution */}
        <div className="lg:col-span-1 bg-white rounded-[24px] border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-ink">Task Distribution</h3>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <TaskDonutChart 
            todoCount={data?.todoCount} 
            inProgressCount={data?.inProgressCount} 
            doneCount={data?.doneCount}
            loading={loading}
          />
        </div>

        {/* User Stats */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-border p-6 shadow-sm">
          <h3 className="text-base font-bold text-ink mb-8">Tasks per Member</h3>
          <UserTasksBarChart data={data?.tasksByUser} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="bg-white rounded-[24px] border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-ink">Recently Added Tasks</h3>
            <Link to="/projects" className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-16 w-full" />
              ))
            ) : data?.recentTasks?.length > 0 ? (
              data.recentTasks.map(task => (
                <Link 
                  key={task.id} 
                  to={`/projects/${task.projectId}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-page hover:border-primary-light hover:bg-page transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      task.status === 'DONE' ? 'bg-success' : 
                      task.status === 'IN_PROGRESS' ? 'bg-warning' : 'bg-ink-hint'
                    }`} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink truncate group-hover:text-primary transition-colors">{task.title}</p>
                      <p className="text-[11px] text-ink-muted truncate">{task.projectName}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge variant={task.priority === 'HIGH' ? 'danger' : task.priority === 'MEDIUM' ? 'warning' : 'neutral'}>
                      {task.priority}
                    </Badge>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-ink-muted italic py-4 text-center">No recent tasks</p>
            )}
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="bg-white rounded-[24px] border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-ink flex items-center gap-2">
              Overdue Tasks
              {data?.overdueCount > 0 && (
                <span className="w-5 h-5 bg-danger text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {data.overdueCount}
                </span>
              )}
            </h3>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-16 w-full" />
              ))
            ) : data?.overdueTasks?.length > 0 ? (
              data.overdueTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border border-danger/10 bg-danger-light/30">
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar name={task.assignee?.name || 'Unassigned'} size={32} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink truncate">{task.title}</p>
                      <p className="text-[11px] text-danger font-semibold">Overdue: {formatDueDate(task.dueDate)}</p>
                    </div>
                  </div>
                  <Link to={`/projects/${task.projectId}`} className="p-2 text-ink-hint hover:text-primary transition-colors">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink-muted italic py-4 text-center">No overdue tasks. Good job!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
