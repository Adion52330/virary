import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/virary2.png" />
      </Head>

      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
