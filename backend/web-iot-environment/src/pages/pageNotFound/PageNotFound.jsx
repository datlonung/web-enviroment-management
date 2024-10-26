function PageNotFound() {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh", margin: "auto", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
        <h1 style={{ fontSize: "60px" }}>404</h1>
        <h2 style={{ fontSize: "30px" }}>Page not found </h2>
        <h3 style={{ fontSize: "26px" }}>Sorry, we don't have this page</h3>
      </div>
    </div>
  )
}

export default PageNotFound