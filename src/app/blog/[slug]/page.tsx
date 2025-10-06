"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { useBlogLoading } from "@/lib/loading-context";
import {
  getBlogPost,
  getBlogPosts,
  getStrapiMediaURL,
  type BlogPost,
} from "@/lib/strapi";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const { loading, setLoading } = useBlogLoading();

  const loadPost = useCallback(async () => {
    try {
      setLoading(true);

      // Check if slug is 'null' and redirect to blog list
      if (slug === "null" || !slug) {
        router.push("/blog");
        return;
      }

      const response = await getBlogPost(slug);

      if (response.data && response.data.length > 0) {
        const currentPost = response.data[0];
        setPost(currentPost);

        // Load related posts from same category
        if (currentPost.category?.slug) {
          const relatedResponse = await getBlogPosts({
            category: currentPost.category.slug,
            pageSize: 3,
          });

          // Filter out current post
          const filtered = relatedResponse.data.filter(
            (p) => p.id !== currentPost.id
          );
          setRelatedPosts(filtered.slice(0, 3));
        }
      } else {
        // Post not found
        router.push("/blog");
      }
    } catch (error) {
      console.error("Failed to load blog post:", error);
      router.push("/blog");
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug, loadPost]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderContent = (blocks: unknown[]) => {
    if (!blocks || blocks.length === 0) {
      return (
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">
            Content for this article is being prepared. Please check back later.
          </p>
        </div>
      );
    }

    return (
      <div className="prose prose-lg max-w-none">
        {blocks.map((block, index) => {
          const blockObj = block as {
            __component: string;
            id?: number;
            body?: string;
            title?: string;
            file?: { url: string; alternativeText?: string; caption?: string };
          };
          const blockKey = `${blockObj.__component}-${blockObj.id ?? index}`;
          switch (blockObj.__component) {
            case "shared.rich-text":
              // Check if body contains markdown syntax
              const body = blockObj.body ?? "";
              const hasMarkdown =
                /^#{1,6}\s|^\*\*|^\*[^*]|^\-\s|^\d+\.\s|^\>\s|^\`|^\??\*\*.*\*\*|\*.*\*|\[.*\]\(.*\)/.test(
                  body.trim()
                );

              if (hasMarkdown) {
                return (
                  <MarkdownContent
                    key={blockKey}
                    content={body}
                    className="mb-6"
                  />
                );
              } else {
                return (
                  <div
                    key={blockKey}
                    dangerouslySetInnerHTML={{ __html: body }}
                    className="mb-6"
                  />
                );
              }
            case "shared.quote":
              return (
                <blockquote
                  key={blockKey}
                  className="border-l-4 border-primary pl-6 my-8 italic text-lg"
                >
                  <p>&ldquo;{blockObj.title}&rdquo;</p>
                  {blockObj.body && (
                    <cite className="text-sm text-muted-foreground">
                      — {blockObj.body}
                    </cite>
                  )}
                </blockquote>
              );
            case "shared.media":
              const mediaUrl = getStrapiMediaURL(blockObj.file);
              if (!mediaUrl) {
                return null;
              }
              return (
                <div key={blockKey} className="my-8">
                  <Image
                    src={mediaUrl}
                    alt={blockObj.file?.alternativeText ?? ""}
                    width={800}
                    height={400}
                    className="w-full rounded-lg"
                  />
                  {blockObj.file?.caption && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      {blockObj.file.caption}
                    </p>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-4xl py-16">
          <div className="animate-pulse">
            <div className="w-32 h-10 bg-muted rounded mb-8" />
            <div className="w-full h-64 bg-muted rounded mb-8" />
            <div className="w-3/4 h-8 bg-muted rounded mb-4" />
            <div className="w-1/2 h-4 bg-muted rounded mb-8" />
            <div className="space-y-4">
              <div className="w-full h-4 bg-muted rounded" />
              <div className="w-full h-4 bg-muted rounded" />
              <div className="w-3/4 h-4 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Button onClick={() => router.push("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/blog")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Featured Image */}
        {post.cover && getStrapiMediaURL(post.cover) && (
          <div className="aspect-video overflow-hidden rounded-lg mb-8 relative">
            <Image
              src={getStrapiMediaURL(post.cover)!}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {post.category && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {post.category.name}
            </Badge>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.reading_time ?? 5} min read</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-foreground leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-4 mb-12 p-6 bg-muted/50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  post.author.avatar
                    ? getStrapiMediaURL(post.author.avatar) ?? undefined
                    : undefined
                }
                alt={post.author.name}
              />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">
                {post.author.name}
              </h3>
              {post.author.bio && (
                <p className="text-sm text-muted-foreground">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mb-16">{renderContent(post.blocks ?? [])}</div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t pt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="bg-card shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                >
                  {relatedPost.cover &&
                    getStrapiMediaURL(relatedPost.cover) && (
                      <div className="aspect-video overflow-hidden relative">
                        <Image
                          src={getStrapiMediaURL(relatedPost.cover)!}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  <CardHeader className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt ?? relatedPost.description}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 mt-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get personalized guidance and support for your study abroad
            application process
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/onboarding")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold px-8 py-4"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
