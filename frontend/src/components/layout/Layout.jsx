import { Outlet } from "react-router-dom"
import Header from "../layout/Header/Header"
import Footer from "../layout/Footer/Footer"

export default function Layout() {
  return (
    <>
      <Header />
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
