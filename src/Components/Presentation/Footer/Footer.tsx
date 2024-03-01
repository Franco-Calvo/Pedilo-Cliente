import Image from "next/image";
import logoFooter from "../../Images/logoBlanco.png";
import { Facebook, Instagram } from "../Icons/Icons";
import styles from "./Footer.module.css";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className={styles.footer}>
      <h3>Ordena. Paga. Disfruta.</h3>
      <p>
        Nuestra webapp transforma la experiencia de tus clientes, haciendo que
        cada momento sea más fluido y placentero. Únete a la revolución digital
        del servicio.
      </p>
      <button>👋Contactar</button>
      <hr className={styles.hrBottom} />
      <div className={styles.footerBottom}>
        <Image width={150} src={logoFooter} alt="logoFooter" priority={true} />
        <div>&copy;Pedilo, todos los derechos reservados.</div>

        <span className={styles.socials}>
          <div className={styles.containerSocial}>
            <Instagram />
          </div>
          <div className={styles.containerSocial}>
            <Facebook />
          </div>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
