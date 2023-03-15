import '../App.css';
import Navbar from '../Components/NavBar/Navbar'
import Footer from '../Components/Footer/Footer';
import UploadForm from '../Components/UploadInput/uploadForm';

function Home() {
  return (
    <div className="Home">
      <Navbar/>
        <UploadForm/>
      <Footer/>
    </div>
  );
}

export default Home;