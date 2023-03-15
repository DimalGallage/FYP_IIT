import './Footer.css';

function Footer() {
  return (
    <div className="footer">
        <div className="footer-column">
        <img src="/logo.png" alt="Logo" className="logo" />
        </div>

        {/*  */}
        <div className="footer-column">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        </div>

        {/*  */}
        <div className="footer-column">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ac nisl quis varius. Nam hendrerit dui sed ante rutrum aliquet.</p>
            <div className="social-media-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
        </div>
    </div>
  );
}

export default Footer;