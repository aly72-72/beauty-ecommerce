import { createProductImage, productImageFamily } from './productImages.js';
import { INR_PER_USD } from './currency.js';

const productRows = [
  ['Velvet Veil Foundation', 'Foundation', 'Face Makeup', 38, 48, 4.8, 'ABEAUTY', false, true],
  ['Second Skin Concealer', 'Concealer', 'Face Makeup', 24, 30, 4.7, 'Rare Beauty', false, true],
  ['Cloud Touch Compact', 'Compact Powder', 'Face Makeup', 29, 36, 4.6, 'Maybelline', true, false],
  ['Soft Focus Loose Powder', 'Loose Powder', 'Face Makeup', 32, 40, 4.8, 'L’Oréal', false, false],
  ['Dew Drop Primer', 'Primer', 'Face Makeup', 28, 35, 4.7, 'e.l.f.', true, true],
  ['Petal Flush Blush', 'Blush', 'Face Makeup', 26, 32, 4.9, 'Rare Beauty', false, true],
  ['Sunlit Skin Highlighter', 'Highlighter', 'Face Makeup', 31, 39, 4.7, 'ABEAUTY', true, false],
  ['Sunkissed Bronzing Veil', 'Bronzer', 'Face Makeup', 34, 42, 4.6, 'Maybelline', false, false],
  ['Sculpt & Soft Contour', 'Contour', 'Face Makeup', 30, 38, 4.5, 'e.l.f.', true, false],
  ['All Day Cloud Mist', 'Setting Spray', 'Face Makeup', 27, 34, 4.8, 'L’Oréal', false, true],
  ['Lash Love Mascara', 'Mascara', 'Eye Makeup', 22, 28, 4.8, 'Maybelline', false, true],
  ['Fine Line Liquid Liner', 'Eyeliner', 'Eye Makeup', 19, 24, 4.6, 'L’Oréal', true, false],
  ['Soft Kohl Kajal', 'Kajal', 'Eye Makeup', 16, 20, 4.7, 'e.l.f.', false, false],
  ['Daydream Eye Palette', 'Eyeshadow Palettes', 'Eye Makeup', 42, 52, 4.9, 'Rare Beauty', true, true],
  ['Little Lift Brow Pencil', 'Eyebrow Pencil', 'Eye Makeup', 18, 23, 4.5, 'ABEAUTY', false, false],
  ['Stay Soft Brow Gel', 'Eyebrow Gel', 'Eye Makeup', 20, 25, 4.6, 'Maybelline', true, false],
  ['Flutter Effect Lashes', 'False Eyelashes', 'Eye Makeup', 21, 27, 4.7, 'e.l.f.', false, false],
  ['Rosewood Satin Lipstick', 'Lipstick', 'Lip Makeup', 25, 32, 4.9, 'ABEAUTY', false, true],
  ['Glass Petal Lip Gloss', 'Lipgloss', 'Lip Makeup', 19, 24, 4.6, 'Rare Beauty', true, false],
  ['Velvet Kiss Liquid Lipstick', 'Liquid Lipstick', 'Lip Makeup', 23, 29, 4.7, 'L’Oréal', false, true],
  ['Everyday Lip Balm', 'Lip Balm', 'Lip Makeup', 14, 18, 4.8, 'e.l.f.', false, false],
  ['Petal Line Lip Liner', 'Lip Liner', 'Lip Makeup', 17, 22, 4.5, 'Maybelline', true, false],
  ['Juicy Tint Lip Stain', 'Lip Tint', 'Lip Makeup', 20, 25, 4.7, 'Rare Beauty', false, false],
  ['Petal Soft Lip Oil', 'Lip Oil', 'Lip Makeup', 24, 30, 4.9, 'ABEAUTY', true, true],
  ['Milky Way Face Cleanser', 'Face Cleansers', 'Skincare', 24, 30, 4.8, 'ABEAUTY', false, true],
  ['Cloud Nine Moisturizer', 'Moisturizer', 'Skincare', 42, 52, 4.9, 'ABEAUTY', false, true],
  ['Soft Focus Serum', 'Face Serum', 'Skincare', 56, 68, 4.8, 'Rare Beauty', true, false],
  ['Quiet Morning Toner', 'Toner', 'Skincare', 29, 36, 4.6, 'L’Oréal', false, false],
  ['Sunday Reset Face Mask', 'Face Masks', 'Skincare', 34, 42, 4.7, 'e.l.f.', true, false],
  ['Bright-Eyed Cream', 'Eye Cream', 'Skincare', 39, 48, 4.8, 'Maybelline', false, true],
];

