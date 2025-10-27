import { ReactNode, useState } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// import fetchBooks from '@/lib/fetch-books';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BookData } from '@/types/types';
import fetchBooks from '@/lib/fetch-books';

// search page를 SSG방식으로 할려면 build시에 query가 없기때문에 불가능하지만
// 그래도 SSG 방식을 구현하고 싶으면 아래와 같이 구현함.
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q as string;
//   const books = await fetchBooks(q as string || undefined);
//   return {
//     props: {
//       books,
//     },
//   };
// };

export default function Search() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      //검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
