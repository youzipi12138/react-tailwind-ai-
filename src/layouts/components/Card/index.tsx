import { avatar } from '@/assets';
import { Icon } from '@lobehub/ui';
import { LogOut } from 'lucide-react';
import { useUserHooks } from '@/hooks/useUserHooks';

const Usercard = () => {
  const { logout } = useUserHooks();

  const handleLogout = () => {
    // 清除用户状态和 token
    logout();
    // 使用 replace 跳转，不在历史记录中留下条目，无法返回
    window.location.replace('/login');
  };

  return (
    <div className='bg-myModalBgColor m-4 h-[400px] w-[250px] rounded-md'>
      <div className='flex items-center gap-3 p-4'>
        <div className='h-[35px] w-[35px] shrink-0 overflow-hidden rounded-full'>
          <img
            src={avatar}
            alt=''
            className='h-full w-full cursor-pointer rounded-full object-cover'
          ></img>
        </div>
        <div className='text-myTexthighlight font-semibold'>
          <h1 className='m-0 text-sm leading-tight'>ren ran</h1>
          <p className='text-myTextColor m-0 text-xs leading-tight'>
            123123123123123123
          </p>
        </div>
      </div>
      <div
        onClick={handleLogout}
        className='hover:bg-MyMenuHoverColor border-borderColor mt-40 flex h-[55px] cursor-pointer items-center gap-2 border-t-2 p-4'
      >
        <Icon icon={LogOut}></Icon>
        <span>退出登录</span>
      </div>
    </div>
  );
};

export default Usercard;
