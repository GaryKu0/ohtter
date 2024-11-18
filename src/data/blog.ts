// src/data/blog.ts
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import * as cheerio from 'cheerio';

export type BlogPost = {
  slug: string;
  content: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
    image?: string;
  };
  headings: {
    id: string;
    text: string;
    level: number;
  }[];
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function getMDXFiles() {
  return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(rawContent);

  const htmlContent = processedContent.toString();

  // Extract headings using cheerio
  const headings = extractHeadings(htmlContent);

  return {
    slug,
    content: htmlContent,
    metadata: metadata as BlogPost["metadata"],
    headings,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = getMDXFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const post = await getPost(slug);
      return post!;
    })
  );
  return posts.filter(Boolean);
}

// Function to extract headings from the HTML content
function extractHeadings(htmlContent: string) {
  const headings = [];
  const $ = cheerio.load(htmlContent);
  $("h1, h2, h3").each((_, elem) => {
    const id = $(elem).attr("id") || "";
    const text = $(elem).text();
    const level = parseInt(elem.tagName.replace("h", ""), 10);
    headings.push({ id, text, level });
  });
  return headings;
}