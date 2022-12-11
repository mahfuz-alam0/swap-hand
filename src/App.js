import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Route/Route';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='max-w-[1440px] w-full mx-auto'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
