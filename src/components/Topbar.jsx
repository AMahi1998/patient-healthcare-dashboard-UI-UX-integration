import { Settings } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-white shadow-sm p-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.pravatar.cc/150?u=doctor" 
            alt="Doctor"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="font-semibold text-gray-800">Dr. Jose Simmons</p>
            <p className="text-gray-500">General Practitioner</p>
          </div>
        </div>
        <Settings size={20} className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}
