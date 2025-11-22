import logo from "../../assets/ADORE-small.png"

// TODO make the mobile menu working
export default function Header() {
    return (
        <>
            <a href="tel:0888123456" className="fixed-cta-phone" aria-label="Обади се сега">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1A237E">
                    <path
                        d="M6.62 10.79a15.464 15.464 0 0 0 6.59 6.59l1.82-1.82a1 1 0 0 1 1.01-.24 11.05 11.05 0 0 0 3.47.55 1 1 0 0 1 1 1v3.09a1 1 0 0 1-1 1A16 16 0 0 1 2 4a1 1 0 0 1 1-1h3.09a1 1 0 0 1 1 1 11.05 11.05 0 0 0 .55 3.47 1 1 0 0 1-.24 1.01z" />
                </svg>
            </a>


            <header className="header">
                <div className="container">
                    <a href="#home" className="logo-link">
                        <img src={logo} alt="ADORE Hair Academy Logo" className="logo-image"/>
                    </a>
                    <nav className="main-nav">
                        <ul>
                            <li><a href="#home">Начало</a></li>
                            <li><a href="#courses">Курсове</a></li>
                            <li><a href="#about">За нас</a></li>
                            <li><a href="#contact">Контакти</a></li>
                            <li className="nav-login"><a href="#login">Вход</a></li>
                            <li><a href="tel:0888123456" className="cta-button primary-cta">📞 Обади се сега</a></li>
                        </ul>
                    </nav>
                    <button className="hamburger-menu" aria-label="Меню">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </header>
        </>
    );
};