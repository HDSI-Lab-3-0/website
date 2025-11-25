document.addEventListener('DOMContentLoaded', () => {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach((codeBlock) => {
    // Skip if already has a copy button
    const preElement = codeBlock.parentElement;
    if (preElement.querySelector('.code-copy-button')) {
      return;
    }
    
    // Create container for code block with relative positioning
    preElement.style.position = 'relative';
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    // Create icon container
    const iconContainer = document.createElement('span');
    iconContainer.className = 'copy-icon';
    
    // Add copy icon (using SVG since we can't use React components in plain JS)
    iconContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;
    
    // Create check icon for success state
    const checkIcon = document.createElement('span');
    checkIcon.className = 'check-icon';
    checkIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    
    copyButton.appendChild(iconContainer);
    copyButton.appendChild(checkIcon);
    
    // Add click event listener
    copyButton.addEventListener('click', async () => {
      const code = codeBlock.textContent || codeBlock.innerText;
      
      try {
        // Use modern clipboard API
        await navigator.clipboard.writeText(code);
        
        // Show success state
        copyButton.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        // Manual fallback for browsers without clipboard API
        textArea.select();
        try {
          document.execCommand('copy');
          copyButton.classList.add('copied');
          
          setTimeout(() => {
            copyButton.classList.remove('copied');
          }, 2000);
        } catch (fallbackErr) {
          console.error('Failed to copy code:', fallbackErr);
          // Show error message to user
          alert('Failed to copy code. Please copy manually.');
        }
        
        document.body.removeChild(textArea);
      }
    });
    
    // Add button to the code block
    preElement.appendChild(copyButton);
  });
});