import React, { useContext , useState} from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cart/cartContext';

const Navbar = ({hoverCart,hoverCover,stateUser}) => {

    const {state} = useContext(CartContext)
    const [classShow , setClassShow] = useState(false)

    let user;
   if (stateUser.users !== null && stateUser.token !== null){
    const indexUser = stateUser.users.findIndex(item => item.email === stateUser.user.email)
    user = stateUser.users[indexUser]
   
   }

    const clickHandler =()=>{
       
        hoverCart('active')
        hoverCover('active')
    }

    const navClassHandler =()=>{
       
        setClassShow(!classShow)
     }

    return ( 
      <header>
           <nav className={classShow ? 'header-nav active' : 'header-nav'}>
            <ul className="navigation">
                <li className="" ><Link to='/' onClick={navClassHandler}>خانه</Link></li>
                <li className="" ><Link to='/' onClick={navClassHandler}  >اخد نمایندگی</Link></li>
                <li className="" ><Link to='/' onClick={navClassHandler} >سفارش اینترنتی</Link></li>
                </ul>
           </nav>
           <div className="hamberger-menu" onClick={navClassHandler}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
           <div className='nav-logo'>
               <img src='../images/main-img/WebsiteLogo.jpg' alt='logo'/>
           </div>
           <div className='profile'>
               {user ? <span><span> {user.name} /</span><Link to='/dashboard'> داشبورد </Link></span> : <span><Link to='/login'>ورود</Link>/<Link to='/signup'>ثبت نام</Link></span>}
               <Link onClick={clickHandler} to="/">
               <i className=" icon-counter fas fa-cart-plus"></i>
                   <span className='counter-show'>{state.counter}</span>
                </Link>
           </div>
      </header>

     
     );
}
 
export default Navbar;