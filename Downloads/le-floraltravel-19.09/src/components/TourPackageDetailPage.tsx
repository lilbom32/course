import React, { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import type { View } from '../App';

interface TourPackageDetailPageProps {
    id: string;
    onNavigate: (view: View) => void;
}

interface TourPackageData {
    id: string;
    hero: {
        title: string;
        subtitle: string;
        backgroundImage: string;
        description: string;
    };
    infoBar: {
        duration: string;
        groupSize: string;
        difficulty: string;
        price: string;
    };
    destinations: Array<{
        id: string;
        name: string;
        image: string;
        description: string;
        rating: number;
        reviewCount: number;
    }>;
    packages: Array<{
        id: string;
        title: string;
        description: string;
        image: string;
        price: string;
    }>;
    bookingSteps: Array<{
        step: number;
        title: string;
        description: string;
        icon: string;
    }>;
}

export const TourPackageDetailPage: React.FC<TourPackageDetailPageProps> = ({ id, onNavigate }) => {
    const { language, t } = useLocalization();
    const [tourData, setTourData] = useState<TourPackageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockData: TourPackageData = {
            id,
            hero: {
                title: "El Nido Adventure Package",
                subtitle: "Beach Paradise",
                backgroundImage: "/images/el-nido-hero.jpg",
                description: "Discover breathtaking destinations across the Philippines with curated tours, local insights, and hassle-free planning all in one platform."
            },
            infoBar: {
                duration: "5 Days / 4 Nights",
                groupSize: "Max 12 People",
                difficulty: "Moderate",
                price: "Starts at ₱4,999"
            },
            destinations: [
                {
                    id: "el-nido",
                    name: "El Nido",
                    image: "/images/el-nido.jpg",
                    description: "Beach paradise with limestone cliffs and turquoise waters",
                    rating: 4.8,
                    reviewCount: 12000
                },
                {
                    id: "coron",
                    name: "Coron",
                    image: "/images/coron.jpg",
                    description: "World-class diving and pristine lagoons",
                    rating: 4.7,
                    reviewCount: 8500
                },
                {
                    id: "port-barton",
                    name: "Port Barton",
                    image: "/images/port-barton.jpg",
                    description: "Hidden gem with untouched beaches",
                    rating: 4.6,
                    reviewCount: 3200
                }
            ],
            packages: [
                {
                    id: "island-hopper",
                    title: "Island Hopper Adventure",
                    description: "Hop from beach to beach in Palawan with boat tours, guided snorkeling, and a sunset cruise.",
                    image: "/images/island-hopper.jpg",
                    price: "₱4,999"
                },
                {
                    id: "diving-package",
                    title: "Diving Explorer Package",
                    description: "Explore underwater wonders with professional diving guides and equipment included.",
                    image: "/images/diving-package.jpg",
                    price: "₱6,500"
                }
            ],
            bookingSteps: [
                {
                    step: 1,
                    title: "Pick Your Destination",
                    description: "Choose from our curated selection of Philippine destinations",
                    icon: "📍"
                },
                {
                    step: 2,
                    title: "Customize Your Tour",
                    description: "Personalize your experience with our flexible options",
                    icon: "⚙️"
                },
                {
                    step: 3,
                    title: "Confirm & Travel",
                    description: "Book with confidence and start your adventure",
                    icon: "✈️"
                }
            ]
        };

        setTimeout(() => {
            setTourData(mockData);
            setIsLoading(false);
        }, 1000);
    }, [id]);

    if (isLoading) {
        return (
            <div className="content-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading tour package details...</p>
            </div>
        );
    }

    if (!tourData) {
        return (
            <div className="content-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Sorry, we couldn't find the tour package you were looking for.</p>
            </div>
        );
    }

    return (
        <div className="tour-package-detail-page">
            {/* Header Navigation */}
            <header className="tour-package-header">
                <div className="header-content">
                    <div className="logo">WANDER.ph</div>
                    <nav className="header-nav">
                        <a href="#" className="nav-link">Home</a>
                        <a href="#" className="nav-link">Destinations</a>
                        <a href="#" className="nav-link">Packages</a>
                        <a href="#" className="nav-link">Blog</a>
                        <a href="#" className="nav-link">About Us</a>
                    </nav>
                    <div className="header-actions">
                        <div className="search-bar">
                            <input type="text" placeholder="Search for a place, city, or destination..." />
                            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <button className="btn btn-primary">Book now</button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="tour-package-hero" style={{ backgroundImage: `url(${tourData.hero.backgroundImage})` }}>
                <div className="hero-content">
                    <h1 className="hero-title">{tourData.hero.title}</h1>
                    <p className="hero-subtitle">{tourData.hero.subtitle}</p>
                    <p className="hero-description">{tourData.hero.description}</p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-large">Plan Your Trip</button>
                        <button className="btn btn-secondary btn-large">Explore Destinations</button>
                    </div>
                </div>
            </section>

            {/* Info Bar */}
            <section className="tour-package-info-bar">
                <div className="info-bar-grid">
                    <div className="info-item">
                        <span className="info-label">Duration</span>
                        <span className="info-value">{tourData.infoBar.duration}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Group Size</span>
                        <span className="info-value">{tourData.infoBar.groupSize}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Difficulty</span>
                        <span className="info-value">{tourData.infoBar.difficulty}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Price</span>
                        <span className="info-value">{tourData.infoBar.price}</span>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="why-choose-section">
                <div className="section-content">
                    <h2 className="section-title">Why Thousands of Travelers Choose WANDER.ph for Their Philippine Adventures</h2>
                    <p className="section-description">
                        From pristine beaches to cultural hotspots, we make exploring the Philippines easier, safer, and more exciting with expert-crafted itineraries and round-the-clock support.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link">Instagram</a>
                        <a href="#" className="social-link">Twitter</a>
                        <a href="#" className="social-link">Facebook</a>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">👁️</div>
                            <div className="stat-number">12k</div>
                            <div className="stat-label">Happy and Satisfied Travelers</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">⚙️</div>
                            <div className="stat-number">10yrs</div>
                            <div className="stat-label">Proven Travel Industry Experience</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">👤</div>
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Philippine Destinations Covered</div>
                        </div>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🗺️</div>
                            <h3>Local Expertise</h3>
                            <p>Our Filipino travel experts craft unique experiences with insider knowledge you won't find in typical tours.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>All-in-One Booking</h3>
                            <p>Book everything in one place—easy, fast, and hassle-free, whether for quick getaways or planned vacations.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎧</div>
                            <h3>24/7 Support</h3>
                            <p>We're here anytime, anywhere. Get real-time help anytime you need it before, during, or after your trip.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Destinations Section */}
            <section className="top-destinations-section">
                <div className="section-content">
                    <div className="section-header">
                        <h2 className="section-title">Top Destinations</h2>
                        <p className="section-subtitle">From island escapes to cool mountain towns, discover where your next journey will take you.</p>
                    </div>
                    <div className="destinations-carousel">
                        {tourData.destinations.map((destination) => (
                            <div key={destination.id} className="destination-card">
                                <img src={destination.image} alt={destination.name} className="destination-image" />
                                <div className="destination-content">
                                    <h3 className="destination-name">{destination.name}</h3>
                                    <p className="destination-description">{destination.description}</p>
                                    <div className="destination-rating">
                                        <span className="rating-stars">★ {destination.rating}</span>
                                        <span className="rating-count">({destination.reviewCount.toLocaleString()})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-primary">View more</button>
                    </div>
                </div>
            </section>

            {/* Tour Packages Section */}
            <section className="tour-packages-section">
                <div className="section-content">
                    <div className="packages-grid">
                        <div className="packages-intro">
                            <h2 className="section-title">Tour Packages</h2>
                            <p className="section-description">Affordable, customizable, and unforgettable adventures.</p>
                            <button className="btn btn-primary">Browse all packages</button>
                        </div>
                        <div className="packages-examples">
                            {tourData.packages.map((pkg) => (
                                <div key={pkg.id} className="package-card">
                                    <img src={pkg.image} alt={pkg.title} className="package-image" />
                                    <div className="package-content">
                                        <h3 className="package-title">{pkg.title}</h3>
                                        <p className="package-description">{pkg.description}</p>
                                        <div className="package-price">{pkg.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Steps Section */}
            <section className="booking-steps-section">
                <div className="section-content">
                    <h2 className="section-title">Booking made as easy as 1-2-3.</h2>
                    <div className="steps-grid">
                        {tourData.bookingSteps.map((step) => (
                            <div key={step.step} className="step-item">
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
