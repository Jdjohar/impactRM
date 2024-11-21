
import { Link } from "react-router-dom";
import logo from "../../public/Rubrik.png"

const Header = () => {
  const handleLogout = () => {

    localStorage.removeItem('UserauthToken');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserauthTokenExpiry');
    localStorage.removeItem('Userrole');
    // window.location.reload(true);
  }

  return (
    <header style={{background:'#202c5e',paddingBottom:'30px', paddingTop:'30px'}}>
      <div className="py-5" >
       
          <img src={logo} className="m-auto d-block"/>
     

        {/* for large screens */}
        {/* <Navbar /> */}
        

        {/* for small screens */}
        {/* <MobileNav /> */}
      </div>
    </header>
  );
};

export default Header;
