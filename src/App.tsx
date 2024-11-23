import HeaderComponent from "./components/header/header.component";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <HeaderComponent/>
      </ThemeProvider>
    </>
  );
}

export default App;
