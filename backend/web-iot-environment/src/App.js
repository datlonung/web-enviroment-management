import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../src/routes";
import ToastMessage from "./components/toastMessage/ToastMessage";
import { useSelector } from "react-redux";
import { selectLogin } from "./redux/userSlice";


function App() {
  const logined = useSelector(selectLogin);
  return (
    <Router>
      <div className="App">
        <ToastMessage />
        <Routes>
          {publicRoutes.map((route) => {
            const Page = route.component
            let Layout = DefaultLayout
            route.layout && (Layout = route.layout)
            route.layout === false && (Layout = Fragment)
            return <Route key={route.path} path={route.path} element={!logined ? <Layout><Page /></Layout> : <Navigate to="/" />} />

          })}
          {privateRoutes.map((route) => {
            const Page = route.component
            let Layout = DefaultLayout
            route.layout && (Layout = route.layout)
            route.layout === false && (Layout = Fragment)
            return <Route key={route.path} path={route.path} element={logined ? <Layout><Page /></Layout> : <Navigate to="/login" />} />
          })}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App;