const additionalRows = [
  ['Rose Petal Cream Foundation', 'Foundation', 'Face Makeup', 41, 52, 4.8, 'ABEAUTY', true, false],
  ['Garden Glow Skin Tint', 'Foundation', 'Face Makeup', 36, 45, 4.7, 'Rare Beauty', false, false],
  ['Dewy Day Concealer', 'Concealer', 'Face Makeup', 23, 29, 4.6, 'Maybelline', true, false],
  ['Soft Bloom Brightening Concealer', 'Concealer', 'Face Makeup', 27, 34, 4.8, 'e.l.f.', false, false],
  ['Rosewater Blur Powder', 'Compact Powder', 'Face Makeup', 30, 38, 4.7, 'L’Oréal', true, false],
  ['Petal Veil Pressed Powder', 'Compact Powder', 'Face Makeup', 28, 35, 4.6, 'ABEAUTY', false, false],
  ['Cloud Kiss Finishing Powder', 'Loose Powder', 'Face Makeup', 33, 42, 4.8, 'Rare Beauty', true, false],
  ['Silk Garden Setting Powder', 'Loose Powder', 'Face Makeup', 31, 39, 4.7, 'Maybelline', false, false],
  ['Blossom Grip Primer', 'Primer', 'Face Makeup', 29, 36, 4.9, 'ABEAUTY', true, false],
  ['Petal Perfect Pore Primer', 'Primer', 'Face Makeup', 32, 40, 4.7, 'e.l.f.', false, false],
  ['Velvet Bloom Lash Mascara', 'Mascara', 'Eye Makeup', 24, 30, 4.8, 'ABEAUTY', true, false],
  ['Peony Lift Tubing Mascara', 'Mascara', 'Eye Makeup', 26, 33, 4.7, 'L’Oréal', false, false],
  ['Rose Garden Felt Tip Liner', 'Eyeliner', 'Eye Makeup', 20, 25, 4.8, 'ABEAUTY', true, false],
  ['Petal Flick Gel Eyeliner', 'Eyeliner', 'Eye Makeup', 18, 23, 4.6, 'Maybelline', false, false],
  ['Soft Rose Kajal Crayon', 'Kajal', 'Eye Makeup', 17, 22, 4.7, 'ABEAUTY', true, false],
  ['Garden Muse Shadow Palette', 'Eyeshadow Palettes', 'Eye Makeup', 44, 55, 4.9, 'ABEAUTY', true, false],
  ['Cherry Blossom Eye Palette', 'Eyeshadow Palettes', 'Eye Makeup', 39, 49, 4.8, 'Rare Beauty', false, false],
  ['Peony Petal Brow Pencil', 'Eyebrow Pencil', 'Eye Makeup', 19, 24, 4.7, 'L’Oréal', true, false],
  ['Rose Arch Micro Brow Pencil', 'Eyebrow Pencil', 'Eye Makeup', 16, 20, 4.6, 'ABEAUTY', false, false],
  ['Botanical Brow Setting Gel', 'Eyebrow Gel', 'Eye Makeup', 21, 27, 4.8, 'e.l.f.', true, false],
  ['Soft Bloom Sculpting Brow Gel', 'Eyebrow Gel', 'Eye Makeup', 18, 23, 4.7, 'ABEAUTY', false, false],
  ['Garden Flutter Lash Set', 'False Eyelashes', 'Eye Makeup', 23, 29, 4.8, 'Rare Beauty', true, false],
  ['Romantic Rose Wispy Lashes', 'False Eyelashes', 'Eye Makeup', 20, 25, 4.7, 'e.l.f.', false, false],
  ['Blushing Peony Satin Lip', 'Lipstick', 'Lip Makeup', 27, 34, 4.9, 'ABEAUTY', true, false],
  ['Rosewater Cream Lip Color', 'Lipstick', 'Lip Makeup', 24, 30, 4.7, 'L’Oréal', false, false],
  ['Cherry Blossom Shine Gloss', 'Lipgloss', 'Lip Makeup', 21, 27, 4.8, 'ABEAUTY', true, false],
  ['Petal Glaze Plumping Gloss', 'Lipgloss', 'Lip Makeup', 22, 28, 4.7, 'Rare Beauty', false, false],
  ['Rosewood Garden Lip Stain', 'Liquid Lipstick', 'Lip Makeup', 25, 32, 4.8, 'ABEAUTY', true, false],
  ['Soft Petal Matte Liquid Lip', 'Liquid Lipstick', 'Lip Makeup', 22, 28, 4.7, 'Maybelline', false, false],
  ['Honey Rose Botanical Balm', 'Lip Balm', 'Lip Makeup', 15, 19, 4.8, 'ABEAUTY', true, false],
  ['Peony Kiss Tinted Lip Balm', 'Lip Balm', 'Lip Makeup', 17, 22, 4.7, 'e.l.f.', false, false],
  ['Rosebud Precision Lip Pencil', 'Lip Liner', 'Lip Makeup', 18, 23, 4.8, 'ABEAUTY', true, false],
  ['Blossom Line Velvet Liner', 'Lip Liner', 'Lip Makeup', 16, 20, 4.6, 'L’Oréal', false, false],
  ['Cherry Petal Water Tint', 'Lip Tint', 'Lip Makeup', 21, 27, 4.9, 'ABEAUTY', true, false],
  ['Peony Dew Nourishing Lip Oil', 'Lip Oil', 'Lip Makeup', 26, 33, 4.9, 'ABEAUTY', true, false],
  ['Rose Petal Glossing Lip Oil', 'Lip Oil', 'Lip Makeup', 22, 28, 4.8, 'e.l.f.', false, false],
  ['Rosehip Milk Cleanser', 'Face Cleansers', 'Skincare', 26, 33, 4.8, 'ABEAUTY', true, false],
  ['Peony Petal Gentle Cleanse', 'Face Cleansers', 'Skincare', 22, 28, 4.7, 'Rare Beauty', false, false],
  ['Garden Dew Barrier Cream', 'Moisturizer', 'Skincare', 45, 56, 4.9, 'ABEAUTY', true, false],
  ['Rosewater Whipped Moisture', 'Moisturizer', 'Skincare', 37, 46, 4.8, 'e.l.f.', false, false],
  ['Peony Glow Vitamin Serum', 'Face Serum', 'Skincare', 59, 74, 4.9, 'ABEAUTY', true, false],
  ['Cherry Blossom Firming Drops', 'Face Serum', 'Skincare', 52, 65, 4.8, 'L’Oréal', false, false],
  ['Sage Petal Balancing Toner', 'Toner', 'Skincare', 31, 39, 4.7, 'ABEAUTY', true, false],
  ['Rose Garden Essence Toner', 'Toner', 'Skincare', 28, 35, 4.8, 'Rare Beauty', false, false],
  ['Peony Cloud Overnight Mask', 'Face Masks', 'Skincare', 36, 45, 4.9, 'ABEAUTY', true, false],
  ['Rosehip Renewal Sheet Mask', 'Face Masks', 'Skincare', 18, 23, 4.7, 'e.l.f.', false, false],
  ['Cherry Blossom Eye Elixir', 'Eye Cream', 'Skincare', 42, 53, 4.9, 'ABEAUTY', true, false],
  ['Petal Soft Brightening Eye Balm', 'Eye Cream', 'Skincare', 35, 44, 4.8, 'Maybelline', false, false],
  ['Sage Petal Overnight Moisture', 'Moisturizer', 'Skincare', 39, 49, 4.8, 'L’Oréal', true, false],
  ['Rosehip Dew Recovery Serum', 'Face Serum', 'Skincare', 48, 60, 4.8, 'e.l.f.', false, false],
];

