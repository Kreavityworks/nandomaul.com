import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Calendar as CalendarIcon, 
  FolderOpen, 
  CheckSquare, 
  TrendingUp, 
  Bell, 
  Search, 
  LogOut, 
  Sparkles,
  MoreVertical,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Filter,
  ArrowUpRight,
  Zap,
  Layers,
  PieChart,
  FileText,
  Users,
  Archive,
  ChevronLeft,
  ChevronRight,
  Folder,
  UploadCloud,
  Loader2,
  CalendarDays,
  BarChart3,
  ExternalLink,
  Lock,
  ShoppingBag,
  Instagram,
  Video,
  MoreHorizontal,
  ChevronDown,
  List
} from 'lucide-react';

/**
 * AKG-DF Design Tools v1.5
 * Fix: Restored missing modules (Calendar, Tasks, Assets).
 * Update: Project-based Monitoring, Detailed Vault.
 */

// --- CUSTOM STYLES ---
const customStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes scale-in {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-fade-slide {
    animation: fade-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-scale-in {
    animation: scale-in 0.2s ease-out forwards;
  }
  .warm-bg {
    background-color: #FDFBF7;
    background-image: radial-gradient(at 0% 0%, rgba(251, 191, 36, 0.03) 0px, transparent 50%),
                      radial-gradient(at 100% 100%, rgba(251, 191, 36, 0.03) 0px, transparent 50%);
  }
  .modal-scroll::-webkit-scrollbar { width: 5px; }
  .modal-scroll::-webkit-scrollbar-track { background: transparent; }
  .modal-scroll::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
  
  /* Custom Checkbox */
  .custom-checkbox:checked {
    background-color: #f59e0b; /* Amber-500 */
    border-color: #f59e0b;
  }
`;

// --- MOCK DATA ---

const USERS = [
  { id: 'u1', name: 'Nando', role: 'admin', avatar: 'N', label: 'Super Admin' },
  { id: 'u5', name: 'Lia', role: 'manager', avatar: 'L', label: 'Head of Design' },
  { id: 'u2', name: 'Fricilia', role: 'manager', avatar: 'F', label: 'Manager' },
  { id: 'u3', name: 'Tasya', role: 'sales', avatar: 'T', label: 'Sales (TikTok)' },
  { id: 'u4', name: 'Cecep', role: 'sales', avatar: 'C', label: 'Sales (KOL)' },
];

const SHORTCUTS = [
  { name: 'Realme Partner', url: '#' },
  { name: 'Realme Official', url: '#' },
  { name: 'Akaso Official', url: '#' },
  { name: 'iDreamtech', url: '#' },
];

const SOCIAL_LINKS = [
  { name: 'TikTok Akaso', icon: Video, url: '#' },
  { name: 'Instagram Akaso', icon: Instagram, url: '#' },
];

const BRANDS_OPTIONS = [
  { id: 'b1', name: 'Realme Official Partner', type: 'partner' },
  { id: 'b2', name: 'Realme Official Store', type: 'official' },
  { id: 'b3', name: 'Realme Authorized Store', type: 'authorized' },
  { id: 'b4', name: 'Akaso Official Store', type: 'official' },
  { id: 'b5', name: 'iDreamtech', type: 'distributor' },
];

const DESIGN_TYPES = ['SKU', 'KOL', 'Banner', 'LP', 'Loriket'];

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'Defrin uploaded "Daily Report"', time: '2m ago', read: false },
  { id: 2, text: 'Tasya requested "Akaso Banner"', time: '15m ago', read: false },
  { id: 3, text: 'System: High traffic on TikTok', time: '1h ago', read: true },
  { id: 4, text: 'Weekly Recap generated', time: '3h ago', read: true },
];

const INITIAL_TASKS = [
  { id: 1, text: 'Review Brief Akaso Summer', due: 'Today', status: 'pending', project: 'Akaso Summer' },
  { id: 2, text: 'Upload Assets to Drive', due: 'Tomorrow', status: 'pending', project: 'General' },
  { id: 3, text: 'Meeting with KOL Team', due: 'Jan 22', status: 'done', project: 'KOL C85' },
  { id: 4, text: 'Update Monthly Report', due: 'Jan 25', status: 'pending', project: 'Admin' },
  { id: 5, text: 'Check Competitor Prices', due: 'Jan 26', status: 'done', project: 'Market Research' },
];

const CALENDAR_EVENTS = [
  { id: 1, title: 'Warm Up C85 5G', date: 13, type: 'campaign', color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { id: 2, title: 'Payday Sale', date: 25, type: 'sales', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 3, title: 'Akaso Launch', date: 5, type: 'launch', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 4, title: 'TikTok Live Marathon', date: 18, type: 'live', color: 'bg-purple-100 text-purple-700 border-purple-200' },
];

// Data Monitoring Projects
const MONITORING_PROJECTS = [
  { id: 'p1', name: 'C85 5G LAUNCH', deadline: 'Jan 30, 2026', totalAssets: 50, completed: 32 },
  { id: 'p2', name: 'AKASO SUMMER SALE', deadline: 'Feb 15, 2026', totalAssets: 20, completed: 5 },
];

const MONITORING_STATS = {
  'p1': [
    { name: 'Tasya', uploaded: 15, total: 20, pending: 5, status: 'On Track' },
    { name: 'Cecep', uploaded: 10, total: 10, pending: 0, status: 'Done' },
    { name: 'Defrin', uploaded: 7, total: 20, pending: 13, status: 'Delayed' },
  ],
  'p2': [
    { name: 'Tasya', uploaded: 2, total: 10, pending: 8, status: 'Start' },
    { name: 'Rizka', uploaded: 3, total: 10, pending: 7, status: 'Start' },
  ]
};

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  const colorMap = {
    'Pending': 'bg-amber-400',
    'Approved': 'bg-blue-500',
    'In Progress': 'bg-purple-500',
    'Review': 'bg-rose-500',
    'Done': 'bg-emerald-500',
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${colorMap[status] || 'bg-slate-400'} ${status === 'In Progress' ? 'animate-pulse' : ''}`}></div>
      <span className="text-xs font-medium text-slate-600">{status}</span>
    </div>
  );
};

