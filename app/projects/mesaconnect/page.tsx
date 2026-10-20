"use server"
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { ColorSchema } from '@/app/color';
import { IoBook } from 'react-icons/io5';

// Reads width/height from a PNG's IHDR header in /public so next/image can reserve space.
function getPngSize(src: string) {
  const buffer = fs.readFileSync(path.join(process.cwd(), 'public', src));
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const quickFacts = [
  { label: "Stack", value: "Next.js, React, Supabase, REST APIs, PostgreSQL, Deno, Resend, Expo / React Native, Apple Maps" },
  { label: "Platforms", value: "Web, iOS" },
  { label: "Status", value: "Maintenance mode · live at mesaconnect.io · open source" },
];

export default async function MarkdownPage() {
  const filePath = path.join(process.cwd(), 'app/(casestudies)', 'MESAConnect.md');

  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div className="max-w-2xl pt-24 mx-auto p-6 prose">
      <h1 className={`${ColorSchema.text_maroon} text-6xl`}>MESAConnect, a platform for community college students to connect.
      </h1>
      <p className='font-black font-mono'> Case Study - October 19 2026</p>

      <dl className={`not-prose grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-xl border p-5 font-mono text-sm ${ColorSchema.card_bg}`}>
        {quickFacts.map(({ label, value }) => (
          <div key={label} className="contents">
            <dt className={`font-bold ${ColorSchema.text_maroon}`}>{label}</dt>
            <dd className={ColorSchema.ink_text}>{value}</dd>
          </div>
        ))}
      </dl>

      <Markdown
        components={{
          h1: ({ children }) => <h1 className="text-maroon-700 tracking-tight">{children}</h1>,
          img: ({ src, alt }) => {
            if (typeof src !== 'string') return null;
            const { width, height } = getPngSize(src);
            return (
              <Image
                src={src}
                alt={alt ?? ''}
                width={width}
                height={height}
                sizes="(max-width: 672px) 100vw, 672px"
                className="rounded-xl border"
              />
            );
          },
          p: ({ children }) => <p className='font-mono'>{children}</p>,
          li: ({ children }) => <li className='font-mono list-decimal marker:text-[#7a1620] dark:marker:text-[#c23b4a]'>{children}</li>,
        }}>{fileContent}</Markdown>
    </div>
  );
}
