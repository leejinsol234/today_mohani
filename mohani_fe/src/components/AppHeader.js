import "../Layout.css";


function App_header({username}){

    return(<>
    <div className="header">
      <span>{username} 님, 안녕하세요!</span>
    <span className="header_logout"><a href="#">로그아웃</a></span>    
    </div>
    
    </>)
};

export default App_header;


