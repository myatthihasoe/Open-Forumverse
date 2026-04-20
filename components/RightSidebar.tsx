import Link from "next/link";
import {
  FaLaravel,
  FaNode,
  FaPython,
  FaQuestionCircle,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";

export default function RightSidebar() {
  return (
    <div className="p-5">
      <div>
        <h1 className="text-xl font-bold">Popular Discussions</h1>
        <div className="space-y-3 mt-2 p-2">
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl">
              <FaQuestionCircle />
            </span>
            <span className="line-clamp-2 text-sm">
              <Link href="/?filter=nextJs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus officiis vel vero, itaque error, quae neque eos id
                ex exercitationem vitae explicabo molestias eveniet quod natus
                aut veritatis non repellat.
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer space-y-3">
            <span className="text-xl">
              <FaQuestionCircle />
            </span>
            <span className="line-clamp-2 text-sm">
              <Link href="/?filter=nextJs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus officiis vel vero, itaque error, quae neque eos id
                ex exercitationem vitae explicabo molestias eveniet quod natus
                aut veritatis non repellat.
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer space-y-3">
            <span className="text-xl">
              <FaQuestionCircle />
            </span>
            <span className="line-clamp-2 text-sm">
              <Link href="/?filter=nextJs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus officiis vel vero, itaque error, quae neque eos id
                ex exercitationem vitae explicabo molestias eveniet quod natus
                aut veritatis non repellat.
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer space-y-3">
            <span className="text-xl">
              <FaQuestionCircle />
            </span>
            <span className="line-clamp-2 text-sm">
              <Link href="/?filter=nextJs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus officiis vel vero, itaque error, quae neque eos id
                ex exercitationem vitae explicabo molestias eveniet quod natus
                aut veritatis non repellat.
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer space-y-3">
            <span className="text-xl">
              <FaQuestionCircle />
            </span>
            <span className="line-clamp-2 text-sm">
              <Link href="/?filter=nextJs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus officiis vel vero, itaque error, quae neque eos id
                ex exercitationem vitae explicabo molestias eveniet quod natus
                aut veritatis non repellat.
              </Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer space-y-3">
            <span className="text-xl">
              <FaQuestionCircle />
            </span>
            <span className="line-clamp-2 text-sm">
              <Link href="/?filter=nextJs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus officiis vel vero, itaque error, quae neque eos id
                ex exercitationem vitae explicabo molestias eveniet quod natus
                aut veritatis non repellat.
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold">Popular Tags</h1>
        <div className="space-y-3 mt-2 p-2">
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl text-[#61DAFB]">
              <FaReact />
            </span>
            <span className="line-clamp-2 text-[16px]">
              <Link href="/?filter=react">React</Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl text-white">
              <RiNextjsFill />
            </span>
            <span className="line-clamp-2 text-[16px]">
              <Link href="/?filter=nextjs">NextJs</Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl text-[#4FC08D]">
              <FaVuejs />
            </span>
            <span className="line-clamp-2 text-[16px]">
              <Link href="/?filter=vue">Vue</Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl text-[#FF2D20]">
              <FaLaravel />
            </span>
            <span className="line-clamp-2 text-[16px]">
              <Link href="/?filter=laravel">Laravel</Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl text-[#3776AB]">
              <FaPython />
            </span>
            <span className="line-clamp-2 text-[16px]">
              <Link href="/?filter=python">Python</Link>
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl text-[#339933]">
              <FaNode />
            </span>
            <span className="line-clamp-2 text-[16px]">
              <Link href="/?filter=node">NodeJs</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
