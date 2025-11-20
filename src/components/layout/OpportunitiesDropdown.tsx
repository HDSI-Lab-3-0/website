import React, { useState, useRef, useEffect } from "react";

interface OpportunitiesDropdownProps {
  className?: string;
  onCloseModal?: () => void;
}

export const OpportunitiesDropdown: React.FC<OpportunitiesDropdownProps> = ({
  className = "",
  onCloseModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const opportunities = [
    {
      key: "k12-students",
      label: "K12 Students",
      href: "/opportunities/k12-students"
    },
    {
      key: "k12-teachers",
      label: "K12 Teachers",
      href: "/opportunities/k12-teachers"
    },
    {
      key: "k12-parents",
      label: "K12 Parents",
      href: "/opportunities/k12-parents"
    },
    {
      key: "ucsd-faculty",
      label: "UCSD Faculty / Staff",
      href: "/opportunities/ucsd-faculty-staff"
    },
    {
      key: "ucsd-students",
      label: "UCSD Students",
      href: "/opportunities/ucsd-students"
    }
  ];

  const handleItemClick = (href: string) => {
    if (onCloseModal) {
      onCloseModal();
    }
    window.location.href = href;
  };

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 720);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Close dropdown when clicking outside (only for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div 
      className={`opportunities-dropdown ${className}`} 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="opportunities-trigger"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Opportunities</span>
        <svg
          className={`arrow ${isOpen ? "open" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="opportunities-menu">
          {opportunities.map((opportunity) => (
            <a
              key={opportunity.key}
              href={opportunity.href}
              className="opportunity-item"
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(opportunity.href);
              }}
            >
              {opportunity.label}
            </a>
          ))}
        </div>
      )}
      
      <style jsx="true">{`
        .opportunities-dropdown {
          position: relative;
          display: inline-block;
        }
        
        .opportunities-trigger {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          padding: 1.5rem 0.5rem;
          color: rgb(var(--black));
          font-weight: 400;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .opportunities-trigger::after {
          content: "";
          position: absolute;
          bottom: 1.4rem;
          left: 0.5rem;
          right: 0.5rem;
          height: 2px;
          background-color: transparent;
          transition: all 0.2s ease;
        }
        
        .opportunities-dropdown:hover .opportunities-trigger::after {
          background-color: var(--accent);
        }
        
        .arrow {
          width: 1rem;
          height: 1rem;
          transition: transform 0.2s ease;
        }
        
        .arrow.open {
          transform: rotate(180deg);
        }
        
        .opportunities-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          z-index: 1000;
          padding: 0.5rem 0;
          margin-top: 0.25rem;
        }
        
        .opportunity-item {
          display: block;
          padding: 0.75rem 1rem;
          color: rgb(var(--black));
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        
        .opportunity-item:hover {
          background-color: rgba(var(--accent-light), 0.1);
        }
        
        /* Mobile styles */
        @media (max-width: 720px) {
          .opportunities-dropdown {
            display: block;
            width: 100%;
          }
          
          .opportunities-trigger {
            justify-content: flex-start;
            height: 3.5rem;
            font-size: 1.125rem;
            font-weight: 500;
            color: rgb(55 65 81);
            width: 100%;
            justify-content: space-between;
            border-radius: 0.5rem;
            background: transparent;
            margin-bottom: 0.5rem;
            padding: 0 1rem;
            transition: all 0.2s ease;
          }
          
          .opportunities-trigger:hover {
            color: rgb(17 24 39);
            background-color: rgb(243 244 246);
          }
          
          .opportunities-trigger::after {
            display: none;
          }
          
          .opportunities-menu {
            position: static;
            box-shadow: none;
            background: rgb(243 244 246);
            margin-top: 0;
            margin-bottom: 0.5rem;
            border-radius: 0.5rem;
          }
          
          .opportunity-item {
            padding: 1rem;
            font-size: 0.9rem;
            color: rgb(55 65 81);
          }
          
          .opportunity-item:hover {
            background-color: rgb(229 231 235);
          }
        }
      `}</style>
    </div>
  );
};

export default OpportunitiesDropdown;