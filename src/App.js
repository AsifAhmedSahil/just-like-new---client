
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes/Routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="max-w-[1441px] mx-auto">
      <RouterProvider router ={router}></RouterProvider>
      <ToastContainer 
      position="top-center"
      theme="dark"
      autoClose={3000}
      />
    </div>
  );
}

export default App;
