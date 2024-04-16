import React, { useState, useEffect, ChangeEvent } from 'react';
import './Modal.css';
import { Booking } from '../Bookings/Bookings';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (bookingData: Booking) => void;
}

interface FormData {
  user: string;
  parc: string;
  bookingDate: string;
  comments: string;
}

interface Parc {
  id: string;
  name: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    user: '15b611ae-31b9-493e-b7a1-02dca3dcd043', // Default user ID
    parc: '',
    bookingDate: new Date().toISOString(), // Set to current date time
    comments: ''
  });

  const [parcs, setParcs] = useState<Parc[]>([]);
  const [isParcSelected, setIsParcSelected] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/1/parcs')
      .then((res) => res.json())
      .then((data) => {
        setParcs(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (!show) {
      // Reset form data when the modal is closed
      setFormData({
        user: '15b611ae-31b9-493e-b7a1-02dca3dcd043', // Default user ID
        parc: '',
        bookingDate: new Date().toISOString(), // Set to current date time
        comments: ''
      });
      setIsParcSelected(false);
    }
  }, [show]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'parc') {
      setIsParcSelected(!!value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    if (isParcSelected) {
      const bookingData: Booking = { // Create a Booking object with form data
        id: '', // Assign an ID if needed (usually generated on the server)
        bookingdate: formData.bookingDate,
        ...formData, // Spread the rest of the form data
      };
      onSubmit(bookingData); // Call the onSubmit function with the Booking object
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <>
      {show && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div data-testid="create-booking-modal" className="modal" onClick={handleModalClick}>
            <div className="modal-content">
              <span className="close" onClick={onClose}>&times;</span>
              <h2>Create New Booking</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Parc:</label>
                  <select name="parc" value={formData.parc} onChange={handleChange}>
                    <option value="">Please Select A Parc</option>
                    {parcs.map((parc) => (
                      <option key={parc.id} value={parc.id}>{parc.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Comments:</label>
                  <input type="text" name="comments" value={formData.comments} onChange={handleChange} />
                </div>
                <div className="buttons">
                  <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                  <button
                    type="submit"
                    className={`submit-btn ${isParcSelected ? '' : 'disabled-btn'}`}
                    disabled={!isParcSelected}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
