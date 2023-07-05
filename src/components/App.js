import { useEffect, useState } from "react";
import { getPosts } from "../api";
import Loader from './Loader';
import Navbar from "./Navbar";
import { Home} from "../pages";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [posts,setposts]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{  
    const fetchPosts=async ()=>{
      const response=await getPosts();
      console.log('response :' ,response);
      if(response.success){
        setposts(response.data.posts)
      }
      setLoading(false);
    };
    fetchPosts();
  },[]);
  if(loading){
    return <Loader />
  }
  
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home posts={posts} />} />
          {/* <Route path="/Login" element={<Login  />} /> */}
          <Route exact path="/" element={<Home posts={posts} />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
