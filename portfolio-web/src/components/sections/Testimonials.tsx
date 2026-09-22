import { Quote } from 'lucide-react';
export function Testimonials() {
  return (
    <section id="testimonials" className="section container testimonials">
      <div>
        <p className="eyebrow">BUILT ON TRUST</p>
        <h2>
          Great work.
          <br />
          <span>Real relationships.</span>
        </h2>
        <p>
          Client feedback will appear here as verified testimonials become
          available.
        </p>
      </div>
      <div className="testimonial-card">
        <Quote size={29} />
        <span className="example-label">
          EXAMPLE ONLY · NOT A CLIENT REVIEW
        </span>
        <blockquote>
          “This space is reserved for a client’s experience — from the first
          conversation to the final release.”
        </blockquote>
        <div className="testimonial-person">
          <span>?</span>
          <div>
            <b>Your future success story</b>
            <p>Client name &amp; company · placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
