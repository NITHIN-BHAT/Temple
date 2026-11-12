import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

/** Sets SEO title + description for each page. */
export function usePageMeta(title, description) {
  const { content } = useContent();
  useEffect(() => {
    const site = `${content.temple.name}, ${content.temple.village}`;
    document.title = title ? `${title} | ${site}` : `${site} – Honnavar`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.name = 'description'; document.head.appendChild(tag); }
    if (description) tag.setAttribute('content', description);
  }, [title, description, content.temple.name, content.temple.village]);
}
