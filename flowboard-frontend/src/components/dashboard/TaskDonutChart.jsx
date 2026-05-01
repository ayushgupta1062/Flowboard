import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Spinner from '../common/Spinner'

const TaskDonutChart = ({ todoCount, inProgressCount, doneCount, loading }) => {
  if (loading) {
    return (
      <div className="h-[240px] flex items-center justify-center">
        <Spinner size={32} />
      </div>
    )
  }

  const data = [
    { name: 'To Do', value: todoCount || 0, color: '#6C63FF' },
    { name: 'In Progress', value: inProgressCount || 0, color: '#F97316' },
    { name: 'Done', value: doneCount || 0, color: '#22C55E' },
  ].filter(item => item.value > 0)

  const total = (todoCount || 0) + (inProgressCount || 0) + (doneCount || 0)

  if (total === 0) {
    return (
      <div className="h-[240px] flex flex-col items-center justify-center text-ink-hint">
        <div className="w-24 h-24 rounded-full border-4 border-page flex items-center justify-center mb-2">
          <span className="text-sm font-medium">0</span>
        </div>
        <p className="text-xs">No tasks yet</p>
      </div>
    )
  }

  return (
    <div className="h-[240px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={65}
            outerRadius={95}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            cornerRadius={6}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid #E5E3F5',
              boxShadow: '0 4px 20px rgba(108, 99, 255, 0.1)'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-ink">{total}</span>
        <span className="text-[10px] uppercase tracking-wider font-bold text-ink-hint">Total</span>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] font-medium text-ink-muted">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskDonutChart
