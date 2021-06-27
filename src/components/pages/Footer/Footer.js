import React from 'react';
import '../../../styles/Footer.css';
import { SiDrone } from 'react-icons/si';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-content'>
        <div className='footer-content-wrap'>
          <div className='footer-logo-link'>
            <SiDrone className='navbar-icon' />
            POQUE
          </div>
          <small className='website-rights'>Martin Biondi Phangandy © 2021</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
