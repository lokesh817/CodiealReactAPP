// import { useEffect, useState } from "react";
// import { getPosts } from "../api";
import { useAuth } from '../hooks';
import Loader from './Loader';
import Navbar from "./Navbar";
import { Home,Login,Logout} from "../pages";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const auth=useAuth();
  // const [posts,setposts]=useState([]);
  // const [loading,setLoading]=useState(true);
  // useEffect(()=>{  
  //   const fetchPosts=async ()=>{
  //     const response=await getPosts();
  //     console.log('response :' ,response);
  //     if(response.success){
  //       setposts(response.data.posts)
  //     }
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // },[]);
  if(auth.loading){
    return <Loader />
  }
  
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home posts={[]} />} />
          <Route path="/Login" element={<Login  />} />
          <Route path="/Logout" element={<Logout  />} />
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;
