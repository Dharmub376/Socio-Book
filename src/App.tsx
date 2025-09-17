import { Route, Routes } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Settings from "./pages/Settings";
import Bookmarks from "./pages/Bookmarks";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPost from "./components/EditPost";
import Error404 from "./pages/Error404";
import Reels from "./pages/Reels";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/post/" element={<Post />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/reels" element={ <Reels />}/>
        <Route path="*" element={<Error404 />} />

        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/post" element={
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        } />
        <Route path="/bookmarks" element={
          <ProtectedRoute>
            <Bookmarks />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;