// Image অপ্টিমাইজেশনের জন্য Next.js Image component ব্যবহার করুন
import Image from "next/image";

export default function ProductImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={200}
      className="rounded-lg"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
