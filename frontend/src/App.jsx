import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import { getMoods, createMood, deleteMood } from './services/api';

const AppContent = () => {
  const { user, logout, loading } = useAuth();
  const [moods, setMoods] = useState([]);
  const [moodsLoading, setMoodsLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (user) {
      fetchMoods();
    }
  }, [user]);

  const fetchMoods = async () => {
    try {
      setMoodsLoading(true);
      const data = await getMoods();
      setMoods(data);
    } catch (error) {
      console.error('Error fetching moods:', error);
    } finally {
      setMoodsLoading(false);
    }
  };

  const handleAddMood = async (moodData) => {
    try {
      const newMood = await createMood(moodData);
      setMoods([newMood, ...moods]);
    } catch (error) {
      console.error('Error adding mood:', error);
    }
  };

  const handleDeleteMood = async (id) => {
    try {
      await deleteMood(id);
      setMoods(moods.filter(mood => mood._id !== id));
    } catch (error) {
      console.error('Error deleting mood:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setMoods([]);
    setActiveTab('dashboard');
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading MindMeter...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🌙 MindMeter</h1>
          <p>Track your daily mental energy</p>
        </header>
        
        {showSignup ? (
          <Signup onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <Login onSwitchToSignup={() => setShowSignup(true)} />
        )}
      </div>
    );
  }

  const renderContent = () => {
    if (moodsLoading) {
      return <div className="loading">Loading your mood data...</div>;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard moods={moods} />;
      case 'add':
        return <MoodForm onAddMood={handleAddMood} />;
      case 'history':
        return <MoodList moods={moods} onDeleteMood={handleDeleteMood} />;
      default:
        return <Dashboard moods={moods} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🌙 MindMeter</h1>
            <p>Welcome back, {user.name}!</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ✨ Add Mood
        </button>
        <button 
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📝 History
        </button>
      </nav>
      
      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;