import React from 'react'
import Banner from './components/Banner'

import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FadeInSection from './components/FadeInSection'
import CoffeeHistory from './components/CoffeeHistory'
import SpiceBlend from './components/SpiceBlend'
import LayoutGrid  from './components/card/LayoutGrid'
import StickyScrollReveal from './components/StickyScrollReveal/StickyScrollReveal'
import Footer from './components/Footer/Footer'
const Layout = () => {
  return (
    <div>
    <div>
    <Header/>
    <HeroSection/>
    <FadeInSection>
        <section>
          {/* <h2>Next Section Title</h2>
          <p>This content will fade in as you scroll down to it.</p> */}
        </section>
      </FadeInSection>
      <CoffeeHistory />
      <SpiceBlend/>
      <LayoutGrid />
      <StickyScrollReveal/>
      <Footer/>
    <Banner/>

    </div>
    
    </div>
  )
}

export default Layout