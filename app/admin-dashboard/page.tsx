"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Download,
  Calendar,
  Mail,
} from "lucide-react";

interface Attendee {
  id: number;
  name: string;
  email: string;
  goodwill_message: string | null;
  access_code: string;
  created_at: string;
}

interface Stats {
  total: number;
  withMessages: number;
  recentWeek: number;
  perDay: { date: string; count: string }[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState<Stats | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Check if already authenticated in session
  useEffect(() => {
    const authenticated = sessionStorage.getItem("adminAuth");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchData(sessionStorage.getItem("adminPassword") || "");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "stats" }),
      });

      if (response.ok) {
        sessionStorage.setItem("adminAuth", "true");
        sessionStorage.setItem("adminPassword", password);
        setIsAuthenticated(true);
        await fetchData(password);
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (pass: string) => {
    try {
      // Fetch stats
      const statsRes = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass, action: "stats" }),
      });
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }

      // Fetch attendees
      const attendeesRes = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass, action: "attendees" }),
      });
      if (attendeesRes.ok) {
        const data = await attendeesRes.json();
        setAttendees(data.attendees);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminPassword");
    setIsAuthenticated(false);
    setPassword("");
    setStats(null);
    setAttendees([]);
  };

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.access_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDeleteModal = (attendeeId: number) => {
    setPendingDeleteId(attendeeId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    setActionLoading(true);
    try {
      const pass = sessionStorage.getItem("adminPassword") || password;
      const res = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: pass,
          action: "delete",
          id: pendingDeleteId,
        }),
      });
      if (res.ok) {
        setAttendees((prev) => prev.filter((a) => a.id !== pendingDeleteId));
        fetchData(pass);
        setConfirmOpen(false);
        setPendingDeleteId(null);
      } else {
        setError("Failed to delete attendee");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while deleting attendee");
    } finally {
      setActionLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Access Code",
      "Goodwill Message",
      "RSVP Date",
    ];
    const rows = attendees.map((a) => [
      a.name,
      a.email,
      a.access_code,
      a.goodwill_message || "",
      new Date(a.created_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wedding-rsvps-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Shade & Tolu&apos;s Wedding</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                placeholder="Enter admin password"
                disabled={loading}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-rose-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Wedding Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              RSVP Analytics & Attendee Management
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-white transition-all shadow-md"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-rose-500 to-rose-600 border-0 text-white shadow-xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-rose-100">
                    Total RSVPs
                  </CardTitle>
                  <Users className="h-5 w-5 text-rose-100" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-1">
                  {stats?.total || 0}
                </div>
                <p className="text-xs text-rose-100">Total confirmed guests</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-purple-100">
                    With Messages
                  </CardTitle>
                  <MessageSquare className="h-5 w-5 text-purple-100" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-1">
                  {stats?.withMessages || 0}
                </div>
                <p className="text-xs text-purple-100">
                  {stats?.total
                    ? Math.round((stats.withMessages / stats.total) * 100)
                    : 0}
                  % left goodwill messages
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 border-0 text-white shadow-xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-pink-100">
                    Last 7 Days
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-pink-100" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-1">
                  {stats?.recentWeek || 0}
                </div>
                <p className="text-xs text-pink-100">Recent confirmations</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-0 text-white shadow-xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-amber-100">
                    Avg per Day
                  </CardTitle>
                  <Calendar className="h-5 w-5 text-amber-100" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-1">
                  {stats?.perDay?.length
                    ? Math.round(stats.total / stats.perDay.length)
                    : 0}
                </div>
                <p className="text-xs text-amber-100">Daily average RSVPs</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart - RSVP Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">RSVP Trend</CardTitle>
                <CardDescription>
                  Daily confirmations over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rsvps: {
                      label: "RSVPs",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={stats?.perDay?.slice().reverse() || []}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                        fontSize={12}
                      />
                      <YAxis fontSize={12} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              );
                            }}
                          />
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#e11d48"
                        strokeWidth={3}
                        dot={{ fill: "#e11d48", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Engagement Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Engagement Rate</CardTitle>
                <CardDescription>
                  Message participation breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    withMessages: {
                      label: "With Messages",
                      color: "#a855f7",
                    },
                    withoutMessages: {
                      label: "Without Messages",
                      color: "#e879f9",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "With Messages",
                            value: stats?.withMessages || 0,
                            fill: "#a855f7",
                          },
                          {
                            name: "Without Messages",
                            value:
                              (stats?.total || 0) - (stats?.withMessages || 0),
                            fill: "#e879f9",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          {
                            name: "With Messages",
                            value: stats?.withMessages || 0,
                          },
                          {
                            name: "Without Messages",
                            value:
                              (stats?.total || 0) - (stats?.withMessages || 0),
                          },
                        ].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? "#a855f7" : "#e879f9"}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Attendees List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">Attendee List</CardTitle>
                  <CardDescription className="mt-1">
                    Complete list of all wedding RSVPs
                  </CardDescription>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search attendees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-xl font-medium hover:from-rose-600 hover:to-purple-600 transition-all shadow-md whitespace-nowrap"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Access Code
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Message
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        RSVP Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredAttendees.map((attendee, index) => (
                        <motion.tr
                          key={attendee.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-rose-50/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-gray-800">
                            {attendee.name}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {attendee.email}
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-mono">
                              {attendee.access_code}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                            {attendee.goodwill_message || "-"}
                          </td>
                          <td className="py-3 px-4 text-gray-500 text-sm">
                            {new Date(attendee.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => openDeleteModal(attendee.id)}
                              className="px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>

                {filteredAttendees.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm
                      ? "No attendees found matching your search."
                      : "No RSVPs yet."}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => (!actionLoading ? setConfirmOpen(false) : null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">
                  This will permanently remove the attendee from the list. This
                  action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setConfirmOpen(false)}
                    disabled={actionLoading}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={actionLoading}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {actionLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
