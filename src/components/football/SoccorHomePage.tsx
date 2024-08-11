import { Link } from "react-router-dom";
// import "./SoccorHomePage.css";
import ContactForm from "../contact/Contact";

const FootballHome = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Football News</h1>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="https://www.espn.com.au/football/">News</Link>
          <a href="#matches">Matches</a>
          <a href="#teams">Teams</a>
          <ContactForm />
        </nav>
      </header>

      <main className="main-content">
        <section className="latest-news">
          <h2>Match Prediction</h2>
          <div className="news-item">News item 1</div>
          <div className="news-item">News item 2</div>
          <div className="news-item">News item 3</div>
        </section>

        <section className="upcoming-matches">
          <h2>Upcoming Matches</h2>
          <div className="match-item">Match 1</div>
          <div className="match-item">Match 2</div>
          <div className="match-item">Match 3</div>
        </section>
      </main>

      <aside className="sidebar">
        <h2>Experience High Win Rates 🏆</h2>
        <p>Discover our track record of consistent wins!</p>
        <p>
          While we strive for excellence, please remember that betting involves
          risk. Gamble responsibly.
        </p>
        <button className="subscribe-button">Subscribe Now</button>
      </aside>

      <footer className="footer">
        <p>&copy; 2024 Football Prediction. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FootballHome;
