# SEO Strategy & Implementation Guide for Rahnavard (رهنورد)

## Table of Contents

1. [Overview](#overview)
2. [Keyword Strategy](#keyword-strategy)
3. [Technical SEO Implementation](#technical-seo-implementation)
4. [Content Strategy](#content-strategy)
5. [Local SEO](#local-seo)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Next Steps](#next-steps)

---

## Overview

Rahnavard is a humanitarian web application connecting citizens in need with verified volunteers in Iran. Our SEO strategy is designed for a **YMYL (Your Money or Your Life)** category site, emphasizing trust, authority, and rapid access to emergency services.

### Primary Goals

1. **Aid Seekers**: Enable people in crisis to find immediate help via search engines
2. **Volunteers**: Attract trustworthy individuals and organizations to join the verified network

### Target Metrics

- Organic traffic increase: 200% in 6 months
- Top 3 rankings for primary emergency keywords
- Featured snippets for "how to get emergency help" queries
- Local pack appearances for city-specific searches

---

## Keyword Strategy

### 1. Primary Keywords (High Priority)

#### Persian (فارسی) - Primary Language

```
- کمک اضطراری ایران (Emergency Aid Iran)
- امداد فوری (Urgent Help)
- داوطلبان کمک رسان (Aid Volunteers)
- سازمان‌های امدادی (Aid Organizations)
- کمک به نیازمندان (Help for Those in Need)
- شبکه داوطلبین (Volunteer Network)
```

#### English - Secondary Language

```
- Emergency Aid Iran
- Volunteer Networks Iran
- Verified Medical Help
- Crisis Assistance Iran
```

### 2. Persona-Based Keywords

#### Aid Seeker Persona (High Urgency)

```persian
- امداد فوری پزشکی
- کمک اورژانسی
- سرپناه اضطراری
- کمک فوری مالی
- مشاوره روانی فوری
```

#### Volunteer Persona (Motivation & Verification)

```persian
- داوطلب شدن
- ثبت نام داوطلب معتبر
- احراز هویت امداد‌گر
- شبکه کمک رسانی
```

### 3. Location-Based Keywords (Local SEO)

Template: `{Service} + {City}`

Examples:

```
- کمک اضطراری تهران
- امداد فوری مشهد
- داوطلب در اصفهان
- سازمان کمک رسان شیراز
```

### 4. Long-Tail Keywords (Question-Based)

```persian
- چگونه کمک اضطراری دریافت کنم؟
- نزدیکترین مرکز امداد کجاست؟
- چطور داوطلب شوم؟
- شرایط داوطلب شدن چیست؟
```

### 5. Content Pillar Keywords

```
Safety: امنیت داوطلبان، حفظ امنیت در کمک رسانی
Digital Security: امنیت دیجیتال، حریم خصوصی آنلاین
First Aid: کمک‌های اولیه، مراقبت اورژانسی
```

---

## Technical SEO Implementation

### 1. Metadata Structure

All pages use the `generateMetadata()` utility from `/lib/seo/metadata.ts`:

```typescript
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Page Title",
  description: "Page description (150-160 chars)",
  keywords: ["keyword1", "keyword2"],
  canonical: "https://rahnavard.org/page-url",
});
```

**Key Features:**

- Dynamic Open Graph tags
- Twitter Cards
- Language alternates (fa-IR, en-US)
- Canonical URLs
- Robots meta tags

### 2. Structured Data (Schema.org)

Implemented using JSON-LD in `/lib/seo/structured-data.tsx`:

#### Organization Schema

- Type: NGO
- Establishes authority and trust
- Used on: Root layout

#### WebSite Schema

- Enables site search box in Google
- Used on: Root layout

#### LocalBusiness Schema

- For city-specific pages
- Used on: `/location/[city]` pages

#### Article Schema

- For blog posts
- Includes author, publish date, keywords
- Used on: All blog post pages

#### FAQ Schema

- Displays FAQs in search results
- Used on: Contact, FAQ pages

#### Service Schema

- Describes emergency aid services
- Used on: Home, Get Help, Join Volunteer pages

### 3. URL Structure

```
/                           - Home (main landing)
/get-help                   - Aid seeker landing page
/join-volunteer             - Volunteer landing page
/location/[city]            - City-specific pages (20+ cities)
/blog                       - Blog index
/blog/[slug]                - Individual articles
/search                     - Search functionality
/about                      - About page
/contact                    - Contact & FAQ
```

**Best Practices:**

- Clean, descriptive URLs
- No query parameters for important pages
- Consistent structure
- Persian slugs transliterated for readability

### 4. Sitemap Configuration

Location: `/app/sitemap.ts`

**Included:**

- All static pages
- All location pages (auto-generated)
- Blog posts (when available)
- Dynamic priority and changeFrequency

**Update Frequency:**

```
Homepage: daily
Landing pages: weekly
Blog posts: monthly
Location pages: weekly
```

### 5. Robots.txt Configuration

Location: `/app/robots.ts`

**Allowed:**

- All public pages
- Search engines: Google, Bing, etc.

**Disallowed:**

- `/api/` - API routes
- `/rep/` - Representative dashboard
- `/login` - Auth pages
- `/create-rep` - Internal forms

---

## Content Strategy

### 1. Content Pillars

Four main content categories, each with dedicated landing pages and articles:

#### A. Safety & Security (امنیت و ایمنی)

**Purpose**: Build trust and demonstrate commitment to user safety

**Content:**

- Volunteer safety guide
- Aid recipient safety tips
- Safe meeting protocols
- Verification process explanation

**Target Keywords**: امنیت داوطلبان، نکات ایمنی، کمک‌رسانی امن

#### B. Digital Security (امنیت دیجیتال)

**Purpose**: Address privacy concerns and demonstrate technical competence

**Content:**

- Digital security for volunteers
- Privacy best practices
- Two-factor authentication guide
- Data protection policies

**Target Keywords**: امنیت دیجیتال، حریم خصوصی، حفاظت از اطلاعات

#### C. First Aid (کمک‌های اولیه)

**Purpose**: Provide value and establish expertise in emergency response

**Content:**

- First aid basics
- Emergency response guide
- CPR guide
- Common emergency situations

**Target Keywords**: کمک‌های اولیه، مراقبت اورژانسی، احیای قلبی ریوی

#### D. Crisis Management (مدیریت بحران)

**Purpose**: Position Rahnavard as authority in crisis response

**Content:**

- Crisis management basics
- Psychological first aid
- Disaster preparedness
- Emergency planning

**Target Keywords**: مدیریت بحران، آمادگی برای بلایا، واکنش اضطراری

### 2. Content Guidelines

#### Writing Style

- **Clarity**: Use simple, clear Persian
- **Empathy**: Understand user's urgent state
- **Action-oriented**: Clear CTAs on every page
- **Trust signals**: Emphasize verification, security

#### Content Length

- Landing pages: 1500-2000 words
- Blog posts: 1200-2500 words
- Location pages: 800-1200 words

#### Keyword Density

- Primary keyword: 1-2%
- Related keywords: Natural distribution
- Avoid keyword stuffing

#### Internal Linking

- Link to relevant content within 3 clicks
- Use descriptive anchor text
- Priority links to conversion pages

### 3. E-E-A-T Implementation (YMYL Critical)

**Experience:**

- Share real stories from volunteers
- Case studies of successful aid delivery
- Testimonials and reviews

**Expertise:**

- Detailed guides on emergency response
- Professional credentials of team
- Partnerships with recognized organizations

**Authoritativeness:**

- Citations from health/legal authorities
- Media mentions
- Official partnerships

**Trustworthiness:**

- Clear verification process
- Transparent policies
- Security measures prominently displayed
- Contact information easily accessible

---

## Local SEO

### 1. City-Specific Pages

Created for 20+ major Iranian cities:

**URL Pattern**: `/location/[city]`

**Content Structure:**

```
1. Hero section with city name
2. Local statistics (volunteers, organizations)
3. Available services in that city
4. Local keyword variants
5. How to get help (city-specific)
6. Local testimonials
7. Links to other cities
8. Local FAQ
```

**Schema Markup:**

- LocalBusiness schema
- Service area: Specific city
- Coordinates: City center

### 2. Local Keyword Integration

Each city page targets:

```
- کمک اضطراری [شهر]
- امداد فوری [شهر]
- داوطلب در [شهر]
- سازمان کمک رسان [شهر]
```

### 3. Local Business Optimization

**Google Business Profile (Future)**:

- Create profiles for major cities
- Consistent NAP (Name, Address, Phone)
- Regular posts about local success stories
- Respond to reviews

---

## Performance Optimization

### 1. Core Web Vitals

**Critical for YMYL sites and users with poor internet:**

#### LCP (Largest Contentful Paint) - Target: < 2.5s

- Optimize images (WebP format)
- Lazy load non-critical content
- Preload critical assets
- Use Next.js Image component

#### FID (First Input Delay) - Target: < 100ms

- Minimize JavaScript execution
- Code splitting
- Defer non-critical JS

#### CLS (Cumulative Layout Shift) - Target: < 0.1

- Set image dimensions
- Reserve space for dynamic content
- Avoid layout shifts

### 2. Mobile Optimization

**Priority: High** (Most users in crisis use mobile)

- Responsive design (already implemented)
- Touch-friendly CTAs (44x44px minimum)
- Fast mobile page load
- Simplified forms for mobile

### 3. Page Speed Optimization

```bash
# Build optimizations
npm run build

# Analyze bundle size
npm run build -- --analyze
```

**Next.js Optimizations:**

- Static generation for city pages
- Image optimization
- Font optimization
- Automatic code splitting

---

## Monitoring & Analytics

### 1. Setup Required

#### Google Search Console

```
1. Verify domain ownership
2. Submit sitemap: https://rahnavard.org/sitemap.xml
3. Monitor coverage issues
4. Track search queries and positions
```

#### Google Analytics 4

```
1. Install GA4 tracking code
2. Set up conversion events:
   - Get Help button clicks
   - Volunteer registration starts
   - Search queries
   - Contact form submissions
3. Create custom reports for:
   - Top landing pages
   - User flow from search
   - Bounce rate by page type
```

#### Additional Tools

- **Ahrefs/SEMrush**: Track keyword rankings
- **PageSpeed Insights**: Monitor Core Web Vitals
- **Google Trends**: Identify emerging keywords

### 2. Key Metrics to Track

#### Traffic Metrics

- Organic sessions
- Organic conversion rate
- New vs. returning users
- Traffic by location

#### Ranking Metrics

- Primary keyword positions
- Featured snippet ownership
- Local pack appearances

#### Engagement Metrics

- Bounce rate by page type
- Time on page
- Pages per session
- Form completion rate

#### Technical Metrics

- Core Web Vitals scores
- Crawl errors
- Indexation rate

---

## Next Steps & Ongoing Optimization

### Immediate (Week 1-2)

- [ ] Set up Google Search Console
- [ ] Submit sitemap
- [ ] Install Google Analytics
- [ ] Create Google Business Profile for main cities
- [ ] Set up performance monitoring

### Short-term (Month 1-3)

- [ ] Create additional blog content (2-3 posts/week)
- [ ] Build backlinks through PR and partnerships
- [ ] Optimize images and Core Web Vitals
- [ ] Create FAQ page with structured data
- [ ] A/B test CTA buttons and forms

### Medium-term (Month 3-6)

- [ ] Expand to more cities (50+ total)
- [ ] Create video content for YouTube
- [ ] Guest posting on relevant sites
- [ ] Social media integration
- [ ] Email newsletter for SEO content

### Long-term (Month 6-12)

- [ ] Build authority through press coverage
- [ ] Create comprehensive resource library
- [ ] Multilingual expansion (English, Arabic)
- [ ] Mobile app with ASO strategy
- [ ] Community-generated content

---

## Environment Variables Required

Add to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://rahnavard.org
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Testing SEO Implementation

### Structured Data Testing

```
https://search.google.com/test/rich-results
```

### Meta Tags Testing

```
https://metatags.io/
```

### Page Speed

```
https://pagespeed.web.dev/
```

### Mobile Friendly

```
https://search.google.com/test/mobile-friendly
```

---

## Resources & References

### Documentation

- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)

### Tools

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Persian SEO Resources

- Google Trends Iran
- Local keyword research tools
- Persian language forums and communities

---

## Conclusion

This SEO strategy is designed to:

1. **Build Trust**: Through E-E-A-T signals critical for YMYL
2. **Maximize Visibility**: Through comprehensive keyword targeting
3. **Serve Users Fast**: Through performance optimization
4. **Scale Effectively**: Through systematic local SEO

The implementation is complete and ready for deployment. Regular monitoring and optimization will ensure continued success in search rankings and user acquisition.

For questions or updates, contact: dev@rahnavard.org

---

**Last Updated**: February 6, 2026
**Version**: 1.0
