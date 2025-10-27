import React from 'react';
import { Icon } from '@lobehub/ui';
import type { LucideIcon } from 'lucide-react';
interface LayoutsProps {
  icon: LucideIcon;
  title: string;
  active: boolean;
}

const MenuItemAck: React.FC<LayoutsProps> = props => {
  return (
    <div
      className={`mx-2 my-2 flex h-[45px] cursor-pointer items-center rounded-sm text-[14px] transition-colors duration-200 ${
        props.active ? 'bg-borderColor' : 'hover:bg-secondaryBorderColor'
      }`}
    >
      <Icon
        icon={props.icon}
        size={16}
        className='ml-5'
        color={
          props.active
            ? 'var(--color-lightTextColor)'
            : 'var(--color-darkTextColor)'
        }
      />
      <span
        className={`ml-2 transition-colors duration-200 ${
          props.active ? 'text-lightTextColor' : 'text-darkTextColor'
        }`}
      >
        {props.title}
      </span>
    </div>
  );
};

export default MenuItemAck;
