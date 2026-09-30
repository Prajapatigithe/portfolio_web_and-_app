import { Quote } from 'lucide-react';
import { testimonials, type Testimonial } from '../../data/site';
export function Testimonials({
  items = testimonials,
}: {
  items?: Testimonial[];
}) {
  if (!items.length) return null;
  return (
    <section id="testimonials" className="section container">
      <p className="eyebrow">CLIENT FEEDBACK</p>
      <h2>In their words.</h2>
      <div className="client-grid">
        {items.map((item, index) => (
          <figure className="testimonial-card" key={`${item.name}-${index}`}>
            <Quote size={24} />
            <blockquote>{item.quote}</blockquote>
            <figcaption className="testimonial-person">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  width="48"
                  height="48"
                  loading="lazy"
                />
              )}
              <div>
                <b>{item.name}</b>
                <p>{[item.role, item.company].filter(Boolean).join(' · ')}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
