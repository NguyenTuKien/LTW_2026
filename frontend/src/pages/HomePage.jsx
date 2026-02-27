import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="home-title">Hệ thống Thi Trực Tuyến</h1>
        <p className="home-subtitle">
          Nền tảng thi trực tuyến hiện đại và chuyên nghiệp
        </p>
        <Link to="/admin" className="admin-btn">
          Vào Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
