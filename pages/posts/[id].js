import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

// pages/posts/first-post.js
// import Link from "next/link";
// import Head from "next/head";
// import Script from "next/script";
// import Layout from "../../components/layout";

// export default function FirstPost() {
//   return (
//     <Layout>
//       <Head>
//         <title>First Post</title>
//         <Script
//           src="https://connect.facebook.net/en_US/sdk.js"
//           strategy="lazyOnload"
//           onLoad={() =>
//             console.log(`script loaded correctly, window.FB has been populated`)
//           }
//         />
//       </Head>
//       <h1>First Post</h1>
//       <h2>
//         <Link href="/">
//           <a>Back to home</a>
//         </Link>
//       </h2>
//     </Layout>
//   );
// }
