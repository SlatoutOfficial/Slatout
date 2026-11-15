import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { BlogPost } from "../data/blogs";

export type AdminBlog = BlogPost & { published: boolean; updatedAt: string };
export type Lead = {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "qualified" | "closed";
  name: string;
  phone: string;
  email: string;
  role: string;
  business: string;
  city: string;
  what: string;
  team: string;
  stage: string;
  service: string[];
  message: string;
  reach: string;
};

type CmsData = { blogs: AdminBlog[]; leads: Lead[] };
const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "admin-content.json");

async function readStore(): Promise<CmsData> {
  try {
    const saved = JSON.parse(await readFile(dataFile, "utf8")) as Partial<CmsData>;
    return { blogs: Array.isArray(saved.blogs) ? saved.blogs : [], leads: Array.isArray(saved.leads) ? saved.leads : [] };
  } catch {
    return { blogs: [], leads: [] };
  }
}

async function writeStore(data: CmsData) {
  await mkdir(dataDir, { recursive: true });
  const pendingFile = `${dataFile}.${randomUUID()}.tmp`;
  await writeFile(pendingFile, JSON.stringify(data, null, 2), "utf8");
  await rename(pendingFile, dataFile);
}

export async function getAdminBlogs() {
  return (await readStore()).blogs.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getPublishedBlogs() {
  return (await readStore()).blogs.filter((blog) => blog.published).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveBlog(blog: Omit<AdminBlog, "updatedAt">) {
  const data = await readStore();
  const next = { ...blog, updatedAt: new Date().toISOString() };
  const index = data.blogs.findIndex((item) => item.slug === blog.slug);
  if (index === -1) data.blogs.unshift(next);
  else data.blogs[index] = next;
  await writeStore(data);
  return next;
}

export async function removeBlog(slug: string) {
  const data = await readStore();
  data.blogs = data.blogs.filter((blog) => blog.slug !== slug);
  await writeStore(data);
}

export async function getLeads() {
  return (await readStore()).leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveLead(fields: Omit<Lead, "id" | "createdAt" | "status">) {
  const data = await readStore();
  const lead: Lead = { ...fields, id: randomUUID(), createdAt: new Date().toISOString(), status: "new" };
  data.leads.unshift(lead);
  await writeStore(data);
  return lead;
}

export async function updateLead(id: string, status: Lead["status"]) {
  const data = await readStore();
  const lead = data.leads.find((item) => item.id === id);
  if (!lead) return null;
  lead.status = status;
  await writeStore(data);
  return lead;
}
