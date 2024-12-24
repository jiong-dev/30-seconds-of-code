import { describe, it, expect, vi } from 'vitest';
import StringUtils from './stringUtils';
import settings from '#src/config/settings.js';

vi.mock('#src/config/settings.js', () => ({
  default: {
    tags: {
      'test-tag': 'TestTag',
    },
  },
}));

describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(StringUtils.capitalize('hello')).toBe('Hello');
    });

    it('should capitalize first letter and lowercase rest when lowerRest is true', () => {
      expect(StringUtils.capitalize('hELLO', true)).toBe('Hello');
    });
  });

  describe('toKebabCase', () => {
    it('should convert string to kebab case', () => {
      expect(StringUtils.toKebabCase('camelCase')).toBe('camel-case');
      expect(StringUtils.toKebabCase('PascalCase')).toBe('pascal-case');
      expect(StringUtils.toKebabCase('snake_case')).toBe('snake-case');
    });

    it('should handle empty string', () => {
      expect(StringUtils.toKebabCase('')).toBeFalsy();
    });
  });

  describe('convertToValidId', () => {
    it('should convert string to valid ID', () => {
      expect(StringUtils.convertToValidId('Hello <b>World</b>')).toBe(
        'hello-world'
      );
    });
  });

  describe('convertToSeoSlug', () => {
    it('should convert string to SEO slug', () => {
      expect(StringUtils.convertToSeoSlug('Hello World')).toBe('/hello-world');
    });
  });

  describe('stripMarkdown', () => {
    it('should strip markdown formatting', () => {
      const markdown = '`code` *bold* [link](http://test.com)\n_italic_';
      expect(StringUtils.stripMarkdown(markdown)).toBe('code bold linkitalic');
    });
  });

  describe('stripHtmlParagraphsAndLinks', () => {
    it('should strip HTML paragraphs and links', () => {
      const html = '<p>Hello <a href="test.com">World</a></p>';
      expect(StringUtils.stripHtmlParagraphsAndLinks(html)).toBe('Hello World');
    });
  });

  describe('stripHtmlTags', () => {
    it('should strip all HTML tags', () => {
      const html = '<div><p>Hello <b>World</b></p></div>';
      expect(StringUtils.stripHtmlTags(html)).toBe('Hello World');
    });
  });

  describe('stripHtml', () => {
    it('should strip HTML and decode entities', () => {
      const html = '<p>Hello&nbsp;World&amp;&lt;&gt;</p>';
      expect(StringUtils.stripHtml(html)).toBe('Hello World&<>');
    });
  });

  describe('normalizedTokens', () => {
    it('should normalize and tokenize string', () => {
      expect(StringUtils.normalizedTokens(' Hello World-123 ')).toEqual([
        'hello',
        'world-123',
      ]);
    });

    it('should filter out tokens shorter than 2 characters', () => {
      expect(StringUtils.normalizedTokens('a b cd')).toEqual(['cd']);
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(StringUtils.escapeHtml('<div & "quote" \'single\'')).toBe(
        '&lt;div &amp; &quot;quote&quot; &#39;single&#39;'
      );
    });
  });

  describe('formatTag', () => {
    it('should format tag using settings', () => {
      expect(StringUtils.formatTag('test-tag')).toBe('TestTag');
    });

    it('should capitalize first letter if tag not in settings', () => {
      expect(StringUtils.formatTag('other')).toBe('Other');
    });

    it('should handle empty tag', () => {
      expect(StringUtils.formatTag('')).toBe('');
    });
  });
});
