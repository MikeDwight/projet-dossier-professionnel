import "./App.css";
import AppRouter from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
