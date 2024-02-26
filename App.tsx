import { StatusBar } from "expo-status-bar";

import { ThemeProvider } from "./src/init/themes/theme_context";
import NavigationStacks from "./src/navigation/NavigationStacks";
import { Provider } from "react-redux";
import { store } from "./src/store/Store";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationStacks />
      </ThemeProvider>
    </Provider>
  );
}
