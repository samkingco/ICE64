import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { PhotoDetail } from "../../components/PhotoDetail";
import { allIds, getOriginalId } from "../../utils/tokenIds";

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<{
  id: number;
}> = async (context) => {
  const { id: idParam } = context.params as Params;
  const id = allIds.find((i) => `${i}` === idParam) || 1;
  return { props: { id } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allIds.map((id) => ({
    params: { id: `${id}` },
  }));
  return { paths, fallback: false };
};

export default function ID(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <PhotoDetail key={getOriginalId(props.id)} {...props} closeHref="/" />;
}
