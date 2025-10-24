import Layouts from '@/layouts/Layouts';
import SideNav from '@/layouts/components/SideNav';
import SideList from '@/layouts/components/SideList';
import TopBar from '@/layouts/components/TopBar';
import MainContent from '@/layouts/components/MainContent';

function App() {
  return (
    <Layouts
      sidenav={<SideNav />}
      sideList={<SideList />}
      top={<TopBar />}
      main={<MainContent />}
    />
  );
}

export default App;
