import { Amplify, Auth } from "aws-amplify";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { Route, Routes } from "react-router-dom";
import Team from "./scenes/team";
import Calendar from "./scenes/calendar/calendar";
import ManageFiles from "./scenes/managefiles";
// import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
// import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [theme, colorMode] = useMode();
  const [credentials, setCredentials] = useState(null);
  const [session, setSession] = useState(null);
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    async function getCurrentCredentials() {
      try {
        const credentials = await Auth.currentUserInfo();
        setCredentials(credentials);
      } catch (error) {
        console.log("Error getting current credentials:", error);
      }
    }

    getCurrentCredentials();
  }, []);

  useEffect(() => {
    async function getCurrentSession() {
      try {
        const session = await Auth.currentSession();
        setSession(session);
      } catch (error) {
        console.log("Error getting current user session:", error);
      }
    }

    getCurrentSession();
  }, []);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              {/* <h1>Hello {user.username}</h1> */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/manageFiles" element={<ManageFiles />} />
                <Route path="/bar" element={<Bar />} />
              </Routes>

              {/* <div>
      {credentials ? (
        <div>
          <p>Username: {credentials.username}</p>
          <p>Email: {credentials.attributes.email}</p>
          <p>Phone Number: {credentials.attributes.admin}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
      </div> */}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default withAuthenticator(App);
