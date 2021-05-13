import React,{useEffect} from "react";
import styled from "styled-components";
import { selectUserName, selectUserPhoto ,setUserLogin,setSignOut} from "../features/user/userSlice";
import { useSelector,useDispatch } from "react-redux";
import {auth,provider} from '../firebase'
import {useHistory} from 'react-router-dom'
function Header() {
    const history = useHistory()
    const dispatch = useDispatch()
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
     auth.onAuthStateChanged(async(user)=>{
         if(user){
            dispatch(setUserLogin({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL
            }))
history.push('/')
         }
     })
  }, [])

  const signIn = ()=>{
auth.signInWithPopup(provider)
.then((result)=>{
    let user =result.user
  dispatch(setUserLogin({
      name:user.displayName,
      email:user.email,
      photo:user.photoURL
  }))
})
  }
  const signOut = () =>{
      auth.signOut()
      .then(()=>{
          dispatch(setSignOut())
          history.push("/login")
      })
  }
  return (
    <Nav>
      <Logo src="/images/logo.svg" />

      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a>
              <img src="/images/home-icon.svg" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" />
              <span>Original</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>

          <UserImg 
          onClick={signOut}
          src=" https://lh3.googleusercontent.com/ogw/ADGmqu82bd8c6d8DkFE-HTXmDXkMUsoG4W1cbdk9HBDF3Q=s83-c-mo" />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;
const Logo = styled.img`
  width: 80px;
`;
const NavMenu = styled.div`
  display: flex;
  flex: 1;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
  }
  img {
    height: 20px;
    color: white;
  }
  span {
    color: white;
  }
  span:hover {
    border-bottom: 2px solid white;
  }
`;
const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
`;
const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
const LoginContainer = styled.div`
display:flex;
flex:1;
justify-content:flex-end;
`