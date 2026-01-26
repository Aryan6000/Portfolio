const Testimonials = ({ testimonials, currentTestimonial, onSetCurrentTestimonial }) => {
    return (
        <section className="testimonials">
            <h2 className="section-title">Client Success Stories</h2>
            <div className="testimonial-slider">
                {testimonials.map((testimonial, index) => (
                    <div className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`} key={index}>
                        <p className="testimonial-text">"{testimonial.text}"</p>
                        <p className="testimonial-author">{testimonial.author}</p>
                    </div>
                ))}
            </div>
            <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                    <span
                        className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                        key={index}
                        onClick={() => onSetCurrentTestimonial(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
}
