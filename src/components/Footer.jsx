import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p>
        <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
      </p>
    </footer>
  );
};

export default Footer;
