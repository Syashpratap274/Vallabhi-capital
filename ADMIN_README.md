# Vallabhi Capital — Dynamic CMS Update

This version keeps the existing website frontend structure and preserves the existing CMS sections while adding clearer dynamic controls for Products, Industries and Blogs.

## Important changes

- Homepage: select exactly 6 products from all products to display on the homepage; reorder the selected six.
- Homepage: existing client testimonials remain the same Admin-managed testimonials.
- Products: add/edit/delete products from Admin.
- Product editor: clearly labeled fields, product section, card image, full-width hero banner, hero span text, description, eligibility, documents, terms, exactly 3 benefits, unlimited Why Vallabhi points with logos, and product FAQs.
- Eligibility / documents / terms rows use Title + one-line Description; the frontend renders the title as H3 and the description as P.
- Main Products page now reads product cards and the main Why Vallabhi section from CMS data.
- Product detail pages use one dynamic template at `/products/:slug`.
- Product hero is a full-width banner with H1, span text below it, and an eligibility card positioned on the left.
- Blogs: create/edit/delete, with a rich content editor (headings, paragraph, bold, italic, lists and links). Published blogs have `/blogs/:slug` pages and `/blogs` listing.
- Gallery: existing folder/photo functionality is retained and guarded against missing/old CMS data so the Admin does not go white.
- Company, Partners, Career, Contact, Leads and Media Library keep their existing Admin capabilities.

## Local CMS

The current project still uses the existing localStorage CMS architecture. Data is browser-local. A production backend/database should be connected before deployment if multiple devices/admin users need to share the same CMS data.

## Run

```bash
npm install
npm run dev
```
