import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeCmsData, normalizeCms, readPersistedCmsSnapshot, saveCms, upsertGalleryFolder } from './cms.js';

test('reads the last cached CMS snapshot instantly before Neon responds', () => {
  globalThis.window = {
    localStorage: {
      store: {
        vallabhi_capital_admin_v2: JSON.stringify({
          homepage: { blogs: [{ id: 'cached-blog', title: 'Cached blog', published: true }] },
          products: { items: [], whyPoints: [] },
          industries: { items: [] },
          blogs: [{ id: 'cached-blog', title: 'Cached blog', published: true }],
          gallery: { folders: [] },
          company: { team: [] },
          partners: { lendingPartners: [], technologyPartners: [] },
          career: { employeeTestimonials: [], jobs: [] },
          contact: {},
          leads: [],
        }),
      },
      getItem(key) { return this.store[key] ?? null; },
      setItem(key, value) { this.store[key] = String(value); },
      removeItem(key) { delete this.store[key]; },
    },
  };
  globalThis.localStorage = globalThis.window.localStorage;

  const snapshot = readPersistedCmsSnapshot();
  assert.equal(snapshot.homepage.blogs[0].title, 'Cached blog');
  assert.equal(snapshot.blogs[0].title, 'Cached blog');
});

test('preserves a custom industry heading field from admin', () => {
  const cms = normalizeCms({
    homepage: {},
    products: { items: [], whyPoints: [] },
    industries: {
      items: [
        {
          id: 'industry-1',
          name: 'Capital Goods',
          slug: 'capital-goods',
          heading: 'Powering Heavy Manufacturing:',
          content: 'Main industry content',
          published: true,
        },
      ],
    },
    blogs: [],
    gallery: { folders: [] },
    company: { team: [] },
    partners: { lendingPartners: [], technologyPartners: [] },
    career: { employeeTestimonials: [], jobs: [] },
    contact: {},
    leads: [],
  });

  assert.equal(cms.industries.items[0].heading, 'Powering Heavy Manufacturing:');
});

test('preserves uploaded industry images during CMS normalization', () => {
  const cms = normalizeCms({
    homepage: {},
    products: { items: [], whyPoints: [] },
    industries: {
      items: [{
        id: 'industry-1',
        name: 'Chemical',
        slug: 'chemical',
        bannerImage: '/api/media?id=banner-1',
        secondImage: '/api/media?id=second-1',
        homepageImage: '/api/media?id=home-1',
      }],
    },
  });

  assert.equal(cms.industries.items[0].bannerImage, '/api/media?id=banner-1');
  assert.equal(cms.industries.items[0].secondImage, '/api/media?id=second-1');
  assert.equal(cms.industries.items[0].homepageImage, '/api/media?id=home-1');
});

test('recreates the partners CMS section and keeps uploaded policy PDFs', () => {
  const cms = normalizeCms({
    homepage: {},
    products: { items: [], whyPoints: [] },
    industries: { items: [] },
    blogs: [],
    gallery: { folders: [] },
    company: { team: [] },
    partners: {
      lendingPartners: [],
      technologyPartners: [
        { id: 'pdf-1', name: 'Fair practice code', pdfUrl: 'data:application/pdf;base64,abc123', fileName: 'fair-practice-code.pdf' },
      ],
    },
    career: { employeeTestimonials: [], jobs: [] },
    contact: {},
    leads: [],
  });

  assert.deepEqual(cms.partners.technologyPartners[0].name, 'Fair practice code');
  assert.equal(cms.partners.technologyPartners[0].pdfUrl, 'data:application/pdf;base64,abc123');
  assert.equal(cms.partners.technologyPartners[0].fileName, 'fair-practice-code.pdf');
});

test('preserves server industry content when local records are stale and blank', () => {
  const merged = mergeCmsData(
    { industries: { items: [{ id: 'industry-1', name: 'Chemical', slug: 'chemical', heading: 'Saved heading', subtitle: 'Saved subtitle', content: 'Saved content' }] } },
    { industries: { items: [{ id: 'industry-1', name: 'Chemical', slug: 'chemical', heading: '', subtitle: '', content: '' }] } },
  );

  assert.equal(merged.industries.items[0].heading, 'Saved heading');
  assert.equal(merged.industries.items[0].subtitle, 'Saved subtitle');
  assert.equal(merged.industries.items[0].content, 'Saved content');
});

test('preserves company values when local and server CMS snapshots differ', () => {
  const merged = mergeCmsData(
    { company: { values: [{ id: 'server-value', title: 'Server value' }] } },
    { company: { values: [{ id: 'local-value', title: 'Local value' }] } },
  );

  assert.deepEqual(merged.company.values.map((value) => value.id), ['local-value', 'server-value']);
});

test('keeps locally saved admin data instead of replacing it with stale seed data', async () => {
  globalThis.window = {
    localStorage: {
      store: {},
      getItem(key) { return this.store[key] ?? null; },
      setItem(key, value) { this.store[key] = String(value); },
      removeItem(key) { delete this.store[key]; },
    },
    dispatchEvent() {},
  };
  globalThis.localStorage = globalThis.window.localStorage;
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ data: null }) });

  const persisted = {
    homepage: {},
    products: { items: [], whyPoints: [] },
    industries: {
      items: [
        {
          id: 'industry-1',
          name: 'Capital Goods',
          slug: 'capital-goods',
          heading: 'Powering Heavy Manufacturing:',
          subtitle: 'Tailored financing for the sector',
          content: 'Custom industry body',
          published: true,
        },
      ],
    },
    blogs: [],
    gallery: { folders: [] },
    company: { team: [] },
    partners: { lendingPartners: [], technologyPartners: [] },
    career: { employeeTestimonials: [], jobs: [] },
    contact: {},
    leads: [],
  };

  await saveCms(persisted);

  const restored = JSON.parse(globalThis.localStorage.getItem('vallabhi_capital_admin_v2'));
  assert.equal(restored.industries.items[0].content, 'Custom industry body');
  assert.equal(restored.industries.items[0].heading, 'Powering Heavy Manufacturing:');
});

