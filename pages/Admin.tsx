
import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Calendar,
  Star,
  XCircle,
  ArrowUpRight,
  FileText
} from 'lucide-react';

interface CoachApplication {
  id: string;
  name: string;
  email: string;
  appliedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  experience: string;
  nativeLanguage: string;
  bio: string;
  avatar: string;
}

const mockApplications: CoachApplication[] = [
  {
    id: 'app1',
    name: 'Sarah Zhang',
    email: 'sarah.z@example.com',
    appliedDate: '2024-03-15',
    status: 'PENDING',
    experience: '5 years teaching Mandarin in London',
    nativeLanguage: 'Mandarin',
    bio: 'Passionate about helping students overcome the "speaking wall". I focus on conversational fluency and cultural nuances.',
    avatar: 'https://picsum.photos/seed/sarah/200/200'
  },
  {
    id: 'app2',
    name: 'David Li',
    email: 'david.li@example.com',
    appliedDate: '2024-03-14',
    status: 'PENDING',
    experience: 'Certified HSK instructor, 3 years online tutoring',
    nativeLanguage: 'Mandarin',
    bio: 'I specialize in business Chinese and professional communication. My sessions are structured but relaxed.',
    avatar: 'https://picsum.photos/seed/david/200/200'
  },
  {
    id: 'app3',
    name: 'Elena Wang',
    email: 'elena.w@example.com',
    appliedDate: '2024-03-13',
    status: 'PENDING',
    experience: 'University student, native speaker, language exchange enthusiast',
    nativeLanguage: 'Mandarin',
    bio: 'I want to share my language and culture with the world. I am patient and love meeting new people.',
    avatar: 'https://picsum.photos/seed/elena/200/200'
  }
];

const Admin: React.FC = () => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [applications, setApplications] = useState<CoachApplication[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedApp = applications.find(app => app.id === selectedAppId);
  const pendingCount = applications.filter(app => app.status === 'PENDING').length;

  const handleAction = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    // In a real app, we'd call an API here
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Header & Stats Section */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Admin Console</span>
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
              Review coach applications <br className="hidden md:block" />
              and keep supply healthy.
            </h1>
            <p className="text-zinc-500 max-w-xl">
              Approve strong coaches, reject weak fits, and keep booking inventory moving.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50">
              Export CSV
            </Button>
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
              Manage Roles
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-4 border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <Clock className="w-5 h-5" />
              </div>
              <Badge color="amber" className="text-[10px]">Action Required</Badge>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Pending</p>
              <p className="text-3xl font-bold text-zinc-900">{pendingCount}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <Badge color="emerald" className="text-[10px]">+12% Today</Badge>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Approved Today</p>
              <p className="text-3xl font-bold text-zinc-900">8</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-zinc-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Coaches</p>
              <p className="text-3xl font-bold text-zinc-900">142</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Supply Health</p>
              <p className="text-3xl font-bold text-zinc-900">Optimal</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Applications List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-zinc-900">Pending applications</h2>
            <Badge color="zinc" className="px-3 py-1 rounded-full">{pendingCount} waiting</Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {applications.filter(app => app.status === 'PENDING').map((app) => (
              <motion.div
                key={app.id}
                layoutId={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedAppId === app.id 
                    ? 'bg-indigo-50 border-indigo-200 shadow-md shadow-indigo-100/50' 
                    : 'bg-white border-zinc-100 hover:border-zinc-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-100">
                    <img src={app.avatar} alt={app.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-zinc-900 truncate">{app.name}</h3>
                      <span className="text-[10px] text-zinc-400">{app.appliedDate}</span>
                    </div>
                    <p className="text-xs text-zinc-500 truncate">{app.email}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {pendingCount === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-zinc-50/50 rounded-3xl border-2 border-dashed border-zinc-200">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-zinc-900">All caught up!</p>
                  <p className="text-xs text-zinc-400">No pending coach applications right now.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Detail View */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedApp ? (
              <motion.div
                key={selectedApp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <Card className="p-8 h-full flex flex-col space-y-8 border-zinc-100 shadow-xl shadow-zinc-100/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-zinc-100 overflow-hidden border-4 border-white shadow-lg">
                        <img src={selectedApp.avatar} alt={selectedApp.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-zinc-900">{selectedApp.name}</h2>
                        <div className="flex items-center gap-3 text-sm text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            {selectedApp.email}
                          </span>
                          <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            Applied {selectedApp.appliedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Native Language</p>
                      <p className="font-bold text-zinc-900">{selectedApp.nativeLanguage}</p>
                    </div>
                    <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Experience</p>
                      <p className="font-bold text-zinc-900 truncate">{selectedApp.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      <FileText className="w-3 h-3" />
                      Personal Bio
                    </div>
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-zinc-600 leading-relaxed italic">
                      "{selectedApp.bio}"
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 flex items-center gap-4">
                    <Button 
                      onClick={() => handleAction(selectedApp.id, 'REJECTED')}
                      variant="secondary" 
                      className="flex-1 py-4 rounded-2xl text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Application
                    </Button>
                    <Button 
                      onClick={() => handleAction(selectedApp.id, 'APPROVED')}
                      className="flex-1 py-4 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-200"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Approve Coach
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 bg-zinc-50/30 rounded-[2.5rem] border-2 border-dashed border-zinc-200 p-12">
                <div className="w-20 h-20 bg-white rounded-[2.5rem] shadow-sm flex items-center justify-center text-zinc-200">
                  <Users className="w-10 h-10" />
                </div>
                <div className="space-y-2 max-w-xs">
                  <h3 className="text-xl font-bold text-zinc-900">Application detail</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Select a pending application from the list to review their experience and bio.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Admin;