const productDescriptions = {
  Foundation: 'A breathable, skin-loving veil that smooths and evens your complexion while letting your natural radiance shine through.',
  Concealer: 'A creamy, blendable touch of coverage that brightens where you want it and feels weightless all day.',
  'Compact Powder': 'A silky-soft pressed powder that keeps your look fresh with a soft-focus, never-flat finish.',
  'Loose Powder': 'A featherlight finishing powder that sets makeup and blurs the look of shine without feeling heavy.',
  Primer: 'A hydrating, smoothing first step that gives makeup a soft, glowy canvas to call home.',
  Blush: 'A blendable pop of petal-soft color that melts into skin for a fresh-from-within flush.',
  Highlighter: 'A finely milled, light-catching glow that makes your favorite features feel like the whole story.',
  Bronzer: 'A soft, buildable warmth that brings a little just-back-from-somewhere-sunny feeling to your look.',
  Contour: 'A silky, easy-to-blend contour for natural-looking definition that still feels like you.',
  'Setting Spray': 'A refreshing, fine mist that helps your makeup feel comfortable and beautifully in place.',
  Lipstick: 'A comfortable satin lipstick with rich, feel-good color and a soft, cushiony finish.',
  Lipgloss: 'A non-sticky, glassy gloss that gives lips a juicy sheen and a little extra love.',
  'Liquid Lipstick': 'Long-wearing, velvety color with a lightweight feel that keeps lips soft, never parched.',
  'Lip Balm': 'A comforting daily balm that cushions lips with lasting moisture and a hint of care.',
  'Lip Liner': 'A creamy, easy-glide liner to define, shape, and keep your favorite lip color feeling polished.',
  'Lip Tint': 'A sheer, just-bitten wash of color that leaves lips looking fresh and feeling like themselves.',
  'Lip Oil': 'A nourishing, glossy lip oil that wraps lips in a sheer wash of juicy color and lasting comfort.',
  'Lip Gloss': 'A smooth, light-catching gloss with a comfortable finish and a soft wash of color.',
  Moisturizer: 'A cushiony, cloud-soft cream that leaves skin dewy, calm, and beautifully replenished.',
  'Face Serum': 'A lightweight daily serum powered by skin-loving ingredients for a healthy, lit-from-within glow.',
  'Face Cleansers': 'A gentle, skin-kind cleanse that lifts away the day while leaving your skin soft and comfortable.',
  'Face Wash': 'A gentle foaming cleanser that rinses away daily buildup without leaving skin feeling tight.',
  Sunscreen: 'A comfortable daily SPF 50 sunscreen made to protect skin with a lightweight finish.',
  'Aloe Vera Gel': 'A cooling, lightweight aloe gel that refreshes and comforts skin.',
  'Body Lotion': 'A nourishing daily body lotion that leaves skin feeling soft and comfortably moisturized.',
  'Body Butter': 'A rich, whipped body butter that melts into dry skin with a soft vanilla scent.',
  'Body Wash': 'A refreshing body wash that creates a gentle lather and leaves skin feeling clean.',
  'Makeup Remover': 'A gentle makeup remover that dissolves everyday makeup while keeping skin comfortable.',
  Toner: 'A refreshing, balancing toner that preps skin for the rest of your little feel-good ritual.',
  'Face Masks': 'A feel-good treatment that gives skin a moment to reset, recharge, and find its happy place.',
  'Eye Cream': 'A silky, comforting eye cream that hydrates delicate skin and brightens your little look of the day.',
};

