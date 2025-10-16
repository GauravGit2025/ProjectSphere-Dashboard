import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  ChevronDown,
  Search,
  Bell,
  User,
  Briefcase,
  BarChart2,
  Settings,
  LifeBuoy,
  LogOut,
  ExternalLink,
  Calendar,
  Users,
  Target,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

// --- MOCK DATA ---
// In a real application, this would come from a RESTful API.
const mockApiData = {
  user: {
    name: "Alex Wolfe",
    role: "Project Manager",
    avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=AW",
  },
  projects: [
    {
      id: 1,
      name: "Alpha Corp Website Redesign",
      client: "Alpha Corp",
      status: "In Progress",
      deadline: "2025-12-15",
      budget: 150000,
      spent: 85000,
      team: [
        {
          id: 1,
          name: "Dana",
          avatarUrl: "https://placehold.co/100x100/FEE2E2/B91C1C?text=D",
        },
        {
          id: 2,
          name: "Omar",
          avatarUrl: "https://placehold.co/100x100/DBEAFE/1D4ED8?text=O",
        },
        {
          id: 3,
          name: "Priya",
          avatarUrl: "https://placehold.co/100x100/D1FAE5/047857?text=P",
        },
      ],
      tasks: [
        { id: 1, title: "UI/UX Design Mockups", completed: true },
        { id: 2, title: "Frontend Development (React)", completed: false },
        { id: 3, title: "Backend API Integration", completed: false },
        { id: 4, title: "Client Feedback Session #1", completed: true },
      ],
      performance: [
        { name: "Jan", progress: 0 },
        { name: "Feb", progress: 10 },
        { name: "Mar", progress: 25 },
        { name: "Apr", progress: 45 },
        { name: "May", progress: 60 },
        { name: "Jun", progress: 75 },
      ],
    },
    {
      id: 2,
      name: "Beta Solutions Mobile App",
      client: "Beta Solutions",
      status: "On Hold",
      deadline: "2026-02-28",
      budget: 250000,
      spent: 45000,
      team: [
        {
          id: 4,
          name: "Ken",
          avatarUrl: "https://placehold.co/100x100/FEF3C7/92400E?text=K",
        },
        {
          id: 1,
          name: "Dana",
          avatarUrl: "https://placehold.co/100x100/FEE2E2/B91C1C?text=D",
        },
      ],
      tasks: [
        { id: 1, title: "Initial Project Scoping", completed: true },
        { id: 2, title: "Platform Selection", completed: true },
        { id: 3, title: "Awaiting Client Assets", completed: false },
      ],
      performance: [
        { name: "Jan", progress: 5 },
        { name: "Feb", progress: 15 },
        { name: "Mar", progress: 20 },
        { name: "Apr", progress: 20 },
        { name: "May", progress: 20 },
        { name: "Jun", progress: 20 },
      ],
    },
    {
      id: 3,
      name: "Gamma Innovations Data Platform",
      client: "Gamma Innovations",
      status: "Completed",
      deadline: "2025-05-30",
      budget: 320000,
      spent: 310000,
      team: [
        {
          id: 2,
          name: "Omar",
          avatarUrl: "https://placehold.co/100x100/DBEAFE/1D4ED8?text=O",
        },
        {
          id: 3,
          name: "Priya",
          avatarUrl: "https://placehold.co/100x100/D1FAE5/047857?text=P",
        },
        {
          id: 4,
          name: "Ken",
          avatarUrl: "https://placehold.co/100x100/FEF3C7/92400E?text=K",
        },
        {
          id: 5,
          name: "Lila",
          avatarUrl: "https://placehold.co/100x100/E0E7FF/312E81?text=L",
        },
      ],
      tasks: [
        { id: 1, title: "Database Architecture", completed: true },
        { id: 2, title: "Data Ingestion Pipelines", completed: true },
        { id: 3, title: "Visualization Dashboard", completed: true },
        { id: 4, title: "Final UAT", completed: true },
      ],
      performance: [
        { name: "Jan", progress: 10 },
        { name: "Feb", progress: 30 },
        { name: "Mar", progress: 60 },
        { name: "Apr", progress: 90 },
        { name: "May", progress: 100 },
      ],
    },
  ],
};

// --- HELPER FUNCTIONS ---
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);

// --- CONTEXT API for State Management ---
// Provides a way to pass data through the component tree without having to pass props down manually at every level.
const AppContext = React.createContext();

// --- MAIN APP COMPONENT ---
// This is the root component that orchestrates the entire application.
export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);

  // Simulate fetching data from an API
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockApiData);
      setLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const selectedProject = data?.projects.find(
    (p) => p.id === selectedProjectId
  );

  const appContextValue = {
    user: data?.user,
    projects: data?.projects,
    selectedProject,
    setSelectedProjectId,
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {selectedProjectId ? <ProjectDetail /> : <Dashboard />}
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
}

