import { Outlet } from "react-router-dom"
import Header from "../layout/Header/Header"
import Footer from "../layout/Footer/Footer"
import style from "./Layout.module.css"

export default function Layout() {
  return (
    <>
      <Header />
      
      <main className={style.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
