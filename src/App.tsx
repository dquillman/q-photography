import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PhotoDetail from './pages/PhotoDetail';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Test from './pages/Test';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
    return (
        <CartProvider>
            <FavoritesProvider>
                <Router>
                    <div className="app-container">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/blog/:slug" element={<BlogPost />} />
                                <Route path="/photo/:id" element={<PhotoDetail />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/test" element={<Test />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </FavoritesProvider>
        </CartProvider>
    );
}

export default App;
