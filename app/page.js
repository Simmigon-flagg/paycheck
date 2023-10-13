import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  const start = 55.5;
  const end = start + 10;
  const step = 1;

  const dollarAmount = Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) => start + (i * step));

  console.log(dollarAmount);

  const calculateTax = (income) => {
    let tax = 0;

    if (income <= 9950) {
      tax = income * 0.10;
    } else if (income <= 40525) {
      tax = 995 + (income - 9950) * 0.12;
    } else if (income <= 86375) {
      tax = 4667.5 + (income - 40525) * 0.22;
    } else if (income <= 164925) {
      tax = 14751 + (income - 86375) * 0.24;
    } else if (income <= 209425) {
      tax = 33603 + (income - 164925) * 0.32;
    } else if (income <= 523600) {
      tax = 47843 + (income - 209425) * 0.35;
    } else {
      tax = 157804.25 + (income - 523600) * 0.37;
    }

    return tax;
  };

  // Example usage:
  const income = 200000;
  const taxOwed = calculateTax(income);
  console.log(`Tax owed for income of`);
  console.log(income);  
  console.log(taxOwed);
  console.log(income - taxOwed);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        {dollarAmount.map((amount) =>
          <ul>
            
            {amount} = <br /><br />
            {amount * 40}/wk,<br /><br />
            {amount * 80}/wks,<br /><br />
            Year {amount * 40 * 52}{ ' ' }<br /><br />
            {calculateTax(amount * 40 * 52)}tax
            <br />
            <br />
            {(amount * 40 * 52) - calculateTax(amount * 40 * 52)}<br /> {' '}
          </ul>)}
      </div>

      <div className={styles.grid}>
        <p

        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </p>

        <p

        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>

          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>


        </p>

        <p

        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </p>

        <p

        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </p>
      </div>
    </main>
  )
}
