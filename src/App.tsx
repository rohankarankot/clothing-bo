import { ThemeProvider } from "./components/theme-provider";
import Layout from "./layout";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Layout />
      </ThemeProvider>
    </>
  );
}

export default App;
