import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Rocket, Users, BookOpen, Settings, LogOut, ChevronDown, Bell, Moon, Sun } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Very simple role switch for the prototype
  const isCompanyView = location.pathname.startsWith('/company');
  const isStudentView = location.pathname.startsWith('/student');

  const links = isCompanyView
    ? [
        { path: "/company/dashboard", label: "ダッシュボード", icon: Rocket },
        { path: "/company/students", label: "参加者を探す", icon: Users },
        { path: "/company/bookmarks", label: "ブックマーク", icon: BookOpen },
      ]
    : [
        { path: "/student/home", label: "ホーム", icon: Users },
        { path: "/student/profile", label: "マイページ", icon: Settings },
      ];

  const handleLogout = () => {
    navigate('/');
  };

  const currentRoleName = isCompanyView ? "ASE-Lab.採用担当" : "星野 宇宙";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-900 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-indigo-50" />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">
              AstroCamp<span className="text-indigo-600 font-black ml-1">2026</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <button className="text-slate-400 hover:text-slate-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 pr-2 rounded-md transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
                  {isCompanyView ? (
                    <span className="text-xs font-bold text-indigo-800">C</span>
                  ) : (
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="hidden sm:block text-sm font-medium text-slate-700">
                  {currentRoleName}
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              {/* View Switcher for prototype purposes */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs font-medium">
                <Link to="/company/dashboard" className={`px-2 py-1 rounded ${isCompanyView ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}>企業</Link>
                <Link to="/student/home" className={`px-2 py-1 rounded ${isStudentView ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}>個人</Link>
              </div>

              <button onClick={handleLogout} className="text-slate-400 hover:text-rose-600 ml-2">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            &copy; 2026 AstroCamp Project. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">運営会社</a>
            <a href="#" className="hover:text-indigo-600">利用規約</a>
            <a href="#" className="hover:text-indigo-600">プライバシーポリシー</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
