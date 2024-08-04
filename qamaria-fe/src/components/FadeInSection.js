import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './FadeInSection.css';

const FadeInSection = (props) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  return (
    <div ref={ref} className={`fade-in-section ${inView ? 'is-visible' : ''}`}>
      {props.children}
    </div>
  );
};

export default FadeInSection;
