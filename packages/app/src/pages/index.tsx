import Head from "next/head";
import { Cursor } from "../components/Cursor";

export default function Index() {
  return (
    <main>
      <Head>
        <title>ICE64</title>
      </Head>

      <Cursor text="ICE64" />
    </main>
  );
}
