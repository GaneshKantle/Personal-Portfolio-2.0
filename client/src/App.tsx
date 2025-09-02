import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import AllProjects from "./components/projects/all-projects";
import ProjectDetails from "./components/projects/project-details";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={Home} />
      <Route path="/skills" component={Home} />
      <Route path="/experience" component={Home} />
      <Route path="/education" component={Home} />
      <Route path="/projects" component={Home} />
      <Route path="/activities" component={Home} />
      <Route path="/certificates" component={Home} />
      <Route path="/contact" component={Home} />
      <Route path="/all-projects" component={AllProjects} />
      <Route path="/projects/:id" component={ProjectDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
      <SpeedInsights />
      <Analytics />
    </TooltipProvider>
  );
}

export default App;
