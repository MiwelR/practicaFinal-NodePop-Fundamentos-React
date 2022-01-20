import NavBar from "./NavBar";

import "./Layout.scss";

function Layout({ children, title, ...props }) {
  return (
    <div className="layout">
      <NavBar {...props} />
      <main className="layout-main">
        <h2 className="layout-title">{title}</h2>
        <section className="layout-content">{children}</section>
      </main>
      <footer className="layout-footer">© 2021 Miguel Ángel</footer>
    </div>
  );
}

export default Layout;
