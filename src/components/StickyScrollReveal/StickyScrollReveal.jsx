import React, { useState, useEffect, useRef } from 'react';
import contentData from './data'; // Confirm this file exists
import './StickyScrollReveal.css'; // Confirm this file exists

const StickyScrollReveal = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const headerRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.dataset.id);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.5 }
    );

    // Only observe elements that have been rendered and stored in headerRefs
    Object.values(headerRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    // Cleanup function to unobserve all observed elements
    return () => {
      Object.values(headerRefs.current).forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);
  return (
    <div className="sticky-scroll-container">
      {contentData.map((section) => (
        <section
          key={section.id}
          data-id={section.id}
          className={`section fade-in-section ${visibleSection === String(section.id) ? 'is-visible' : ''}`}
          ref={(el) => (headerRefs.current[section.id] = el)}
        >
          <div className="section-text">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          {section.imageUrl && (
            <div className="section-image">
              <img src={section.imageUrl} alt={section.title} style={{ width: '100%', height: 'auto' }} />
            </div>
          )}
        </section>
      ))}
    </div>
  );
          }
export default StickyScrollReveal;