// --- LAYOUT COMPONENTS ---

function Sidebar() {
  const NavItem = ({ icon, text, active }) => (
    <a
      href="#"
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </a>
  );

  return (
    <aside className="w-64 flex-col bg-white border-r border-gray-200 hidden md:flex">
      <div className="flex items-center justify-center h-16 border-b">
        <Briefcase className="h-6 w-6 text-indigo-600" />
        <span className="ml-2 text-xl font-bold text-gray-800">ClientDash</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon={<BarChart2 size={20} />} text="Dashboard" active />
        <NavItem icon={<Briefcase size={20} />} text="Projects" />
        <NavItem icon={<Users size={20} />} text="Clients" />
        <NavItem icon={<Settings size={20} />} text="Settings" />
      </nav>
      <div className="p-4 border-t border-gray-200">
        <NavItem icon={<LifeBuoy size={20} />} text="Support" />
        <NavItem icon={<LogOut size={20} />} text="Logout" />
      </div>
    </aside>
  );
}

function Header() {
  const { user } = React.useContext(AppContext);
  return (
    <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex-shrink-0">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold hidden sm:block">
          Welcome back, {user?.name.split(" ")[0]}!
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <Bell className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src={user?.avatarUrl}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border-2 border-indigo-200"
          />
          <div className="hidden sm:block">
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <ChevronDown className="h-5 w-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

// --- PAGE COMPONENTS ---

function Dashboard() {
  const { projects, setSelectedProjectId } = React.useContext(AppContext);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        All Projects ({projects?.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={() => setSelectedProjectId(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { selectedProject, setSelectedProjectId } =
    React.useContext(AppContext);
  if (!selectedProject) return null;

  const progress =
    (selectedProject.tasks.filter((t) => t.completed).length /
      selectedProject.tasks.length) *
    100;
  const budgetProgress = (selectedProject.spent / selectedProject.budget) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <button
          onClick={() => setSelectedProjectId(null)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4"
        >
          &larr; Back to Dashboard
        </button>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedProject.name}
            </h2>
            <p className="text-gray-500 mt-1">For {selectedProject.client}</p>
          </div>
          <a
            href="#"
            className="mt-2 sm:mt-0 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            View Client Details <ExternalLink className="ml-1.5 h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          icon={<Target size={24} className="text-green-500" />}
          title="Status"
          value={selectedProject.status}
        />
        <InfoCard
          icon={<Calendar size={24} className="text-red-500" />}
          title="Deadline"
          value={formatDate(selectedProject.deadline)}
        />
        <InfoCard
          icon={<TrendingUp size={24} className="text-blue-500" />}
          title="Progress"
          value={`${Math.round(progress)}%`}
        />
        <InfoCard
          icon={<Users size={24} className="text-yellow-500" />}
          title="Team Members"
          value={selectedProject.team.length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Task Progress</h3>
          <div className="space-y-4">
            {selectedProject.tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Project Team</h3>
          <div className="space-y-3">
            {selectedProject.team.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Progress (%)">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={selectedProject.performance}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#4f46e5"
                fill="#c7d2fe"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Budget Overview">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                {
                  name: "Budget",
                  allocated: selectedProject.budget,
                  spent: selectedProject.spent,
                },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar
                dataKey="spent"
                stackId="a"
                fill="#4f46e5"
                name="Amount Spent"
              />
              <Bar
                dataKey="allocated"
                stackId="b"
                fill="#a5b4fc"
                name="Total Budget"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function ProjectCard({ project, onSelect }) {
  const progress =
    (project.tasks.filter((t) => t.completed).length / project.tasks.length) *
    100;
  const budgetProgress = (project.spent / project.budget) * 100;

  const statusStyles = {
    "In Progress": "bg-blue-100 text-blue-800",
    "On Hold": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <div
      onClick={onSelect}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            statusStyles[project.status]
          }`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">{project.client}</p>

      <div className="mt-4 space-y-3">
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
            <span>Task Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
            <span>Budget Used</span>
            <span>{formatCurrency(project.spent)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${budgetProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex -space-x-2">
          {project.team.map((member) => (
            <img
              key={member.id}
              src={member.avatarUrl}
              alt={member.name}
              className="h-8 w-8 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{formatDate(project.deadline)}</span>
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
    <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const TaskItem = ({ task }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
    <CheckCircle
      size={20}
      className={task.completed ? "text-green-500" : "text-gray-300"}
    />
    <p
      className={`ml-3 text-sm font-medium ${
        task.completed ? "text-gray-500 line-through" : "text-gray-800"
      }`}
    >
      {task.title}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
    {children}
  </div>
);

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-600 mx-auto"></div>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          Loading Dashboard...
        </h2>
        <p className="text-gray-500">Fetching your project data.</p>
      </div>
    </div>
  );
}
