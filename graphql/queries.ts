import { gql } from "@apollo/client";

export const cmsPostList = gql`
  query PostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      totalCount
      posts {
        _id
        title
        slug
        type
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        thumbnail {
          url
        }
        categories {
          _id
          name
          slug
        }
        images {
          url
          type
          name
        }
        customFieldsData
        customFieldsMap
      }
    }
  }
`;

export const cmsPostDetail = gql`
  query PostDetail($slug: String, $id: String) {
    cpPost(slug: $slug, _id: $id) {
      _id
      title
      slug
      type
      content
      excerpt
      featured
      status
      createdAt
      updatedAt
      thumbnail {
        url
      }
      categories {
        _id
        name
        slug
      }
      images {
        url
        type
        name
      }
      customFieldsData
      customFieldsMap
    }
  }
`;

export const cmsCategories = gql`
  query CmsCategories {
    cpCategories {
      list {
        _id
        name
        slug
        parentId
      }
    }
  }
`;
