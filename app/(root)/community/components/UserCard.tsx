import Image from "next/image";
import Link from "next/link";
import profile from "@/public/images/profile.jpg";
import ROUTES from "@/routes";

function UserCard({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image?: string;
}) {
  return (
    <div>
      <Link
        href={ROUTES.PROFILE(id)}
        className="flex flex-col items-center justify-center bg-tertiary p-2 rounded-xl"
      >
        {image ? (
          <Image alt={name} width={100} height={100} src={image} />
        ) : (
          <div className="w-25 h-25 flex items-center bg-tertiary">
            <Image alt={name} width={100} height={100} src={profile} />
          </div>
        )}
      </Link>
      <p className="text-center my-2">{name}</p>
    </div>
  );
}

export default UserCard;
