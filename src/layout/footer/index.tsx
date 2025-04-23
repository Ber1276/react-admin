import styles from './index.module.less';
const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div>
                <a>管理平台</a>
            </div>
            <div>Copyright All Rights Reserved.</div>
        </div>
    );
};

export default Footer;