const PriorityBadge = ({ level }) => {
  const colorMap = {
    'Urgent': 'text-rose-600',
    'High': 'text-amber-600',
    'Medium': 'text-blue-600',
    'Low': 'text-slate-400',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider ${colorMap[level]}`}>
      {level}
    </span>
  );
};

// --- LIVE TICKER ---
const LiveTicker = ({ activities = [] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!activities || activities.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [activities]);

  const currentItem = (activities && activities[index]) ? activities[index] : { text: "System Ready", time: "Now", type: "system" };

  return (
    <div className="w-full bg-[#1E293B] text-white overflow-hidden h-10 flex items-center justify-between px-6 shadow-sm z-30 relative border-b border-slate-700">
      <div className="flex items-center gap-3 border-r border-slate-700 pr-6 mr-6 h-full flex-shrink-0">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 leading-none">Live Update</span>
      </div>

      <div className="flex-1 flex items-center justify-start relative overflow-hidden h-full">
         <div key={index + (currentItem.text || 'default')} className="animate-fade-slide flex items-center gap-2">
            <span className="text-xs font-medium text-slate-300">{currentItem.text}</span>
            <span className="text-slate-500 text-[10px] ml-1 font-mono opacity-70">— {currentItem.time}</span>
         </div>
      </div>
    </div>
  );
};

// --- CALENDAR VIEW (RESTORED) ---
const CalendarView = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="text-amber-500" /> Production Calendar
          </h2>
          <p className="text-slate-500 text-sm mt-1">January 2026 Overview</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-200">
          <PlusCircle size={16}/> Add Event
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {weekDays.map(d => (
            <div key={d} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-[120px] divide-x divide-y divide-slate-100">
          {[1,2,3,4].map(pad => <div key={`pad-${pad}`} className="bg-slate-50/50"></div>)}
          
          {days.map(day => {
            const events = CALENDAR_EVENTS.filter(e => e.date === day);
            return (
              <div key={day} className="p-2 relative group hover:bg-slate-50 transition-colors">
                <span className={`text-sm font-bold ${day === 19 ? 'bg-amber-500 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md' : 'text-slate-700'}`}>{day}</span>
                <div className="mt-2 space-y-1">
                  {events.map(ev => (
                    <div key={ev.id} className={`text-[10px] px-2 py-1 rounded border font-medium truncate cursor-pointer hover:opacity-80 transition-opacity ${ev.color}`}>
                      {ev.title}
                    </div>
                  ))}
                </div>
                <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-slate-100 rounded hover:bg-amber-100 text-slate-400 hover:text-amber-600 transition-all">
                  <PlusCircle size={14}/>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

// --- MY TASKS VIEW (RESTORED) ---
const MyTasksView = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CheckSquare className="text-amber-500" /> My Tasks
          </h2>
          <p className="text-slate-500 text-sm mt-1">Daily to-do list & checklist.</p>
        </div>
        <div className="flex gap-2 text-sm font-bold">
          <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">{tasks.filter(t => t.status === 'done').length} Done</span>
          <span className="text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">{tasks.length} Total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className={`p-4 bg-white rounded-xl border flex items-center justify-between cursor-pointer transition-all hover:shadow-md ${task.status === 'done' ? 'border-slate-100 opacity-60' : 'border-slate-200'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                {task.status === 'done' && <CheckCircle2 size={16} className="text-white"/>}
              </div>
              <div>
                 <p className={`font-bold text-sm ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.text}</p>
                 <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{task.project}</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${task.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              {task.due}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BRANKAS VIEW (RESTORED & IMPROVED) ---
const BrankasView = () => {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('January');

  // Mock data generator based on filter
  const folders = [
    { name: `Campaign ${month} ${year}`, items: 45, size: '1.2 GB' },
    { name: `Social Media Assets ${month}`, items: 120, size: '4.5 GB' },
    { name: `Product Photos ${year}`, items: 300, size: '12 GB' },
    { name: 'Legal Docs', items: 5, size: '2 MB' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-amber-100 shadow-sm gap-4">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Archive className="text-amber-500" /> Brankas Aset
          </h2>
          <p className="text-slate-500 text-sm mt-1">Secure Vault & Archives.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative">
             <select 
               value={year} 
               onChange={(e) => setYear(e.target.value)}
               className="appearance-none bg-slate-50 border border-slate-200 pl-4 pr-10 py-2 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
             >
               <option>2026</option>
               <option>2025</option>
               <option>2024</option>
             </select>
             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
           </div>
           
           <div className="relative">
             <select 
               value={month} 
               onChange={(e) => setMonth(e.target.value)}
               className="appearance-none bg-slate-50 border border-slate-200 pl-4 pr-10 py-2 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
             >
               {['January', 'February', 'March', 'December'].map(m => <option key={m}>{m}</option>)}
             </select>
             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {folders.map((folder, idx) => (
          <div key={idx} className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full -mr-8 -mt-8 group-hover:bg-amber-100 transition-colors"></div>

             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-sm border border-amber-100">
                   <Folder size={24} fill="currentColor" className="opacity-80" />
                </div>
                <MoreVertical size={16} className="text-slate-300 group-hover:text-slate-500"/>
             </div>
             <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors truncate text-sm">{folder.name}</h3>
             <p className="text-xs text-slate-400 mt-1 font-medium">{folder.items} items • {folder.size}</p>
             <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
               <span>Access: Private</span>
               <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500"/>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MONITORING VIEW (UPDATED: Project Based) ---
const MonitoringView = ({ user }) => {
  const isManager = user.role === 'admin' || user.role === 'manager';
  const [activeProject, setActiveProject] = useState('p1');
  
  const currentProject = MONITORING_PROJECTS.find(p => p.id === activeProject);
  const currentStats = MONITORING_STATS[activeProject] || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Project Selector Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">PROGRESS REPORT</h2>
             <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded border border-amber-200 uppercase tracking-widest">Live</span>
          </div>
          
          {/* Project Dropdown */}
          <div className="mt-2 relative inline-block group">
             <button className="flex items-center gap-2 text-lg font-bold text-slate-600 hover:text-amber-600 transition-colors">
               {currentProject.name} <ChevronDown size={18}/>
             </button>
             {/* Dropdown Menu (Hover) */}
             <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-1 hidden group-hover:block z-50 animate-scale-in origin-top-left">
               {MONITORING_PROJECTS.map(p => (
                 <button 
                   key={p.id} 
                   onClick={() => setActiveProject(p.id)}
                   className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-amber-50 hover:text-amber-600 transition-colors ${activeProject === p.id ? 'bg-amber-50 text-amber-600' : 'text-slate-500'}`}
                 >
                   {p.name}
                 </button>
               ))}
             </div>
          </div>
        </div>

        <div className="text-right">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Target Deadline</p>
           <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Clock size={14} className="text-rose-500"/>
              <span className="text-sm font-bold text-slate-800">{currentProject.deadline}</span>
           </div>
        </div>
      </div>

      {isManager ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
             <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Team Output</h3>
             <div className="text-xs text-slate-500 font-medium">Total Assets: {currentProject.totalAssets}</div>
          </div>
          
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
                <th className="py-4 pl-6">Personnel</th>
                <th className="py-4 w-1/3">Progress Check</th>
                <th className="py-4 text-center">Uploaded</th>
                <th className="py-4 text-center">Pending</th>
                <th className="py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentStats.map((member, idx) => {
                const progress = (member.uploaded / member.total) * 100;
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="font-bold text-slate-800">{member.name}</div>
                    </td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-emerald-500' : progress < 50 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600 w-8">{Math.round(progress)}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-100">{member.uploaded}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold border ${member.pending > 0 ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                        {member.pending}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                       <span className={`text-[10px] font-bold uppercase tracking-wider ${member.status === 'Done' ? 'text-emerald-600' : member.status === 'Delayed' ? 'text-rose-600' : 'text-blue-600'}`}>
                         {member.status}
                       </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-slate-200 border-dashed">
           <Lock size={32} className="text-slate-300 mb-2"/>
           <p className="text-slate-400 font-medium">Restricted Access: Manager Level Only</p>
        </div>
      )}
    </div>
  );
};

