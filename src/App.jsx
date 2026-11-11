import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Flower2, Heart, Menu,
  Search, ShoppingBag, Sparkles, Star, UserRound, X,
} from 'lucide-react';
import { brands, categories, departments, products } from './catalog.js';
import { formatPrice, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from './currency.js';

const imageUrl = (image, width = 900) => (
  image.startsWith('data:') || image.startsWith('/')
    ? image
    : `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=85`
);

function handleProductImageError(event, fallbackImage) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = 'true';
  image.src = fallbackImage;
}

function ProductImage({ image, width, fallbackImage = '/product-photos/makeup-flatlay.jpg', ...props }) {
  return <img {...props} src={imageUrl(image, width)} onError={(event) => handleProductImageError(event, fallbackImage)} />;
}

function loadWishlist() {
  try {
    const saved = window.localStorage.getItem('abeauty-wishlist');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new TypeError('Saved wishlist must be an array');
    return parsed.filter((id) => Number.isInteger(id) && products.some((product) => product.id === id));
  } catch (error) {
    console.error('Unable to load the saved ABEAUTY wishlist:', error);
    return [];
  }
}

function ProductCard({ product, isFavorite, onFavorite, onAdd, onOpen }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <button className="product-image-open" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
          <ProductImage image={product.image} width={760} fallbackImage={product.images[1]} alt={product.name} loading="lazy" />
        </button>
        <div className="product-badges">
          {product.isNew && <span className="product-badge badge-new">NEW ARRIVAL</span>}
          {product.bestSeller && <span className="product-badge">BESTSELLER</span>}
          {!product.isNew && !product.bestSeller && <span className="product-badge badge-sale">-{product.discount}%</span>}
        </div>
        <button
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          onClick={() => onFavorite(product.id)}
          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${product.name} ${isFavorite ? 'from' : 'to'} wishlist`}
          aria-pressed={isFavorite}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-add" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to bag`}>
          <span>ADD TO BAG</span><ArrowUpRight size={16} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-title">
          <p className="product-kind">{product.brand} <span>·</span> {product.category}</p>
          <h3><button className="product-name-button" onClick={() => onOpen(product)}>{product.name}</button></h3>
        </div>
        <p className="product-price"><del>{formatPrice(product.originalPrice)}</del> {formatPrice(product.price)}</p>
      </div>
      <div className="product-meta">
        <span className="rating"><Star size={12} fill="currentColor" /> {product.rating} <span className="review-count">({product.reviews})</span></span>
        <span className="discount-label">{product.discount}% OFF</span>
      </div>
    </article>
  );
}

