import React, { useState } from 'react';
import './MemberCard.css';

interface Member {
  name: string;
  role: string;
  image: string;
  sketch?: string;
  bio: string;
  category: string;
  majors?: string[];
  minors?: string[];
  graduatingYear?: number;
}

interface MemberCardProps {
  member: Member;
  isDirector?: boolean;
}

export default function MemberCard({ member, isDirector = false }: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasSketch = member.sketch;

  return (
    <div
      className={`member-card ${isDirector ? 'director-card' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="member-image-wrapper">
        {hasSketch && (
          <img
            src={member.sketch}
            alt={`${member.name} sketch`}
            className="sketch-image default-image"
          />
        )}
        <img
          src={member.image}
          alt={member.name}
          className="member-image hover-image"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
      <div className="member-content">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <div className="member-tags">
          
          {member.majors?.map((major, index) => (
            <span key={`major-${index}`} className="member-tag tag-major">
              Major in {major}
            </span>
          ))}
          {member.minors?.map((minor, index) => (
            <span key={`minor-${index}`} className="member-tag tag-minor">
              Minor in {minor}
            </span>
          ))}
          {member.graduatingYear && (
            <span className="member-tag tag-year">Class of {member.graduatingYear}</span>
          )}
        </div>
        <p className="member-bio">{member.bio}</p>
      </div>
    </div>
  );
}