// --- NEW REQUEST MODAL ---
const NewRequestModal = ({ onClose, onSubmit }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loadingSelection, setLoadingSelection] = useState(null); 
  const [deadlineDate, setDeadlineDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleBrandToggle = (id) => {
    if (selectedBrands.includes(id)) {
      setSelectedBrands(prev => prev.filter(b => b !== id));
    } else {
      setLoadingSelection(`brand-${id}`);
      setTimeout(() => {
        setSelectedBrands(prev => [...prev, id]);
        setLoadingSelection(null);
      }, 300); 
    }
  };

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(prev => prev.filter(t => t !== type));
    } else {
      setLoadingSelection(`type-${type}`);
      setTimeout(() => {
        setSelectedTypes(prev => [...prev, type]);
        setLoadingSelection(null);
      }, 300);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedFiles.length + files.length > 5) {
      alert("Max 5 files allowed!");
      return;
    }
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleSubmit = () => {
    if (!eventName || selectedBrands.length === 0) return;
    const newRequest = {
      title: eventName,
      brands: selectedBrands.map(id => BRANDS_OPTIONS.find(b => b.id === id).name),
      types: selectedTypes,
      date: deadlineDate,
      files: uploadedFiles.length
    };
    onSubmit(newRequest);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
               <span className="bg-amber-100 text-amber-600 p-1.5 rounded-lg"><Sparkles size={18}/></span> New Request
            </h3>
            <p className="text-xs text-slate-400 mt-1">Create a new design task.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-2 hover:bg-slate-50 rounded-full transition-all"><X size={20}/></button>
        </div>
        <div className="p-8 overflow-y-auto modal-scroll space-y-8">
          <section>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">1. Select Brands</h4>
            <div className="flex flex-wrap gap-3">
              {BRANDS_OPTIONS.map(brand => {
                const isSelected = selectedBrands.includes(brand.id);
                const isLoading = loadingSelection === `brand-${brand.id}`;
                return (
                  <button key={brand.id} onClick={() => handleBrandToggle(brand.id)} className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 ${isSelected ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-amber-400 hover:text-amber-600'}`}>
                    {isLoading ? <Loader2 size={14} className="animate-spin"/> : null}
                    {brand.name}
                    {isSelected && <CheckCircle2 size={14} className="text-emerald-400"/>}
                  </button>
                )
              })}
            </div>
          </section>
          <section>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">2. Design Type</h4>
            <div className="flex flex-wrap gap-3">
              {DESIGN_TYPES.map(type => {
                const isSelected = selectedTypes.includes(type);
                const isLoading = loadingSelection === `type-${type}`;
                return (
                  <button key={type} onClick={() => handleTypeToggle(type)} className={`px-6 py-3 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 hover:shadow-sm ${isSelected ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-slate-300'}`}>
                     {isLoading && <Loader2 size={12} className="animate-spin text-slate-400"/>}
                     {type}
                  </button>
                )
              })}
            </div>
          </section>
          <section className="grid grid-cols-2 gap-6">
            <div>
               <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">3. Campaign Name</h4>
               <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-50 transition-all placeholder:font-normal placeholder:text-slate-400" placeholder="e.g. Warm Up C85" />
            </div>
            <div>
               <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Deadline</h4>
               <div className="relative group">
                 <input type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-50 transition-all cursor-pointer" />
                 <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-amber-500 transition-colors" size={18}/>
               </div>
            </div>
          </section>
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-white hover:text-slate-800 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={!eventName || selectedBrands.length === 0} className="px-8 py-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-300 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"><CheckCircle2 size={16}/> Submit</button>
        </div>
      </div>
    </div>
  );
};

