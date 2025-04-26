import ReactDOM from 'react-dom/client';
import Loading from './loading';

let count = 0;
export const showLoading = () => {
    if (count === 0) {
        const loadingDiv = document.createElement('div');
        loadingDiv.setAttribute('id', 'loading');
        document.body.appendChild(loadingDiv);

        ReactDOM.createRoot(loadingDiv).render(<Loading />);
    }
    count++;
};

export const hideLoading = () => {
    if (count < 0) return;
    count--;
    if (count === 0) {
        document.body.removeChild(document.getElementById('loading')!);
    }
};
