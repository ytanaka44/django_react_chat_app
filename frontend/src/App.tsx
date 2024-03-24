import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./features/auth/Signin";
import AppLayout from "./layout/AppLayout";
import { PrivateRoute } from "./features/auth/PrivateRoute";
import Home from "./features/home/Home";
import Signup from "./features/auth/Signup";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";
import ChatRoom from "./features/chat/ChatRoom";

function App() {
  const theme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<PrivateRoute element={<AppLayout />} />}>
            <Route index element={<Home />} />
            <Route path="/:chatRoomId" element={<ChatRoom />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
