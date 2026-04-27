import { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import defaultResources from "../data/resources";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Profile() {
  const [savedCourses, setSavedCourses] = useState([]);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const avatarInputRef = useRef();
  const coverInputRef = useRef();

  // 🔐 Redirect if no user
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // 📦 Fetch data
  useEffect(() => {
     fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCourses(), fetchResources()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setSavedCourses(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResources = async () => {
  try {
    const res = await API.get("/books");

    const apiResources = res.data || [];

    // ✅ Merge both
    const combined = [...defaultResources, ...apiResources];

    // ✅ Remove duplicates (important!)
    const unique = Array.from(
      new Map(combined.map((r) => [r.title, r])).values()
    );

    setResourcesCount(unique.length);
  } catch (err) {
    console.error(err);

    // fallback to default only
    setResourcesCount(defaultResources.length);
  }
};

  // 📊 STATS
  const totalCourses = savedCourses.length;

  const completedCourses = savedCourses.filter(
    (c) => c.progress === 100
  ).length;

  const avgProgress =
    totalCourses > 0
      ? Math.round(
          savedCourses.reduce(
            (acc, c) => acc + (c.progress || 0),
            0
          ) / totalCourses
        )
      : 0;

  // 🔥 Safe streak (no crash if column missing)
  const streak = savedCourses.filter((c) => {
    if (!c?.lastProgressUpdate) return false;
    const last = new Date(c.lastProgressUpdate);
    const today = new Date();
    return (
      last.getDate() === today.getDate() &&
      last.getMonth() === today.getMonth()
    );
  }).length;

  // 📈 CHART DATA
  const chartData = savedCourses.map((c, i) => ({
    name: `Course ${i + 1}`,
    progress: c.progress || 0,
  }));

  // ✏️ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💾 SAVE PROFILE
  const handleSave = async () => {
    try {
      setUploading(true);

      const res = await API.put("/auth/update", user);

      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setUploading(false);
    }
  };


  // 🖱️ DRAG
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleUpload(file, type);
  };

  const handleAvatarUpload = (file) => handleUpload(file, "avatar");
  const handleCoverUpload = (file) => handleUpload(file, "cover");

  // 📦 UPLOAD
  const handleUpload = async (file, type) => {
    if (!file) return;

    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("image", file);

      const res = await API.post("/upload", formData, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      setUser((prev) => ({
        ...prev,
        [type]: res.data.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 mt-10 pb-20">
        <h1 className="text-4xl font-bold mb-10">My Profile</h1>

        {/* COVER */}
        <div
          className="h-48 bg-gray-200 rounded-2xl mb-[-60px] relative overflow-hidden cursor-pointer"
          onClick={() => isEditing && coverInputRef.current.click()}
          onDrop={(e) => handleDrop(e, "cover")}
          onDragOver={handleDragOver}
        >
          <img
            src={
              user?.cover ||
              "https://via.placeholder.com/800x300?text=Upload+Cover"
            }
            className="w-full h-full object-cover"
          />
          {isEditing && ( <input type="file" ref={coverInputRef} className="hidden" onChange={(e) => handleCoverUpload(e.target.files[0])} /> )}
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-md p-8 pt-20 mb-10 relative">
          {/* AVATAR */}
          <div
            className="absolute -top-12 left-8 cursor-pointer"
            onClick={() => isEditing && avatarInputRef.current.click()}
            onDrop={(e) => handleDrop(e, "avatar")}
            onDragOver={handleDragOver}
          >
            <img
              src={
                user?.avatar ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
            {isEditing && ( <input type="file" ref={avatarInputRef} className="hidden" onChange={(e) => handleAvatarUpload(e.target.files[0])} /> )}
          </div>
          {/* PROGRESS BAR */} 
          {uploading && (
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-600 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Uploading... {progress}%
              </p>
            </div>
          )}
          {/* NAME */}
          <div className="mb-6 mt-4">
            <label className="text-sm text-gray-500">Full Name</label>
            {isEditing ? (
              <input
                name="name"
                value={user?.name || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-2"
              />
            ) : (
              <p className="text-xl font-semibold mt-2">
                {user?.name || "Your Name"}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label className="text-sm text-gray-500">Email</label>
            {isEditing ? (
              <input
                name="email"
                value={user?.email || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">{user?.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-500">Role</label>
            <p className="text-gray-700 mt-2">{user?.role}</p>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-500">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={user?.bio || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">{user?.bio || "Your bio..."}</p>
            )}
          </div>


          {/* BUTTON */}
          <button
            onClick={() =>
              isEditing ? handleSave() : setIsEditing(true)
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-6 my-10">
          <StatCard 
            title="Enrolled Courses" 
            value={totalCourses} 
            onClick={() => navigate("/courses")}
            className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer text-blue-600 hover:shadow-lg transition"
            />
          <StatCard title="Completed Courses" value={completedCourses} />
          <StatCard title="Avg Progress" value={`${avgProgress}%`} />
          <StatCard
            title="Available Resources"
            value={resourcesCount}
            onClick={() => navigate("/library")}
            className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer text-blue-600 hover:shadow-lg transition"
          />
          <StatCard title="Current Streak" value={`${streak} day(s)`} />
        </div>
        
        {/* ANALYTICS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="progress" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, onClick, className = "" }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-6 rounded-xl shadow text-center ${onClick ? "cursor-pointer hover:shadow-lg transition" : ""} ${className}`}
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}