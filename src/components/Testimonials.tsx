'use client';

import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        quote: "Abhijat's technical expertise and innovative thinking made him an invaluable team member. His work on AI projects consistently exceeded expectations.",
        author: "Senior Engineer",
        role: "Team Lead, Wipro",
        avatar: "👨‍💼",
    },
    {
        id: 2,
        quote: "One of the most dedicated and passionate developers I've worked with. His hackathon projects showcase true innovation.",
        author: "Mentor",
        role: "Microsoft Learn Program",
        avatar: "👩‍🏫",
    },
    {
        id: 3,
        quote: "Abhijat's research contributions during his internship were exceptional. His understanding of ML concepts is remarkably deep.",
        author: "Research Supervisor",
        role: "IIT Kharagpur",
        avatar: "🧑‍🔬",
    },
];

export default function Testimonials() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>
                    What People <span className="text-gradient">Say</span>
                </h2>
                <p>Feedback from colleagues and mentors</p>
            </div>

            <div className={styles.grid}>
                {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className={styles.card}
                        style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                    >
                        {/* Quote mark */}
                        <span className={styles.quoteMark}>"</span>

                        {/* Quote text */}
                        <blockquote className={styles.quote}>
                            {testimonial.quote}
                        </blockquote>

                        {/* Author */}
                        <div className={styles.author}>
                            <span className={styles.avatar}>{testimonial.avatar}</span>
                            <div>
                                <span className={styles.name}>{testimonial.author}</span>
                                <span className={styles.role}>{testimonial.role}</span>
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className={styles.glow} />
                    </div>
                ))}
            </div>

            <p className={styles.note}>
                💡 Want to add your testimonial? <a href="#contact">Get in touch!</a>
            </p>
        </section>
    );
}
