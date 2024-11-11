import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { StatusBar } from "react-native-web";

export default function App() {
  return (
    <SafeAreaProvider>
        <Main />
    </SafeAreaProvider>
  );
}

function Main() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
