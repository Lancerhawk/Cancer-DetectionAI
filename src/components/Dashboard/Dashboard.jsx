import { useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css';
import History from './History';
import LungCancer from './CancerTypes/LungCancer';
import ProstateCancer from './CancerTypes/ProstateCancer';
import BreastCancer from './CancerTypes/BreastCancer';
import ColorectalCancer from './CancerTypes/ColorectalCancer';
import SkinCancer from './CancerTypes/SkinCancer';
import LiverCancer from './CancerTypes/LiverCancer';
import StomachCancer from './CancerTypes/StomachCancer';
import EsophagealCancer from './CancerTypes/EsophagealCancer';
import PancreaticCancer from './CancerTypes/PancreaticCancer';
import OvarianCancer from './CancerTypes/OvarianCancer';
import KidneyCancer from './CancerTypes/KidneyCancer';
import BladderCancer from './CancerTypes/BladderCancer';
import Leukemia from './CancerTypes/Leukemia';
import Lymphoma from './CancerTypes/Lymphoma';
import MouthAndThroatCancer from './CancerTypes/MouthAndThroatCancer';
import CervicalCancer from './CancerTypes/CervicalCancer';
import BrainCancer from './CancerTypes/BrainCancer';
import EndometrialCancer from './CancerTypes/EndometrialCancer';
import ThyroidCancer from './CancerTypes/ThyroidCancer';
import MultipleMyeloma from './CancerTypes/MultipleMyeloma';
import Blank from '../Blank';

const Dashboard = () => {
    const [selectedCancer, setSelectedCancer] = useState('');
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const cancerTypes = [
        { name: 'LungCancer', label: 'Lung Cancer', description: 'CT Scan, X-Ray' },
        { name: 'ProstateCancer', label: 'Prostate Cancer', description: 'MRI, Biopsy' },
        { name: 'BreastCancer', label: 'Breast Cancer', description: 'Mammogram, Ultrasound' },
        { name: 'ColorectalCancer', label: 'Colorectal Cancer', description: 'Colonoscopy, Biopsy' },
        { name: 'SkinCancer', label: 'Skin Cancer', description: 'Skin Biopsy, Dermoscopy' },
        { name: 'LiverCancer', label: 'Liver Cancer', description: 'CT Scan, MRI' },
        { name: 'StomachCancer', label: 'Stomach Cancer', description: 'Endoscopy, Biopsy' },
        { name: 'EsophagealCancer', label: 'Esophageal Cancer', description: 'Endoscopy, Biopsy' },
        { name: 'PancreaticCancer', label: 'Pancreatic Cancer', description: 'CT Scan, Biopsy' },
        { name: 'OvarianCancer', label: 'Ovarian Cancer', description: 'Ultrasound, Biopsy' },
        { name: 'KidneyCancer', label: 'Kidney Cancer', description: 'CT Scan, Biopsy' },
        { name: 'BladderCancer', label: 'Bladder Cancer', description: 'Cystoscopy, Biopsy' },
        { name: 'Leukemia', label: 'Leukemia', description: 'Blood Test, Bone Marrow Biopsy' },
        { name: 'Lymphoma', label: 'Lymphoma', description: 'Lymph Node Biopsy, CT Scan' },
        { name: 'MouthAndThroatCancer', label: 'Mouth and Throat Cancer', description: 'Biopsy, Endoscopy' },
        { name: 'CervicalCancer', label: 'Cervical Cancer', description: 'Pap Smear, Biopsy' },
        { name: 'BrainCancer', label: 'Brain Cancer', description: 'MRI, Biopsy' },
        { name: 'EndometrialCancer', label: 'Endometrial Cancer', description: 'Ultrasound, Biopsy' },
        { name: 'ThyroidCancer', label: 'Thyroid Cancer', description: 'Ultrasound, Biopsy' },
        { name: 'MultipleMyeloma', label: 'Multiple Myeloma', description: 'Blood Test, Bone Marrow Biopsy' },
        { name: 'CancerFinder', label: 'Cancer Finder', description: 'Upload various test results' },
    ];

    const renderCancerComponent = () => {
        switch (selectedCancer) {
            case 'History':
                return <History />;
            case 'LungCancer':
                return <LungCancer />;
            case 'ProstateCancer':
                return <ProstateCancer />;
            case 'BreastCancer':
                return <BreastCancer />;
            case 'ColorectalCancer':
                return <ColorectalCancer />;
            case 'SkinCancer':
                return <SkinCancer />;
            case 'LiverCancer':
                return <LiverCancer />;
            case 'StomachCancer':
                return <StomachCancer />;
            case 'EsophagealCancer':
                return <EsophagealCancer />;
            case 'PancreaticCancer':
                return <PancreaticCancer />;
            case 'OvarianCancer':
                return <OvarianCancer />;
            case 'KidneyCancer':
                return <KidneyCancer />;
            case 'BladderCancer':
                return <BladderCancer />;
            case 'Leukemia':
                return <Leukemia />;
            case 'Lymphoma':
                return <Lymphoma />;
            case 'MouthAndThroatCancer':
                return <MouthAndThroatCancer />;
            case 'CervicalCancer':
                return <CervicalCancer />;
            case 'BrainCancer':
                return <BrainCancer />;
            case 'EndometrialCancer':
                return <EndometrialCancer />;
            case 'ThyroidCancer':
                return <ThyroidCancer />;
            case 'MultipleMyeloma':
                return <MultipleMyeloma />;
            default:
                return <Blank/>;
        }
    };

    const filteredCancerTypes = cancerTypes.filter(cancer => 
        cancer.name !== 'CancerFinder' && cancer.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNavigateToProfile = () => {
      navigate('/Profile');  
  };

    return (
        <div className="dashboard-container">
            <div className={`sidebar ${sidebarVisible ? 'sidebar-visible' : ''}`}>

                <div 
                    key="Dashboard"
                    className={`card-dashboard-history card-dashboard ${selectedCancer === 'profile' ? 'active' : ''}`} 
                    onClick={handleNavigateToProfile}  
                >
                    <h3>Dashboard</h3>
                </div>
                
                <div 
                    key="History"
                    className={`card-dashboard-history card-dashboard ${selectedCancer === 'History' ? 'active' : ''}`} 
                    onClick={() => setSelectedCancer('History')}
                >
                    <h3>History</h3>
                </div>

                <input
                    type="text"
                    placeholder="Search cancer types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="sidebar-search"
                />

                {filteredCancerTypes.map((cancer) => (
                    <div 
                        key={cancer.name}
                        className={`card-dashboard ${selectedCancer === cancer.name ? 'active' : ''}`} 
                        onClick={() => setSelectedCancer(cancer.name)}
                    >
                        <h3>{cancer.label}</h3>
                        <p>{cancer.description}</p>
                    </div>
                ))}
            </div>

            <button className="sidebar-toggle" onClick={() => setSidebarVisible(!sidebarVisible)}>
                {sidebarVisible ? '←' : '→'}
            </button>

            <div className="main-content">
                {renderCancerComponent()}
            </div>
        </div>
    );
};

export default Dashboard;
