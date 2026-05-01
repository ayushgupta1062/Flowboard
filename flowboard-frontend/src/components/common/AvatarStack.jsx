import React from 'react'
import Avatar from './Avatar'

const AvatarStack = ({ members = [], max = 4, size = 32, className = '' }) => {
  const visibleMembers = members.slice(0, max)
  const remainingCount = members.length - max

  return (
    <div className={`flex items-center -space-x-2 ${className}`}>
      {visibleMembers.map((member, idx) => (
        <div key={member.id} className="relative transition-transform hover:scale-110 hover:z-10" style={{ zIndex: visibleMembers.length - idx }}>
          <Avatar 
            name={member.name} 
            size={size} 
            className="ring-2 ring-white" 
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div 
          style={{ width: size, height: size, zIndex: 0 }}
          className="bg-[#F3F4F6] text-[#6B6884] rounded-full flex items-center justify-center text-xs font-semibold ring-2 ring-white"
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

export default AvatarStack
