import { RouterProvider, type createRouter } from '@tanstack/react-router';

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps) => {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
