import { Link } from "react-router-dom";
import styles from "./Project.module.scss";

const projects = [
  {
    appname: "GrooveandVibes Dance School",
    appLink: `https://grooveandvibes.com.au/`,
    paragraph: `Build with react using lastest css architecture and hosted in AWS. This is very basic app, yet it uses pretty much every such as Node Backend, MongoDB Database, CI/CD,AWS, and many more.`,

    images: ["/image/groove1.png", "/image/groove2.png", "/image/groove3.png"],
  },
];

const Project = () => {
  return (
    <>
      <h3 className={`${styles.headingSkills} ${styles.projectHeading}`}>
        Some of my projects
      </h3>
      <section className={styles.project} id="project">
        {projects.map((project) => (
          <div className={styles.projectFirst} key={project.appLink}>
            <div className={styles.firstInformation}>
              <div className={styles.projectButton}>
                <Link to={project.appLink} target="_blank" rel="noreferrer">
                  {project.appname}
                </Link>
              </div>
              <p>{project.paragraph}</p>
            </div>
            <div className={styles.firstPictures}>
              <img
                src={project.images[0]}
                alt={project.images[0]}
                className={`${styles.image} ${styles.image1}`}
              />
              <img
                src={project.images[1]}
                alt={project.images[1]}
                className={`${styles.image} ${styles.image2}`}
              />
              <img
                src={project.images[2]}
                alt={project.images[2]}
                className={`${styles.image} ${styles.image3}`}
              />
            </div>
          </div>
        ))}
        <h2>
          Please check my{" "}
          <Link to="https://github.com/moshibal?tab=repositories">
            Github Profile Page
          </Link>{" "}
          for more projects.
        </h2>
      </section>
    </>
  );
};

export default Project;