const complexionShades = [
  { name: 'Porcelain', color: '#f0d7c8' },
  { name: 'Fair', color: '#e8c1a8' },
  { name: 'Light', color: '#d9a987' },
  { name: 'Medium', color: '#bc805c' },
  { name: 'Tan', color: '#935b3d' },
  { name: 'Deep', color: '#613b2b' },
];
const lipShades = [
  { name: 'Rosewood', color: '#985c58' },
  { name: 'Petal', color: '#d78983' },
  { name: 'Berry', color: '#853e59' },
  { name: 'Nude', color: '#ba8274' },
  { name: 'Cocoa', color: '#684137' },
];
const eyeShades = [
  { name: 'Soft Brown', color: '#80614d' },
  { name: 'Espresso', color: '#392a27' },
  { name: 'Warm Taupe', color: '#b2947a' },
  { name: 'Soft Black', color: '#211d1e' },
];

const productShades = {
  Foundation: complexionShades,
  Concealer: complexionShades,
  'Compact Powder': complexionShades,
  'Loose Powder': complexionShades,
  Bronzer: [
    { name: 'Sunbeam', color: '#d39b6c' }, { name: 'Golden Hour', color: '#b8784e' },
    { name: 'Sunkissed', color: '#92583a' }, { name: 'Afterglow', color: '#70452f' },
  ],
  Blush: [
    { name: 'Petal', color: '#df9991' }, { name: 'Rose', color: '#c76f72' },
    { name: 'Peach', color: '#e9a47e' }, { name: 'Berry', color: '#9e5266' },
  ],
  Highlighter: [
    { name: 'Champagne', color: '#e7c89c' }, { name: 'Rose Gold', color: '#d59c83' },
    { name: 'Soft Pearl', color: '#f2e5d4' }, { name: 'Golden Glow', color: '#c99756' },
  ],
  Contour: complexionShades.slice(1),
  Lipstick: lipShades,
  Lipgloss: lipShades,
  'Lip Gloss': lipShades,
  'Liquid Lipstick': lipShades,
  'Lip Balm': [
    { name: 'Clear', color: '#edc9b8' }, { name: 'Petal Pink', color: '#db928e' },
    { name: 'Berry Kiss', color: '#a44e66' },
  ],
  'Lip Liner': lipShades,
  'Lip Tint': lipShades,
  'Lip Oil': lipShades,
  Mascara: eyeShades.slice(1),
  Eyeliner: eyeShades.slice(1),
  Kajal: eyeShades.slice(1),
  'Eyeshadow Palettes': [
    { name: 'Rose Edit', color: '#b98276' }, { name: 'Soft Neutrals', color: '#bd9c7d' },
    { name: 'Golden Hour', color: '#b5894f' }, { name: 'Berry Haze', color: '#895368' },
  ],
};

