import React from 'react'
import { TagsProps } from '@/utils/interfaces'

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="sm:flex hidden items-center space-x-3 text-[#BBBBBB]">
      {tags.map((tag, i) => (
        <div
          key={i}
          className="flex border border-[#212D4A] h-[32px] w-[90px] justify-center
            items-center rounded-md cursor-pointer"
        >
          {tag}
        </div>
      ))}
    </div>
  )
}

export const TagsSm: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="flex sm:hidden items-center space-x-3 text-[#BBBBBB] flex-wrap">
      {tags.slice(0, 2).map((tag, i) => (
        <div
          key={i}
          className="flex border border-[#212D4A] h-[32px] w-[90px] justify-center
            items-center rounded-md cursor-pointer"
        >
          {tag}
        </div>
      ))}
    </div>
  )
}
