# Halal Meat Website - Playwright Automation Tests

Automated UI/UX and Functionality tests for [afford-it.co.nz/website/halalmeat](https://afford-it.co.nz/website/halalmeat/)

## Test Coverage

### 🎨 UI/UX Tests (ui-ux.spec.js)
- Homepage loads successfully
- Page title exists
- Logo/brand name visible
- Navigation menu visible
- Hero/banner section visible
- Footer visible
- Mobile responsive (375px)
- Tablet responsive (768px)
- No horizontal scrollbar on desktop
- Images load properly
- Page loads within 10 seconds
- Fonts and headings visible
- Buttons styled correctly

### 🛒 Product Tests (products.spec.js)
- Product categories visible
- Products displayed on page
- Product images visible
- Product names visible
- Product prices visible
- Clicking product opens product page
- Add to Cart button exists
- Cart icon in header

### ⚙️ Functionality Tests (functionality.spec.js)
- Navigation links work (no 404)
- Contact information present
- Email link works
- Phone number link works
- Search functionality works
- No JavaScript errors
- Meta description for SEO
- Social media links present
- Halal certification visible

## How to Run on GitHub
1. Go to the **Actions** tab
2. Click **Halalmeat UI/UX & Functionality Tests**
3. Click **Run workflow**
4. Download **playwright-report** artifact to view results
