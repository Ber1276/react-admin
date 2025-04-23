
import styles from "./index.module.less"
export default function Welcome() {

    return (
        <>
            <div className={styles.welcome}>
                <div className={styles.subtitle}>欢迎使用</div>
                <div className={styles.title}>管理平台</div>
                <div className={styles.desc}>react19+zustand+antd+typescript</div>
                <div className={styles.img}></div>
            </div>
        </>
    )
}