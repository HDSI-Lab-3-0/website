import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon.tsx';

interface TocItem {
  id: string;
  title: string;
  level: number;
  children?: TocItem[];
}

interface TableOfContentsProps {
  contentSelector?: string;
  className?: string;
}

export function TableOfContents({ 
  contentSelector = '.markdown-content', 
  className = '' 
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLElement | null>(null);

  // Extract headings from the content
  useEffect(() => {
    const contentElement = document.querySelector(contentSelector) as HTMLElement;
    if (!contentElement) return;
    
    contentRef.current = contentElement;
    
    const headingElements = contentElement.querySelectorAll('h2, h3, h4');
    const extractedHeadings: TocItem[] = [];
    const h2Stack: TocItem[] = [];
    const h3Stack: TocItem[] = [];
    
    headingElements.forEach((heading) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      // Add ID to the heading element if it doesn't have one
      if (!heading.id) {
        heading.id = id;
      }
      
      const headingItem: TocItem = {
        id: heading.id,
        title: text,
        level
      };
      
      if (level === 2) {
        extractedHeadings.push(headingItem);
        h2Stack.push(headingItem);
        h3Stack.length = 0; // Reset h3 stack
      } else if (level === 3) {
        const parentH2 = h2Stack[h2Stack.length - 1];
        if (parentH2) {
          if (!parentH2.children) parentH2.children = [];
          parentH2.children.push(headingItem);
          h3Stack.push(headingItem);
        }
      } else if (level === 4) {
        const parentH3 = h3Stack[h3Stack.length - 1];
        if (parentH3) {
          if (!parentH3.children) parentH3.children = [];
          parentH3.children.push(headingItem);
        }
      }
    });
    
    setHeadings(extractedHeadings);
  }, [contentSelector]);

  // Track active heading on scroll
  useEffect(() => {
    if (!contentRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -70% 0%',
        threshold: 0
      }
    );
    
    const headingElements = contentRef.current.querySelectorAll('h2, h3, h4');
    headingElements.forEach((heading) => observer.observe(heading));
    
    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading));
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderTocItems = (items: TocItem[], level = 0) => {
    return (
      <ul className={`toc-list toc-level-${level}`}>
        {items.map((item) => (
          <li key={item.id} className="toc-item">
            <a
              href={`#${item.id}`}
              className={`toc-link ${activeId === item.id ? 'toc-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(item.id);
              }}
              style={{ paddingLeft: `${level * 16}px` }}
            >
              {item.title}
            </a>
            {item.children && renderTocItems(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  if (headings.length === 0) return null;

  return (
    <div className={`table-of-contents ${isCollapsed ? 'toc-collapsed' : ''} ${className}`}>
      <div className="toc-header">
        <button
          className="toc-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
        >
          <Icon icon={isCollapsed ? 'ChevronRight' : 'ChevronDown'} size={16} />
          <span className="toc-title">Contents</span>
        </button>
      </div>
      <div className="toc-content">
        {renderTocItems(headings)}
      </div>
    </div>
  );
}