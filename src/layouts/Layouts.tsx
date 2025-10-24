function Layouts() {
  return (
    <div className='layout w-full h-full'>
      <div className='sidebar'>sidebar</div>
      <div className='content'>
        <div className='sideList'>sideList</div>
        <div className='main-content'>
          <div className='topbar'>top</div>
          <div className='main'>main</div>
        </div>
      </div>
    </div>
  );
}

export default Layouts;
