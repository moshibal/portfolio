import styles from "./Modal.module.scss";
const Modal = (props: any) => {
  return (
    <div className={styles.modalMain}>
      <div className={styles.vedioFormModal}>
        <video src="/image/formVedio.mp4" autoPlay={true} width="100%" />
      </div>
      <div className={styles.modelTextarea}>
        <p className={styles.firstPara}>
          First of all, thank you for visiting this page. This shows that you
          want to know more about me which I highly appreciate.
        </p>
        <p className={styles.secondPara}>
          This is Bishal Karki from Nepal with a bachelor’s degree in
          information technology from Federation University. I can here at the
          end of 2015 and finish my bachelor at the end of 2018. I started
          getting passionate about software engineer in late 2020. And ever
          since, I’m trying to learn and become better version of myself even
          though I quit few times in the middle thinking I could not do it.
          However, I’m back with strong mindset and never giving up attitude.
        </p>
        <p>
          You probably know pretty much about my programming skills from this
          website where you can visit to some of my projects.so, I would like to
          talk more about myself which is not included here. I’m also a
          professional butcher with almost 5 years of experience and I’m very
          fortunate about this because it’s been very nice place to work and
          more importantly, this job taught me a lot about life and made me
          independent person. Besides Working, I love going to gym, listening to
          musics, watching videos, cooking foods and off course doing household
          chores.
        </p>
        <button className={styles.modalButton} onClick={props.onShowModal}>
          close
        </button>
      </div>
    </div>
  );
};

export default Modal;
