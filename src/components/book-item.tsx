import Link from 'next/link';
import { BookData } from '@/types/types';
import style from './book-item.module.css';

type BookItemProps = Pick<
  BookData,
  'id' | 'title' | 'subTitle' | 'author' | 'publisher' | 'coverImgUrl'
>;

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookItemProps) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <img src={coverImgUrl} alt={title} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
