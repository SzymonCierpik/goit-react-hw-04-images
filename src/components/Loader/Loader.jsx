import { Dna } from  'react-loader-spinner'
import styles from "./Loader.module.css"


const Loader = () => {
    return (
      <div className={styles.loader}>
        <Dna height="200" width="200"/>
      </div>
    );
}

export default Loader