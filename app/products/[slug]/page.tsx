import { redirect } from "next/navigation";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailRedirectPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  redirect(`/ar/products/${slug}`);
}
