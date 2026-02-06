# SEO Implementation for Rahnavard

## Quick Start

This directory contains all SEO-related utilities and documentation for the Rahnavard platform.

## 📁 Structure

```
lib/seo/
├── keywords.ts           # Keyword database (200+ keywords)
├── metadata.ts          # Metadata generation utilities
└── structured-data.tsx  # Schema.org JSON-LD components
```

## 🚀 Usage Examples

### 1. Generate Metadata for a Page

```typescript
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Your Page Title",
  description: "Page description for search engines",
  keywords: ["keyword1", "keyword2", "keyword3"],
  canonical: "https://rahnavard.org/your-page",
});
```

### 2. Add Structured Data

```typescript
import { getOrganizationSchema, JsonLd } from '@/lib/seo/structured-data';

export default function MyPage() {
  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      {/* Your page content */}
    </>
  );
}
```

### 3. Use Predefined Keywords

```typescript
import { SEO_KEYWORDS } from "@/lib/seo/keywords";

// Access keywords for aid seekers
const urgentKeywords = SEO_KEYWORDS.aidSeeker.highUrgency.persian;

// Access keywords for volunteers
const volunteerKeywords = SEO_KEYWORDS.volunteer.motivation.persian;

// Access city names
const cities = SEO_KEYWORDS.cities;
```

## 🎯 Available Utilities

### Metadata Functions

- `generateMetadata(options)` - General page metadata
- `generateAidSeekerMetadata(city?)` - Aid seeker pages
- `generateVolunteerMetadata()` - Volunteer pages
- `generateLocationMetadata(city, neighborhood?)` - Location pages
- `generateBlogMetadata(...)` - Blog posts
- `generateFAQMetadata()` - FAQ pages

### Schema Functions

- `getOrganizationSchema()` - Organization/NGO
- `getWebSiteSchema()` - Website with search
- `getFAQSchema(faqs)` - FAQ sections
- `getServiceSchema(service)` - Services offered
- `getLocalBusinessSchema(location)` - Local pages
- `getBreadcrumbSchema(breadcrumbs)` - Navigation
- `getArticleSchema(article)` - Blog posts
- `getHowToSchema(guide)` - How-to guides

## 📚 Documentation

Full documentation available in:

- [English Strategy Guide](../docs/SEO_STRATEGY.md)
- [Persian Strategy Guide](../docs/SEO_STRATEGY_FA.md)
- [Implementation Checklist](../docs/SEO_CHECKLIST.md)
- [Implementation Summary](../docs/SEO_IMPLEMENTATION_SUMMARY.md)

## 🔑 Keywords Categories

### Primary

- Emergency aid keywords
- Volunteer recruitment keywords
- Trust and verification keywords

### Persona-Based

- Aid seeker (high urgency)
- Volunteer (motivation, verification)

### Location-Based

- 20+ major Iranian cities
- Service + City combinations

### Content Pillars

- Safety & Security
- Digital Security
- First Aid
- Crisis Management

## ⚙️ Configuration

### Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://rahnavard.org
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Site Configuration

Edit `/lib/seo/metadata.ts` to update:

- Site name
- Description
- Logo URL
- Contact info
- Social media handles

## 🎨 Best Practices

### 1. Always Use Utilities

```typescript
// ✅ Good
export const metadata = generateMetadata({...});

// ❌ Bad
export const metadata = {
  title: 'My Page',
  description: 'Description',
};
```

### 2. Include Structured Data

```typescript
// ✅ Good
<JsonLd data={getServiceSchema({...})} />

// ❌ Bad - Missing structured data
```

### 3. Use Keywords from Database

```typescript
// ✅ Good
keywords: [...SEO_KEYWORDS.aidSeeker.highUrgency.persian];

// ❌ Bad - Hardcoded keywords
keywords: ["کمک اضطراری", "امداد فوری"];
```

## 📊 Monitoring

### Tools to Set Up

1. Google Search Console
2. Google Analytics 4
3. PageSpeed Insights
4. Rich Results Test

### Key Metrics

- Organic traffic
- Keyword rankings
- Core Web Vitals
- Conversion rates

## 🐛 Common Issues

### Issue: Metadata not showing

**Solution**: Ensure `generateMetadata` is used correctly and exported

### Issue: Structured data errors

**Solution**: Validate using [Rich Results Test](https://search.google.com/test/rich-results)

### Issue: Keywords not ranking

**Solution**: Check keyword density, internal linking, and content quality

## 🔄 Updates

### Adding New Keywords

Edit `/lib/seo/keywords.ts` and add to appropriate category

### Adding New City

1. Add city name to `SEO_KEYWORDS.cities`
2. City page auto-generates via `/location/[city]`

### Creating New Content Pillar

1. Add keywords to `CONTENT_PILLAR_KEYWORDS`
2. Create category in `/blog`
3. Write articles following structure

## 🤝 Contributing

When adding SEO features:

1. Follow existing patterns
2. Add documentation
3. Include keywords in database
4. Test structured data
5. Update this README

## 📞 Support

Questions about SEO implementation:

- Check [Strategy Guide](../docs/SEO_STRATEGY.md)
- Review [Examples](#usage-examples)
- Contact: dev@rahnavard.org

---

**Last Updated**: February 6, 2026  
**Version**: 1.0
