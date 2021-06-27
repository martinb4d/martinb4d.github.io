import React from 'react'
import { Button } from '../../general/Button.js'
import { Link } from 'react-router-dom'
import '../../../styles/HomeSection.css'

function HomeSection({ lightBg, topLine, lightText, lightTextDesc, headline, description, 
    buttonLabel, img, alt, imgStart, buttonLink}) {
    return (<>
        <div className={lightBg ? 'home__home-section' :
        'home__home-section darkBg'}>
            <div className="container">
                <div className="row home__home-row" 
                style={{display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}}>
                    <div className="col">
                        <div className="home__home-text-wrapper">
                            <div className="top-line">
                                {topLine}
                            </div>
                            <h1 className={lightText ? 'heading' : 'heading dark'}>
                                {headline}
                            </h1>
                            <p className={lightTextDesc ? 'home__home-subtitle' : 'home__home-subtitle dark'}>
                                {description}
                            </p>
                            <Link to={buttonLink}>
                                <Button buttonSize='btn--wide' buttonColor='blue'>{buttonLabel}</Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="home__home-img-wrapper">
                            <img src={img} alt={alt} className='home__home-img'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </>)
}

export default HomeSection