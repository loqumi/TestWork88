import Link from 'next/link';
import { FiMapPin } from 'react-icons/fi';

export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg mb-4">
            <div className="container">
                <Link href="/" className="navbar-brand">
                    Weather App
                </Link>

                <div className="d-flex align-items-center">
                    <Link href="/favorites" className="btn btn-outline-primary">
                        <FiMapPin /> Favorites
                    </Link>
                </div>
            </div>
        </nav>
    );
};