import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Character from "./components/Character";
import CharacterList from "./components/CharacterList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/characters/:characterId" element={<Character />} />
      </Routes>
    </Router>
    
  )
}

export default App