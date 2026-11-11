import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import App from './App.jsx';
import { departments, products } from './catalog.js';
import { productImageFamily } from './productImages.js';
import { formatPrice, INR_PER_USD } from './currency.js';

const catalog = () => within(document.getElementById('shop'));

describe('ABEAUTY storefront', () => {
  it('renders the homepage, department collections, and complete catalogue', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /beauty begins with you/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /a little something for everyone/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /best sellers, for a reason/i })).toBeInTheDocument();
    expect(catalog().getAllByRole('article')).toHaveLength(products.length);
    expect(products).toHaveLength(101);
    expect(products.every((product) => product.price > 0 && product.price % INR_PER_USD === 0)).toBe(true);
    expect(products.every((product) => [product.image, ...product.images].every((image) => (
      image.startsWith('/product-photos/')
      && existsSync(resolve(process.cwd(), 'public', image.slice(1)))
    )))).toBe(true);
    expect(new Set(products.map((product) => product.image)).size).toBe(products.length);
    expect(new Set([...products.map((product) => product.image), ...departments.map((department) => department.image)]).size)
      .toBe(products.length + departments.length);
    expect(departments.every((department) => (
      department.image.startsWith('/product-photos/')
      && existsSync(resolve(process.cwd(), 'public', department.image.slice(1)))
    ))).toBe(true);
    const credits = JSON.parse(readFileSync(resolve(process.cwd(), 'public', 'photo-credits.json'), 'utf8'));
    const creditedImages = new Set(credits.map((entry) => entry.file));
    expect(products.every((product) => [product.image, ...product.images].every((image) => creditedImages.has(image)))).toBe(true);
    expect(departments.every((department) => creditedImages.has(department.image))).toBe(true);
    for (const [department, count] of Object.entries({
      'Face Makeup': 20,
      'Eye Makeup': 20,
      'Lip Makeup': 20,
      Skincare: 28,
      Bodycare: 3,
      Lipcare: 8,
      Beauty: 2,
    })) {
      expect(products.filter((product) => product.department === department)).toHaveLength(count);
    }
    expect(products.map((product) => product.category)).toContain('False Eyelashes');
    expect(products.map((product) => product.category)).toContain('Face Masks');
  });

  it('uses unique local product photos matched to each product family', () => {
    const requestedNames = [
      'Abeauty vitamin c brightening serum',
      'Abeauty hyaluronic acid serum',
      'Abeauty niacinamide face serum',
      'Abeauty gentle foaming facewash',
      'Abeauty hydrating face moisturizer',
      'Abeauty daily sunscreen SPF 50',
      'Abeauty rose water toner',
      'Abeauty aloe vera gel',
      'Abeauty nourishing body lotion',
      'Abeauty vanilla bodybutter',
      'abeauty refreshing body wash',
      'abeauty rose lip balm',
      'abeauty hydrating lip oil',
      'Abeauty lipstick - Rose',
      'Abeauty lipstick - Berry',
      'Abeauty lipstick - Nude',
      'Abeauty lipstick - Red',
      'Abeauty lip gloss - Clear Shine',
      'Abeauty lip gloss - Rose Glow',
      'abeauty glow face mask',
      'abeauty gentle makeup remover',
    ];
    expect(requestedNames.every((name) => products.some((product) => product.name === name))).toBe(true);

    const faceSerums = products.filter((product) => product.name.startsWith('Abeauty ') && product.category === 'Face Serum');
    expect(faceSerums).toHaveLength(3);
    expect(faceSerums.every((product) => (
      product.images.length === 3
      && productImageFamily(product) === 'skincare'
      && product.images.every((image) => image.startsWith('/product-photos/'))
    ))).toBe(true);
    const lipProducts = products.filter((product) => ['Lip Makeup', 'Lipcare'].includes(product.department));
    expect(lipProducts).toHaveLength(28);
    expect(new Set(lipProducts.map((product) => product.image)).size).toBe(lipProducts.length);
    expect(lipProducts.every((product) => productImageFamily(product) === 'lips')).toBe(true);
    expect(productImageFamily(products.find((product) => product.name === 'Abeauty lipstick - Red'))).toBe('lips');
    expect(products.find((product) => product.name === 'Abeauty nourishing body lotion').image).toBe('/product-photos/commons-23332472.JPG');
    expect(products.find((product) => product.name === 'abeauty glow face mask').image).toBe('/product-photos/facial-mask.jpg');
    expect(products.find((product) => product.name === 'abeauty gentle makeup remover').image).toBe('/product-photos/commons-9800696.jpg');
    expect(lipProducts.flatMap((product) => product.images).some((image) => image === '/product-photos/commons-10952337.jpg')).toBe(false);
  });

  it('formats all displayed prices in Indian rupees', () => {
    render(<App />);
    expect(formatPrice(3154)).toBe('₹3,154');
    expect(document.body.textContent).not.toContain('$');
    expect(catalog().getAllByText(formatPrice(products[0].price)).length).toBeGreaterThan(0);
  });

  it('uses another category-matched photo if a product image fails to load', () => {
    const product = products.find((item) => item.name === 'Cloud Nine Moisturizer');
    render(<App />);
    const image = catalog().getByRole('img', { name: product.name });
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', product.images[1]);
  });

  it('filters by category and brand', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(catalog().getByLabelText('CATEGORY'), 'Lip Oil');
    expect(catalog().getAllByRole('article')).toHaveLength(products.filter((product) => product.category === 'Lip Oil').length);
    expect(catalog().getByRole('heading', { name: 'Petal Soft Lip Oil' })).toBeInTheDocument();
    await user.selectOptions(catalog().getByLabelText('CATEGORY'), 'All');
    await user.selectOptions(catalog().getByLabelText('BRAND'), 'ABEAUTY');
    expect(catalog().getAllByRole('article')).toHaveLength(products.filter((product) => product.brand === 'ABEAUTY').length);
  });

  it('filters by price and sorts by price low to high', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(catalog().getByLabelText('Maximum price'), '3000');
    await user.selectOptions(catalog().getByLabelText('SORT BY'), 'price-low');
    const names = catalog().getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
    expect(names.length).toBeGreaterThan(0);
    expect(names[0]).toBe(products.filter((product) => product.price <= 3000).sort((first, second) => first.price - second.price)[0].name);
    expect(names).toHaveLength(products.filter((product) => product.price <= 3000).length);
  });

  it('adds products to the bag and announces the update', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(catalog().getByRole('button', { name: 'Add Cloud Nine Moisturizer to bag' }));
    expect(screen.getByRole('button', { name: 'Shopping bag, 1 items' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Cloud Nine Moisturizer added to your bag');
  });

  it('toggles a product wishlist button and filters the saved products', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(catalog().getByRole('button', { name: 'Add Cloud Nine Moisturizer to wishlist' }));
    expect(catalog().getByRole('button', { name: 'Remove Cloud Nine Moisturizer from wishlist' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Wishlist, 1 saved' }));
    expect(screen.getByRole('heading', { name: 'Your wish list.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cloud Nine Moisturizer' })).toBeInTheDocument();
    expect(window.localStorage.getItem('abeauty-wishlist')).toBe('[26]');
  });

  it('shows product suggestions while searching', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Search products' }));
    fireEvent.change(screen.getByPlaceholderText('Search products, categories, brands...'), { target: { value: 'mascara' } });
    expect(within(screen.getByRole('search')).getByRole('button', { name: /Lash Love Mascara/ })).toBeInTheDocument();
    expect(catalog().getAllByRole('article')).toHaveLength(products.filter((product) => product.name.toLowerCase().includes('mascara')).length);
  });

  it('subscribes with a valid email address', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Your email address'), 'hello@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe to newsletter' }));
    expect(screen.getByRole('status')).toHaveTextContent("You're on the list");
  });

  it('opens product details, changes shade, and adds the selected variant to the cart', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(catalog().getByRole('button', { name: 'View Velvet Veil Foundation' }));
    expect(screen.getByRole('heading', { name: 'Velvet Veil Foundation' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Show product image/ })).toHaveLength(3);
    await user.click(screen.getByRole('button', { name: 'Tan' }));
    await user.click(screen.getByRole('button', { name: `ADD TO BAG — ${formatPrice(products[0].price)}` }));
    expect(screen.getByRole('heading', { name: 'Your shopping bag.' })).toBeInTheDocument();
    expect(screen.getByText('Shade: Tan')).toBeInTheDocument();
    expect(within(screen.getByRole('complementary')).getByText(formatPrice(products[0].price))).toBeInTheDocument();
    expect(within(screen.getByRole('complementary')).getByText(formatPrice(products[0].price + 5 * INR_PER_USD))).toBeInTheDocument();
  });

  it('updates cart quantity, subtotal, total, removes items, and shows the empty state', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(catalog().getByRole('button', { name: 'Add Cloud Nine Moisturizer to bag' }));
    await user.click(screen.getByRole('button', { name: 'Shopping bag, 1 items' }));
    await user.click(screen.getByRole('button', { name: 'Increase Cloud Nine Moisturizer quantity' }));
    const moisturizerPrice = products.find((product) => product.name === 'Cloud Nine Moisturizer').price;
    expect(within(screen.getByRole('complementary')).getAllByText(formatPrice(moisturizerPrice * 2))).toHaveLength(2);
    expect(within(screen.getByRole('complementary')).getByText('Complimentary')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Decrease Cloud Nine Moisturizer quantity' }));
    expect(within(screen.getByRole('complementary')).getByText(formatPrice(moisturizerPrice + 5 * INR_PER_USD))).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'REMOVE' }));
    expect(screen.getByText('Your bag is taking a little breather.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'CONTINUE SHOPPING' }));
    expect(screen.getByRole('heading', { name: 'The beauty shop.' })).toBeInTheDocument();
  });

  it('moves a saved product to the bag and removes it from the wishlist', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(catalog().getByRole('button', { name: 'Add Petal Soft Lip Oil to wishlist' }));
    await user.click(screen.getByRole('button', { name: 'Wishlist, 1 saved' }));
    await user.click(screen.getByRole('button', { name: 'MOVE TO BAG' }));
    expect(screen.getByRole('heading', { name: 'Your wish list.' })).toBeInTheDocument();
    expect(screen.getByText('0 favorites')).toBeInTheDocument();
    expect(window.localStorage.getItem('abeauty-wishlist')).toBe('[]');
    await user.click(screen.getByRole('button', { name: 'Shopping bag, 1 items' }));
    expect(screen.getByRole('button', { name: 'Petal Soft Lip Oil' })).toBeInTheDocument();
  });
});
