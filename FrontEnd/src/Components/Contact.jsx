import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <div className="mt-8 p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      {landLord && (
        <div className="space-y-4">
          <p className="text-lg text-gray-800">
            Contact{' '}
            <span className="text-red-600 font-semibold">{landLord.username}</span> for{' '}
            <span className="capitalize text-blue-600">{listing.name.toLowerCase()}</span>
          </p>

          <textarea
            name="message"
            id="message"
            rows="4"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></textarea>

          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contact;
