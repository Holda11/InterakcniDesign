import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const [travelers, setTravelers] = useState<number>(1);
    const [luggage, setLuggage] = useState<number>(1);
    const [selectedOption, setSelectedOption] = useState<string>('option1');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        phone: '',
        cardNumber: '',
        cardExpiration: '',
        cardCVV: '',
        cardOwner: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate()

    const { departureCity, arrivalCity, departureDate, returnDepartureCity, returnArrivalCity, returnDate, departureIATA, arrivalIATA, price, layovers } = useSelector(
        (state: RootState) => state.FlightForm
    );

    // Handle input changes and validate the form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: value };

            // Validate form
            const isValid = validateForm(newFormData);
            setIsFormValid(isValid);

            return newFormData;
        });
    };

    const validateForm = (data: typeof formData) => {
        const requiredFields = ['firstName', 'lastName', 'birthDate', 'email', 'phone'];
        if (selectedOption === 'option2') {
            requiredFields.push('cardNumber', 'cardExpiration', 'cardCVV', 'cardOwner');
        }
        return requiredFields.every((field) => data[field as keyof typeof formData]?.trim() !== '');
    };
    const postData = async () => {
        const data = {
            userId: localStorage.getItem('userId'),
            departure_Airport: departureCity,
            arrival_Airport: arrivalCity,
            return_departure_Airport: returnDepartureCity,
            return_arrival_Airport: returnArrivalCity,
            departure_Date: departureDate,
            return_Date: returnDate,
            departure_IATA: departureIATA,
            arrival_IATA: arrivalIATA,
            price: (Math.ceil((price * travelers) + (price * travelers * 0.12) + (price * travelers * 0.02) + (((price * travelers) / 100) * 5) + (luggage * 1000))).toString(),
            layovers: "nedostupne"
        }
        console.log(data)
        try {
            const response = await axios.post('http://127.0.0.1:3000/flights', data)
            if(response.status){
                console.log(response.status)
            }
        } catch {
            console.log("chyba")
        }
    }

    const handleClick = () => {
        postData()
        navigate('/success')
    }

    return (
        <div>
            <div>
                <h3>Let TAM (departure)</h3>
                <div>
                    <strong>
                        {departureCity} → {arrivalCity}
                    </strong>
                    <div>
                        <span>Datum letu: {departureDate}</span>
                    </div>
                </div>
                <h3>Let ZPĚT (arrival)</h3>
                <div>
                    <strong>
                        {returnDepartureCity} → {returnArrivalCity}
                    </strong>
                    <div>
                        <span>Datum letu: {returnDate}</span>
                    </div>
                </div>
                <div>
                    <h3>Přestupy</h3>
                    <div>
                        {layovers?.map((m, i) => (
                            <strong key={i}>
                                {m.airport} Doba přestupu: {m.duration} minut
                            </strong>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h3>Údaje</h3>
                <form>
                    <label>Jméno</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    <label>Příjmení</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    <label>Datum narození</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
                </form>
            </div>
            <div>
                <h3>Kontaktní údaje</h3>
                <form>
                    <label>E-mail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <label>Telefonní číslo</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                </form>
                <h3>Způsob platby</h3>
                <form>
                    <label>
                        <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={() => setSelectedOption('option1')} />
                        Bankovní převod
                    </label>
                    <label>
                        <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={() => setSelectedOption('option2')} />
                        Kreditní karta
                    </label>
                </form>
                {selectedOption === 'option2' && (
                    <div>
                        <h4>Kreditní karta</h4>
                        <form>
                            <label>Číslo karty</label>
                            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                            <label>Expirace</label>
                            <input type="text" name="cardExpiration" placeholder="MM/YY" value={formData.cardExpiration} onChange={handleInputChange} />
                            <label>CVV</label>
                            <input type="text" name="cardCVV" value={formData.cardCVV} onChange={handleInputChange} />
                            <label>Majitel</label>
                            <input type="text" name="cardOwner" value={formData.cardOwner} onChange={handleInputChange} />
                        </form>
                    </div>
                )}
            </div>
            <div>
                <ul>
                    <li>
                        <span>Počet cestujících:</span>
                        <div><button onClick={() => setTravelers(travelers + 1)}>+</button>{travelers}<button onClick={() => setTravelers(travelers > 1 ? travelers - 1 : 1)}>-</button></div>
                    </li>
                    <li>
                        <span>Počet zavazadel:</span>
                        <div><button onClick={() => setLuggage(luggage + 1)}>+</button>{luggage}<button onClick={() => setLuggage(luggage > 1 ? luggage - 1 : 1)}>-</button></div>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <span>Cestující</span>
                        <span>{price * travelers} Kč</span>
                    </li>
                    <li>
                        <span>Daně a poplatky</span>
                        <span>12 %</span>
                    </li>
                    <li>
                        <span>Letištní poplatky</span>
                        <span>2 %</span>
                    </li>
                    <li>
                        <span>Servisní poplatky</span>
                        <span>{Math.ceil(((price * travelers) / 100) * 5)} Kč</span>
                    </li>
                    <li>
                        <span>Celkem:</span>
                        <span>{Math.ceil((price * travelers) + (price * travelers * 0.12) + (price * travelers * 0.02) + (((price * travelers) / 100) * 5) + (luggage * 1000))}</span>
                    </li>
                </ul>
            </div>
            <div>
                <button disabled={!isFormValid} onClick={() => handleClick()}>Potvrdit</button>
                <button onClick={postData}>Debug Fetch</button>
            </div>
        </div>
    );
};

export default Payment;
