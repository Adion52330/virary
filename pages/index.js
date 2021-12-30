import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Virary - Best Virtual Library</title>
        <link rel="icon" href="/virary2.png" />
        <meta
          name="description"
          content="Bookworm like me? Want to take note of each book you read for free? Virary is the answer. Store all your books into your account anywhere and anytime. Access them anytime, anywhere. Virary is the best virtual library. Store them easily via ISBN or use custom add."
        />
      </Head>

      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
