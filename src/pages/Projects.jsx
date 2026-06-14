import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, X, ChevronLeft, ChevronRight, MapPin, Award, Trash2, ShieldCheck, Leaf,
  Grid, Compass, Heart, MessageCircle, Share2, UserPlus, UserCheck, Check, Bookmark,
  Home, Briefcase, Users, Factory, TrendingUp, Globe, Pin, FileText, Info
} from 'lucide-react';
import './Pages.css';

const categories = ['All', 'Residential', 'Commercial', 'Community', 'Industrial'];

const galleryProjects = [
  {
    id: 1,
    title: 'Tongelreep Swimming Centre',
    location: 'Eindhoven, Netherlands',
    category: 'Community',
    image: '/swimming-centre.jpg',
    desc: 'The beautiful new Tongelreep Swimming Centre in Eindhoven features cladding built from circular plastic tiles. This public-use facility showcases how sustainable building designs can be scaled to support municipal projects.',
    year: '2024',
    city: 'Eindhoven',
    country: 'Netherlands',
    client: 'Municipality of Eindhoven',
    clientUrl: 'https://www.eindhovensport.nl/zwemmen/tongelreep#',
    architect: 'Slangen+Koenis Architects',
    architectUrl: 'https://www.slangenkoenis.nl/en/',
    builder: 'Mertens Bouwbedrijf',
    builderUrl: 'https://www.mertens-weert.nl/',
    tilesUsed: 'First One, 6 shades of grey & green gradient',
    areaSqM: '1,400 m²',
    numTiles: '30,800',
    wasteUpcycled: '34,160 KG',
    photographer: 'Maarten van Apeldoorn Photography',
    photographerUrl: 'https://maarten.photos/',
    storyHtml: [
      "Pretty Plastic, producer of innovative and sustainable cladding tiles made from 100% recycled PVC, is once again making a significant step in circular construction. From this autumn, the largest application of their material to date will be showcased on the façade of the renovated the Tongelreep National Swimming Centre in Eindhoven, the Netherlands. With no fewer than 30,800 tiles, spread over 1,400 m², this project marks a new milestone in sustainable architecture.",
      "For the renovation of the Tongelreep, a national swimming centre and an iconic building in Eindhoven, the choice fell on Pretty Plastic due to its sustainability, aesthetic versatility, and local character of the product.",
      "Slangen+Koenis Architects, responsible for the design, believed in the potential of Pretty Plastic from the outset. The start-up collaborated smoothly with the Municipality of Eindhoven and contractor Mertens Bouwbedrijf to ensure the project maintained its circular character.",
      "The façade concept for the Tongelreep seamlessly aligns with the existing swimming stadium, featuring a robust anthracite base that contrasts with the more open sections. For the enclosed parts of the swimming areas, small-scale shingles were chosen, adding texture and depth to the façade. Pretty Plastic’s shingles are easy to install and can be cut to size on-site, offering flexibility in detailing. The design incorporates a varying pattern, enhanced with a gradient of three green tones that subtly reference the surrounding landscape of the Tongelreep River."
    ],
    galleryImages: [
      '/swimming-centre-detail-1.jpg',
      '/swimming-centre-detail-2.jpg',
      '/swimming-centre-detail-3.jpg'
    ],
    impact: {
      plastic: '34,160 KG',
      co2: '51.2 Tonnes Offset',
      energy: 'Class A+ Insulation'
    }
  },
  {
    id: 2,
    title: 'Monaco Office Facade',
    location: 'Munich, Germany',
    category: 'Commercial',
    image: '/monaco-office.jpg',
    desc: 'Designed in collaboration with world-renowned architects MVRDV, this office complex incorporates a textured cladding pattern made entirely from recycled building shingles. The panels provide durable weather protection while reducing the building\'s embodied carbon.',
    year: '2023',
    city: 'Munich',
    country: 'Germany',
    client: 'Monaco Investments Group',
    clientUrl: '#',
    architect: 'MVRDV Architects',
    architectUrl: 'https://www.mvrdv.com/',
    builder: 'Hochtief Building',
    builderUrl: 'https://www.hochtief.com/',
    tilesUsed: 'First One, Custom Terracotta & Grey Blend',
    areaSqM: '950 m²',
    numTiles: '20,900',
    wasteUpcycled: '23,190 KG',
    photographer: 'Ossip van Duivenbode',
    photographerUrl: 'https://www.ossip.nl/',
    storyHtml: [
      "WasteCraft collaborated with world-renowned architectural firm MVRDV to design the facade of the Monaco Office Complex in Munich. The project stands as a bold testament to circular design in corporate real estate, proving that large-scale commercial buildings can achieve high aesthetic standards using recycled materials.",
      "The architectural team chose a custom textured shingle layout blending terracotta tones with slate grey, creating a facade that shifts dynamically with the angle of sunlight. Each panel provides weather-resistant protection, shielding the structural walls from Munich's harsh seasonal changes while drastically reducing the building's embodied carbon footprint.",
      "The circular integration extends beyond the tiles themselves: the fastening system is entirely mechanical, ensuring that all shingles can be demounted and repurposed at the end of the building's life cycle. This project marks a significant step forward in making sustainable materials a standard choice for international commercial developments."
    ],
    galleryImages: [
      '/monaco-detail-1.jpg',
      '/monaco-detail-2.jpg',
      '/monaco-detail-3.jpg'
    ],
    impact: {
      plastic: '23,190 KG',
      co2: '34.8 Tonnes Offset',
      energy: '42% Heat Reduction'
    }
  },
  {
    id: 3,
    title: 'IKC De Tamboerijn School',
    location: 'Zaltbommel, Netherlands',
    category: 'Community',
    image: '/tambourijn-school.jpg',
    desc: 'This child-friendly public school building incorporates colorful, robust recycled plastic tiles along its second-story facade. The building serves as an educational model for younger generations on circular economics and sustainability.',
    year: '2024',
    city: 'Zaltbommel',
    country: 'Netherlands',
    client: 'Municipality of Zaltbommel',
    clientUrl: '#',
    architect: 'Jeanne Dekkers Architectuur',
    architectUrl: 'https://www.jeannedekkers.nl/',
    builder: 'Giesbers Ontwikkelen en Bouwen',
    builderUrl: 'https://www.giesbersrotterdam.nl/',
    tilesUsed: 'First One, Mixed Bright Pastel & Earth Tones',
    areaSqM: '720 m²',
    numTiles: '15,800',
    wasteUpcycled: '17,530 KG',
    photographer: 'Scagliola Brakkee',
    photographerUrl: 'http://www.scagliolabrakkee.nl/',
    storyHtml: [
      "The IKC De Tamboerijn School project integrates educational purpose with architectural sustainability. The community facility is designed as an interactive learning model for kids, featuring public-facing elements that demonstrate how society can upcycle plastic waste into durable, beautiful structures.",
      "The architect specified a lively mosaic pattern of composite tiles along the second-story facade. These shingles are impact-resistant, making them ideal for school environments, and provide superior thermal insulation to help keep classrooms naturally warm in winter and cool in summer.",
      "The local municipality and school board selected WasteCraft tiles to support their zero-waste goals. Through educational workshops held during construction, students learned that their new school facade was once single-use PVC products, creating a direct connection between daily actions and circular architectural design."
    ],
    galleryImages: [
      '/tambourijn-school.jpg',
      '/tambourijn-detail-1.jpg',
      '/tambourijn-detail-2.jpg'
    ],
    impact: {
      plastic: '17,530 KG',
      co2: '26.3 Tonnes Offset',
      energy: 'Eco-Certified Safe'
    }
  },
  {
    id: 4,
    title: 'Contemporary Garden House',
    location: 'Oakley, United Kingdom',
    category: 'Residential',
    image: '/garden-house.jpg',
    desc: 'An architectural residential project featuring grey composite shingles surrounding large sliding glass doors. The cladding creates a natural textured look that blends into the surrounding landscape while ensuring superior thermal insulation.',
    year: '2023',
    city: 'Oakley, Hampshire',
    country: 'United Kingdom',
    client: 'Private Residential Owner',
    clientUrl: '#',
    architect: 'McLean Quinlan',
    architectUrl: 'https://mcleanquinlan.com/',
    builder: 'Oakwood Bespoke Builders',
    builderUrl: '#',
    tilesUsed: 'First One, Slate Grey & Charcoal Shingles',
    areaSqM: '180 m²',
    numTiles: '3,960',
    wasteUpcycled: '4,390 KG',
    photographer: 'Nick Hufton',
    photographerUrl: 'https://www.huftonandcrow.com/',
    storyHtml: [
      "Tucked into the lush landscape of Oakley, this private residential project showcases how upcycled cladding can complement high-end contemporary home design. The project demonstrates that sustainable architecture is not just functional but can achieve organic elegance.",
      "The architect chose slate grey composite shingles to envelop the upper level, contrasting with the warm timber and glass of the lower floors. The textured surface creates shadows that blend into the surrounding forest landscape, creating a quiet, low-maintenance retreat that requires no painting or sealing.",
      "In addition to its visual qualities, the shingles form a high-performance envelope. Combined with eco-friendly wood fibre insulation, they ensure the garden house maintains a minimal thermal exchange rate, keeping energy bills exceptionally low throughout the year."
    ],
    galleryImages: [
      '/garden-house.jpg',
      '/garden-house-detail-1.jpg',
      '/garden-house-detail-2.jpg'
    ],
    impact: {
      plastic: '4,390 KG',
      co2: '6.6 Tonnes Offset',
      energy: '3.4x Cool Efficiency'
    }
  },
  {
    id: 5,
    title: 'Exhibition People\'s Pavilion',
    location: 'Eindhoven, Netherlands',
    category: 'Community',
    image: '/peoples-pavilion.jpg',
    desc: 'A temporary 100% circular exhibition building erected for Dutch Design Week. Built with loaner materials, the facade shingles were returned undamaged after the exhibition to be reused in other projects.',
    year: '2022',
    city: 'Eindhoven',
    country: 'Netherlands',
    client: 'Dutch Design Foundation',
    clientUrl: '#',
    architect: 'Bureau SLA & Overtreders W',
    architectUrl: 'http://www.bureausla.nl/',
    builder: 'Eindhoven Municipality Engineers',
    builderUrl: '#',
    tilesUsed: 'First One, Multi-colour Confetti Blend',
    areaSqM: '850 m²',
    numTiles: '18,700',
    wasteUpcycled: '20,750 KG',
    photographer: 'Filip Dujardin',
    photographerUrl: 'http://www.filipdujardin.be/',
    storyHtml: [
      "Built for Dutch Design Week, the People's Pavilion was designed as a temporary structure made from 100% borrowed materials. The design concept challenged the building industry to construct an entire public space without producing any waste or consuming new resources.",
      "The facade was clad in multi-colour circular shingles made from post-consumer PVC waste, arranged in a vibrant \"confetti\" pattern. Rather than using glue or screws that damage materials, the tiles were hung using a tensioned strap system, allowing them to be returned to the circular economy undamaged.",
      "At the end of the exhibition, the pavilion was completely disassembled. The tiles were subsequently distributed and installed on permanent municipal structures in the Eindhoven region, showing a practical model for temporary urban architecture and resource reuse."
    ],
    galleryImages: [
      '/peoples-pavilion.jpg',
      '/pavilion-detail-1.jpg',
      '/pavilion-detail-2.jpg'
    ],
    impact: {
      plastic: '20,750 KG',
      co2: '31.1 Tonnes Offset',
      energy: 'Zero Waste Circular'
    }
  },
  {
    id: 6,
    title: 'FINC Corporate Offices',
    location: 'Chelmsford, United Kingdom',
    category: 'Commercial',
    image: '/finc-office.jpg',
    desc: 'A sustainable commercial extension clad in dark charcoal-grey composite tiles. Designed to minimize heating costs by creating an energy-retentive outer envelope that reduces the heat load on HVAC systems.',
    year: '2023',
    city: 'Chelmsford, Essex',
    country: 'United Kingdom',
    client: 'FINC Architects',
    clientUrl: 'https://fincarchitects.com/',
    architect: 'FINC Architects',
    architectUrl: 'https://fincarchitects.com/',
    builder: 'Readie Construction',
    builderUrl: 'https://readie.co.uk/',
    tilesUsed: 'First One, Dark Charcoal & Bronze Accent Shingles',
    areaSqM: '620 m%',
    numTiles: '13,640',
    wasteUpcycled: '15,140 KG',
    photographer: 'Keith Collie',
    photographerUrl: 'http://www.keithcollie.co.uk/',
    storyHtml: [
      "When designing their own corporate extension, FINC Architects wanted to create a building that reflected their commitment to green technology. The extension utilizes WasteCraft's dark charcoal tiles to wrap the upper volumes, expressing industrial sustainability.",
      "The dark shingles act as an energy-retentive envelope, optimizing the thermal efficiency of the facade and reducing the cooling load on HVAC systems. The weather-resistant qualities of upcycled PVC guarantee that the building's exterior will remain pristine for decades without requiring maintenance.",
      "The project successfully demonstrates to local developers that carbon-neutral, circular materials are highly competitive in cost, durability, and aesthetics compared to traditional brickwork or composite rainscreens."
    ],
    galleryImages: [
      '/finc-office.jpg',
      '/finc-detail-1.jpg',
      '/finc-detail-2.jpg'
    ],
    impact: {
      plastic: '15,140 KG',
      co2: '22.7 Tonnes Offset',
      energy: '38% Energy Savings'
    }
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'inspire' | 'impact'
  const [isFollowing, setIsFollowing] = useState(false);
  const [savedProjects, setSavedProjects] = useState([]);
  const [calcSqM, setCalcSqM] = useState(500);

  // Filter projects based on category selection
  const filteredProjects = activeCategory === 'All'
    ? galleryProjects
    : galleryProjects.filter(p => p.category === activeCategory);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const toggleSaveProject = (e, id) => {
    e.stopPropagation();
    if (savedProjects.includes(id)) {
      setSavedProjects(savedProjects.filter(pId => pId !== id));
    } else {
      setSavedProjects([...savedProjects, id]);
    }
  };

  const getMockLikes = (id) => {
    const likes = [412, 628, 385, 290, 524, 345];
    return likes[(id - 1) % likes.length];
  };

  const getMockComments = (id) => {
    const comments = [18, 42, 21, 15, 33, 19];
    return comments[(id - 1) % comments.length];
  };

  const totalWasteUpcycled = 115160;
  const totalCO2Offset = 172.7;
  const totalAreaClad = 4050;
  const totalTiles = 103840;

  const categoryHighlights = [
    { name: 'All', label: 'All Projects', icon: Leaf },
    { name: 'Residential', label: 'Eco-Homes', icon: Home },
    { name: 'Commercial', label: 'Offices', icon: Briefcase },
    { name: 'Community', label: 'Public Spaces', icon: Users },
    { name: 'Industrial', label: 'Industrial', icon: Factory }
  ];

  return (
    <div className="page-wrapper gallery-page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="container"
          >
            {/* Instagram Profile Header Section */}
            <div className="insta-profile-container">
              <div className="insta-avatar-wrapper">
                <div className={`insta-avatar-ring ${isFollowing ? 'active-ring' : 'story-ring'}`}>
                  <div className="insta-avatar-inner">
                    <svg viewBox="0 0 100 100" className="insta-avatar-svg">
                      <circle cx="50" cy="50" r="48" fill="#13271C" />
                      <path d="M50,25 C63.8,25 75,36.2 75,50 C75,55.5 73.2,60.6 70.2,64.8 L50,45 L50,25 Z" fill="#96CE4D" />
                      <path d="M50,75 C36.2,75 25,63.8 25,50 C25,44.5 26.8,39.4 29.8,35.2 L50,55 L50,75 Z" fill="#96CE4D" opacity="0.8" />
                      <circle cx="50" cy="50" r="15" fill="#FAFAFA" />
                      <path d="M47,45 L53,45 L50,55 Z" fill="#13271C" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="insta-profile-info">
                <div className="insta-profile-username-row">
                  <h2 className="insta-username">wastecraft.official</h2>
                  <span className="insta-verified-badge" title="Verified Circular Builder">
                    <svg viewBox="0 0 24 24" className="verified-icon-svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white" />
                    </svg>
                  </span>
                  <div className="insta-profile-actions">
                    <button className={`btn-insta-follow ${isFollowing ? 'following' : ''}`} onClick={toggleFollow}>
                      {isFollowing ? (
                        <span className="btn-flex">Following <UserCheck size={14} /></span>
                      ) : (
                        <span className="btn-flex">Follow <UserPlus size={14} /></span>
                      )}
                    </button>
                    <button className="btn-insta-message">Message</button>
                    <button className="btn-insta-share"><Share2 size={14} /></button>
                  </div>
                </div>
                
                <div className="insta-profile-stats">
                  <span className="stat-item"><strong>{galleryProjects.length}</strong> posts</span>
                  <span className="stat-item"><strong>{isFollowing ? "12,843" : "12,842"}</strong> followers</span>
                  <span className="stat-item"><strong>{savedProjects.length}</strong> saved</span>
                </div>
                
                <div className="insta-profile-bio">
                  <h1 className="profile-display-name">WasteCraft Gallery</h1>
                  <span className="profile-category-label">Eco-Friendly Cladding & Architecture</span>
                  <p className="profile-bio-text">
                    🏗️ Zero-waste exterior cladding made of 100% recycled PVC shingles.<br />
                    ♻️ Upcycled <strong>{totalWasteUpcycled.toLocaleString()} KG</strong> of plastic waste.<br />
                    🌱 High-performance thermal & aesthetic facade solutions.<br />
                    🔗 <a href="https://prettyplastic.nl" target="_blank" rel="noopener noreferrer" className="profile-link">prettyplastic.nl</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Category Highlights (Circular bubbles) */}
            <div className="highlights-container">
              <div className="highlights-row">
                {categoryHighlights.map((highlight) => {
                  const IconComponent = highlight.icon;
                  const isActive = activeCategory === highlight.name;
                  return (
                    <button
                      key={highlight.name}
                      className={`highlight-item ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveCategory(highlight.name)}
                    >
                      <div className={`highlight-circle-wrapper ${isActive ? 'active-ring' : ''}`}>
                        <div className="highlight-circle">
                          <IconComponent size={22} className="highlight-icon" />
                        </div>
                      </div>
                      <span className="highlight-label">{highlight.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feed Selector (Grid vs Masonry vs Impact Dashboard) */}
            <div className="feed-tabs-divider" />
            <div className="feed-tabs-container">
              <button
                className={`feed-tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                <Grid size={16} />
                <span>POSTS</span>
              </button>
              <button
                className={`feed-tab-btn ${activeTab === 'inspire' ? 'active' : ''}`}
                onClick={() => setActiveTab('inspire')}
              >
                <Compass size={16} />
                <span>PINBOARD</span>
              </button>
              <button
                className={`feed-tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
                onClick={() => setActiveTab('impact')}
              >
                <TrendingUp size={16} />
                <span>IMPACT</span>
              </button>
            </div>

            {/* Tab Views */}
            <AnimatePresence mode="wait">
              {/* Instagram POSTS Grid */}
              {activeTab === 'posts' && (
                <motion.div
                  key="posts-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="insta-grid"
                >
                  {filteredProjects.map((project, idx) => (
                    <motion.div
                      layout
                      key={project.id}
                      className="insta-grid-item"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      onClick={() => handleSelectProject(project)}
                    >
                      <img src={project.image} alt={project.title} className="insta-grid-img" />
                      <div className="insta-grid-overlay">
                        <div className="insta-overlay-stats">
                          <span className="insta-overlay-stat">
                            <Heart size={18} fill="white" /> {getMockLikes(project.id)}
                          </span>
                          <span className="insta-overlay-stat">
                            <MessageCircle size={18} fill="white" /> {getMockComments(project.id)}
                          </span>
                        </div>
                        <div className="insta-overlay-meta">
                          <span className="insta-meta-kg">♻️ {project.impact.plastic.split(' ')[0]} KG</span>
                          <span className="insta-meta-loc"><MapPin size={10} /> {project.city}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Pinterest Pinboard Grid */}
              {activeTab === 'inspire' && (
                <motion.div
                  key="inspire-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pinterest-masonry"
                >
                  {filteredProjects.map((project, idx) => {
                    const isSaved = savedProjects.includes(project.id);
                    return (
                      <motion.div
                        key={project.id}
                        className="pinterest-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.04 }}
                        onClick={() => handleSelectProject(project)}
                      >
                        <div className="pinterest-image-wrapper">
                          <img src={project.image} alt={project.title} className="pinterest-img" />
                          <div className="pinterest-hover-overlay">
                            <button
                              className={`pinterest-save-btn ${isSaved ? 'saved' : ''}`}
                              onClick={(e) => toggleSaveProject(e, project.id)}
                            >
                              {isSaved ? 'Saved' : 'Save'}
                            </button>
                            <div className="pinterest-overlay-bottom">
                              <span className="pin-category">{project.category}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pinterest-info">
                          <h3 className="pin-title">{project.title}</h3>
                          <div className="pin-meta">
                            <div className="pin-author">
                              <div className="pin-avatar">WC</div>
                              <span className="pin-author-name">wastecraft</span>
                            </div>
                            <span className="pin-location">
                              <MapPin size={10} /> {project.city}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Ecological Impact Dashboard */}
              {activeTab === 'impact' && (
                <motion.div
                  key="impact-dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="impact-dashboard-container"
                >
                  <div className="impact-header-stats">
                    <h2 className="dashboard-title">Ecological Ledger & Forecasting</h2>
                    <p className="dashboard-subtitle">Audited ecological savings across all deployed WasteCraft projects.</p>
                  </div>
                  
                  <div className="impact-stats-grid">
                    <div className="impact-stat-card glass-card">
                      <div className="stat-card-icon-wrapper circle-green">
                        <Leaf size={22} className="stat-icon" />
                      </div>
                      <div className="stat-card-details">
                        <span className="stat-card-label">Plastic Upcycled</span>
                        <h3 className="stat-card-value">{totalWasteUpcycled.toLocaleString()} KG</h3>
                        <span className="stat-card-sub">≈ 5.2M Single-use Bottles</span>
                      </div>
                    </div>
                    
                    <div className="impact-stat-card glass-card">
                      <div className="stat-card-icon-wrapper circle-blue">
                        <TrendingUp size={22} className="stat-icon" />
                      </div>
                      <div className="stat-card-details">
                        <span className="stat-card-label">CO₂ Offset</span>
                        <h3 className="stat-card-value">{totalCO2Offset.toFixed(1)} Tonnes</h3>
                        <span className="stat-card-sub">Embodied carbon diverted</span>
                      </div>
                    </div>

                    <div className="impact-stat-card glass-card">
                      <div className="stat-card-icon-wrapper circle-gold">
                        <Award size={22} className="stat-icon" />
                      </div>
                      <div className="stat-card-details">
                        <span className="stat-card-label">Total Area Clad</span>
                        <h3 className="stat-card-value">{totalAreaClad.toLocaleString()} m²</h3>
                        <span className="stat-card-sub">Eco-facade coverage</span>
                      </div>
                    </div>

                    <div className="impact-stat-card glass-card">
                      <div className="stat-card-icon-wrapper circle-red">
                        <ShieldCheck size={22} className="stat-icon" />
                      </div>
                      <div className="stat-card-details">
                        <span className="stat-card-label">Tiles Deployed</span>
                        <h3 className="stat-card-value">{totalTiles.toLocaleString()}</h3>
                        <span className="stat-card-sub">Zero-waste composite shingles</span>
                      </div>
                    </div>
                  </div>

                  <div className="impact-detailed-grid">
                    {/* Calculator Card */}
                    <div className="impact-calculator-card glass-card">
                      <h3>Estimator</h3>
                      <p className="calc-desc">Drag the slider to calculate the ecological impact of a custom-sized WasteCraft building facade.</p>
                      
                      <div className="calculator-slider-container">
                        <div className="slider-header">
                          <span>Facade Size: <strong>{calcSqM} m²</strong></span>
                          <span>{Math.round(calcSqM * 22).toLocaleString()} Shingles</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="3000"
                          value={calcSqM}
                          onChange={(e) => setCalcSqM(parseInt(e.target.value))}
                          className="slider-input"
                        />
                        <div className="slider-ticks">
                          <span>10 m²</span>
                          <span>1,000 m²</span>
                          <span>2,000 m²</span>
                          <span>3,000 m²</span>
                        </div>
                      </div>

                      <div className="calculator-outputs">
                        <div className="calc-output-box">
                          <span className="box-label">Waste Diverted</span>
                          <span className="box-value">{Math.round(calcSqM * 24.4).toLocaleString()} KG</span>
                          <span className="box-sub">Post-consumer PVC</span>
                        </div>
                        <div className="calc-output-box">
                          <span className="box-label">Carbon Offset</span>
                          <span className="box-value">{(calcSqM * 0.0366).toFixed(1)} T</span>
                          <span className="box-sub">Embodied CO₂ equivalent</span>
                        </div>
                        <div className="calc-output-box">
                          <span className="box-label">Plastic Bottles</span>
                          <span className="box-value">{Math.round(calcSqM * 24.4 * 50).toLocaleString()}</span>
                          <span className="box-sub">Upcycled equivalents</span>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Card */}
                    <div className="sector-breakdown-card glass-card">
                      <h3>Upcycling by Sector</h3>
                      <p className="breakdown-desc">Distribution of recycled plastic (KG) across project categories.</p>
                      
                      <div className="breakdown-bars">
                        <div className="breakdown-item">
                          <div className="breakdown-label-row">
                            <span>Community Spaces</span>
                            <strong>72,440 KG (62.9%)</strong>
                          </div>
                          <div className="breakdown-bar-bg">
                            <div className="breakdown-bar-fill" style={{ width: '62.9%', backgroundColor: '#96CE4D' }} />
                          </div>
                        </div>

                        <div className="breakdown-item">
                          <div className="breakdown-label-row">
                            <span>Commercial Offices</span>
                            <strong>38,330 KG (33.3%)</strong>
                          </div>
                          <div className="breakdown-bar-bg">
                            <div className="breakdown-bar-fill" style={{ width: '33.3%', backgroundColor: '#1E3E2A' }} />
                          </div>
                        </div>

                        <div className="breakdown-item">
                          <div className="breakdown-label-row">
                            <span>Residential Homes</span>
                            <strong>4,390 KG (3.8%)</strong>
                          </div>
                          <div className="breakdown-bar-bg">
                            <div className="breakdown-bar-fill" style={{ width: '3.8%', backgroundColor: '#64748b' }} />
                          </div>
                        </div>

                        <div className="breakdown-item">
                          <div className="breakdown-label-row">
                            <span>Industrial Facilities</span>
                            <strong>0 KG (0%)</strong>
                          </div>
                          <div className="breakdown-bar-bg">
                            <div className="breakdown-bar-fill" style={{ width: '0%', backgroundColor: '#cbd5e1' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="project-detail-view"
          >
            {/* Top Navigation */}
            <div className="container">
              <div className="project-detail-nav">
                <button className="project-detail-back-btn" onClick={() => { setSelectedProject(null); window.scrollTo(0,0); }}>
                  <ChevronLeft size={16} /> Back to Showcase Gallery
                </button>
              </div>
            </div>

            {/* Hero Banner Section */}
            <div className="project-detail-hero">
              <img src={selectedProject.image} alt={selectedProject.title} className="project-detail-hero-img" />
              <div className="project-detail-hero-overlay">
                <div className="container project-detail-hero-container">
                  <div className="project-detail-hero-content">
                    <span className="project-detail-category-badge">{selectedProject.category}</span>
                    <h1 className="project-detail-hero-title">{selectedProject.title}</h1>
                    <p className="project-detail-hero-meta">
                      <MapPin size={16} /> {selectedProject.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Layout Grid */}
            <div className="container project-detail-body-container">
              <div className="project-detail-grid">
                
                {/* Left Column: Narrative Content */}
                <div className="project-detail-story">
                  <div className="story-heading-area">
                    <h2 className="story-main-title">
                      {selectedProject.title.toUpperCase()}: INNOVATION IN CIRCULAR ARCHITECTURE
                    </h2>
                    <div className="story-divider" />
                  </div>
                  
                  {selectedProject.storyHtml && selectedProject.storyHtml.map((paragraph, index) => (
                    <p key={index} className="story-paragraph">
                      {paragraph}
                    </p>
                  ))}

                  {/* Secondary Closeup Images Grid */}
                  {selectedProject.galleryImages && (
                    <div className="project-detail-gallery-section">
                      <h3 className="gallery-section-title">🔍 Circular Material Details</h3>
                      <div className="project-detail-gallery-grid">
                        {selectedProject.galleryImages.map((imgUrl, idx) => (
                          <div key={idx} className="gallery-thumb-card">
                            <img src={imgUrl} alt={`${selectedProject.title} Detail ${idx + 1}`} className="gallery-thumb-img" />
                            <span className="thumb-caption">
                              {idx === 0 ? "Project View" : idx === 1 ? "Facade Detail" : "Material Profile"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Specifications Sidebar */}
                <div className="project-specs-sidebar">
                  <div className="specs-card-header">
                    <h3>Project Specifications</h3>
                  </div>
                  <div className="specs-table">
                    
                    <div className="specs-row">
                      <span className="specs-label">NAME OF PROJECT</span>
                      <span className="specs-value">
                        {selectedProject.clientUrl && selectedProject.clientUrl !== '#' ? (
                          <a href={selectedProject.clientUrl} target="_blank" rel="noopener noreferrer">
                            {selectedProject.title}
                          </a>
                        ) : selectedProject.title}
                      </span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">YEAR OF COMPLETION</span>
                      <span className="specs-value">{selectedProject.year}</span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">CITY, COUNTRY</span>
                      <span className="specs-value">{selectedProject.city}, {selectedProject.country}</span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">ARCHITECT</span>
                      <span className="specs-value">
                        {selectedProject.architectUrl && selectedProject.architectUrl !== '#' ? (
                          <a href={selectedProject.architectUrl} target="_blank" rel="noopener noreferrer">
                            {selectedProject.architect}
                          </a>
                        ) : selectedProject.architect}
                      </span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">BUILDER / CONTRACTOR</span>
                      <span className="specs-value">
                        {selectedProject.builderUrl && selectedProject.builderUrl !== '#' ? (
                          <a href={selectedProject.builderUrl} target="_blank" rel="noopener noreferrer">
                            {selectedProject.builder}
                          </a>
                        ) : selectedProject.builder}
                      </span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">TILES USED</span>
                      <span className="specs-value">{selectedProject.tilesUsed}</span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">TOTAL AREA</span>
                      <span className="specs-value">{selectedProject.areaSqM}</span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">NUMBER OF TILES</span>
                      <span className="specs-value">{selectedProject.numTiles}</span>
                    </div>

                    <div className="specs-row">
                      <span className="specs-label">PHOTOGRAPHER</span>
                      <span className="specs-value">
                        {selectedProject.photographerUrl && selectedProject.photographerUrl !== '#' ? (
                          <a href={selectedProject.photographerUrl} target="_blank" rel="noopener noreferrer">
                            {selectedProject.photographer}
                          </a>
                        ) : selectedProject.photographer}
                      </span>
                    </div>
                  </div>

                  {/* Ecological Impact Highlight */}
                  <div className="specs-impact-card">
                    <div className="specs-impact-header">
                      <Leaf size={18} className="impact-leaf-icon" />
                      <span>ECOLOGICAL SAVINGS</span>
                    </div>
                    <div className="specs-impact-body">
                      <div className="impact-metric">
                        <span className="metric-value">{selectedProject.impact.plastic}</span>
                        <span className="metric-label">Plastic Upcycled</span>
                      </div>
                      <div className="impact-metric">
                        <span className="metric-value">{selectedProject.impact.co2}</span>
                        <span className="metric-label">CO₂ Offset</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
