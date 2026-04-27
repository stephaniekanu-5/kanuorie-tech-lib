import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export default function Admin() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [form, setForm] = useState({
    title: "",
    desc: "",
    category: "",
    img: "",
    link: "",
  });

  const [charts, setCharts] = useState({
  userGrowth: [],
  bookTrend: [],
});

const fetchCharts = async () => {
  try {
    const res = await API.get("/admin/stats");
    setCharts(res.data.charts);
  } catch (err) {
    console.error(err);
  }
};


  // 📥 FETCH BOOKS
  const fetchBooks = async () => {
    try {
      setFetching(true);
      const res = await API.get("/books");
      console.log("Books:", res.data); // DEBUG
      setBooks(res.data || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
  fetchStats();
  fetchUsers();
  fetchCharts();
}, []);

 const fetchStats = async () => {
  try {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  } catch (err) {
    console.error(err);
  }
};

const fetchUsers = async () => {
  try {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchStats();
  fetchUsers();
}, []);

  // 📝 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category) {
      alert("Title and Category required");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        await API.put(`/books/${editingId}`, form);
      } else {
        await API.post("/books", form);
      }

      setForm({
        title: "",
        desc: "",
        category: "",
        img: "",
        link: "",
      });

      setEditingId(null);
      fetchBooks();

    } catch (err) {
      console.error("Error saving book:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT
  const handleEdit = (book) => {
    setForm({
      title: book.title || "",
      desc: book.desc || "",
      category: book.category || "",
      img: book.img || "",
      link: book.link || "",
    });

    setEditingId(book.id);
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;

    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleSendNotification = async () => {
  try {
    await API.post("/notifications", {
      userId: selectedUserId,
      title: "New Course Assigned",
      message: "You have been enrolled in React course",
      type: "admin",
    });

    alert("Notification sent!");
  } catch (err) {
    console.error(err);
  }
};

const handleBroadcast = async () => {
  if (!broadcastMsg) return alert("Enter message");

  try {
    await API.post("/notifications/broadcast", {
      title: "📢 Announcement",
      message: broadcastMsg,
      type: "broadcast",
    });

    alert("Broadcast sent to ALL users 🚀");
    setBroadcastMsg("");
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6"> Welcome Admin!</h1>

        <button onClick={handleSendNotification}
          className="border rounded-lg mb-4 bg-purple-600 text-white p-2"
          >
          Send Notification
        </button>

      <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-2">Broadcast</h2>

          <input
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="Enter message for all users..."
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={handleBroadcast}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Send to All Users
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Enrolled Courses</h3>
          <p className="text-2xl font-bold">{stats.totalCourses}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">List Of Users:</h2>
          {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between border-b py-2"
          >
          <div>
            <p>{user.email}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
          <select
            className="border p-2 mb-3 w-full"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
          <button
            onClick={async () => {
            await API.delete(`/admin/users/${user.id}`);
            fetchUsers();
            fetchStats();
            }}
            className="text-red-500"
           >
            Delete
          </button>
        </div>
        ))}
      </div>

            {/* 📊 CHARTS SECTION */}
        <div className="bg-white p-4 rounded shadow mt-8">
          <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>

          {/* USER GROWTH CHART */}
          <div className="mb-8">
            <h3 className="text-gray-600 mb-2">User Growth (7 Days)</h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={charts.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8b5cf6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BOOK TREND CHART */}
          <div>
            <h3 className="text-gray-600 mb-2">Book Upload Trend</h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={charts.bookTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="books" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-8 bg-white p-4 rounded shadow">
          <h1 className="text-2xl">ADD RESOURCES:</h1>
          <input
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="desc"
            value={form.desc}
            placeholder="Description"
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="category"
            value={form.category}
            placeholder="Category"
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="img"
            value={form.img}
            placeholder="Image URL"
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="link"
            value={form.link}
            placeholder="Link"
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Resource"
              : "ENTER"}
          </button>
        </form>

        {/* LOADING */}
        {fetching && (
          <p className="text-center text-gray-500">Loading resources...</p>
        )}

        {/* EMPTY */}
        {!fetching && books.length === 0 && (
          <p className="text-center text-gray-500">
            No resources added. Add one 👆
          </p>
        )}

        {/* LIST */}
        <div className="grid gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="border p-4 rounded flex justify-between items-center bg-white shadow-sm"
            >
              <div>
                <h2 className="font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-500">{book.category}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(book)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}