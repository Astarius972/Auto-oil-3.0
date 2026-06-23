import type { NewsListItem } from "@/app/components/cards/news-list-view";
import { resolveCmsImageUrl } from "@/lib/cms-image";
import { cmsPostDetail, cmsPostList } from "@/graphql/queries";
import { apolloClient } from "@/lib/apollo-client";
import type { CmsSectionFilter } from "@/lib/cms-config";

import type {
  CmsCustomField,
  CmsCustomFieldsMap,
} from "@/lib/cms-custom-fields";

export type CmsPost = {
  _id: string;
  title: string;
  slug?: string | null;
  type?: string | null;
  content?: string | null;
  excerpt?: string | null;
  thumbnail?: { url?: string | null } | null;
  images?: Array<{ url?: string | null; name?: string | null; type?: string | null }> | null;
  customFieldsData?: CmsCustomField[] | string | null;
  customFieldsMap?: CmsCustomFieldsMap | null;
};

type CmsPostListData = {
  cpPostList?: {
    posts?: CmsPost[];
  };
};

type CmsPostDetailData = {
  cpPost?: CmsPost | null;
};

export function mapCmsPostToNewsItem(post: CmsPost): NewsListItem {
  const imageUrl = resolveCmsImageUrl(
    post.thumbnail?.url ?? post.images?.[0]?.url,
  );

  return {
    id: post._id,
    title: post.title,
    excerpt: post.excerpt ?? "",
    imageUrl,
    fullContent: post.content ?? post.excerpt ?? "",
    isHtml: Boolean(post.content),
  };
}

export async function fetchCmsPostsRaw(
  filter: CmsSectionFilter,
): Promise<CmsPost[]> {
  try {
    const variables: Record<string, unknown> = {
      status: "published",
      sortField: "createdAt",
      sortDirection: "desc",
    };

    if (filter.type) variables.type = filter.type;
    if (filter.categoryIds?.length) variables.categoryIds = filter.categoryIds;
    if (filter.slug) variables.searchValue = filter.slug;

    const { data } = await apolloClient.query<CmsPostListData>({
      query: cmsPostList,
      variables,
      fetchPolicy: "no-cache",
    });

    let posts = data?.cpPostList?.posts ?? [];

    if (filter.slug) {
      posts = posts.filter((post) => post.slug === filter.slug);
    }

    return posts;
  } catch (error) {
    console.error("Failed to fetch CMS posts:", error);
    return [];
  }
}

export async function fetchCmsPostById(id: string): Promise<CmsPost | null> {
  try {
    const { data } = await apolloClient.query<CmsPostDetailData>({
      query: cmsPostDetail,
      variables: { id },
      fetchPolicy: "no-cache",
    });

    return data?.cpPost ?? null;
  } catch (error) {
    console.error("Failed to fetch CMS post by id:", error);
    return null;
  }
}

export async function fetchCmsPostByType(
  type: string,
): Promise<CmsPost | null> {
  const posts = await fetchCmsPostsRaw({ type });
  return posts[0] ?? null;
}

export async function fetchCmsPost(
  filter: CmsSectionFilter,
): Promise<CmsPost | null> {
  try {
    if (filter.postId) {
      const post = await fetchCmsPostById(filter.postId);
      if (post) return post;
    }

    if (filter.slug) {
      const { data } = await apolloClient.query<CmsPostDetailData>({
        query: cmsPostDetail,
        variables: { slug: filter.slug },
        fetchPolicy: "no-cache",
      });

      if (data?.cpPost) {
        if (filter.type && data.cpPost.type && data.cpPost.type !== filter.type) {
          return null;
        }
        return data.cpPost;
      }

      const posts = await fetchCmsPostsRaw({
        type: filter.type,
        slug: filter.slug,
      });
      return posts[0] ?? null;
    }

    if (filter.type) {
      const posts = await fetchCmsPostsRaw({ type: filter.type });
      if (posts.length > 0) return posts[0];
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch CMS post:", error);
    return null;
  }
}

export async function fetchCmsPosts(
  filter: CmsSectionFilter,
): Promise<NewsListItem[]> {
  const posts = await fetchCmsPostsRaw(filter);
  return posts.map(mapCmsPostToNewsItem);
}
