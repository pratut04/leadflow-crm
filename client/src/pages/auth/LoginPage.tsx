import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../../services/auth.service";
import { useAuthStore } from "../../store/useAuthStore";

const DEMO_CREDENTIALS = [
  {
    role: "Admin",
    email: "pratiksha@gmail.com",
    password: "123456",
    icon: "👑",
    color: "from-violet-600 to-purple-700",
    border: "border-violet-500/40",
    badge: "bg-violet-500/20 text-violet-300",
  },
  {
    role: "Sales",
    email: "divya@gmail.com",
    password: "123456",
    icon: "💼",
    color: "from-emerald-600 to-teal-700",
    border: "border-emerald-500/40",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
];

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      setAuth(data.user, data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setActiveDemo(cred.role);
    toast.success(`${cred.role} credentials loaded!`, { icon: cred.icon });
  };

  return (
    <div className="login-root">
      {/* Animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="logo-wrap">
            <span className="logo-icon">⚡</span>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your LeadFlow CRM account</p>
        </div>

        {/* Demo Credentials */}
        <div className="demo-section">
          <div className="demo-label">
            <span className="demo-line" />
            <span className="demo-text">DEMO CREDENTIALS</span>
            <span className="demo-line" />
          </div>

          <div className="demo-grid">
            {DEMO_CREDENTIALS.map((cred) => (
              <button
                key={cred.role}
                type="button"
                onClick={() => fillDemo(cred)}
                className={`demo-card ${activeDemo === cred.role ? "demo-card-active" : ""}`}
                title={`Login as ${cred.role}`}
              >
                <div className={`demo-avatar bg-gradient-to-br ${cred.color}`}>
                  <span>{cred.icon}</span>
                </div>
                <div className="demo-info">
                  <div className="demo-role-row">
                    <span className="demo-role">{cred.role}</span>
                    <span className={`demo-badge ${cred.badge}`}>Click to fill</span>
                  </div>
                  <span className="demo-email">{cred.email}</span>
                  <span className="demo-pass">Password: {cred.password}</span>
                </div>
                {activeDemo === cred.role && (
                  <span className="demo-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setActiveDemo(null); }}
                className="login-input"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔑</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setActiveDemo(null); }}
                className="login-input"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label="Toggle password"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Signing in...
              </span>
            ) : (
              <span>Sign In →</span>
            )}
          </button>
        </form>

        <p className="login-footer">
          LeadFlow CRM &copy; {new Date().getFullYear()} · All rights reserved
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #020617;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 24px 16px;
        }

        /* Animated blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: float 8s ease-in-out infinite;
        }
        .blob-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #7c3aed, #4f46e5);
          top: -120px; left: -120px;
          animation-delay: 0s;
        }
        .blob-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #0ea5e9, #6366f1);
          bottom: -80px; right: -60px;
          animation-delay: 3s;
        }
        .blob-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, #10b981, #0ea5e9);
          top: 50%; left: 60%;
          animation-delay: 5s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* Card */
        .login-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 28px;
          padding: 40px 36px 32px;
          box-shadow:
            0 0 0 1px rgba(124,58,237,0.08),
            0 32px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 1;
        }

        /* Header */
        .login-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border-radius: 16px;
          margin-bottom: 18px;
          box-shadow: 0 8px 24px rgba(124,58,237,0.4);
        }
        .logo-icon { font-size: 28px; }
        .login-title {
          font-size: 2rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 8px;
          letter-spacing: -0.5px;
        }
        .login-subtitle {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Demo Section */
        .demo-section {
          margin-bottom: 28px;
        }
        .demo-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .demo-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148,163,184,0.2), transparent);
        }
        .demo-text {
          font-size: 0.68rem;
          font-weight: 700;
          color: #475569;
          letter-spacing: 1.5px;
          white-space: nowrap;
        }
        .demo-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .demo-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(148,163,184,0.1);
          border-radius: 16px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          position: relative;
          width: 100%;
        }
        .demo-card:hover {
          background: rgba(51, 65, 85, 0.6);
          border-color: rgba(124,58,237,0.3);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .demo-card-active {
          border-color: rgba(124,58,237,0.6) !important;
          background: rgba(124,58,237,0.08) !important;
          box-shadow: 0 0 0 1px rgba(124,58,237,0.2), 0 8px 24px rgba(124,58,237,0.1) !important;
        }
        .demo-avatar {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .demo-info { flex: 1; min-width: 0; }
        .demo-role-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 3px;
        }
        .demo-role {
          font-size: 0.85rem;
          font-weight: 700;
          color: #e2e8f0;
        }
        .demo-badge {
          font-size: 0.62rem;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 20px;
          letter-spacing: 0.3px;
        }
        .demo-email {
          display: block;
          font-size: 0.78rem;
          color: #94a3b8;
          font-family: 'Courier New', monospace;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .demo-pass {
          display: block;
          font-size: 0.72rem;
          color: #64748b;
          margin-top: 1px;
        }
        .demo-check {
          width: 22px; height: 22px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          color: white;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .input-group { display: flex; flex-direction: column; gap: 6px; }
        .input-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.3px;
        }
        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 15px;
          pointer-events: none;
          z-index: 1;
        }
        .login-input {
          width: 100%;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(148,163,184,0.12);
          border-radius: 14px;
          padding: 13px 44px 13px 42px;
          color: #f1f5f9;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: #475569; }
        .login-input:focus {
          border-color: rgba(124,58,237,0.6);
          background: rgba(30,41,59,0.9);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12), 0 4px 16px rgba(0,0,0,0.2);
        }
        .eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 4px;
          border-radius: 8px;
          transition: opacity 0.2s;
          opacity: 0.6;
        }
        .eye-btn:hover { opacity: 1; }

        /* Login Button */
        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 20px rgba(124,58,237,0.4);
          margin-top: 4px;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.55);
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer */
        .login-footer {
          text-align: center;
          color: #334155;
          font-size: 0.72rem;
          margin: 20px 0 0;
          letter-spacing: 0.3px;
        }

        /* Responsive */
        @media (max-width: 520px) {
          .login-card { padding: 30px 20px 24px; border-radius: 20px; }
          .login-title { font-size: 1.65rem; }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
