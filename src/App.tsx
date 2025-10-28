import Layouts from '@/layouts/Layouts';
import SideNav from '@/layouts/components/SideNav';
import SideList from '@/layouts/components/SideList/SideList';
import TopBar from '@/layouts/components/TopBar';
import AppRouter from '@/router';
import { ConfigProvider } from 'antd';

function App() {
  // const [primary, setPrimary] = React.useState('#1677ff');
  return (
    <>
      {/* <ColorPicker
        showText
        value={primary}
        onChange={color => setPrimary(color.toHexString())}
      /> */}
      <ConfigProvider
        theme={{
          token: {
            // 主色调
            colorPrimary: '#000',
            mycolorlogo: 'rgba(0, 246, 255, 0.5)',
            // 完全自定义的 token 类名
            myModalBgColor: '#1A1A1A', // 例如：自定义一个字符串类型的令牌
            myInputBgColor: '#272727',
            myInputBgHover: '#313131',
            myInputBorder: '#1A1A1A',
            myInputBorderFoucs: '#fff',
            myButtonColor: '#EEEEEE',
            myButtonColorHover: '#FFFFFF',
            myTextColor: 'rgb(111, 111, 111)',
            myTexthighlight: '#fff',
            myTextDarkColor: '#000',
            MyCloseActiveColor: 'rgba(255,255,255,0.16)',

            MyMenuHoverColor: 'rgb(35, 35, 35)',
          },
          components: {
            Dropdown: {
              colorBgElevated: '#272727', // 下拉菜单背景色
              colorText: '#fff', // 文字颜色
              controlItemBgHover: '#313131', // hover 背景色
              colorTextDescription: 'rgb(111, 111, 111)', // 描述文字颜色
            },
          },
        }}
        // prefixCls='lobe'
      >
        <Layouts
          sidenav={<SideNav />}
          sideList={<SideList />}
          top={<TopBar />}
          main={<AppRouter />}
          // main={
          //   <div>
          //     <Button type='primary'>Submit</Button> <Input />
          //   </div>
          // }
        />
      </ConfigProvider>
    </>
  );
}

export default App;
