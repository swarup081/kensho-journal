// lib/htmlConverter.js
import showdown from 'showdown';

const converter = new showdown.Converter({
  strikethrough: true,
  simpleLineBreaks: false, // Turn this off to handle paragraphs correctly
  ghCompatibleHeaderId: true,
});

converter.addExtension({
  type: 'lang',
  regex: /__([^_]+)__/g,
  replace: '<u>$1</u>'
});

export const convertToHtml = (markdown) => {
  if (!markdown) return '';

  // --- FIX: Replace double newlines with a non-breaking space to preserve them ---
  const preservedNewlines = markdown.replace(/\n\n/g, '\n\n&nbsp;\n\n');
  
  return converter.makeHtml(preservedNewlines);
};