const requestedRows = [
  ['Abeauty vitamin c brightening serum', 'Face Serum', 'Skincare', 24, 30, 4.9, 'ABEAUTY', true, true],
  ['Abeauty hyaluronic acid serum', 'Face Serum', 'Skincare', 26, 33, 4.9, 'ABEAUTY', true, false],
  ['Abeauty niacinamide face serum', 'Face Serum', 'Skincare', 25, 32, 4.8, 'ABEAUTY', true, false],
  ['Abeauty gentle foaming facewash', 'Face Wash', 'Skincare', 18, 23, 4.8, 'ABEAUTY', true, true],
  ['Abeauty hydrating face moisturizer', 'Moisturizer', 'Skincare', 28, 35, 4.9, 'ABEAUTY', true, true],
  ['Abeauty daily sunscreen SPF 50', 'Sunscreen', 'Skincare', 22, 28, 4.8, 'ABEAUTY', true, false],
  ['Abeauty rose water toner', 'Toner', 'Skincare', 17, 22, 4.7, 'ABEAUTY', true, false],
  ['Abeauty aloe vera gel', 'Aloe Vera Gel', 'Skincare', 16, 20, 4.8, 'ABEAUTY', true, false],
  ['Abeauty nourishing body lotion', 'Body Lotion', 'Bodycare', 21, 27, 4.8, 'ABEAUTY', true, false],
  ['Abeauty vanilla bodybutter', 'Body Butter', 'Bodycare', 24, 30, 4.9, 'ABEAUTY', true, true],
  ['abeauty refreshing body wash', 'Body Wash', 'Bodycare', 18, 23, 4.7, 'ABEAUTY', true, false],
  ['abeauty rose lip balm', 'Lip Balm', 'Lipcare', 12, 16, 4.8, 'ABEAUTY', true, true],
  ['abeauty hydrating lip oil', 'Lip Oil', 'Lipcare', 16, 20, 4.9, 'ABEAUTY', true, true],
  ['Abeauty lipstick - Rose', 'Lipstick', 'Lipcare', 18, 23, 4.8, 'ABEAUTY', true, false],
  ['Abeauty lipstick - Berry', 'Lipstick', 'Lipcare', 18, 23, 4.8, 'ABEAUTY', true, false],
  ['Abeauty lipstick - Nude', 'Lipstick', 'Lipcare', 18, 23, 4.7, 'ABEAUTY', true, false],
  ['Abeauty lipstick - Red', 'Lipstick', 'Lipcare', 18, 23, 4.9, 'ABEAUTY', true, true],
  ['Abeauty lip gloss - Clear Shine', 'Lip Gloss', 'Lipcare', 15, 19, 4.8, 'ABEAUTY', true, false],
  ['Abeauty lip gloss - Rose Glow', 'Lip Gloss', 'Lipcare', 15, 19, 4.8, 'ABEAUTY', true, false],
  ['abeauty glow face mask', 'Face Masks', 'Beauty', 20, 25, 4.8, 'ABEAUTY', true, false],
  ['abeauty gentle makeup remover', 'Makeup Remover', 'Beauty', 17, 22, 4.7, 'ABEAUTY', true, false],
];

