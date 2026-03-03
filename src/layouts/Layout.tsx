import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="mt-6 md:mt-10 mx-auto w-full max-w-6xl px-4 md:p-10 bg-white shadow-md rounded-lg">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
