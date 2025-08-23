import { directive, bootstrapDirectives } from '../src/main';

console.log('Synapse demo loaded');

/**
 * @directive ClickLoggerDirective
 * This directive attaches to all elements with the `clickable` class.
 * It logs a message to the console on every click.
 */
@directive('.clickable')
class ClickLoggerDirective {
  constructor(private element: HTMLElement) {
    console.log(`ClickLoggerDirective initialized for:`, element);
    this.element.addEventListener('click', () => {
      console.log(`Element clicked:`, this.element.textContent?.trim());
    });
  }
}

/**
 * @directive HoverHighlightDirective
 * This directive attaches to the element with the id `main-title`.
 * It changes the background color on mouse hover.
 */
@directive('#main-title')
class HoverHighlightDirective {
  constructor(private element: HTMLElement) {
    console.log(`HoverHighlightDirective initialized for:`, element);
    this.element.style.transition = 'background-color 0.3s ease';
    this.element.addEventListener('mouseenter', () => this.element.style.backgroundColor = '#e0f7fa');
    this.element.addEventListener('mouseleave', () => this.element.style.backgroundColor = '');
  }
}

// --- Bootstrap Control Section ---

// 1. Initial bootstrap for static content already on the page.
// We wait for the DOM to be ready and then run bootstrap for the first time.
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed, running initial bootstrap...');
    bootstrapDirectives();
});


// 2. Example for dynamic content.
// A button to add new content to the page.
const addButton = document.getElementById('add-content-btn');
const dynamicContainer = document.getElementById('dynamic-container');

addButton?.addEventListener('click', () => {
    if (!dynamicContainer) return;

    console.log('\n--- Adding new dynamic content ---');

    // Create a new element that matches one of our directives
    const newClickableDiv = document.createElement('div');
    newClickableDiv.className = 'clickable';
    newClickableDiv.textContent = `Dynamic Box #${dynamicContainer.children.length + 1}`;

    dynamicContainer.appendChild(newClickableDiv);

    // ✨ Important: Re-call bootstrap to process the new elements!
    // We can scan the whole document again, or just the new container.
    // Scanning the container is more performant.
    bootstrapDirectives(dynamicContainer);
});
