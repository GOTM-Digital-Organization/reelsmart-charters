import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ChartersPage from "./pages/ChartersPage";
import GalleryPage from "./pages/GalleryPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import BookTripPage from "./pages/BookTripPage";
import AdminDashboard from "./pages/AdminDashboard";
import VenicePage from "./pages/VenicePage";
import BradentonPage from "./pages/BradentonPage";
import LandingPage from "./pages/LandingPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/charters" component={ChartersPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/book" component={BookTripPage} />
      <Route path="/contact" component={BookTripPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/fishing-charters-venice-fl" component={VenicePage} />
      <Route path="/fishing-charters-bradenton-fl" component={BradentonPage} />
      <Route path="/sarasota-fishing-charters-lp" component={LandingPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
