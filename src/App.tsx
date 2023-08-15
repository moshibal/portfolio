import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Project from "./components/project/Project";
import Footer from "./components/footer/Footer";
import "./Global.scss";

function App() {
  return (
    <div>
      <Nav />
      <Header />
      <Main />
      <Project />
      <Footer />
    </div>
  );
}

export default App;
