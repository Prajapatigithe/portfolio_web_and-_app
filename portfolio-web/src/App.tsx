import { ThemeProvider } from './context/ThemeProvider'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Resume } from './components/sections/Resume'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
