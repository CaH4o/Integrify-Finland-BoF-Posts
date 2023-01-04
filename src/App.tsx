import "./styles/App.css";
import AppRouter from "./AppRouter";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">React Posts App - Extra assignment</header>
      <AppRouter />
      <p>
        This is a React app that fetches posts, users and comments from a JSON
        placeholder API and displays them in different pages.
      </p>
    </div>
  );
}
