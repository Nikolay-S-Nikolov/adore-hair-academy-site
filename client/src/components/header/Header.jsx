import { Link } from 'react-router'
import { useState } from "react";
import logo from '../../assets/ADORE-small.png'
import { useAuth } from '../../hooks/useAuth.js'


export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const onMenuClick = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);
    const { isAuthenticated, user } = useAuth()
    const isAdmin = user?.role === 'staff';

    return (
        <>
            <Link to="tel:0888123456" className="fixed-cta-phone" aria-label="Обади се сега">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1A237E">
                    <path
                        d="M6.62 10.79a15.464 15.464 0 0 0 6.59 6.59l1.82-1.82a1 1 0 0 1 1.01-.24 11.05 11.05 0 0 0 3.47.55 1 1 0 0 1 1 1v3.09a1 1 0 0 1-1 1A16 16 0 0 1 2 4a1 1 0 0 1 1-1h3.09a1 1 0 0 1 1 1 11.05 11.05 0 0 0 .55 3.47 1 1 0 0 1-.24 1.01z" />
                </svg>
            </Link>


            <header className={`header ${isOpen ? "nav-open" : ""}`}>
                <div className="container">
                    <Link to="/" className="logo-link">
                        <img src={logo} alt="ADORE Hair Academy Logo" className="logo-image" />
                    </Link>
                    <nav className="main-nav">
                        <ul>
                            <li><Link to="/" onClick={closeMenu}>Начало</Link></li>
                            <li><Link to="/courses" onClick={closeMenu}>Курсове</Link></li>
                            {isAuthenticated &&
                                <li><Link to="/dashboard" onClick={closeMenu}>Моето обучение</Link></li>
                            }
                            {isAdmin &&
                                <li><Link to="/admin" onClick={closeMenu}>Админ панел</Link></li>
                            }
                            <li><Link to="/products" onClick={closeMenu}>Продукти</Link></li>
                            <li><Link to="/about" onClick={closeMenu}>За нас</Link></li>
                            <li><Link to="/contact" onClick={closeMenu}>Контакти</Link></li>
                            {!isAuthenticated &&
                                <li className="nav-login"><Link to="/login" onClick={closeMenu}>Вход</Link></li>
                            }
                            {isAuthenticated &&
                                <li className="nav-login"><Link to="/logout" onClick={closeMenu}>Излизане</Link></li>
                            }
                            <li><Link to="tel:0888123456" className="cta-button primary-cta" onClick={closeMenu}>📞 Обади се сега</Link></li>
                        </ul>
                    </nav>
                    <button
                        className={`hamburger-menu ${isOpen ? "is-active" : ""}`}
                        onClick={onMenuClick}
                        aria-label="Меню"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </header >
        </>
    );
};