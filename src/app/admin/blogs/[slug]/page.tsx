import BlogEditor from "@/components/admin/BlogEditor";

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  return <BlogEditor slug={params.slug} />;
}