// --- LOGIN SCREEN ---
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      onLogin();
    } else {
      setError('Invalid Password');
    }
  };

  return (
    <div className="min-h-screen warm-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px]"></div>

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 w-full max-w-md relative z-10 text-center animate-fade-slide">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-slate-300">
          <span className="font-black text-2xl">A</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">AKG-DF <span className="font-light">System</span></h1>
        <p className="text-slate-500 text-sm mb-8 mt-1">Authorized Personnel Only</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18}/>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError('');}}
              placeholder="Access Key (admin)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 font-bold focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-50 transition-all"
            />
          </div>
          {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all">
            Unlock Dashboard
          </button>
        </form>
        <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Build by Nando</p>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function ACISApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [currentUser, setCurrentUser] = useState(USERS[0]); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const [requests, setRequests] = useState([
    { id: 1, title: 'Akaso Brave 7 - Summer Promo', brand: 'Akaso', requester: 'Tasya', status: 'In Progress', priority: 'High', date: 'Jan 18', format: 'Video 9:16' },
    { id: 2, title: 'Live Stream Banner - Big Sale', brand: 'TikTok', requester: 'Tasya', status: 'Pending', priority: 'Medium', date: 'Jan 19', format: 'Image 1:1' },
    { id: 3, title: 'KOL Outreach Kit', brand: 'KOL', requester: 'Cecep', status: 'Approved', priority: 'High', date: 'Jan 17', format: 'PDF' },
    { id: 4, title: 'Weekly Recap Video', brand: 'Akaso', requester: 'Defrin', status: 'Done', priority: 'Low', date: 'Jan 15', format: 'Video 16:9' },
    { id: 5, title: 'Flash Sale Instagram Story', brand: 'Akulaku', requester: 'Defrin', status: 'Review', priority: 'Urgent', date: 'Jan 20', format: 'Image 9:16' },
  ]);
  
  const [liveActivities, setLiveActivities] = useState([
    { text: "Tasya submitted proposal 'Design Banner Akaso'", time: "2m ago", type: 'upload' },
    { text: "Cecep requested design 'SKU KOL Afdal Yusman'", time: "15m ago", type: 'request' },
    { text: "System detected trend: Video Demand +40%", time: "1h ago", type: 'alert' },
  ]);

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Pagination & Filtering
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const filteredRequests = currentUser.role === 'admin' || currentUser.role === 'manager'
    ? requests 
    : requests.filter(r => currentUser.brands.includes(r.brand));
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = {
    pending: filteredRequests.filter(r => r.status === 'Pending').length,
    total: filteredRequests.length
  };

  const handleNewRequestSubmit = (data) => {
    const newReq = {
      id: requests.length + 1,
      title: data.title,
      brand: data.brands[0], 
      requester: currentUser.name,
      status: 'Pending',
      priority: 'High',
      date: data.date || 'TBD',
      format: data.types.join(', ')
    };
    setRequests(prev => [newReq, ...prev]);
    setLiveActivities(prev => [{ text: `${currentUser.name} requested '${data.title}'`, time: 'Just now', type: 'request' }, ...prev]);
    setNotifications(prev => [{ id: Date.now(), text: `New request: ${data.title}`, time: 'Just now', read: false }, ...prev]);
    setShowNewRequestModal(false);
  };

  const SidebarItem = ({ icon: Icon, label, id, active, badge }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
        active 
        ? 'bg-amber-50 text-amber-600 font-bold border border-amber-100 shadow-sm' 
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
      }`}
    >
      <Icon size={18} className={`relative z-10 ${active ? 'text-amber-500' : 'text-slate-400 group-hover:text-slate-600 transition-colors'}`} />
      <span className="relative z-10">{label}</span>
      {badge > 0 && (
        <span className="ml-auto bg-red-500 text-white text-[9px] font-bold px-1.5 rounded-full min-w-[16px] h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen warm-bg text-slate-600 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-hidden flex flex-col">
      <style>{customStyles}</style>

      {/* TOP HEADER */}
      <div className="flex-shrink-0 z-50 bg-white shadow-sm">
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-100 relative">
           <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-slate-800 lg:hidden"><Menu size={20} /></button>
              <h1 className="text-lg font-black text-slate-800 tracking-tight hidden md:block">AKG-DF <span className="text-slate-300 mx-2 font-thin">|</span> <span className="font-light text-slate-500">Design Tools</span></h1>
           </div>

           <div className="flex items-center gap-4">
              {/* SMART SEARCH */}
              <div className="relative hidden md:block group">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? 'text-amber-500' : 'text-slate-400'}`} size={16} />
                <input 
                  type="text" 
                  placeholder="Search assets (e.g. Banner)..." 
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-300 w-64 transition-all"
                />
                
                {searchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 animate-scale-in origin-top-left z-50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-2 mb-1">Quick Find</p>
                    {['Design Banner', 'Design SKU', 'Design LP'].map(item => (
                      <button key={item} className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors flex items-center gap-2">
                        <Search size={12} /> {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

              {/* NOTIFICATION BELL */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full relative group transition-all ${showNotifications ? 'bg-amber-50 text-amber-600' : 'hover:bg-slate-50 text-slate-400 hover:text-amber-500'}`}
                >
                  <Bell size={20} />
                  {notifications.some(n => !n.read) && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>}
                </button>

                {showNotifications && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-scale-in origin-top-right z-50">
                    <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-800">Notifications</span>
                      <button className="text-[10px] text-amber-600 font-bold hover:underline">Read All</button>
                    </div>
                    <div className="max-h-60 overflow-y-auto modal-scroll">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.read ? 'bg-amber-50/30' : ''}`}>
                          <p className={`text-xs ${!notif.read ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>{notif.text}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-slate-100">
                 <div className="relative">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-md">{currentUser.avatar}</div>
                   <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                 </div>
                 <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{currentUser.label}</p>
                 </div>
              </button>
           </div>
        </header>
        <LiveTicker activities={liveActivities} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 opacity-0'} bg-white border-r border-slate-200 flex-shrink-0 transition-all duration-300 flex flex-col relative z-20`}>
          <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-2">Main Menu</div>
            <SidebarItem id="dashboard" label="Overview" icon={LayoutDashboard} active={activeTab === 'dashboard'} />
            <SidebarItem id="requests" label="Queue List" icon={FolderOpen} active={activeTab === 'requests'} badge={stats.pending} />
            <SidebarItem id="calendar" label="Calendar" icon={CalendarIcon} active={activeTab === 'calendar'} />
            
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-6">Personal</div>
            <SidebarItem id="tasks" label="My Tasks" icon={CheckSquare} active={activeTab === 'tasks'} />
            <SidebarItem id="monitoring" label="Monitoring" icon={BarChart3} active={activeTab === 'monitoring'} />
            
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-6">Library</div>
            <SidebarItem id="assets-brand" label="Assets" icon={PieChart} active={activeTab === 'assets-brand'} />
            <SidebarItem id="brankas" label="Brankas (Vault)" icon={Archive} active={activeTab === 'brankas'} />

            {/* SHORTCUTS MENU */}
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-6">Quick Links</div>
            <div className="space-y-1 pl-2">
              {SHORTCUTS.map((shop, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors text-left group">
                  <ShoppingBag size={14} className="text-slate-300 group-hover:text-amber-500"/>
                  {shop.name}
                  <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-50"/>
                </button>
              ))}
            </div>

            {/* SOCIAL MEDIA MENU */}
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-6">Socials</div>
            <div className="space-y-1 pl-2">
              {SOCIAL_LINKS.map((soc, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-500 hover:text-amber-600 hover:bg-amber-50/50 rounded-lg transition-colors text-left group">
                  <soc.icon size={14} className="text-slate-300 group-hover:text-amber-500"/>
                  {soc.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
             <p className="text-[10px] text-center text-slate-400 mb-2 font-medium">Dev Mode: Switch Role</p>
             <div className="flex justify-center gap-2">
               {USERS.map(u => (
                 <button key={u.id} onClick={() => setCurrentUser(u)} className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${currentUser.id === u.id ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-110' : 'bg-white text-slate-500 border-slate-200 hover:border-amber-400'}`} title={`Switch to ${u.name} (${u.role})`}>{u.avatar}</button>
               ))}
             </div>
          </div>
          <div className="p-4 text-center"><p className="text-[10px] text-slate-400 font-bold">System Build By Nando</p></div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide warm-bg">
          {activeTab === 'monitoring' ? (
            <MonitoringView user={currentUser} />
          ) : activeTab === 'calendar' ? (
            <CalendarView />
          ) : activeTab === 'tasks' ? (
            <MyTasksView />
          ) : activeTab === 'brankas' ? (
            <BrankasView />
          ) : activeTab === 'assets-brand' ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-6">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center">
                  <PieChart size={32} className="text-amber-200" />
                </div>
                <p className="font-medium text-sm">Assets Module Ready for Integration</p>
             </div>
          ) : activeTab === 'requests' ? (
             // REUSED QUEUE TABLE FOR FULL VIEW
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><FolderOpen size={20} className="text-amber-500"/> Full Queue List</h3>
                    <p className="text-xs text-slate-500 mt-1">All design requests across departments.</p>
                  </div>
                  <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-50"><Filter size={14}/> Filters</button>
                </div>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
                        <th className="py-4 pl-6">Project Details</th>
                        <th className="py-4">Brand</th>
                        <th className="py-4">Requester</th>
                        <th className="py-4">Status</th>
                        <th className="py-4">Priority</th>
                        <th className="py-4 text-right pr-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="group hover:bg-amber-50/50 transition-colors">
                          <td className="py-4 pl-6">
                            <div className="font-bold text-slate-800 text-sm">{req.title}</div>
                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium">{req.format}</span>
                              <span>{req.date}</span>
                            </div>
                          </td>
                          <td className="py-4 text-slate-600 text-sm font-medium">{req.brand}</td>
                          <td className="py-4 text-slate-600 text-xs font-bold">{req.requester}</td>
                          <td className="py-4"><StatusBadge status={req.status} /></td>
                          <td className="py-4"><PriorityBadge level={req.priority} /></td>
                          <td className="py-4 text-right pr-6"><button className="p-2 hover:bg-white hover:shadow rounded-lg text-slate-400 hover:text-amber-500 transition-all"><MoreVertical size={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          ) : (
            // DASHBOARD VIEW
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                   <h2 className="text-xl font-bold text-slate-800">Welcome back, {currentUser.name}!</h2>
                   <p className="text-slate-500 text-sm mt-1">Ready to create something amazing today?</p>
                </div>
                <button onClick={() => setShowNewRequestModal(true)} className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-slate-200 transition-all flex items-center gap-2 hover:-translate-y-1">
                   <PlusCircle size={16}/> New Request
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Queue', val: stats.total, icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Pending', val: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'In Production', val: filteredRequests.filter(r => r.status === 'In Progress').length, icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Completed', val: filteredRequests.filter(r => r.status === 'Done').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-800">{stat.val}</h3>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={22} /></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><LayoutDashboard size={18} className="text-amber-500"/> Active Workflow</h3>
                  <button className="text-slate-400 hover:text-amber-600 text-xs font-bold transition-colors">Sort by Recent</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
                        <th className="py-4 pl-6">Project Details</th>
                        <th className="py-4">Brand</th>
                        <th className="py-4">Status</th>
                        <th className="py-4">Priority</th>
                        <th className="py-4 text-right pr-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {paginatedRequests.map((req) => (
                        <tr key={req.id} className="group hover:bg-amber-50/50 transition-colors">
                          <td className="py-4 pl-6">
                            <div className="font-bold text-slate-800 text-sm">{req.title}</div>
                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium">{req.format}</span>
                              <span>{req.date}</span>
                            </div>
                          </td>
                          <td className="py-4 text-slate-600 text-sm font-medium">{req.brand}</td>
                          <td className="py-4"><StatusBadge status={req.status} /></td>
                          <td className="py-4"><PriorityBadge level={req.priority} /></td>
                          <td className="py-4 text-right pr-6"><button className="p-2 hover:bg-white hover:shadow rounded-lg text-slate-400 hover:text-amber-500 transition-all"><MoreVertical size={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <p className="text-xs text-slate-400 font-medium">Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-50 hover:bg-white transition-colors"><ChevronLeft size={16} /></button>
                      <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-50 hover:bg-white transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

       {showNewRequestModal && <NewRequestModal onClose={() => setShowNewRequestModal(false)} onSubmit={handleNewRequestSubmit} />}
    </div>
  );
}
