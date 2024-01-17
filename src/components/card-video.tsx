import React from "react";
import { TwitchVideo } from "@/shared/api/types";
import { formatCreatedAt } from "@/shared/lib/data-forma";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import DialogIframe from "./dialog-iframe";
import { Badge } from "./ui/badge";

type Props = {
  video: TwitchVideo;
  type: "offline" | "stream" | "clips";
};

const CardVideo = ({ video, type }: Props) => {
  const online = type === "stream";
  return (
    <DialogIframe
      name={online ? video?.user_name : video?.id}
      key={video.id}
      type={type}
      url={video?.embed_url}
    >
      <div className="relative mb-1 h-full w-full cursor-pointer rounded-sm px-4">
        <span className="relative box-border block overflow-hidden opacity-100">
          <img
            className="rounded-xl align-middle opacity-95 brightness-75 duration-500 ease-in-out"
            src={
              online
                ? video?.thumbnail_url
                    .replace("{width}", "320")
                    .replace("{height}", "180")
                : video?.thumbnail_url
                    .replace("%{width}", "320")
                    .replace("%{height}", "180")
            }
            alt="Your alt text"
          />
        </span>
        <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between p-4">
          <div className="flex items-start justify-between text-sm">
            <div className="flex items-center px-1 text-white">
              <Badge className="my-[-6px] rounded-full bg-black/80 text-white">
                <EyeOpenIcon className="mr-3 h-[12px] w-[12px]" />
                <Badge className="mx-[-6px] rounded-full bg-white/20 text-white ">
                  {online ? video?.viewer_count : video?.view_count}
                </Badge>
              </Badge>
            </div>
            <div className="flex h-5 items-center rounded-full  px-1 text-white">
              <span className="font-bold">
                {type === "stream" ? (
                  <Badge className="rounded-full bg-red-600 text-white">
                    Live
                  </Badge>
                ) : type === "offline" ? (
                  <Badge className="rounded-full bg-black/80 text-white">
                    {video?.duration
                      .split(/[hms]/)
                      .filter(Boolean)
                      .map((tp) => tp.padStart(2, "0"))
                      .join(":")}
                  </Badge>
                ) : (
                  <Badge className="rounded-full bg-black/80 text-white">
                    {video?.duration} s
                  </Badge>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-end text-sm">
            <div className="ml-2 overflow-hidden">
              <div className="overflow-hidden text-base font-bold text-white">
                {video?.user_login}
              </div>
              <div className="overflow-hidden whitespace-nowrap text-base font-bold text-white">
                {video?.title}
              </div>
              <div className="flex items-start text-base text-white">
                {online && <span className="pr-2">started:</span>}
                {online
                  ? formatCreatedAt(new Date(video?.started_at).getTime())
                  : formatCreatedAt(new Date(video?.published_at!).getTime())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogIframe>
  );
};

export default CardVideo;
