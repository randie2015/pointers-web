const ALLOWED_TAGS = new Set([
  'p',
  'h2',
  'h3',
  'ul',
  'ol',
  'li',
  'strong',
  'b',
  'em',
  'i',
  'br',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td'
]);

function stripDisallowedAttributes(tag: string): string {
  return tag
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sstyle='[^']*'/gi, '')
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/\sclass='[^']*'/gi, '')
    .replace(/\sface="[^"]*"/gi, '')
    .replace(/\ssize="[^"]*"/gi, '')
    .replace(/\scolor="[^"]*"/gi, '')
    .replace(/\sfont-family="[^"]*"/gi, '');
}

function normalizeHeadingTags(html: string): string {
  return html
    .replace(/<h1\b[^>]*>/gi, '<h2>')
    .replace(/<\/h1>/gi, '</h2>')
    .replace(/<h[4-6]\b[^>]*>/gi, '<h3>')
    .replace(/<\/h[4-6]>/gi, '</h3>');
}

function unwrapDisallowedTags(html: string): string {
  return html
    .replace(/<\/?(?:font|span|u|a|blockquote|div)\b[^>]*>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '');
}

function filterAllowedTags(html: string): string {
  return html.replace(/<\/?([a-z0-9]+)\b[^>]*>/gi, (match, tagName: string) => {
    const tag = tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
      return '';
    }

    if (match.startsWith('</')) {
      return `</${tag}>`;
    }

    if (tag === 'br') {
      return '<br>';
    }

    return stripDisallowedAttributes(match).replace(/<([a-z0-9]+)\b[^>]*>/i, `<${tag}>`);
  });
}

export function sanitizeBlogHtml(html: string): string {
  if (!html?.trim()) return '';

  const cleaned = filterAllowedTags(unwrapDisallowedTags(normalizeHeadingTags(html)));

  return cleaned
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u200b/g, '')
    .replace(/(<br>\s*){3,}/gi, '<br><br>')
    .trim();
}

export function sanitizeBlogHtmlInBrowser(html: string): string {
  if (typeof window === 'undefined') {
    return sanitizeBlogHtml(html);
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const root = doc.body;

  function walk(node: Node): void {
    const children = Array.from(node.childNodes);

    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        const tag = element.tagName.toLowerCase();

        if (!ALLOWED_TAGS.has(tag)) {
          while (element.firstChild) {
            element.parentNode?.insertBefore(element.firstChild, element);
          }
          element.remove();
          continue;
        }

        element.removeAttribute('style');
        element.removeAttribute('class');
        element.removeAttribute('face');
        element.removeAttribute('size');
        element.removeAttribute('color');

        if (tag === 'h1') {
          const h2 = doc.createElement('h2');
          h2.innerHTML = element.innerHTML;
          element.replaceWith(h2);
        } else if (/^h[4-6]$/.test(tag)) {
          const h3 = doc.createElement('h3');
          h3.innerHTML = element.innerHTML;
          element.replaceWith(h3);
        }
      }

      walk(child);
    }
  }

  walk(root);
  return sanitizeBlogHtml(root.innerHTML);
}
