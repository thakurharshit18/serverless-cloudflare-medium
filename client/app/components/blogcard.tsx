interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
}

export default function Blogcard({
  authorname,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <div>
      <div>
        {authorname} . {publishedDate}
      </div>
      <div>{title}</div>
      <div>{content.slice(0, 100) + "..."}</div>
      <div>{`${Math.ceil(content.length / 100)}minutes`}</div>
    </div>
  );
}
