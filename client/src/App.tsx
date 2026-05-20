import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white text-5xl font-bold">
        LeadFlow CRM
      </div>

      <Toaster position="top-right" />
    </>
  );
}

export default App;