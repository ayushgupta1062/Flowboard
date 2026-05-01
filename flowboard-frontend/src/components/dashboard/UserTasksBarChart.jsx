import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import Spinner from '../common/Spinner'

const UserTasksBarChart = ({ data = [], loading }) => {
  if (loading) {
    return (
      <div className="h-[280px] flex items-center justify-center">
        <Spinner size={32} />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-ink-hint italic text-sm">
        No task data available
      </div>
    )
  }

  const chartData = data.map(item => ({
    name: item.userName?.split(' ')[0] || 'Unassigned',
    count: item.taskCount
  }))

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E3F5" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6B6884' }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6B6884' }}
          />
          <Tooltip
            cursor={{ fill: '#F8F7FF' }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid #E5E3F5',
              boxShadow: '0 4px 20px rgba(108, 99, 255, 0.1)'
            }}
          />
          <Bar 
            dataKey="count" 
            radius={[6, 6, 0, 0]} 
            barSize={32}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index % 2 === 0 ? '#6C63FF' : '#A855F7'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default UserTasksBarChart
