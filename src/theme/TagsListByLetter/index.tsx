import React, {type ReactNode, useMemo} from 'react';
import Tag from '@theme/Tag';
import Heading from '@theme/Heading';
import type {Props} from '@theme/TagsListByLetter';
import pinyin from 'pinyin';

type TagItem = Props['tags'][number];

// 获取汉字的拼音首字母
function getPinyinFirstLetter(text: string): string {
  const pinyinArray = pinyin(text, {
    style: pinyin.STYLE_FIRST_LETTER, // 只返回首字母
  });
  
  if (pinyinArray.length > 0 && pinyinArray[0].length > 0) {
    const firstLetter = pinyinArray[0][0].toUpperCase();
    // 确保返回 A-Z 的字母
    if (/^[A-Z]$/.test(firstLetter)) {
      return firstLetter;
    }
  }
  return '#'; // 非字母开头的归为 #
}

type LetterEntry = {
  letter: string;
  tags: TagItem[];
};

// 按拼音首字母分组标签
function listTagsByPinyinLetters(tags: Props['tags']): LetterEntry[] {
  const groups: Record<string, TagItem[]> = {};
  
  tags.forEach((tag) => {
    const firstLetter = getPinyinFirstLetter(tag.label);
    
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(tag);
  });
  
  // 排序：A-Z，然后 #
  const sortedLetters = Object.keys(groups).sort((a, b) => {
    if (a === '#') return 1;
    if (b === '#') return -1;
    return a.localeCompare(b);
  });
  
  return sortedLetters.map(letter => ({
    letter,
    tags: groups[letter].sort((a, b) => a.label.localeCompare(b.label, 'zh-CN')),
  }));
}

function TagLetterEntryItem({letterEntry}: {letterEntry: LetterEntry}): ReactNode {
  return (
    <article>
      <Heading as="h2" id={letterEntry.letter}>
        {letterEntry.letter}
      </Heading>
      <ul className="padding--none" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '0.75rem',
        listStyle: 'none',
        marginBottom: '2rem',
      }}>
        {letterEntry.tags.map((tag) => (
          <li key={tag.permalink} style={{margin: 0}}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
      <hr style={{marginBottom: '2rem'}} />
    </article>
  );
}

export default function TagsListByLetter({tags}: Props): ReactNode {
  const letterList = useMemo(() => listTagsByPinyinLetters(tags), [tags]);
  
  return (
    <section className="margin-vert--lg">
      {letterList.map((letterEntry) => (
        <TagLetterEntryItem
          key={letterEntry.letter}
          letterEntry={letterEntry}
        />
      ))}
    </section>
  );
}
