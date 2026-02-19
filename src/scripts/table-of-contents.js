document.addEventListener('DOMContentLoaded', () => {
  // Find all markdown content containers
  const markdownContainers = document.querySelectorAll('.markdown-content');
  
  markdownContainers.forEach(container => {
    // Extract headings from the content
    const headingElements = container.querySelectorAll('h2, h3, h4');
    if (headingElements.length === 0) return;
    
    // Generate IDs for headings if they don't exist
    headingElements.forEach(heading => {
      if (!heading.id) {
        const text = heading.textContent || '';
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        heading.id = id;
      }
    });
    
    // Create TOC structure
    const tocData = [];
    const h2Stack = [];
    const h3Stack = [];
    
    headingElements.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      const text = heading.textContent || '';
      const id = heading.id;
      
      const headingItem = {
        id,
        title: text,
        level,
        children: []
      };
      
      if (level === 2) {
        tocData.push(headingItem);
        h2Stack.push(headingItem);
        h3Stack.length = 0; // Reset h3 stack
      } else if (level === 3) {
        const parentH2 = h2Stack[h2Stack.length - 1];
        if (parentH2) {
          parentH2.children.push(headingItem);
          h3Stack.push(headingItem);
        }
      } else if (level === 4) {
        const parentH3 = h3Stack[h3Stack.length - 1];
        if (parentH3) {
          parentH3.children.push(headingItem);
        }
      }
    });
    
    // Find or create TOC container
    let tocContainer = document.querySelector('.table-of-contents');
    if (!tocContainer) return;
    
    // Render TOC
    renderTOC(tocContainer, tocData);
    
    // Set up scroll tracking
    setupScrollTracking(container, tocContainer);
  });
  
  function renderTOC(container, items) {
    const tocContent = container.querySelector('.toc-content');
    
    if (!tocContent) return;
    
    // Clear existing content
    tocContent.innerHTML = '';
    
    // Create TOC list
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list toc-level-0';
    
    items.forEach(item => {
      tocList.appendChild(createTOCItem(item));
    });
    
    tocContent.appendChild(tocList);
  }
  
  function createTOCItem(item, level = 0) {
    const li = document.createElement('li');
    li.className = 'toc-item';
    
    const link = document.createElement('a');
    link.href = `#${item.id}`;
    link.className = 'toc-link';
    link.textContent = item.title;
    link.style.paddingLeft = `${level * 16}px`;
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToHeading(item.id);
    });
    
    li.appendChild(link);
    
    // Add children if any
    if (item.children && item.children.length > 0) {
      const childList = document.createElement('ul');
      childList.className = `toc-list toc-level-${level + 1}`;
      
      item.children.forEach(child => {
        childList.appendChild(createTOCItem(child, level + 1));
      });
      
      li.appendChild(childList);
    }
    
    return li;
  }
  
  function setupScrollTracking(contentContainer, tocContainer) {
    const headingElements = contentContainer.querySelectorAll('h2, h3, h4');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('toc-active');
          });
          
          // Add active class to current link
          const activeLink = tocContainer.querySelector(`.toc-link[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('toc-active');
          }
        }
      });
    }, observerOptions);
    
    headingElements.forEach(heading => {
      observer.observe(heading);
    });
  }
  
  function scrollToHeading(id) {
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
  }
  
});