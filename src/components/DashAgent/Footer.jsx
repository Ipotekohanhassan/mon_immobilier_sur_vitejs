import React from "react";

const Footer = () => {
    return (
        <footer className="bg-teal-600 text-white py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                <div>
                    <h3 className="text-xl font-bold mb-4">À Propos</h3>
                    <p className="text-sm">
                        Nous offrons une plateforme moderne pour la gestion des propriétés, simplifiant le processus de location
                        et de vente immobilière.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Liens Utiles</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-200">Accueil</a></li>
                        <li><a href="#" className="hover:text-gray-200">Propriétés</a></li>
                        <li><a href="#" className="hover:text-gray-200">Blog</a></li>
                        <li><a href="#" className="hover:text-gray-200">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <ul className="space-y-2">
                        <li><span className="font-semibold">Téléphone :</span> +225 00 00 00 00</li>
                        <li><span className="font-semibold">Email :</span> contact@exemple.com</li>
                        <li><span className="font-semibold">Adresse :</span> Cocody, Abidjan</li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 text-center text-sm">
                &copy; 2024 Gestion Immobilière. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;
