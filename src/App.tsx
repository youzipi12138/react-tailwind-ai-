import Layouts from '@/layouts/Layouts';
import SideNav from '@/layouts/components/SideNav';
import SideList from '@/layouts/components/SideList';
import TopBar from '@/layouts/components/TopBar';
import AppRouter from '@/router';

function App() {
  return (
    <Layouts
      sidenav={<SideNav />}
      sideList={<SideList />}
      top={<TopBar />}
      main={<AppRouter />}
    />
  );
}

export default App;
