import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Home.module.css'; // Assuming you create a CSS module for styles

export default function Home() {
    const [bin, setBin] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        const res = await fetch(`/api/bin-check?bin=${bin}`);
        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            setResult(data);
        } else {
            setError(data.error);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={bin}
                    onChange={(e) => setBin(e.target.value)}
                    placeholder="Enter BIN"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Check BIN</button>
            </form>
            {loading && <p className={styles.loading}>Loading...</p>}
            {result && (
                <div className={styles.resultCard}>
                    <h2 className={styles.resultTitle}>BIN Information</h2>
                    <p className={styles.bankName}>Bank: <strong>{result.bank.name || 'Unknown'}</strong></p>
                    <p className={styles.cardType}>Card Type: <strong>{result.type}</strong></p>
                    <p className={styles.country}>Country: <strong>{result.country.name}</strong></p>
                    <p className={styles.scheme}>Scheme: <strong>{result.scheme}</strong></p>
                    <p className={styles.luhn}>Luhn Valid: <strong>{result.number.luhn ? 'Yes' : 'No'}</strong></p>
                </div>
            )}
            {error && <p className={styles.error}>{error}</p>}
            <Footer />
        </div>
    );
}
