import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Themes";
import { LanguageProvider } from './utils/LanguageContext';
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
//import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import StartCanvas from "./components/canvas/Stars";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { useState } from "react";

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  height: 90vh;
  overflow-x: hidden;
  position: relative;
`;

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <BrowserRouter>
          <Navbar toggleTheme={toggleTheme}/>
          <Body>
            <StartCanvas />
            <div>
              <Hero />
              <Wrapper>
                <Skills />
                {/* <Experience /> */}
              </Wrapper>
              <Projects />
              <Wrapper>
                <Education />
                <Contact />
              </Wrapper>
              <Footer />
            </div>
          </Body>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
