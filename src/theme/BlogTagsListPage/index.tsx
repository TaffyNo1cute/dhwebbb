import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import TagsListByLetter from '@theme/TagsListByLetter';
import type {Props} from '@theme/BlogTagsListPage';
import SearchMetadata from '@theme/SearchMetadata';
import Heading from '@theme/Heading';

export default function BlogTagsListPage({tags, sidebar}: Props): ReactNode {
  const title = translateTagsPageTitle();
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout sidebar={sidebar}>
        <Heading as="h1">标签</Heading>
        <p style={{marginBottom: '2rem', color: 'var(--ifm-color-emphasis-700)'}}>
          按拼音首字母分类的所有标签
        </p>
        <TagsListByLetter tags={tags} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
