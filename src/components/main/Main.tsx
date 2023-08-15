import React, { useEffect, useRef } from "react";
import styles from "./Main.module.scss";
const Main = () => {
  const sectionRefs = useRef<HTMLElement[]>([]); // Add type annotation

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Add type annotation
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.section1);
          entry.target.classList.add(styles.section2);
          entry.target.classList.add(styles.section3);
        } else {
          entry.target.classList.remove(styles.section1);
          entry.target.classList.remove(styles.section2);
          entry.target.classList.remove(styles.section3);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className={styles.mainMain} id="skill">
      <h2 className={styles.headingSkills}>Full-Stack skills</h2>
      <main className={styles.skillMain}>
        <section
          className={styles.section1}
          ref={(el) => (sectionRefs.current[0] = el!)}
        >
          <h2>Front End languages</h2>
          <div className={styles.listOfSkills}>
            <h3>HTML5</h3>
            <h3>CSS3</h3>
            <h3>Javascript</h3>
            <h3>UI/UX Design</h3>
            <h3>Chrome DevTools </h3>
            <h3>Bootstrap, Tailwind</h3>
          </div>
        </section>
        <section
          className={styles.section2}
          ref={(el) => (sectionRefs.current[1] = el!)}
        >
          <h2>Back End languages</h2>
          <div className={styles.listOfSkills}>
            <h3>Python</h3>
            <h3>Node.js</h3>
            <h3>MongoDB,Mongoose,SQL</h3>
            <h3>The Unix Command Line</h3>
          </div>
        </section>
        <section
          className={styles.section3}
          ref={(el) => (sectionRefs.current[2] = el!)}
        >
          <h2>Frameworks and Tools</h2>
          <div className={styles.listOfSkills}>
            <h3>React.js</h3>
            <h3>Express.js</h3>
            <h3>CI/CD using github actions</h3>
            <h3>Git, Github and Version Control</h3>
            <h3>AWS and other hosting platforms</h3>
            <h3>Testing- Unit, Integration, Automated</h3>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