function ProductGrid({ items, favorites, onFavorite, onAdd, onOpen, className = '' }) {
  return (
    <div className={`product-grid ${className}`}>
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onFavorite={onFavorite}
          onAdd={onAdd}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

function ProductDetails({ product, onBack, onAdd }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(product.shades[0] || null);

  return (
    <section className="detail-page section-wrap" aria-label={`${product.name} product details`}>
      <button className="detail-back" onClick={onBack}><ArrowRight size={15} /> BACK TO SHOP</button>
      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image"><ProductImage image={product.images[activeImage]} width={1200} fallbackImage={product.images[(activeImage + 1) % product.images.length]} alt={`${product.name}${activeImage ? ` view ${activeImage + 1}` : ''}`} /></div>
          <div className="detail-thumbnails" aria-label="Product images">
            {product.images.map((image, index) => (
              <button key={`${product.id}-${index}-${image}`} className={activeImage === index ? 'thumbnail-active' : ''} onClick={() => setActiveImage(index)} aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage === index}>
                <ProductImage image={product.images[index]} width={180} fallbackImage={product.images[(index + 1) % product.images.length]} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.brand} <span>·</span> {product.category}</p>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span className="rating"><Star size={14} fill="currentColor" /> {product.rating}</span><span>{product.reviews} lovely reviews</span></div>
          <p className="detail-price"><del>{formatPrice(product.originalPrice)}</del> {formatPrice(product.price)}<span>{product.discount}% OFF</span></p>
          <p className="detail-description">{product.description}</p>
          {product.shades.length > 0 && (
            <div className="shade-picker">
              <div><span>CHOOSE YOUR SHADE</span><strong>{selectedShade?.name}</strong></div>
              <div className="shade-options" role="group" aria-label="Available shades">
                {product.shades.map((shade) => (
                  <button
                    key={shade.name}
                    className={selectedShade?.name === shade.name ? 'shade-selected' : ''}
                    style={{ '--shade-color': shade.color }}
                    onClick={() => setSelectedShade(shade)}
                    aria-label={shade.name}
                    aria-pressed={selectedShade?.name === shade.name}
                  />
                ))}
              </div>
            </div>
          )}
          <button className="button button-dark detail-add" onClick={() => onAdd(product, selectedShade)}>
            ADD TO BAG — {formatPrice(product.price)} <ShoppingBag size={16} />
          </button>
          <div className="detail-promises"><span><Check size={14} /> Thoughtfully made</span><span><Check size={14} /> A little love in every order</span></div>
          <div className="detail-note"><Sparkles size={16} /> Complimentary shipping on orders {formatPrice(FREE_SHIPPING_THRESHOLD)}+</div>
        </div>
      </div>
    </section>
  );
}

function CartPage({ cart, onQuantity, onRemove, onContinue, onCheckout, onOpen }) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <section className="cart-page section-wrap">
      <div className="section-heading cart-heading">
        <div><p className="eyebrow"><span className="eyebrow-line" /> YOUR LITTLE LOVELIES</p><h1>Your shopping bag.</h1></div>
        <span className="shop-result-count">{cart.reduce((count, item) => count + item.quantity, 0)} items</span>
      </div>
      {!cart.length ? (
        <div className="cart-empty">
          <span className="empty-bag-icon"><ShoppingBag size={28} /></span>
          <h2>Your bag is taking a little breather.</h2>
          <p>There's room for something lovely whenever you're ready.</p>
          <button className="button button-dark" onClick={onContinue}>CONTINUE SHOPPING <ArrowRight size={15} /></button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={`${item.id}-${item.shade?.name || 'default'}`}>
                <button className="cart-item-image" onClick={() => onOpen(item)} aria-label={`View ${item.name}`}><ProductImage image={item.image} width={320} fallbackImage={item.images?.[1]} alt={item.name} /></button>
                <div className="cart-item-info">
                  <p className="product-kind">{item.brand} · {item.category}</p>
                  <button className="cart-item-name" onClick={() => onOpen(item)}>{item.name}</button>
                  {item.shade && <p className="cart-item-shade">Shade: {item.shade.name}</p>}
                  <button className="cart-remove" onClick={() => onRemove(item.id, item.shade?.name)}>REMOVE</button>
                </div>
                <div className="cart-item-right">
                  <p className="cart-line-price">{formatPrice(item.price * item.quantity)}</p>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button onClick={() => onQuantity(item.id, item.shade?.name, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button onClick={() => onQuantity(item.id, item.shade?.name, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <p className="summary-title">A LITTLE ORDER SUMMARY</p>
            <div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div><span>Shipping</span><span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span></div>
            <p className="shipping-note">{shipping ? `You're ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} away from complimentary shipping.` : 'Your shipping is on us. Lovely choice.'}</p>
            <div className="summary-total"><strong>Total</strong><strong>{formatPrice(total)}</strong></div>
            <button className="button button-dark checkout-button" onClick={onCheckout}>CHECK OUT <ArrowRight size={16} /></button>
            <button className="continue-link" onClick={onContinue}>CONTINUE SHOPPING</button>
          </aside>
        </div>
      )}
    </section>
  );
}

function WishlistPage({ favorites, onFavorite, onMove, onOpen, onContinue }) {
  const savedProducts = products.filter((product) => favorites.includes(product.id));
  return (
    <section className="wishlist-page section-wrap">
      <div className="section-heading cart-heading">
        <div><p className="eyebrow"><span className="eyebrow-line" /> SAVED WITH LOVE</p><h1>Your wish list.</h1></div>
        <span className="shop-result-count">{savedProducts.length} {savedProducts.length === 1 ? 'favorite' : 'favorites'}</span>
      </div>
      {savedProducts.length ? (
        <div className="wishlist-grid">
          {savedProducts.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <ProductCard product={product} isFavorite onFavorite={onFavorite} onAdd={onMove} onOpen={onOpen} />
              <button className="wishlist-move" onClick={() => onMove(product)}>MOVE TO BAG <ArrowRight size={14} /></button>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-empty wishlist-empty">
          <Heart size={30} strokeWidth={1.3} />
          <h2>A little space for your future favorites.</h2>
          <p>Tap the heart on anything you love and we'll keep it safe right here.</p>
          <button className="button button-dark" onClick={onContinue}>EXPLORE THE COLLECTION <ArrowRight size={15} /></button>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(loadWishlist);
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('abeauty-wishlist', JSON.stringify(favorites));
    } catch (error) {
      console.error('Unable to save the ABEAUTY wishlist:', error);
      setNotice('Your wishlist could not be saved on this device.');
    }
  }, [favorites]);

  const matchingProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const searchTerm = query.trim().toLowerCase();
      const matchesDepartment = activeDepartment === 'All'
        || (activeDepartment === 'Makeup'
          ? ['Face Makeup', 'Eye Makeup', 'Lip Makeup', 'Lipcare'].includes(product.department)
          : product.department === activeDepartment);
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesMinimum = minPrice === '' || product.price >= Number(minPrice);
      const matchesMaximum = maxPrice === '' || product.price <= Number(maxPrice);
      const matchesSearch = !searchTerm || [product.name, product.category, product.brand, product.department]
        .some((value) => value.toLowerCase().includes(searchTerm));
      const matchesWishlist = !wishlistOnly || favorites.includes(product.id);
      return matchesDepartment && matchesCategory && matchesBrand && matchesMinimum && matchesMaximum && matchesSearch && matchesWishlist;
    });

    return filtered.sort((first, second) => {
      if (sortBy === 'price-low') return first.price - second.price;
      if (sortBy === 'price-high') return second.price - first.price;
      if (sortBy === 'newest') return second.createdAt - first.createdAt;
      return second.popularity - first.popularity;
    });
  }, [activeDepartment, activeCategory, selectedBrand, minPrice, maxPrice, query, sortBy, wishlistOnly, favorites]);

  const searchSuggestions = useMemo(() => query.trim()
    ? products.filter((product) => `${product.name} ${product.category} ${product.brand}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 4)
    : products.filter((product) => product.bestSeller).slice(0, 3), [query]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const addToBag = (product, shade = null) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id && item.shade?.name === shade?.name);
      return existing
        ? items.map((item) => item.id === product.id && item.shade?.name === shade?.name ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, shade, quantity: 1 }];
    });
    showNotice(`${product.name}${shade ? ` in ${shade.name}` : ''} added to your bag`);
  };

  const toggleFavorite = (id) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setPage('product');
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  const updateQuantity = (id, shadeName, amount) => {
    setCart((items) => items.flatMap((item) => {
      if (item.id !== id || item.shade?.name !== shadeName) return [item];
      const quantity = item.quantity + amount;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  };

  const removeFromCart = (id, shadeName) => {
    setCart((items) => items.filter((item) => item.id !== id || item.shade?.name !== shadeName));
  };

  const continueShopping = () => {
    setPage('home');
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  const openCart = () => {
    setPage('cart');
    setSearchOpen(false);
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  const openWishlist = () => {
    setPage('wishlist');
    setSearchOpen(false);
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setActiveDepartment('All');
    setActiveCategory('All');
    setSelectedBrand('All');
    setMinPrice('');
    setMaxPrice('');
    setQuery('');
    setWishlistOnly(false);
    setSortBy('popular');
  };

  const scrollTo = (id, department = 'All') => {
    setPage('home');
    setActiveDepartment(department);
    setActiveCategory('All');
    setWishlistOnly(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth' }), 0);
    setMenuOpen(false);
  };

  const shopByDepartment = (department) => {
    setPage('home');
    setActiveDepartment(department);
    setActiveCategory('All');
    setWishlistOnly(false);
    window.setTimeout(() => document.getElementById('shop')?.scrollIntoView?.({ behavior: 'smooth' }), 0);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  const bestSellers = products.filter((product) => product.bestSeller).slice(0, 4);
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4);
  const trending = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const hasActiveFilters = activeDepartment !== 'All' || activeCategory !== 'All' || selectedBrand !== 'All'
    || minPrice !== '' || maxPrice !== '' || query !== '' || wishlistOnly;

  return (
    <div className="site-shell">
      <div className="announcement">
        <Sparkles size={13} strokeWidth={1.5} />
        <span>ABEAUTY DAYS · UP TO 30% OFF YOUR FEEL-GOOD FAVORITES</span>
        <a href="#offers">SHOP THE EDIT <ArrowRight size={13} /></a>
      </div>

      <header className="header">
        <button className="icon-button mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <button onClick={() => scrollTo('home')}>HOME</button>
          <button onClick={() => scrollTo('shop')}>SHOP</button>
          <button onClick={() => scrollTo('shop', 'Makeup')}>MAKEUP</button>
          <button onClick={() => scrollTo('shop', 'Skincare')}>SKINCARE</button>
          <a href="#brands" onClick={() => setMenuOpen(false)}>BRANDS</a>
          <a href="#offers" onClick={() => setMenuOpen(false)}>OFFERS</a>
        </nav>
        <a className="wordmark" href="#home" onClick={(event) => { event.preventDefault(); continueShopping(); }} aria-label="Abeauty home">Abeauty<Flower2 size={15} strokeWidth={1.35} /></a>
        <div className="header-actions">
          <button className="icon-button search-trigger" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}>
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <button
            className={`icon-button wishlist-trigger ${wishlistOnly ? 'is-favorite' : ''}`}
            aria-label={`Wishlist${favorites.length ? `, ${favorites.length} saved` : ''}`}
            aria-pressed={page === 'wishlist'}
            onClick={openWishlist}
          >
            <Heart size={19} fill={wishlistOnly ? 'currentColor' : 'none'} />
          </button>
          <button className="icon-button account-trigger" aria-label="My account" onClick={() => showNotice('Your ABEAUTY account is coming soon')}>
            <UserRound size={19} />
          </button>
          <button className="bag-button" aria-label={`Shopping bag, ${cartCount} items`} onClick={openCart}>
            <ShoppingBag size={18} strokeWidth={1.5} /><span className="bag-label">BAG</span>
            <span className="bag-count" aria-live="polite">{cartCount}</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <form className="search-panel" role="search" onSubmit={(event) => { event.preventDefault(); scrollTo('shop'); }}>
          <Search size={18} />
          <input autoFocus aria-label="Search products" placeholder="Search products, categories, brands..." value={query} onChange={(event) => setQuery(event.target.value)} />
          {query && <button type="button" className="search-clear" onClick={() => setQuery('')}>CLEAR</button>}
          <div className="search-suggestions">
            <span className="suggestion-heading">{query ? 'SUGGESTED FOR YOU' : 'A FEW FAVORITES'}</span>
            {searchSuggestions.length ? searchSuggestions.map((product) => (
              <button type="button" className="suggestion-item" key={product.id} onClick={() => { setQuery(product.name); scrollTo('shop'); }}>
                <ProductImage image={product.image} width={90} fallbackImage={product.images[1]} alt="" />
                <span>{product.name}<small>{product.brand} · {formatPrice(product.price)}</small></span>
                <ArrowUpRight size={15} />
              </button>
            )) : <p className="suggestions-empty">No matches yet. Try another little search.</p>}
          </div>
        </form>
      )}

      <main>
        {page === 'home' ? (
        <>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE MORE YOU</p>
            <h1>Beauty begins<br />with <em>you.</em></h1>
            <p className="hero-description">Thoughtful beauty for the skin you're in. Find your new everyday, made to feel like you — only a little more glowy.</p>
            <div className="hero-buttons">
              <button className="button button-dark hero-cta" onClick={() => scrollTo('shop')}>SHOP NOW <ArrowRight size={16} /></button>
              <button className="button button-outline" onClick={() => scrollTo('categories')}>EXPLORE COLLECTIONS <ArrowDown size={15} /></button>
            </div>
            <div className="hero-note"><span className="hero-note-star">✳</span> GOOD SKIN DAYS, YOUR WAY</div>
          </div>
          <div className="hero-visual">
            <img src="/product-photos/makeup-flatlay.jpg" alt="A collection of makeup products and essentials" fetchpriority="high" />
            <div className="hero-image-caption"><span>THE EVERYDAY BEAUTY EDIT</span><span>01 / 04</span></div>
            <div className="hero-floating-note"><Sparkles size={15} /> Made for real life, and real lovely skin.</div>
            <div className="hero-floral-stamp"><Flower2 size={20} strokeWidth={1.2} /><span>GROWN WITH LOVE</span></div>
          </div>
          <button className="hero-scroll" onClick={() => scrollTo('categories')} aria-label="Scroll to discover">
            <span>SCROLL TO DISCOVER</span><ArrowDown size={15} />
          </button>
          <span className="hero-side-label">SKIN FIRST. ALWAYS.</span>
        </section>

        <section className="promise-strip" aria-label="Our promises">
          <span>GOOD-FOR-YOU FORMULAS</span><i>✿</i><span>NO GATEKEEPING, JUST GLOW</span><i>✿</i><span>MADE WITH A LITTLE MORE LOVE</span>
        </section>

        <section className="category-section section-wrap" id="categories">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> FIND YOUR FEEL-GOOD</p><h2>A little something for <em>everyone.</em></h2></div>
            <button className="text-link link-button" onClick={() => scrollTo('shop')}>SHOP ALL CATEGORIES <ArrowUpRight size={15} /></button>
          </div>
          <div className="category-grid">
            {departments.map((department, index) => (
              <button className={`category-card category-card-${index + 1}`} key={department.name} onClick={() => shopByDepartment(department.name)}>
                <img src={imageUrl(department.image, 760)} alt="" loading="lazy" />
                <span className="category-number">0{index + 1} / {department.count} EDITS</span>
                <span className="category-copy"><strong>{department.name}</strong><small>{department.caption}</small></span>
                <span className="category-arrow"><ArrowUpRight size={18} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="collection-section section-wrap bestsellers-section">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> THE ONES YOU LOVE</p><h2>Best sellers, <em>for a reason.</em></h2></div>
            <button className="text-link link-button" onClick={() => scrollTo('shop')}>SHOP THE BESTSELLERS <ArrowUpRight size={15} /></button>
          </div>
          <ProductGrid items={bestSellers} favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} onOpen={openProduct} />
        </section>

        <section className="editorial-banner" id="offers">
          <img src="/product-photos/makeup-tools.jpg" alt="Makeup brushes and cosmetics" loading="lazy" />
          <div className="editorial-overlay">
            <p className="eyebrow">A LITTLE SOMETHING EXTRA</p>
            <h2>Good things<br />come to those<br /><em>who glow.</em></h2>
            <p>Take up to 30% off your feel-good favorites. A little treat, just because.</p>
            <button className="button button-light" onClick={() => { setMaxPrice('35'); scrollTo('shop'); }}>SHOP THE OFFERS <ArrowRight size={16} /></button>
          </div>
          <span className="editorial-label">THE ABEAUTY DAYS EDIT · A LITTLE LOVE, ON US</span>
        </section>

        <section className="collection-section section-wrap arrivals-section">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> JUST LANDED</p><h2>New things to <em>love.</em></h2></div>
            <button className="text-link link-button" onClick={() => { setSortBy('newest'); scrollTo('shop'); }}>DISCOVER WHAT'S NEW <ArrowUpRight size={15} /></button>
          </div>
          <ProductGrid items={newArrivals} favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} onOpen={openProduct} />
        </section>

        <section className="trending-section">
          <div className="trending-inner section-wrap">
            <div className="trending-intro">
              <p className="eyebrow"><span className="eyebrow-line" /> ON EVERYONE'S VANITY</p>
              <h2>Currently<br /><em>crushing on.</em></h2>
              <p>Little things making a big feel-good difference. See what everyone's loving right now.</p>
              <button className="button button-outline" onClick={() => { setSortBy('popular'); scrollTo('shop'); }}>EXPLORE THE EDIT <ArrowRight size={15} /></button>
            </div>
            <ProductGrid items={trending} favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} onOpen={openProduct} className="trending-grid" />
          </div>
        </section>

        <section className="brand-section section-wrap" id="brands">
          <div className="brand-heading"><p className="eyebrow"><span className="eyebrow-line" /> GOOD COMPANY</p><h2>Brands we <em>believe in.</em></h2><p>Thoughtful formulas and feel-good favorites, all in one place.</p></div>
          <div className="brand-list">
            {brands.map((brand, index) => (
              <button className={`brand-mark brand-mark-${index + 1}`} key={brand} onClick={() => { setSelectedBrand(brand); scrollTo('shop'); }}>
                {brand}
              </button>
            ))}
          </div>
        </section>

        <section className="shop-section section-wrap" id="shop">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="eyebrow-line" /> YOUR NEW EVERYDAYS</p><h2>{wishlistOnly ? 'Your wish list.' : 'The beauty shop.'}</h2></div>
            <span className="shop-result-count">{matchingProducts.length} little {matchingProducts.length === 1 ? 'favorite' : 'favorites'}</span>
          </div>
          <div className="catalog-controls">
            <div className="catalog-search">
              <Search size={17} />
              <label className="sr-only" htmlFor="catalog-search">Search products</label>
              <input id="catalog-search" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} />
              {query && <button aria-label="Clear product search" onClick={() => setQuery('')}><X size={15} /></button>}
            </div>
            <div className="filter-field">
              <label htmlFor="category-filter">CATEGORY</label>
              <select id="category-filter" value={activeCategory} onChange={(event) => { setActiveCategory(event.target.value); setActiveDepartment('All'); }}>
                <option value="All">All categories</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select><ChevronDown size={14} />
            </div>
            <div className="filter-field">
              <label htmlFor="brand-filter">BRAND</label>
              <select id="brand-filter" value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)}>
                <option value="All">All brands</option>
                {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select><ChevronDown size={14} />
            </div>
            <div className="price-filter">
              <label>PRICE</label>
              <div><span>₹</span><input aria-label="Minimum price" type="number" min="0" placeholder="Min" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} /><span className="price-dash">–</span><span>₹</span><input aria-label="Maximum price" type="number" min="0" placeholder="Max" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} /></div>
            </div>
            <div className="filter-field sort-field">
              <label htmlFor="sort-products">SORT BY</label>
              <select id="sort-products" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="popular">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select><ChevronDown size={14} />
            </div>
          </div>
          <div className="catalog-toolbar">
            <div className="department-tabs" role="group" aria-label="Filter by department">
              {['All', 'Makeup', ...departments.map((department) => department.name)].map((department) => (
                <button key={department} className={activeDepartment === department ? 'filter-active' : ''} onClick={() => { setActiveDepartment(department); setActiveCategory('All'); setWishlistOnly(false); }} aria-pressed={activeDepartment === department}>{department === 'All' ? 'Everything' : department}</button>
              ))}
            </div>
            {hasActiveFilters && <button className="clear-filters" onClick={resetFilters}>CLEAR ALL <X size={13} /></button>}
          </div>
          {matchingProducts.length ? (
            <ProductGrid items={matchingProducts} favorites={favorites} onFavorite={toggleFavorite} onAdd={addToBag} onOpen={openProduct} />
          ) : (
            <div className="empty-search"><p>No little favorites found.</p><span>Try adjusting your filters or searching for something else.</span><button onClick={resetFilters}>CLEAR ALL FILTERS <ArrowRight size={15} /></button></div>
          )}
        </section>

        <section className="story-section" id="our-story">
          <div className="story-image">
            <img src="/product-photos/commons-9800696.jpg" alt="A woman touching up her makeup" loading="lazy" />
            <span className="story-image-note">A MOMENT, JUST FOR YOU</span>
          </div>
          <div className="story-copy">
            <span className="story-sparkle">✳</span>
            <p className="eyebrow">A NOTE FROM US</p>
            <h2>You're not a<br />before picture.<br /><em>You're the whole</em><br /><em>beautiful story.</em></h2>
            <p>We made ABEAUTY for the in-between moments. The slow mornings, the five-minute routines, the days you show up exactly as you are. Beauty should feel like coming home to yourself.</p>
            <a href="#newsletter" className="text-link">A LITTLE MORE ABOUT US <ArrowUpRight size={15} /></a>
            <span className="story-signoff">With love, ABEAUTY</span>
          </div>
        </section>

        <section className="newsletter-section" id="newsletter">
          <div className="newsletter-sparkle sparkle-one">✳</div>
          <div className="newsletter-sparkle sparkle-two">✳</div>
          <p className="eyebrow">LET'S BE PEN PALS</p>
          <h2>A little love<br />in your <em>inbox.</em></h2>
          <p className="newsletter-copy">Feel-good notes, first dibs, and 10% off that first little something.</p>
          {subscribed ? (
            <p className="subscribe-success" role="status"><Check size={18} /> You're on the list. Lovely to have you here.</p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
              <input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <button type="submit" aria-label="Subscribe to newsletter"><ArrowRight size={20} /></button>
            </form>
          )}
          <p className="newsletter-fine-print">THE GOOD STUFF ONLY. UNSUBSCRIBE ANYTIME.</p>
        </section>
        </>
        ) : page === 'product' && selectedProduct ? (
          <ProductDetails key={selectedProduct.id} product={selectedProduct} onBack={continueShopping} onAdd={(product, shade) => { addToBag(product, shade); openCart(); }} />
        ) : page === 'cart' ? (
          <CartPage cart={cart} onQuantity={updateQuantity} onRemove={removeFromCart} onContinue={continueShopping} onCheckout={() => showNotice('Checkout is ready to connect to your store payment provider.')} onOpen={openProduct} />
        ) : (
          <WishlistPage favorites={favorites} onFavorite={toggleFavorite} onMove={(product) => { addToBag(product); toggleFavorite(product.id); }} onOpen={openProduct} onContinue={continueShopping} />
        )}
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="wordmark footer-wordmark" href="#home">Abeauty<Flower2 size={16} strokeWidth={1.35} /></a>
            <p>Beauty begins with you.<br />Everything else is just a little extra.</p>
            <span className="footer-est">MADE WITH LOVE, ALWAYS. ✳</span>
          </div>
          <div className="footer-column"><p>THE GOOD STUFF</p><a href="#shop">Shop all</a><a href="#categories">Makeup</a><a href="#categories">Skincare</a><a href="#offers">Offers</a></div>
          <div className="footer-column"><p>HERE FOR YOU</p><a href="#our-story">Our story</a><a href="#newsletter">Get in touch</a><a href="#newsletter">FAQs</a></div>
          <a className="back-top" href="#home" aria-label="Back to top"><ArrowDown size={16} /> BACK TO TOP</a>
        </div>
        <div className="footer-bottom"><span>© 2025 ABEAUTY STUDIO</span><span>MADE FOR YOUR SKIN, AND YOURSELF.</span><div><a href="/photo-credits.html">PHOTO CREDITS</a><a href="#newsletter">PRIVACY</a><a href="#newsletter">TERMS</a></div></div>
      </footer>

      {notice && <div className="toast" role="status"><Check size={16} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={15} /></button></div>}
    </div>
  );
}
