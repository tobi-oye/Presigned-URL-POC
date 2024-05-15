import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LandingPage } from "./pages/LandingPage";

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <LandingPage />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
