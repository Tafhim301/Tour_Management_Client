import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Iprops {
    children : ReactNode
}


export default function CommonLayout({children } : Iprops ) {


  return (
    <div className="min-h-screen flex flex-col grid grow-1">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        </div>
  )
}
