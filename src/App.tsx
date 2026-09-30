import { useState, useCallback, useEffect } from 'react';
import type { Page, User, Toast as ToastType } from './types';
import type { RegisterData } from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Areas from './pages/Areas';
import ONGsList from './pages/ONGsList';
import ONGDetail from './pages/ONGDetail';
import Donate from './pages/Donate';

const STORAGE_KEY = 'abracocoletivo_users';
const SESSION_KEY = 'abracocoletivo_session';

function getUsers(): Record<string, { user: User; password: string }> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function saveUsers(users: Record<string, { user: User; password: string }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
    catch { return null; }
  });
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((message: string, type: ToastType['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const navigate = useCallback((p: Page, params: Record<string, string> = {}) => {
    // Auth guard: ONGs pages require login
    if ((p === 'areas' || p === 'ongs' || p === 'ong-detail') && !user) {
      addToast('Faça login para acessar as ONGs e voluntariados! 🔒', 'info');
      setPage('login');
      setPageParams({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setPage(p);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user, addToast]);

  async function handleLogin(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    const users = getUsers();
    const record = users[email.toLowerCase()];
    if (!record || record.password !== password) {
      addToast('E-mail ou senha incorretos. Tente novamente.', 'error');
      return;
    }
    setUser(record.user);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(record.user));
    addToast(`Bem-vindo de volta, ${record.user.name.split(' ')[0]}! 🎉`, 'success');
    setPage('areas');
    setPageParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleRegister(data: RegisterData) {
    await new Promise((r) => setTimeout(r, 1000));
    const users = getUsers();
    if (users[data.email.toLowerCase()]) {
      addToast('Este e-mail já está cadastrado. Faça login!', 'error');
      return;
    }
    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      name: data.name,
      email: data.email,
      phone: data.phone,
      cpf: data.cpf,
      birthDate: data.birthDate,
      createdAt: new Date().toISOString(),
    };
    users[data.email.toLowerCase()] = { user: newUser, password: data.password };
    saveUsers(users);
    setUser(newUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    addToast(`Conta criada com sucesso! Seja bem-vindo(a), ${newUser.name.split(' ')[0]}! 🎉`, 'success');
    setPage('areas');
    setPageParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleLogout() {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
    addToast('Você saiu da sua conta. Até logo! 👋', 'info');
    setPage('home');
    setPageParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Redirect if trying to access protected page without auth
  useEffect(() => {
    if (!user && (page === 'areas' || page === 'ongs' || page === 'ong-detail')) {
      setPage('login');
      setPageParams({});
    }
  }, [user, page]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar currentPage={page} user={user} onNavigate={navigate} onLogout={handleLogout} />

      <div style={{ flex: 1 }}>
        {page === 'home' && <Home onNavigate={navigate} user={user} />}
        {page === 'login' && <Login onLogin={handleLogin} onNavigate={navigate} />}
        {page === 'register' && <Register onRegister={handleRegister} onNavigate={navigate} />}
        {page === 'areas' && user && <Areas onNavigate={navigate} />}
        {page === 'ongs' && user && <ONGsList areaFilter={pageParams.area} onNavigate={navigate} />}
        {page === 'ong-detail' && user && <ONGDetail ongId={pageParams.id || ''} onNavigate={navigate} />}
        {page === 'donate' && <Donate />}
      </div>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
