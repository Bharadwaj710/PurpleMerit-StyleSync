import { useStyleSyncStore } from './store/useStyleSyncStore.js';
import { HomePage } from './pages/HomePage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';

export default function App() {
  const currentView = useStyleSyncStore((state) => state.currentView);

  return currentView === 'dashboard' ? <DashboardPage /> : <HomePage />;
}