test('keeps a product edit in local storage when the CMS API is unavailable', async () => {
  globalThis.window = {
    localStorage: {
      store: {},
      getItem(key) { return this.store[key] ?? null; },
      setItem(key, value) { this.store[key] = String(value); },
      removeItem(key) { delete this.store[key]; },
    },
    dispatchEvent() {},
  };
  globalThis.localStorage = globalThis.window.localStorage;
  globalThis.fetch = async () => { throw new Error('CMS API unavailable'); };

  await saveCms({ products: { items: [{ id: 'product-1', name: 'New Product', published: true }] } });

  const restored = JSON.parse(globalThis.localStorage.getItem('vallabhi_capital_admin_v2'));
  assert.equal(restored.products.items[0].name, 'New Product');
});

test('creates a new gallery folder and renames an existing one without duplicate ids', () => {
  const newState = upsertGalleryFolder({ gallery: { folders: [] } }, { id: 'folder-1', title: 'New Folder' });
  assert.equal(newState.gallery.folders.length, 1);
  assert.equal(newState.gallery.folders[0].title, 'New Folder');

  const renamed = upsertGalleryFolder(newState, { id: 'folder-1', title: 'Updated Folder Name' });
  assert.equal(renamed.gallery.folders.length, 1);
  assert.equal(renamed.gallery.folders[0].title, 'Updated Folder Name');
});

test('keeps the server-backed CMS when a stale local copy has empty arrays', () => {
  const freshServer = {
    homepage: {
      blogs: [{ id: 'b1', title: 'Fresh blog', content: '<p>Saved</p>' }],
      faqs: [{ id: 'f1', question: 'Fresh question', answer: 'Fresh answer' }],
      clientTestimonials: [{ id: 't1', name: 'A', text: 'Saved testimonial' }],
    },
    products: {
      items: [],
      whyPoints: [],
      cardImages: {},
      productPages: {},
      faqs: [{ id: 'pf1', question: 'Product FAQ', answer: 'Saved product answer' }],
    },
    industries: {
      items: [{ id: 'i1', name: 'Capital Goods', heading: 'Fresh heading', subtitle: 'Fresh subtitle', content: 'Fresh content' }],
      cardImages: {},
    },
    gallery: { folders: [{ id: 'g1', title: 'Gallery', photos: ['/api/media?id=saved-photo'] }] },
    company: { team: [{ id: 'm1', name: 'Employee', role: 'Head' }] },
    partners: { lendingPartners: [], technologyPartners: [] },
    career: { employeeTestimonials: [{ id: 'e1', name: 'Person', text: 'Saved testimonial' }], jobs: [] },
    contact: { email: 'hello@site.com' },
    leads: [],
    blogs: [{ id: 'b1', title: 'Fresh blog', content: '<p>Saved</p>' }],
  };

  const staleLocal = {
    homepage: { blogs: [], faqs: [], clientTestimonials: [] },
    products: { items: [], whyPoints: [], cardImages: {}, productPages: {}, faqs: [] },
    industries: { items: [], cardImages: {} },
    gallery: { folders: [] },
    company: { team: [] },
    partners: { lendingPartners: [], technologyPartners: [] },
    career: { employeeTestimonials: [], jobs: [] },
    contact: {},
    leads: [],
    blogs: [],
  };

  const merged = mergeCmsData(freshServer, staleLocal);
  assert.equal(merged.industries.items[0].heading, 'Fresh heading');
  assert.equal(merged.gallery.folders[0].photos[0], '/api/media?id=saved-photo');
  assert.equal(merged.homepage.blogs[0].title, 'Fresh blog');
  assert.equal(merged.career.employeeTestimonials[0].text, 'Saved testimonial');
});

test('preserves locally saved product content when the server has an older snapshot', () => {
  const server = { products: { items: [{ id: 'server-product', name: 'Old Product' }] } };
  const local = { products: { items: [{ id: 'local-product', name: 'New Product', heroImage: 'data:image/webp;base64,image' }] } };
  const merged = mergeCmsData(server, local);

  assert.equal(merged.products.items[0].id, 'local-product');
  assert.equal(merged.products.items[0].heroImage, 'data:image/webp;base64,image');
});

test('keeps all server blogs when the browser cache contains only one blog', () => {
  const server = {
    blogs: [
      { id: 'blog-1', title: 'First Blog' },
      { id: 'blog-2', title: 'Second Blog' },
      { id: 'blog-3', title: 'Third Blog' },
    ],
  };
  const local = { blogs: [{ id: 'blog-1', title: 'First Blog' }] };
  const merged = mergeCmsData(server, local);

  assert.equal(merged.blogs.length, 3);
});

test('keeps every gallery folder when browser and server lists differ', () => {
  const server = {
    gallery: {
      folders: [
        { id: 'folder-1', title: 'Events' },
        { id: 'folder-2', title: 'Culture' },
        { id: 'folder-3', title: 'CSR' },
        { id: 'folder-4', title: 'Media' },
        { id: 'folder-5', title: 'Office' },
      ],
    },
  };
  const local = { gallery: { folders: [{ id: 'folder-6', title: 'Inauguration' }] } };
  const merged = mergeCmsData(server, local);

  assert.equal(merged.gallery.folders.length, 6);
});
