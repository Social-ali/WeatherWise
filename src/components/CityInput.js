import React from 'react';
import { jsPDF } from 'jspdf';
import './CityInput.css';

export default class CityInput extends React.Component {
  render(props) {
    const onKlickHandler = async (e) => {
      e.persist();
      const eventKey = e.which ? e.which : e.keyCode;
      const city = e.target.value;

      if (eventKey === 13) {
        if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
          e.target.classList.add('loading');

          if (await this.props.makeApiCall(city)) {
            e.target.placeholder = 'Enter a City...';
          } else {
            e.target.placeholder = 'City was not found, try again...';
          }
        } else {
          e.target.placeholder = 'Please enter a valid city name...';
        }
        e.target.classList.remove('loading');
        e.target.value = '';
      }
    };

    const handleShare = () => {
      const shareData = {
        title: 'WeatherWise',
        text: `Check out the weather for ${this.props.city}!`,
        url: window.location.href,
      };
      navigator.share(shareData)
        .then(() => console.log('Share successful!'))
        .catch((error) => console.error('Error sharing:', error));
    };

    const handleDownloadPDF = () => {
      const doc = new jsPDF();
      const cityName = this.props.city || 'Your City'; // Replace with the actual city name if available
      const weatherInfo = 'Weather information goes here...'; // Replace with actual weather data

      doc.text(`Weather Report for ${cityName}`, 10, 10);
      doc.text(weatherInfo, 10, 20);
      doc.save(`${cityName}_Weather_Report.pdf`);
    };

    const style = {
      top: this.props.city ? '-380px' : '-20px',
      width: '600px',
      display: 'inline-block',
      padding: '10px 0px 10px 30px',
      lineHeight: '120%',
      position: 'relative',
      borderRadius: '20px',
      outline: 'none',
      fontSize: '20px',
      transition: 'all 0.5s ease-out',
    };

    return (
      <div>
        <input
          className='city-input'
          style={style}
          type='text'
          placeholder='Enter a City...'
          onKeyPress={onKlickHandler}
        />
        <div className="button-container">
          <button onClick={handleShare}>
            <span>Share</span>
            <div className="container">
              <svg className="icon" viewBox="0 0 1024 1024" width="45" height="45">
                <path d="M962.267429 233.179429..." fill=""></path>
              </svg>
              {/* Add additional icons if necessary */}
            </div>
          </button>
          <button onClick={handleDownloadPDF}>
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    );
  }
}
