import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  description?: string;
  socialImage?: string;
}

export default function SocialMeta({
  title = "ICE64",
  description = "ICE64 is a series of 16 photographs by Sam King, documenting the desolate landscape of Iceland during the winter, enduring harsh yet beautiful conditions.",
  socialImage,
}: Props) {
  const router = useRouter();
  const baseUrl = `https://${
    process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
  }`;
  const url = `${baseUrl}${router.asPath}`;
  const ogImage = socialImage || `${baseUrl}/og-image.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@samkingco" />
    </Head>
  );
}
