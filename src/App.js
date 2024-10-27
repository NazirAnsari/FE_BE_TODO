// App.js
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// import NavBar from './Components/NavBar';
const Dashboard = lazy(() => import('./Components/Dashboard'));
const TaskForm = lazy(() => import('./Components/TaskForm'));
const NoMatch = lazy(() => import('./Components/NoMatch'));
const StartPage = lazy(() => import('./Components/StartPage'));


const App = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task/create" element={<TaskForm />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;