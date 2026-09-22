import {
  ArrowUpRight,
  Bell,
  Home,
  Search,
  ShoppingBag,
  Heart,
  Grid2X2,
} from 'lucide-react';
export function PhoneMockup({ variant = 'purple' }: { variant?: string }) {
  return (
    <div
      className={`phone ${variant}`}
      aria-label="Illustrative mobile app interface, not a project screenshot"
      role="img"
    >
      <div className="phone-status">
        <span>9:41</span>
        <span>▮▮▮ ▰</span>
      </div>
      <div className="island" />
      <div className="phone-body">
        <div className="phone-top">
          <div className="mini-brand">
            n<span>.</span>
          </div>
          <Bell size={16} />
        </div>
        <p className="phone-greeting">A little discovery. A lot to love.</p>
        <h3>
          Find your
          <br />
          next favorite<span>.</span>
        </h3>
        <div className="phone-search">
          <Search size={13} /> What are you looking for?
        </div>
        <div className="phone-promo">
          <span>CURATED FOR YOU</span>
          <strong>
            Everyday things.
            <br />
            Extraordinary finds.
          </strong>
          <div>
            Explore collection <ArrowUpRight size={13} />
          </div>
          <div className="orb" />
        </div>
        <div className="phone-row">
          <b>Popular this week</b>
          <span>See all</span>
        </div>
        <div className="phone-products">
          <div>
            <div className="product-art">
              <ShoppingBag size={45} />
            </div>
            <b>The everyday tote</b>
            <span>Made for your everyday</span>
          </div>
          <div>
            <div className="product-art second">
              <HeadphonesArt />
            </div>
            <b>Sound, reimagined</b>
            <span>Your world. Your rhythm.</span>
          </div>
        </div>
        <div className="phone-nav">
          <Home size={18} />
          <Grid2X2 size={18} />
          <Heart size={18} />
          <ShoppingBag size={18} />
        </div>
      </div>
    </div>
  );
}
function HeadphonesArt() {
  return (
    <svg
      width="52"
      height="58"
      viewBox="0 0 52 58"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 35V25a17 17 0 0134 0v10"
        stroke="currentColor"
        strokeWidth="6"
      />
      <rect x="5" y="29" width="10" height="20" rx="5" fill="currentColor" />
      <rect x="37" y="29" width="10" height="20" rx="5" fill="currentColor" />
    </svg>
  );
}
