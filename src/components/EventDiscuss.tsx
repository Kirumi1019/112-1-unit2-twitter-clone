import Link from "next/link";

//import { MessageCircle, Repeat2, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getAvatar } from "@/lib/utils";

//import LikeButton from "./LikeButton";
import TimeText from "./TimeText";

type EventDiscussProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
 // likes: number;
  createdAt: Date;
 // liked?: boolean;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function EventDiscuss({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  content,
  createdAt,
}: EventDiscussProps) {
  return (
    <>
      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAvatar(authorName)}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <article className="flex grow flex-col">
            <p className="font-bold">
              {authorName}
              <span className="ml-2 font-normal text-gray-400">
                @{authorHandle}
              </span>
              <time className="ml-2 font-normal text-gray-400">
                <TimeText date={createdAt} format="h:mm A · D MMM YYYY" />
              </time>
            </p>
            {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
            <article className="mt-2 whitespace-pre-wrap">{content}</article>
            <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
            </div>
          </article>
        </div>
      </Link>
      <Separator />
    </>
  );
}