const familySlots = new Map();

export const products = [...productRows, ...additionalRows, ...requestedRows].map(([name, category, department, price, originalPrice, rating, brand, isNew, bestSeller], index) => {
  const priceInInr = Math.round(price * INR_PER_USD);
  const originalPriceInInr = Math.round(originalPrice * INR_PER_USD);
  const product = {
  id: index + 1,
  name,
  category,
  department,
  price: priceInInr,
  originalPrice: originalPriceInInr,
  discount: Math.round((1 - priceInInr / originalPriceInInr) * 100),
  rating,
  reviews: 48 + ((index * 37) % 310),
  popularity: (index * 17 + 31) % 100,
  createdAt: productsDate(index, isNew),
  brand,
  isNew,
  bestSeller,
  description: productDescriptions[category] || `A thoughtful ${category.toLowerCase()} favorite, made to feel lovely from the very first use.`,
  shades: productShades[category] || [],
  };
  const family = productImageFamily(product);
  const imageSlot = familySlots.get(family) ?? 0;
  familySlots.set(family, imageSlot + 1);
  const image = createProductImage(product, 0, imageSlot);
  return {
    ...product,
    image,
    images: [image, createProductImage(product, 1, imageSlot), createProductImage(product, 2, imageSlot)],
  };
});

function productsDate(index, isNew) {
  return isNew ? 30 - index : 100 - index;
}

export const departments = [
  { name: 'Face Makeup', caption: 'A little base, a lot of you.', image: '/product-photos/commons-91510675.jpg' },
  { name: 'Eye Makeup', caption: 'Let your eyes do the talking.', image: '/product-photos/eye-makeup-flatlay.jpg' },
  { name: 'Lip Makeup', caption: 'Your color, your rules.', image: '/product-photos/commons-64731777.jpg' },
  { name: 'Skincare', caption: 'A softer kind of self-care.', image: '/product-photos/commons-29324212.jpg' },
  { name: 'Bodycare', caption: 'A little care from head to toe.', image: '/product-photos/commons-2690087.jpg' },
  { name: 'Lipcare', caption: 'Soft, glossy color made for you.', image: '/product-photos/commons-8978553.jpg' },
  { name: 'Beauty', caption: 'Little essentials for your routine.', image: '/product-photos/commons-61830064.jpg' },
].map((department) => ({
  ...department,
  count: products.filter((product) => product.department === department.name).length,
}));

export const categories = [...new Set(products.map((product) => product.category))];
export const brands = [...new Set(products.map((product) => product.brand))];
