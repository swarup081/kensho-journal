// lib/markdownConverter.js
import TurndownService from 'turndown';

// Initialize the service only once
const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  emDelimiter: '_', // Use underscores for italics for better compatibility
});

// Add rules for formats not supported by default
turndownService.addRule('strikethrough', {
  filter: ['s', 'del', 'strike'],
  replacement: function (content) {
    return '~~' + content + '~~';
  },
});

turndownService.addRule('underline', {
  filter: 'u',
  replacement: function (content) {
    // Note: Markdown doesn't have a standard for underline. Using HTML `<u>` is an option,
    // but for plain text, we'll represent it with underscores.
    return '__' + content + '__';
  },
});

export const convertToMarkdown = (html) => {
  if (!html || html === '<p></p>') return '';
  return turndownService.turndown(html);
};