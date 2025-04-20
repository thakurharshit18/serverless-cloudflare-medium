export default function Quote({ type }: { type: "signin" | "signup" }) {
  const quote =
    type === "signin"
      ? "The customer support I received was exceptional. The support team went above and beyond to address my concerns."
      : "Joining this platform has transformed the way I work. The features are amazing and easy to use!";

  const author = type === "signin" ? "Julies Winfield" : "Amanda Grey";
  const position =
    type === "signin" ? "CEO | Acme Corp" : "Product Designer | Pixel Inc";

  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="flex flex-col items-start text-left gap-4 max-w-lg">
        <div className="text-3xl font-bold">"{quote}"</div>
        <div className="text-xl font-semibold">{author}</div>
        <div className="text-xl font-semibold">{position}</div>
      </div>
    </div>
  );
}
