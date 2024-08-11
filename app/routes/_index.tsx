import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/16/solid";
import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type Folder = {
  name: string;
  folders?: Folder[];
};

const folders: Folder[] = [
  {
    name: "Home",
    folders: [
      {
        name: "Movies",
        folders: [
          {
            name: "Popular",
            folders: [
              {
                name: "TNMT2.mp4",
              },
            ],
          },
          {
            name: "Trending",
            folders: [
              {
                name: "Spider-Verse.mp4",
              },
              {
                name: "Marvel's Endgame.mp4",
              },
            ],
          },
          {
            name: "Upcoming",
            folders: [
              {
                name: "Deadpool & Walvorin.mp4",
              },
            ],
          },
          {
            name: "Saved.txt",
          },
        ],
      },
      {
        name: "Music",
        folders: [],
      },
      {
        name: "Documents",
        folders: [],
      },
    ],
  },
];

export default function Index() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <ul>
        {folders.map((folder) => (
          <Folder key={folder.name} folder={folder} />
        ))}
      </ul>
    </div>
  );
}

function Folder({ folder }: { folder: Folder }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="my-1.5" key={folder.name}>
      <span className="flex items-center gap-1.5">
        {folder.folders && folder.folders.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRightIcon
              className={`size-4 text-gray-500 ${isOpen ? "rotate-90" : ""}`}
            />
          </button>
        )}

        {folder.folders ? (
          <FolderIcon
            className={`size-6 text-sky-600 ${
              folder.folders.length === 0 ? "ml-[22px]" : ""
            }`}
          />
        ) : (
          <DocumentIcon className="ml-[22px] size-6 text-gray-900" />
        )}
        {folder.name}
      </span>

      {isOpen && (
        <ul className="pl-2">
          {folder.folders?.map((folder) => (
            <Folder key={folder.name} folder={folder} />
          ))}
        </ul>
      )}
    </li>
  );
}
