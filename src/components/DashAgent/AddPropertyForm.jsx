import React, { useState } from 'react';

const AddProperty = () => {
    // État pour les données du formulaire
    const [formData, setFormData] = useState({
        propertyName: '',
        location: '',
        price: '',
        rooms: '',
        area: '',
        garage: '',
        description: '',
    });

    const [step, setStep] = useState(1); // État pour suivre l'étape actuelle

    // Mise à jour des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Passer à l'étape suivante ou précédente
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Validation finale et soumission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données soumises :', formData);
        alert('Propriété ajoutée avec succès !');
    };

    // Composants pour chaque étape
    const Step1 = (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyName">
                    Nom de la propriété
                </label>
                <input
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    placeholder="Ex : Villa moderne"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Localisation
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ex : Abidjan, Cocody"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Prix (en FCFA)
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Ex : 500000"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
        </>
    );

    const Step2 = (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rooms">
                    Nombre de chambres
                </label>
                <input
                    type="number"
                    id="rooms"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    placeholder="Ex : 3"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
                    Surface (m²)
                </label>
                <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Ex : 150"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="garage">
                    Garage (Oui/Non)
                </label>
                <select
                    id="garage"
                    name="garage"
                    value={formData.garage}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">Sélectionnez</option>
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                </select>
            </div>
        </>
    );

    const Step3 = (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ajoutez une description de la propriété..."
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="4"
                ></textarea>
            </div>
        </>
    );

    return (
        <div className="bg-gradient-to-b from-teal-100 to-teal-300 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold text-teal-600 text-center mb-6">Ajouter une Propriété</h1>
                <form onSubmit={handleSubmit}>
                    {step === 1 && Step1}
                    {step === 2 && Step2}
                    {step === 3 && Step3}

                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Précédent
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                            >
                                Suivant
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Ajouter
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
