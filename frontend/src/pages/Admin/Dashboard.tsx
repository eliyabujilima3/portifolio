import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiSearch,
  FiTrash2,
  FiMail,
  FiCheckCircle,
  FiDownload,
  FiInbox,
} from "react-icons/fi";
import {
  fetchMessages,
  fetchStats,
  markMessageRead,
  deleteMessage,
  downloadMessagesCsv,
  type ContactMessage,
} from "../../api/client";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <p className="text-2xl font-display font-bold text-navy dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, today: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [msgData, statData] = await Promise.all([
        fetchMessages({ search }),
        fetchStats(),
      ]);
      setMessages(msgData.messages);
      setStats(statData);
    } catch (err) {
      // Token likely invalid/expired — send back to login.
      window.localStorage.removeItem("admin_token");
      navigate("/admin");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    load();
  }, [load]);

  const handleLogout = () => {
    window.localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  const toggleRead = async (m: ContactMessage) => {
    await markMessageRead(m.id, !m.read);
    load();
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this message permanently?")) return;
    await deleteMessage(id);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-light">
      <header className="bg-white dark:bg-navy-light border-b border-gray-100 dark:border-white/5 sticky top-0 z-10">
        <div className="section-container flex items-center justify-between h-16">
          <h1 className="font-display font-bold text-navy dark:text-white flex items-center gap-2">
            <FiInbox className="text-royal" /> Admin Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 dark:border-white/10 text-navy dark:text-white"
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
            >
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Messages" value={stats.total} />
          <StatCard label="New Messages" value={stats.unread} />
          <StatCard label="Read Messages" value={stats.read} />
          <StatCard label="Today's Messages" value={stats.today} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-royal/50 text-gray-700 dark:text-gray-200"
            />
          </div>
          <button
            onClick={() => downloadMessagesCsv()}
            className="btn-outline !py-2 !px-4 text-sm"
          >
            <FiDownload size={15} /> Export CSV
          </button>
        </div>

        <div className="card overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-gray-400 text-sm">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="p-8 text-center text-gray-400 text-sm">No messages found.</p>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {messages.map((m) => (
                <div key={m.id} className={`p-5 ${!m.read ? "bg-royal/5" : ""}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-navy dark:text-white text-sm">
                        {m.name}{" "}
                        <span className="font-normal text-gray-400">— {m.email}</span>
                      </p>
                      <p className="text-sm text-royal font-medium mt-0.5">{m.subject}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(m.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                    {m.message}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => toggleRead(m)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-royal transition-colors"
                    >
                      {m.read ? <FiCheckCircle size={13} /> : <FiMail size={13} />}
                      Mark as {m.read ? "unread" : "read"}
                    </button>
                    <button
                      onClick={() => remove(m.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
