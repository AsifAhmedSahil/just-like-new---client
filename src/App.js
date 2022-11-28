
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 


function App() {
  return (
    <div className="max-w-[1441px] mx-auto">
      <RouterProvider router ={router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
